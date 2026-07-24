#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fetch from "./lib/fetch.mjs";
import {
  getConfig,
  getHosts,
  getUserId,
  listFeeds,
  pickHost,
  removeFeed,
  startFeedUpload,
  waitForFeedReload,
} from "./lib/yandex-webmaster.mjs";

const args = process.argv.slice(2);
const flags = new Set(args.filter((arg) => arg.startsWith("--")));
const tokenArg = args.find((arg) => !arg.startsWith("--"));

const config = getConfig({
  token: tokenArg || process.env.YANDEX_OAUTH_TOKEN || process.env.YANDEX_WEBMASTER_OAUTH_TOKEN,
});

const maxAttempts = Number(process.env.YANDEX_FEED_REPAIR_ATTEMPTS || 24);
const waitMs = Number(process.env.YANDEX_FEED_REPAIR_WAIT_MS || 30000);

function log(step, message) {
  console.log(`[${step}] ${message}`);
}

function fail(message) {
  console.error(`\nОшибка: ${message}`);
  process.exit(1);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function validateFeedXml(xml) {
  const errors = [];
  if (!xml.includes("<yml_catalog")) {
    errors.push("Фид не содержит <yml_catalog>");
    return errors;
  }

  const offerCount = (xml.match(/<offer[\s>]/g) || []).length;
  const ratingParams = (xml.match(/<param name="Рейтинг">/g) || []).length;
  const reviewParams = (xml.match(/<param name="Число отзывов">/g) || []).length;
  const phoneParams = [...xml.matchAll(/<param name="Ссылка на телефон"[^>]*>([^<]*)<\/param>/gi)];

  if (ratingParams !== offerCount) {
    errors.push(`Несовпадение: offer=${offerCount}, Рейтинг=${ratingParams}`);
  }
  if (reviewParams !== offerCount) {
    errors.push(`Несовпадение: offer=${offerCount}, Число отзывов=${reviewParams}`);
  }

  if (phoneParams.length === 0) {
    errors.push("Не найден ни один param «Ссылка на телефон»");
    return errors;
  }

  if (phoneParams.length !== offerCount) {
    errors.push(`Несовпадение: offer=${offerCount}, phone params=${phoneParams.length}`);
  }

  const badPhones = [];
  for (const [, rawValue] of phoneParams) {
    const value = rawValue.trim();
    if (/^tel:/i.test(value)) {
      badPhones.push({ value, reason: "tel: не принимается, нужен https://" });
      continue;
    }
    if (/^\+?\d/.test(value)) {
      badPhones.push({ value, reason: "голый номер телефона, нужен https:// URL" });
      continue;
    }
    if (!/^https:\/\//i.test(value)) {
      badPhones.push({ value, reason: "ожидается https:// URL" });
    }
  }

  if (badPhones.length) {
    const sample = badPhones.slice(0, 3).map((item) => `${item.value} (${item.reason})`).join("; ");
    errors.push(`Некорректные «Ссылка на телефон»: ${sample}`);
  }

  for (const legacy of [
    "ai-bot-llm-rasa-n8n",
    "ai-bot-gigachat-n8n-local",
    "ml-data-consultation",
    "claude-business-automation",
  ]) {
    if (xml.includes(`id="${legacy}"`) || xml.includes(`/services/${legacy}`)) {
      errors.push(`Legacy offer URL в фиде: ${legacy}`);
    }
  }

  return errors;
}

async function fetchProductionFeed(feedUrl) {
  const response = await fetch(feedUrl, {
    headers: { Accept: "application/xml,text/xml,*/*" },
    redirect: "follow",
  });
  const text = await response.text();
  return { response, text };
}

async function checkTelEndpoint(siteUrl) {
  const telUrl = `${siteUrl.replace(/\/$/, "")}/tel`;
  const response = await fetch(telUrl, { redirect: "manual" });
  if (response.status !== 200) {
    return `GET ${telUrl} → HTTP ${response.status}, ожидался 200 (HTML со ссылкой tel:)`;
  }
  const text = await response.text();
  if (!/tel:\+?\d/i.test(text)) {
    return `GET ${telUrl} → в HTML нет ссылки tel:+...`;
  }
  return null;
}

function updateRailwayToken(token) {
  if (!flags.has("--update-railway")) return true;

  log("railway", "Обновляю YANDEX_OAUTH_TOKEN и YANDEX_WEBMASTER_OAUTH_TOKEN...");
  const result = spawnSync(
    "railway",
    [
      "variables",
      "--set",
      `YANDEX_OAUTH_TOKEN=${token}`,
      "--set",
      `YANDEX_WEBMASTER_OAUTH_TOKEN=${token}`,
    ],
    { encoding: "utf8" },
  );

  if (result.status !== 0) {
    console.error(result.stdout || result.stderr || "railway CLI failed");
    return false;
  }

  log("railway", "Токены обновлены в Railway");
  return true;
}

async function reloadFeedInWebmaster() {
  const userId = await getUserId(config.token);
  const hosts = await getHosts(config.token, userId);
  const host = pickHost(hosts, config.hostUrl);
  if (!host) fail(`Сайт ${config.hostUrl} не найден в Вебмастере`);

  const hostId = host.host_id;
  log("webmaster", `user_id=${userId}, host_id=${hostId}`);

  const existing = await listFeeds(config.token, userId, hostId);
  const registered = existing.some((feed) => feed.url === config.feedUrl);

  if (registered) {
    log("webmaster", "Удаляю старый фид для принудительной перепроверки...");
    const removed = await removeFeed(config.token, userId, hostId, config.feedUrl);
    log("webmaster", `Удаление: ${JSON.stringify(removed)}`);
    await sleep(3000);
  }

  log("webmaster", "Запускаю асинхронную загрузку фида...");
  const upload = await startFeedUpload(config.token, userId, hostId, {
    url: config.feedUrl,
    type: config.feedType,
    regionIds: config.regionIds,
  });

  const requestId = upload?.requestId || upload?.request_id;
  if (!requestId) fail("API не вернул requestId");

  log("webmaster", `requestId=${requestId}`);
  await waitForFeedReload(config.token, userId, hostId, config.feedUrl, config);
  log("webmaster", "Фид снова зарегистрирован в Вебмастере");
}

async function waitForValidProductionFeed() {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    log("check", `Попытка ${attempt}/${maxAttempts}: ${config.feedUrl}`);

    const { response, text } = await fetchProductionFeed(config.feedUrl);
    if (!response.ok) {
      log("check", `HTTP ${response.status}, жду ${waitMs / 1000}s...`);
      await sleep(waitMs);
      continue;
    }

    const telError = await checkTelEndpoint(config.hostUrl);
    if (telError) {
      log("check", `${telError}, жду ${waitMs / 1000}s...`);
      await sleep(waitMs);
      continue;
    }

    const errors = validateFeedXml(text);
    if (errors.length === 0) {
      const offerCount = (text.match(/<offer[\s>]/g) || []).length;
      const phoneSample = text.match(/<param name="Ссылка на телефон"[^>]*>([^<]*)<\/param>/i)?.[1];
      log("check", `OK: ${offerCount} offers, phone=${phoneSample}`);
      return text;
    }

    for (const error of errors) {
      log("check", `✗ ${error}`);
    }
    log("check", `Жду деплой ${waitMs / 1000}s...`);
    await sleep(waitMs);
  }

  fail(`Фид на проде не прошёл валидацию за ${maxAttempts} попыток. Задеплойте последний коммит и запустите снова.`);
}

async function main() {
  if (!config.token) {
    fail("Передайте OAuth-токен: npm run yandex:feed:repair -- <token> --update-railway");
  }

  console.log("Яндекс YML feed repair\n");
  console.log(`Сайт: ${config.hostUrl}`);
  console.log(`Фид:  ${config.feedUrl}\n`);

  if (flags.has("--update-railway")) {
    if (!updateRailwayToken(config.token)) {
      fail("Не удалось обновить токен в Railway (нужен railway login + link)");
    }
  }

  if (flags.has("--reload-only")) {
    await reloadFeedInWebmaster();
    console.log("\nГотово (только перерегистрация фида).");
    console.log("Дальше: Вебмастер → Фиды и ошибки → Перепроверить");
    return;
  }

  if (!flags.has("--skip-wait")) {
    await waitForValidProductionFeed();
  } else {
    const { text } = await fetchProductionFeed(config.feedUrl);
    const errors = validateFeedXml(text);
    if (errors.length) fail(errors.join("; "));
  }

  if (!flags.has("--check-only")) {
    await reloadFeedInWebmaster();
  }

  console.log("\nГотово.");
  console.log("Дальше: Вебмастер → Услуги и предложения → Фиды и ошибки → Перепроверить");
  console.log("Повторная проверка фида в интерфейсе может занять от нескольких минут до нескольких часов.");
}

main().catch((error) => {
  if (String(error.message).includes("401")) {
    console.error("\nТокен недействителен. Получите новый на oauth.yandex.ru");
  }
  fail(error.message);
});

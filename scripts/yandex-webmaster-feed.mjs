#!/usr/bin/env node

import fetch from "./lib/fetch.mjs";
import {
  getConfig,
  getHosts,
  getUserId,
  listFeeds,
  pickHost,
  startFeedUpload,
  waitForFeedReload,
} from "./lib/yandex-webmaster.mjs";

/**
 * Регистрация YML-фида(ов) в Яндекс Вебмастере для «Дополненного представления в поиске β».
 *
 * Usage:
 *   npm run webmaster:feed:upload              # основной фид www
 *   npm run webmaster:feed:upload -- --all     # www + bitrix + partners
 *   npm run webmaster:feed:upload -- --microsites
 *
 * Документация:
 * - https://yandex.ru/dev/webmaster/doc/ru/concepts/feeds
 */

const args = new Set(process.argv.slice(2).filter((arg) => arg.startsWith("--")));
const registerAll = args.has("--all");
const registerMicrositesOnly = args.has("--microsites");

const MICROSITE_FEEDS = [
  {
    label: "Bitrix24 + amoCRM",
    hostUrl: process.env.YANDEX_WEBMASTER_BITRIX_HOST_URL?.trim() || "https://bitrix.bober-ai.dev",
    feedUrl:
      process.env.YANDEX_WEBMASTER_BITRIX_FEED_URL?.trim() ||
      "https://bitrix.bober-ai.dev/performers-feed.yml",
  },
  {
    label: "Partners / white-label",
    hostUrl: process.env.YANDEX_WEBMASTER_PARTNERS_HOST_URL?.trim() || "https://partners.bober-ai.dev",
    feedUrl:
      process.env.YANDEX_WEBMASTER_PARTNERS_FEED_URL?.trim() ||
      "https://partners.bober-ai.dev/performers-feed.yml",
  },
];

function fail(message) {
  console.error(`\nОшибка: ${message}`);
  process.exit(1);
}

function printSetupHelp() {
  console.log(`
Нужен OAuth-токен Яндекс Вебмастера.

1. Создайте приложение: https://oauth.yandex.ru/client/new
   - Платформа: Веб-сервисы
   - Redirect URI: https://oauth.yandex.ru/verification_code
   - Права: webmaster:hostinfo, webmaster:verify

2. Получите токен: npm run webmaster:oauth

3. Экспортируйте переменные и запустите снова:
   export YANDEX_WEBMASTER_OAUTH_TOKEN="y0_..."
   npm run webmaster:feed:upload -- --all

Переменные:
  YANDEX_WEBMASTER_OAUTH_TOKEN          OAuth-токен (обязательно)
  YANDEX_WEBMASTER_HOST_URL             URL основного сайта
  YANDEX_WEBMASTER_FEED_URL             URL основного YML-фида
  YANDEX_WEBMASTER_BITRIX_HOST_URL      https://bitrix.bober-ai.dev
  YANDEX_WEBMASTER_BITRIX_FEED_URL      .../performers-feed.yml
  YANDEX_WEBMASTER_PARTNERS_HOST_URL    https://partners.bober-ai.dev
  YANDEX_WEBMASTER_PARTNERS_FEED_URL    .../performers-feed.yml
  YANDEX_WEBMASTER_FEED_TYPE            Тип фида (по умолчанию SERVICES)
  YANDEX_WEBMASTER_REGION_IDS           Регионы через запятую (по умолчанию 225)
`);
}

async function ensureFeedReachable(feedUrl) {
  const response = await fetch(feedUrl, { redirect: "follow" });
  const text = await response.text();
  if (!response.ok || !text.includes("<yml_catalog")) {
    throw new Error(`Фид недоступен или некорректен: ${feedUrl} (HTTP ${response.status})`);
  }
  console.log(`  YML доступен: ${feedUrl}`);
}

async function registerFeed({ token, userId, hosts, hostUrl, feedUrl, feedType, regionIds, pollConfig }) {
  console.log(`\n── ${hostUrl}`);
  console.log(`Фид: ${feedUrl}`);

  await ensureFeedReachable(feedUrl);

  const host = pickHost(hosts, hostUrl);
  if (!host) {
    console.log("Доступные сайты:");
    for (const item of hosts) {
      console.log(`- ${item.unicode_host_url || item.ascii_host_url || item.host_id}`);
    }
    throw new Error(`Сайт ${hostUrl} не найден среди подтверждённых хостов`);
  }

  const hostId = host.host_id;
  console.log(`host_id: ${hostId}`);

  const existingFeeds = await listFeeds(token, userId, hostId);
  const alreadyRegistered = existingFeeds.some((feed) => feed.url === feedUrl);
  if (alreadyRegistered) {
    console.log("Фид уже зарегистрирован в Вебмастере.");
    return { hostUrl, feedUrl, status: "already_registered" };
  }

  console.log("Запускаю асинхронную загрузку фида...");
  const upload = await startFeedUpload(token, userId, hostId, {
    url: feedUrl,
    type: feedType,
    regionIds,
  });
  const requestId = upload?.requestId || upload?.request_id;
  if (!requestId) {
    throw new Error("API не вернул requestId");
  }
  console.log(`requestId: ${requestId}`);

  process.stdout.write("Ожидание появления фида в списке");
  await waitForFeedReload(token, userId, hostId, feedUrl, pollConfig);
  console.log("");

  const feeds = await listFeeds(token, userId, hostId);
  const registered = feeds.some((feed) => feed.url === feedUrl);
  if (!registered) {
    throw new Error(`Загрузка завершилась, но фид ${feedUrl} пока не виден в списке`);
  }

  console.log("Фид зарегистрирован.");
  return { hostUrl, feedUrl, status: "registered" };
}

async function main() {
  const base = getConfig();
  if (!base.token) {
    printSetupHelp();
    fail("Не задан YANDEX_WEBMASTER_OAUTH_TOKEN");
  }

  const jobs = [];
  if (!registerMicrositesOnly) {
    jobs.push({
      label: "Main (www)",
      hostUrl: base.hostUrl,
      feedUrl: base.feedUrl,
    });
  }
  if (registerAll || registerMicrositesOnly) {
    jobs.push(...MICROSITE_FEEDS);
  }

  console.log("Яндекс Вебмастер: загрузка фида(ов) для дополненного представления в поиске β\n");
  console.log(`Тип: ${base.feedType}`);
  console.log(`Регионы: ${base.regionIds.join(", ")}`);
  console.log(`Задач: ${jobs.length} (${jobs.map((j) => j.label || j.hostUrl).join(", ")})\n`);

  const userId = await getUserId(base.token);
  console.log(`user_id: ${userId}`);
  const hosts = await getHosts(base.token, userId);
  if (!hosts.length) {
    fail("В аккаунте нет сайтов. Добавьте хосты в Вебмастер.");
  }

  const results = [];
  for (const job of jobs) {
    try {
      const result = await registerFeed({
        token: base.token,
        userId,
        hosts,
        hostUrl: job.hostUrl,
        feedUrl: job.feedUrl,
        feedType: base.feedType,
        regionIds: base.regionIds,
        pollConfig: base,
      });
      results.push({ ...result, label: job.label, ok: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`\nОшибка для ${job.hostUrl}: ${message}`);
      if (message.includes("401")) {
        console.error("Токен недействителен или истёк. Получите новый: npm run webmaster:oauth");
      }
      if (message.includes("HOST_NOT_VERIFIED")) {
        console.error("Права на сайт не подтверждены в Яндекс Вебмастере.");
      }
      if (message.includes("FEED_ALREADY_ADDED")) {
        console.error("Такой фид уже добавлен.");
        results.push({
          hostUrl: job.hostUrl,
          feedUrl: job.feedUrl,
          label: job.label,
          status: "already_registered",
          ok: true,
        });
        continue;
      }
      results.push({
        hostUrl: job.hostUrl,
        feedUrl: job.feedUrl,
        label: job.label,
        status: "error",
        error: message,
        ok: false,
      });
    }
  }

  console.log("\n── Итог");
  for (const item of results) {
    const mark = item.ok ? "OK" : "FAIL";
    console.log(`[${mark}] ${item.label || item.hostUrl}: ${item.status}${item.error ? ` — ${item.error}` : ""}`);
  }

  const failed = results.filter((item) => !item.ok);
  if (failed.length) {
    fail(`${failed.length} из ${results.length} фидов не зарегистрированы`);
  }

  console.log("\nГотово. Дальше Вебмастер проверит фиды (обычно до суток).");
  console.log("Ошибки: Услуги и предложения в поиске → Фиды и ошибки.");
}

main().catch((error) => {
  fail(error.message || String(error));
});

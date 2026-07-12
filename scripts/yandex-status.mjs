#!/usr/bin/env node

import fetch from "./lib/fetch.mjs";

const WEBMASTER_API = "https://api.webmaster.yandex.net/v4";
const METRIKA_API = "https://api-metrika.yandex.net/management/v1";

const config = {
  token:
    process.env.YANDEX_OAUTH_TOKEN?.trim() ||
    process.env.YANDEX_WEBMASTER_OAUTH_TOKEN?.trim() ||
    process.env.YANDEX_METRIKA_OAUTH_TOKEN?.trim(),
  clientId: process.env.YANDEX_WEBMASTER_CLIENT_ID?.trim() || "f2e2f11ae7e3492886ad61a6e45a4c5c",
  siteUrl: (process.env.YANDEX_WEBMASTER_HOST_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://www.bober-ai.dev").replace(/\/$/, ""),
  feedUrl: (process.env.YANDEX_WEBMASTER_FEED_URL || "https://www.bober-ai.dev/performers-feed.yml").replace(/\/$/, ""),
  metrikaId: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim() || "108972710",
  verificationCode: process.env.YANDEX_WEBMASTER_VERIFICATION_CODE?.trim() || "53fda44dc6d2443f",
};

function ok(message) {
  console.log(`  ✓ ${message}`);
}

function warn(message) {
  console.log(`  ! ${message}`);
}

function fail(message) {
  console.log(`  ✗ ${message}`);
}

function authHeaders(json = false) {
  const headers = {
    Authorization: `OAuth ${config.token}`,
    Accept: "application/json",
  };
  if (json) headers["Content-Type"] = "application/json; charset=utf-8";
  return headers;
}

async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...authHeaders(options.json),
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let body = null;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }
  return { response, body };
}

function normalizeHost(value) {
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    return url.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return String(value).toLowerCase();
  }
}

function pickHost(hosts, targetUrl) {
  const targetHost = normalizeHost(targetUrl);
  return hosts.find((host) => {
    const candidates = [host.host_id, host.ascii_host_url, host.unicode_host_url]
      .filter(Boolean)
      .map((value) => String(value).toLowerCase());
    return candidates.some((value) => value.includes(targetHost));
  });
}

async function checkPublicSignals() {
  console.log("Публичные проверки (без OAuth):\n");

  try {
    const siteResponse = await fetch(config.siteUrl, { redirect: "follow" });
    const html = await siteResponse.text();
    const hasVerification = html.includes(config.verificationCode) || html.includes("yandex-verification");
    if (hasVerification) {
      ok(`Мета-тег Вебмастера на ${config.siteUrl} (${config.verificationCode})`);
    } else {
      fail(`Мета-тег Вебмастера не найден на ${config.siteUrl}`);
    }
  } catch (error) {
    fail(`Не удалось открыть ${config.siteUrl}: ${error.message}`);
  }

  try {
    const feedResponse = await fetch(config.feedUrl, { redirect: "follow" });
    const feedText = await feedResponse.text();
    if (feedResponse.ok && feedText.includes("<yml_catalog")) {
      ok(`YML-фид доступен: ${config.feedUrl}`);
    } else {
      fail(`YML-фид недоступен или некорректен: ${config.feedUrl} (HTTP ${feedResponse.status})`);
    }
  } catch (error) {
    fail(`Не удалось открыть фид: ${error.message}`);
  }

  try {
    const metrikaResponse = await fetch(`https://mc.yandex.ru/watch/${config.metrikaId}`, {
      redirect: "manual",
    });
    if ([200, 302, 307].includes(metrikaResponse.status)) {
      ok(`Счётчик Метрики ${config.metrikaId} отвечает (HTTP ${metrikaResponse.status})`);
    } else {
      warn(`Счётчик Метрики ${config.metrikaId} вернул HTTP ${metrikaResponse.status}`);
    }
  } catch (error) {
    warn(`Не удалось проверить счётчик Метрики: ${error.message}`);
  }

  console.log(`\n  Счётчик в коде: NEXT_PUBLIC_YANDEX_METRIKA_ID=${config.metrikaId}`);
  console.log(`  Метрика грузится после согласия на cookies (см. YandexMetrika.tsx)\n`);
}

async function checkWebmasterApi() {
  console.log("Яндекс Вебмастер (API):\n");

  const { response: userResponse, body: userBody } = await apiRequest(`${WEBMASTER_API}/user`);
  if (!userResponse.ok) {
    fail(`GET /user → HTTP ${userResponse.status}`);
    if (userResponse.status === 401) {
      warn("Токен недействителен или истёк. Получите новый OAuth-токен.");
    }
    return;
  }

  const userId = userBody?.user_id;
  ok(`Аккаунт: user_id=${userId}`);

  const { response: hostsResponse, body: hostsBody } = await apiRequest(`${WEBMASTER_API}/user/${userId}/hosts`);
  if (!hostsResponse.ok) {
    fail(`GET /hosts → HTTP ${hostsResponse.status}`);
    return;
  }

  const hosts = hostsBody?.hosts || [];
  if (!hosts.length) {
    fail("В аккаунте нет сайтов");
    return;
  }

  console.log("  Сайты в Вебмастере:");
  for (const host of hosts) {
    const url = host.unicode_host_url || host.ascii_host_url || host.host_id;
    const status = host.verified ? "подтверждён" : "не подтверждён";
    console.log(`    - ${url} (${status})`);
  }

  const target = pickHost(hosts, config.siteUrl);
  if (!target) {
    fail(`Сайт ${config.siteUrl} не найден среди хостов`);
    return;
  }

  ok(`Целевой сайт найден: ${target.unicode_host_url || target.ascii_host_url}`);
  if (target.verified) {
    ok("Права на сайт подтверждены");
  } else {
    fail("Права на сайт не подтверждены");
  }

  const hostId = encodeURIComponent(target.host_id);
  const { response: feedsResponse, body: feedsBody } = await apiRequest(
    `${WEBMASTER_API}/user/${userId}/hosts/${hostId}/feeds/list`,
  );

  if (!feedsResponse.ok) {
    warn(`Не удалось получить фиды: HTTP ${feedsResponse.status}`);
    return;
  }

  const feeds = feedsBody?.feeds || [];
  const registered = feeds.find((feed) => feed.url === config.feedUrl);
  if (registered) {
    ok(`Фид зарегистрирован: ${config.feedUrl}`);
    if (registered.status) console.log(`    статус: ${registered.status}`);
  } else if (feeds.length) {
    warn(`Фид ${config.feedUrl} не найден среди ${feeds.length} зарегистрированных`);
    for (const feed of feeds) console.log(`    - ${feed.url}`);
  } else {
    warn(`Фид ${config.feedUrl} ещё не зарегистрирован в Вебмастере`);
  }

  console.log("");
}

async function checkMetrikaApi() {
  console.log("Яндекс Метрика (API):\n");

  const { response, body } = await apiRequest(
    `${METRIKA_API}/counters?search_string=${encodeURIComponent(normalizeHost(config.siteUrl))}`,
  );

  if (response.status === 401) {
    fail("HTTP 401 — токен недействителен");
    return;
  }

  if (response.status === 403) {
    fail("HTTP 403 — у OAuth-приложения нет права metrika:read");
    warn("Добавьте в oauth.yandex.ru: Яндекс.Метрика → чтение статистики и параметров счётчика");
    return;
  }

  if (!response.ok) {
    fail(`GET /counters → HTTP ${response.status}`);
    if (typeof body === "object") console.log(`    ${JSON.stringify(body)}`);
    return;
  }

  const counters = body?.counters || [];
  if (!counters.length) {
    warn(`Счётчики для «${normalizeHost(config.siteUrl)}» не найдены`);
    return;
  }

  console.log(`  Найдено счётчиков: ${counters.length}`);
  for (const counter of counters) {
    const marker = String(counter.id) === config.metrikaId ? "← используется на сайте" : "";
    console.log(`    - #${counter.id} ${counter.name} (${counter.site2?.site || counter.site || "без URL"}) ${marker}`);
  }

  const configured = counters.find((counter) => String(counter.id) === config.metrikaId);
  if (configured) {
    ok(`Счётчик ${config.metrikaId} привязан к аккаунту и совпадает с кодом сайта`);
  } else {
    warn(`Счётчик ${config.metrikaId} из кода не найден среди доступных в API`);
  }

  console.log("");
}

function printTokenHelp() {
  console.log("OAuth-токен не задан. Для API-проверки:\n");
  console.log("1. Откройте (права: webmaster:hostinfo, webmaster:verify, metrika:read):");
  console.log(
    `   https://oauth.yandex.ru/authorize?response_type=token&client_id=${config.clientId}`,
  );
  console.log("\n2. Скопируйте токен и запустите:");
  console.log('   export YANDEX_OAUTH_TOKEN="y0_..."');
  console.log("   npm run yandex:status\n");
}

async function main() {
  console.log("Проверка Яндекс Вебмастер и Метрика\n");
  console.log(`Сайт:    ${config.siteUrl}`);
  console.log(`Фид:     ${config.feedUrl}`);
  console.log(`Метрика: ${config.metrikaId}\n`);

  await checkPublicSignals();

  if (!config.token) {
    printTokenHelp();
    process.exit(2);
  }

  await checkWebmasterApi();
  await checkMetrikaApi();
}

main().catch((error) => {
  console.error(`\nОшибка: ${error.message}`);
  process.exit(1);
});

#!/usr/bin/env node

import fetch from "./lib/fetch.mjs";

/**
 * Регистрация YML-фида в Яндекс Вебмастере для «Дополненного представления в поиске β».
 *
 * Требования:
 * - OAuth-токен с правами webmaster:hostinfo и webmaster:verify
 * - Сайт добавлен в Вебмастер и права подтверждены
 *
 * Документация:
 * - https://yandex.ru/dev/webmaster/doc/ru/concepts/feeds
 * - https://yandex.ru/dev/webmaster/doc/ru/tasks/how-to-get-oauth
 */

const API_BASE = "https://api.webmaster.yandex.net/v4";

const config = {
  token:
    process.env.YANDEX_WEBMASTER_OAUTH_TOKEN?.trim() ||
    process.env.YANDEX_OAUTH_TOKEN?.trim(),
  hostUrl: (process.env.YANDEX_WEBMASTER_HOST_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://www.bober-ai.dev").replace(/\/$/, ""),
  feedUrl: (process.env.YANDEX_WEBMASTER_FEED_URL || `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.bober-ai.dev"}/performers-feed.yml`).replace(/\/$/, ""),
  feedType: process.env.YANDEX_WEBMASTER_FEED_TYPE || "SERVICES",
  regionIds: (process.env.YANDEX_WEBMASTER_REGION_IDS || "225")
    .split(",")
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isFinite(value)),
  pollIntervalMs: Number(process.env.YANDEX_WEBMASTER_POLL_MS || 3000),
  pollTimeoutMs: Number(process.env.YANDEX_WEBMASTER_POLL_TIMEOUT_MS || 120000),
};

function fail(message) {
  console.error(`\nОшибка: ${message}`);
  process.exit(1);
}

function authHeaders(includeJsonContentType = true) {
  const headers = {
    Authorization: `OAuth ${config.token}`,
    Accept: "application/json",
  };
  if (includeJsonContentType) {
    headers["Content-Type"] = "application/json; charset=utf-8";
  }
  return headers;
}

function normalizeHostUrl(value) {
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    return `${url.protocol}//${url.hostname}${url.port && url.port !== "80" && url.port !== "443" ? `:${url.port}` : ""}`;
  } catch {
    return value.toLowerCase();
  }
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...authHeaders(),
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

  if (!response.ok) {
    const details = typeof body === "string" ? body : JSON.stringify(body, null, 2);
    throw new Error(`HTTP ${response.status} ${response.statusText}\n${details}`);
  }

  return body;
}

async function getUserId() {
  const data = await apiRequest("/user");
  const userId = data?.user_id;
  if (!userId) {
    throw new Error("Не удалось получить user_id из ответа /v4/user");
  }
  return userId;
}

async function getHosts(userId) {
  const data = await apiRequest(`/user/${userId}/hosts`);
  return data?.hosts || [];
}

function pickHost(hosts, targetUrl) {
  const normalizedTarget = normalizeHostUrl(targetUrl);
  const targetHost = new URL(normalizedTarget).hostname.replace(/^www\./, "");

  return hosts.find((host) => {
    const hostId = String(host.host_id || "");
    const asciiUrl = String(host.ascii_host_url || host.host_url || "");
    const unicodeUrl = String(host.unicode_host_url || host.host_url || "");
    const candidates = [hostId, asciiUrl, unicodeUrl].map((value) => value.toLowerCase());
    return candidates.some((value) => value.includes(targetHost));
  });
}

async function listFeeds(userId, hostId) {
  const data = await apiRequest(`/user/${userId}/hosts/${encodeURIComponent(hostId)}/feeds/list`);
  return data?.feeds || [];
}

async function startFeedUpload(userId, hostId) {
  return apiRequest(`/user/${userId}/hosts/${encodeURIComponent(hostId)}/feeds/add/start`, {
    method: "POST",
    body: JSON.stringify({
      feed: {
        url: config.feedUrl,
        type: config.feedType,
        regionIds: config.regionIds,
      },
    }),
  });
}

async function waitForUpload(userId, hostId) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < config.pollTimeoutMs) {
    const feeds = await listFeeds(userId, hostId);
    if (feeds.some((feed) => feed.url === config.feedUrl)) {
      console.log("Статус загрузки: OK");
      return;
    }

    console.log("Статус загрузки: IN_PROGRESS");
    await new Promise((resolve) => setTimeout(resolve, config.pollIntervalMs));
  }

  throw new Error("Истекло время ожидания загрузки фида");
}

function printSetupHelp() {
  console.log(`
Нужен OAuth-токен Яндекс Вебмастера.

1. Создайте приложение: https://oauth.yandex.ru/client/new
   - Платформа: Веб-сервисы
   - Redirect URI: https://oauth.yandex.ru/verification_code
   - Права: webmaster:hostinfo, webmaster:verify

2. Получите токен:
   https://oauth.yandex.ru/authorize?response_type=token&client_id=<CLIENT_ID>

3. Экспортируйте переменные и запустите снова:
   export YANDEX_WEBMASTER_OAUTH_TOKEN="y0_..."
   npm run webmaster:feed:upload

Переменные:
  YANDEX_WEBMASTER_OAUTH_TOKEN   OAuth-токен (обязательно)
  YANDEX_WEBMASTER_HOST_URL      URL сайта в Вебмастере (по умолчанию https://www.bober-ai.dev)
  YANDEX_WEBMASTER_FEED_URL      URL YML-фида (по умолчанию .../performers-feed.yml)
  YANDEX_WEBMASTER_FEED_TYPE     Тип фида (по умолчанию SERVICES)
  YANDEX_WEBMASTER_REGION_IDS    Регионы через запятую (по умолчанию 225)
`);
}

async function main() {
  if (!config.token) {
    printSetupHelp();
    fail("Не задан YANDEX_WEBMASTER_OAUTH_TOKEN");
  }

  console.log("Яндекс Вебмастер: загрузка фида для дополненного представления в поиске β\n");
  console.log(`Сайт: ${config.hostUrl}`);
  console.log(`Фид:  ${config.feedUrl}`);
  console.log(`Тип:  ${config.feedType}`);
  console.log(`Регионы: ${config.regionIds.join(", ")}\n`);

  const userId = await getUserId();
  console.log(`user_id: ${userId}`);

  const hosts = await getHosts(userId);
  if (!hosts.length) {
    fail("В аккаунте нет сайтов. Добавьте https://www.bober-ai.dev в Вебмастер.");
  }

  const host = pickHost(hosts, config.hostUrl);
  if (!host) {
    console.log("Доступные сайты:");
    for (const item of hosts) {
      console.log(`- ${item.unicode_host_url || item.ascii_host_url || item.host_id}`);
    }
    fail(`Сайт ${config.hostUrl} не найден среди подтверждённых хостов`);
  }

  const hostId = host.host_id;
  console.log(`host_id: ${hostId}`);

  const existingFeeds = await listFeeds(userId, hostId);
  const alreadyRegistered = existingFeeds.some((feed) => feed.url === config.feedUrl);

  if (alreadyRegistered) {
    console.log("\nФид уже зарегистрирован в Вебмастере.");
    console.log("Яндекс периодически перекачивает его автоматически (обычно раз в несколько часов).");
    console.log("Проверка ошибок: Вебмастер → Услуги и предложения в поиске → Фиды и ошибки");
    return;
  }

  console.log("\nЗапускаю асинхронную загрузку фида...");
  const upload = await startFeedUpload(userId, hostId);
  const requestId = upload?.requestId || upload?.request_id;

  if (!requestId) {
    throw new Error("API не вернул requestId");
  }

  console.log(`requestId: ${requestId}`);
  await waitForUpload(userId, hostId);

  const feeds = await listFeeds(userId, hostId);
  const registered = feeds.some((feed) => feed.url === config.feedUrl);

  console.log("\nГотово.");
  if (registered) {
    console.log("Фид зарегистрирован. Дальше:");
    console.log("1. Вебмастер проверит фид (обычно до суток на повторную проверку).");
    console.log("2. Служба качества проверит сайт и предложения в течение нескольких дней.");
    console.log("3. Ошибки смотрите: Услуги и предложения в поиске → Фиды и ошибки.");
  } else {
    console.log("Загрузка завершилась, но фид пока не виден в списке. Проверьте статус в интерфейсе Вебмастера.");
  }
}

main().catch((error) => {
  if (String(error.message).includes("401")) {
    console.error("\nТокен недействителен или истёк. Получите новый OAuth-токен (срок — 6 месяцев).");
  }
  if (String(error.message).includes("HOST_NOT_VERIFIED")) {
    console.error("\nПрава на сайт не подтверждены. Подтвердите сайт в Яндекс Вебмастере.");
  }
  if (String(error.message).includes("FEED_ALREADY_ADDED")) {
    console.error("\nТакой фид уже добавлен.");
  }
  fail(error.message);
});

#!/usr/bin/env node

import fetch from "./lib/fetch.mjs";

const METRIKA_API = "https://api-metrika.yandex.net/management/v1";

const config = {
  token:
    process.env.YANDEX_OAUTH_TOKEN?.trim() ||
    process.env.YANDEX_METRIKA_OAUTH_TOKEN?.trim() ||
    process.env.YANDEX_WEBMASTER_OAUTH_TOKEN?.trim(),
  clientId: process.env.YANDEX_WEBMASTER_CLIENT_ID?.trim() || "f2e2f11ae7e3492886ad61a6e45a4c5c",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.bober-ai.dev").replace(/\/$/, ""),
  counterName: process.env.YANDEX_METRIKA_COUNTER_NAME?.trim() || "Bober AI Dev",
  counterId: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim() || "",
};

function fail(message) {
  console.error(`\nОшибка: ${message}`);
  process.exit(1);
}

function siteHost(url) {
  return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
}

function counterSite(counter) {
  const site = counter.site2?.site || counter.site || "";
  return site.replace(/^www\./, "").toLowerCase();
}

function authHeaders() {
  return {
    Authorization: `OAuth ${config.token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${METRIKA_API}${path}`, {
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
    const error = new Error(`HTTP ${response.status} ${response.statusText}\n${details}`);
    error.status = response.status;
    error.body = body;
    throw error;
  }

  return body;
}

async function listCounters(search) {
  const params = new URLSearchParams({ per_page: "100" });
  if (search) params.set("search_string", search);
  const data = await apiRequest(`/counters?${params.toString()}`);
  return data?.counters || [];
}

function findCounter(counters, host) {
  return counters.find((counter) => counterSite(counter) === host);
}

function buildCounterPayload(host) {
  return {
    counter: {
      name: config.counterName,
      site: `www.${host}`,
      type: "simple",
      webvisor: {
        arch_enabled: 1,
        wv_version: 2,
        allow_wv2: true,
      },
      code_options: {
        async: 1,
        clickmap: 1,
        track_links: 1,
        accurate_track_bounce: 1,
        visor: 1,
      },
    },
  };
}

function printTokenHelp() {
  console.log(`
Нужен OAuth-токен с правом metrika:write.

1. В oauth.yandex.ru добавьте к приложению:
   Яндекс.Метрика → создание и редактирование счётчиков

2. Получите токен:
   https://oauth.yandex.ru/authorize?response_type=token&client_id=${config.clientId}

3. Запустите:
   export YANDEX_OAUTH_TOKEN="y0_..."
   npm run metrika:counter
`);
}

async function main() {
  const host = siteHost(config.siteUrl);

  console.log("Яндекс Метрика: добавление счётчика\n");
  console.log(`Сайт:  ${config.siteUrl}`);
  console.log(`Хост:  www.${host}`);
  console.log(`Имя:   ${config.counterName}\n`);

  if (!config.token) {
    printTokenHelp();
    fail("Не задан YANDEX_OAUTH_TOKEN");
  }

  let counters = await listCounters(host);
  let existing = findCounter(counters, host);

  if (!existing && config.counterId) {
    try {
      const byId = await apiRequest(`/counter/${config.counterId}`);
      if (byId?.counter && counterSite(byId.counter) === host) {
        existing = byId.counter;
      }
    } catch (error) {
      if (error.status !== 404) throw error;
    }
  }

  if (existing) {
    console.log("Счётчик уже существует:");
    console.log(`  ID:   ${existing.id}`);
    console.log(`  Имя:  ${existing.name}`);
    console.log(`  Сайт: ${existing.site2?.site || existing.site}`);
    console.log(`\nДобавьте в Railway / .env:`);
    console.log(`  NEXT_PUBLIC_YANDEX_METRIKA_ID="${existing.id}"`);
    return;
  }

  console.log("Создаю счётчик...");
  const created = await apiRequest("/counters", {
    method: "POST",
    body: JSON.stringify(buildCounterPayload(host)),
  });

  const counter = created?.counter;
  if (!counter?.id) {
    fail("API не вернул id счётчика");
  }

  console.log("\nГотово. Счётчик создан:");
  console.log(`  ID:   ${counter.id}`);
  console.log(`  Имя:  ${counter.name}`);
  console.log(`  Сайт: ${counter.site2?.site || counter.site}`);
  console.log(`\nДобавьте в Railway / .env и передеплойте:`);
  console.log(`  NEXT_PUBLIC_YANDEX_METRIKA_ID="${counter.id}"`);
}

main().catch((error) => {
  if (error.status === 401) {
    console.error("\nТокен недействителен или истёк.");
  }
  if (error.status === 403) {
    console.error("\nНет права metrika:write. Добавьте его в oauth.yandex.ru и получите новый токен.");
  }
  fail(error.message);
});

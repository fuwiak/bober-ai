#!/usr/bin/env node

/**
 * Снимок настроек счётчика Яндекс.Метрики + проверка контентной аналитики.
 *
 *   export YANDEX_OAUTH_TOKEN="y0_..."
 *   npm run metrika:status
 *
 * Или через Railway:
 *   railway run npm run metrika:status
 */

import fetch from "./lib/fetch.mjs";

const MANAGEMENT_API = "https://api-metrika.yandex.net/management/v1";
const STAT_API = "https://api-metrika.yandex.net/stat/v1";

const config = {
  token:
    process.env.YANDEX_OAUTH_TOKEN?.trim() ||
    process.env.YANDEX_METRIKA_OAUTH_TOKEN?.trim() ||
    process.env.YANDEX_WEBMASTER_OAUTH_TOKEN?.trim(),
  counterId: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim() || "110635302",
  clientId: process.env.YANDEX_WEBMASTER_CLIENT_ID?.trim() || "f2e2f11ae7e3492886ad61a6e45a4c5c",
};

function ok(message) {
  console.log(`  ✓ ${message}`);
}

function warn(message) {
  console.log(`  ! ${message}`);
}

function fail(message) {
  console.error(`\nОшибка: ${message}`);
  process.exit(1);
}

function authHeaders() {
  return {
    Authorization: `OAuth ${config.token}`,
    Accept: "application/json",
  };
}

async function apiRequest(base, path) {
  const response = await fetch(`${base}${path}`, { headers: authHeaders() });
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
    const error = new Error(`HTTP ${response.status}: ${details}`);
    error.status = response.status;
    error.body = body;
    throw error;
  }
  return body;
}

function flag(value) {
  return value ? "вкл" : "выкл";
}

function printOAuthHelp() {
  console.log(`
Нужен OAuth-токен с правом metrika:read.

1. https://oauth.yandex.ru/authorize?response_type=token&client_id=${config.clientId}
2. export YANDEX_OAUTH_TOKEN="y0_..."
   или: railway run npm run metrika:status
`);
}

async function checkContentAnalytics(counterId) {
  const presets = ["publishers_sources", "publishers_rubrics", "publishers_authors", "publishers_thematics"];
  const results = [];

  for (const preset of presets) {
    try {
      const data = await apiRequest(
        STAT_API,
        `/data?ids=${counterId}&preset=${preset}&date1=30daysAgo&date2=today&limit=1`,
      );
      results.push({ preset, ok: true, rows: (data.data || []).length });
    } catch (error) {
      const message = String(error.body?.errors?.[0]?.message || error.message || "");
      results.push({ preset, ok: false, message });
    }
  }

  const available = results.filter((item) => item.ok);
  if (available.length) {
    return { enabled: true, available: available.map((item) => item.preset), rows: available[0].rows };
  }

  const blocked = results.every((item) => /not available/i.test(item.message || ""));
  return {
    enabled: false,
    reason: blocked
      ? "presets publishers_* недоступны — опция в UI выключена или ещё не применилась"
      : results[0]?.message || "unknown",
  };
}

async function main() {
  const id = config.counterId;
  console.log("Яндекс Метрика — статус счётчика\n");
  console.log(`  ID: ${id}\n`);

  if (!config.token) {
    printOAuthHelp();
    fail("Не задан YANDEX_OAUTH_TOKEN");
  }

  let counter;
  try {
    const data = await apiRequest(MANAGEMENT_API, `/counter/${id}`);
    counter = data.counter;
  } catch (error) {
    if (error.status === 403) {
      printOAuthHelp();
      fail("Нет права metrika:read у токена");
    }
    if (error.status === 404) {
      fail(`Счётчик ${id} не найден`);
    }
    throw error;
  }

  const code = counter.code_options || {};
  const webvisor = counter.webvisor || {};
  const site = counter.site2?.site || counter.site;

  console.log("Основные");
  ok(`Имя: ${counter.name}`);
  ok(`Сайт: ${site}`);
  ok(`Статус: ${counter.status} · активность: ${counter.activity_status}`);
  ok(`Владелец: ${counter.owner_login}`);
  ok(`Часовой пояс: ${counter.time_zone_name}`);
  ok(`Валюта: ${counter.currency_code || counter.currency}`);
  console.log("");

  console.log("Код и модули");
  ok(`Вебвизор: ${flag(code.visor)} (v${webvisor.wv_version || "?"})`);
  ok(`Карта кликов: ${flag(code.clickmap)}`);
  ok(`SSR: ${flag(code.ssr)}`);
  ok(`Ecommerce: ${flag(code.ecommerce)}`);
  ok(`Track hash: ${flag(code.track_hash)}`);
  ok(`Фильтр роботов: ${flag(counter.filter_robots)}`);
  ok(`Автоцели: ${flag(counter.autogoals_enabled)}`);
  if (counter.code_options?.ytm) {
    ok("Яндекс Тег Менеджер (YTM): вкл");
  } else {
    warn("Яндекс Тег Менеджер (YTM): выкл — npm run ytm:status");
  }
  if (counter.code_status && counter.code_status !== "CS_OK") {
    warn(`code_status: ${counter.code_status} (верификация кода нестабильна — часто из‑за adblock/кэша)`);
  } else {
    ok(`code_status: ${counter.code_status || "n/a"}`);
  }
  console.log("");

  let goals = [];
  try {
    const goalsData = await apiRequest(MANAGEMENT_API, `/counter/${id}/goals`);
    goals = goalsData.goals || [];
  } catch {
    warn("Не удалось получить цели");
  }

  console.log(`Цели (${goals.length})`);
  if (!goals.length) {
    warn("Целей нет");
  } else {
    for (const goal of goals) {
      ok(`${goal.name} · ${goal.type} · ${goal.status}${goal.goal_source === "auto" ? " · auto" : ""}`);
    }
  }
  console.log("");

  console.log("Контентная аналитика");
  const content = await checkContentAnalytics(id);
  if (content.enabled === true) {
    ok("Включена (API: presets publishers_* доступны)");
    ok(`Presets: ${content.available.join(", ")}`);
    ok("Ожидаемый тип разметки в UI: Schema.org → JSON-LD");
    ok(`Строк в отчёте за 30 дней: ${content.rows}`);
  } else if (content.enabled === false) {
    warn(`Выключена или ещё не применилась: ${content.reason}`);
    warn("Проверьте UI: Настройки → Счётчик → Контентная аналитика = ВКЛ");
    warn("Тип разметки: Schema.org → JSON-LD, затем Save");
    warn(`https://metrika.yandex.ru/settings?id=${id}&tab=common`);
  } else {
    warn(`Не удалось проверить: ${content.reason}`);
  }
  console.log("");

  try {
    const stats = await apiRequest(
      STAT_API,
      `/data?ids=${id}&metrics=ym:s:visits,ym:s:users,ym:s:pageviews&date1=7daysAgo&date2=today`,
    );
    const [visits, users, pageviews] = stats.totals || [0, 0, 0];
    console.log("Трафик (7 дней)");
    ok(`Визиты: ${visits}`);
    ok(`Посетители: ${users}`);
    ok(`Просмотры: ${pageviews}`);
  } catch (error) {
    warn(`Статистика недоступна: ${error.message}`);
  }

  console.log(`\nUI: https://metrika.yandex.ru/settings?id=${id}&tab=common`);
  console.log(`Контент: https://metrika.yandex.ru/stat/content_analytics?id=${id}`);
}

main().catch((error) => {
  if (error.status === 401) {
    printOAuthHelp();
    fail("Токен недействителен или истёк");
  }
  fail(error.message);
});

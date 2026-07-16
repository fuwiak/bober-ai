#!/usr/bin/env node

/**
 * Статус Яндекс Тег Менеджера (YTM) для счётчика Метрики.
 *
 * Важно: API YTM — только чтение (GET). Создать теги/бандлы через API нельзя —
 * это делается в UI: https://metrika.yandex.ru/ytm/tags?id=<counterId>
 *
 * Включение YTM на счётчике (code_options.ytm) тоже только в UI Метрики.
 *
 *   railway run npm run ytm:status
 *   # или:
 *   export YANDEX_OAUTH_TOKEN="y0_..."
 *   npm run ytm:status
 *
 * Для списка тегов контейнера нужен OAuth-scope ytm:read:
 *   https://oauth.yandex.ru/authorize?response_type=token&client_id=<CLIENT_ID>
 */

import fetch from "./lib/fetch.mjs";

const MANAGEMENT_API = "https://api-metrika.yandex.net/management/v1";
const YTM_API = "https://api.ytm.yandex.net/ytm/management/v1";

/** Шаблоны/бандлы, релевантные для Bober AI (B2B, не e-com витрина) */
const RECOMMENDED = [
  { id: 1937, name: "Яндекс Вебмастер", why: "подтверждение прав / связь с Вебмастером" },
  { id: 1, name: "Вариокуб", why: "A/B-эксперименты на сайте" },
  { id: 149, name: "Яндекс Метрика", why: "доп. события через YTM (если нужно)" },
  { id: 1775, name: "Mindbox OPA", why: "офлайн-конверсии / CRM (если используете Mindbox)" },
];

const SKIP_FOR_SITE = [
  { id: 1682, name: "Рекламная сеть Яндекса", why: "рекламные блоки — не нужны для B2B-лендинга" },
  { id: 695, name: "Поп-ап Сплит/Пэй", why: "e-com / Яндекс Пэй — не наш сценарий" },
];

const config = {
  token:
    process.env.YANDEX_OAUTH_TOKEN?.trim() ||
    process.env.YANDEX_METRIKA_OAUTH_TOKEN?.trim() ||
    process.env.YANDEX_WEBMASTER_OAUTH_TOKEN?.trim(),
  counterId: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim() || "110635302",
  containerId: process.env.YANDEX_YTM_CONTAINER_ID?.trim() || "",
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

function printOAuthHelp() {
  console.log(`
Нужен OAuth-токен:
  - metrika:read  — статус счётчика / флаг ytm
  - ytm:read      — список тегов/триггеров контейнера

1. oauth.yandex.ru → приложение (ClientID ${config.clientId})
2. Доступ к данным → добавьте «Яндекс Тег Менеджер» (ytm:read)
3. Новый токен:
   https://oauth.yandex.ru/authorize?response_type=token&client_id=${config.clientId}
4. export YANDEX_OAUTH_TOKEN="y0_..."
   или: railway run npm run ytm:status
`);
}

async function main() {
  const id = config.counterId;
  const containerId = config.containerId || id;

  console.log("Яндекс Тег Менеджер — статус\n");
  console.log(`  Счётчик Метрики: ${id}`);
  console.log(`  Container ID:    ${containerId}${config.containerId ? "" : " (по умолчанию = ID счётчика)"}\n`);

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
      fail("Нет права metrika:read");
    }
    throw error;
  }

  const ytmEnabled = Boolean(counter.code_options?.ytm);
  console.log("Счётчик");
  ok(`Имя: ${counter.name}`);
  ok(`Сайт: ${counter.site2?.site || counter.site}`);
  if (ytmEnabled) {
    ok("Яндекс Тег Менеджер: включён (code_options.ytm)");
  } else {
    warn("Яндекс Тег Менеджер: ВЫКЛЮЧЕН");
    warn("Включите в UI: Настройки счётчика → Тег Менеджер → Вкл → Сохранить");
    warn(`https://metrika.yandex.ru/settings?id=${id}&tab=common`);
  }
  console.log("");

  console.log("Каталог шаблонов (галерея API)");
  let gallery = [];
  try {
    const data = await apiRequest(YTM_API, "/templates/gallery");
    gallery = data.templates || [];
    ok(`Всего публичных шаблонов: ${gallery.length}`);
  } catch (error) {
    warn(`Галерея недоступна: ${error.message}`);
  }

  const byId = new Map(gallery.map((item) => [Number(item.template_id), item]));
  console.log("\nРекомендуется для bober-ai.dev:");
  for (const item of RECOMMENDED) {
    const live = byId.get(item.id);
    if (live) {
      ok(`${item.name} (template_id=${item.id}) — ${item.why}`);
    } else {
      warn(`${item.name} (template_id=${item.id}) — нет в галерее / скрыт`);
    }
  }

  console.log("\nОбычно не подключаем:");
  for (const item of SKIP_FOR_SITE) {
    warn(`${item.name} — ${item.why}`);
  }
  console.log("");

  console.log("Теги контейнера");
  if (!ytmEnabled) {
    warn("Сначала включите YTM в UI — иначе контейнер пустой / недоступен");
  }
  try {
    const data = await apiRequest(YTM_API, `/container/${containerId}/tags?per_page=100`);
    const tags = data.tags || [];
    if (!tags.length) {
      warn("Тегов пока нет — добавьте бандл в UI и опубликуйте");
    } else {
      ok(`Тегов: ${tags.length}`);
      for (const tag of tags) {
        ok(`${tag.name} · id=${tag.tag_id} · ${tag.type} · ${tag.status}`);
      }
    }
  } catch (error) {
    if (error.status === 403) {
      warn("Access denied — нужен OAuth scope ytm:read (и YTM включён в UI)");
      printOAuthHelp();
    } else if (error.status === 404) {
      warn("Контейнер не найден — проверьте YANDEX_YTM_CONTAINER_ID (правый верхний угол UI YTM)");
    } else {
      warn(error.message);
    }
  }

  try {
    const data = await apiRequest(YTM_API, `/container/${containerId}/triggers?per_page=100`);
    const triggers = data.triggers || [];
    console.log(`\nТриггеры: ${triggers.length}`);
    for (const trigger of triggers.slice(0, 20)) {
      ok(`${trigger.name} · id=${trigger.trigger_id || trigger.id}`);
    }
  } catch {
    // already warned on tags
  }

  console.log(`
Как добавить бандл (только UI — API write нет):
  1. Включите Тег Менеджер в настройках счётчика
  2. Откройте https://metrika.yandex.ru/ytm/tags?id=${id}
  3. Бандлы → выберите сервис (напр. «Яндекс Вебмастер» или «Вариокуб»)
  4. + Бандл → заполните параметры → Опубликовать
  5. Снова: railway run npm run ytm:status
`);
}

main().catch((error) => {
  if (error.status === 401) {
    printOAuthHelp();
    fail("Токен недействителен или истёк");
  }
  fail(error.message);
});

#!/usr/bin/env node
/**
 * Включить электронную коммерцию в Яндекс.Метрике:
 * - code_options.ecommerce = 1
 * - ecommerce_object = dataLayer
 * - currency = RUB (643)
 *
 *   npm run metrika:ecommerce
 *   yaga metrika ecommerce
 */

import fetch from "./lib/fetch.mjs";
import { applyYagaCredentials } from "./lib/yaga-credentials.mjs";

applyYagaCredentials();

const MANAGEMENT_API = "https://api-metrika.yandex.net/management/v1";
/** ISO 4217 numeric for RUB */
const CURRENCY_RUB = 643;
const DATA_LAYER = "dataLayer";

const COUNTERS = [
  {
    label: "main",
    id: process.env.PUBLIC_YANDEX_METRIKA_ID?.trim() ||
      process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim() ||
      "110635302",
  },
  {
    label: "partners",
    id: process.env.PUBLIC_PARTNERS_YANDEX_METRIKA_ID?.trim() ||
      process.env.NEXT_PUBLIC_PARTNERS_YANDEX_METRIKA_ID?.trim() ||
      "110926696",
  },
  {
    label: "bitrix",
    id: process.env.PUBLIC_BITRIX_YANDEX_METRIKA_ID?.trim() ||
      process.env.NEXT_PUBLIC_BITRIX_YANDEX_METRIKA_ID?.trim() ||
      "110926887",
  },
];

const config = {
  token:
    process.env.YANDEX_OAUTH_TOKEN?.trim() ||
    process.env.YANDEX_METRIKA_OAUTH_TOKEN?.trim() ||
    process.env.YANDEX_WEBMASTER_OAUTH_TOKEN?.trim(),
  clientId: process.env.YANDEX_WEBMASTER_CLIENT_ID?.trim() || "f2e2f11ae7e3492886ad61a6e45a4c5c",
};

function fail(msg) {
  console.error(`\nОшибка: ${msg}`);
  process.exit(1);
}

async function api(method, path, body) {
  const response = await fetch(`${MANAGEMENT_API}${path}`, {
    method,
    headers: {
      Authorization: `OAuth ${config.token}`,
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  let parsed = null;
  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }
  }
  if (!response.ok) {
    throw new Error(`${method} ${path} → HTTP ${response.status}: ${JSON.stringify(parsed)}`);
  }
  return parsed;
}

async function ensureEcommerce(counterId) {
  const current = await api("GET", `/counter/${counterId}`);
  const c = current.counter;
  const code = { ...(c.code_options || {}) };
  const already =
    Number(code.ecommerce) === 1 &&
    (code.ecommerce_object || DATA_LAYER) === DATA_LAYER &&
    (c.currency_code === "RUB" || Number(c.currency) === CURRENCY_RUB);

  if (already) {
    return { changed: false, counter: c };
  }

  const updated = await api("PUT", `/counter/${counterId}`, {
    counter: {
      name: c.name,
      site2: c.site2 || { site: c.site },
      currency: CURRENCY_RUB,
      code_options: {
        ...code,
        ecommerce: 1,
        ecommerce_object: DATA_LAYER,
      },
    },
  });
  return { changed: true, counter: updated.counter };
}

async function main() {
  console.log("Яндекс Метрика · электронная коммерция\n");
  console.log(`Контейнер: ${DATA_LAYER}`);
  console.log(`Валюта:    RUB (${CURRENCY_RUB})\n`);

  if (!config.token) {
    console.log(`Нужен токен metrika:write:
  https://oauth.yandex.ru/authorize?response_type=token&client_id=${config.clientId}
`);
    fail("Не задан YANDEX_OAUTH_TOKEN");
  }

  for (const entry of COUNTERS) {
    try {
      const { changed, counter } = await ensureEcommerce(entry.id);
      const code = counter.code_options || {};
      const mark = changed ? "+" : "✓";
      console.log(
        `${mark} ${entry.label} #${entry.id}: ecommerce=${code.ecommerce} object=${code.ecommerce_object || "—"} currency=${counter.currency_code || counter.currency}`,
      );
      console.log(`  UI: https://metrika.yandex.ru/settings?id=${entry.id}&tab=common`);
    } catch (error) {
      console.error(`✗ ${entry.label} #${entry.id}: ${error.message}`);
    }
  }

  console.log(`
Сайт: ym(…,'init',{ ecommerce: 'dataLayer' }) + window.dataLayer = [].
Данные: window.dataLayer.push({ ecommerce: { currencyCode: 'RUB', … } }).
Docs: https://yandex.ru/support/metrica/ecommerce/data.html
`);
}

main().catch((error) => fail(error.message || error));

#!/usr/bin/env node

/**
 * Галерея услуг (β) — подключение профиля Яндекс Услуг к Директу.
 *
 * Документация:
 *   https://yandex.ru/support/direct/ru/service-gallery/about
 *   https://yandex.ru/support/direct/ru/campaign-master/service.md
 *   https://yandex.ru/support/direct/ru/service-gallery/organization.md
 *
 * Важно:
 * - «Продвижение специалистов» в Мастере кампаний создаётся ТОЛЬКО в UI (не через API).
 * - ЕПК через API может включить место показа «Список организаций и галерея услуг»
 *   (SearchOrganizationList), но заявку на Direct API нужно сначала подтвердить.
 *
 *   npm run yandex:direct:service-gallery
 *   npm run yandex:direct:service-gallery -- --open
 *   npm run yandex:direct:service-gallery -- create-epk --dry-run
 *   npm run yandex:direct:service-gallery -- create-epk --budget-rub=1500
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { getDirectOAuthConfig, getValidDirectToken } from "./lib/yandex-oauth.mjs";
import fetch from "./lib/fetch.mjs";

const args = process.argv.slice(2);
const command = args.find((a) => !a.startsWith("--")) || "guide";
const flags = new Set(args.filter((a) => a.startsWith("--") && !a.includes("=")));
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG_PATH = join(root, "data", "direct-service-gallery.json");

function readFlag(name, fallback) {
  const inline = args.find((arg) => arg.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  return fallback;
}

function log(message = "") {
  console.log(message);
}

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

function loadConfig() {
  try {
    return JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
  } catch (error) {
    fail(`Не удалось прочитать ${CONFIG_PATH}: ${error.message}`);
  }
}

const config = loadConfig();
const ad = config.advertisement || {};

const PROFILE_URL =
  process.env.YANDEX_USLUGI_PROFILE_URL?.trim() ||
  ad.profileUrl ||
  config.profileUrl ||
  "https://uslugi.yandex.ru/profile/PawelStasinski-254144";

const SITE = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  config.siteUrl ||
  "https://www.bober-ai.dev"
).replace(/\/$/, "");

const DIRECT_UI = config.directUi || "https://direct.yandex.ru/dna/grid/campaigns";
const DIRECT_API_REGISTER = "https://yandex.ru/dev/direct/doc/dg/concepts/register.html";
const GALLERY_DOCS = config.docs?.gallery || "https://yandex.ru/support/direct/ru/service-gallery/about";
const MASTER_DOCS =
  config.docs?.master || "https://yandex.ru/support/direct/ru/campaign-master/service.md";

async function parseJson(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text.slice(0, 500) };
  }
}

async function directApi(token, service, method, params) {
  const response = await fetch(`https://api.direct.yandex.com/json/v5/${service}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Accept-Language": "ru",
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ method, params }),
  });
  return { status: response.status, body: await parseJson(response) };
}

async function getToken() {
  const config = getDirectOAuthConfig();
  try {
    return await getValidDirectToken(config);
  } catch (error) {
    if (config.accessToken) {
      warn(`OAuth: ${error.message} — использую YANDEX_DIRECT_OAUTH_TOKEN`);
      return config.accessToken;
    }
    throw error;
  }
}

function openUrl(url) {
  const cmd =
    process.platform === "darwin" ? "open" : process.platform === "win32" ? "cmd" : "xdg-open";
  const argv = process.platform === "win32" ? ["/c", "start", "", url] : [url];
  spawn(cmd, argv, { detached: true, stdio: "ignore" }).unref();
}

function printGuide() {
  log(`Галерея услуг (β) — подключение Bober AI\n`);
  log(`Профиль Услуг: ${PROFILE_URL}`);
  log(`Сайт:          ${SITE}`);
  log(`Кабинет:       ${DIRECT_UI}`);
  log(`Справка:       ${GALLERY_DOCS}`);
  log(`Мастер:        ${MASTER_DOCS}\n`);

  if (ad.title) {
    log(`Объявление из Яндекс Услуг (источник галереи)`);
    log(`  ${ad.title}`);
    log(`  Рейтинг: ${ad.rating ?? "—"} · отзывов: ${ad.reviewsCount ?? "—"} · ${ad.geo || ""}`);
    if (ad.summary) log(`  ${ad.summary}`);
    const offers = Array.isArray(ad.featuredOffers) ? ad.featuredOffers : [];
    if (offers.length) {
      log(`  Офферы:`);
      for (const offer of offers) {
        const price = offer.priceFrom != null ? `от ${offer.priceFrom} ₽` : "";
        log(`    • ${offer.name}${price ? ` — ${price}` : ""}`);
      }
    }
    log("");
  }

  log(`Путь A — частный мастер / Услуги (рекомендуется для вашего профиля)`);
  log(`  1. Откройте ${DIRECT_UI}`);
  log(`  2. Добавить → Кампанию → вкладка «Мастер кампаний»`);
  log(`  3. Выберите «Продвижение специалистов» (или «Конверсии и трафик»)`);
  log(`  4. Вставьте ссылку на профиль:`);
  log(`       ${PROFILE_URL}`);
  log(`  5. Регион: Москва (+ при необходимости Россия)`);
  log(`  6. Аудитория: «Подобрать оптимальную» или интересы IT/автоматизация/CRM`);
  log(`  7. Бюджет теста: от 300–1500 ₽/день, запустите кампанию`);
  log(`  8. Если профиль не подтянулся — Услуги ещё не отдали данные в Директ`);
  log(`     (нужна модерация профиля/офертов на Услугах).\n`);

  log(`Путь B — организация / ЕПК (если есть карточка Яндекс Бизнеса)`);
  log(`  1. Единая перфоманс-кампания на сайт ${SITE}`);
  log(`  2. В «Местах показа» включить: «Список организаций и галерея услуг»`);
  log(`  3. Привязать организацию из Яндекс Бизнеса`);
  log(`  4. API-эквивалент: npm run yandex:direct:service-gallery -- create-epk\n`);

  log(`Блокеры сейчас:`);
  log(`  • Мастер кампаний / «Продвижение специалистов» — только UI, не API`);
  log(`  • Direct API: нужна подтверждённая заявка (иначе error 58)`);
  log(`  • Заявка: ${DIRECT_API_REGISTER}`);
  log(`  • Client ID: ${process.env.YANDEX_DIRECT_CLIENT_ID || "(см. .env / Railway)"}\n`);

  if (flags.has("--open")) {
    ok(`Открываю кабинет и профиль…`);
    openUrl(DIRECT_UI);
    openUrl(PROFILE_URL);
  } else {
    log(`Подсказка: npm run yandex:direct:service-gallery -- --open`);
  }
}

async function checkApi() {
  log(`Проверка Direct API…\n`);
  const token = await getToken();
  const clients = await directApi(token, "clients", "get", {
    FieldNames: ["Login", "ClientId", "Currency"],
  });

  if (clients.body?.error?.error_code === 58) {
    warn(`${clients.body.error.error_string}: ${clients.body.error.error_detail}`);
    warn(`Пока API недоступен — подключайте галерею через Мастер кампаний в UI (путь A).`);
    return { ok: false, code: 58 };
  }

  if (clients.body?.error) {
    fail(`${clients.body.error.error_string}: ${clients.body.error.error_detail || ""}`);
  }

  const client = clients.body?.result?.Clients?.[0];
  if (client) {
    ok(`Login: ${client.Login}`);
    ok(`ClientId: ${client.ClientId}`);
  }
  return { ok: true, client };
}

async function createEpk() {
  const dryRun = flags.has("--dry-run");
  const budgetRub = Number(readFlag("--budget-rub", "1500"));
  const name = readFlag("--name", "Bober AI — Галерея услуг (ЕПК)");

  log(`ЕПК с местом показа «Список организаций и галерея услуг»\n`);
  warn(`Это не «Продвижение специалистов» из Мастера — API-путь для организаций.`);
  log(`Имя:    ${name}`);
  log(`Сайт:   ${SITE}`);
  log(`Бюджет: ${budgetRub} ₽/день`);

  // Reuse campaigns script for actual create
  const childArgs = [
    "run",
    "yandex:direct:campaigns",
    "--",
    "create-unified",
    `--budget-rub=${budgetRub}`,
    `--name=${name}`,
    `--site=${SITE}`,
  ];
  if (dryRun) childArgs.push("--dry-run");

  const { spawnSync } = await import("node:child_process");
  const result = spawnSync("npm", childArgs, { stdio: "inherit", encoding: "utf8" });
  process.exit(result.status || 0);
}

async function main() {
  switch (command) {
    case "guide":
    case "help":
    case "--help":
      printGuide();
      await checkApi().catch((error) => warn(error.message));
      break;
    case "status":
      printGuide();
      await checkApi();
      break;
    case "create-epk":
      await createEpk();
      break;
    default:
      fail(`Неизвестная команда: ${command}. Используйте guide | status | create-epk`);
  }
}

main().catch((error) => fail(error.message));

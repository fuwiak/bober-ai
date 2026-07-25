#!/usr/bin/env node

/**
 * Kwork → Bitrix24 CRM sync (MVP)
 *
 * Исследование (2026-07):
 * - Официальной интеграции Kwork ↔ Bitrix24 (Market / Albato / Zapier / n8n / Make) нет.
 * - Публичного документированного API Kwork для сторонних разработчиков нет.
 *   api.kwork.ru отвечает 401 без сессии приложения; неофициальные обёртки
 *   (pykwork, kesha1225/kwork) используют закрытые mobile/web endpoints — в этот
 *   скрипт они НЕ подключены (ломко, ToS, нет гарантий).
 * - Профиль продавца (контекст): https://kwork.ru/user/pasha_stasinski
 *
 * Что делает этот MVP:
 *   A) Импорт заказов из CSV/JSON/session-pull → лиды или сделки Bitrix24
 *   B) Гарантирует SOURCE_ID=KWORK в crm.status (ENTITY_ID=SOURCE)
 *   C) Дедуп по ORIGINATOR_ID=kwork + ORIGIN_ID=<order_id>
 *   D) Принимает тот же JSON через webhook POST /api/kwork/webhook (см. route.ts)
 *
 * Альтернативы без API:
 *   - Live pull своей сессии: KWORK_COOKIE → --pull (GET /get_manage_orders)
 *   - Offline capture: Chrome HAR / cat-catch JSON → --har / --capture
 *     (см. scripts/kwork-capture-guide.md)
 *   - Email/IMAP уведомлений Kwork — хрупко, зависит от шаблонов писем
 *   - Browser automation / пароли в репо — запрещены
 *
 * Setup:
 *   1. Bitrix OAuth уже есть: npm run bitrix:oauth -- test (scope crm)
 *   2. KWORK_COOKIE / KWORK_COOKIES_FILE в ~/.config/yaga/ (mode 0600; не коммитить)
 *      ИЛИ CSV/JSON/HAR/capture файл с заказами
 *   3. (опционально) KWORK_PROFILE_URL, KWORK_WEBHOOK_SECRET в credentials.env
 *
 * Запуск:
 *   npm run kwork:bitrix:pull -- --dry-run
 *   npm run kwork:bitrix:pull
 *   npm run kwork:bitrix:sync -- --pull --dry-run
 *   npm run kwork:bitrix:sync -- --csv data/kwork-orders.example.csv --dry-run
 *   npm run kwork:bitrix:sync -- --csv path/to/orders.csv
 *   npm run kwork:bitrix:sync -- --json path/to/orders.json
 *   npm run kwork:bitrix:from-har -- data/kwork-orders.har.example.json --dry-run
 *   npm run kwork:bitrix:sync -- --har path/to/session.har
 *   npm run kwork:bitrix:sync -- --capture data/kwork-capture.example.json --dry-run
 *   npm run kwork:bitrix:categories
 *   npm run kwork:bitrix:sync -- --capture data/kwork-categories.capture.json --kind categories
 *   npm run kwork:bitrix:sync -- --ensure-source-only
 *   npm run kwork:bitrix:sync -- --csv orders.csv --entity deal
 *
 * Env:
 *   BITRIX24_*          — существующий OAuth локального приложения
 *   KWORK_COOKIE        — Cookie header (локально; не коммитить)
 *   KWORK_COOKIES_FILE  — путь к файлу cookies (~/.config/yaga/)
 *   KWORK_PULL_STATUSES — через запятую, по умолчанию all
 *   KWORK_PROFILE_URL   — по умолчанию https://kwork.ru/user/pasha_stasinski
 *   KWORK_SOURCE_ID     — STATUS_ID источника CRM (по умолчанию KWORK)
 *   KWORK_ENTITY        — lead | deal (по умолчанию lead)
 *   KWORK_SYNC_STATE    — путь к state JSON (дедуп-кэш), опционально
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { applyYagaCredentials, upsertYagaCredentials } from "./lib/yaga-credentials.mjs";
import {
  bitrixCredentialVarsFromBundle,
  bitrixRest,
  getBitrixOAuthConfig,
  isTokenExpired,
  refreshAccessToken,
} from "./lib/bitrix-oauth.mjs";
import {
  loadCategoriesFromCaptureFile,
  loadOrdersFromCaptureFile,
} from "./lib/kwork-capture.mjs";
import {
  fetchSellerOrders,
  getSession,
  probeAuth,
} from "./lib/kwork-session.mjs";

applyYagaCredentials();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const SOURCE_ID = (process.env.KWORK_SOURCE_ID || "KWORK").trim().toUpperCase();
const SOURCE_NAME = "Kwork";
const ORIGINATOR_ID = "kwork";
const CATALOG_ID = Number(process.env.KWORK_CATALOG_ID || 24);
const CURRENCY_ID = "RUB";
const MEASURE_PIECE = 9;
const DEFAULT_PROFILE =
  process.env.KWORK_PROFILE_URL?.trim() || "https://kwork.ru/user/pasha_stasinski";

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const ENSURE_SOURCE_ONLY = args.includes("--ensure-source-only");
const PULL = args.includes("--pull");
const DO_UPDATE = args.includes("--update");

function readFlag(name) {
  const i = args.indexOf(name);
  if (i >= 0 && args[i + 1] && !args[i + 1].startsWith("--")) return args[i + 1];
  return "";
}

const KIND = (readFlag("--kind") || "").trim().toLowerCase();
const ENTITY = (
  readFlag("--entity") ||
  process.env.KWORK_ENTITY ||
  "lead"
)
  .trim()
  .toLowerCase();

function log(msg) {
  console.log(msg);
}

function fail(msg) {
  console.error(`\nОшибка: ${msg}`);
  process.exit(1);
}

async function ensureConfig() {
  let config = getBitrixOAuthConfig();
  if (!config.accessToken || isTokenExpired(config)) {
    if (!config.refreshToken) fail("Нет BITRIX24_ACCESS_TOKEN / REFRESH_TOKEN");
    const bundle = await refreshAccessToken(config);
    upsertYagaCredentials(
      bitrixCredentialVarsFromBundle(bundle, {
        portal: config.portal,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        redirectUri: config.redirectUri,
      }),
    );
    applyYagaCredentials();
    config = getBitrixOAuthConfig();
    log("Токен Bitrix обновлён");
  }
  return config;
}

async function rest(method, params, config) {
  const { body } = await bitrixRest(method, params, config);
  if (body.error) {
    const err = new Error(`${method}: ${body.error_description || body.error}`);
    err.code = body.error;
    err.body = body;
    throw err;
  }
  return body.result;
}

/**
 * Гарантирует статус-источник SOURCE (как TELEGRAM/WEB).
 * @see https://apidocs.bitrix24.ru/api-reference/crm/status/crm-status-add.html
 */
async function ensureKworkSource(config) {
  const items = (await rest("crm.status.entity.items", { entityId: "SOURCE" }, config)) || [];
  const existing = items.find(
    (s) => String(s.STATUS_ID || "").toUpperCase() === SOURCE_ID || s.NAME === SOURCE_NAME,
  );
  if (existing) {
    log(`Источник CRM уже есть: ${existing.STATUS_ID} («${existing.NAME}»)`);
    return String(existing.STATUS_ID);
  }
  if (DRY_RUN) {
    log(`[dry-run] crm.status.add SOURCE ${SOURCE_ID} «${SOURCE_NAME}»`);
    return SOURCE_ID;
  }
  const sort = Math.max(0, ...items.map((s) => Number(s.SORT) || 0)) + 10;
  await rest(
    "crm.status.add",
    {
      fields: {
        ENTITY_ID: "SOURCE",
        STATUS_ID: SOURCE_ID,
        NAME: SOURCE_NAME,
        SORT: sort,
      },
    },
    config,
  );
  log(`Создан источник CRM: ${SOURCE_ID} («${SOURCE_NAME}»)`);
  return SOURCE_ID;
}

/** Минимальный CSV-парсер (кавычки, запятая/точка с запятой). */
function parseCsv(text) {
  const delim = text.includes(";") && !text.split("\n")[0].includes(",") ? ";" : ",";
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      continue;
    }
    if (ch === delim) {
      row.push(cell.trim());
      cell = "";
      continue;
    }
    if (ch === "\n" || (ch === "\r" && next === "\n")) {
      if (ch === "\r") i++;
      row.push(cell.trim());
      cell = "";
      if (row.some((c) => c !== "")) rows.push(row);
      row = [];
      continue;
    }
    if (ch !== "\r") cell += ch;
  }
  row.push(cell.trim());
  if (row.some((c) => c !== "")) rows.push(row);

  if (!rows.length) return [];
  const headers = rows[0].map((h) => h.trim().toLowerCase().replace(/\s+/g, "_"));
  return rows.slice(1).map((cols) => {
    /** @type {Record<string, string>} */
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = cols[idx] ?? "";
    });
    return obj;
  });
}

/**
 * Нормализация заказа из CSV/JSON/webhook.
 * @returns {{
 *   orderId: string,
 *   buyerName: string,
 *   title: string,
 *   budget: string,
 *   status: string,
 *   orderUrl: string,
 *   buyerUsername: string,
 *   email: string,
 *   phone: string,
 *   notes: string,
 * }}
 */
function normalizeOrder(raw) {
  const g = (...keys) => {
    for (const k of keys) {
      const v = raw[k] ?? raw[k.toLowerCase()] ?? raw[k.toUpperCase()];
      if (v != null && String(v).trim() !== "") return String(v).trim();
    }
    return "";
  };

  const orderId = g("order_id", "orderid", "id", "заказ", "номер_заказа");
  const title = g("title", "order_title", "name", "название", "кворк");
  const buyerName = g("buyer_name", "buyer", "client", "покупатель", "name", "имя");
  const budget = g("budget", "price", "amount", "сумма", "бюджет");
  const status = g("status", "state", "статус");
  let orderUrl = g("order_url", "url", "link", "ссылка");
  const buyerUsername = g("buyer_username", "username", "buyer_login", "логин");
  const email = g("email", "buyer_email");
  const phone = g("phone", "buyer_phone", "телефон");
  const notes = g("notes", "comment", "comments", "комментарий");

  if (!orderUrl && orderId && /^\d+$/.test(orderId)) {
    orderUrl = `https://kwork.ru/tracker/view?id=${orderId}`;
  }

  return {
    orderId: orderId || `manual-${Buffer.from(`${buyerName}|${title}`).toString("base64url").slice(0, 24)}`,
    buyerName: buyerName || buyerUsername || "Покупатель Kwork",
    title: title || "Заказ Kwork",
    budget,
    status: status || "unknown",
    orderUrl,
    buyerUsername,
    email,
    phone,
    notes,
  };
}

function resolvePath(p) {
  return path.isAbsolute(p) ? p : path.join(ROOT, p);
}

async function loadOrdersFromSession() {
  const session = getSession();
  const auth = await probeAuth(session);
  if (!auth.authenticated) {
    fail(
      "Сессия Kwork не авторизована (редирект на login или нет userId в /seller). Обновите KWORK_COOKIE.",
    );
  }
  log(
    `Сессия OK: userId=${auth.userId || "?"} actor=${auth.actorType || "?"} seller=${auth.sellerStatus}`,
  );
  if (auth.ordersCount) {
    log(
      `Счётчик API: asWorker=${auth.ordersCount.asWorker ?? "?"} asPayer=${auth.ordersCount.asPayer ?? "?"} (активные; история — через get_manage_orders)`,
    );
  }

  const statuses = (
    readFlag("--statuses") ||
    process.env.KWORK_PULL_STATUSES ||
    "all"
  )
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const { orders, meta } = await fetchSellerOrders({ session, statuses });
  log(
    `Pull (${meta.endpoint}): statuses=${statuses.join("|")} unique=${meta.unique} → заказов ${orders.length}`,
  );
  for (const [name, info] of Object.entries(meta.statuses || {})) {
    log(`  · ${name}: pages=${info.pages} ordersCount=${info.ordersCount} fetched=${info.fetched}`);
  }
  return orders.map(normalizeOrder);
}

async function loadOrders() {
  if (PULL) {
    return loadOrdersFromSession();
  }

  const csvPath = readFlag("--csv");
  const jsonPath = readFlag("--json");
  const harPath = readFlag("--har");
  const capturePath = readFlag("--capture");
  const sources = [csvPath, jsonPath, harPath, capturePath].filter(Boolean);
  if (!sources.length) {
    fail(
      "Укажите --pull / --csv / --json / --har / --capture <file> (или --ensure-source-only). Гайд: scripts/kwork-capture-guide.md",
    );
  }
  if (sources.length > 1) {
    fail("Укажите только один источник: --csv, --json, --har или --capture");
  }

  if (csvPath) {
    const text = fs.readFileSync(resolvePath(csvPath), "utf8");
    return parseCsv(text).map(normalizeOrder);
  }
  if (jsonPath) {
    const data = JSON.parse(fs.readFileSync(resolvePath(jsonPath), "utf8"));
    const list = Array.isArray(data) ? data : data.orders || data.items || [];
    return list.map(normalizeOrder);
  }
  if (harPath) {
    const abs = resolvePath(harPath);
    const { orders, meta, kind } = loadOrdersFromCaptureFile(abs, "har");
    log(
      `Capture (${kind}): entries=${meta.entries ?? "?"} kwork=${meta.kworkEntries ?? "?"} jsonBodies=${meta.jsonBodies ?? "?"} → заказов ${orders.length}`,
    );
    if (!orders.length) {
      fail(
        "В HAR не найдено order-like JSON. Откройте трекер/заказы под своей сессией и сохраните HAR with content. См. scripts/kwork-capture-guide.md",
      );
    }
    return orders.map(normalizeOrder);
  }
  const abs = resolvePath(capturePath);
  const { orders, meta, kind } = loadOrdersFromCaptureFile(abs, "capture");
  log(
    `Capture (${kind}): items=${meta.items ?? "?"} withBody=${meta.withBody ?? "?"} → заказов ${orders.length}`,
  );
  if (!orders.length) {
    fail(
      "В capture JSON не найдено заказов. Нужны тела ответов (body/text/content), не только URL. См. scripts/kwork-capture-guide.md",
    );
  }
  return orders.map(normalizeOrder);
}

function statePath() {
  return (
    process.env.KWORK_SYNC_STATE?.trim() ||
    path.join(ROOT, "data", ".kwork-bitrix-sync-state.json")
  );
}

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(statePath(), "utf8"));
  } catch {
    return { byOrigin: {} };
  }
}

function saveState(state) {
  if (DRY_RUN) return;
  const file = statePath();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(state, null, 2) + "\n");
}

function orderComments(order) {
  return [
    `Источник: Kwork (${DEFAULT_PROFILE})`,
    order.orderUrl ? `Заказ: ${order.orderUrl}` : `Order ID: ${order.orderId}`,
    order.status ? `Статус Kwork: ${order.status}` : "",
    order.budget ? `Бюджет: ${order.budget}` : "",
    order.buyerUsername ? `Покупатель @${order.buyerUsername.replace(/^@/, "")}` : "",
    order.notes || "",
  ]
    .filter(Boolean)
    .join("\n")
    .slice(0, 5000);
}

async function findExistingLead(order, config) {
  const list = await rest(
    "crm.lead.list",
    {
      filter: {
        ORIGINATOR_ID,
        ORIGIN_ID: order.orderId,
      },
      select: ["ID", "TITLE", "STATUS_ID", "OPPORTUNITY"],
    },
    config,
  );
  return list?.[0] || null;
}

async function findExistingDeal(order, config) {
  const list = await rest(
    "crm.deal.list",
    {
      filter: {
        ORIGINATOR_ID,
        ORIGIN_ID: order.orderId,
      },
      select: ["ID", "TITLE", "STAGE_ID", "OPPORTUNITY"],
    },
    config,
  );
  return list?.[0] || null;
}

function opportunity(order) {
  if (!order.budget) return undefined;
  const n = Number(String(order.budget).replace(/[^\d.,]/g, "").replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

async function upsertLead(order, sourceId, config, stats) {
  const fields = {
    TITLE: `[Kwork] ${order.title} — ${order.buyerName}`,
    NAME: order.buyerName,
    SOURCE_ID: sourceId,
    SOURCE_DESCRIPTION: `Kwork · ${order.status}`,
    COMMENTS: orderComments(order),
    OPENED: "Y",
    ORIGINATOR_ID,
    ORIGIN_ID: order.orderId,
  };
  const opp = opportunity(order);
  if (opp != null) {
    fields.OPPORTUNITY = opp;
    fields.CURRENCY_ID = "RUB";
  }
  if (order.email) fields.EMAIL = [{ VALUE: order.email, VALUE_TYPE: "WORK" }];
  if (order.phone) fields.PHONE = [{ VALUE: order.phone, VALUE_TYPE: "WORK" }];

  const existing = await findExistingLead(order, config);
  if (existing) {
    if (DRY_RUN) {
      log(`  [dry-run] lead update #${existing.ID} ${order.orderId}`);
      stats.updated += 1;
      return existing.ID;
    }
    await rest("crm.lead.update", { id: existing.ID, fields }, config);
    log(`  lead ~ #${existing.ID} order=${order.orderId}`);
    stats.updated += 1;
    return Number(existing.ID);
  }
  if (DRY_RUN) {
    log(`  [dry-run] lead + ${order.orderId} «${order.title}»`);
    stats.created += 1;
    return -1;
  }
  const id = await rest("crm.lead.add", { fields }, config);
  log(`  lead + #${id} order=${order.orderId}`);
  stats.created += 1;
  return Number(id);
}

async function upsertDeal(order, sourceId, config, stats) {
  const fields = {
    TITLE: `[Kwork] ${order.title} — ${order.buyerName}`,
    SOURCE_ID: sourceId,
    SOURCE_DESCRIPTION: `Kwork · ${order.status}`,
    COMMENTS: orderComments(order),
    OPENED: "Y",
    ORIGINATOR_ID,
    ORIGIN_ID: order.orderId,
  };
  const opp = opportunity(order);
  if (opp != null) {
    fields.OPPORTUNITY = opp;
    fields.CURRENCY_ID = "RUB";
  }

  const existing = await findExistingDeal(order, config);
  if (existing) {
    if (DRY_RUN) {
      log(`  [dry-run] deal update #${existing.ID} ${order.orderId}`);
      stats.updated += 1;
      return existing.ID;
    }
    await rest("crm.deal.update", { id: existing.ID, fields }, config);
    log(`  deal ~ #${existing.ID} order=${order.orderId}`);
    stats.updated += 1;
    return Number(existing.ID);
  }
  if (DRY_RUN) {
    log(`  [dry-run] deal + ${order.orderId} «${order.title}»`);
    stats.created += 1;
    return -1;
  }
  const id = await rest("crm.deal.add", { fields }, config);
  log(`  deal + #${id} order=${order.orderId}`);
  stats.created += 1;
  return Number(id);
}

async function listCatalogProducts(config) {
  const all = [];
  let start = 0;
  for (;;) {
    const { body } = await bitrixRest(
      "crm.product.list",
      {
        filter: { CATALOG_ID },
        select: ["ID", "NAME", "PRICE", "CURRENCY_ID", "XML_ID", "SECTION_ID", "DESCRIPTION"],
        start,
      },
      config,
    );
    if (body.error) throw new Error(body.error_description || body.error);
    const batch = body.result || [];
    all.push(...batch);
    if (!body.next) break;
    start = body.next;
  }
  return all;
}

async function listCatalogSections(config) {
  return (
    (await rest(
      "crm.productsection.list",
      { filter: { CATALOG_ID }, select: ["ID", "NAME", "XML_ID", "SECTION_ID"] },
      config,
    )) || []
  );
}

/**
 * @param {{ xmlId: string, name: string, parentId?: number }} def
 */
async function ensureCatalogSection(def, byXml, byName, config, stats) {
  const existing = byXml.get(def.xmlId) || byName.get(def.name);
  if (existing) {
    stats.sectionsSkipped += 1;
    return Number(existing.ID);
  }
  if (DRY_RUN) {
    log(`  [dry-run] section + ${def.name}`);
    stats.sectionsCreated += 1;
    return -1;
  }
  const fields = {
    CATALOG_ID,
    NAME: def.name,
    XML_ID: def.xmlId,
  };
  if (def.parentId && def.parentId > 0) fields.SECTION_ID = def.parentId;
  const id = await rest("crm.productsection.add", { fields }, config);
  log(`  section + ${def.name} (#${id})`);
  stats.sectionsCreated += 1;
  const row = { ID: String(id), NAME: def.name, XML_ID: def.xmlId };
  byXml.set(def.xmlId, row);
  byName.set(def.name, row);
  return Number(id);
}

function categoryXmlId(leaf) {
  if (leaf.id) return `kwork-cat-${leaf.id}`;
  const slug = String(leaf.url || leaf.name)
    .toLowerCase()
    .replace(/^https?:\/\/kwork\.ru\/categories\//, "")
    .replace(/[^a-z0-9а-яё_-]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
  return `kwork-cat-${slug || Buffer.from(leaf.name).toString("base64url").slice(0, 16)}`;
}

async function syncCategoryProduct(leaf, sectionId, byXml, byName, config, stats) {
  const xmlId = categoryXmlId(leaf);
  const name = leaf.name;
  const existing = byXml.get(xmlId) || byName.get(name);
  const fields = {
    CATALOG_ID,
    NAME: name,
    PRICE: 0,
    CURRENCY_ID,
    DESCRIPTION: leaf.url || leaf.path.join(" › "),
    DESCRIPTION_TYPE: "text",
    SECTION_ID: sectionId > 0 ? sectionId : undefined,
    ACTIVE: "Y",
    XML_ID: xmlId,
    MEASURE: MEASURE_PIECE,
  };

  if (existing) {
    if (DO_UPDATE && !DRY_RUN) {
      await rest("crm.product.update", { id: existing.ID, fields }, config);
      log(`  update  ${name} (#${existing.ID})`);
      stats.updated += 1;
    } else {
      stats.skipped += 1;
    }
    return;
  }

  if (DRY_RUN) {
    log(`  [dry-run] + ${name} · ${leaf.url || ""}`);
    stats.created += 1;
    return;
  }

  const id = await rest("crm.product.add", { fields }, config);
  log(`  + ${name} (#${id})`);
  stats.created += 1;
  const row = { ID: String(id), NAME: name, XML_ID: xmlId };
  byXml.set(xmlId, row);
  byName.set(name, row);
}

async function syncCategoriesToCatalog(config) {
  const capturePath =
    readFlag("--capture") ||
    path.join(ROOT, "data", "kwork-categories.capture.json");
  const abs = resolvePath(capturePath);
  if (!fs.existsSync(abs)) {
    fail(`Нет файла категорий: ${abs}`);
  }

  const { categories, leaves, meta, kind } = loadCategoriesFromCaptureFile(abs);
  log(
    `Категории (${kind}): roots=${meta.roots ?? "?"} format=${meta.kind ?? "?"} → листьев ${leaves.length}`,
  );
  if (!categories.length || !leaves.length) {
    fail(
      "В файле нет дерева категорий {success,data:[{name,url,children[]}]} или get_categories. Это не заказы — см. scripts/kwork-capture-guide.md",
    );
  }

  log(`Каталог CRM IBLOCK_ID=${CATALOG_ID}`);
  if (DRY_RUN) log("Режим: --dry-run (без записи)");
  if (DO_UPDATE) log("Режим: --update (обновлять существующие)");

  const stats = {
    sectionsCreated: 0,
    sectionsSkipped: 0,
    created: 0,
    updated: 0,
    skipped: 0,
    failed: [],
  };

  const sections = await listCatalogSections(config);
  const secByXml = new Map(sections.filter((s) => s.XML_ID).map((s) => [s.XML_ID, s]));
  const secByName = new Map(sections.map((s) => [s.NAME, s]));

  const rootSectionId = await ensureCatalogSection(
    { xmlId: "kwork-categories", name: "Kwork категории" },
    secByXml,
    secByName,
    config,
    stats,
  );

  /** @type {Map<string, number>} */
  const subSectionIds = new Map();
  for (const root of categories) {
    const rootName = String(root.name || "").trim();
    if (!rootName) continue;
    const subId = await ensureCatalogSection(
      {
        xmlId: `kwork-cat-sec-${root.id || rootName}`,
        name: rootName,
        parentId: rootSectionId,
      },
      secByXml,
      secByName,
      config,
      stats,
    );
    subSectionIds.set(rootName, subId);
  }

  const products = await listCatalogProducts(config);
  const prodByXml = new Map(products.filter((p) => p.XML_ID).map((p) => [p.XML_ID, p]));
  const prodByName = new Map(products.map((p) => [p.NAME, p]));
  log(`Уже в каталоге: ${products.length} позиций`);
  log("Листья категорий → товары/услуги (PRICE=0):");

  for (const leaf of leaves) {
    try {
      const sectionId =
        subSectionIds.get(leaf.sectionName) ??
        subSectionIds.get(leaf.path[0]) ??
        rootSectionId;
      await syncCategoryProduct(leaf, sectionId, prodByXml, prodByName, config, stats);
    } catch (err) {
      stats.failed.push({ name: leaf.name, error: err.message || String(err) });
      console.error(`  ! ${leaf.name}: ${err.message || err}`);
    }
  }

  log("");
  log("—— Итог (категории → каталог) ——");
  log(`Секции: создано ${stats.sectionsCreated}, пропущено ${stats.sectionsSkipped}`);
  log(
    `Позиции: создано ${stats.created}, обновлено ${stats.updated}, пропущено ${stats.skipped}, ошибок ${stats.failed.length}`,
  );
  log(
    `Проверка: ${config.portal}/crm/catalog/list/0/?IBLOCK_ID=${CATALOG_ID}&type=CRM_PRODUCT_CATALOG&lang=ru`,
  );
  if (stats.failed.length) process.exitCode = 1;
  return stats;
}

async function main() {
  let isCategories = KIND === "categories" || KIND === "category";

  // Авто: capture-файл с меню категорий → каталог, не лиды
  if (!isCategories && !PULL && !ENSURE_SOURCE_ONLY) {
    const capturePath = readFlag("--capture");
    if (capturePath) {
      try {
        const peek = loadCategoriesFromCaptureFile(resolvePath(capturePath));
        if (peek.leaves?.length && peek.categories?.length) {
          isCategories = true;
          log("Обнаружено дерево категорий в --capture → режим catalog (как --kind categories)");
        }
      } catch {
        // не категории — обычный order-path
      }
    }
  }

  if (!isCategories && ENTITY !== "lead" && ENTITY !== "deal") {
    fail(`--entity должен быть lead или deal, получено: ${ENTITY}`);
  }

  log(
    `Kwork → Bitrix24 sync${DRY_RUN ? " (dry-run)" : ""}${PULL ? " (session pull)" : ""}${isCategories ? " (categories → catalog)" : ""}`,
  );
  log(`Профиль: ${DEFAULT_PROFILE}`);
  if (!isCategories) log(`Сущность: ${ENTITY}, SOURCE_ID=${SOURCE_ID}`);
  else log(`Каталог IBLOCK_ID=${CATALOG_ID}, дедуп по XML_ID/NAME`);
  log("");
  if (isCategories) {
    log("Источник: публичное меню категорий Kwork (не заказы продавца).");
  } else if (PULL) {
    log("Источник: своя сессия Kwork (KWORK_COOKIE) → GET /get_manage_orders.");
    log("Только свой аккаунт. Cookies не коммитить; после теста лучше сбросить сессии на Kwork.");
  } else {
    log("Ограничение: у Kwork нет публичного API — импорт CSV/JSON/HAR/capture/webhook или --pull.");
  }
  log("");

  const config = await ensureConfig();

  if (isCategories) {
    await syncCategoriesToCatalog(config);
    return;
  }

  const sourceId = await ensureKworkSource(config);

  if (ENSURE_SOURCE_ONLY) {
    log("Готово (--ensure-source-only).");
    return;
  }

  const orders = await loadOrders();
  if (!orders.length) fail(PULL ? "Нет заказов в сессии Kwork" : "Нет заказов во входном файле");

  const state = loadState();
  const stats = { created: 0, updated: 0, skipped: 0, errors: 0 };

  for (const order of orders) {
    try {
      const id =
        ENTITY === "deal"
          ? await upsertDeal(order, sourceId, config, stats)
          : await upsertLead(order, sourceId, config, stats);
      state.byOrigin[order.orderId] = {
        entity: ENTITY,
        bitrixId: id,
        title: order.title,
        syncedAt: new Date().toISOString(),
      };
    } catch (err) {
      stats.errors += 1;
      console.error(`  ! order=${order.orderId}: ${err.message || err}`);
    }
  }

  saveState(state);
  log("");
  log(
    `Итого: +${stats.created} создано, ~${stats.updated} обновлено, ошибок ${stats.errors}`,
  );
  if (stats.errors) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

/**
 * Kwork offline capture parser (HAR / cat-catch-style JSON).
 *
 * Назначение: извлечь order-like объекты из локальных дампов сетевых ответов
 * аккаунта продавца. Без логина, без Playwright, без хранения паролей.
 *
 * Форматы:
 *   1) Chrome DevTools HAR (Save all as HAR with content)
 *   2) cat-catch-style JSON: список ресурсов с url + body/text/content,
 *      либо уже распарсенные JSON-ответы / массив заказов
 *
 * cat-catch (https://github.com/xifangczy/cat-catch) — в первую очередь
 * медиа-сниффер (m3u8/video). Для заказов Kwork надёжнее HAR; JSON-список
 * URL/тел ответов из расширения тоже принимаем, если есть тело.
 */

const KWORK_HOST_RE = /(?:^|\.)kwork\.ru$/i;
const ORDER_URL_HINT_RE =
  /(?:\/(?:api|v\d)?\/?.*(?:order|track|inbox|manage)|tracker\/view|seller\/orders)/i;

const ID_KEYS = ["order_id", "orderId", "id", "OID", "track_id", "trackId"];
const TITLE_KEYS = [
  "title",
  "order_title",
  "kwork_title",
  "kworkTitle",
  "name",
  "gtitle",
  "want_name",
];
const PRICE_KEYS = [
  "price",
  "budget",
  "amount",
  "sum",
  "order_price",
  "priceSeller",
  "price_seller",
  "crt",
];
const STATUS_KEYS = ["status", "state", "orderStatus", "order_status", "status_name"];
const BUYER_NAME_KEYS = [
  "buyer_name",
  "buyerName",
  "fullname",
  "name",
  "user_name",
  "username",
  "login",
];
const BUYER_USER_KEYS = ["username", "login", "user_name", "buyer_username"];
const BUYER_OBJ_KEYS = ["buyer", "user", "payer", "worker", "client"];

/**
 * @param {unknown} data
 * @returns {boolean}
 */
function isPlainObject(data) {
  return Boolean(data) && typeof data === "object" && !Array.isArray(data);
}

/**
 * @param {string} url
 */
function isKworkUrl(url) {
  try {
    const u = new URL(url);
    return KWORK_HOST_RE.test(u.hostname);
  } catch {
    return /kwork\.ru/i.test(String(url || ""));
  }
}

/**
 * @param {unknown} value
 * @returns {unknown}
 */
function tryParseJson(value) {
  if (isPlainObject(value) || Array.isArray(value)) return value;
  if (typeof value !== "string") return null;
  const t = value.trim();
  if (!t || (t[0] !== "{" && t[0] !== "[")) return null;
  try {
    return JSON.parse(t);
  } catch {
    return null;
  }
}

/**
 * @param {Record<string, unknown>} obj
 * @param {string[]} keys
 */
function pick(obj, keys) {
  for (const k of keys) {
    if (obj[k] != null && String(obj[k]).trim() !== "") return obj[k];
  }
  return undefined;
}

/**
 * Эвристика: объект похож на заказ Kwork.
 * @param {Record<string, unknown>} obj
 */
function looksLikeOrder(obj) {
  if (!isPlainObject(obj)) return false;
  const id = pick(obj, ID_KEYS);
  if (id == null) return false;
  const idStr = String(id).trim();
  if (!/^\d{4,}$/.test(idStr) && !/^kwork[-_]/i.test(idStr)) {
    // допускаем числовые id и явные kwork-*
    if (!/^\d+$/.test(idStr)) return false;
  }
  const title = pick(obj, TITLE_KEYS);
  const price = pick(obj, PRICE_KEYS);
  const status = pick(obj, STATUS_KEYS);
  const hasBuyer = BUYER_OBJ_KEYS.some((k) => isPlainObject(obj[k])) || pick(obj, ["buyer_username", "buyerUsername"]);
  // нужен id + хотя бы один сильный признак заказа
  const score =
    (title ? 2 : 0) + (price != null ? 1 : 0) + (status ? 1 : 0) + (hasBuyer ? 1 : 0);
  if (score >= 2) return true;
  // вложенный kwork / orderType часто встречается в track API
  if (title && (obj.kwork != null || obj.orderType != null || obj.deadline != null)) return true;
  return false;
}

/**
 * @param {Record<string, unknown>} obj
 * @returns {Record<string, unknown>}
 */
export function flattenOrderCandidate(obj) {
  const buyerObj = BUYER_OBJ_KEYS.map((k) => obj[k]).find((v) => isPlainObject(v));
  const kworkObj = isPlainObject(obj.kwork) ? obj.kwork : null;

  const orderId = pick(obj, ID_KEYS);
  const title =
    pick(obj, TITLE_KEYS) ||
    (kworkObj ? pick(/** @type {Record<string, unknown>} */ (kworkObj), TITLE_KEYS) : undefined);
  const price = pick(obj, PRICE_KEYS);
  const status = pick(obj, STATUS_KEYS);
  let buyerName = pick(obj, ["buyer_name", "buyerName"]);
  let buyerUsername = pick(obj, ["buyer_username", "buyerUsername", "buyer_login"]);
  if (buyerObj) {
    const b = /** @type {Record<string, unknown>} */ (buyerObj);
    buyerName = buyerName || pick(b, BUYER_NAME_KEYS);
    buyerUsername = buyerUsername || pick(b, BUYER_USER_KEYS);
  }

  let orderUrl = pick(obj, ["order_url", "url", "link", "orderUrl"]);
  if (!orderUrl && orderId && /^\d+$/.test(String(orderId))) {
    orderUrl = `https://kwork.ru/tracker/view?id=${orderId}`;
  }

  return {
    order_id: orderId != null ? String(orderId) : undefined,
    title: title != null ? String(title) : undefined,
    budget: price != null ? String(price) : undefined,
    status: status != null ? String(status) : undefined,
    buyer_name: buyerName != null ? String(buyerName) : undefined,
    buyer_username: buyerUsername != null ? String(buyerUsername) : undefined,
    order_url: orderUrl != null ? String(orderUrl) : undefined,
    email: pick(obj, ["email", "buyer_email"]) != null ? String(pick(obj, ["email", "buyer_email"])) : undefined,
    notes: pick(obj, ["notes", "comment", "message"]) != null
      ? String(pick(obj, ["notes", "comment", "message"]))
      : undefined,
  };
}

/**
 * Рекурсивный обход JSON в поисках заказов.
 * @param {unknown} node
 * @param {Map<string, Record<string, unknown>>} out
 * @param {number} depth
 */
function walkForOrders(node, out, depth = 0) {
  if (depth > 12 || node == null) return;
  if (Array.isArray(node)) {
    for (const item of node) walkForOrders(item, out, depth + 1);
    return;
  }
  if (!isPlainObject(node)) return;

  const obj = /** @type {Record<string, unknown>} */ (node);
  if (looksLikeOrder(obj)) {
    const flat = flattenOrderCandidate(obj);
    if (flat.order_id) {
      const prev = out.get(flat.order_id);
      // более полный объект выигрывает
      const score = (o) =>
        ["title", "budget", "status", "buyer_name", "buyer_username"].filter((k) => o[k]).length;
      if (!prev || score(flat) >= score(prev)) out.set(flat.order_id, flat);
    }
  }

  for (const key of Object.keys(obj)) {
    // типичные контейнеры списков
    if (
      /^(orders|items|data|result|response|tracks|list|payload)$/i.test(key) ||
      depth < 4
    ) {
      walkForOrders(obj[key], out, depth + 1);
    }
  }
}

/**
 * @param {unknown} json
 * @returns {Record<string, unknown>[]}
 */
export function extractOrdersFromJson(json) {
  const out = new Map();
  walkForOrders(json, out);
  return [...out.values()];
}

/**
 * Разобрать HAR (Chrome / Firefox).
 * @param {unknown} har
 * @returns {{ orders: Record<string, unknown>[], meta: { entries: number, kworkEntries: number, jsonBodies: number } }}
 */
export function parseHar(har) {
  const log = isPlainObject(har) ? /** @type {Record<string, unknown>} */ (har).log : null;
  const entries = isPlainObject(log) && Array.isArray(log.entries) ? log.entries : [];
  let kworkEntries = 0;
  let jsonBodies = 0;
  const out = new Map();

  for (const entry of entries) {
    if (!isPlainObject(entry)) continue;
    const req = entry.request;
    const res = entry.response;
    const url = isPlainObject(req) ? String(req.url || "") : "";
    if (!url || !isKworkUrl(url)) continue;
    kworkEntries += 1;

    const content = isPlainObject(res) ? res.content : null;
    if (!isPlainObject(content)) continue;
    let text = content.text;
    if (typeof text !== "string" || !text) continue;

    // HAR иногда base64
    if (content.encoding === "base64") {
      try {
        text = Buffer.from(text, "base64").toString("utf8");
      } catch {
        continue;
      }
    }

    const mime = String(content.mimeType || "").toLowerCase();
    const parsed =
      mime.includes("json") || text.trim().startsWith("{") || text.trim().startsWith("[")
        ? tryParseJson(text)
        : null;
    if (!parsed) continue;
    jsonBodies += 1;

    // приоритет URL с order/track
    const prefer = ORDER_URL_HINT_RE.test(url);
    const found = extractOrdersFromJson(parsed);
    for (const order of found) {
      if (!order.order_id) continue;
      const prev = out.get(String(order.order_id));
      if (!prev || prefer) out.set(String(order.order_id), order);
    }
  }

  return {
    orders: [...out.values()],
    meta: { entries: entries.length, kworkEntries, jsonBodies },
  };
}

/**
 * Достать тело ответа из элемента cat-catch / произвольного capture-item.
 * @param {Record<string, unknown>} item
 */
function bodyFromCaptureItem(item) {
  for (const key of ["body", "text", "content", "data", "response", "json", "payload"]) {
    const v = item[key];
    const parsed = tryParseJson(v);
    if (parsed) return parsed;
    if (isPlainObject(v) || Array.isArray(v)) return v;
  }
  return null;
}

/**
 * cat-catch / ручной export:
 * - { resources|list|items|data: [...] }
 * - [ { url, body|text|content } ]
 * - готовый { orders: [...] } / массив заказов
 * - одиночный JSON-ответ API
 *
 * @param {unknown} data
 * @returns {{ orders: Record<string, unknown>[], meta: { items: number, withBody: number } }}
 */
export function parseCapture(data) {
  // Уже нормализованный экспорт заказов
  if (isPlainObject(data) && Array.isArray(data.orders)) {
    const out = new Map();
    for (const o of data.orders) {
      if (!isPlainObject(o)) continue;
      const flat = looksLikeOrder(o) ? flattenOrderCandidate(o) : flattenOrderCandidate({
        ...o,
        id: o.order_id || o.id,
        title: o.title || "Заказ Kwork",
      });
      // если явно order_id — принимаем даже без эвристики
      if (o.order_id || o.id) {
        const id = String(o.order_id || o.id);
        out.set(id, { ...flat, order_id: id });
      }
    }
    if (out.size) {
      return { orders: [...out.values()], meta: { items: data.orders.length, withBody: out.size } };
    }
  }

  if (Array.isArray(data) && data.length && data.every((x) => isPlainObject(x) && (x.order_id || x.id) && (x.title || x.name))) {
    return {
      orders: data.map((o) => flattenOrderCandidate(/** @type {Record<string, unknown>} */ (o))),
      meta: { items: data.length, withBody: data.length },
    };
  }

  /** @type {unknown[]} */
  let items = [];
  if (Array.isArray(data)) items = data;
  else if (isPlainObject(data)) {
    for (const key of ["resources", "list", "items", "data", "captures", "files", "urls"]) {
      if (Array.isArray(data[key])) {
        items = /** @type {unknown[]} */ (data[key]);
        break;
      }
    }
    // одиночный API-ответ без обёртки
    if (!items.length) {
      const found = extractOrdersFromJson(data);
      return { orders: found, meta: { items: 1, withBody: found.length ? 1 : 0 } };
    }
  }

  let withBody = 0;
  const out = new Map();

  for (const raw of items) {
    if (!isPlainObject(raw)) continue;
    const item = /** @type {Record<string, unknown>} */ (raw);
    const url = String(item.url || item.link || item.src || "");
    if (url && !isKworkUrl(url) && !ORDER_URL_HINT_RE.test(url)) {
      // URL не kwork — всё равно пробуем тело, если оно есть
    }

    const body = bodyFromCaptureItem(item);
    if (!body) {
      // только URL без тела — для заказов бесполезно
      continue;
    }
    withBody += 1;
    for (const order of extractOrdersFromJson(body)) {
      if (order.order_id) out.set(String(order.order_id), order);
    }
  }

  // fallback: весь файл как один JSON-граф
  if (!out.size) {
    for (const order of extractOrdersFromJson(data)) {
      if (order.order_id) out.set(String(order.order_id), order);
    }
  }

  return {
    orders: [...out.values()],
    meta: { items: items.length || 1, withBody },
  };
}

import fs from "node:fs";

/**
 * Загрузить файл и вернуть сырые order-объекты (ещё до normalizeOrder).
 * @param {string} filePath
 * @param {"har" | "capture" | "auto"} [mode]
 */
export function loadOrdersFromCaptureFile(filePath, mode = "auto") {
  const text = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(text);
  const kind = mode !== "auto" ? mode : detectCaptureKind(data, filePath);
  if (kind === "har") {
    const { orders, meta } = parseHar(data);
    return { orders, meta, kind: "har" };
  }
  const { orders, meta } = parseCapture(data);
  return { orders, meta, kind: "capture" };
}

/**
 * @param {unknown} data
 * @param {string} filePath
 * @returns {"har" | "capture"}
 */
export function detectCaptureKind(data, filePath = "") {
  if (/\.har$/i.test(filePath)) return "har";
  if (isPlainObject(data) && isPlainObject(data.log) && Array.isArray(data.log.entries)) {
    return "har";
  }
  return "capture";
}

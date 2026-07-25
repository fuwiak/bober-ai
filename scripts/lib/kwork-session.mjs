/**
 * Kwork seller session (own-account cookies only).
 *
 * Cookies live in ~/.config/yaga/credentials.env (KWORK_COOKIE) or
 * KWORK_COOKIES_FILE — never commit them.
 *
 * Live list endpoint (discovered from manage_orders SPA):
 *   GET https://kwork.ru/get_manage_orders?page=1&s=all&b=date&a=desc
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DEFAULT_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const ORIGIN = "https://kwork.ru";

/** Cookie names used for session auth (skip analytics). */
const SESSION_COOKIE_NAMES = new Set([
  "_kmfvt",
  "_kmid",
  "csrf_user_token",
  "gdpr_agree_ru",
  "list_type_sdisplay",
  "RORSSQIHEK",
  "slrememberme",
  "uad",
  "userId",
]);

/**
 * Decode URL-encoded cookie values (%24→$, %2F→/).
 * @param {string} value
 */
export function decodeCookieValue(value) {
  try {
    return decodeURIComponent(String(value || ""));
  } catch {
    return String(value || "").replace(/%24/gi, "$").replace(/%2F/gi, "/");
  }
}

/**
 * Parse "a=b; c=d" or multiline "a=b" pairs into a Cookie header string.
 * Drops _ym_* / VID analytics unless keepAnalytics.
 * @param {string} raw
 * @param {{ keepAnalytics?: boolean }} [opts]
 */
export function parseCookieHeader(raw, opts = {}) {
  const keepAnalytics = Boolean(opts.keepAnalytics);
  /** @type {Map<string, string>} */
  const map = new Map();
  const text = String(raw || "").trim();
  if (!text) return "";

  const parts = text.includes("\n")
    ? text.split(/\r?\n/).flatMap((line) => {
        const t = line.trim();
        if (!t || t.startsWith("#")) return [];
        if (t.includes("=") && !t.includes(";")) return [t];
        return t.split(";").map((p) => p.trim()).filter(Boolean);
      })
    : text.split(";").map((p) => p.trim()).filter(Boolean);

  for (const part of parts) {
    const eq = part.indexOf("=");
    if (eq <= 0) continue;
    const name = part.slice(0, eq).trim();
    let value = part.slice(eq + 1).trim();
    if (!name) continue;
    if (!keepAnalytics && (/^_ym_/i.test(name) || name === "VID")) continue;
    if (!keepAnalytics && !SESSION_COOKIE_NAMES.has(name) && /^(?:_ym_|VID)/i.test(name)) {
      continue;
    }
    value = decodeCookieValue(value);
    map.set(name, value);
  }

  return [...map.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
}

/**
 * @returns {string}
 */
export function loadKworkCookie() {
  const fromEnv = String(process.env.KWORK_COOKIE || "").trim();
  const file = String(process.env.KWORK_COOKIES_FILE || "").trim();
  if (file) {
    const abs = file.startsWith("~")
      ? path.join(os.homedir(), file.slice(1).replace(/^\//, ""))
      : file;
    try {
      const raw = fs.readFileSync(abs, "utf8");
      const parsed = parseCookieHeader(raw);
      if (parsed) return parsed;
    } catch {
      /* fall through */
    }
  }
  if (fromEnv) return parseCookieHeader(fromEnv);
  return "";
}

/**
 * @param {string} cookieHeader
 */
export function csrfFromCookie(cookieHeader) {
  const m = String(cookieHeader || "").match(/(?:^|;\s*)csrf_user_token=([^;]+)/);
  return m ? decodeCookieValue(m[1]) : "";
}

/**
 * @param {string} cookieHeader
 */
export function userIdFromCookie(cookieHeader) {
  const m = String(cookieHeader || "").match(/(?:^|;\s*)userId=([^;]+)/);
  return m ? String(m[1]).trim() : "";
}

/**
 * @param {string} [cookieHeader]
 */
export function getSession() {
  const cookie = loadKworkCookie();
  if (!cookie) {
    throw new Error(
      "Нет KWORK_COOKIE / KWORK_COOKIES_FILE. Сохраните cookies в ~/.config/yaga/credentials.env (mode 0600).",
    );
  }
  return {
    cookie,
    csrf: csrfFromCookie(cookie),
    userId: userIdFromCookie(cookie),
    userAgent: process.env.KWORK_USER_AGENT?.trim() || DEFAULT_UA,
  };
}

/**
 * @param {string} url
 * @param {{
 *   method?: string,
 *   body?: string | URLSearchParams | Record<string, string>,
 *   headers?: Record<string, string>,
 *   referer?: string,
 *   session?: ReturnType<typeof getSession>,
 *   redirect?: RequestRedirect,
 * }} [opts]
 */
export async function kworkFetch(url, opts = {}) {
  const session = opts.session || getSession();
  const method = (opts.method || "GET").toUpperCase();
  /** @type {Record<string, string>} */
  const headers = {
    "User-Agent": session.userAgent,
    Cookie: session.cookie,
    Referer: opts.referer || `${ORIGIN}/`,
    Origin: ORIGIN,
    Accept: "application/json, text/plain, */*",
    "Accept-Language": "ru-RU,ru;q=0.9,en;q=0.8",
    "X-Requested-With": "XMLHttpRequest",
    "x-csrf-token": session.csrf,
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    ...(opts.headers || {}),
  };

  /** @type {RequestInit} */
  const init = {
    method,
    headers,
    redirect: opts.redirect || "manual",
  };

  if (opts.body != null && method !== "GET" && method !== "HEAD") {
    if (typeof opts.body === "string" || opts.body instanceof URLSearchParams) {
      headers["Content-Type"] =
        headers["Content-Type"] || "application/x-www-form-urlencoded; charset=UTF-8";
      init.body = String(opts.body);
    } else {
      headers["Content-Type"] = headers["Content-Type"] || "application/json;charset=UTF-8";
      init.body = JSON.stringify(opts.body);
    }
  }

  const res = await fetch(url, init);
  const text = await res.text();
  const ct = res.headers.get("content-type") || "";
  let json = null;
  if (ct.includes("json") || text.trim().startsWith("{") || text.trim().startsWith("[")) {
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }
  }
  return {
    ok: res.status >= 200 && res.status < 300,
    status: res.status,
    contentType: ct,
    location: res.headers.get("location") || "",
    text,
    json,
    size: text.length,
  };
}

/**
 * @param {string} text
 */
function isMaintenanceHtml(text) {
  return /Технические работы/i.test(text || "");
}

/**
 * @param {string} text
 */
function isLoginPage(text) {
  return /action=["']\/login|id=["']login-form|name=["']login["']/i.test(text || "");
}

/**
 * Verify seller session (own account).
 * @param {ReturnType<typeof getSession>} [session]
 */
export async function probeAuth(session) {
  const s = session || getSession();
  const home = await kworkFetch(`${ORIGIN}/`, {
    session: s,
    headers: { Accept: "text/html,*/*" },
    redirect: "manual",
  });
  const seller = await kworkFetch(`${ORIGIN}/seller`, {
    session: s,
    headers: { Accept: "text/html,*/*" },
    referer: `${ORIGIN}/`,
  });
  const count = await kworkFetch(`${ORIGIN}/api/order/getorderscount`, {
    method: "POST",
    body: "",
    session: s,
    referer: `${ORIGIN}/seller`,
  });

  const html = seller.text || "";
  const authenticated =
    seller.status === 200 &&
    !isLoginPage(html) &&
    (Boolean(s.userId && html.includes(s.userId)) ||
      /actorType\s*=\s*["']worker["']/i.test(html) ||
      /pasha_stasinski/i.test(html));

  return {
    authenticated,
    userId: s.userId,
    homeStatus: home.status,
    homeLocation: home.location,
    sellerStatus: seller.status,
    sellerSize: seller.size,
    hasLogout: /logout|выйти/i.test(html),
    actorType: (html.match(/actorType\s*=\s*["']([^"']+)/i) || [])[1] || "",
    ordersCount: count.json || null,
    maintenance: isMaintenanceHtml(html),
  };
}

/**
 * Normalize one orderListData item → sync-friendly object.
 * @param {Record<string, unknown>} raw
 */
export function normalizeSessionOrder(raw) {
  const user = raw.user && typeof raw.user === "object" ? /** @type {Record<string, unknown>} */ (raw.user) : {};
  const orderId = String(raw.id ?? raw.order_id ?? "").trim();
  const title = String(raw.title || raw.gtitle || "Заказ Kwork").trim();
  const buyerUsername = String(user.login || user.username || "").trim();
  const buyerName = String(user.name || user.fullname || buyerUsername || "Покупатель Kwork").trim();
  const budget = raw.price != null ? String(raw.price) : raw.fullPrice != null ? String(raw.fullPrice) : "";
  const status = String(raw.status || raw.orderStatus || raw.orderVirtualStatus || "unknown");
  const orderUrl = orderId ? `${ORIGIN}/tracker/view?id=${orderId}` : "";

  return {
    order_id: orderId,
    title,
    budget,
    status,
    buyer_name: buyerName,
    buyer_username: buyerUsername,
    order_url: orderUrl,
    notes: raw.note != null ? String(raw.note) : "",
  };
}

/**
 * Pull seller orders via GET /get_manage_orders (SPA XHR).
 * @param {{
 *   statuses?: string[],
 *   maxPages?: number,
 *   session?: ReturnType<typeof getSession>,
 * }} [opts]
 * @returns {Promise<{ orders: ReturnType<typeof normalizeSessionOrder>[], meta: Record<string, unknown> }>}
 */
export async function fetchSellerOrders(opts = {}) {
  const session = opts.session || getSession();
  const statuses = opts.statuses?.length ? opts.statuses : ["all"];
  const maxPages = opts.maxPages ?? 20;
  /** @type {Map<string, ReturnType<typeof normalizeSessionOrder>>} */
  const byId = new Map();
  /** @type {Record<string, { pages: number, ordersCount: number, fetched: number }>} */
  const perStatus = {};

  for (const s of statuses) {
    let fetched = 0;
    let ordersCount = 0;
    let pages = 0;
    for (let page = 1; page <= maxPages; page++) {
      const qs = new URLSearchParams({
        page: String(page),
        s: s,
        b: "date",
        a: "desc",
      });
      const res = await kworkFetch(`${ORIGIN}/get_manage_orders?${qs}`, {
        session,
        referer: `${ORIGIN}/manage_orders`,
      });
      if (isMaintenanceHtml(res.text)) {
        throw new Error(
          `get_manage_orders вернул «Технические работы» (нужен GET с query, не POST). status=${res.status}`,
        );
      }
      if (!res.json || res.json.success !== true) {
        throw new Error(
          `get_manage_orders failed status=${res.status} success=${res.json?.success} size=${res.size}`,
        );
      }
      const data = res.json.data || {};
      const list = Array.isArray(data.orderListData) ? data.orderListData : [];
      ordersCount = Number(data.ordersCount) || ordersCount;
      pages += 1;
      for (const item of list) {
        if (!item || typeof item !== "object") continue;
        const norm = normalizeSessionOrder(/** @type {Record<string, unknown>} */ (item));
        if (!norm.order_id) continue;
        byId.set(norm.order_id, norm);
        fetched += 1;
      }
      if (!list.length) break;
      if (page * (Number(data.page_limit) || 10) >= ordersCount) break;
    }
    perStatus[s || "(default)"] = { pages, ordersCount, fetched };
  }

  return {
    orders: [...byId.values()],
    meta: {
      unique: byId.size,
      statuses: perStatus,
      userId: session.userId,
      endpoint: "GET /get_manage_orders",
    },
  };
}

/**
 * Lightweight endpoint probe for diagnostics (no cookie dump).
 * @param {ReturnType<typeof getSession>} [session]
 */
export async function probeEndpoints(session) {
  const s = session || getSession();
  const targets = [
    ["GET", `${ORIGIN}/seller`],
    ["GET", `${ORIGIN}/manage_orders`],
    ["GET", `${ORIGIN}/get_manage_orders?page=1&s=all`],
    ["POST", `${ORIGIN}/api/order/getorderscount`, ""],
    ["POST", `${ORIGIN}/api/user/checkworkeroffers`, ""],
    ["GET", "https://api.kwork.ru/v1/seller/orders?page=1"],
  ];
  /** @type {{ method: string, url: string, status: number, ok: boolean, kind: string, size: number }[]} */
  const results = [];
  for (const [method, url, body] of targets) {
    const res = await kworkFetch(url, {
      method,
      body: body ?? undefined,
      session: s,
      referer: `${ORIGIN}/manage_orders`,
      headers: method === "GET" && url.includes("/seller")
        ? { Accept: "text/html,*/*" }
        : undefined,
    });
    let kind = "other";
    if (res.json) kind = "json";
    else if (isMaintenanceHtml(res.text)) kind = "maintenance";
    else if (isLoginPage(res.text)) kind = "login";
    else if ((res.contentType || "").includes("html")) kind = "html";
    results.push({
      method,
      url,
      status: res.status,
      ok: res.ok && kind !== "maintenance" && kind !== "login",
      kind,
      size: res.size,
    });
  }
  return results;
}

import fetch from "./fetch.mjs";
import { applyYagaCredentials } from "./yaga-credentials.mjs";
import {
  CANONICAL_ORIGIN,
} from "../../config/domains.mjs";

applyYagaCredentials();

export const WEBMASTER_API = "https://api.webmaster.yandex.net/v4";

export function getConfig(overrides = {}) {
  return {
    token:
      overrides.token ||
      process.env.YANDEX_WEBMASTER_OAUTH_TOKEN?.trim() ||
      process.env.YANDEX_OAUTH_TOKEN?.trim(),
    hostUrl: (
      overrides.hostUrl ||
      process.env.YANDEX_WEBMASTER_HOST_URL ||
      CANONICAL_ORIGIN
    ).replace(/\/$/, ""),
    feedUrl: (
      overrides.feedUrl ||
      process.env.YANDEX_WEBMASTER_FEED_URL ||
      `${process.env.YANDEX_WEBMASTER_HOST_URL || CANONICAL_ORIGIN}/performers-feed.yml`
    ).replace(/\/$/, ""),
    feedType: overrides.feedType || process.env.YANDEX_WEBMASTER_FEED_TYPE || "SERVICES",
    regionIds: (overrides.regionIds || process.env.YANDEX_WEBMASTER_REGION_IDS || "225")
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((value) => Number.isFinite(value)),
    pollIntervalMs: Number(overrides.pollIntervalMs || process.env.YANDEX_WEBMASTER_POLL_MS || 5000),
    pollTimeoutMs: Number(overrides.pollTimeoutMs || process.env.YANDEX_WEBMASTER_POLL_TIMEOUT_MS || 180000),
  };
}
export function authHeaders(token, includeJsonContentType = false) {
  const headers = {
    Authorization: `OAuth ${token}`,
    Accept: "application/json",
  };
  if (includeJsonContentType) {
    headers["Content-Type"] = "application/json";
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

export async function apiRequest(token, path, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const hasBody = options.body != null && options.body !== "";
  const headers = {
    ...authHeaders(token, hasBody || method === "POST" || method === "PUT" || method === "DELETE" || method === "PATCH"),
    ...(options.headers || {}),
  };

  let body = options.body;
  if (body != null && typeof body !== "string" && !Buffer.isBuffer(body)) {
    body = JSON.stringify(body);
  }
  if (typeof body === "string") {
    headers["Content-Length"] = String(Buffer.byteLength(body));
  }

  const response = await fetch(`${WEBMASTER_API}${path}`, {
    ...options,
    body,
    headers,
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

  return { response, body: parsed };
}

export async function getUserId(token) {
  const { response, body } = await apiRequest(token, "/user");
  if (!response.ok) {
    throw new Error(`GET /user → HTTP ${response.status}: ${JSON.stringify(body)}`);
  }
  const userId = body?.user_id;
  if (!userId) throw new Error("Не удалось получить user_id");
  return userId;
}

export async function getHosts(token, userId) {
  const { response, body } = await apiRequest(token, `/user/${userId}/hosts`);
  if (!response.ok) {
    throw new Error(`GET /hosts → HTTP ${response.status}: ${JSON.stringify(body)}`);
  }
  return body?.hosts || [];
}

function hostHostname(host) {
  const asciiUrl = String(host.ascii_host_url || host.host_url || "");
  const unicodeUrl = String(host.unicode_host_url || host.host_url || "");
  for (const candidate of [asciiUrl, unicodeUrl]) {
    try {
      return new URL(candidate).hostname.toLowerCase();
    } catch {
      /* try next */
    }
  }
  // host_id вида https:www.bober-systems.ru:443
  const id = String(host.host_id || "").toLowerCase();
  const match = id.match(/^https?:([^:/]+)/);
  return match?.[1] || "";
}

/** Legacy twin mapping removed — only bober-systems.ru family. */
export function twinHostUrl(_hostUrl) {
  return null;
}
export async function addHost(token, userId, hostUrl) {
  const { response, body } = await apiRequest(token, `/user/${userId}/hosts`, {
    method: "POST",
    body: { host_url: `${normalizeHostUrl(hostUrl)}/` },
  });
  if (!response.ok) {
    const code = body?.error_code || body?.errorCode;
    if (response.status === 409 || code === "HOST_ALREADY_ADDED") {
      return { host_id: body?.host_id, already: true, body };
    }
    throw new Error(`POST /hosts → HTTP ${response.status}: ${JSON.stringify(body)}`);
  }
  return { host_id: body?.host_id, already: false, body };
}

function formatHostList(hosts) {
  if (!hosts.length) return "(пусто)";
  return hosts
    .map((h) => {
      const url = h.unicode_host_url || h.ascii_host_url || h.host_id;
      return `  - ${url}${h.verified ? " ✓" : " (не подтверждён)"}`;
    })
    .join("\n");
}

export function pickHost(hosts, targetUrl) {
  const normalizedTarget = normalizeHostUrl(targetUrl).toLowerCase();
  let targetHostname = "";
  try {
    targetHostname = new URL(normalizedTarget).hostname.toLowerCase();
  } catch {
    targetHostname = normalizedTarget.replace(/^https?:\/\//, "").split("/")[0];
  }
  const preferHttps = normalizedTarget.startsWith("https://");

  // Точное совпадение hostname: иначе www.bober-systems.ru матчился на www.bober-systems.ru.
  const matches = hosts.filter((host) => hostHostname(host) === targetHostname);
  if (!matches.length) return undefined;

  const exact = matches.find((host) => {
    const ascii = String(host.ascii_host_url || host.host_url || "").toLowerCase().replace(/\/$/, "");
    return ascii === normalizedTarget;
  });
  if (exact) return exact;

  const httpsMatch = matches.find((host) => String(host.host_id || "").startsWith("https:"));
  if (preferHttps && httpsMatch) return httpsMatch;
  return matches[0];
}

export async function listFeeds(token, userId, hostId) {
  const { response, body } = await apiRequest(
    token,
    `/user/${userId}/hosts/${encodeURIComponent(hostId)}/feeds/list`,
  );
  if (!response.ok) {
    throw new Error(`GET /feeds/list → HTTP ${response.status}: ${JSON.stringify(body)}`);
  }
  return body?.feeds || [];
}

export async function removeFeed(token, userId, hostId, feedUrl) {
  const { response, body } = await apiRequest(
    token,
    `/user/${userId}/hosts/${encodeURIComponent(hostId)}/feeds/batch/remove`,
    {
      method: "DELETE",
      body: JSON.stringify({ urls: [feedUrl] }),
    },
  );
  if (!response.ok) {
    throw new Error(`DELETE /feeds/batch/remove → HTTP ${response.status}: ${JSON.stringify(body)}`);
  }
  return body;
}

export async function startFeedUpload(token, userId, hostId, feed) {
  const { response, body } = await apiRequest(
    token,
    `/user/${userId}/hosts/${encodeURIComponent(hostId)}/feeds/add/start`,
    {
      method: "POST",
      body: JSON.stringify({ feed }),
    },
  );
  if (!response.ok) {
    throw new Error(`POST /feeds/add/start → HTTP ${response.status}: ${JSON.stringify(body)}`);
  }
  return body;
}

export async function getFeedUploadInfo(token, userId, hostId, requestId) {
  const path = `/user/${userId}/hosts/${encodeURIComponent(hostId)}/feeds/add/info?requestId=${encodeURIComponent(requestId)}`;
  const { response, body } = await apiRequest(token, path);
  if (!response.ok) {
    throw new Error(`feeds/add/info → HTTP ${response.status}: ${JSON.stringify(body)}`);
  }
  return body;
}

export async function waitForFeedReload(token, userId, hostId, feedUrl, config) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < config.pollTimeoutMs) {
    const feeds = await listFeeds(token, userId, hostId);
    if (feeds.some((feed) => feed.url === feedUrl)) {
      return feeds.find((feed) => feed.url === feedUrl);
    }
    process.stdout.write(".");
    await new Promise((resolve) => setTimeout(resolve, config.pollIntervalMs));
  }
  throw new Error("Истекло время ожидания перезагрузки фида");
}

/** Resolve OAuth user + target host for Webmaster API calls. */
export async function resolveHostContext(overrides = {}) {
  const config = getConfig(overrides);
  if (!config.token) {
    const hasApp =
      process.env.YANDEX_WEBMASTER_CLIENT_ID?.trim() ||
      process.env.YANDEX_WEBMASTER_CLIENT_SECRET?.trim();
    throw new Error(
      hasApp
        ? "Есть ClientID/secret, но нет access token (это разные вещи). Один раз: yaga webmaster oauth"
        : "Нет OAuth-токена. Задайте YANDEX_WEBMASTER_OAUTH_TOKEN или: yaga webmaster oauth",
    );
  }
  const userId = await getUserId(config.token);
  let hosts = await getHosts(config.token, userId);
  let host = pickHost(hosts, config.hostUrl);
  let usedTwin = false;

  // Prefer a verified twin if the exact host is missing or not yet verified.
  const twin = twinHostUrl(config.hostUrl);
  if ((!host || host.verified === false) && twin) {
    const twinHost = pickHost(hosts, twin);
    if (twinHost?.verified) {
      if (host && host.verified === false) {
        console.warn(
          `⚠ ${config.hostUrl} в Вебмастере, но не подтверждён → используем ${twin}`,
        );
      } else if (!host) {
        console.warn(
          `⚠ Хост ${config.hostUrl} нет в Вебмастере → используем близнец ${twin}`,
        );
      }
      host = twinHost;
      usedTwin = true;
    }
  }

  // Optional auto-add of the requested host (still needs UI/DNS verification).
  const autoAdd =
    overrides.autoAdd === true ||
    process.env.YANDEX_WEBMASTER_AUTO_ADD === "1" ||
    process.argv.includes("--add-host");
  if (!host && autoAdd) {
    console.warn(`+ Добавляю ${config.hostUrl} в Вебмастер…`);
    await addHost(config.token, userId, config.hostUrl);
    hosts = await getHosts(config.token, userId);
    host = pickHost(hosts, config.hostUrl);
    if (host && !host.verified) {
      console.warn(
        "⚠ Хост добавлен, но не подтверждён. Верификация: https://webmaster.yandex.ru/sites/",
      );
    }
  }

  if (!host) {
    throw new Error(
      `Сайт ${config.hostUrl} не найден среди хостов Вебмастера.\n` +
        `Доступные хосты:\n${formatHostList(hosts)}\n` +
        `Задайте YANDEX_WEBMASTER_HOST_URL=${twin || CANONICAL_ORIGIN} ` +
        `или добавьте сайт: yaga webmaster boost --add-host`,
    );  }
  return { config, userId, host, hostId: host.host_id, usedTwin };
}

async function getJson(token, path, { allowStatuses = [200] } = {}) {
  const { response, body } = await apiRequest(token, path);
  if (!allowStatuses.includes(response.status)) {
    const code = body?.error_code || body?.errorCode;
    const msg = body?.error_message || body?.errorMessage || JSON.stringify(body);
    const err = new Error(`GET ${path} → HTTP ${response.status}${code ? ` (${code})` : ""}: ${msg}`);
    err.status = response.status;
    err.errorCode = code;
    err.body = body;
    throw err;
  }
  return { response, body };
}

export async function getHostSummary(token, userId, hostId) {
  const { body } = await getJson(token, `/user/${userId}/hosts/${encodeURIComponent(hostId)}/summary`);
  return body;
}

export async function getHostDiagnostics(token, userId, hostId) {
  const { body } = await getJson(token, `/user/${userId}/hosts/${encodeURIComponent(hostId)}/diagnostics`);
  return body;
}

export async function getImportantUrls(token, userId, hostId) {
  const { body } = await getJson(token, `/user/${userId}/hosts/${encodeURIComponent(hostId)}/important-urls`);
  return body?.urls || [];
}

export async function getSitemaps(token, userId, hostId) {
  const { body } = await getJson(token, `/user/${userId}/hosts/${encodeURIComponent(hostId)}/sitemaps`);
  return body?.sitemaps || [];
}

/** Sitemaps explicitly added in Webmaster UI/API (user-added-sitemaps). */
export async function getUserAddedSitemaps(token, userId, hostId) {
  const { body } = await getJson(
    token,
    `/user/${userId}/hosts/${encodeURIComponent(hostId)}/user-added-sitemaps`,
  );
  return body?.sitemaps || [];
}

function normalizeSitemapUrl(value) {
  try {
    const url = new URL(String(value).trim());
    url.hash = "";
    url.search = "";
    let path = url.pathname.replace(/\/+$/, "");
    if (!path) path = "";
    return `${url.protocol}//${url.hostname.toLowerCase()}${path}`;
  } catch {
    return String(value || "")
      .trim()
      .replace(/\/+$/, "")
      .toLowerCase();
  }
}

/** Register sitemap in Webmaster (POST user-added-sitemaps). Idempotent on duplicate URL. */
export async function addUserSitemap(token, userId, hostId, sitemapUrl) {
  const url = normalizeSitemapUrl(sitemapUrl);
  const { response, body } = await apiRequest(
    token,
    `/user/${userId}/hosts/${encodeURIComponent(hostId)}/user-added-sitemaps`,
    {
      method: "POST",
      body: { url },
    },
  );
  if (response.ok) {
    return { added: true, already: false, sitemap_id: body?.sitemap_id, body };
  }
  const code = body?.error_code || body?.errorCode;
  if (response.status === 409 || code === "SITEMAP_ALREADY_ADDED") {
    return { added: false, already: true, body };
  }
  throw new Error(`POST user-added-sitemaps → HTTP ${response.status}: ${JSON.stringify(body)}`);
}

/** Remove user-added sitemap so a re-POST triggers a fresh crawl (stale urls=4 after urlset expand). */
export async function deleteUserSitemap(token, userId, hostId, sitemapId) {
  const { response, body } = await apiRequest(
    token,
    `/user/${userId}/hosts/${encodeURIComponent(hostId)}/user-added-sitemaps/${encodeURIComponent(sitemapId)}`,
    { method: "DELETE" },
  );
  if (!response.ok && response.status !== 404) {
    throw new Error(
      `DELETE user-added-sitemaps/${sitemapId} → HTTP ${response.status}: ${JSON.stringify(body)}`,
    );
  }
  return { deleted: response.ok, status: response.status, body };
}

/**
 * Ensure canonical sitemap is in Webmaster queue. Returns user-added + robot-discovered lists.
 * @param {{ force?: boolean }} [opts] force=true deletes then re-adds to refresh stale crawl stats.
 */
export async function ensureUserSitemap(token, userId, hostId, sitemapUrl, opts = {}) {
  const target = normalizeSitemapUrl(sitemapUrl);
  let existing = await getUserAddedSitemaps(token, userId, hostId);
  let match = existing.find((row) => normalizeSitemapUrl(row.sitemap_url || row.url) === target);

  if (opts.force && match?.sitemap_id) {
    await deleteUserSitemap(token, userId, hostId, match.sitemap_id);
    existing = await getUserAddedSitemaps(token, userId, hostId);
    match = existing.find((row) => normalizeSitemapUrl(row.sitemap_url || row.url) === target);
  }

  if (match && !opts.force) {
    return { added: false, already: true, forced: false, userAdded: existing, match };
  }

  const result = await addUserSitemap(token, userId, hostId, target);
  const userAdded = await getUserAddedSitemaps(token, userId, hostId);
  return {
    ...result,
    forced: Boolean(opts.force),
    userAdded,
    match: userAdded.find((row) => normalizeSitemapUrl(row.sitemap_url || row.url) === target),
  };
}

export async function getSearchUrlsInSearchHistory(token, userId, hostId, { dateFrom, dateTo } = {}) {
  const qs = new URLSearchParams();
  if (dateFrom) qs.set("date_from", dateFrom);
  if (dateTo) qs.set("date_to", dateTo);
  const q = qs.toString() ? `?${qs}` : "";
  const { body } = await getJson(
    token,
    `/user/${userId}/hosts/${encodeURIComponent(hostId)}/search-urls/in-search/history${q}`,
  );
  return body;
}

export async function getIndexingHistory(token, userId, hostId, { dateFrom, dateTo } = {}) {
  const qs = new URLSearchParams();
  if (dateFrom) qs.set("date_from", dateFrom);
  if (dateTo) qs.set("date_to", dateTo);
  const q = qs.toString() ? `?${qs}` : "";
  const { body } = await getJson(
    token,
    `/user/${userId}/hosts/${encodeURIComponent(hostId)}/indexing/history${q}`,
  );
  return body;
}

export async function getSqiHistory(token, userId, hostId, { dateFrom, dateTo } = {}) {
  const qs = new URLSearchParams();
  if (dateFrom) qs.set("date_from", dateFrom);
  if (dateTo) qs.set("date_to", dateTo);
  const q = qs.toString() ? `?${qs}` : "";
  const { body } = await getJson(
    token,
    `/user/${userId}/hosts/${encodeURIComponent(hostId)}/sqi-history${q}`,
  );
  return body?.points || [];
}

export async function getPopularQueries(
  token,
  userId,
  hostId,
  {
    orderBy = "TOTAL_SHOWS",
    limit = 15,
    queryIndicator = ["TOTAL_SHOWS", "TOTAL_CLICKS", "AVG_SHOW_POSITION"],
  } = {},
) {
  const qs = new URLSearchParams();
  qs.set("order_by", orderBy);
  qs.set("limit", String(limit));
  for (const indicator of queryIndicator) {
    qs.append("query_indicator", indicator);
  }
  const { body } = await getJson(
    token,
    `/user/${userId}/hosts/${encodeURIComponent(hostId)}/search-queries/popular?${qs}`,
  );
  return body;
}

export async function getRecrawlQuota(token, userId, hostId) {
  const { body } = await getJson(token, `/user/${userId}/hosts/${encodeURIComponent(hostId)}/recrawl/quota`);
  return body;
}

export async function submitRecrawl(token, userId, hostId, url) {
  const { response, body } = await apiRequest(
    token,
    `/user/${userId}/hosts/${encodeURIComponent(hostId)}/recrawl/queue`,
    { method: "POST", body: { url } },
  );
  if (response.status !== 202 && response.status !== 200) {
    throw new Error(
      `POST /recrawl/queue → HTTP ${response.status}: ${JSON.stringify(body)}`,
    );
  }
  return body;
}

/** ISO date N days ago (YYYY-MM-DD). */
export function daysAgoIso(days) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

export function latestSeriesValue(points) {
  if (!Array.isArray(points) || !points.length) return null;
  const last = points[points.length - 1];
  return last?.value ?? null;
}

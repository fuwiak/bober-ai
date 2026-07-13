import fetch from "./fetch.mjs";

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
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.bober-ai.dev"
    ).replace(/\/$/, ""),
    feedUrl: (
      overrides.feedUrl ||
      process.env.YANDEX_WEBMASTER_FEED_URL ||
      `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.bober-ai.dev"}/performers-feed.yml`
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

export function authHeaders(token, includeJsonContentType = true) {
  const headers = {
    Authorization: `OAuth ${token}`,
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

export async function apiRequest(token, path, options = {}) {
  const response = await fetch(`${WEBMASTER_API}${path}`, {
    ...options,
    headers: {
      ...authHeaders(token),
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

  return { response, body };
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

export function pickHost(hosts, targetUrl) {
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
  const { response, body } = await apiRequest(
    token,
    `/user/${userId}/hosts/${encodeURIComponent(hostId)}/feeds/add/info?request_id=${encodeURIComponent(requestId)}`,
  );
  if (!response.ok) {
    throw new Error(`GET /feeds/add/info → HTTP ${response.status}: ${JSON.stringify(body)}`);
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
    await new Promise((resolve) => setTimeout(resolve, config.pollIntervalMs));
  }
  throw new Error("Истекло время ожидания перезагрузки фида");
}

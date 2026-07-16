import fetch from "./fetch.mjs";

const TOKEN_URL = "https://oauth.yandex.ru/token";
const INFO_URL = "https://login.yandex.ru/info";

export function getDirectOAuthConfig(overrides = {}) {
  return {
    clientId: (overrides.clientId || process.env.YANDEX_DIRECT_CLIENT_ID || "").trim(),
    clientSecret: (overrides.clientSecret || process.env.YANDEX_DIRECT_CLIENT_SECRET || "").trim(),
    redirectUri: (
      overrides.redirectUri ||
      process.env.YANDEX_DIRECT_REDIRECT_URI ||
      "https://oauth.yandex.ru/verification_code"
    ).trim(),
    accessToken: (overrides.accessToken || process.env.YANDEX_DIRECT_OAUTH_TOKEN || "").trim(),
    refreshToken: (overrides.refreshToken || process.env.YANDEX_DIRECT_REFRESH_TOKEN || "").trim(),
    expiresAt: Number(overrides.expiresAt || process.env.YANDEX_DIRECT_TOKEN_EXPIRES_AT || 0),
  };
}

export function getAuthorizeUrl(config, { responseType = "code" } = {}) {
  if (!config.clientId) {
    throw new Error("YANDEX_DIRECT_CLIENT_ID не задан");
  }

  const params = new URLSearchParams({
    response_type: responseType,
    client_id: config.clientId,
  });

  if (responseType === "code") {
    params.set("redirect_uri", config.redirectUri);
  }

  return `https://oauth.yandex.ru/authorize?${params.toString()}`;
}

function basicAuthHeader(clientId, clientSecret) {
  return `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;
}

async function requestToken(config, body) {
  if (!config.clientId || !config.clientSecret) {
    throw new Error("Нужны YANDEX_DIRECT_CLIENT_ID и YANDEX_DIRECT_CLIENT_SECRET");
  }

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: basicAuthHeader(config.clientId, config.clientSecret),
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams(body).toString(),
  });

  const text = await response.text();
  let payload = {};
  try {
    payload = JSON.parse(text);
  } catch {
    payload = { raw: text.slice(0, 300) };
  }
  if (!response.ok) {
    const detail = payload.error_description || payload.error || JSON.stringify(payload);
    throw new Error(`OAuth token request failed (${response.status}): ${detail}`);
  }

  return payload;
}

export function tokenBundleFromResponse(payload) {
  const expiresIn = Number(payload.expires_in || 0);
  const expiresAt = expiresIn > 0 ? String(Date.now() + expiresIn * 1000) : "";

  return {
    accessToken: String(payload.access_token || "").trim(),
    refreshToken: String(payload.refresh_token || "").trim(),
    expiresAt,
    expiresIn,
    tokenType: payload.token_type || "bearer",
  };
}

export async function exchangeCode(config, code) {
  const payload = await requestToken(config, {
    grant_type: "authorization_code",
    code: code.trim(),
    redirect_uri: config.redirectUri,
  });

  return tokenBundleFromResponse(payload);
}

export async function refreshAccessToken(config) {
  if (!config.refreshToken) {
    throw new Error("YANDEX_DIRECT_REFRESH_TOKEN не задан — нужен одноразовый bootstrap через authorization code");
  }

  const payload = await requestToken(config, {
    grant_type: "refresh_token",
    refresh_token: config.refreshToken,
  });

  return tokenBundleFromResponse(payload);
}

export async function getTokenInfo(accessToken) {
  const response = await fetch(INFO_URL, {
    headers: {
      Authorization: `OAuth ${accessToken}`,
      Accept: "application/json",
    },
  });

  const text = await response.text();
  let payload = {};
  try {
    payload = JSON.parse(text);
  } catch {
    payload = { raw: text.slice(0, 300) };
  }
  if (!response.ok) {
    const detail = payload.error_description || payload.error || JSON.stringify(payload);
    throw new Error(`Token info failed (${response.status}): ${detail}`);
  }

  return payload;
}

export function isTokenExpired(config, refreshSkewMs = 60_000) {
  if (!config.expiresAt) return false;
  return Date.now() >= config.expiresAt - refreshSkewMs;
}

export async function getValidDirectToken(config, { refreshSkewMs = 60_000, onRefresh } = {}) {
  let current = { ...config };

  if (current.refreshToken && isTokenExpired(current, refreshSkewMs)) {
    const refreshed = await refreshAccessToken(current);
    current = {
      ...current,
      accessToken: refreshed.accessToken || current.accessToken,
      refreshToken: refreshed.refreshToken || current.refreshToken,
      expiresAt: Number(refreshed.expiresAt || 0),
    };
    if (onRefresh) await onRefresh(refreshed);
  }

  if (!current.accessToken) {
    throw new Error("YANDEX_DIRECT_OAUTH_TOKEN не задан");
  }

  await getTokenInfo(current.accessToken);
  return current.accessToken;
}

export function railwayVarsFromTokenBundle(bundle) {
  const vars = {
    YANDEX_DIRECT_OAUTH_TOKEN: bundle.accessToken,
  };

  if (bundle.refreshToken) vars.YANDEX_DIRECT_REFRESH_TOKEN = bundle.refreshToken;
  if (bundle.expiresAt) vars.YANDEX_DIRECT_TOKEN_EXPIRES_AT = bundle.expiresAt;

  return vars;
}

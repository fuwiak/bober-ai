import fetch from "./fetch.mjs";

const TOKEN_URL = "https://oauth.yandex.ru/token";
const INFO_URL = "https://login.yandex.ru/info";

/** Default OAuth app for Webmaster / Metrika (bober-ai). */
export const DEFAULT_WEBMASTER_CLIENT_ID = "f2e2f11ae7e3492886ad61a6e45a4c5c";
/** Default OAuth app for Direct / Wordstat / Audience («direct wordstat»). */
export const DEFAULT_DIRECT_CLIENT_ID = "7e70ff5be45f40119890ecefc09d2008";
export const DEFAULT_REDIRECT_URI = "https://oauth.yandex.ru/verification_code";

export function getDirectOAuthConfig(overrides = {}) {
  return {
    kind: "direct",
    clientId: (
      overrides.clientId ||
      process.env.YANDEX_DIRECT_CLIENT_ID ||
      DEFAULT_DIRECT_CLIENT_ID
    ).trim(),
    clientSecret: (overrides.clientSecret || process.env.YANDEX_DIRECT_CLIENT_SECRET || "").trim(),
    redirectUri: (
      overrides.redirectUri ||
      process.env.YANDEX_DIRECT_REDIRECT_URI ||
      DEFAULT_REDIRECT_URI
    ).trim(),
    accessToken: (overrides.accessToken || process.env.YANDEX_DIRECT_OAUTH_TOKEN || "").trim(),
    refreshToken: (overrides.refreshToken || process.env.YANDEX_DIRECT_REFRESH_TOKEN || "").trim(),
    expiresAt: Number(overrides.expiresAt || process.env.YANDEX_DIRECT_TOKEN_EXPIRES_AT || 0),
  };
}

export function getWebmasterOAuthConfig(overrides = {}) {
  return {
    kind: "webmaster",
    clientId: (
      overrides.clientId ||
      process.env.YANDEX_WEBMASTER_CLIENT_ID ||
      DEFAULT_WEBMASTER_CLIENT_ID
    ).trim(),
    clientSecret: (
      overrides.clientSecret ||
      process.env.YANDEX_WEBMASTER_CLIENT_SECRET ||
      ""
    ).trim(),
    redirectUri: (
      overrides.redirectUri ||
      process.env.YANDEX_WEBMASTER_REDIRECT_URI ||
      DEFAULT_REDIRECT_URI
    ).trim(),
    accessToken: (
      overrides.accessToken ||
      process.env.YANDEX_WEBMASTER_OAUTH_TOKEN ||
      process.env.YANDEX_OAUTH_TOKEN ||
      ""
    ).trim(),
    refreshToken: (
      overrides.refreshToken ||
      process.env.YANDEX_WEBMASTER_REFRESH_TOKEN ||
      ""
    ).trim(),
    expiresAt: Number(overrides.expiresAt || process.env.YANDEX_WEBMASTER_TOKEN_EXPIRES_AT || 0),
  };
}

export function getAudienceOAuthConfig(overrides = {}) {
  return {
    kind: "audience",
    // По умолчанию — приложение «direct wordstat» (те же Client ID/secret, что у Direct).
    clientId: (
      overrides.clientId ||
      process.env.YANDEX_AUDIENCE_CLIENT_ID ||
      process.env.YANDEX_DIRECT_CLIENT_ID ||
      DEFAULT_DIRECT_CLIENT_ID
    ).trim(),
    clientSecret: (
      overrides.clientSecret ||
      process.env.YANDEX_AUDIENCE_CLIENT_SECRET ||
      process.env.YANDEX_DIRECT_CLIENT_SECRET ||
      ""
    ).trim(),
    redirectUri: (
      overrides.redirectUri ||
      process.env.YANDEX_AUDIENCE_REDIRECT_URI ||
      process.env.YANDEX_DIRECT_REDIRECT_URI ||
      DEFAULT_REDIRECT_URI
    ).trim(),
    accessToken: (
      overrides.accessToken ||
      process.env.YANDEX_AUDIENCE_OAUTH_TOKEN ||
      ""
    ).trim(),
    refreshToken: (
      overrides.refreshToken ||
      process.env.YANDEX_AUDIENCE_REFRESH_TOKEN ||
      ""
    ).trim(),
    expiresAt: Number(overrides.expiresAt || process.env.YANDEX_AUDIENCE_TOKEN_EXPIRES_AT || 0),
  };
}

function clientIdEnvName(config) {
  if (config.kind === "webmaster") return "YANDEX_WEBMASTER_CLIENT_ID";
  if (config.kind === "audience") return "YANDEX_AUDIENCE_CLIENT_ID";
  return "YANDEX_DIRECT_CLIENT_ID";
}

function clientSecretEnvName(config) {
  if (config.kind === "webmaster") return "YANDEX_WEBMASTER_CLIENT_SECRET";
  if (config.kind === "audience") return "YANDEX_AUDIENCE_CLIENT_SECRET";
  return "YANDEX_DIRECT_CLIENT_SECRET";
}

export function getAuthorizeUrl(config, { responseType = "code", scope } = {}) {
  if (!config.clientId) {
    throw new Error(`${clientIdEnvName(config)} не задан`);
  }

  const params = new URLSearchParams({
    response_type: responseType,
    client_id: config.clientId,
  });

  if (responseType === "code") {
    params.set("redirect_uri", config.redirectUri);
  }

  if (scope) {
    params.set("scope", Array.isArray(scope) ? scope.join(" ") : String(scope));
  }

  return `https://oauth.yandex.ru/authorize?${params.toString()}`;
}

/** Права API Яндекс Аудиторий — должны быть включены в OAuth-приложении. */
export const AUDIENCE_OAUTH_SCOPES = ["audience:read", "audience:write"];

function basicAuthHeader(clientId, clientSecret) {
  return `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;
}

async function requestToken(config, body) {
  if (!config.clientId || !config.clientSecret) {
    throw new Error(`Нужны ${clientIdEnvName(config)} и ${clientSecretEnvName(config)}`);
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
    const hint =
      config.kind === "webmaster"
        ? "YANDEX_WEBMASTER_REFRESH_TOKEN не задан — один раз: yaga webmaster oauth"
        : config.kind === "audience"
          ? "YANDEX_AUDIENCE_REFRESH_TOKEN не задан — npm run yandex:audience:oauth -- exchange --code <CODE>"
          : "YANDEX_DIRECT_REFRESH_TOKEN не задан — нужен одноразовый bootstrap через authorization code";
    throw new Error(hint);
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

export async function getValidWebmasterToken(config, { refreshSkewMs = 60_000, onRefresh } = {}) {
  let current = { ...config };

  if (current.refreshToken && (!current.accessToken || isTokenExpired(current, refreshSkewMs))) {
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
    throw new Error(
      "Нет OAuth-токена. ClientID/secret — не токен. Один раз: yaga webmaster oauth",
    );
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

export function webmasterCredentialVarsFromBundle(bundle, { clientId, clientSecret } = {}) {
  const vars = {
    YANDEX_WEBMASTER_OAUTH_TOKEN: bundle.accessToken,
    YANDEX_OAUTH_TOKEN: bundle.accessToken,
  };
  if (bundle.refreshToken) vars.YANDEX_WEBMASTER_REFRESH_TOKEN = bundle.refreshToken;
  if (bundle.expiresAt) vars.YANDEX_WEBMASTER_TOKEN_EXPIRES_AT = bundle.expiresAt;
  if (clientId) vars.YANDEX_WEBMASTER_CLIENT_ID = clientId;
  if (clientSecret) vars.YANDEX_WEBMASTER_CLIENT_SECRET = clientSecret;
  return vars;
}

export async function getValidAudienceToken(config, { refreshSkewMs = 60_000, onRefresh } = {}) {
  let current = { ...config };

  if (current.refreshToken && (!current.accessToken || isTokenExpired(current, refreshSkewMs))) {
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
    throw new Error(
      "Нет YANDEX_AUDIENCE_OAUTH_TOKEN. Один раз: npm run yandex:audience:oauth -- authorize-url",
    );
  }

  await getTokenInfo(current.accessToken);
  return current.accessToken;
}

export function audienceCredentialVarsFromBundle(bundle, { clientId, clientSecret } = {}) {
  const vars = {
    YANDEX_AUDIENCE_OAUTH_TOKEN: bundle.accessToken,
  };
  if (bundle.refreshToken) vars.YANDEX_AUDIENCE_REFRESH_TOKEN = bundle.refreshToken;
  if (bundle.expiresAt) vars.YANDEX_AUDIENCE_TOKEN_EXPIRES_AT = bundle.expiresAt;
  if (clientId) vars.YANDEX_AUDIENCE_CLIENT_ID = clientId;
  if (clientSecret) vars.YANDEX_AUDIENCE_CLIENT_SECRET = clientSecret;
  return vars;
}

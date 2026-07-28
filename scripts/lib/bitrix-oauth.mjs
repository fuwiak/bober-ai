/**
 * Bitrix24 OAuth helpers (локальное приложение → Sign B2E, Sites, REST).
 * @see https://apidocs.bitrix24.ru/settings/oauth/index.html
 * @see https://apidocs.bitrix24.ru/api-reference/sign/index.html
 * @see https://apidocs.bitrix24.com/api-reference/scopes/permissions.html
 */

import fetch from "./fetch.mjs";

export const BITRIX_DEFAULT_PORTAL = "https://b24-tuh0lz.bitrix24.ru";
/** HTTPS на проде — Bitrix отклоняет http:/localhost и опечатки http:/ */
export const BITRIX_DEFAULT_REDIRECT_URI = "https://www.bober-systems.ru/api/bitrix/oauth/callback";
export const BITRIX_DEFAULT_INSTALL_URI = "https://www.bober-systems.ru/api/bitrix/oauth/install";
export const BITRIX_TOKEN_URL = "https://oauth.bitrix.info/oauth/token/";
/**
 * Полный набор прав локального приложения:
 * sign.b2e (КЭДО), crm, user, im, landing (Сайты / Sites API).
 * Права задаются чекбоксами в UI приложения; &scope= на authorize — запрос подмножества.
 */
export const BITRIX_OAUTH_SCOPES = ["sign.b2e", "crm", "user", "im", "landing"];
/** @deprecated используйте BITRIX_OAUTH_SCOPES */
export const BITRIX_SIGN_SCOPES = BITRIX_OAUTH_SCOPES.filter((s) => s !== "landing");
/** Алиас: полный список включая landing (Sites). */
export const BITRIX_LANDING_SCOPES = BITRIX_OAUTH_SCOPES;

function trimSlash(url) {
  return String(url || "").replace(/\/$/, "");
}

export function getBitrixOAuthConfig() {
  const portal = trimSlash(
    process.env.BITRIX24_PORTAL?.trim() || BITRIX_DEFAULT_PORTAL,
  );
  const clientId = process.env.BITRIX24_CLIENT_ID?.trim() || "";
  const clientSecret = process.env.BITRIX24_CLIENT_SECRET?.trim() || "";
  const redirectUri =
    process.env.BITRIX24_REDIRECT_URI?.trim() || BITRIX_DEFAULT_REDIRECT_URI;
  const accessToken = process.env.BITRIX24_ACCESS_TOKEN?.trim() || "";
  const refreshToken = process.env.BITRIX24_REFRESH_TOKEN?.trim() || "";
  const expiresAtRaw = process.env.BITRIX24_TOKEN_EXPIRES_AT?.trim() || "";
  const expiresAt = expiresAtRaw ? Number(expiresAtRaw) : 0;
  const memberId = process.env.BITRIX24_MEMBER_ID?.trim() || "";
  const clientEndpoint =
    process.env.BITRIX24_CLIENT_ENDPOINT?.trim() || `${portal}/rest/`;

  return {
    portal,
    clientId,
    clientSecret,
    redirectUri,
    accessToken,
    refreshToken,
    expiresAt: Number.isFinite(expiresAt) ? expiresAt : 0,
    memberId,
    clientEndpoint,
  };
}

export function getAuthorizeUrl(
  config = getBitrixOAuthConfig(),
  scopes = BITRIX_OAUTH_SCOPES,
) {
  const url = new URL(`${config.portal}/oauth/authorize/`);
  url.searchParams.set("client_id", config.clientId);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", config.redirectUri);
  // Bitrix принимает &scope= как запрос прав (фактический список = чекбоксы приложения ∩ scope).
  const scopeList = Array.isArray(scopes) ? scopes : String(scopes || "").split(/[\s,]+/).filter(Boolean);
  if (scopeList.length) {
    url.searchParams.set("scope", scopeList.join(","));
  }
  return url.toString();
}

export function bitrixCredentialVarsFromBundle(bundle, extras = {}) {
  const expiresAt =
    bundle.expires_at ||
    (bundle.expires_in
      ? Date.now() + Number(bundle.expires_in) * 1000
      : bundle.expires
        ? Number(bundle.expires) * 1000
        : 0);

  return {
    BITRIX24_PORTAL: extras.portal || bundle.portal || "",
    BITRIX24_CLIENT_ID: extras.clientId || "",
    BITRIX24_CLIENT_SECRET: extras.clientSecret || "",
    BITRIX24_REDIRECT_URI: extras.redirectUri || "",
    BITRIX24_ACCESS_TOKEN: bundle.access_token || "",
    BITRIX24_REFRESH_TOKEN: bundle.refresh_token || "",
    BITRIX24_TOKEN_EXPIRES_AT: expiresAt ? String(expiresAt) : "",
    BITRIX24_MEMBER_ID: bundle.member_id || "",
    BITRIX24_CLIENT_ENDPOINT: bundle.client_endpoint || "",
  };
}

async function tokenRequest(params) {
  const url = new URL(BITRIX_TOKEN_URL);
  for (const [key, value] of Object.entries(params)) {
    if (value != null && value !== "") url.searchParams.set(key, String(value));
  }
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  const text = await response.text();
  let body = {};
  try {
    body = JSON.parse(text);
  } catch {
    body = { raw: text.slice(0, 500) };
  }
  if (!response.ok || body.error) {
    const msg = body.error_description || body.error || text.slice(0, 300);
    throw new Error(`Bitrix OAuth token error: ${msg}`);
  }
  return body;
}

export async function exchangeCode(code, config = getBitrixOAuthConfig()) {
  return tokenRequest({
    grant_type: "authorization_code",
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    // Bitrix docs: redirect_uri optional on exchange for some apps; include for safety
    redirect_uri: config.redirectUri,
  });
}

export async function refreshAccessToken(config = getBitrixOAuthConfig()) {
  if (!config.refreshToken) {
    throw new Error("Нет BITRIX24_REFRESH_TOKEN — сначала npm run bitrix:oauth -- authorize");
  }
  return tokenRequest({
    grant_type: "refresh_token",
    client_id: config.clientId,
    client_secret: config.clientSecret,
    refresh_token: config.refreshToken,
  });
}

export function isTokenExpired(config = getBitrixOAuthConfig(), skewMs = 60_000) {
  if (!config.accessToken) return true;
  if (!config.expiresAt) return false;
  return Date.now() >= config.expiresAt - skewMs;
}

export async function getValidBitrixToken(config = getBitrixOAuthConfig()) {
  if (config.accessToken && !isTokenExpired(config)) {
    return config.accessToken;
  }
  if (!config.refreshToken) {
    throw new Error("Нет access/refresh токена Bitrix24");
  }
  const bundle = await refreshAccessToken(config);
  return { token: bundle.access_token, bundle };
}

export async function bitrixRest(method, params = {}, config = getBitrixOAuthConfig()) {
  let accessToken = config.accessToken;
  if (isTokenExpired(config) && config.refreshToken) {
    const bundle = await refreshAccessToken(config);
    accessToken = bundle.access_token;
  }
  if (!accessToken) throw new Error("Нет BITRIX24_ACCESS_TOKEN");

  const endpoint = (config.clientEndpoint || `${config.portal}/rest/`).replace(/\/?$/, "/");
  const url = `${endpoint}${method}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ ...params, auth: accessToken }),
  });
  const text = await response.text();
  let body = {};
  try {
    body = JSON.parse(text);
  } catch {
    body = { raw: text.slice(0, 500) };
  }
  return { response, body, accessToken };
}

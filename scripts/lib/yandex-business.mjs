/**
 * Yandex Business Partner API client (geoadv-api.yandex.ru).
 * Auth header: Authorization: OAuth <token>
 * Docs: https://yandex.ru/dev/business-api/doc/ref/index.html
 */

import fetch from "./fetch.mjs";
import { applyYagaCredentials, upsertYagaCredentials } from "./yaga-credentials.mjs";
import {
  businessCredentialVarsFromBundle,
  getBusinessOAuthConfig,
  getTokenInfo,
  getValidBusinessToken,
} from "./yandex-oauth.mjs";

export const BUSINESS_API_HOST = "https://geoadv-api.yandex.ru";
export const DEFAULT_COMPANY_ID = 113092981562;
export const DEFAULT_COUNTRY_GEO_ID = 225; // Russia

applyYagaCredentials();

export function getBusinessConfig() {
  const oauth = getBusinessOAuthConfig();
  return {
    ...oauth,
    clientLogin: (
      process.env.YANDEX_BUSINESS_CLIENT_LOGIN ||
      process.env.YANDEX_BUSINESS_LOGIN ||
      ""
    ).trim(),
    companyId: Number(
      process.env.YANDEX_BUSINESS_COMPANY_ID || DEFAULT_COMPANY_ID,
    ),
    countryGeoId: Number(
      process.env.YANDEX_BUSINESS_COUNTRY_GEO_ID || DEFAULT_COUNTRY_GEO_ID,
    ),
  };
}

export async function resolveBusinessToken(config = getBusinessConfig()) {
  return getValidBusinessToken(config, {
    onRefresh: async (bundle) => {
      upsertYagaCredentials(
        businessCredentialVarsFromBundle(bundle, {
          clientId: config.clientId,
          clientSecret: config.clientSecret,
        }),
      );
    },
  });
}

/**
 * @param {object} opts
 * @param {string} opts.method
 * @param {string} opts.path  e.g. /priority/v1/company-search
 * @param {Record<string, unknown>} [opts.query]
 * @param {unknown} [opts.body]
 * @param {string} [opts.token]
 * @param {string} [opts.clientLogin]
 */
export async function businessRequest({
  method = "GET",
  path,
  query,
  body,
  token,
  clientLogin,
} = {}) {
  const config = getBusinessConfig();
  const accessToken = token || (await resolveBusinessToken(config));
  const login = (clientLogin ?? config.clientLogin) || "";

  const url = new URL(path, BUSINESS_API_HOST);
  if (query && typeof query === "object") {
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined || v === null || v === "") continue;
      url.searchParams.set(k, String(v));
    }
  }

  const headers = {
    Accept: "application/json",
    Authorization: `OAuth ${accessToken}`,
  };
  if (login) headers["Client-Login"] = login;

  const init = { method: method.toUpperCase(), headers };
  if (body !== undefined) {
    headers["Content-Type"] = "application/json; charset=utf-8";
    init.body = JSON.stringify(body);
  }

  const response = await fetch(url.toString(), init);
  const text = await response.text();
  let payload = {};
  try {
    payload = text ? JSON.parse(text) : {};
  } catch {
    payload = { raw: text.slice(0, 500) };
  }

  return {
    ok: response.ok,
    status: response.status,
    payload,
    url: url.toString(),
  };
}

export async function pingBusinessApi(token) {
  return businessRequest({
    method: "POST",
    path: "/priority/v1/pingping",
    token,
    body: {},
  });
}

export async function companySearch(text, { limit = 10, offset = 0, geoId = 225 } = {}) {
  return businessRequest({
    method: "GET",
    path: "/priority/v1/company-search",
    query: { text, limit, offset, geoId },
  });
}

export async function isOwner({ companyId, chainId, countryGeoId, clientLogin } = {}) {
  const config = getBusinessConfig();
  return businessRequest({
    method: "GET",
    path: "/priority/v1/is-owner",
    clientLogin: clientLogin || config.clientLogin,
    query: {
      companyId: companyId ?? config.companyId,
      chainId: chainId ?? 0,
      countryGeoId: countryGeoId ?? config.countryGeoId,
    },
  });
}

export async function createCompany(fields, { clientLogin } = {}) {
  return businessRequest({
    method: "POST",
    path: "/priority/v1/create-company",
    clientLogin,
    body: fields,
  });
}

export async function companyCreationStatus(companyId) {
  return businessRequest({
    method: "GET",
    path: "/priority/v1/company-creation-status",
    query: { companyId },
  });
}

export async function rubricSuggestion(text) {
  return businessRequest({
    method: "GET",
    path: "/priority/v1/rubric-suggestion",
    query: { text },
  });
}

export async function regionSuggestion(text) {
  return businessRequest({
    method: "GET",
    path: "/priority/v1/region-suggestion",
    query: { text },
  });
}

export async function getCampaigns({ limit = 20, offset = 0, clientLogin } = {}) {
  return businessRequest({
    method: "GET",
    path: "/priority/v6/get-campaigns",
    clientLogin,
    query: { limit, offset },
  });
}

export async function getCampaign(campaignId, { clientLogin } = {}) {
  return businessRequest({
    method: "GET",
    path: "/priority/v5/get-campaign",
    clientLogin,
    query: { campaignId },
  });
}

export async function createCampaign(
  { companyId, chainId, countryGeoId = 225, url, mapsOnly = false } = {},
  { clientLogin } = {},
) {
  return businessRequest({
    method: "POST",
    path: "/priority/v5/create-campaign",
    clientLogin,
    body: {
      companyId: companyId || undefined,
      chainId: chainId || undefined,
      countryGeoId,
      url: url || undefined,
      mapsOnly,
    },
  });
}

export async function campaignPrice(
  { companyId, chainId, campaignId, countryGeoId = 225 } = {},
  { clientLogin } = {},
) {
  return businessRequest({
    method: "POST",
    path: "/priority/v5/campaign-price",
    clientLogin,
    body: {
      companyId: companyId || undefined,
      chainId: chainId || undefined,
      campaignId: campaignId || undefined,
      countryGeoId,
    },
  });
}

export async function launchCampaign(
  { campaignId, duration, monthAmount } = {},
  { clientLogin } = {},
) {
  return businessRequest({
    method: "POST",
    path: "/priority/v5/launch-campaign",
    clientLogin,
    body: { campaignId, duration, monthAmount },
  });
}

export async function tokenLoginHint(token) {
  try {
    const info = await getTokenInfo(token);
    return info.login || info.display_name || info.id || "?";
  } catch {
    return "?";
  }
}

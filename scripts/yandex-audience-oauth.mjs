#!/usr/bin/env node

/**
 * OAuth для API Яндекс Аудиторий (https://audience.yandex.com/).
 *
 * Права в приложении OAuth (обязательно):
 *   - создание/изменение сегментов (своих и доверенных)
 *   - чтение параметров сегментов
 * @see https://yandex.ru/dev/audience/ru/intro/authorization
 *
 *   npm run yandex:audience:oauth -- status
 *   npm run yandex:audience:oauth -- authorize-url
 *   npm run yandex:audience:oauth -- exchange --code <CODE>
 *   npm run yandex:audience:oauth -- set-token --token y0_...
 *   npm run yandex:audience:oauth -- refresh
 *
 * Токен пишется в ~/.config/yaga/credentials.env (и process.env).
 * Опционально: --update-railway
 */

import { applyYagaCredentials, upsertYagaCredentials } from "./lib/yaga-credentials.mjs";
import { setRailwayVariables } from "./lib/yandex-railway.mjs";
import {
  AUDIENCE_OAUTH_SCOPES,
  audienceCredentialVarsFromBundle,
  exchangeCode,
  getAudienceOAuthConfig,
  getAuthorizeUrl,
  getTokenInfo,
  getValidAudienceToken,
  isTokenExpired,
  refreshAccessToken,
  tokenBundleFromResponse,
} from "./lib/yandex-oauth.mjs";
import fetch from "./lib/fetch.mjs";

applyYagaCredentials();

const args = process.argv.slice(2);
const command = args[0] || "status";
const flags = new Set(args.filter((arg) => arg.startsWith("--")));
const positional = args.slice(1).filter((arg) => !arg.startsWith("--"));

function readFlag(name) {
  const inline = args.find((arg) => arg.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  return undefined;
}

function fail(message) {
  console.error(`\nОшибка: ${message}`);
  process.exit(1);
}

function log(message) {
  console.log(message);
}

async function checkAudienceApi(token) {
  const response = await fetch("https://api-audience.yandex.ru/v1/management/segments", {
    headers: {
      Authorization: `OAuth ${token}`,
      Accept: "application/json",
    },
  });
  const text = await response.text();
  let body = {};
  try {
    body = JSON.parse(text);
  } catch {
    body = { raw: text.slice(0, 400) };
  }
  return { response, body };
}

async function persist(bundle, config) {
  const vars = audienceCredentialVarsFromBundle(bundle, {
    clientId: config.clientId,
    clientSecret: config.clientSecret,
  });
  const file = upsertYagaCredentials(vars);
  log(`Сохранено в ${file}`);

  if (flags.has("--update-railway")) {
    log("Обновляю Railway env...");
    setRailwayVariables(vars);
    log("Railway env обновлён");
  }
}

async function cmdStatus() {
  const config = getAudienceOAuthConfig();
  log("Yandex Audience OAuth\n");
  log(`UI:       https://audience.yandex.com/`);
  log(`API:      https://api-audience.yandex.ru/v1/`);
  log(`Docs:     https://yandex.ru/dev/audience/ru/intro/authorization`);
  log(`App:      direct wordstat (shared with Direct)`);
  log(`Client ID: ${config.clientId || "(не задан)"}`);
  log(`Secret:    ${config.clientSecret ? "задан" : "не задан"}`);
  log(`Redirect:  ${config.redirectUri}`);
  log(`Access:    ${config.accessToken ? "задан" : "не задан"}`);
  log(`Refresh:   ${config.refreshToken ? "задан" : "не задан"}`);
  log(`Expires:   ${config.expiresAt ? new Date(config.expiresAt).toISOString() : "неизвестно"}`);

  if (!config.accessToken) {
    log("\n1) В приложении «direct wordstat» добавьте scopes:");
    log(`   ${AUDIENCE_OAUTH_SCOPES.join(", ")}`);
    log(`   Редактор: https://oauth.yandex.ru/client/${config.clientId}`);
    log("   · создание/изменение сегментов → audience:write");
    log("   · чтение параметров сегментов → audience:read");
    log("2) Получите токен:");
    log("   npm run yandex:audience:oauth -- authorize-url");
    log("   npm run yandex:audience:oauth -- exchange --code <CODE>");
    log("   # или отладочный токен:");
    log("   npm run yandex:audience:oauth -- set-token --token y0_...");
    process.exit(2);
  }

  try {
    const info = await getTokenInfo(config.accessToken);
    log(`\nToken OK: login=${info.login}, client_id=${info.client_id}`);
  } catch (error) {
    fail(error.message);
  }

  if (config.refreshToken) {
    log(`Refresh: ${isTokenExpired(config) ? "нужен refresh" : "актуален"}`);
  }

  const { response, body } = await checkAudienceApi(config.accessToken);
  if (response.ok) {
    const n = Array.isArray(body.segments) ? body.segments.length : 0;
    log(`Audience API: OK (сегментов: ${n})`);
    return;
  }

  log(`\nAudience API: HTTP ${response.status}`);
  log(`  ${typeof body === "object" ? JSON.stringify(body).slice(0, 400) : body}`);
  log("\nЧастая причина: в OAuth-приложении нет прав Audience — добавьте и перевыпустите токен.");
  process.exit(2);
}

async function cmdAuthorizeUrl() {
  const config = getAudienceOAuthConfig();
  if (!config.clientId) fail("YANDEX_AUDIENCE_CLIENT_ID / YANDEX_WEBMASTER_CLIENT_ID не задан");
  log(
    getAuthorizeUrl(config, {
      responseType: "code",
      scope: AUDIENCE_OAUTH_SCOPES,
    }),
  );
  log("\nПосле авторизации скопируйте code и выполните:");
  log("  npm run yandex:audience:oauth -- exchange --code <CODE>");
  log(`\nScopes: ${AUDIENCE_OAUTH_SCOPES.join(" ")}`);
  log("Если OAuth вернёт invalid_scope — сначала добавьте эти права в приложение:");
  log(`  https://oauth.yandex.ru/client/${config.clientId}`);
}

async function cmdExchange() {
  const code = readFlag("--code") || positional[0];
  if (!code) fail("Укажите --code <authorization_code>");

  const config = getAudienceOAuthConfig();
  const bundle = await exchangeCode(config, code);
  if (!bundle.accessToken) fail("OAuth не вернул access_token");

  log("Access token получен");
  if (bundle.refreshToken) log("Refresh token получен");
  if (bundle.expiresAt) log(`Истекает: ${new Date(Number(bundle.expiresAt)).toISOString()}`);

  await persist(bundle, config);

  const { response, body } = await checkAudienceApi(bundle.accessToken);
  if (response.ok) {
    log(`Audience API: OK (сегментов: ${body.segments?.length ?? 0})`);
  } else {
    log(`Audience API пока недоступен: HTTP ${response.status}`);
    log("Проверьте права Audience в OAuth-приложении и перевыпустите токен.");
  }
}

async function cmdRefresh() {
  const config = getAudienceOAuthConfig();
  const bundle = await refreshAccessToken(config);
  if (!bundle.accessToken) fail("Refresh не вернул access_token");
  log("Access token обновлён");
  await persist(bundle, config);
}

async function cmdSetToken() {
  const token = readFlag("--token") || positional[0];
  if (!token) fail("Укажите --token <access_token>");

  const config = getAudienceOAuthConfig();
  const bundle = tokenBundleFromResponse({ access_token: token });
  await getTokenInfo(bundle.accessToken);
  log("Access token валиден (login.yandex.ru/info)");
  await persist(bundle, config);

  const { response, body } = await checkAudienceApi(bundle.accessToken);
  if (response.ok) {
    log(`Audience API: OK (сегментов: ${body.segments?.length ?? 0})`);
  } else {
    log(`Audience API: HTTP ${response.status} — нужны права Audience на приложении токена`);
    process.exit(2);
  }
}

async function cmdEnsure() {
  const config = getAudienceOAuthConfig();
  const token = await getValidAudienceToken(config, {
    onRefresh: async (bundle) => {
      log("Access token обновлён по refresh");
      await persist(bundle, config);
    },
  });
  log(token);
}

async function main() {
  switch (command) {
    case "status":
      await cmdStatus();
      break;
    case "authorize-url":
      await cmdAuthorizeUrl();
      break;
    case "exchange":
      await cmdExchange();
      break;
    case "refresh":
      await cmdRefresh();
      break;
    case "set-token":
      await cmdSetToken();
      break;
    case "ensure":
      await cmdEnsure();
      break;
    default:
      fail(`Неизвестная команда: ${command}
Команды: status | authorize-url | exchange | set-token | refresh | ensure`);
  }
}

main().catch((error) => fail(error.message));

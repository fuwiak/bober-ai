#!/usr/bin/env node

import { setRailwayVariables } from "./lib/yandex-railway.mjs";
import {
  exchangeCode,
  getAuthorizeUrl,
  getDirectOAuthConfig,
  getTokenInfo,
  getValidDirectToken,
  isTokenExpired,
  railwayVarsFromTokenBundle,
  refreshAccessToken,
  tokenBundleFromResponse,
} from "./lib/yandex-oauth.mjs";
import fetch from "./lib/fetch.mjs";

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

async function checkDirectApi(token) {
  const response = await fetch("https://api.direct.yandex.com/json/v5/clients", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Accept-Language": "ru",
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ method: "get", params: { FieldNames: ["Login"] } }),
  });

  const text = await response.text();
  let body = {};
  try {
    body = JSON.parse(text);
  } catch {
    body = {};
  }
  return { response, body };
}

async function syncRailway(bundle) {
  if (!flags.has("--update-railway")) return;

  log("Обновляю Railway env...");
  setRailwayVariables(railwayVarsFromTokenBundle(bundle));
  log("Railway env обновлён");
}

async function cmdStatus() {
  const config = getDirectOAuthConfig();
  log("Yandex Direct OAuth\n");

  if (!config.clientId) {
    fail("YANDEX_DIRECT_CLIENT_ID не задан");
  }

  log(`Client ID: ${config.clientId}`);
  log(`Redirect:  ${config.redirectUri}`);
  log(`Access:    ${config.accessToken ? "задан" : "не задан"}`);
  log(`Refresh:   ${config.refreshToken ? "задан" : "не задан"}`);
  log(`Expires:   ${config.expiresAt ? new Date(config.expiresAt).toISOString() : "неизвестно"}`);

  if (!config.accessToken) {
    log("\nПолучите refresh token однократно:");
    log(`  npm run yandex:direct:oauth -- authorize-url`);
    log("  npm run yandex:direct:oauth -- exchange --code <CODE> --update-railway");
    process.exit(2);
  }

  try {
    const info = await getTokenInfo(config.accessToken);
    log(`\nToken OK: login=${info.login}, client_id=${info.client_id}`);
  } catch (error) {
    fail(error.message);
  }

  if (config.refreshToken) {
    log(`Refresh token: ${isTokenExpired(config) ? "нужен refresh" : "актуален"}`);
  } else {
    log("\nRefresh token не сохранён — автообновление недоступно.");
    log("Один раз выполните bootstrap через authorization code.");
  }

  const { response, body } = await checkDirectApi(config.accessToken);
  if (response.ok) {
    const login = body?.result?.Clients?.[0]?.Login;
    log(`Direct API: OK${login ? ` (login=${login})` : ""}`);
    return;
  }

  const error = body?.error || {};
  log(`\nDirect API: HTTP ${response.status}`);
  log(`  ${error.error_string || "unknown"} — ${error.error_detail || ""}`);

  if (Number(error.error_code) === 58) {
    log("\nOAuth-токен валиден, но заявка на Direct API ещё не подтверждена:");
    log("  https://yandex.ru/dev/direct/doc/dg/concepts/register.html");
  }
}

async function cmdAuthorizeUrl() {
  const config = getDirectOAuthConfig();
  log(getAuthorizeUrl(config, { responseType: "code" }));
  log("\nПосле авторизации скопируйте code со страницы verification_code и выполните:");
  log("  npm run yandex:direct:oauth -- exchange --code <CODE> --update-railway");
}

async function cmdExchange() {
  const code = readFlag("--code") || positional[0];
  if (!code) fail("Укажите --code <authorization_code>");

  const config = getDirectOAuthConfig();
  const bundle = await exchangeCode(config, code);
  if (!bundle.accessToken) fail("OAuth не вернул access_token");

  log("Access token получен");
  if (bundle.refreshToken) log("Refresh token получен — автообновление включено");
  if (bundle.expiresAt) log(`Истекает: ${new Date(Number(bundle.expiresAt)).toISOString()}`);

  await syncRailway(bundle);
}

async function cmdRefresh() {
  const config = getDirectOAuthConfig();
  const bundle = await refreshAccessToken(config);
  if (!bundle.accessToken) fail("Refresh не вернул access_token");

  log("Access token обновлён");
  if (bundle.refreshToken) log("Refresh token обновлён");
  if (bundle.expiresAt) log(`Истекает: ${new Date(Number(bundle.expiresAt)).toISOString()}`);

  await syncRailway(bundle);
}

async function cmdSetToken() {
  const token = readFlag("--token") || positional[0];
  if (!token) fail("Укажите --token <access_token>");

  const bundle = tokenBundleFromResponse({ access_token: token });
  await getTokenInfo(bundle.accessToken);
  log("Access token валиден");

  await syncRailway(bundle);
}

async function cmdEnsure() {
  const config = getDirectOAuthConfig();
  const token = await getValidDirectToken(config, {
    onRefresh: async (bundle) => {
      log("Access token автоматически обновлён по refresh token");
      await syncRailway(bundle);
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
      fail(`Неизвестная команда: ${command}`);
  }
}

main().catch((error) => fail(error.message));

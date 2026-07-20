#!/usr/bin/env node

/**
 * Bootstrap Yandex Webmaster / Metrika OAuth.
 *
 * ClientID + Client secret ≠ access token.
 * One browser consent → authorization code → access (+ refresh) token.
 *
 *   yaga webmaster oauth
 *   yaga webmaster oauth authorize-url --open
 *   yaga webmaster oauth exchange --code <CODE>
 *   yaga webmaster oauth set-token --token y0_...
 */

import { spawnSync } from "node:child_process";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import {
  applyYagaCredentials,
  credentialsPath,
  upsertYagaCredentials,
} from "./lib/yaga-credentials.mjs";
import {
  exchangeCode,
  getAuthorizeUrl,
  getTokenInfo,
  getValidWebmasterToken,
  getWebmasterOAuthConfig,
  refreshAccessToken,
  tokenBundleFromResponse,
  webmasterCredentialVarsFromBundle,
} from "./lib/yandex-oauth.mjs";

applyYagaCredentials();

const args = process.argv.slice(2);
const command = args[0] || "bootstrap";
const flags = new Set(args.filter((arg) => arg.startsWith("--") && !arg.includes("=")));
const positional = args.slice(1).filter((arg) => !arg.startsWith("--"));

function readFlag(name) {
  const inline = args.find((arg) => arg.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const idx = args.indexOf(name);
  if (idx >= 0 && args[idx + 1] && !args[idx + 1].startsWith("--")) return args[idx + 1];
  return undefined;
}

function fail(message) {
  console.error(`\nОшибка: ${message}`);
  process.exit(1);
}

function log(message) {
  console.log(message);
}

function openUrl(url) {
  const opener = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
  const result = spawnSync(opener, [url], { stdio: "ignore" });
  return result.status === 0;
}

function persistBundle(bundle, config) {
  const skip = flags.has("--no-save");
  if (skip) return null;
  const vars = webmasterCredentialVarsFromBundle(bundle, {
    clientId: config.clientId,
    clientSecret: config.clientSecret,
  });
  const file = upsertYagaCredentials(vars);
  log(`Сохранено → ${file}`);
  return file;
}

async function cmdStatus() {
  const config = getWebmasterOAuthConfig();
  log("Yandex Webmaster OAuth\n");
  log(`Client ID: ${config.clientId || "(нет)"}`);
  log(`Secret:    ${config.clientSecret ? "задан" : "не задан"}`);
  log(`Redirect:  ${config.redirectUri}`);
  log(`Access:    ${config.accessToken ? "задан" : "не задан"}`);
  log(`Refresh:   ${config.refreshToken ? "задан" : "не задан"}`);
  log(`File:      ${credentialsPath()}`);

  if (!config.accessToken && !config.refreshToken) {
    log("\nClientID/secret сами по себе API не открывают.");
    log("Нужен access token (y0_…):");
    log("  yaga webmaster oauth");
    process.exit(2);
  }

  try {
    const token = await getValidWebmasterToken(config, {
      onRefresh: async (bundle) => {
        log("Access token обновлён по refresh token");
        persistBundle(bundle, config);
      },
    });
    const info = await getTokenInfo(token);
    log(`\nToken OK: login=${info.login}, client_id=${info.client_id}`);
  } catch (error) {
    fail(error.message);
  }
}

async function cmdAuthorizeUrl() {
  const config = getWebmasterOAuthConfig();
  const url = getAuthorizeUrl(config, { responseType: "code" });
  log(url);
  if (flags.has("--open") || flags.has("-o")) {
    if (openUrl(url)) log("\nБраузер открыт — подтверди доступ и скопируй code.");
    else log("\nНе удалось открыть браузер — открой URL вручную.");
  } else {
    log("\nПосле авторизации:");
    log("  yaga webmaster oauth exchange --code <CODE>");
  }
}

async function cmdExchange() {
  const code = readFlag("--code") || positional[0];
  if (!code) fail("Укажите --code <authorization_code> со страницы verification_code");

  const config = getWebmasterOAuthConfig();
  if (!config.clientSecret) {
    fail("Нет YANDEX_WEBMASTER_CLIENT_SECRET (yaga credentials set …)");
  }

  const bundle = await exchangeCode(config, code);
  if (!bundle.accessToken) fail("OAuth не вернул access_token");

  log("Access token получен");
  if (bundle.refreshToken) log("Refresh token получен");
  if (bundle.expiresAt) log(`Истекает: ${new Date(Number(bundle.expiresAt)).toISOString()}`);

  const info = await getTokenInfo(bundle.accessToken);
  log(`OK: login=${info.login}`);
  persistBundle(bundle, config);
}

async function cmdRefresh() {
  const config = getWebmasterOAuthConfig();
  const bundle = await refreshAccessToken(config);
  if (!bundle.accessToken) fail("Refresh не вернул access_token");
  log("Access token обновлён");
  persistBundle(bundle, config);
}

async function cmdSetToken() {
  const token = readFlag("--token") || positional[0];
  if (!token) fail("Укажите --token <access_token> (обычно начинается с y0_)");

  const config = getWebmasterOAuthConfig();
  const bundle = tokenBundleFromResponse({ access_token: token });
  const info = await getTokenInfo(bundle.accessToken);
  log(`Token OK: login=${info.login}`);
  persistBundle(bundle, config);
}

async function cmdBootstrap() {
  const config = getWebmasterOAuthConfig();

  if (!config.clientId) fail("Нет ClientID");
  if (!config.clientSecret) {
    fail(
      "Нет YANDEX_WEBMASTER_CLIENT_SECRET. Сохрани secret:\n" +
        "  yaga credentials set YANDEX_WEBMASTER_CLIENT_SECRET <secret>",
    );
  }

  // Keep app credentials in the file even before token exchange.
  upsertYagaCredentials({
    YANDEX_WEBMASTER_CLIENT_ID: config.clientId,
    YANDEX_WEBMASTER_CLIENT_SECRET: config.clientSecret,
  });

  if (config.accessToken || config.refreshToken) {
    log("Токен уже есть — проверяю…");
    await cmdStatus();
    return;
  }

  const url = getAuthorizeUrl(config, { responseType: "code" });
  log("ClientID/secret есть. Нужен одноразовый access token.\n");
  log("1) Открой и подтверди доступ:");
  log(`   ${url}\n`);
  openUrl(url);

  if (!process.stdin.isTTY || flags.has("--no-prompt")) {
    log("2) Потом:");
    log("   yaga webmaster oauth exchange --code <CODE>");
    process.exit(2);
  }

  const rl = readline.createInterface({ input, output });
  try {
    const code = (await rl.question("2) Вставь code со страницы verification_code: ")).trim();
    if (!code) fail("Пустой code");
    const bundle = await exchangeCode(config, code);
    if (!bundle.accessToken) fail("OAuth не вернул access_token");
    const info = await getTokenInfo(bundle.accessToken);
    log(`\nOK: login=${info.login}`);
    persistBundle(bundle, config);
    log("\nГотово. Можно: yaga webmaster status");
  } finally {
    rl.close();
  }
}

async function main() {
  switch (command) {
    case "status":
      await cmdStatus();
      break;
    case "authorize-url":
    case "url":
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
    case "bootstrap":
    case "login":
    case "help":
    case "--help":
      if (command === "help" || command === "--help") {
        log(`yaga webmaster oauth

  (default)     открыть authorize + сохранить token
  status        проверить токен
  authorize-url [--open]
  exchange --code <CODE>
  set-token --token y0_...
  refresh

ClientID/secret ≠ OAuth token. Token живёт в ~/.config/yaga/credentials.env`);
        return;
      }
      await cmdBootstrap();
      break;
    default:
      fail(`Неизвестная команда: ${command}`);
  }
}

main().catch((error) => fail(error.message));

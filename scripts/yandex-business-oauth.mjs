#!/usr/bin/env node
/**
 * Bootstrap OAuth for Yandex Business Partner API.
 *
 *   yaga business oauth
 *   yaga business oauth authorize-url --open
 *   yaga business oauth exchange --code <CODE>
 *   yaga business oauth set-token --token y0_...
 *   yaga business oauth status
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
  businessCredentialVarsFromBundle,
  exchangeCode,
  getAuthorizeUrl,
  getBusinessOAuthConfig,
  getTokenInfo,
  getValidBusinessToken,
  refreshAccessToken,
  tokenBundleFromResponse,
} from "./lib/yandex-oauth.mjs";
import { pingBusinessApi } from "./lib/yandex-business.mjs";

applyYagaCredentials();

const args = process.argv.slice(2);
const command = args[0] || "bootstrap";
const flags = new Set(args.filter((arg) => arg.startsWith("--") && !arg.includes("=")));

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
  const opener =
    process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
  return spawnSync(opener, [url], { stdio: "ignore" }).status === 0;
}

function persistBundle(bundle, config) {
  if (flags.has("--no-save")) return null;
  const vars = businessCredentialVarsFromBundle(bundle, {
    clientId: config.clientId,
    clientSecret: config.clientSecret,
  });
  const file = upsertYagaCredentials(vars);
  log(`Сохранено → ${file}`);
  return file;
}

function help() {
  log(`yaga business oauth

  status
  authorize-url [--open]
  exchange --code <CODE>
  set-token --token y0_...
  refresh
  bootstrap          интерактивно: URL → code → token

Файл: ${credentialsPath()}
Docs: https://yandex.ru/dev/business-api/doc/ref/index.html
Партнёрам: https://yandex.ru/promo/sprav-partner
`);
}

async function cmdStatus() {
  const config = getBusinessOAuthConfig();
  log("Yandex Business OAuth\n");
  log(`Client ID: ${config.clientId || "(нет)"}`);
  log(`Secret:    ${config.clientSecret ? "задан" : "не задан"}`);
  log(`Access:    ${config.accessToken ? "задан" : "нет"}`);
  log(`Refresh:   ${config.refreshToken ? "задан" : "нет"}`);
  log(`Expires:   ${config.expiresAt ? new Date(config.expiresAt).toISOString() : "?"}`);

  if (!config.accessToken) {
    log("\nДальше: yaga business oauth bootstrap");
    process.exit(2);
  }

  try {
    const info = await getTokenInfo(config.accessToken);
    log(`\nToken OK: login=${info.login || info.display_name}`);
  } catch (error) {
    fail(error.message);
  }

  const ping = await pingBusinessApi(config.accessToken);
  if (ping.ok) {
    log(`Business API ping: OK ${JSON.stringify(ping.payload)}`);
  } else {
    log(`Business API ping: HTTP ${ping.status}`);
    log(`  ${JSON.stringify(ping.payload).slice(0, 300)}`);
    log("  Токен валиден, но geoadv может требовать партнёрский доступ.");
  }
}

async function cmdAuthorizeUrl() {
  const config = getBusinessOAuthConfig();
  if (!config.clientId) fail("YANDEX_BUSINESS_CLIENT_ID / WEBMASTER_CLIENT_ID не задан");
  const url = getAuthorizeUrl(config, { responseType: "code" });
  log(url);
  if (flags.has("--open")) openUrl(url);
}

async function cmdExchange() {
  const code = readFlag("--code") || args.find((a) => !a.startsWith("--") && a !== "exchange");
  if (!code) fail("usage: yaga business oauth exchange --code <CODE>");
  const config = getBusinessOAuthConfig();
  if (!config.clientId || !config.clientSecret) {
    fail("Нужны CLIENT_ID + CLIENT_SECRET (business или webmaster)");
  }
  const bundle = await exchangeCode(config, code);
  persistBundle(bundle, config);
  log(`access: ${bundle.accessToken.slice(0, 12)}…`);
}

async function cmdSetToken() {
  const token = readFlag("--token");
  if (!token) fail("usage: yaga business oauth set-token --token y0_...");
  await getTokenInfo(token);
  const file = upsertYagaCredentials({ YANDEX_BUSINESS_OAUTH_TOKEN: token });
  log(`OK → ${file}`);
}

async function cmdRefresh() {
  const config = getBusinessOAuthConfig();
  const bundle = await refreshAccessToken(config);
  persistBundle(bundle, config);
  log("Refreshed");
}

async function cmdBootstrap() {
  const config = getBusinessOAuthConfig();
  log("Bootstrap Yandex Business OAuth\n");
  if (!config.clientId) fail("Client ID не задан");

  const url = getAuthorizeUrl(config, { responseType: "code" });
  log("1) Открой URL и подтверди доступ:");
  log(url);
  openUrl(url);

  if (!config.clientSecret) {
    log("\nClient secret не задан — вставь готовый token:");
    const rl = readline.createInterface({ input, output });
    const token = (await rl.question("token y0_…: ")).trim();
    rl.close();
    if (!token) fail("пустой token");
    await getTokenInfo(token);
    upsertYagaCredentials({ YANDEX_BUSINESS_OAUTH_TOKEN: token });
    log(`Сохранено → ${credentialsPath()}`);
    return;
  }

  const rl = readline.createInterface({ input, output });
  const code = (await rl.question("\n2) Вставь code из редиректа: ")).trim();
  rl.close();
  if (!code) fail("пустой code");
  const bundle = await exchangeCode(config, code);
  persistBundle(bundle, config);
  await getValidBusinessToken(getBusinessOAuthConfig());
  log("Готово. Проверка: yaga business status");
}

async function main() {
  try {
    switch (command) {
      case "help":
      case "--help":
        help();
        return;
      case "status":
        await cmdStatus();
        return;
      case "authorize-url":
        await cmdAuthorizeUrl();
        return;
      case "exchange":
        await cmdExchange();
        return;
      case "set-token":
        await cmdSetToken();
        return;
      case "refresh":
        await cmdRefresh();
        return;
      case "bootstrap":
      default:
        if (command !== "bootstrap" && command !== undefined) {
          // allow bare `oauth` → bootstrap
        }
        await cmdBootstrap();
    }
  } catch (error) {
    fail(error.message || String(error));
  }
}

main();

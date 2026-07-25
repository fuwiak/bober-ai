#!/usr/bin/env node

/**
 * OAuth для локального приложения Битрикс24 (Sign B2E / Sites / REST).
 *
 * Я НЕ могу зайти на ваш портал — client_id/secret и чекбоксы прав — только UI Битрикс.
 * Этот скрипт: authorize URL (+scope), exchange code, refresh, проверка REST.
 *
 *   npm run bitrix:oauth -- setup
 *   npm run bitrix:oauth -- scopes
 *   npm run bitrix:oauth -- set-app --client-id local.xxx --client-secret yyy
 *   npm run bitrix:oauth -- authorize-url
 *   npm run bitrix:oauth -- exchange --code <CODE>
 *   npm run bitrix:oauth -- status
 *   npm run bitrix:oauth -- refresh
 *   npm run bitrix:oauth -- test
 *   npm run bitrix:oauth -- test --landing
 *
 * В форме Битрикс (обязательно HTTPS, две косые в http://):
 *   Путь обработчика:     https://www.bober-ai.dev/api/bitrix/oauth/callback
 *   Путь установки:       https://www.bober-ai.dev/api/bitrix/oauth/install
 *   Права: ☑ Сайты (landing), CRM, Пользователи, Чат, КЭДО/Sign
 *
 * Токены → ~/.config/yaga/credentials.env
 */

import { applyYagaCredentials, upsertYagaCredentials } from "./lib/yaga-credentials.mjs";
import {
  BITRIX_DEFAULT_INSTALL_URI,
  BITRIX_DEFAULT_PORTAL,
  BITRIX_DEFAULT_REDIRECT_URI,
  BITRIX_OAUTH_SCOPES,
  bitrixCredentialVarsFromBundle,
  bitrixRest,
  exchangeCode,
  getAuthorizeUrl,
  getBitrixOAuthConfig,
  isTokenExpired,
  refreshAccessToken,
} from "./lib/bitrix-oauth.mjs";

applyYagaCredentials();

const args = process.argv.slice(2);
const command = args[0] || "status";
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

function persist(bundle, config) {
  const vars = bitrixCredentialVarsFromBundle(bundle, {
    portal: config.portal,
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    redirectUri: config.redirectUri,
  });
  // Keep existing client id/secret if bundle exchange omitted them
  if (!vars.BITRIX24_CLIENT_ID) vars.BITRIX24_CLIENT_ID = config.clientId;
  if (!vars.BITRIX24_CLIENT_SECRET) vars.BITRIX24_CLIENT_SECRET = config.clientSecret;
  if (!vars.BITRIX24_PORTAL) vars.BITRIX24_PORTAL = config.portal;
  if (!vars.BITRIX24_REDIRECT_URI) vars.BITRIX24_REDIRECT_URI = config.redirectUri;

  const file = upsertYagaCredentials(vars);
  log(`Сохранено в ${file}`);
  return vars;
}

function cmdSetup() {
  const portal = getBitrixOAuthConfig().portal || BITRIX_DEFAULT_PORTAL;
  const redirect = BITRIX_DEFAULT_REDIRECT_URI;
  const install = BITRIX_DEFAULT_INSTALL_URI;

  log("Bitrix24 OAuth (Sign + Sites) — заполните форму ТАК (не localhost)\n");
  log(`Портал: ${portal}\n`);
  log("Тип: Серверное");
  log("☑ Использует только API\n");
  log("Путь вашего обработчика*");
  log(`  ${redirect}`);
  log("  (обязательно https:// с двумя слэшами — НЕ http:/127.0.0.1)\n");
  log("Путь для первоначальной установки");
  log(`  ${install}`);
  log("  (НЕ https://example.com/install.php)\n");
  log(`Права (scopes): ${BITRIX_OAUTH_SCOPES.join(", ")}`);
  log("  В UI обязательно включите «Сайты» (landing) — иначе Sites API → insufficient_scope.\n");
  log("Как включить landing у уже созданного локального приложения:");
  log("  1) Разработчикам → Другое → Локальные приложения → ваше приложение → Изменить");
  log("  2) В списке прав отметьте «Сайты» (landing) + нужные CRM/user/im/sign.b2e → Сохранить");
  log("  3) Заново: npm run bitrix:oauth -- authorize-url → Разрешить → exchange --code …\n");
  log("Сохраните → скопируйте client_id и client_secret\n");
  log("Дальше в терминале:\n");
  log("  npm run bitrix:oauth -- set-app --client-id local.XXXX --client-secret YYYY");
  log("  npm run bitrix:oauth -- scopes");
  log("  npm run bitrix:oauth -- authorize-url");
  log("  # откройте URL → Разрешить → на странице появится команда с code");
  log("  npm run bitrix:oauth -- exchange --code <CODE_С_СТРАНИЦЫ>");
  log("  npm run bitrix:oauth -- test --landing");
  log("  npm run bitrix:site:teaser");
  log("\nДокументация Sign: https://apidocs.bitrix24.ru/api-reference/sign/index.html");
  log("Scopes: https://apidocs.bitrix24.com/api-reference/scopes/permissions.html");
}

function cmdScopes() {
  applyYagaCredentials();
  const config = getBitrixOAuthConfig();
  log("Требуемые OAuth scopes локального приложения Bitrix24:\n");
  for (const scope of BITRIX_OAUTH_SCOPES) {
    const hint =
      scope === "landing"
        ? " ← Сайты / landing.site.* (npm run bitrix:site:teaser)"
        : scope === "sign.b2e"
          ? " ← КЭДО / Sign B2E"
          : "";
    log(`  • ${scope}${hint}`);
  }
  log("\nUI: Разработчикам → Локальные приложения → Изменить → ☑ Сайты → Сохранить");
  log("Затем re-authorize (refresh токена НЕ добавляет новые scopes).\n");
  if (!config.clientId) {
    log("Client ID не задан → сначала set-app, или смотрите setup.");
    return;
  }
  const url = getAuthorizeUrl(config);
  log("Authorize URL (с &scope=):\n");
  log(url);
}

async function cmdSetApp() {
  const clientId = readFlag("--client-id");
  const clientSecret = readFlag("--client-secret");
  const portal = readFlag("--portal") || getBitrixOAuthConfig().portal || BITRIX_DEFAULT_PORTAL;
  const redirectUri =
    readFlag("--redirect-uri") || getBitrixOAuthConfig().redirectUri || BITRIX_DEFAULT_REDIRECT_URI;

  if (!clientId || !clientSecret) {
    fail("Нужны --client-id и --client-secret из формы локального приложения");
  }
  if (redirectUri.startsWith("http:/127") || redirectUri.includes("http:/1")) {
    fail(`Некорректный URI (опечатка http:/). Используйте: ${BITRIX_DEFAULT_REDIRECT_URI}`);
  }
  if (!redirectUri.startsWith("https://")) {
    fail(`Bitrix требует HTTPS redirect. Используйте: ${BITRIX_DEFAULT_REDIRECT_URI}`);
  }

  const file = upsertYagaCredentials({
    BITRIX24_PORTAL: portal.replace(/\/$/, ""),
    BITRIX24_CLIENT_ID: clientId,
    BITRIX24_CLIENT_SECRET: clientSecret,
    BITRIX24_REDIRECT_URI: redirectUri,
  });
  log(`client_id / secret сохранены в ${file}`);
  log("Дальше: npm run bitrix:oauth -- authorize-url");
}

async function cmdAuthorizeUrl() {
  applyYagaCredentials();
  const config = getBitrixOAuthConfig();
  if (!config.clientId || !config.clientSecret) {
    fail("Сначала: npm run bitrix:oauth -- set-app --client-id ... --client-secret ...");
  }
  const url = getAuthorizeUrl(config);
  log("Откройте в браузере (админ портала):\n");
  log(url);
  log(`\nScopes в URL: ${BITRIX_OAUTH_SCOPES.join(", ")}`);
  log("После «Разрешить» откроется bober-ai.dev с командой exchange.");
  log("Код живёт ~30 сек — сразу выполните exchange.");
  log("Если landing не был отмечен в UI приложения — сначала Сохраните чекбокс «Сайты».");
  try {
    const { spawn } = await import("node:child_process");
    spawn("open", [url], { stdio: "ignore", detached: true }).unref();
  } catch {
    /* ignore */
  }
}

async function cmdExchange() {
  applyYagaCredentials();
  const config = getBitrixOAuthConfig();
  const code = readFlag("--code");
  if (!code) fail("Нужен --code из callback-страницы (живёт ~30 сек)");
  if (!config.clientId || !config.clientSecret) {
    fail("Сначала: npm run bitrix:oauth -- set-app --client-id ... --client-secret ...");
  }
  log("Меняю code на токены...");
  const bundle = await exchangeCode(code, config);
  persist(bundle, config);
  log("Готово. Проверка: npm run bitrix:oauth -- test");
}

async function cmdStatus() {
  const config = getBitrixOAuthConfig();
  log("Bitrix24 OAuth\n");
  log(`Portal:    ${config.portal}`);
  log(`Client ID: ${config.clientId || "(не задан)"}`);
  log(`Secret:    ${config.clientSecret ? "задан" : "не задан"}`);
  log(`Redirect:  ${config.redirectUri}`);
  log(`Access:    ${config.accessToken ? "задан" : "не задан"}`);
  log(`Refresh:   ${config.refreshToken ? "задан" : "не задан"}`);
  log(`Member:    ${config.memberId || "—"}`);
  log(
    `Expires:   ${
      config.expiresAt ? new Date(config.expiresAt).toISOString() : "неизвестно"
    }${config.accessToken && isTokenExpired(config) ? " (истёк)" : ""}`,
  );

  if (!config.clientId || !config.clientSecret) {
    log("\nНет приложения → npm run bitrix:oauth -- setup");
    process.exit(2);
  }
  if (!config.accessToken && !config.refreshToken) {
    log("\nНет токена → npm run bitrix:oauth -- authorize-url");
    process.exit(2);
  }
}

async function cmdRefresh() {
  const config = getBitrixOAuthConfig();
  if (!config.clientId || !config.clientSecret) fail("Нет client_id/secret");
  const bundle = await refreshAccessToken(config);
  persist(bundle, config);
  log("Токен обновлён");
}

async function cmdTest() {
  applyYagaCredentials();
  let config = getBitrixOAuthConfig();
  if (isTokenExpired(config) && config.refreshToken) {
    const bundle = await refreshAccessToken(config);
    persist(bundle, config);
    applyYagaCredentials();
    config = getBitrixOAuthConfig();
  }

  log("profile → profile");
  const { response, body } = await bitrixRest("profile", {}, config);
  log(`HTTP ${response.status}`);
  log(JSON.stringify(body, null, 2).slice(0, 1200));

  if (body.error) {
    fail(body.error_description || body.error);
  }

  if (flags.has("--sign")) {
    log("\nsign.b2e.personal.tail (проверка scope sign.b2e)...");
    const sign = await bitrixRest("sign.b2e.personal.tail", { limit: 1 }, getBitrixOAuthConfig());
    log(`HTTP ${sign.response.status}`);
    log(JSON.stringify(sign.body, null, 2).slice(0, 1200));
    if (sign.body.error) {
      fail(
        `${sign.body.error_description || sign.body.error}\n` +
          "Проверьте, что в локальном приложении включён scope sign.b2e и КЭДО доступен на тарифе.",
      );
    }
  }

  if (flags.has("--landing")) {
    log("\nlanding.site.getlist (проверка scope landing)...");
    const sites = await bitrixRest(
      "landing.site.getlist",
      {
        params: {
          select: ["ID", "TITLE", "TYPE"],
          filter: { "=DELETED": "N" },
          order: { ID: "DESC" },
        },
      },
      getBitrixOAuthConfig(),
    );
    log(`HTTP ${sites.response.status}`);
    log(JSON.stringify(sites.body, null, 2).slice(0, 1200));
    if (sites.body.error) {
      fail(
        `${sites.body.error_description || sites.body.error}\n` +
          "Включите «Сайты» (landing) в локальном приложении → Сохранить → re-authorize " +
          "(npm run bitrix:oauth -- authorize-url). Refresh токена не добавляет scopes.",
      );
    }
  }
}

const commands = {
  setup: cmdSetup,
  scopes: cmdScopes,
  "set-app": cmdSetApp,
  "authorize-url": cmdAuthorizeUrl,
  authorize: cmdAuthorizeUrl,
  exchange: cmdExchange,
  status: cmdStatus,
  refresh: cmdRefresh,
  test: cmdTest,
};

const run = commands[command];
if (!run) {
  fail(
    `Неизвестная команда: ${command}. Доступны: ${Object.keys(commands).join(", ")}`,
  );
}

Promise.resolve()
  .then(() => run())
  .catch((err) => fail(err.message || String(err)));

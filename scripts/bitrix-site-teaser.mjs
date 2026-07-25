#!/usr/bin/env node

/**
 * Создаёт одностраничный тизер «Bober AI Systems» в Bitrix24 Sites (landing REST)
 * или печатает HTML + чеклист UI, если нет scope `landing`.
 *
 *   npm run bitrix:site:teaser
 *   npm run bitrix:site:teaser -- --dry-run   # только HTML / чеклист, без REST create
 *   npm run bitrix:site:teaser -- --html      # только HTML в stdout
 *
 * Нужен scope `landing` в локальном приложении + re-authorize:
 *   Права приложения: sign.b2e, crm, user, im, landing
 *   npm run bitrix:oauth -- authorize-url
 *
 * @see https://apidocs.bitrix24.com/api-reference/landing/index.html
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { applyYagaCredentials, upsertYagaCredentials } from "./lib/yaga-credentials.mjs";
import {
  bitrixCredentialVarsFromBundle,
  bitrixRest,
  getBitrixOAuthConfig,
  isTokenExpired,
  refreshAccessToken,
} from "./lib/bitrix-oauth.mjs";

applyYagaCredentials();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const HTML_PATH = path.join(ROOT, "data", "bitrix-site-teaser-block.html");

const SITE_TITLE = "Bober AI Systems";
const PAGE_TITLE = "Внедрение Битрикс24 с AI";
const SITE_CODE = "bober-ai-systems";
const MAIN_URL = "https://www.bober-ai.dev/";
const BITRIX_URL = "https://bitrix.bober-ai.dev/";
const PARTNER_LINE = "Участие в партнерской программе 1С-Битрикс · ID 28909898";

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));

function fail(message) {
  console.error(`\nОшибка: ${message}`);
  process.exit(1);
}

function log(message) {
  console.log(message);
}

function teaserHtml() {
  if (fs.existsSync(HTML_PATH)) {
    return fs.readFileSync(HTML_PATH, "utf8").replace(/^<!--[\s\S]*?-->\s*/, "");
  }
  return `
<section style="font-family:Georgia,'Times New Roman',serif;max-width:720px;margin:0 auto;padding:48px 24px;color:#1a1a1a;line-height:1.5;text-align:center;">
  <p style="margin:0 0 12px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#666;">Bober AI Systems</p>
  <h1 style="margin:0 0 16px;font-size:clamp(28px,5vw,42px);font-weight:700;line-height:1.15;">${PAGE_TITLE}</h1>
  <p style="margin:0 0 28px;font-size:18px;color:#333;">CRM, автоматизация и AI-слой под ваши процессы — пилот и внедрение под ключ.</p>
  <p style="margin:0 0 36px;">
    <a href="${MAIN_URL}" style="display:inline-block;margin:6px 8px;padding:14px 22px;background:#1a1a1a;color:#fff;text-decoration:none;font-size:16px;border-radius:4px;">Сайт Bober AI</a>
    <a href="${BITRIX_URL}" style="display:inline-block;margin:6px 8px;padding:14px 22px;background:transparent;color:#1a1a1a;text-decoration:none;font-size:16px;border:2px solid #1a1a1a;border-radius:4px;">Битрикс24 + AI</a>
  </p>
  <p style="margin:0;font-size:13px;color:#666;">${PARTNER_LINE}</p>
</section>
`.trim();
}

function printUiChecklist() {
  log(`
=== Чеклист: сайт в Bitrix24 Sites (UI) ===

1. Откройте: ${getBitrixOAuthConfig().portal}/sites/
2. «Создать сайт» → пустой / одностраничный → название «${SITE_TITLE}».
3. На главной странице добавьте блок «HTML-код» / «Свой код».
4. Вставьте HTML из data/bitrix-site-teaser-block.html
   (или: npm run bitrix:site:teaser -- --html).
5. Опубликуйте сайт и скопируйте публичный URL.
6. (Опционально) CRM-форма: Сайты / CRM → Формы → публичная ссылка
   с редиректом после отправки на ${BITRIX_URL}

CTA:
  ${MAIN_URL}
  ${BITRIX_URL}
Партнёр: ${PARTNER_LINE}
`);
}

function printScopeHelp(currentScopes) {
  log(`
=== Нужен scope landing ===

Сейчас у токена: ${(currentScopes || []).join(", ") || "(пусто)"}
landing.* вернул insufficient_scope.

В портале:
  Разработчикам → Другое → Локальные приложения → ваше приложение
  → Права доступа → добавьте «Сайты» / landing
  → Сохранить

Затем re-authorize:
  npm run bitrix:oauth -- authorize-url
  npm run bitrix:oauth -- exchange --code <CODE>
  npm run bitrix:site:teaser
`);
}

async function ensureToken() {
  let config = getBitrixOAuthConfig();
  if (!config.accessToken && !config.refreshToken) {
    fail("Нет BITRIX24 токена — npm run bitrix:oauth -- authorize-url");
  }
  if (isTokenExpired(config) && config.refreshToken) {
    const bundle = await refreshAccessToken(config);
    upsertYagaCredentials(
      bitrixCredentialVarsFromBundle(bundle, {
        portal: config.portal,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        redirectUri: config.redirectUri,
      }),
    );
    applyYagaCredentials();
    config = getBitrixOAuthConfig();
    log("Токен обновлён");
  }
  return config;
}

async function call(method, params, config) {
  const { body } = await bitrixRest(method, params, config);
  return body;
}

function isInsufficientScope(body) {
  return body?.error === "insufficient_scope";
}

/** Типичные коды HTML-блока в репозитории Bitrix Landing. */
const HTML_BLOCK_CANDIDATES = [
  "html",
  "0.html",
  "31.0.custom_html",
  "31.1.custom_html",
  "35.2.footer_dark",
];

async function findHtmlBlockCode(config) {
  const body = await call("landing.block.getrepository", {}, config);
  if (body.error) return { error: body, code: null };
  const list = Array.isArray(body.result)
    ? body.result
    : body.result && typeof body.result === "object"
      ? Object.values(body.result)
      : [];
  const codes = list
    .map((item) => (typeof item === "string" ? item : item?.code || item?.CODE || item?.name))
    .filter(Boolean);
  const prefer = codes.find((c) => /html|custom/i.test(String(c)));
  if (prefer) return { code: prefer, codes };
  for (const c of HTML_BLOCK_CANDIDATES) {
    if (codes.includes(c)) return { code: c, codes };
  }
  return { code: HTML_BLOCK_CANDIDATES[0], codes };
}

async function addBlockWithFallback(lid, config) {
  const { code: preferred, error: repoErr, codes } = await findHtmlBlockCode(config);
  if (repoErr && !isInsufficientScope(repoErr)) {
    log(`landing.block.getrepository: ${repoErr.error} — пробуем кандидатов`);
  } else if (codes?.length) {
    log(`Блоков в репозитории: ${codes.length}; HTML-кандидат: ${preferred}`);
  }

  const tryCodes = [preferred, ...HTML_BLOCK_CANDIDATES].filter(
    (c, i, a) => c && a.indexOf(c) === i,
  );

  for (const code of tryCodes) {
    const add = await call(
      "landing.landing.addblock",
      { lid, fields: { CODE: code, ACTIVE: "Y" } },
      config,
    );
    if (!add.error) {
      const blockId = add.result;
      log(`Блок добавлен: CODE=${code} id=${blockId}`);
      return { blockId, code };
    }
    log(`addblock ${code}: ${add.error} ${add.error_description || ""}`);
  }
  return null;
}

async function createTeaserSite(config) {
  // 1) site
  const siteAdd = await call(
    "landing.site.add",
    {
      fields: {
        TITLE: SITE_TITLE,
        CODE: SITE_CODE,
        TYPE: "PAGE",
        DESCRIPTION: PAGE_TITLE,
      },
    },
    config,
  );
  if (isInsufficientScope(siteAdd)) return { insufficientScope: true, body: siteAdd };
  if (siteAdd.error) {
    // возможно сайт уже есть
    const list = await call(
      "landing.site.getList",
      {
        params: {
          select: ["ID", "TITLE", "CODE", "ACTIVE"],
          filter: { CODE: SITE_CODE },
        },
      },
      config,
    );
    if (list.error) fail(`landing.site.add: ${siteAdd.error_description || siteAdd.error}`);
    const existing = (list.result || [])[0];
    if (!existing) fail(`landing.site.add: ${siteAdd.error_description || siteAdd.error}`);
    log(`Сайт уже есть: id=${existing.ID}`);
    return await finishExistingSite(Number(existing.ID), config);
  }

  const siteId = Number(siteAdd.result);
  log(`Сайт создан: id=${siteId}`);

  // 2) page
  const pageAdd = await call(
    "landing.landing.add",
    {
      fields: {
        TITLE: PAGE_TITLE,
        CODE: "index",
        SITE_ID: siteId,
        ACTIVE: "Y",
      },
    },
    config,
  );
  if (pageAdd.error) fail(`landing.landing.add: ${pageAdd.error_description || pageAdd.error}`);
  const lid = Number(pageAdd.result);
  log(`Страница создана: lid=${lid}`);

  // 3) block + content
  const block = await addBlockWithFallback(lid, config);
  if (block) {
    const html = teaserHtml();
    const upd = await call(
      "landing.block.updatecontent",
      { block: block.blockId, content: html, lid },
      config,
    );
    if (upd.error) {
      log(`updatecontent: ${upd.error} ${upd.error_description || ""} — контент мог не примениться`);
      log("Вставьте HTML вручную в редакторе блока.");
    } else {
      log("HTML записан в блок");
    }
  } else {
    log("Не удалось добавить HTML-блок через API — вставьте data/bitrix-site-teaser-block.html вручную.");
  }

  // 4) publish
  const pubPage = await call("landing.landing.publication", { lid }, config);
  if (pubPage.error) log(`publication page: ${pubPage.error_description || pubPage.error}`);
  const pubSite = await call("landing.site.publication", { id: siteId }, config);
  if (pubSite.error) log(`publication site: ${pubSite.error_description || pubSite.error}`);

  const urlBody = await call("landing.site.getPublicUrl", { id: siteId }, config);
  const publicUrl =
    typeof urlBody.result === "string"
      ? urlBody.result
      : urlBody.result?.[siteId] || urlBody.result?.["0"] || JSON.stringify(urlBody.result || {});

  return { siteId, lid, publicUrl, body: urlBody };
}

async function finishExistingSite(siteId, config) {
  const pages = await call(
    "landing.landing.getList",
    {
      params: {
        select: ["ID", "TITLE", "CODE", "ACTIVE"],
        filter: { SITE_ID: siteId },
      },
    },
    config,
  );
  if (pages.error) fail(pages.error_description || pages.error);
  const page = (pages.result || [])[0];
  const lid = page ? Number(page.ID) : null;
  await call("landing.site.publication", { id: siteId }, config);
  if (lid) await call("landing.landing.publication", { lid }, config);
  const urlBody = await call("landing.site.getPublicUrl", { id: siteId }, config);
  const publicUrl =
    typeof urlBody.result === "string"
      ? urlBody.result
      : urlBody.result?.[siteId] || JSON.stringify(urlBody.result || {});
  return { siteId, lid, publicUrl, existing: true };
}

async function main() {
  if (flags.has("--html")) {
    process.stdout.write(teaserHtml() + "\n");
    return;
  }

  if (flags.has("--dry-run")) {
    log("dry-run: REST create пропущен\n");
    printUiChecklist();
    log("--- HTML ---\n");
    log(teaserHtml());
    return;
  }

  const config = await ensureToken();

  const scopeBody = await call("scope", {}, config);
  const scopes = Array.isArray(scopeBody.result) ? scopeBody.result : [];
  log(`Scopes: ${scopes.join(", ") || "(none)"}`);

  if (!scopes.includes("landing")) {
    printScopeHelp(scopes);
    printUiChecklist();
    log("--- HTML (вставить в блок Sites) ---\n");
    log(teaserHtml());
    log(`\nФайл: ${HTML_PATH}`);
    process.exit(2);
  }

  const probe = await call(
    "landing.site.getList",
    { params: { select: ["ID", "TITLE"], filter: {}, start: 0 } },
    config,
  );
  if (isInsufficientScope(probe)) {
    printScopeHelp(scopes);
    printUiChecklist();
    log(teaserHtml());
    process.exit(2);
  }
  if (probe.error) fail(`landing.site.getList: ${probe.error_description || probe.error}`);

  log(`Существующих сайтов (первая страница): ${(probe.result || []).length}`);

  const result = await createTeaserSite(config);
  if (result.insufficientScope) {
    printScopeHelp(scopes);
    printUiChecklist();
    process.exit(2);
  }

  log("\n=== Готово ===");
  log(`SITE_ID: ${result.siteId}`);
  if (result.lid) log(`LID: ${result.lid}`);
  log(`Public URL: ${result.publicUrl}`);
  log(`Редактор: ${config.portal}/sites/`);
}

main().catch((err) => fail(err.message || String(err)));

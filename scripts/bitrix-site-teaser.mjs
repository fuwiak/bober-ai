#!/usr/bin/env node

/**
 * Создаёт или обновляет одностраничный тизер «Bober AI · Битрикс24» в Bitrix24 Sites
 * (landing REST), либо печатает HTML + чеклист UI, если нет scope `landing`.
 *
 *   npm run bitrix:site:teaser
 *   npm run bitrix:site:teaser -- --dry-run   # только HTML / чеклист, без REST
 *   npm run bitrix:site:teaser -- --html      # только HTML в stdout
 *   npm run bitrix:site:teaser -- --site-id 6 # явный SITE_ID (иначе ищем / создаём)
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

/** Имя сайта в портале / TITLE. */
const SITE_TITLE = "Bober AI · Битрикс24";
/** Заголовок страницы. */
const PAGE_TITLE = "Bober AI · Битрикс24";
/** CODE сайта (без слэшей); публичный subdomain Bitrix не меняется. */
const SITE_CODE = "bober-bitrix";
/** Известный SITE_ID тизера на b24-tuh0lz (если CODE ещё старый). */
const KNOWN_SITE_ID = 6;
const MAIN_URL = "https://www.bober-ai.dev/";
const BITRIX_URL = "https://bitrix.bober-ai.dev/";
const PARTNER_LINE = "Участие в партнерской программе 1С-Битрикс · ID 28909898";

/** Кастомный CSS сайта (Bitrix режет <style>/<link> в HTML-блоке и HEADBLOCK). */
const SITE_CSS = `
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap");
html, body {
  margin: 0 !important;
  padding: 0 !important;
  background: #12141a !important;
  color: #ffffff !important;
}
body {
  font-family: Manrope, "DIN Alternate", system-ui, -apple-system, sans-serif !important;
}
.landing-public-mode,
.landing-main,
.landing-layout-flex,
#workarea,
.workarea {
  background: #12141a !important;
}
.block-wrapper.block-html {
  margin: 0 !important;
  padding: 0 !important;
  max-width: none !important;
}
.block-wrapper.block-html > section {
  max-width: none !important;
}
`.trim();

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));

function readFlagValue(name) {
  const idx = args.indexOf(name);
  if (idx === -1) return null;
  const next = args[idx + 1];
  if (!next || next.startsWith("--")) return null;
  return next;
}

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
<section style="box-sizing:border-box;margin:0;width:100%;min-height:100vh;padding:64px 24px;background:#12141a;color:#fff;font-family:Manrope,system-ui,sans-serif;line-height:1.55;">
  <div style="max-width:640px;margin:0 auto;">
    <p style="margin:0 0 36px;font-size:clamp(28px,5.5vw,42px);font-weight:700;letter-spacing:-0.03em;line-height:1.1;">Bober AI <span style="color:#e0f46a;">Systems</span></p>
    <hr style="display:block;width:48px;height:2px;margin:0 0 28px;border:0;background:#e0f46a;" />
    <h1 style="margin:0 0 16px;font-size:clamp(22px,3.8vw,32px);font-weight:600;letter-spacing:-0.02em;line-height:1.2;">Битрикс24 с AI-слоем под ваши процессы</h1>
    <p style="margin:0 0 40px;font-size:18px;color:#c5c9d4;">CRM, автоматизация и интеллектуальный слой — пилот и внедрение под ключ.</p>
    <p style="margin:0 0 48px;">
      <a href="${MAIN_URL}" style="display:inline-block;margin:0 12px 12px 0;padding:14px 22px;background:#e0f46a;color:#1a1c22;text-decoration:none;font-weight:600;border-radius:4px;">Сайт Bober AI</a>
      <a href="${BITRIX_URL}" style="display:inline-block;margin:0 0 12px;padding:14px 22px;background:transparent;color:#fff;text-decoration:none;font-weight:600;border:1px solid #2f3545;border-radius:4px;">Битрикс24 + AI</a>
    </p>
    <p style="margin:0;padding-top:20px;border-top:1px solid #2f3545;font-size:12px;color:#8b91a1;">${PARTNER_LINE}</p>
  </div>
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

function normalizeSiteCode(code) {
  return String(code || "")
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase();
}

function publicUrlFrom(body, siteId) {
  if (typeof body?.result === "string") return body.result;
  if (body?.result && typeof body.result === "object") {
    return (
      body.result[siteId] ||
      body.result[String(siteId)] ||
      body.result["0"] ||
      Object.values(body.result)[0] ||
      ""
    );
  }
  return "";
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

async function listSites(config) {
  const body = await call(
    "landing.site.getList",
    {
      params: {
        select: ["ID", "TITLE", "CODE", "ACTIVE", "TYPE", "PUBLIC_URL", "DOMAIN_ID"],
        filter: {},
      },
    },
    config,
  );
  if (body.error) return body;
  return { result: Array.isArray(body.result) ? body.result : [] };
}

async function findExistingTeaserSite(config, explicitSiteId) {
  if (explicitSiteId) {
    const list = await listSites(config);
    if (list.error) fail(`landing.site.getList: ${list.error_description || list.error}`);
    const found = (list.result || []).find((s) => Number(s.ID) === explicitSiteId);
    if (!found) fail(`SITE_ID=${explicitSiteId} не найден`);
    return found;
  }

  const list = await listSites(config);
  if (list.error) {
    if (isInsufficientScope(list)) return { insufficientScope: true, body: list };
    fail(`landing.site.getList: ${list.error_description || list.error}`);
  }

  const sites = (list.result || []).filter((s) => String(s.TYPE || "").toUpperCase() === "PAGE");
  const byCode = sites.find((s) => {
    const code = normalizeSiteCode(s.CODE);
    return code === SITE_CODE || code === "bober-ai-systems";
  });
  if (byCode) return byCode;

  const byTitle = sites.find((s) => {
    const t = String(s.TITLE || "");
    return /bober/i.test(t) && /bitrix|битрикс/i.test(t);
  });
  if (byTitle) return byTitle;

  const byKnownId = sites.find((s) => Number(s.ID) === KNOWN_SITE_ID);
  if (byKnownId) return byKnownId;

  const byBober = sites.find((s) => /bober/i.test(String(s.TITLE || "")));
  return byBober || null;
}

async function getFirstPage(siteId, config) {
  const pages = await call(
    "landing.landing.getList",
    {
      params: {
        select: ["ID", "TITLE", "CODE", "ACTIVE", "SITE_ID"],
        filter: { SITE_ID: siteId },
      },
    },
    config,
  );
  if (pages.error) fail(`landing.landing.getList: ${pages.error_description || pages.error}`);
  const list = pages.result || [];
  const index = list.find((p) => normalizeSiteCode(p.CODE) === "index") || list[0];
  return index || null;
}

async function listDraftBlocks(lid, config) {
  // Без edit_mode API отдаёт published-id; updatecontent требует draft-id.
  return call(
    "landing.block.getlist",
    { lid, params: { edit_mode: 1, get_content: true } },
    config,
  );
}

async function updateHtmlBlock(lid, config) {
  const html = teaserHtml();
  const blocks = await listDraftBlocks(lid, config);
  if (blocks.error) {
    log(`block.getlist(edit_mode): ${blocks.error} ${blocks.error_description || ""}`);
  }

  const list = Array.isArray(blocks.result) ? blocks.result : [];
  const htmlBlock =
    list.find((b) => /html|custom/i.test(String(b.code || b.CODE || b.name || ""))) || list[0];

  if (htmlBlock) {
    const blockId = Number(htmlBlock.id || htmlBlock.ID || htmlBlock.block);
    const upd = await call(
      "landing.block.updatecontent",
      { block: blockId, content: html, lid, preventHistory: true },
      config,
    );
    if (upd.error) {
      log(`updatecontent #${blockId}: ${upd.error} ${upd.error_description || ""}`);
      // HTML-блок Bitrix — component; запасной путь через HTML_CODE.
      const nodes = await call(
        "landing.block.updatenodes",
        {
          lid,
          block: blockId,
          data: { "bitrix:landing.blocks.html": { HTML_CODE: html } },
          preventHistory: true,
        },
        config,
      );
      if (nodes.error) {
        log(`updatenodes #${blockId}: ${nodes.error} ${nodes.error_description || ""}`);
        return null;
      }
      log(`HTML обновлён через updatenodes id=${blockId}`);
      return blockId;
    }
    log(`HTML обновлён в черновике блока id=${blockId} (CODE=${htmlBlock.code || htmlBlock.CODE || "?"})`);
    return blockId;
  }

  const block = await addBlockWithFallback(lid, config);
  if (!block) {
    log("Не удалось добавить HTML-блок — вставьте data/bitrix-site-teaser-block.html вручную.");
    return null;
  }
  // После addblock снова берём draft-id.
  const afterAdd = await listDraftBlocks(lid, config);
  const draftList = Array.isArray(afterAdd.result) ? afterAdd.result : [];
  const draft =
    draftList.find((b) => Number(b.id) === Number(block.blockId)) ||
    draftList.find((b) => /html|custom/i.test(String(b.code || ""))) ||
    draftList[draftList.length - 1];
  const draftId = Number(draft?.id || block.blockId);
  const upd = await call(
    "landing.block.updatecontent",
    { block: draftId, content: html, lid, preventHistory: true },
    config,
  );
  if (upd.error) {
    log(`updatecontent: ${upd.error} ${upd.error_description || ""}`);
    return null;
  }
  log(`HTML записан в новый блок draft id=${draftId}`);
  return draftId;
}

async function publishSite(siteId, lid, config) {
  if (lid) {
    const pubPage = await call("landing.landing.publication", { lid }, config);
    if (pubPage.error) log(`publication page: ${pubPage.error_description || pubPage.error}`);
    else log(`Страница опубликована: lid=${lid}`);
  }
  const pubSite = await call("landing.site.publication", { id: siteId }, config);
  if (pubSite.error) log(`publication site: ${pubSite.error_description || pubSite.error}`);
  else log(`Сайт опубликован: id=${siteId}`);

  const urlBody = await call("landing.site.getPublicUrl", { id: siteId }, config);
  return publicUrlFrom(urlBody, siteId) || urlBody.result;
}

async function updateSiteMeta(siteId, config) {
  const fields = {
    TITLE: SITE_TITLE,
    CODE: SITE_CODE,
    DESCRIPTION: PAGE_TITLE,
    ADDITIONAL_FIELDS: {
      HEADBLOCK_USE: "N",
      HEADBLOCK_CODE: "",
      CSSBLOCK_USE: "Y",
      CSSBLOCK_CODE: SITE_CSS,
      THEME_USE: "Y",
      THEME_COLOR: "#e0f46a",
      BACKGROUND_USE: "Y",
      BACKGROUND_COLOR: "#12141a",
    },
  };

  const siteUpd = await call("landing.site.update", { id: siteId, fields }, config);
  if (siteUpd.error) {
    log(`site.update: ${siteUpd.error} ${siteUpd.error_description || ""} — пробуем без CODE`);
    const { CODE: _code, ...withoutCode } = fields;
    const retry = await call(
      "landing.site.update",
      { id: siteId, fields: withoutCode },
      config,
    );
    if (retry.error) {
      log(`site.update retry: ${retry.error} ${retry.error_description || ""}`);
      // Минимальный апдейт TITLE + CSS
      const minimal = await call(
        "landing.site.update",
        {
          id: siteId,
          fields: {
            TITLE: SITE_TITLE,
            ADDITIONAL_FIELDS: fields.ADDITIONAL_FIELDS,
          },
        },
        config,
      );
      if (minimal.error) {
        log(`site.update minimal: ${minimal.error} ${minimal.error_description || ""}`);
      } else {
        log(`TITLE + CSS обновлены: ${SITE_TITLE}`);
      }
    } else {
      log(`TITLE + CSS обновлены: ${SITE_TITLE}`);
    }
  } else {
    log(`Сайт: TITLE="${SITE_TITLE}", CODE=${SITE_CODE}, CSS подключён`);
  }

  // Дублируем CSS на страницу (page fields перекрывают site).
  const page = await getFirstPage(siteId, config);
  if (page) {
    const lid = Number(page.ID);
    const pageFields = await call(
      "landing.landing.update",
      {
        lid,
        fields: {
          TITLE: PAGE_TITLE,
          ADDITIONAL_FIELDS: {
            HEADBLOCK_USE: "N",
            HEADBLOCK_CODE: "",
            CSSBLOCK_USE: "Y",
            CSSBLOCK_CODE: SITE_CSS,
            BACKGROUND_USE: "Y",
            BACKGROUND_COLOR: "#12141a",
          },
        },
      },
      config,
    );
    if (pageFields.error) {
      log(`landing.update CSS: ${pageFields.error} ${pageFields.error_description || ""}`);
    }
  }
}

async function updateTeaserSite(site, config) {
  const siteId = Number(site.ID);
  log(`Обновляем существующий сайт: id=${siteId} TITLE="${site.TITLE}" CODE=${site.CODE}`);

  await updateSiteMeta(siteId, config);

  let page = await getFirstPage(siteId, config);
  let lid = page ? Number(page.ID) : null;

  if (!lid) {
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
    lid = Number(pageAdd.result);
    log(`Страница создана: lid=${lid}`);
  } else {
    const pageUpd = await call(
      "landing.landing.update",
      {
        lid,
        fields: { TITLE: PAGE_TITLE, CODE: "index" },
      },
      config,
    );
    if (pageUpd.error) {
      log(`landing.update: ${pageUpd.error} ${pageUpd.error_description || ""}`);
    } else {
      log(`Страница: lid=${lid} TITLE="${PAGE_TITLE}"`);
    }
  }

  await updateHtmlBlock(lid, config);
  const publicUrl = await publishSite(siteId, lid, config);
  return { siteId, lid, publicUrl, updated: true };
}

async function createTeaserSite(config) {
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
    fail(`landing.site.add: ${siteAdd.error_description || siteAdd.error}`);
  }

  const siteId = Number(siteAdd.result);
  log(`Сайт создан: id=${siteId}`);

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

  await updateSiteMeta(siteId, config);
  await updateHtmlBlock(lid, config);
  const publicUrl = await publishSite(siteId, lid, config);
  return { siteId, lid, publicUrl, created: true };
}

async function upsertTeaserSite(config, explicitSiteId) {
  const existing = await findExistingTeaserSite(config, explicitSiteId);
  if (existing?.insufficientScope) return existing;
  if (existing) return updateTeaserSite(existing, config);
  log("Существующий тизер не найден — создаём новый");
  return createTeaserSite(config);
}

async function main() {
  if (flags.has("--html")) {
    process.stdout.write(teaserHtml() + "\n");
    return;
  }

  if (flags.has("--dry-run")) {
    log("dry-run: REST create/update пропущен\n");
    printUiChecklist();
    log("--- HTML ---\n");
    log(teaserHtml());
    return;
  }

  const config = await ensureToken();
  const siteIdArg = readFlagValue("--site-id");
  const explicitSiteId = siteIdArg ? Number(siteIdArg) : null;
  if (siteIdArg && !Number.isFinite(explicitSiteId)) fail(`Некорректный --site-id: ${siteIdArg}`);

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

  const probe = await listSites(config);
  if (isInsufficientScope(probe)) {
    printScopeHelp(scopes);
    printUiChecklist();
    log(teaserHtml());
    process.exit(2);
  }
  if (probe.error) fail(`landing.site.getList: ${probe.error_description || probe.error}`);

  log(`Существующих сайтов (первая страница): ${(probe.result || []).length}`);

  const result = await upsertTeaserSite(config, explicitSiteId);
  if (result.insufficientScope) {
    printScopeHelp(scopes);
    printUiChecklist();
    process.exit(2);
  }

  log("\n=== Готово ===");
  log(`SITE_ID: ${result.siteId}`);
  if (result.lid) log(`LID: ${result.lid}`);
  log(`TITLE: ${SITE_TITLE}`);
  log(`Public URL: ${result.publicUrl}`);
  log(`Редактор: ${config.portal}/sites/`);
  if (result.updated) log("(обновлён существующий сайт, дубликат не создавался)");
  if (result.created) log("(создан новый сайт)");
}

main().catch((err) => fail(err.message || String(err)));

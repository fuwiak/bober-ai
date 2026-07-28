#!/usr/bin/env node

/**
 * Настраивает CRM Store (TYPE=STORE) под бренд Bober AI / www.bober-systems.ru.
 * По умолчанию SITE_ID=8 на портале b24-tuh0lz («Продажи в чатах» → Bober shop).
 *
 *   npm run bitrix:shop:configure
 *   npm run bitrix:shop:configure -- --site-id 8
 *   npm run bitrix:shop:configure -- --dry-run
 *   npm run bitrix:shop:configure -- --hide-kwork   # ACTIVE=N у kwork-* товаров
 *   npm run bitrix:shop:configure -- --html         # HTML витрины в stdout
 *
 * Scopes: landing (+ crm для hide-kwork). sale не обязателен — оплата через
 * нативные блоки магазина. Если insufficient_scope → npm run bitrix:oauth -- scopes
 *
 * Ограничения Bitrix Shop vs Next.js:
 *   - нет pixel-perfect клона (шаблоны STORE, Roboto→Manrope через CSS)
 *   - кастомный HTML только код «html»; большинство PAGE-блоков недоступны
 *   - каталог = CRM product catalog (IBLOCK 24); фильтр секций в compilation ограничен
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
const HTML_PATH = path.join(ROOT, "data", "bitrix-shop-home-block.html");

/** Известный STORE на b24-tuh0lz (UI: /shop/stores/site/8/). */
const DEFAULT_SITE_ID = 8;
const SITE_TITLE = "Bober AI Systems";
const SITE_CODE = "bober-shop";
const SITE_DESCRIPTION =
  "AI-автоматизация КП, CRM и документов · Bober AI · партнёр 1С-Битрикс";
const MAIN_URL = "https://www.bober-systems.ru/";
const BITRIX_URL = "https://bitrix.bober-systems.ru/";
const CONTACT_PHONE = "+79950998170";
const CONTACT_EMAIL = "contact@bober-ai.dev";
const PARTNER_LINE = "Участие в партнерской программе 1С-Битрикс · ID 28909898";
const CATALOG_ID = 24;

const SITE_CSS = `
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap");
html, body {
  margin: 0 !important;
  padding: 0 !important;
  background: #12141a !important;
  color: #ffffff !important;
}
body, .landing-public-mode, .g-font-montserrat, .g-font-roboto {
  font-family: Manrope, "DIN Alternate", system-ui, -apple-system, sans-serif !important;
}
.landing-public-mode,
.landing-main,
.landing-layout-flex,
#workarea,
.workarea {
  background: #12141a !important;
}
.g-color-primary,
.g-color-primary--hover:hover {
  color: #e0f46a !important;
}
.g-bg-primary {
  background-color: #e0f46a !important;
  color: #1a1c22 !important;
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

function shopHtml() {
  if (fs.existsSync(HTML_PATH)) {
    return fs.readFileSync(HTML_PATH, "utf8").replace(/^<!--[\s\S]*?-->\s*/, "");
  }
  return `<section style="padding:48px 24px;background:#12141a;color:#fff;font-family:Manrope,system-ui,sans-serif;"><p style="font-size:32px;font-weight:700;">Bober AI <span style="color:#e0f46a;">Systems</span></p><p style="color:#c5c9d4;">${SITE_DESCRIPTION}</p><p><a href="${MAIN_URL}" style="color:#e0f46a;">${MAIN_URL}</a></p><p style="font-size:12px;color:#8b91a1;">${PARTNER_LINE}</p></section>`;
}

function printScopeHelp(currentScopes) {
  log(`
=== Нужны scopes landing (+ crm для --hide-kwork) ===

Сейчас: ${(currentScopes || []).join(", ") || "(пусто)"}

В портале: Разработчикам → Локальные приложения → права «Сайты» / landing, CRM.
Затем:
  npm run bitrix:oauth -- authorize-url
  npm run bitrix:oauth -- exchange --code <CODE>
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

async function getStoreSite(siteId, config) {
  const list = await call(
    "landing.site.getList",
    {
      params: {
        select: ["ID", "TITLE", "CODE", "ACTIVE", "TYPE", "PUBLIC_URL", "DOMAIN_ID"],
        filter: { ID: siteId },
      },
    },
    config,
  );
  if (list.error) {
    if (isInsufficientScope(list)) return { insufficientScope: true, body: list };
    fail(`landing.site.getList: ${list.error_description || list.error}`);
  }
  const site = (list.result || []).find((s) => Number(s.ID) === siteId);
  if (!site) fail(`SITE_ID=${siteId} не найден`);
  if (String(site.TYPE || "").toUpperCase() !== "STORE") {
    log(`⚠ TYPE=${site.TYPE} (ожидали STORE) — продолжаем best-effort`);
  }
  return site;
}

async function listPages(siteId, config) {
  const pages = await call(
    "landing.landing.getList",
    {
      params: {
        select: ["ID", "TITLE", "CODE", "ACTIVE", "SITE_ID", "FOLDER_ID", "TPL_ID"],
        filter: { SITE_ID: siteId },
      },
    },
    config,
  );
  if (pages.error) fail(`landing.landing.getList: ${pages.error_description || pages.error}`);
  return pages.result || [];
}

function findPage(pages, ...predicates) {
  for (const pred of predicates) {
    const hit = pages.find(pred);
    if (hit) return hit;
  }
  return null;
}

async function listDraftBlocks(lid, config) {
  return call("landing.block.getlist", { lid, params: { edit_mode: 1, get_content: true } }, config);
}

async function updateSiteMeta(siteId, homeLid, config) {
  const fields = {
    TITLE: SITE_TITLE,
    CODE: SITE_CODE,
    DESCRIPTION: SITE_DESCRIPTION,
    ...(homeLid ? { LANDING_ID_INDEX: homeLid } : {}),
    ADDITIONAL_FIELDS: {
      HEADBLOCK_USE: "N",
      HEADBLOCK_CODE: "",
      CSSBLOCK_USE: "Y",
      CSSBLOCK_CODE: SITE_CSS,
      THEME_USE: "Y",
      THEME_COLOR: "#e0f46a",
      BACKGROUND_USE: "Y",
      BACKGROUND_COLOR: "#12141a",
      THEMEFONTS_USE: "Y",
      THEMEFONTS_CODE_H: "OpenSans",
      THEMEFONTS_CODE: "OpenSans",
      THEMEFONTS_SIZE: "1",
      SETTINGS_CURRENCY_ID: "RUB",
      SETTINGS_PRICE_CODE: ["BASE"],
      SETTINGS_SHOW_OLD_PRICE: "N",
      SETTINGS_SHOW_DISCOUNT_PERCENT: "N",
      SETTINGS_USE_PRODUCT_QUANTITY: "N",
      SETTINGS_DISPLAY_COMPARE: "N",
      SETTINGS_HIDE_NOT_AVAILABLE: "Y",
    },
  };

  const siteUpd = await call("landing.site.update", { id: siteId, fields }, config);
  if (siteUpd.error) {
    log(`site.update: ${siteUpd.error} ${siteUpd.error_description || ""} — без CODE`);
    const { CODE: _c, ...withoutCode } = fields;
    const retry = await call("landing.site.update", { id: siteId, fields: withoutCode }, config);
    if (retry.error) {
      log(`site.update retry: ${retry.error} ${retry.error_description || ""}`);
      const minimal = await call(
        "landing.site.update",
        {
          id: siteId,
          fields: {
            TITLE: SITE_TITLE,
            DESCRIPTION: SITE_DESCRIPTION,
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
    log(`Сайт: TITLE="${SITE_TITLE}", CODE=${SITE_CODE}, CSS/theme подключены`);
  }
}

async function updatePageTitle(lid, title, config) {
  const upd = await call("landing.landing.update", { lid, fields: { TITLE: title } }, config);
  if (upd.error) log(`landing.update lid=${lid}: ${upd.error} ${upd.error_description || ""}`);
  else log(`Страница lid=${lid} → "${title}"`);
}

async function updatenodesSafe(lid, block, data, config, label) {
  const body = await call(
    "landing.block.updatenodes",
    { lid, block, data, preventHistory: true },
    config,
  );
  if (body.error) {
    log(`${label}: ${body.error} ${body.error_description || ""}`);
    return false;
  }
  log(`${label}: ok`);
  return true;
}

async function updatecontentSafe(lid, block, content, config, label) {
  const body = await call(
    "landing.block.updatecontent",
    { block, content, lid, preventHistory: true },
    config,
  );
  if (body.error) {
    log(`${label}: ${body.error} ${body.error_description || ""}`);
    return false;
  }
  log(`${label}: ok`);
  return true;
}

async function ensureHomeHtmlBlock(homeLid, config) {
  const html = shopHtml();
  const blocks = await listDraftBlocks(homeLid, config);
  if (blocks.error) {
    log(`block.getlist: ${blocks.error} ${blocks.error_description || ""}`);
    return null;
  }
  const list = Array.isArray(blocks.result) ? blocks.result : [];
  let htmlBlock = list.find((b) => String(b.code || b.CODE || "").toLowerCase() === "html");

  if (!htmlBlock) {
    const add = await call(
      "landing.landing.addblock",
      { lid: homeLid, fields: { CODE: "html", ACTIVE: "Y" } },
      config,
    );
    if (add.error) {
      log(`addblock html: ${add.error} ${add.error_description || ""}`);
      return null;
    }
    log(`HTML-блок добавлен: id=${add.result}`);
    const after = await listDraftBlocks(homeLid, config);
    const afterList = Array.isArray(after.result) ? after.result : [];
    htmlBlock =
      afterList.find((b) => Number(b.id) === Number(add.result)) ||
      afterList.find((b) => String(b.code || "").toLowerCase() === "html");
  }

  if (!htmlBlock) return null;
  const blockId = Number(htmlBlock.id || htmlBlock.ID);
  const ok = await updatecontentSafe(homeLid, blockId, html, config, `HTML витрина #${blockId}`);
  if (!ok) {
    await call(
      "landing.block.updatenodes",
      {
        lid: homeLid,
        block: blockId,
        data: { "bitrix:landing.blocks.html": { HTML_CODE: html } },
        preventHistory: true,
      },
      config,
    );
  }
  return blockId;
}

async function configureHome(homeLid, pages, config) {
  await updatePageTitle(homeLid, SITE_TITLE, config);

  const blocks = await listDraftBlocks(homeLid, config);
  const list = Array.isArray(blocks.result) ? blocks.result : [];

  const hero = list.find((b) => /header_shop|35\.10/i.test(String(b.code || "")));
  if (hero) {
    const id = Number(hero.id);
    await updatenodesSafe(
      homeLid,
      id,
      {
        ".landing-block-node-title": { text: "Bober AI Systems" },
        ".landing-block-node-text": {
          text: "AI-автоматизация КП, CRM и документов · Москва",
        },
      },
      config,
      `hero #${id}`,
    );
  }

  const catalogPage = findPage(
    pages,
    (p) => String(p.CODE) === "katalog",
    (p) => /каталог/i.test(String(p.TITLE || "")),
  );
  const aboutPage = findPage(
    pages,
    (p) => String(p.CODE) === "okompanii",
    (p) => /о компан/i.test(String(p.TITLE || "")),
  );
  const contactsPage = findPage(
    pages,
    (p) => String(p.CODE) === "kontakty",
    (p) => /контакт/i.test(String(p.TITLE || "")),
  );

  const links = list.find((b) => /list_of_links|55\.1/i.test(String(b.code || "")));
  if (links) {
    const id = Number(links.id);
    const linkHtml = `
<section class="landing-block g-pt-10 g-pb-10 g-pl-15 g-pr-15 u-block-border-none" style="background:#181b24;">
  <div class="landing-block-node-list-container row no-gutters justify-content-center">
    <ul class="landing-block-node-list list-unstyled w-100 g-max-width-384 g-mb-0">
      <li class="landing-block-node-list-item g-brd-bottom g-brd-1 g-py-12 landing-card g-brd-white-opacity-0_2 g-font-size-18 g-pt-18 g-pb-18">
        <a class="landing-block-node-link row no-gutters justify-content-between align-items-center g-text-decoration-none--hover g-color-white" href="${catalogPage ? `#landing${catalogPage.ID}` : "#"}" target="_self">
          <span class="landing-block-node-link-text d-block">Каталог услуг</span>
          <span class="landing-block-node-link-icon-container d-block g-valign-middle g-mr-5 g-font-size-12 g-opacity-0_5"><i class="landing-block-node-link-icon hs-icon hs-icon-arrow-right g-flex-centered"></i></span>
        </a>
      </li>
      <li class="landing-block-node-list-item g-brd-bottom g-brd-1 g-py-12 landing-card g-brd-white-opacity-0_2 g-font-size-18 g-pt-18 g-pb-18">
        <a class="landing-block-node-link row no-gutters justify-content-between align-items-center g-text-decoration-none--hover g-color-white" href="${aboutPage ? `#landing${aboutPage.ID}` : "#"}" target="_self">
          <span class="landing-block-node-link-text d-block">О компании</span>
          <span class="landing-block-node-link-icon-container d-block g-valign-middle g-mr-5 g-font-size-12 g-opacity-0_5"><i class="landing-block-node-link-icon hs-icon hs-icon-arrow-right g-flex-centered"></i></span>
        </a>
      </li>
      <li class="landing-block-node-list-item g-brd-bottom g-brd-1 g-py-12 landing-card g-brd-white-opacity-0_2 g-font-size-18 g-pt-18 g-pb-18">
        <a class="landing-block-node-link row no-gutters justify-content-between align-items-center g-text-decoration-none--hover g-color-white" href="${contactsPage ? `#landing${contactsPage.ID}` : "#"}" target="_self">
          <span class="landing-block-node-link-text d-block">Контакты</span>
          <span class="landing-block-node-link-icon-container d-block g-valign-middle g-mr-5 g-font-size-12 g-opacity-0_5"><i class="landing-block-node-link-icon hs-icon hs-icon-arrow-right g-flex-centered"></i></span>
        </a>
      </li>
      <li class="landing-block-node-list-item g-brd-bottom g-brd-1 g-py-12 landing-card g-brd-white-opacity-0_2 g-font-size-18 g-pt-18 g-pb-18">
        <a class="landing-block-node-link row no-gutters justify-content-between align-items-center g-text-decoration-none--hover g-color-white" href="${MAIN_URL}" target="_blank">
          <span class="landing-block-node-link-text d-block">www.bober-systems.ru</span>
          <span class="landing-block-node-link-icon-container d-block g-valign-middle g-mr-5 g-font-size-12 g-opacity-0_5"><i class="landing-block-node-link-icon hs-icon hs-icon-arrow-right g-flex-centered"></i></span>
        </a>
      </li>
      <li class="landing-block-node-list-item g-brd-bottom g-brd-1 g-py-12 landing-card g-brd-white-opacity-0_2 g-font-size-18 g-pt-18 g-pb-18">
        <a class="landing-block-node-link row no-gutters justify-content-between align-items-center g-text-decoration-none--hover g-color-white" href="${BITRIX_URL}" target="_blank">
          <span class="landing-block-node-link-text d-block">Битрикс24 + AI</span>
          <span class="landing-block-node-link-icon-container d-block g-valign-middle g-mr-5 g-font-size-12 g-opacity-0_5"><i class="landing-block-node-link-icon hs-icon hs-icon-arrow-right g-flex-centered"></i></span>
        </a>
      </li>
    </ul>
  </div>
</section>`.trim();
    await updatecontentSafe(homeLid, id, linkHtml, config, `nav links #${id}`);
  }

  await ensureHomeHtmlBlock(homeLid, config);
}

async function configureHeader(pages, config) {
  const header = findPage(pages, (p) => String(p.CODE) === "shapka", (p) => /шапка/i.test(String(p.TITLE || "")));
  if (!header) return;
  const lid = Number(header.ID);
  const blocks = await listDraftBlocks(lid, config);
  const list = Array.isArray(blocks.result) ? blocks.result : [];
  const block = list.find((b) => /header_shop|35\.9/i.test(String(b.code || "")));
  if (!block) return;
  const id = Number(block.id);
  await updatenodesSafe(
    lid,
    id,
    {
      ".landing-block-node-title": { text: "Bober AI" },
      ".landing-block-node-phone": {
        text: CONTACT_PHONE,
        attrs: { href: `tel:${CONTACT_PHONE}` },
      },
    },
    config,
    `header #${id}`,
  );
}

async function configureFooter(pages, config) {
  const footer = findPage(pages, (p) => String(p.CODE) === "podval", (p) => /подвал/i.test(String(p.TITLE || "")));
  if (!footer) return;
  const lid = Number(footer.ID);
  const blocks = await listDraftBlocks(lid, config);
  const list = Array.isArray(blocks.result) ? blocks.result : [];
  const copy = list.find((b) => /copyright|17\./i.test(String(b.code || "")));
  if (copy) {
    await updatenodesSafe(
      lid,
      Number(copy.id),
      {
        ".landing-block-node-text": {
          text: `© ${new Date().getFullYear()} Bober AI Systems · ${PARTNER_LINE}`,
        },
      },
      config,
      `copyright #${copy.id}`,
    );
  }
}

async function configureAbout(pages, config) {
  const about = findPage(pages, (p) => String(p.CODE) === "okompanii", (p) => /о компан/i.test(String(p.TITLE || "")));
  if (!about) return;
  const lid = Number(about.ID);
  await updatePageTitle(lid, "О компании · Bober AI", config);
  const blocks = await listDraftBlocks(lid, config);
  const list = Array.isArray(blocks.result) ? blocks.result : [];
  for (const b of list) {
    const code = String(b.code || "");
    const id = Number(b.id);
    if (/31\.3|two_cols_text/i.test(code)) {
      await updatenodesSafe(
        lid,
        id,
        {
          ".landing-block-node-title": { text: "Bober AI Systems" },
          ".landing-block-node-text": {
            text: "Внедряем AI в продажи и операции: КП, документы, Bitrix24/amoCRM и 1С. Фиксированная смета, NDA, облако или on-premise. Пилот от 300 000 ₽.",
          },
        },
        config,
        `about text #${id}`,
      );
    }
    if (/34\.4|icons/i.test(code)) {
      await updatenodesSafe(
        lid,
        id,
        {
          ".landing-block-node-card-title@0": { text: "Фиксированная смета" },
          ".landing-block-node-card-text@0": { text: "Прозрачный бюджет до старта. Без скрытых часов." },
          ".landing-block-node-card-title@1": { text: "NDA · on-prem" },
          ".landing-block-node-card-text@1": {
            text: "Данные в вашем контуре. Партнёр 1С-Битрикс · ID 28909898.",
          },
        },
        config,
        `about cards #${id}`,
      );
    }
  }
}

async function configureContacts(pages, config) {
  const contacts = findPage(
    pages,
    (p) => String(p.CODE) === "kontakty",
    (p) => /контакт/i.test(String(p.TITLE || "")),
  );
  if (!contacts) return;
  const lid = Number(contacts.ID);
  await updatePageTitle(lid, "Контакты · Bober AI", config);
  const blocks = await listDraftBlocks(lid, config);
  const list = Array.isArray(blocks.result) ? blocks.result : [];

  for (const b of list) {
    const code = String(b.code || "");
    const id = Number(b.id);
    if (/27\.one_col.*title_and_text/i.test(code)) {
      const content = String(b.content || "");
      if (/контакт|свяж/i.test(content) || /находимся|адрес|калининград/i.test(content)) {
        if (/находимся|калининград|адрес/i.test(content)) {
          await updatenodesSafe(
            lid,
            id,
            {
              ".landing-block-node-title": { text: "Офис" },
              ".landing-block-node-text": {
                text: "Москва · Перервинский б-р, 3 · онлайн по РФ и СНГ",
              },
            },
            config,
            `address #${id}`,
          );
        } else {
          await updatenodesSafe(
            lid,
            id,
            {
              ".landing-block-node-title": { text: "Контакты" },
              ".landing-block-node-text": {
                text: `${CONTACT_EMAIL} · ${CONTACT_PHONE} · Telegram @pstasinski · ${MAIN_URL}`,
              },
            },
            config,
            `contacts #${id}`,
          );
        }
      }
    }
    if (/52\.3|mini_text/i.test(code)) {
      await updatenodesSafe(
        lid,
        id,
        {
          ".landing-block-node-title": { text: "Связаться" },
          ".landing-block-node-text": {
            text: `<a href="tel:${CONTACT_PHONE}">${CONTACT_PHONE}</a> · <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`,
          },
        },
        config,
        `contact cta #${id}`,
      );
    }
    if (/15\.social/i.test(code) && !/circles/i.test(code)) {
      await updatenodesSafe(
        lid,
        id,
        {
          ".landing-block-node-list-item-link@0": {
            attrs: { href: "https://t.me/pstasinski", target: "_blank" },
          },
          ".landing-block-node-list-item-link@1": {
            attrs: { href: "https://wa.me/79950998170", target: "_blank" },
          },
          ".landing-block-node-list-item-link@2": {
            attrs: { href: "https://www.linkedin.com/in/fuwiak", target: "_blank" },
          },
        },
        config,
        `social #${id}`,
      );
    }
  }
}

async function configurePayment(pages, config) {
  const pay = findPage(
    pages,
    (p) => String(p.CODE) === "informatsiyaoboplate",
    (p) => /оплат/i.test(String(p.TITLE || "")),
  );
  if (!pay) return;
  const lid = Number(pay.ID);
  const blocks = await listDraftBlocks(lid, config);
  const list = Array.isArray(blocks.result) ? blocks.result : [];
  const text = list.find((b) => /27\.one_col/i.test(String(b.code || "")));
  if (text) {
    await updatenodesSafe(
      lid,
      Number(text.id),
      {
        ".landing-block-node-title": { text: "Оплата и договор" },
        ".landing-block-node-text": {
          text: "Счёт и договор после оценки проекта. Фиксированная смета до старта. Онлайн-оплата — если подключена в портале Bitrix24.",
        },
      },
      config,
      `payment #${text.id}`,
    );
  }
}

async function hideKworkProducts(config) {
  log("Скрываем kwork-* товары (ACTIVE=N)…");
  let start = 0;
  let hidden = 0;
  for (;;) {
    const body = await call(
      "crm.product.list",
      {
        filter: { CATALOG_ID },
        select: ["ID", "NAME", "XML_ID", "ACTIVE"],
        start,
      },
      config,
    );
    if (body.error) {
      log(`crm.product.list: ${body.error} ${body.error_description || ""}`);
      return hidden;
    }
    const rows = body.result || [];
    for (const p of rows) {
      const xml = String(p.XML_ID || "");
      if (!xml.startsWith("kwork-")) continue;
      if (p.ACTIVE === "N") continue;
      const upd = await call(
        "crm.product.update",
        { id: p.ID, fields: { ACTIVE: "N" } },
        config,
      );
      if (upd.error) log(`  product ${p.ID}: ${upd.error}`);
      else {
        hidden += 1;
        log(`  hide ${p.ID} ${xml}`);
      }
    }
    if (body.next == null) break;
    start = body.next;
  }
  log(`Скрыто kwork-товаров: ${hidden}`);
  return hidden;
}

async function publishSite(siteId, pageIds, config) {
  for (const lid of pageIds) {
    const pub = await call("landing.landing.publication", { lid }, config);
    if (pub.error) log(`publication lid=${lid}: ${pub.error_description || pub.error}`);
    else log(`Страница опубликована: lid=${lid}`);
  }
  const pubSite = await call("landing.site.publication", { id: siteId }, config);
  if (pubSite.error) log(`publication site: ${pubSite.error_description || pubSite.error}`);
  else log(`Сайт опубликован: id=${siteId}`);

  const urlBody = await call("landing.site.getPublicUrl", { id: siteId }, config);
  return publicUrlFrom(urlBody, siteId) || urlBody.result || "";
}

async function main() {
  if (flags.has("--html")) {
    process.stdout.write(shopHtml() + "\n");
    return;
  }

  const siteIdArg = readFlagValue("--site-id");
  const siteId = siteIdArg ? Number(siteIdArg) : DEFAULT_SITE_ID;
  if (!Number.isFinite(siteId)) fail(`Некорректный --site-id: ${siteIdArg}`);

  if (flags.has("--dry-run")) {
    log(`dry-run: SITE_ID=${siteId} TITLE="${SITE_TITLE}"`);
    log(`HTML: ${HTML_PATH}`);
    log(shopHtml().slice(0, 400) + "…");
    log(`\nРедактор: ${getBitrixOAuthConfig().portal}/shop/stores/site/${siteId}/`);
    return;
  }

  const config = await ensureToken();
  const scopeBody = await call("scope", {}, config);
  const scopes = Array.isArray(scopeBody.result) ? scopeBody.result : [];
  log(`Scopes: ${scopes.join(", ") || "(none)"}`);

  if (!scopes.includes("landing")) {
    printScopeHelp(scopes);
    process.exit(2);
  }

  const site = await getStoreSite(siteId, config);
  if (site.insufficientScope) {
    printScopeHelp(scopes);
    process.exit(2);
  }

  log(`Магазин: id=${site.ID} TITLE="${site.TITLE}" TYPE=${site.TYPE} CODE=${site.CODE}`);
  log(`Бывший public URL: ${site.PUBLIC_URL || "(нет)"}`);

  const pages = await listPages(siteId, config);
  log(`Страниц: ${pages.length}`);

  const home =
    findPage(
      pages,
      (p) => !p.FOLDER_ID && /prodazhi|главн|index|home/i.test(String(p.CODE || "")),
      (p) => Number(p.ID) === 6,
      (p) => !p.FOLDER_ID && !/shapka|podval|header|footer/i.test(String(p.CODE || "")),
    ) || pages[0];

  const homeLid = home ? Number(home.ID) : null;
  if (!homeLid) fail("Не найдена главная страница магазина");
  log(`Главная: lid=${homeLid} CODE=${home.CODE} TITLE="${home.TITLE}"`);

  await updateSiteMeta(siteId, homeLid, config);
  await configureHome(homeLid, pages, config);
  await configureHeader(pages, config);
  await configureFooter(pages, config);
  await configureAbout(pages, config);
  await configureContacts(pages, config);
  await configurePayment(pages, config);

  if (flags.has("--hide-kwork")) {
    if (!scopes.includes("crm")) {
      log("⚠ --hide-kwork нужен scope crm — пропуск");
    } else {
      await hideKworkProducts(config);
    }
  }

  const publishLids = [
    homeLid,
    ...pages
      .filter((p) =>
        /shapka|podval|okompanii|kontakty|informatsiyaoboplate|katalog|vizitka|crmforma/i.test(
          String(p.CODE || ""),
        ),
      )
      .map((p) => Number(p.ID)),
  ].filter((id, i, a) => id && a.indexOf(id) === i);

  const publicUrl = await publishSite(siteId, publishLids, config);

  log("\n=== Готово ===");
  log(`SITE_ID: ${siteId}`);
  log(`TITLE: ${SITE_TITLE}`);
  log(`Public URL: ${publicUrl}`);
  log(`Редактор: ${config.portal}/shop/stores/site/${siteId}/`);
  log(`Каталог CRM: IBLOCK/CATALOG_ID=${CATALOG_ID} (npm run bitrix:catalog:sync)`);
  log(`Тизер (PAGE): npm run bitrix:site:teaser → обычно SITE_ID=6`);
  log("\nСовпадает с www.bober-systems.ru: бренд, lime/slate, Manrope via CSS, пакеты, CTA, партнёрская строка.");
  log("Не совпадает: layout Next.js, анимации, портфолио-галерея, pixel-perfect типографика STORE-шаблона.");
  if (!flags.has("--hide-kwork")) {
    log("Подсказка: npm run bitrix:shop:configure -- --hide-kwork — убрать kwork-категории из витрины.");
  }
}

main().catch((err) => fail(err.message || String(err)));

#!/usr/bin/env node
/**
 * Yandex Business Partner API CLI
 *
 *   yaga business status
 *   yaga business search "bober ai"
 *   yaga business card
 *   yaga business card create [--dry-run]
 *   yaga business campaigns
 *   yaga business campaigns create [--maps-only]
 *   yaga business price
 *   yaga business rubrics "разработка"
 *   yaga business regions "Москва"
 *   yaga business owner
 *   yaga business oauth …
 *
 * Docs: https://yandex.ru/dev/business-api/doc/ref/index.html
 * Card UI: https://yandex.ru/sprav/companies
 * Stories (no API): https://yandex.ru/sprav/<id>/p/edit/stories/
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { applyYagaCredentials } from "./lib/yaga-credentials.mjs";
import {
  BUSINESS_API_HOST,
  campaignPrice,
  companyCreationStatus,
  companySearch,
  createCampaign,
  createCompany,
  getBusinessConfig,
  getCampaign,
  getCampaigns,
  isOwner,
  launchCampaign,
  pingBusinessApi,
  regionSuggestion,
  resolveBusinessToken,
  rubricSuggestion,
  tokenLoginHint,
} from "./lib/yandex-business.mjs";

applyYagaCredentials();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const COMPANY_JSON = path.join(ROOT, "data/yandex-business-company.json");

const args = process.argv.slice(2);
const command = args[0] || "status";
const flags = new Set(args.filter((a) => a.startsWith("--") && !a.includes("=")));
const positional = args.slice(1).filter((a) => !a.startsWith("--"));

function readFlag(name) {
  const inline = args.find((a) => a.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const idx = args.indexOf(name);
  if (idx >= 0 && args[idx + 1] && !args[idx + 1].startsWith("--")) return args[idx + 1];
  return undefined;
}

function fail(message) {
  console.error(`\nОшибка: ${message}`);
  process.exit(1);
}

function log(message = "") {
  console.log(message);
}

function help() {
  log(`Яндекс Бизнес · Partner API (${BUSINESS_API_HOST})

Команды:
  status                         ping + companyId + token login
  search <text>                  поиск организации в Справочнике
  card                           показать локальный профиль + поиск по companyId/name
  card create [--dry-run]        create-company из data/yandex-business-company.json
  card status <companyId>        статус создания компании
  owner                          is-owner для companyId (нужен Client-Login)
  rubrics <text>                 подсказки рубрик
  regions <text>                 подсказки регионов
  campaigns [list]               список РК (агентство)
  campaigns get <id>             одна кампания
  campaigns create [--maps-only] создать РК на companyId (агентство)
  campaigns price                цены для companyId
  campaigns launch <id> --duration=90 --month-amount=N
  oauth […]                      bootstrap токена (см. yaga business oauth help)
  limits                         что API умеет / не умеет
  help

Env:
  YANDEX_BUSINESS_OAUTH_TOKEN     (fallback: YANDEX_OAUTH_TOKEN / webmaster)
  YANDEX_BUSINESS_CLIENT_LOGIN    логин субклиента для агентских методов
  YANDEX_BUSINESS_COMPANY_ID      default ${getBusinessConfig().companyId}
  YANDEX_BUSINESS_COUNTRY_GEO_ID  default 225 (RU)

UI карточки: https://yandex.ru/sprav/${getBusinessConfig().companyId}/
Истории (нет API): https://yandex.ru/sprav/${getBusinessConfig().companyId}/p/edit/stories/
`);
}

function printJson(label, value) {
  log(label);
  log(JSON.stringify(value, null, 2));
}

function assertOk(result, label) {
  if (result.ok) return result.payload;
  const err = result.payload?.error || result.payload;
  const code = err?.businessCode || err?.code || "";
  const msg =
    typeof err === "object"
      ? err?.message || err?.raw || JSON.stringify(err).slice(0, 400)
      : String(err);
  if (result.status === 403) {
    fail(
      `${label}: HTTP 403 Forbidden — geoadv API только для партнёров Яндекс Бизнес.\n` +
        `  Заявка: https://yandex.ru/promo/sprav-partner\n` +
        `  Docs:   https://yandex.ru/dev/business-api/doc/ref/index.html\n` +
        `  Карточка/истории без партнёрки — только UI: https://yandex.ru/sprav/${getBusinessConfig().companyId}/`,
    );
  }
  fail(`${label}: HTTP ${result.status}${code ? ` (${code})` : ""} — ${msg}`);
}

function loadCompanyProfile() {
  try {
    return JSON.parse(fs.readFileSync(COMPANY_JSON, "utf8"));
  } catch (error) {
    fail(`Не читается ${COMPANY_JSON}: ${error.message}`);
  }
}

async function cmdStatus() {
  const config = getBusinessConfig();
  log("Яндекс Бизнес · status\n");
  log(`API host:   ${BUSINESS_API_HOST}`);
  log(`companyId:  ${config.companyId}`);
  log(`Client-Login: ${config.clientLogin || "(не задан)"}`);
  log(`Access:     ${config.accessToken ? "задан" : "нет"}`);
  log(`Refresh:    ${config.refreshToken ? "задан" : "нет"}`);

  if (!config.accessToken) {
    fail("Нет токена. yaga business oauth");
  }

  const token = await resolveBusinessToken(config);
  const login = await tokenLoginHint(token);
  log(`Token login: ${login}`);

  const ping = await pingBusinessApi(token);
  if (ping.ok) {
    log(`Ping:       OK ${JSON.stringify(ping.payload)}`);
  } else {
    log(`Ping:       HTTP ${ping.status} — ${JSON.stringify(ping.payload).slice(0, 300)}`);
    if (ping.status === 403) {
      log("  geoadv API закрыт без партнёрского доступа.");
      log("  Заявка: https://yandex.ru/promo/sprav-partner");
      log("  Пока: правки карточки/историй только в UI Справочника.");
    }
  }

  log(`\nUI: https://yandex.ru/sprav/${config.companyId}/`);
  log(`Stories UI: https://yandex.ru/sprav/${config.companyId}/p/edit/stories/`);
}

async function cmdSearch() {
  const text = positional.join(" ").trim() || String(getBusinessConfig().companyId);
  const limit = Number(readFlag("--limit") || 10);
  const result = await companySearch(text, { limit, offset: 0 });
  const body = assertOk(result, "company-search");
  const companies = normalizeCompanies(body);
  log(`Поиск: «${text}» · найдено ${companies.length} (pager.total=${body?.pager?.total ?? "?"})\n`);
  for (const c of companies) {
    log(
      `  #${c.id}  ${c.name || "?"}${c.isOnline ? " [online]" : ""}${c.isChain ? " [chain]" : ""}`,
    );
    if (c.address) log(`       ${c.address}`);
    if (c.url?.length) log(`       ${[].concat(c.url).join(", ")}`);
  }
  if (flags.has("--json")) printJson("\nraw:", body);
}

function normalizeCompanies(body) {
  const out = [];
  const push = (item) => {
    if (!item) return;
    if (Array.isArray(item)) {
      for (const x of item) push(x);
      return;
    }
    if (typeof item === "object") {
      if (item.id != null || item.name) out.push(item);
      else {
        for (const v of Object.values(item)) {
          if (v && typeof v === "object" && (v.id != null || Array.isArray(v))) push(v);
        }
      }
    }
  };
  push(body?.companies);
  push(body?.companieschain);
  push(body?.data);
  // dedupe by id
  const seen = new Set();
  return out.filter((c) => {
    const id = String(c.id);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

async function cmdCard() {
  const sub = positional[0] || "show";
  if (sub === "create") return cmdCardCreate();
  if (sub === "status") return cmdCardStatus(positional[1]);
  if (sub === "limits") return cmdLimits();

  const profile = loadCompanyProfile();
  const config = getBusinessConfig();
  log("Карточка организации (локальный профиль + API search)\n");
  log(`file:      ${COMPANY_JSON}`);
  log(`name:      ${profile.name}`);
  log(`phone:     ${profile.phone}`);
  log(`website:   ${profile.website}`);
  log(`type:      ${profile.type}`);
  log(`companyId: ${profile.companyId || config.companyId}`);
  log(`regions:   ${JSON.stringify(profile.regions || [])}`);
  log(`rubricIds: ${JSON.stringify(profile.rubricIds || [])}`);

  const q = String(profile.companyId || config.companyId);
  const byId = await companySearch(q, { limit: 5 });
  if (byId.ok) {
    const hits = normalizeCompanies(byId.payload);
    log(`\nAPI search by id «${q}»: ${hits.length}`);
    for (const c of hits) {
      log(`  #${c.id} ${c.name} · ${c.address || "—"} · ${[].concat(c.url || []).join(", ")}`);
    }
  } else {
    log(`\nAPI search by id: HTTP ${byId.status} ${JSON.stringify(byId.payload).slice(0, 200)}`);
  }

  const byName = await companySearch(profile.name, { limit: 5 });
  if (byName.ok) {
    const hits = normalizeCompanies(byName.payload);
    log(`\nAPI search by name: ${hits.length}`);
    for (const c of hits.slice(0, 5)) {
      log(`  #${c.id} ${c.name} · ${c.address || "—"}`);
    }
  }

  log("\nЛимиты API:");
  log("  ✓ search / create-company / campaigns (агентство)");
  log("  ✗ edit полей существующей карточки");
  log("  ✗ stories");
  log(`  UI edit: https://yandex.ru/sprav/${profile.companyId || config.companyId}/p/edit/`);
}

async function cmdCardCreate() {
  const profile = loadCompanyProfile();
  let rubricIds = Array.isArray(profile.rubricIds) ? [...profile.rubricIds] : [];

  if (!rubricIds.length && profile.rubricQuery) {
    if (flags.has("--dry-run")) {
      log(`Рубрики пустые — --dry-run без API. Заполни rubricIds или убери --dry-run.`);
      rubricIds = [0];
    } else {
      log(`Рубрики пустые — ищу по «${profile.rubricQuery}»…`);
      const rub = await rubricSuggestion(profile.rubricQuery);
      const list = assertOk(rub, "rubric-suggestion");
      const items = list?.data || list || [];
      const arr = Array.isArray(items) ? items : [];
      rubricIds = arr.slice(0, 3).map((x) => x.id).filter(Boolean);
      log(`  → rubricIds=${JSON.stringify(rubricIds)} (${arr.slice(0, 3).map((x) => x.name).join("; ")})`);
    }
  }

  if (!rubricIds.length) {
    fail("Нужны rubricIds (заполни data/yandex-business-company.json или rubricQuery)");
  }

  const body = {
    name: profile.name,
    phone: profile.phone,
    website: profile.website,
    type: profile.type || "online",
    rubricIds,
  };
  if (body.type === "online") {
    body.regions = profile.regions || [];
    if (!body.regions.length) fail("online-компания: нужен regions[]");
  } else if (Array.isArray(profile.coordinates) && profile.coordinates.length === 2) {
    body.coordinates = profile.coordinates;
  } else {
    fail("offline-компания: нужны coordinates [lat, lon]");
  }

  printJson("payload:", body);
  if (flags.has("--dry-run")) {
    log("\n--dry-run: запрос не отправлен");
    return;
  }

  const result = await createCompany(body);
  const created = assertOk(result, "create-company");
  printJson("\ncreated:", created);
  const newId = created?.data ?? created?.id;
  if (newId) {
    log(`\ncompanyId=${newId}`);
    log(`UI: https://yandex.ru/sprav/${newId}/`);
    log("Сохрани YANDEX_BUSINESS_COMPANY_ID и data/yandex-business-company.json → companyId");
  }
}

async function cmdCardStatus(id) {
  const companyId = Number(id || getBusinessConfig().companyId);
  if (!companyId) fail("usage: yaga business card status <companyId>");
  const result = await companyCreationStatus(companyId);
  printJson("status:", assertOk(result, "company-creation-status"));
}

async function cmdOwner() {
  const config = getBusinessConfig();
  if (!config.clientLogin) {
    fail("Нужен YANDEX_BUSINESS_CLIENT_LOGIN (логин владельца/субклиента в Справочнике)");
  }
  const result = await isOwner({
    companyId: Number(readFlag("--company-id") || config.companyId),
    chainId: Number(readFlag("--chain-id") || 0),
    countryGeoId: config.countryGeoId,
  });
  printJson("is-owner:", assertOk(result, "is-owner"));
}

async function cmdRubrics() {
  const text = positional.join(" ").trim();
  if (!text) fail("usage: yaga business rubrics <text>");
  const result = await rubricSuggestion(text);
  printJson("rubrics:", assertOk(result, "rubric-suggestion"));
}

async function cmdRegions() {
  const text = positional.join(" ").trim();
  if (!text) fail("usage: yaga business regions <text>");
  const result = await regionSuggestion(text);
  printJson("regions:", assertOk(result, "region-suggestion"));
}

async function cmdCampaigns() {
  const sub = positional[0] || "list";
  const config = getBusinessConfig();

  if (sub === "get") {
    const id = Number(positional[1]);
    if (!id) fail("usage: yaga business campaigns get <id>");
    const result = await getCampaign(id);
    printJson("campaign:", assertOk(result, "get-campaign"));
    return;
  }

  if (sub === "create") {
    const body = {
      companyId: Number(readFlag("--company-id") || config.companyId),
      countryGeoId: config.countryGeoId,
      url: readFlag("--url") || "https://www.bober-systems.ru",
      mapsOnly: flags.has("--maps-only"),
    };
    printJson("create-campaign payload:", body);
    if (flags.has("--dry-run")) {
      log("\n--dry-run");
      return;
    }
    const result = await createCampaign(body);
    if (!result.ok) {
      const code = result.payload?.error?.businessCode || "";
      if (String(code).includes("RESOURCE_ACCESS_FORBIDDEN") || String(code).includes("AGENCY")) {
        log("\nКампании — API агентства Яндекс Бизнес.");
        log("Без партнёрского доступа: ЛК → https://yandex.ru/business/");
      }
      assertOk(result, "create-campaign");
    }
    printJson("created:", result.payload);
    return;
  }

  if (sub === "price") {
    return cmdPrice();
  }

  if (sub === "launch") {
    const id = Number(positional[1] || readFlag("--campaign-id"));
    const duration = Number(readFlag("--duration") || 90);
    const monthAmount = Number(readFlag("--month-amount"));
    if (!id || !monthAmount) {
      fail("usage: yaga business campaigns launch <id> --duration=90 --month-amount=N");
    }
    const result = await launchCampaign({ campaignId: id, duration, monthAmount });
    printJson("launch:", assertOk(result, "launch-campaign"));
    return;
  }

  const limit = Number(readFlag("--limit") || 20);
  const result = await getCampaigns({ limit, offset: 0 });
  if (!result.ok) {
    const code = result.payload?.error?.businessCode || result.payload?.message || "";
    log(`campaigns list: HTTP ${result.status} ${code}`);
    log("Список РК обычно доступен представителю агентства (Client-Login).");
    log("Попробуй: yaga credentials set YANDEX_BUSINESS_CLIENT_LOGIN <login>");
    if (!flags.has("--json")) return;
  }
  printJson("campaigns:", result.payload);
}

async function cmdPrice() {
  const config = getBusinessConfig();
  const result = await campaignPrice({
    companyId: Number(readFlag("--company-id") || config.companyId),
    campaignId: readFlag("--campaign-id") ? Number(readFlag("--campaign-id")) : undefined,
    countryGeoId: config.countryGeoId,
  });
  if (!result.ok) {
    log(`price: HTTP ${result.status} ${JSON.stringify(result.payload).slice(0, 300)}`);
    log("(часто только для агентства)");
    return;
  }
  printJson("price:", result.payload);
}

function cmdLimits() {
  log(`Что можно через Partner API (geoadv-api.yandex.ru)

✓ company-search — поиск карточки
✓ create-company + company-creation-status — создать новую организацию
✓ rubric-suggestion / region-suggestion
✓ is-owner (с Client-Login)
✓ get/create/launch campaigns + price — реклама приоритета (агентство)

✗ редактировать поля уже существующей карточки (телефон, сайт, часы…)
✗ истории / stories
✗ фото / публикации профиля как в ЛК
✗ вызовы без статуса партнёра → HTTP 403 Forbidden

Партнёрка (нужна для REST): https://yandex.ru/promo/sprav-partner
Обход для сетей (>30 филиалов): XML/CSV feed в ЛК (не REST).
Одиночная точка: правки в UI https://yandex.ru/sprav/${getBusinessConfig().companyId}/p/edit/
Истории: https://yandex.ru/sprav/${getBusinessConfig().companyId}/p/edit/stories/
`);
}

async function main() {
  try {
    switch (command) {
      case "help":
      case "--help":
      case "-h":
        help();
        return;
      case "status":
        await cmdStatus();
        return;
      case "search":
        await cmdSearch();
        return;
      case "card":
      case "company":
        await cmdCard();
        return;
      case "owner":
        await cmdOwner();
        return;
      case "rubrics":
      case "rubric":
        await cmdRubrics();
        return;
      case "regions":
      case "region":
        await cmdRegions();
        return;
      case "campaigns":
      case "campaign":
        await cmdCampaigns();
        return;
      case "price":
        await cmdPrice();
        return;
      case "limits":
        cmdLimits();
        return;
      case "oauth": {
        const { spawnSync } = await import("node:child_process");
        const script = path.join(__dirname, "yandex-business-oauth.mjs");
        const r = spawnSync(process.execPath, [script, ...args.slice(1)], {
          stdio: "inherit",
          cwd: ROOT,
          env: process.env,
        });
        process.exit(r.status ?? 1);
        return;
      }
      default:
        fail(`Неизвестная команда «${command}». yaga business help`);
    }
  } catch (error) {
    fail(error.message || String(error));
  }
}

main();

#!/usr/bin/env node

/**
 * Яндекс Директ — статус и создание кампаний через API.
 *
 * Важно:
 * - «Мастер кампаний» и UI-визард товарной кампании через API НЕ создаются.
 * - Через API доступна Единая перфоманс-кампания (UnifiedCampaign / ЕПК)
 *   и текстово-графические кампании (TextCampaign).
 * - Товарные объявления в ЕПК требуют отдельный фид в сервисе Feeds API.
 *
 *   railway run npm run yandex:direct:campaigns -- status
 *   railway run npm run yandex:direct:campaigns -- create-unified --dry-run
 *   railway run npm run yandex:direct:campaigns -- create-unified --budget-rub=1500
 *
 * Docs:
 *   https://yandex.ru/dev/direct/doc/ru/campaigns/add
 *   https://yandex.ru/dev/direct/doc/ru/campaigns/add-unified-campaign
 */

import { getDirectOAuthConfig, getValidDirectToken } from "./lib/yandex-oauth.mjs";
import fetch from "./lib/fetch.mjs";

const args = process.argv.slice(2);
const command = args[0] || "status";
const flags = new Set(args.filter((arg) => arg.startsWith("--")));

function readFlag(name, fallback) {
  const inline = args.find((arg) => arg.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  return fallback;
}

function fail(message) {
  console.error(`\nОшибка: ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`  ✓ ${message}`);
}

function warn(message) {
  console.log(`  ! ${message}`);
}

function log(message) {
  console.log(message);
}

async function parseJson(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text.slice(0, 500) };
  }
}

async function directApi(token, service, method, params, { version = "v5" } = {}) {
  const base =
    version === "v501" ? "https://api.direct.yandex.com/json/v501" : "https://api.direct.yandex.com/json/v5";

  const response = await fetch(`${base}/${service}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Accept-Language": "ru",
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ method, params }),
  });

  const body = await parseJson(response);
  return { status: response.status, body };
}

function rubToMicros(rub) {
  // В API суммы в миллионных долях валюты: 1 ₽ = 1_000_000
  return Math.round(Number(rub) * 1_000_000);
}

function todayYmd(timeZone = "Europe/Moscow") {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function printApiAccessHelp() {
  log(`
Доступ к Direct API не подтверждён (error_code 58).

1. Откройте https://direct.yandex.ru → Инструменты / API
   или заявку: https://yandex.ru/dev/direct/doc/dg/concepts/register.html
2. Заполните заявку на доступ для OAuth-приложения
   Client ID: ${process.env.YANDEX_DIRECT_CLIENT_ID || "(см. Railway)"}
3. Дождитесь подтверждения (обычно до нескольких рабочих дней)
4. Снова: railway run npm run yandex:direct:campaigns -- status
`);
}

function printWizardHelp() {
  log(`
«Мастер кампаний» / «Создать товарную кампанию» — только UI:

  https://direct.yandex.ru/dna/grid/campaigns

Через API эквивалент:
  • ЕПК (UnifiedCampaign) — npm run yandex:direct:campaigns -- create-unified
  • товарные объявления — после загрузки фида в Direct Feeds + ShoppingAd
`);
}

async function getToken() {
  const config = getDirectOAuthConfig();
  try {
    return await getValidDirectToken(config);
  } catch (error) {
    if (config.accessToken) {
      warn(`OAuth info: ${error.message} — использую YANDEX_DIRECT_OAUTH_TOKEN как есть`);
      return config.accessToken;
    }
    throw error;
  }
}

async function cmdStatus() {
  log("Яндекс Директ — статус\n");
  printWizardHelp();

  const token = await getToken();
  const clients = await directApi(token, "clients", "get", {
    FieldNames: ["Login", "ClientId", "CountryId", "Currency", "VatRate"],
  });

  if (clients.body?.error?.error_code === 58) {
    warn(`${clients.body.error.error_string}: ${clients.body.error.error_detail}`);
    printApiAccessHelp();
    process.exit(2);
  }

  if (clients.body?.error) {
    fail(`${clients.body.error.error_string}: ${clients.body.error.error_detail || ""}`);
  }

  const client = clients.body?.result?.Clients?.[0];
  if (client) {
    ok(`Login: ${client.Login}`);
    ok(`ClientId: ${client.ClientId}`);
    ok(`Currency: ${client.Currency || "n/a"}`);
  } else {
    warn("Клиент не найден в ответе API");
  }

  const campaigns = await directApi(token, "campaigns", "get", {
    SelectionCriteria: {},
    FieldNames: ["Id", "Name", "Type", "State", "Status", "StatusPayment", "StartDate", "DailyBudget"],
  });

  if (campaigns.body?.error) {
    fail(`${campaigns.body.error.error_string}: ${campaigns.body.error.error_detail || ""}`);
  }

  const list = campaigns.body?.result?.Campaigns || [];
  log(`\nКампании (${list.length})`);
  if (!list.length) {
    warn("Кампаний пока нет");
  } else {
    for (const campaign of list) {
      const budget = campaign.DailyBudget?.Amount
        ? `${(campaign.DailyBudget.Amount / 1_000_000).toFixed(0)} ₽/день`
        : "без дневного";
      ok(
        `#${campaign.Id} ${campaign.Name} · ${campaign.Type} · ${campaign.State}/${campaign.Status} · ${budget}`,
      );
    }
  }

  log(`\nUI: https://direct.yandex.ru/dna/grid/campaigns`);
}

function buildUnifiedCampaignPayload({ name, budgetRub, siteUrl, metrikaCounterId }) {
  const startDate = todayYmd();
  const amount = rubToMicros(budgetRub);

  return {
    Campaigns: [
      {
        Name: name,
        StartDate: startDate,
        TimeZone: "Europe/Moscow",
        DailyBudget: {
          Amount: amount,
          Mode: "STANDARD",
        },
        NegativeKeywords: {
          Items: ["бесплатно", "скачать", "вакансия", "работа"],
        },
        UnifiedCampaign: {
          BiddingStrategy: {
            Search: {
              BiddingStrategyType: "WB_MAXIMUM_CLICKS",
              WbMaximumClicks: {
                WeeklySpendLimit: amount * 7,
              },
              PlacementTypes: {
                SearchResults: "YES",
                ProductGallery: "NO",
                DynamicPlaces: "YES",
                Maps: "NO",
                SearchOrganizationList: "YES",
              },
            },
            Network: {
              BiddingStrategyType: "SERVING_OFF",
            },
          },
          Settings: [
            { Option: "ADD_METRICA_TAG", Value: "YES" },
            { Option: "ENABLE_AREA_OF_INTEREST_TARGETING", Value: "YES" },
            { Option: "ENABLE_SITE_MONITORING", Value: "YES" },
          ],
          CounterIds: metrikaCounterId ? { Items: [Number(metrikaCounterId)] } : undefined,
          TrackingParams: `utm_source=yandex&utm_medium=cpc&utm_campaign={campaign_id}&utm_content={ad_id}&utm_term={keyword}`,
        },
      },
    ],
  };
}

async function cmdCreateUnified() {
  const dryRun = flags.has("--dry-run");
  const budgetRub = Number(readFlag("--budget-rub", "1500"));
  const name = readFlag("--name", "Bober AI — услуги (ЕПК)");
  const siteUrl = (readFlag("--site", process.env.NEXT_PUBLIC_SITE_URL || "https://www.bober-ai.dev")).replace(
    /\/$/,
    "",
  );
  const metrikaCounterId = readFlag(
    "--metrika-id",
    process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || "110635302",
  );

  if (!Number.isFinite(budgetRub) || budgetRub < 300) {
    fail("Укажите --budget-rub >= 300");
  }

  log("Создание Единой перфоманс-кампании (UnifiedCampaign)\n");
  warn("Это НЕ «Мастер кампаний» — API-эквивалент ЕПК.");
  warn("После создания добавьте группы/объявления в UI или через adgroups/ads API.");
  log(`Имя:     ${name}`);
  log(`Сайт:    ${siteUrl}`);
  log(`Бюджет:  ${budgetRub} ₽/день`);
  log(`Метрика: ${metrikaCounterId}`);
  log(`Старт:   ${todayYmd()}`);

  const params = buildUnifiedCampaignPayload({
    name,
    budgetRub,
    siteUrl,
    metrikaCounterId,
  });

  // CounterIds optional — drop if empty object issue
  if (!params.Campaigns[0].UnifiedCampaign.CounterIds) {
    delete params.Campaigns[0].UnifiedCampaign.CounterIds;
  }

  if (dryRun) {
    log("\n--dry-run: тело запроса:");
    log(JSON.stringify({ method: "add", params }, null, 2));
    return;
  }

  const token = await getToken();
  const result = await directApi(token, "campaigns", "add", params, { version: "v501" });

  if (result.body?.error?.error_code === 58) {
    warn(`${result.body.error.error_string}: ${result.body.error.error_detail}`);
    printApiAccessHelp();
    process.exit(2);
  }

  if (result.body?.error) {
    fail(`${result.body.error.error_string}: ${result.body.error.error_detail || JSON.stringify(result.body)}`);
  }

  const addResults = result.body?.result?.AddResults || [];
  for (const item of addResults) {
    if (item.Errors?.length) {
      for (const err of item.Errors) {
        warn(`${err.Code}: ${err.Message} ${err.Details || ""}`);
      }
    }
    if (item.Id) {
      ok(`Кампания создана: Id=${item.Id}`);
      log(`  https://direct.yandex.ru/dna/campaign?campaignId=${item.Id}`);
    }
    if (item.Warnings?.length) {
      for (const warning of item.Warnings) {
        warn(`${warning.Code}: ${warning.Message}`);
      }
    }
  }

  if (!addResults.some((item) => item.Id)) {
    fail("Кампания не создана — смотрите ошибки выше");
  }
}

async function main() {
  switch (command) {
    case "status":
      await cmdStatus();
      break;
    case "create-unified":
      await cmdCreateUnified();
      break;
    case "help":
    case "--help":
      printWizardHelp();
      log("Команды:");
      log("  status");
      log("  create-unified [--dry-run] [--budget-rub=1500] [--name=...] [--metrika-id=...]");
      break;
    default:
      fail(`Неизвестная команда: ${command}. Используйте status | create-unified | help`);
  }
}

main().catch((error) => fail(error.message));

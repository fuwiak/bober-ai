#!/usr/bin/env node

/**
 * Синхронизация услуг и каналов Bober AI в товарный каталог CRM Битрикс24
 * (IBLOCK_ID=24, CRM_PRODUCT_CATALOG / booking_services preset).
 *
 * Источники данных (зашиты RU-снимком):
 *   - src/lib/bitrix-landing.ts → BITRIX_PACKAGES
 *   - src/content/ru.ts → packages.items + microConversions
 *   - src/lib/enterprise-services.ts → RU services
 *   - public/info.md → Core Service Offerings / packages
 *   - src/lib/site.ts → каналы связи
 *
 *   npm run bitrix:catalog:sync
 *   npm run bitrix:catalog:sync -- --dry-run
 *   npm run bitrix:catalog:sync -- --update
 *
 * Scope catalog.* недоступен приложению — используем crm.product* / crm.productsection*.
 */

import { applyYagaCredentials, upsertYagaCredentials } from "./lib/yaga-credentials.mjs";
import {
  bitrixCredentialVarsFromBundle,
  bitrixRest,
  getBitrixOAuthConfig,
  isTokenExpired,
  refreshAccessToken,
} from "./lib/bitrix-oauth.mjs";

applyYagaCredentials();

const CATALOG_ID = 24;
const CURRENCY_ID = "RUB";
const MEASURE_PIECE = 9; // «Штука» — в портале нет отдельной ед. «услуга»
const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const DO_UPDATE = args.includes("--update");

/** @typedef {{ xmlId: string, name: string, description?: string }} SectionDef */
/** @typedef {{ xmlId: string, name: string, price?: number, description: string, sectionXmlId: string }} ProductDef */

/** @type {SectionDef[]} */
const SECTIONS = [
  { xmlId: "bober-formats", name: "Форматы работы", description: "Аудит, пилот, внедрение, сопровождение" },
  { xmlId: "bober-bitrix-packages", name: "Пакеты Битрикс24", description: "Офферы bitrix.bober-ai.dev" },
  { xmlId: "bober-services", name: "Услуги Bober AI", description: "Enterprise и SEO-услуги" },
  { xmlId: "bober-booking", name: "Запись и консультации", description: "Микро-конверсии / booking" },
  { xmlId: "bober-channels", name: "Каналы лидов", description: "Каналы связи и источников CRM" },
];

/** @type {ProductDef[]} */
const PRODUCTS = [
  // —— Форматы работы (packages.items) ——
  {
    xmlId: "fmt-audit",
    sectionXmlId: "bober-formats",
    name: "Аудит",
    price: 150000,
    description:
      "1–2 недели. Карта процессов, точки потерь, ROI и приоритеты автоматизации. Стоимость аудита засчитывается в бюджет внедрения.",
  },
  {
    xmlId: "fmt-pilot",
    sectionXmlId: "bober-formats",
    name: "Пилот",
    price: 300000,
    description:
      "2–4 недели. Рабочий пилот на одном процессе с метриками и планом промышленного запуска.",
  },
  {
    xmlId: "fmt-bitrix24-ai",
    sectionXmlId: "bober-formats",
    name: "Битрикс24 + AI",
    price: 150000,
    description:
      "2–8 недель. Внедрение Битрикс24, AI-контур продаж, интеграции с 1С, телефонией и документами. Партнёр 1С-Битрикс · ID 28909898.",
  },
  {
    xmlId: "fmt-industrial",
    sectionXmlId: "bober-formats",
    name: "Промышленное внедрение",
    price: 500000,
    description:
      "4–12 недель. Production-запуск с документацией и передачей команде заказчика.",
  },
  {
    xmlId: "fmt-retainer",
    sectionXmlId: "bober-formats",
    name: "Сопровождение (AI Retainer)",
    price: 200000,
    description:
      "от 200 000 ₽/мес. Мониторинг, SLA, итерации процессов и приоритетная поддержка после go-live.",
  },

  // —— Пакеты Битрикс24 (BITRIX_PACKAGES) ——
  {
    xmlId: "bx-start",
    sectionXmlId: "bober-bitrix-packages",
    name: "Внедрение Битрикс24 с AI",
    price: 150000,
    description:
      "Разворачиваем и настраиваем портал Битрикс24 с заделом под AI: воронка, права, поля сделок, сайт и реклама.",
  },
  {
    xmlId: "bx-crm-automation",
    sectionXmlId: "bober-bitrix-packages",
    name: "AI-автоматизация Битрикс24",
    price: 300000,
    description:
      "Роботы, бизнес-процессы и AI-слой поверх BitrixGPT: автозаполнение, скоринг, follow-up, контур «звонок → CRM → задача».",
  },
  {
    xmlId: "bx-ai-analytics",
    sectionXmlId: "bober-bitrix-packages",
    name: "AI-аналитика Битрикс24",
    price: 300000,
    description:
      "Чат по данным CRM, звонкам и задачам — ответы о воронке и менеджерах вместо ручных отчётов.",
  },
  {
    xmlId: "bx-integrations",
    sectionXmlId: "bober-bitrix-packages",
    name: "Интеграция Битрикс24 и AI для продаж",
    price: 500000,
    description:
      "Связка Битрикс24 с 1С, amoCRM, телефонией и мессенджерами плюс AI-сценарии поверх единого контура продаж.",
  },
  {
    xmlId: "bx-mcp",
    sectionXmlId: "bober-bitrix-packages",
    name: "MCP для Битрикс24 и BitrixGPT",
    price: 300000,
    description:
      "Внешние сервисы → BitrixGPT через MCP Hub и Битрикс24 → Claude/ChatGPT через MCP-сервер, в рамках прав сотрудников.",
  },
  {
    xmlId: "bx-private-llm",
    sectionXmlId: "bober-bitrix-packages",
    name: "Битрикс24 + локальный LLM",
    price: 500000,
    description:
      "Локальный LLM в вашем облаке или on-premise — AI для Битрикс24 без передачи данных во внешние сервисы без согласия.",
  },
  {
    xmlId: "bx-sales-loop",
    sectionXmlId: "bober-bitrix-packages",
    name: "AI-контур отдела продаж",
    price: 300000,
    description:
      "Телефония + переписки + Bitrix24/amoCRM + AI: квалификация лидов, саммари, автозадачи, follow-up и отчёт об упущенных сделках. Пилот от 300 000 ₽.",
  },
  {
    xmlId: "bx-amocrm-ai",
    sectionXmlId: "bober-bitrix-packages",
    name: "AI для amoCRM",
    price: 300000,
    description:
      "Квалификация лидов, саммари, scoring и реактивация в amoCRM. Пилот от 300 000 ₽.",
  },

  // —— Услуги (enterprise-services + info.md) ——
  {
    xmlId: "svc-bpa",
    sectionXmlId: "bober-services",
    name: "Автоматизация бизнес-процессов",
    price: 500000,
    description: "Аудит, интеграции CRM/1С, workflow — цепочки задач без ручной рутины. ~21 дн.",
  },
  {
    xmlId: "svc-sales-ai",
    sectionXmlId: "bober-services",
    name: "Автоматизация отдела продаж",
    price: 500000,
    description: "Лиды, CRM, коммерческие предложения, follow-up — PDF за минуты. ~14 дн.",
  },
  {
    xmlId: "svc-ai-sales-loop",
    sectionXmlId: "bober-services",
    name: "AI-контур отдела продаж",
    price: 300000,
    description:
      "Телефония, переписки, CRM и автоматические следующие действия — один продукт. Bitrix24 / amoCRM. ~21 дн.",
  },
  {
    xmlId: "svc-advisor",
    sectionXmlId: "bober-services",
    name: "AI & Automation Advisor",
    price: 150000,
    description: "Бизнес-аудит, карта процессов, ROI, дорожная карта и смета до старта. ~10 дн.",
  },
  {
    xmlId: "svc-ai-impl",
    sectionXmlId: "bober-services",
    name: "Внедрение AI",
    price: 500000,
    description: "LLM, агенты, интеграции с CRM — production, не пилот на ChatGPT. ~28 дн.",
  },
  {
    xmlId: "svc-private-llm",
    sectionXmlId: "bober-services",
    name: "Приватный LLM-контур",
    price: 500000,
    description: "GigaChat, on-prem и изолированное облако — без утечки данных. ~28 дн.",
  },
  {
    xmlId: "svc-ai-automation",
    sectionXmlId: "bober-services",
    name: "AI-автоматизация",
    price: 500000,
    description: "Системы AI для автоматизации операций — от аудита до production.",
  },
  {
    xmlId: "svc-rag",
    sectionXmlId: "bober-services",
    name: "RAG и корпоративный поиск",
    price: 500000,
    description: "Поиск по документам и ответы LLM со ссылкой на источник.",
  },
  {
    xmlId: "svc-llm-dev",
    sectionXmlId: "bober-services",
    name: "Разработка LLM-решений",
    price: 500000,
    description: "Кастомные LLM-приложения, API, промпт-инженерия и production-деплой.",
  },
  {
    xmlId: "svc-n8n",
    sectionXmlId: "bober-services",
    name: "Автоматизация на n8n",
    price: 300000,
    description: "n8n-воркфлоу с AI-слоем и интеграциями CRM, мессенджеров, API.",
  },
  {
    xmlId: "svc-ai-agent",
    sectionXmlId: "bober-services",
    name: "AI-агенты для бизнеса",
    price: 500000,
    description: "Агенты с действиями: CRM, документы, workflow, эскалация к человеку.",
  },
  {
    xmlId: "svc-docs",
    sectionXmlId: "bober-services",
    name: "Обработка документов",
    price: 500000,
    description: "OCR, согласования, извлечение данных — в CRM/ERP без ручного ввода.",
  },
  {
    xmlId: "svc-voice",
    sectionXmlId: "bober-services",
    name: "Голосовой AI",
    price: 500000,
    description: "Speech-to-text, голосовые боты, логирование звонков в CRM.",
  },
  {
    xmlId: "svc-ocr",
    sectionXmlId: "bober-services",
    name: "OCR и распознавание",
    price: 300000,
    description: "Извлечение текста и полей из PDF, сканов и фото.",
  },
  {
    xmlId: "svc-open-webui",
    sectionXmlId: "bober-services",
    name: "Open WebUI",
    price: 500000,
    description: "Корпоративный чат с LLM, SSO и политиками доступа.",
  },
  {
    xmlId: "svc-self-hosted",
    sectionXmlId: "bober-services",
    name: "Self-hosted AI",
    price: 500000,
    description: "Приватный AI-стек в вашем контуре — без утечки данных.",
  },
  {
    xmlId: "svc-mcp",
    sectionXmlId: "bober-services",
    name: "MCP-интеграции",
    price: 500000,
    description: "Model Context Protocol — подключение LLM к CRM, БД и API.",
  },
  {
    xmlId: "svc-langgraph",
    sectionXmlId: "bober-services",
    name: "LangGraph-агенты",
    price: 500000,
    description: "Многошаговые агенты со state, HITL и observability.",
  },
  {
    xmlId: "svc-kb",
    sectionXmlId: "bober-services",
    name: "Корпоративная база знаний",
    price: 500000,
    description: "Единое место для регламентов, FAQ и AI-ответов со ссылками.",
  },
  {
    xmlId: "svc-consulting",
    sectionXmlId: "bober-services",
    name: "AI-консалтинг",
    price: 150000,
    description: "Стратегия, ROI, выбор технологий и дорожная карта внедрения.",
  },
  {
    xmlId: "svc-crm-int",
    sectionXmlId: "bober-services",
    name: "Интеграции CRM",
    price: 500000,
    description: "amoCRM, Bitrix24, 1С — синхронизация и автоматизация воронки.",
  },
  {
    xmlId: "svc-white-label",
    sectionXmlId: "bober-services",
    name: "White-label delivery",
    price: 500000,
    description:
      "Ваш бренд, наша инженерия: RAG, агенты, API, документация и handover для software house и интеграторов.",
  },

  // —— Запись / микро-конверсии ——
  {
    xmlId: "book-discovery",
    sectionXmlId: "bober-booking",
    name: "Discovery-звонок",
    price: 0,
    description: "30 минут: разберём задачу, процессы и ожидаемый эффект для бизнеса.",
  },
  {
    xmlId: "book-estimate",
    sectionXmlId: "bober-booking",
    name: "Оценка проекта",
    price: 0,
    description: "Предварительная смета и план работ — в течение 24 часов после брифа.",
  },
  {
    xmlId: "book-ai-audit",
    sectionXmlId: "bober-booking",
    name: "AI-аудит (запись)",
    price: 150000,
    description: "Карта процессов, точки потерь и расчёт окупаемости — от 150 000 ₽.",
  },
  {
    xmlId: "book-arch-review",
    sectionXmlId: "bober-booking",
    name: "Архитектурный review",
    price: 150000,
    description: "Разбор текущей схемы, интеграций и рисков перед масштабированием.",
  },

  // —— Каналы лидов ——
  {
    xmlId: "ch-telegram",
    sectionXmlId: "bober-channels",
    name: "Канал: Telegram",
    price: 0,
    description: "Основной канал связи: https://t.me/pstasinski. Источник CRM TELEGRAM.",
  },
  {
    xmlId: "ch-whatsapp",
    sectionXmlId: "bober-channels",
    name: "Канал: WhatsApp",
    price: 0,
    description: "WhatsApp Business: https://wa.me/79950998170",
  },
  {
    xmlId: "ch-phone",
    sectionXmlId: "bober-channels",
    name: "Канал: Телефон",
    price: 0,
    description: "Телефон / звонки: +7 995 099-81-70",
  },
  {
    xmlId: "ch-email",
    sectionXmlId: "bober-channels",
    name: "Канал: Email",
    price: 0,
    description: "Почта заявок: contact@bober-ai.dev",
  },
  {
    xmlId: "ch-web-forms",
    sectionXmlId: "bober-channels",
    name: "Канал: Формы сайта",
    price: 0,
    description:
      "Контактные формы bober-ai.dev, bitrix.bober-ai.dev, partners.bober-ai.dev → лид в CRM.",
  },
  {
    xmlId: "ch-bitrix-ol-web",
    sectionXmlId: "bober-channels",
    name: "Канал: Открытая линия Bitrix (WEB)",
    price: 0,
    description: "Открытая линия / виджет сайта портала Битрикс24 (источник WEB).",
  },
  {
    xmlId: "ch-bitrix-ol-tg",
    sectionXmlId: "bober-channels",
    name: "Канал: Открытая линия Bitrix (TELEGRAM)",
    price: 0,
    description: "Открытая линия Telegram в Битрикс24 (источник TELEGRAM).",
  },
  {
    xmlId: "ch-calendar",
    sectionXmlId: "bober-channels",
    name: "Канал: Онлайн-запись / календарь",
    price: 0,
    description: "Прямая запись на консультацию через календарь (NEXT_PUBLIC_CALENDAR_URL).",
  },
  {
    xmlId: "ch-yandex-uslugi",
    sectionXmlId: "bober-channels",
    name: "Канал: Яндекс Услуги",
    price: 0,
    description: "Профиль на Яндекс Услугах — входящие заявки и отзывы.",
  },
  {
    xmlId: "ch-linkedin",
    sectionXmlId: "bober-channels",
    name: "Канал: LinkedIn",
    price: 0,
    description: "Профессиональный канал: linkedin.com/in/fuwiak",
  },
];

function log(msg) {
  console.log(msg);
}

function fail(msg) {
  console.error(`\nОшибка: ${msg}`);
  process.exit(1);
}

async function ensureConfig() {
  let config = getBitrixOAuthConfig();
  if (!config.accessToken || isTokenExpired(config)) {
    if (!config.refreshToken) fail("Нет BITRIX24_ACCESS_TOKEN / REFRESH_TOKEN");
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

async function rest(method, params, config) {
  const { body } = await bitrixRest(method, params, config);
  if (body.error) {
    const err = new Error(`${method}: ${body.error_description || body.error}`);
    err.code = body.error;
    err.body = body;
    throw err;
  }
  return body.result;
}

async function listAllProducts(config) {
  const all = [];
  let start = 0;
  for (;;) {
    const { body } = await bitrixRest(
      "crm.product.list",
      {
        filter: { CATALOG_ID },
        select: ["ID", "NAME", "PRICE", "CURRENCY_ID", "XML_ID", "SECTION_ID", "DESCRIPTION"],
        start,
      },
      config,
    );
    if (body.error) throw new Error(body.error_description || body.error);
    const batch = body.result || [];
    all.push(...batch);
    if (!body.next) break;
    start = body.next;
  }
  return all;
}

async function listSections(config) {
  const result = await rest(
    "crm.productsection.list",
    { filter: { CATALOG_ID }, select: ["ID", "NAME", "XML_ID", "CODE"] },
    config,
  );
  return result || [];
}

async function ensureSection(def, byXml, byName, config, stats) {
  const existing = byXml.get(def.xmlId) || byName.get(def.name);
  if (existing) {
    stats.sectionsSkipped += 1;
    return Number(existing.ID);
  }
  if (DRY_RUN) {
    log(`  [dry-run] section + ${def.name}`);
    stats.sectionsCreated += 1;
    return -1;
  }
  const id = await rest(
    "crm.productsection.add",
    {
      fields: {
        CATALOG_ID,
        NAME: def.name,
        XML_ID: def.xmlId,
      },
    },
    config,
  );
  log(`  section + ${def.name} (#${id})`);
  stats.sectionsCreated += 1;
  const row = { ID: String(id), NAME: def.name, XML_ID: def.xmlId };
  byXml.set(def.xmlId, row);
  byName.set(def.name, row);
  return Number(id);
}

function productFields(def, sectionId) {
  return {
    CATALOG_ID,
    NAME: def.name,
    PRICE: def.price ?? 0,
    CURRENCY_ID,
    DESCRIPTION: def.description || "",
    DESCRIPTION_TYPE: "text",
    SECTION_ID: sectionId > 0 ? sectionId : undefined,
    ACTIVE: "Y",
    XML_ID: def.xmlId,
    MEASURE: MEASURE_PIECE,
  };
}

async function syncProduct(def, sectionId, byXml, byName, config, stats) {
  const existing = byXml.get(def.xmlId) || byName.get(def.name);
  if (existing) {
    if (DO_UPDATE && !DRY_RUN) {
      try {
        await rest(
          "crm.product.update",
          { id: existing.ID, fields: productFields(def, sectionId) },
          config,
        );
        log(`  update  ${def.name} (#${existing.ID})`);
        stats.updated += 1;
      } catch (e) {
        log(`  FAIL update ${def.name}: ${e.message}`);
        stats.failed.push({ name: def.name, error: e.message });
      }
    } else {
      stats.skipped += 1;
    }
    return;
  }

  if (DRY_RUN) {
    log(`  [dry-run] + ${def.name} · ${def.price ?? 0} ${CURRENCY_ID}`);
    stats.created += 1;
    return;
  }

  try {
    const id = await rest("crm.product.add", { fields: productFields(def, sectionId) }, config);
    log(`  + ${def.name} (#${id}) · ${def.price ?? 0} ${CURRENCY_ID}`);
    stats.created += 1;
    const row = { ID: String(id), NAME: def.name, XML_ID: def.xmlId };
    byXml.set(def.xmlId, row);
    byName.set(def.name, row);
  } catch (e) {
    log(`  FAIL ${def.name}: ${e.message}`);
    stats.failed.push({ name: def.name, error: e.message });
  }
}

async function main() {
  const config = await ensureConfig();
  log(`Портал: ${config.portal}`);
  log(`Каталог CRM IBLOCK_ID=${CATALOG_ID}`);
  if (DRY_RUN) log("Режим: --dry-run (без записи)");
  if (DO_UPDATE) log("Режим: --update (обновлять существующие по XML_ID/NAME)");

  const stats = {
    sectionsCreated: 0,
    sectionsSkipped: 0,
    created: 0,
    updated: 0,
    skipped: 0,
    failed: [],
  };

  const sections = await listSections(config);
  const secByXml = new Map(sections.filter((s) => s.XML_ID).map((s) => [s.XML_ID, s]));
  const secByName = new Map(sections.map((s) => [s.NAME, s]));

  log("\nСекции:");
  const sectionIds = new Map();
  for (const def of SECTIONS) {
    const id = await ensureSection(def, secByXml, secByName, config, stats);
    sectionIds.set(def.xmlId, id);
  }

  const products = await listAllProducts(config);
  const prodByXml = new Map(products.filter((p) => p.XML_ID).map((p) => [p.XML_ID, p]));
  const prodByName = new Map(products.map((p) => [p.NAME, p]));
  log(`\nУже в каталоге: ${products.length} позиций`);
  log("\nТовары / услуги:");

  for (const def of PRODUCTS) {
    const sectionId = sectionIds.get(def.sectionXmlId) ?? 0;
    await syncProduct(def, sectionId, prodByXml, prodByName, config, stats);
  }

  log("\n—— Итог ——");
  log(`Секции: создано ${stats.sectionsCreated}, пропущено ${stats.sectionsSkipped}`);
  log(
    `Позиции: создано ${stats.created}, обновлено ${stats.updated}, пропущено ${stats.skipped}, ошибок ${stats.failed.length}`,
  );
  if (stats.failed.length) {
    for (const f of stats.failed) log(`  ! ${f.name}: ${f.error}`);
  }
  log(
    `\nПроверка: ${config.portal}/crm/catalog/list/0/?IBLOCK_ID=${CATALOG_ID}&type=CRM_PRODUCT_CATALOG&lang=ru&preset_id=booking_services&with_preset=Y`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

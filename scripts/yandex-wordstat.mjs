#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import fetch from "./lib/fetch.mjs";

const DEFAULT_SEEDS = [
  "автоматизация бизнес процессов",
  "автоматизация документооборота",
  "автоматизация продаж",
  "автоматизация работы с документами",
  "автоматизация поддержки клиентов",
  "генерация коммерческих предложений",
  "база знаний компании",
  "корпоративная база знаний",
  "чат бот для бизнеса",
  "внедрение crm",
  "crm для бизнеса",
  "crm автоматизация",
  "настройка crm",
  "amocrm интеграция",
  "amocrm автоматизация",
  "bitrix24 внедрение",
  "bitrix24 автоматизация",
  "bitrix24 интеграция",
  "интеграция 1с crm",
  "автоматизация 1с",
  "внедрение ии в бизнес",
  "внедрение искусственного интеллекта",
  "корпоративный ии",
  "ai для бизнеса",
  "ai автоматизация",
  "нейросеть для бизнеса",
  "rag система",
  "база знаний с ии",
  "gigachat для бизнеса",
  "ai для bitrix24",
  "ai для продаж",
  "ai для документов",
  "ai агент для бизнеса",
  "обработка входящих заявок",
  "автоматизация техподдержки",
  "создание базы знаний",
];

const SEED_CLUSTERS = {
  "automation-processes": "Автоматизация процессов",
  "automation-documents": "Документы / документооборот",
  "automation-sales": "Продажи / КП",
  "support": "Поддержка / обращения",
  "knowledge-base": "База знаний",
  "chat-assistant": "Чат-бот / ассистент",
  "crm": "CRM общее",
  "amocrm": "amoCRM",
  "bitrix24": "Bitrix24",
  "1c": "1С",
  "ai-corporate": "Корпоративный ИИ",
  "ai-tech": "AI / RAG / tech",
};

const SEED_TO_CLUSTER = {
  "автоматизация бизнес процессов": "automation-processes",
  "автоматизация документооборота": "automation-documents",
  "автоматизация продаж": "automation-sales",
  "автоматизация работы с документами": "automation-documents",
  "автоматизация поддержки клиентов": "support",
  "генерация коммерческих предложений": "automation-sales",
  "база знаний компании": "knowledge-base",
  "корпоративная база знаний": "knowledge-base",
  "создание базы знаний": "knowledge-base",
  "чат бот для бизнеса": "chat-assistant",
  "внедрение crm": "crm",
  "crm для бизнеса": "crm",
  "crm автоматизация": "crm",
  "настройка crm": "crm",
  "amocrm интеграция": "amocrm",
  "amocrm автоматизация": "amocrm",
  "bitrix24 внедрение": "bitrix24",
  "bitrix24 автоматизация": "bitrix24",
  "bitrix24 интеграция": "bitrix24",
  "интеграция 1с crm": "1c",
  "автоматизация 1с": "1c",
  "внедрение ии в бизнес": "ai-corporate",
  "внедрение искусственного интеллекта": "ai-corporate",
  "корпоративный ии": "ai-corporate",
  "ai для бизнеса": "ai-corporate",
  "ai автоматизация": "ai-corporate",
  "нейросеть для бизнеса": "ai-corporate",
  "rag система": "ai-tech",
  "база знаний с ии": "knowledge-base",
  "gigachat для бизнеса": "ai-tech",
  "ai для bitrix24": "bitrix24",
  "ai для продаж": "automation-sales",
  "ai для документов": "automation-documents",
  "ai агент для бизнеса": "ai-tech",
  "обработка входящих заявок": "support",
  "автоматизация техподдержки": "support",
};

const HIGH_COMMERCIAL = [
  "под ключ",
  "заказать",
  "услуг",
  "компани",
  "агентств",
  "интегратор",
  "разработ",
  "на заказ",
  "стоимост",
  "цен",
  "внедрен",
];

const MEDIUM_COMMERCIAL = [
  "автоматиза",
  "настрой",
  "интеграц",
  "crm",
  "bitrix",
  "amocrm",
  "1с",
  "1c",
  "документ",
  "продаж",
  "поддерж",
  "база знан",
  "чат бот",
  "коммерческ",
  "обращен",
  "заявок",
  "ассистент",
  "ии ",
  " ai",
  "нейросет",
  "rag",
  "gigachat",
  "yandexgpt",
];

const INFORMATIONAL = [
  "что такое",
  "как ",
  "курс",
  "обучен",
  "бесплатн",
  "скачать",
  "реферат",
  "ваканс",
  "работа ",
  "зарплат",
  "отзыв",
  "форум",
  "wiki",
  "викип",
  "пример",
  "самостоятельно",
  "своими руками",
];

const PRODUCT_1C = [
  "комплексная автоматизация",
  "1с erp",
  "учет в 1с",
  "где в 1с",
  "отчет",
  "управление торговл",
  "бухгалтер",
  "редакц",
  "лиценз",
  "скачать 1с",
  "купить 1с",
];

const RELEVANCE_TOKENS = [
  "автомат",
  "crm",
  "bitrix",
  "amocrm",
  "1с",
  "1c",
  "erp",
  "документ",
  "продаж",
  "поддерж",
  "обращен",
  "заяв",
  "база знан",
  "чат",
  "бот",
  "ассистент",
  "ии",
  " ai",
  "нейросет",
  "rag",
  "gigachat",
  "yandexgpt",
  "внедрен",
  "интеграц",
  "бизнес",
  "коммерческ",
  "кп",
  "процесс",
  "контакт",
  "колл",
  "техподдерж",
  "знаний",
  "llm",
];

function isRelevantPhrase(phrase, source) {
  const p = phrase.toLowerCase();
  if (source === "popular") return true;
  return RELEVANCE_TOKENS.some((token) => p.includes(token));
}

const IRRELEVANT = [
  "app store",
  "iphone",
  "android",
  "квартиру",
  "авиакомпан",
  "иноагент",
  "деловое предложение",
  "что такое ооо",
  "предприятие это",
  "business max",
  "chat gpt business",
  "him i",
  "рпд",
  "федеративное",
  "агс это",
  "чдд это",
  "интеграция это",
  "интеграция что это",
  "ksir",
  "продамус",
  "мфц мои документы",
  "моя цена",
  "либерализация цен",
  "магазин реальных цен",
  "portal 1c",
  "1c ru",
  "its 1c",
  "qwen нейросеть",
  "агрегатор нейросетей",
  "документолог",
  "сенсорная интеграция",
  "portal 1c",
];

function getConfig() {
  const apiKey = process.env.YANDEX_SEARCH_API_KEY?.trim();
  const folderId = (
    process.env.YANDEX_SEARCH_FOLDER_ID ||
    process.env.YANDEX_FOLDER_ID ||
    process.env.YANDEX_CLOUD_FOLDER_ID ||
    ""
  ).trim();

  if (!apiKey || !folderId) {
    throw new Error("Нужны YANDEX_SEARCH_API_KEY и YANDEX_SEARCH_FOLDER_ID");
  }

  return { apiKey, folderId };
}

function sleep(ms) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
}

async function topRequests(config, phrase, numPhrases = 50) {
  const response = await fetch("https://searchapi.api.cloud.yandex.net/v2/wordstat/topRequests", {
    method: "POST",
    headers: {
      Authorization: `Api-Key ${config.apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      phrase,
      numPhrases,
      folderId: config.folderId,
    }),
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Wordstat API ${response.status}: ${JSON.stringify(body)}`);
  }

  return body;
}

function classifyIntent(phrase, source = "popular") {
  const p = phrase.toLowerCase();

  if (IRRELEVANT.some((token) => p.includes(token))) {
    return "irrelevant";
  }

  if (!isRelevantPhrase(phrase, source)) {
    return "irrelevant";
  }

  if (PRODUCT_1C.some((token) => p.includes(token))) {
    return "product_1c";
  }

  if (INFORMATIONAL.some((token) => p.includes(token))) {
    return "informational";
  }

  if (HIGH_COMMERCIAL.some((token) => p.includes(token))) {
    return "commercial_high";
  }

  if (MEDIUM_COMMERCIAL.some((token) => p.includes(token))) {
    return "commercial_medium";
  }

  return "informational";
}

function intentLabel(intent) {
  return {
    commercial_high: "Коммерческий (высокий)",
    commercial_medium: "Коммерческий (средний)",
    informational: "Информационный",
    product_1c: "Продукт 1С (не услуга)",
    irrelevant: "Нерелевантный (шум)",
  }[intent];
}

function serviceFit(intent, cluster) {
  if (intent === "irrelevant" || intent === "product_1c") return "skip";
  if (intent === "informational") return "blog";

  const map = {
    "automation-processes": "business-process-automation",
    "automation-documents": "business-process-automation",
    "automation-sales": "sales-ai-agent",
    support: "enterprise-ai-assistant",
    "knowledge-base": "enterprise-ai-assistant",
    "chat-assistant": "enterprise-ai-assistant",
    crm: "business-process-automation",
    amocrm: "business-process-automation",
    bitrix24: "business-process-automation",
    "1c": "business-process-automation",
    "ai-corporate": "enterprise-ai-assistant",
    "ai-tech": "ai-discovery-roadmap",
  };

  return map[cluster] || "ai-discovery-roadmap";
}

async function readSeeds(args) {
  const inline = args.find((arg) => arg.startsWith("--seeds="));
  if (inline) {
    return inline
      .slice("--seeds=".length)
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
  }

  const fileArg = args.find((arg) => arg.startsWith("--file="));
  if (fileArg) {
    const { readFile } = await import("node:fs/promises");
    const text = await readFile(fileArg.slice("--file=".length), "utf8");
    return text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }

  return DEFAULT_SEEDS;
}

function csvEscape(value) {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

function toCsv(rows) {
  const header = [
    "phrase",
    "count",
    "source",
    "seed",
    "cluster",
    "intent",
    "intent_label",
    "service_fit",
    "priority",
  ];
  const lines = [header.join(",")];
  for (const row of rows) {
    lines.push(
      [
        row.phrase,
        row.count,
        row.source,
        row.seed,
        row.cluster,
        row.intent,
        row.intentLabel,
        row.serviceFit,
        row.priority,
      ]
        .map(csvEscape)
        .join(","),
    );
  }
  return `${lines.join("\n")}\n`;
}

function priorityScore(row) {
  const intentWeight = {
    commercial_high: 1000,
    commercial_medium: 500,
    informational: 100,
    product_1c: 10,
    irrelevant: 0,
  };
  const sourceWeight = row.source === "popular" ? 20 : 10;
  return row.count + (intentWeight[row.intent] || 0) + sourceWeight;
}

function priorityLabel(score, intent) {
  if (intent === "irrelevant" || intent === "product_1c") return "P0-skip";
  if (intent === "commercial_high" && score > 1200) return "P1-landing";
  if (intent === "commercial_high") return "P2-landing/ads";
  if (intent === "commercial_medium" && score > 700) return "P2-landing/ads";
  if (intent === "commercial_medium") return "P3-seo";
  return "P4-blog";
}

async function loadFromJson(path) {
  const { readFile } = await import("node:fs/promises");
  const payload = JSON.parse(await readFile(path, "utf8"));
  if (Array.isArray(payload)) return payload;
  return payload.seeds || [];
}

function ingestCachedSeed(deduped, entry, minCount) {
  const seed = entry.seed;
  const cluster = SEED_TO_CLUSTER[seed] || entry.group || "other";
  const seedTotal = Number(entry.total || 0);

  const push = (item, source) => {
    const phrase = item.phrase?.trim();
    const count = Number(item.count || 0);
    if (!phrase || count < minCount) return;

    const key = phrase.toLowerCase();
    const intent = classifyIntent(phrase, source);
    const existing = deduped.get(key);
    if (existing && existing.count >= count) return;

    deduped.set(key, {
      phrase,
      count,
      source,
      seed,
      cluster,
      clusterLabel: SEED_CLUSTERS[cluster] || cluster,
      intent,
      intentLabel: intentLabel(intent),
      serviceFit: serviceFit(intent, cluster),
      seedTotal,
    });
  };

  for (const item of entry.results || []) push(item, "popular");
  for (const item of entry.assoc || entry.associations || []) push(item, "similar");
}

async function main() {
  const args = process.argv.slice(2);
  const json = args.includes("--json");
  const csv = args.includes("--csv");
  const minCount = Number(args.find((arg) => arg.startsWith("--min="))?.slice(6) || 15);
  const numPhrases = Number(args.find((arg) => arg.startsWith("--num="))?.slice(6) || 50);
  const outArg = args.find((arg) => arg.startsWith("--out="));
  const fromJsonArg = args.find((arg) => arg.startsWith("--from-json="));
  const deduped = new Map();

  if (fromJsonArg) {
    const cached = await loadFromJson(fromJsonArg.slice("--from-json=".length));
    for (const entry of cached) ingestCachedSeed(deduped, entry, minCount);
  } else {
    const config = getConfig();
    const seeds = await readSeeds(args);

    for (const seed of seeds) {
      const cluster = SEED_TO_CLUSTER[seed] || "other";
      const data = await topRequests(config, seed, numPhrases);
      const seedTotal = Number(data.totalCount || 0);

      const push = (item, source) => {
      const phrase = item.phrase?.trim();
      const count = Number(item.count || 0);
      if (!phrase || count < minCount) return;

      const key = phrase.toLowerCase();
      const intent = classifyIntent(phrase, source);
      const existing = deduped.get(key);
      if (existing && existing.count >= count) return;

      deduped.set(key, {
        phrase,
        count,
        source,
        seed,
        cluster,
        clusterLabel: SEED_CLUSTERS[cluster] || cluster,
        intent,
        intentLabel: intentLabel(intent),
        serviceFit: serviceFit(intent, cluster),
        seedTotal,
      });
    };

    for (const item of data.results || []) push(item, "popular");
    for (const item of data.associations || []) push(item, "similar");

      await sleep(120);
    }
  }

  const seedCount = fromJsonArg
    ? new Set([...deduped.values()].map((row) => row.seed)).size
    : (await readSeeds(args)).length;

  const rows = [...deduped.values()]
    .map((row) => {
      const score = priorityScore(row);
      return { ...row, priority: priorityLabel(score, row.intent), score };
    })
    .sort((a, b) => b.score - a.score);

  const actionable = rows.filter((row) => !["irrelevant", "product_1c"].includes(row.intent));

  if (csv || outArg) {
    const outPath = resolve(outArg ? outArg.slice("--out=".length) : "data/wordstat-intent.csv");
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, toCsv(rows), "utf8");
    console.log(`CSV: ${outPath} (${rows.length} rows, ${actionable.length} actionable)`);
  }

  if (json) {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }

  console.log("Wordstat: популярные + похожие | intent | service fit\n");
  console.log(`Seeds: ${seedCount} | Фраз: ${rows.length} | Actionable: ${actionable.length} | min=${minCount}\n`);

  const byIntent = {};
  for (const row of actionable) {
    byIntent[row.intent] = (byIntent[row.intent] || 0) + 1;
  }
  console.log("По intent:", byIntent, "\n");

  console.log("=== TOP P1-P2 (landing / ads) ===");
  for (const row of actionable.filter((r) => r.priority.startsWith("P1") || r.priority.startsWith("P2")).slice(0, 35)) {
    console.log(
      `${String(row.count).padStart(6)}  ${row.priority.padEnd(12)}  [${row.source}]  ${row.phrase}`,
    );
    console.log(
      `         ${row.intentLabel} · ${row.clusterLabel} · ${row.serviceFit} · seed: ${row.seed}`,
    );
  }

  console.log("\n=== TOP SIMILAR (похожие) с коммерческим intent ===");
  for (const row of actionable
    .filter((r) => r.source === "similar" && ["commercial_high", "commercial_medium"].includes(r.intent))
    .slice(0, 25)) {
    console.log(
      `${String(row.count).padStart(6)}  ${row.priority.padEnd(12)}  ${row.phrase}  (${row.intentLabel})`,
    );
  }

  console.log("\n=== TOP POPULAR (популярные) ===");
  for (const row of actionable.filter((r) => r.source === "popular").slice(0, 25)) {
    console.log(`${String(row.count).padStart(6)}  ${row.phrase}`);
  }
}

main().catch((error) => {
  console.error(`\nОшибка: ${error.message}`);
  process.exit(1);
});

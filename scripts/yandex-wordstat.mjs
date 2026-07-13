#!/usr/bin/env node

import fetch from "./lib/fetch.mjs";

const DEFAULT_SEEDS = [
  "внедрение искусственного интеллекта",
  "корпоративный ии",
  "rag система",
  "внедрение ии в бизнес",
  "ai для бизнеса",
  "база знаний с ии",
  "ai агенты для бизнеса",
  "разработка rag систем",
  "gigachat внедрение",
  "ai для bitrix24",
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

async function topRequests(config, phrase, numPhrases = 15) {
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

async function main() {
  const args = process.argv.slice(2);
  const json = args.includes("--json");
  const config = getConfig();
  const seeds = await readSeeds(args);

  const rows = [];
  for (const phrase of seeds) {
    const data = await topRequests(config, phrase, 12);
    rows.push({
      phrase,
      totalCount: Number(data.totalCount || 0),
      top: (data.results || []).slice(0, 8),
      associations: (data.associations || []).slice(0, 5),
    });
  }

  rows.sort((a, b) => b.totalCount - a.totalCount);

  if (json) {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }

  console.log("Wordstat topRequests (Search API v2, Россия)\n");
  for (const row of rows) {
    console.log(`${String(row.totalCount).padStart(8)}  ${row.phrase}`);
    for (const item of row.top.slice(0, 4)) {
      if (item.phrase !== row.phrase) {
        console.log(`${String(item.count).padStart(10)}  ↳ ${item.phrase}`);
      }
    }
    console.log("");
  }
}

main().catch((error) => {
  console.error(`\nОшибка: ${error.message}`);
  process.exit(1);
});

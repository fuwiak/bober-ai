#!/usr/bin/env node
/**
 * Валидатор микроразметки Яндекса — чеклист + локальная проверка JSON-LD / Open Graph.
 *
 * Сам валидатор только в UI (логин Яндекса), API нет:
 *   https://webmaster.yandex.ru/tools/microtest/
 *
 *   npm run webmaster:microtest
 *   yaga webmaster microtest
 *   npm run webmaster:microtest -- --skip-fetch
 */

import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const DEFAULT = {
  validator: "https://webmaster.yandex.ru/tools/microtest/",
  docs: "https://yandex.ru/support/webmaster/ru/yandex-indexing/validator",
  urls: [
    "https://www.bober-ai.dev/",
    "https://www.bober-ai.dev/services",
    "https://www.bober-ai.dev/services/business-process-automation",
    "https://www.bober-ai.dev/faq",
    "https://www.bober-ai.dev/pricing",
    "https://www.bober-ai.dev/portfolio",
    "https://www.bober-ai.dev/about",
    "https://www.bober-ai.dev/blog",
    "https://www.bober-ai.dev/secure-ai",
    "https://www.bober-ai.dev/kaspersky",
  ],
};

function loadConfig() {
  const result = spawnSync(
    "npx",
    [
      "--yes",
      "tsx",
      "-e",
      `import { YANDEX_MICROTEST_URL, YANDEX_MICROTEST_DOCS, yandexMicrotestUrls } from "./src/lib/yandex-microtest.ts";
       console.log(JSON.stringify({
         validator: YANDEX_MICROTEST_URL,
         docs: YANDEX_MICROTEST_DOCS,
         urls: yandexMicrotestUrls(),
       }));`,
    ],
    { cwd: root, encoding: "utf8", env: process.env },
  );
  if (result.status === 0 && result.stdout.trim()) {
    try {
      const line = result.stdout.trim().split("\n").filter(Boolean).pop();
      return JSON.parse(line);
    } catch {
      /* fall through */
    }
  }
  return DEFAULT;
}

function section(title) {
  console.log(`\n══ ${title} ══`);
}

function extractLdTypes(html) {
  const types = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = re.exec(html))) {
    try {
      const raw = match[1]
        .replace(/\\u003c/gi, "<")
        .replace(/\\u003e/gi, ">")
        .replace(/\\u0026/gi, "&")
        .trim();
      const data = JSON.parse(raw);
      const collect = (node) => {
        if (!node || typeof node !== "object") return;
        if (Array.isArray(node)) {
          for (const item of node) collect(item);
          return;
        }
        if (node["@type"]) {
          const t = node["@type"];
          types.push(...(Array.isArray(t) ? t : [t]));
        }
        if (Array.isArray(node["@graph"])) {
          for (const item of node["@graph"]) collect(item);
        }
      };
      collect(data);
    } catch {
      types.push("(invalid-json-ld)");
    }
  }
  return [...new Set(types)];
}

function extractOrgFields(html) {
  const fields = { name: null, telephone: null, email: null, address: null, types: [] };
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = re.exec(html))) {
    try {
      const raw = match[1]
        .replace(/\\u003c/gi, "<")
        .replace(/\\u003e/gi, ">")
        .replace(/\\u0026/gi, "&")
        .trim();
      const data = JSON.parse(raw);
      const walk = (node) => {
        if (!node || typeof node !== "object") return;
        if (Array.isArray(node)) {
          for (const item of node) walk(item);
          return;
        }
        const types = node["@type"];
        const typeList = Array.isArray(types) ? types : types ? [types] : [];
        const isOrg = typeList.some((t) =>
          ["Organization", "LocalBusiness", "ProfessionalService"].includes(t),
        );
        if (isOrg) {
          fields.types = [...new Set([...fields.types, ...typeList])];
          if (node.name && !fields.name) fields.name = node.name;
          if (node.telephone && !fields.telephone) {
            fields.telephone = Array.isArray(node.telephone) ? node.telephone[0] : node.telephone;
          }
          if (node.email && !fields.email) fields.email = node.email;
          if (node.address && !fields.address) {
            const addr = Array.isArray(node.address) ? node.address[0] : node.address;
            fields.address =
              typeof addr === "string"
                ? addr
                : [addr.streetAddress, addr.addressLocality, addr.postalCode]
                    .filter(Boolean)
                    .join(", ");
          }
        }
        if (Array.isArray(node["@graph"])) {
          for (const item of node["@graph"]) walk(item);
        }
      };
      walk(data);
    } catch {
      /* ignore */
    }
  }
  return fields;
}

function hasOpenGraph(html) {
  return /property=["']og:(title|type|url|image)["']/i.test(html);
}

function hasTwitterCard(html) {
  return /name=["']twitter:card["']/i.test(html);
}

async function probe(url) {
  const res = await fetch(url, {
    headers: { "user-agent": "BoberAI-Microtest/1.0 (+https://www.bober-ai.dev)" },
    redirect: "follow",
  });
  const html = await res.text();
  return {
    url,
    status: res.status,
    ldTypes: extractLdTypes(html),
    org: extractOrgFields(html),
    openGraph: hasOpenGraph(html),
    twitter: hasTwitterCard(html),
  };
}

async function main() {
  const skipFetch = process.argv.includes("--skip-fetch");
  const { validator, docs, urls } = loadConfig();

  console.log("Яндекс Вебмастер · Валидатор микроразметки\n");
  console.log(`UI:   ${validator}`);
  console.log(`Docs: ${docs}`);
  console.log(`
Как проверить (только UI, нужна авторизация Яндекса):
  1. Откройте ${validator}
  2. Вставьте URL из списка ниже (или HTML-фрагмент)
  3. Нажмите «Проверить»
  Поддержка: Schema.org / JSON-LD, Open Graph, microdata, микроформаты, RDFa.
`);

  section(`URL для проверки (${urls.length})`);
  for (const url of urls) console.log(`  ${url}`);

  if (skipFetch) {
    console.log("\n--skip-fetch: пропускаю HTTP-проверку JSON-LD / OG");
    return;
  }

  section("Локальный снимок (JSON-LD / Open Graph)");
  let ok = 0;
  let warn = 0;
  for (const url of urls) {
    try {
      const row = await probe(url);
      const types = row.ldTypes.length ? row.ldTypes.join(", ") : "—";
      const og = row.openGraph ? "OG✓" : "OG✗";
      const tw = row.twitter ? "TW✓" : "TW✗";
      const mark = row.status === 200 && row.ldTypes.length ? "✓" : row.status === 200 ? "~" : "✗";
      if (mark === "✓") ok += 1;
      else warn += 1;
      console.log(`  ${mark} ${row.status} ${og} ${tw}  ${url}`);
      console.log(`      @type: ${types}`);
      if (row.org?.name) {
        console.log(
          `      Organization: ${row.org.name} · tel ${row.org.telephone || "—"} · ${row.org.email || "—"}`,
        );
        if (row.org.address) console.log(`      address: ${row.org.address}`);
      }
    } catch (error) {
      warn += 1;
      console.log(`  ✗ ${url}: ${error.message}`);
    }
  }

  console.log(`\nИтого: ok=${ok} warn=${warn}`);
  console.log(`Дальше прогоните те же URL в UI: ${validator}\n`);
}

main().catch((error) => {
  console.error(`Ошибка: ${error.message}`);
  process.exit(1);
});

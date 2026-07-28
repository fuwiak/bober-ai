#!/usr/bin/env node

/**
 * Отправка URL сайта в IndexNow (Яндекс + Bing и другие участники).
 * Яндекс подхватывает новые/обновлённые страницы за часы вместо недель —
 * критично для молодого домена, у которого в поиске лишь часть sitemap.
 *
 * Ключ должен лежать на https://<host>/<key>.txt (см. public/<key>.txt).
 *
 * Использование:
 *   node scripts/indexnow-submit.mjs             # все URL из sitemap.xml
 *   node scripts/indexnow-submit.mjs /pricing …  # только указанные пути
 */

import { CANONICAL_ORIGIN } from "../config/domains.mjs";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import fetch from "./lib/fetch.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
// Webmaster/IndexNow host — not dual-origin branding SITE_URL.
const SITE_URL = (
  process.env.INDEXNOW_SITE_URL ||
  process.env.YANDEX_WEBMASTER_HOST_URL ||
  CANONICAL_ORIGIN
).replace(/\/$/, "");
const HOST = new URL(SITE_URL).host;
const KEY = process.env.INDEXNOW_KEY?.trim() || "e12776ff43264f8c1750c9e433a90357";
const KEY_URL = `${SITE_URL}/${KEY}.txt`;
const LOCAL_KEY = join(root, "public", `${KEY}.txt`);
const LOCAL_SITEMAP = join(root, "public", "sitemap.xml");

// Яндекс — отдельный endpoint; api.indexnow.org раздаёт остальным участникам (Bing и др.).
const ENDPOINTS = ["https://yandex.com/indexnow", "https://api.indexnow.org/indexnow"];

function fetchErrorHint(error, url) {
  const cause = error?.cause;
  const code = cause?.code || error?.code || "";
  const detail = cause?.message || error?.message || String(error);
  let hint = "";
  if (code.includes("SSL") || /tlsv?1|SSL/i.test(detail)) {
    hint =
      "\n  → TLS к сайту сломан (часто LE rate-limit / Caddy без multi-SAN). " +
      "Проверьте: curl -sI " +
      url;
  } else if (code === "ENOTFOUND" || code === "ECONNREFUSED") {
    hint = "\n  → Хост недоступен с этой машины.";
  }
  return `fetch failed (${url}): ${code || detail}${hint}`;
}

async function safeFetch(url, options) {
  try {
    return await fetch(url, options);
  } catch (error) {
    throw new Error(fetchErrorHint(error, url));
  }
}

function parseSitemapXml(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

function toSiteUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.host === HOST) return url;
    // Accept twin / local hosts from sitemap and rewrite to SITE_URL.
    if (parsed.host.endsWith("bober-systems.ru") || parsed.host === "localhost") {
      return `${SITE_URL}${parsed.pathname}${parsed.search}`;
    }
  } catch {
    /* skip */
  }
  return null;
}

async function urlsFromSitemap() {
  let xml;
  try {
    const response = await safeFetch(`${SITE_URL}/sitemap.xml`);
    if (!response.ok) throw new Error(`sitemap.xml → HTTP ${response.status}`);
    xml = await response.text();
  } catch (liveError) {
    if (!existsSync(LOCAL_SITEMAP)) throw liveError;
    console.warn(`⚠ Live sitemap недоступен → ${LOCAL_SITEMAP}`);
    console.warn(`  ${liveError.message}`);
    xml = readFileSync(LOCAL_SITEMAP, "utf8");
  }
  return [...new Set(parseSitemapXml(xml).map(toSiteUrl).filter(Boolean))];
}

async function verifyKeyFile() {
  try {
    const response = await safeFetch(KEY_URL);
    const text = response.ok ? (await response.text()).trim() : "";
    if (text === KEY) return;
    throw new Error(
      `Файл ключа ${KEY_URL} недоступен или не совпадает (HTTP ${response.status}). ` +
        "Задеплойте public/<key>.txt перед отправкой.",
    );
  } catch (liveError) {
    if (!existsSync(LOCAL_KEY)) throw liveError;
    const local = readFileSync(LOCAL_KEY, "utf8").trim();
    if (local !== KEY) throw liveError;
    console.warn(`⚠ Live ключ недоступен, локальный public/${KEY}.txt совпадает.`);
    console.warn(`  IndexNow всё равно проверит ${KEY_URL} на своей стороне.`);
    console.warn(`  ${liveError.message}`);
  }
}

async function submit(urls) {
  const payload = JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_URL, urlList: urls });
  for (const endpoint of ENDPOINTS) {
    const response = await safeFetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: payload,
    });
    const ok = response.status === 200 || response.status === 202;
    console.log(`  ${ok ? "✓" : "✗"} ${endpoint} → HTTP ${response.status}`);
    if (!ok) {
      const text = await response.text();
      if (text) console.log(`    ${text.slice(0, 300)}`);
    }
  }
}

async function main() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const urls = args.length
    ? args.map((path) => (path.startsWith("http") ? path : `${SITE_URL}${path}`))
    : await urlsFromSitemap();

  console.log(`IndexNow: ${urls.length} URL для ${HOST}\n`);
  if (!urls.length) throw new Error("Нет URL для отправки");
  await verifyKeyFile();
  console.log(`  ✓ Ключ подтверждён: ${KEY_URL}\n`);

  // Лимит IndexNow — 10 000 URL за запрос; отправляем одним батчем c запасом по 5 000.
  for (let i = 0; i < urls.length; i += 5000) {
    await submit(urls.slice(i, i + 5000));
  }
  console.log("\nГотово. Яндекс обычно обходит присланные URL в течение суток.");
}

main().catch((error) => {
  console.error(`Ошибка: ${error.message}`);
  process.exit(1);
});

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

import fetch from "./lib/fetch.mjs";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.bober-ai.dev").replace(/\/$/, "");
const HOST = new URL(SITE_URL).host;
const KEY = process.env.INDEXNOW_KEY?.trim() || "e12776ff43264f8c1750c9e433a90357";
const KEY_URL = `${SITE_URL}/${KEY}.txt`;

// Яндекс — отдельный endpoint; api.indexnow.org раздаёт остальным участникам (Bing и др.).
const ENDPOINTS = ["https://yandex.com/indexnow", "https://api.indexnow.org/indexnow"];

async function urlsFromSitemap() {
  const response = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!response.ok) throw new Error(`sitemap.xml → HTTP ${response.status}`);
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
  // IndexNow принимает только URL своего хоста — микросайты из sitemap отсекаем.
  return [...new Set(urls)].filter((url) => new URL(url).host === HOST);
}

async function verifyKeyFile() {
  const response = await fetch(KEY_URL);
  const text = response.ok ? (await response.text()).trim() : "";
  if (text !== KEY) {
    throw new Error(
      `Файл ключа ${KEY_URL} недоступен или не совпадает (HTTP ${response.status}). ` +
        "Задеплойте public/<key>.txt перед отправкой.",
    );
  }
}

async function submit(urls) {
  const payload = JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_URL, urlList: urls });
  for (const endpoint of ENDPOINTS) {
    const response = await fetch(endpoint, {
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
  const args = process.argv.slice(2);
  const urls = args.length
    ? args.map((path) => (path.startsWith("http") ? path : `${SITE_URL}${path}`))
    : await urlsFromSitemap();

  console.log(`IndexNow: ${urls.length} URL для ${HOST}\n`);
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

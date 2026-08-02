#!/usr/bin/env node
/**
 * Register /sitemap.xml in Яндекс Вебмастере (user-added-sitemaps API).
 * Fixes NO_SITEMAPS when robots.txt points to sitemap but UI queue is empty.
 *
 *   npm run webmaster:sitemap
 *   yaga webmaster sitemap
 *   yaga webmaster sitemap --status
 */

import { CANONICAL_ORIGIN } from "../config/domains.mjs";
import fetch from "./lib/fetch.mjs";
import {
  ensureUserSitemap,
  getSitemaps,
  getUserAddedSitemaps,
  resolveHostContext,
} from "./lib/yandex-webmaster.mjs";

const args = new Set(process.argv.slice(2));
const statusOnly = args.has("--status") || args.has("-s");
/** Delete + re-add so Webmaster re-fetches after sitemap.xml grew past stale urls=4. */
const forceRefresh = args.has("--force") || args.has("-f") || args.has("--refresh");

const SITEMAP_URL = (
  process.env.YANDEX_WEBMASTER_SITEMAP_URL ||
  process.env.SITEMAP_URL ||
  `${CANONICAL_ORIGIN}/sitemap.xml`
).replace(/\/$/, "");

async function ensureReachable(url) {
  const response = await fetch(url, { method: "GET", redirect: "follow" });
  if (!response.ok) {
    throw new Error(`${url} → HTTP ${response.status}`);
  }
  const text = await response.text();
  if (!/<(urlset|sitemapindex)[\s>]/i.test(text)) {
    throw new Error(`${url} не похож на sitemap (нет urlset/sitemapindex)`);
  }
  return text;
}

function printList(label, rows) {
  console.log(`\n${label}: ${rows.length}`);
  for (const row of rows) {
    const url = row.sitemap_url || row.url || row.sitemap_id;
    const extra = [
      row.errors_count != null ? `errors=${row.errors_count}` : null,
      row.urls_count != null ? `urls=${row.urls_count}` : null,
      row.added_date ? `added=${row.added_date}` : null,
    ]
      .filter(Boolean)
      .join(" · ");
    console.log(`  · ${url}${extra ? ` · ${extra}` : ""}`);
  }
}

async function main() {
  const { config, userId, host, hostId } = await resolveHostContext();
  const hostUrl = host.unicode_host_url || host.ascii_host_url || config.hostUrl;

  console.log("Яндекс Вебмастер · Sitemap\n");
  console.log(`Сайт:    ${hostUrl}`);
  console.log(`host_id: ${hostId}`);
  console.log(`URL:     ${SITEMAP_URL}`);

  const xml = await ensureReachable(SITEMAP_URL);
  const childCount = (xml.match(/<sitemap>/gi) || []).length;
  const urlCount = (xml.match(/<loc>/gi) || []).length;
  if (childCount) console.log(`✓ Файл доступен (sitemapindex, ${childCount} child)`);
  else console.log(`✓ Файл доступен (urlset, ~${urlCount} loc)`);

  const userAddedBefore = await getUserAddedSitemaps(config.token, userId, hostId);
  const discoveredBefore = await getSitemaps(config.token, userId, hostId);

  if (statusOnly) {
    printList("Добавлены вручную (user-added)", userAddedBefore);
    printList("Обнаружены роботом (sitemaps)", discoveredBefore);
    if (!userAddedBefore.length) {
      console.log("\n! Очередь пуста — запустите без --status: yaga webmaster sitemap");
      process.exit(1);
    }
    return;
  }

  const result = await ensureUserSitemap(config.token, userId, hostId, SITEMAP_URL, {
    force: forceRefresh,
  });
  if (result.forced) {
    console.log(
      `\n✓ Sitemap передобавлен (force) — id: ${result.sitemap_id || result.match?.sitemap_id || "?"}`,
    );
  } else if (result.already) {
    console.log("\n✓ Sitemap уже в очереди Вебмастера (без --force не трогаем)");
  } else {
    console.log(`\n✓ Sitemap добавлен (id: ${result.sitemap_id || result.match?.sitemap_id || "?"})`);
  }

  printList("Добавлены вручную (user-added)", result.userAdded || userAddedBefore);

  const discovered = await getSitemaps(config.token, userId, hostId);
  printList("Обнаружены роботом (sitemaps)", discovered);

  console.log(`
Дальше:
  · Вебмастер → Индексирование → Файлы Sitemap — статус «в обработке» → «используется»
  · Рекомендация NO_SITEMAPS исчезнет после первого успешного обхода (обычно 1–3 дня)
  · Переобход: yaga webmaster boost
`);
}

main().catch((error) => {
  console.error(`\nОшибка: ${error.message || error}`);
  process.exit(1);
});

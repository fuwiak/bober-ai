#!/usr/bin/env node
/**
 * Boost индексации / сниппетов в Яндекс Вебмастере:
 * 1) переобход важных URL (API)
 * 2) статус фида услуг
 * 3) чеклист UI: важные страницы, регион, Яндекс Бизнес
 *
 *   npm run webmaster:boost
 *   yaga webmaster boost
 *
 * Important-urls нельзя добавить через API (только GET) — список печатается для UI.
 */

import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  getImportantUrls,
  getRecrawlQuota,
  listFeeds,
  resolveHostContext,
  submitRecrawl,
} from "./lib/yandex-webmaster.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadImportantUrls() {
  const result = spawnSync(
    "npx",
    [
      "--yes",
      "tsx",
      "-e",
      `import { yandexImportantUrls } from "./src/lib/yandex-important-urls.ts"; console.log(JSON.stringify(yandexImportantUrls()));`,
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

  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.bober-ai.dev").replace(/\/$/, "");
  const paths = [
    "/",
    "/services",
    "/pricing",
    "/portfolio",
    "/about",
    "/blog",
    "/faq",
    "/automation",
    "/partners",
    "/guides",
    "/media",
    "/integrations/bitrix24",
    "/integrations/amocrm",
    "/services/business-process-automation",
    "/services/sales-ai-agent",
    "/services/ai-discovery-roadmap",
    "/services/enterprise-ai-assistant",
    "/services/private-llm-gigachat",
    "/services/crm-integration",
    "/services/ai-consulting",
    "/services/n8n",
    "/services/document-processing",
  ];
  return [
    ...paths.map((p) => (p === "/" ? `${base}/` : `${base}${p}`)),
    "https://partners.bober-ai.dev/",
    "https://bitrix.bober-ai.dev/",
  ];
}

function section(title) {
  console.log(`\n══ ${title} ══`);
}

async function main() {
  const skipRecrawl = process.argv.includes("--dry-run") || process.argv.includes("--checklist");
  const { config, userId, host, hostId } = await resolveHostContext();
  const hostUrl = host.unicode_host_url || host.ascii_host_url || config.hostUrl;
  const uiBase = `https://webmaster.yandex.ru/site/${encodeURIComponent(hostId)}`;

  console.log("Яндекс Вебмастер · boost индексации\n");
  console.log(`Сайт:    ${hostUrl}`);
  console.log(`host_id: ${hostId}`);

  const urls = loadImportantUrls();
  section("Важные URL (добавить в UI — API только читает)");
  console.log(`Список (${urls.length}):`);
  for (const url of urls) console.log(`  ${url}`);
  console.log(`\nUI → Индексирование → Важные страницы:`);
  console.log(`  ${uiBase}/indexing/important/`);

  try {
    const existing = await getImportantUrls(config.token, userId, hostId);
    const list = Array.isArray(existing) ? existing : existing?.urls || [];
    console.log(`Сейчас в Вебмастере отслеживается: ${list.length}`);
  } catch (error) {
    console.log(`Не удалось прочитать important-urls: ${error.message}`);
  }

  section("Региональность (только UI)");
  console.log("Укажите: Москва и/или Россия + ссылка на /about или контакты.");
  console.log(`  ${uiBase}/search/regions/`);

  section("Яндекс Бизнес / Справочник (только UI)");
  console.log("Карточка организации со сайтом https://www.bober-ai.dev");
  console.log("  https://business.yandex.ru/");

  section("Фид услуг");
  try {
    const feeds = await listFeeds(config.token, userId, hostId);
    const feed = feeds.find((f) => (f.url || "").includes("performers-feed.yml")) || feeds[0];
    if (feed) {
      console.log(`URL: ${feed.url}`);
      console.log(`Тип: ${feed.type || "?"} · статус: ${feed.status || feed.feed_status || JSON.stringify(feed).slice(0, 180)}`);
    } else {
      console.log("Фид performers-feed.yml не найден — загрузите: npm run webmaster:feed:upload");
    }
  } catch (error) {
    console.log(`feeds: ${error.message}`);
  }
  console.log(`UI фиды: ${uiBase}/search/appearance/`);
  console.log("После деплоя нажмите «Перепроверить».");

  section("Переобход приоритетных URL");
  const quota = await getRecrawlQuota(config.token, userId, hostId);
  const remaining = Number(quota.quota_remainder ?? quota.daily_quota_remainder ?? 0);
  console.log(`Квота: осталось ${remaining} / день ${quota.daily_quota ?? "?"}`);

  const wwwUrls = urls.filter((u) => {
    try {
      const host = new URL(u).hostname;
      return host === "www.bober-ai.dev" || host === "bober-ai.dev";
    } catch {
      return false;
    }
  });
  const toCrawl = wwwUrls.slice(0, Math.min(wwwUrls.length, Math.max(remaining, 0)));

  if (skipRecrawl) {
    console.log(`--checklist: пропускаю recrawl (${toCrawl.length} URL готовы)`);
  } else if (!toCrawl.length) {
    console.log("Квота исчерпана или нет URL — recrawl пропущен");
  } else {
    let ok = 0;
    let fail = 0;
    for (const url of toCrawl) {
      try {
        const result = await submitRecrawl(config.token, userId, hostId, url);
        console.log(`✓ ${url} · task=${result.task_id} · quota=${result.quota_remainder}`);
        ok += 1;
      } catch (error) {
        console.log(`✗ ${url}: ${error.message}`);
        fail += 1;
      }
    }
    console.log(`\nПереобход: ok=${ok} fail=${fail}`);
  }

  section("Итог");
  console.log("1. Добавьте важные URL в UI (список выше).");
  console.log("2. Зафиксируйте регион Москва/Россия.");
  console.log("3. Привяжите Яндекс Бизнес к сайту.");
  console.log("4. Перепроверьте фид после деплоя с Рейтинг 5.0 / 28.");
  console.log("5. Коммерческие позиции = контент + ссылки + время; Вебмастер ускоряет обход.\n");
}

main().catch((error) => {
  console.error(`Ошибка: ${error.message}`);
  process.exit(1);
});

#!/usr/bin/env node
/**
 * Boost индексации / сниппетов в Яндекс Вебмастере:
 * 1) sitemap в очередь Вебмастера
 * 2) IndexNow — уведомить Яндекс/Bing обо всех URL из sitemap
 * 3) переобход важных URL (API квота)
 * 4) статус фида услуг
 * 5) чеклист UI: важные страницы, регион, Яндекс Бизнес
 *
 *   npm run webmaster:boost
 *   yaga webmaster boost
 *
 * Important-urls нельзя добавить через API (только GET) — список печатается для UI.
 */

import {
  BITRIX_ORIGIN,
  CANONICAL_HOST,
  CANONICAL_ORIGIN,
  PARTNERS_ORIGIN,
} from "../config/domains.mjs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  ensureUserSitemap,
  getImportantUrls,
  getRecrawlQuota,
  listFeeds,
  resolveHostContext,
  submitRecrawl,
} from "./lib/yandex-webmaster.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function defaultHostBase() {
  return (process.env.YANDEX_WEBMASTER_HOST_URL || CANONICAL_ORIGIN).replace(/\/$/, "");
}

function loadImportantUrls() {
  const result = spawnSync(
    "npx",
    [
      "--yes",
      "tsx",
      "-e",
      `import { yandexImportantUrls } from "./src/lib/yandex-important-urls.ts";
       const base = process.env.YANDEX_WEBMASTER_HOST_URL || CANONICAL_ORIGIN;
       console.log(JSON.stringify(yandexImportantUrls(base)));`,
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

  const base = defaultHostBase();
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
  return paths.map((p) => (p === "/" ? `${base}/` : `${base}${p}`));
}

function loadStandaloneUrls() {
  const result = spawnSync(
    "npx",
    [
      "--yes",
      "tsx",
      "-e",
      `import { yandexImportantStandaloneUrls } from "./src/lib/yandex-important-urls.ts"; console.log(JSON.stringify(yandexImportantStandaloneUrls()));`,
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
  return [`${PARTNERS_ORIGIN}/`, `${BITRIX_ORIGIN}/`];
}

function section(title) {
  console.log(`\n══ ${title} ══`);
}

async function main() {
  const skipRecrawl = process.argv.includes("--dry-run") || process.argv.includes("--checklist");
  const { config, userId, host, hostId } = await resolveHostContext();
  const hostUrl = host.unicode_host_url || host.ascii_host_url || config.hostUrl;
  // Deep-links вида /site/{hostId}/… в новом UI дают 404.
  // Рабочие пути — без hostId; сайт выбирается в шапке Вебмастера.
  const UI = {
    sites: "https://webmaster.yandex.ru/sites/",
    dashboard: "https://webmaster.yandex.ru/site/dashboard/",
    reindex: "https://webmaster.yandex.ru/site/indexing/reindex/",
    searchable: "https://webmaster.yandex.ru/site/indexing/searchable/",
    sitemap: "https://webmaster.yandex.ru/site/indexing/sitemap/",
    mirrors: "https://webmaster.yandex.ru/site/indexing/mirrors/",
    business: "https://business.yandex.ru/",
  };

  console.log("Яндекс Вебмастер · boost индексации\n");
  console.log(`Сайт:    ${hostUrl}`);
  console.log(`host_id: ${hostId}`);

  section("Sitemap");
  const sitemapUrl = `${defaultHostBase()}/sitemap.xml`;
  try {
    const sm = await ensureUserSitemap(config.token, userId, hostId, sitemapUrl);
    if (sm.already) console.log(`✓ ${sitemapUrl} уже в очереди Вебмастера`);
    else console.log(`✓ ${sitemapUrl} добавлен (id: ${sm.sitemap_id || sm.match?.sitemap_id || "?"})`);
  } catch (error) {
    console.log(`! Sitemap: ${error.message}`);
    console.log(`  Добавьте вручную: npm run webmaster:sitemap · UI: ${UI.sitemap}`);
  }

  section("IndexNow");
  if (skipRecrawl) {
    console.log("--checklist: пропускаю IndexNow");
  } else {
    const indexnow = spawnSync(process.execPath, [join(root, "scripts", "indexnow-submit.mjs")], {
      cwd: root,
      encoding: "utf8",
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    const out = `${indexnow.stdout || ""}${indexnow.stderr || ""}`.trim();
    if (out) console.log(out);
    if (indexnow.status !== 0) {
      console.log(`! IndexNow завершился с кодом ${indexnow.status}`);
      console.log("  Повтор: yaga webmaster indexnow · npm run seo:indexnow");
    }
  }

  const urls = loadImportantUrls();
  const standalone = loadStandaloneUrls();
  section("Важные URL для www (добавить в UI — только этот хост)");
  console.log(`Список (${urls.length}) — скопируйте в Вебмастер www:`);
  for (const url of urls) console.log(`  ${url}`);
  console.log(`
Как добавить (UI, без deep-link с hostId — они 404):
  1. Откройте ${UI.sites}
  2. Выберите ${CANONICAL_ORIGIN}/
  3. Меню: Индексирование → Мониторинг важных страниц
     (или на ${UI.reindex} отметьте URL «Отслеживать»)
  Не добавляйте partners./bitrix. сюда — Вебмастер отклонит чужой хост.
`);

  section("Микросайты (отдельные хосты в Вебмастере)");
  console.log("Добавляйте только открыв соответствующий сайт в списке:");
  for (const url of standalone) console.log(`  ${url}  → свой host в ${UI.sites}`);
  console.log("");

  try {
    const existing = await getImportantUrls(config.token, userId, hostId);
    const list = Array.isArray(existing) ? existing : existing?.urls || [];
    console.log(`Сейчас в Вебмастере отслеживается: ${list.length}`);
  } catch (error) {
    console.log(`Не удалось прочитать important-urls: ${error.message}`);
  }

  section("Региональность (только UI / Яндекс Бизнес)");
  console.log(`Москва задаётся так:
  1. ${UI.sites} → выберите ${CANONICAL_HOST}
  2. Представление в поиске → Региональность → Москва
     ИЛИ привяжите организацию в Яндекс Бизнес (регион подтянется сам):
     ${UI.business}
`);

  section("Яндекс Бизнес / Справочник (только UI)");
  console.log(`Карточка организации со сайтом ${CANONICAL_ORIGIN}/`);
  console.log(`  ${UI.business}`);

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
  console.log(`UI переобход/фиды: ${UI.reindex} · ${UI.dashboard}`);
  console.log("После деплоя нажмите «Перепроверить» у фида.");

  section("Валидатор микроразметки (только UI)");
  console.log(`https://webmaster.yandex.ru/tools/microtest/
  Schema.org / JSON-LD, Open Graph, microdata, микроформаты, RDFa.
  Локальный снимок + список URL: npm run webmaster:microtest
`);

  section("Свежее и актуальное (RSS)");
  console.log(`Фид: ${CANONICAL_ORIGIN}/rss.xml
  Вебмастер → Представление в поиске → Свежее и актуальное → загрузить RSS.
  Docs: https://yandex.ru/support/webmaster/ru/search-appearance/fresh-content
`);

  section("Переобход приоритетных URL");
  const quota = await getRecrawlQuota(config.token, userId, hostId);
  const remaining = Number(quota.quota_remainder ?? quota.daily_quota_remainder ?? 0);
  console.log(`Квота: осталось ${remaining} / день ${quota.daily_quota ?? "?"}`);

  const primaryHostname = (() => {
    try {
      return new URL(hostUrl).hostname.toLowerCase();
    } catch {
      return CANONICAL_HOST;
    }
  })();
  const wwwUrls = urls.filter((u) => {
    try {
      const host = new URL(u).hostname.toLowerCase();
      return (
        host === primaryHostname ||
        host === primaryHostname.replace(/^www\./, "") ||
        `www.${host}` === primaryHostname
      );
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
  console.log("1. Sitemap в Вебмастере + IndexNow уже отправлены (см. выше).");
  console.log("2. Добавьте важные URL в UI (список выше).");
  console.log("3. Зафиксируйте регион Москва/Россия.");
  console.log("4. Привяжите Яндекс Бизнес к сайту.");
  console.log("5. Перепроверьте фид после деплоя.");
  console.log("6. Метрика на сайте ускоряет обход популярных страниц.\n");
}

main().catch((error) => {
  console.error(`Ошибка: ${error.message}`);
  process.exit(1);
});

#!/usr/bin/env node
/**
 * Чеклист «Как улучшить позиции сайта в поиске» через API Яндекс Вебмастера.
 *
 * Покрывает: качество/ИКС, безопасность (diagnostics), региональность,
 * индексацию, важные страницы, популярные запросы, квоту переобхода.
 *
 *   yaga webmaster seo
 *   npm run webmaster:seo
 */

import {
  daysAgoIso,
  getHostDiagnostics,
  getHostSummary,
  getImportantUrls,
  getIndexingHistory,
  getPopularQueries,
  getRecrawlQuota,
  getSearchUrlsInSearchHistory,
  getSitemaps,
  getSqiHistory,
  latestSeriesValue,
  resolveHostContext,
} from "./lib/yandex-webmaster.mjs";

const PROBLEM_HINTS = {
  THREATS: "Безопасность и нарушения → исправьте угрозы в Вебмастере",
  CONNECT_FAILED: "Робот не достучался до сайта — проверьте сервер / firewall",
  DISALLOWED_IN_ROBOTS: "Сайт закрыт в robots.txt",
  DNS_ERROR: "Ошибка DNS",
  MAIN_PAGE_ERROR: "Главная отдаёт ошибку",
  SSL_CERTIFICATE_ERROR: "Проблема с SSL",
  SLOW_AVG_RESPONSE_TIME: "Медленный ответ сервера",
  NO_SITEMAPS: "Нет Sitemap в обходе — проверьте /sitemap.xml",
  ERRORS_IN_SITEMAPS: "Ошибки в Sitemap",
  NO_ROBOTS_TXT: "Нет robots.txt",
  ERROR_IN_ROBOTS_TXT: "Ошибки в robots.txt",
  NO_REGIONS: "Задайте регион: Представление в поиске → Региональность",
  NOT_MOBILE_FRIENDLY: "Сайт не мобильный — улучшите адаптив",
  NOT_IN_SPRAV: "Зарегистрируйте организацию в Яндекс Бизнес / Справочник",
  NO_METRIKA_COUNTER: "Проблема со счётчиком Метрики",
  NO_METRIKA_COUNTER_BINDING: "Привяжите Метрику к сайту в Вебмастере",
  NO_METRIKA_COUNTER_CRAWL_ENABLED: "Включите обход по счётчику Метрики",
  DOCUMENTS_MISSING_TITLE: "Много страниц без title",
  DOCUMENTS_MISSING_DESCRIPTION: "Много страниц без description",
  DUPLICATE_PAGES: "Дубли страниц",
  DUPLICATE_CONTENT_ATTRS: "Одинаковые title/description",
  MAIN_MIRROR_IS_NOT_HTTPS: "Главное зеркало не HTTPS",
};

const SEVERITY_ORDER = ["FATAL", "CRITICAL", "POSSIBLE_PROBLEM", "RECOMMENDATION"];

function ok(msg) {
  console.log(`  ✓ ${msg}`);
}
function warn(msg) {
  console.log(`  ! ${msg}`);
}
function fail(msg) {
  console.log(`  ✗ ${msg}`);
}
function info(msg) {
  console.log(`  · ${msg}`);
}

function section(title) {
  console.log(`\n══ ${title} ══`);
}

function presentProblems(diagnostics) {
  const problems = diagnostics?.problems || {};
  return Object.entries(problems)
    .filter(([, meta]) => meta?.state === "PRESENT")
    .map(([code, meta]) => ({ code, ...meta }))
    .sort(
      (a, b) =>
        SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity) ||
        a.code.localeCompare(b.code),
    );
}

function printProblems(list) {
  if (!list.length) {
    ok("Активных проблем в диагностике нет");
    return;
  }
  for (const p of list) {
    const hint = PROBLEM_HINTS[p.code] || "";
    const line = `${p.severity}: ${p.code}${hint ? ` — ${hint}` : ""}`;
    if (p.severity === "FATAL" || p.severity === "CRITICAL") fail(line);
    else if (p.severity === "POSSIBLE_PROBLEM") warn(line);
    else info(line);
  }
}

async function safe(label, fn) {
  try {
    return await fn();
  } catch (error) {
    warn(`${label}: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log("Яндекс Вебмастер · чеклист позиций в поиске\n");

  const { config, userId, host, hostId } = await resolveHostContext();
  const hostUrl = host.unicode_host_url || host.ascii_host_url || config.hostUrl;
  console.log(`Сайт:    ${hostUrl}`);
  console.log(`host_id: ${hostId}`);
  console.log(`user_id: ${userId}`);
  if (host.verified) ok("Права на сайт подтверждены");
  else fail("Права на сайт не подтверждены");

  const uiBase = `https://webmaster.yandex.ru/site/${encodeURIComponent(hostId)}`;

  // —— Качество / безопасность / польза (ИКС) ——
  section("Качество · безопасность · ИКС");
  const summary = await safe("summary", () => getHostSummary(config.token, userId, hostId));
  if (summary) {
    ok(`ИКС (индекс качества): ${summary.sqi ?? "н/д"}`);
    info(`Страниц в поиске: ${summary.searchable_pages_count ?? "н/д"}`);
    info(`Исключено из поиска: ${summary.excluded_pages_count ?? "н/д"}`);
    const probs = summary.site_problems || {};
    info(
      `Проблемы: FATAL=${probs.FATAL || 0} CRITICAL=${probs.CRITICAL || 0} POSSIBLE=${probs.POSSIBLE_PROBLEM || 0} REC=${probs.RECOMMENDATION || 0}`,
    );
  }

  const sqiPoints = await safe("sqi-history", () =>
    getSqiHistory(config.token, userId, hostId, { dateFrom: daysAgoIso(90) }),
  );
  if (sqiPoints?.length) {
    const first = sqiPoints[0]?.value;
    const last = latestSeriesValue(sqiPoints);
    info(`ИКС за ~90 дней: ${first} → ${last} (${sqiPoints.length} точек)`);
  }

  const diagnostics = await safe("diagnostics", () =>
    getHostDiagnostics(config.token, userId, hostId),
  );
  const present = presentProblems(diagnostics);
  printProblems(present);

  const security = present.filter((p) => p.code === "THREATS" || p.severity === "FATAL");
  if (!security.length && diagnostics) ok("Фатальных угроз безопасности нет");

  // —— Удобство / региональность ——
  section("Удобство · региональность");
  const region = present.find((p) => p.code === "NO_REGIONS");
  const mobile = present.find((p) => p.code === "NOT_MOBILE_FRIENDLY");
  const sprav = present.find((p) => p.code === "NOT_IN_SPRAV");
  if (region) fail("Регион не задан — укажите в Вебмастере");
  else ok("Регион: диагностика NO_REGIONS не активна");
  if (mobile) warn("Сайт не помечен как mobile-friendly");
  else ok("Mobile-friendly: замечаний нет");
  if (sprav) warn("Сайт не в Яндекс Бизнес / Справочнике");
  else info("Справочник: NOT_IN_SPRAV не активна");
  info(`UI региональность: ${uiBase}/search/regions/`);

  // —— Индексация ——
  section("Индексация · обход");
  const sitemaps = await safe("sitemaps", () => getSitemaps(config.token, userId, hostId));
  if (sitemaps) {
    if (sitemaps.length) {
      ok(`Sitemap в Вебмастере: ${sitemaps.length}`);
      for (const sm of sitemaps.slice(0, 5)) {
        info(`${sm.sitemap_url || sm.url || sm.sitemap_id} · errors=${sm.errors_count ?? "?"} · urls=${sm.urls_count ?? "?"}`);
      }
    } else {
      warn("Список Sitemap пуст — проверьте отдачу /sitemap.xml");
    }
  }

  const from30 = daysAgoIso(30);
  const indexing = await safe("indexing/history", () =>
    getIndexingHistory(config.token, userId, hostId, { dateFrom: from30 }),
  );
  if (indexing?.indicators) {
    for (const [code, points] of Object.entries(indexing.indicators)) {
      const v = latestSeriesValue(points);
      if (v != null) info(`Обход ${code}: последний день = ${v}`);
    }
  }

  const inSearch = await safe("search-urls/in-search", () =>
    getSearchUrlsInSearchHistory(config.token, userId, hostId, { dateFrom: from30 }),
  );
  if (inSearch?.indicators || inSearch?.history) {
    const series =
      inSearch.indicators?.SEARCHABLE ||
      inSearch.indicators?.ALL ||
      inSearch.history ||
      Object.values(inSearch.indicators || {})[0];
    const v = latestSeriesValue(Array.isArray(series) ? series : null);
    if (v != null) info(`Страниц в поиске (история): ${v}`);
    else info(`search-urls ответ: ${JSON.stringify(inSearch).slice(0, 180)}…`);
  }

  info(`UI статистика обхода: ${uiBase}/indexing/`);

  // —— Важные страницы ——
  section("Мониторинг важных страниц");
  const important = await safe("important-urls", () =>
    getImportantUrls(config.token, userId, hostId),
  );
  if (important) {
    if (!important.length) {
      warn("Важные страницы не настроены — добавьте /, /services, ключевые лендинги в UI");
      info(`UI: ${uiBase}/indexing/important/`);
    } else {
      ok(`Отслеживается URL: ${important.length}`);
      for (const row of important.slice(0, 12)) {
        const http = row.indexing_status?.http_code ?? row.indexing_status?.status ?? "?";
        const searchable = row.search_status?.searchable;
        const mark = searchable === false ? "✗" : searchable ? "✓" : "·";
        console.log(
          `  ${mark} ${row.url} · HTTP ${http} · в поиске=${searchable ?? "?"} ${
            row.search_status?.excluded_url_status && row.search_status.excluded_url_status !== "NOTHING_FOUND"
              ? `· ${row.search_status.excluded_url_status}`
              : ""
          }`,
        );
      }
    }
  }

  // —— Представление / запросы ——
  section("Представление в поиске · запросы");
  const popular = await safe("search-queries/popular", () =>
    getPopularQueries(config.token, userId, hostId, { limit: 12 }),
  );
  if (popular?.queries?.length) {
    ok(`Популярные запросы (${popular.date_from || "?"} → ${popular.date_to || "?"}):`);
    for (const q of popular.queries) {
      const ind = q.indicators || {};
      console.log(
        `    ${q.query_text} · показы=${ind.TOTAL_SHOWS ?? "?"} клики=${ind.TOTAL_CLICKS ?? "?"} поз=${ind.AVG_SHOW_POSITION ?? "?"}`,
      );
    }
  } else if (popular) {
    info("Популярных запросов пока нет (мало данных или сайт молодой)");
  }
  info(`UI представление: ${uiBase}/search/`);

  // —— Переобход ——
  section("Переобход URL");
  const quota = await safe("recrawl/quota", () => getRecrawlQuota(config.token, userId, hostId));
  if (quota) {
    ok(
      `Квота переобхода: осталось ${quota.quota_remainder ?? quota.daily_quota_remainder ?? "?"} / день ${quota.daily_quota ?? "?"}`,
    );
  }
  info("Отправить URL: yaga webmaster recrawl https://www.bober-ai.dev/…");

  // —— Итог ——
  section("Итог");
  const fatalCount = present.filter((p) => p.severity === "FATAL").length;
  const criticalCount = present.filter((p) => p.severity === "CRITICAL").length;
  if (fatalCount || criticalCount) {
    fail(`Нужно исправить: FATAL=${fatalCount}, CRITICAL=${criticalCount}`);
    console.log(`\nДиагностика UI: ${uiBase}/diagnosis/\n`);
    process.exit(1);
  }
  ok("Критических блокеров позиций по API нет");
  console.log(`\nПолная диагностика: ${uiBase}/diagnosis/`);
  console.log("Метрика (поведение): yaga metrika status\n");
}

main().catch((error) => {
  console.error(`\nОшибка: ${error.message}`);
  process.exit(1);
});

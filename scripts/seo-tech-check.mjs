#!/usr/bin/env node

/**
 * Технический SEO smoke-check (live).
 *
 *   npm run seo:tech
 *
 * Проверяет: robots.txt, sitemap.xml, канон www, 301 apex→www,
 * 200 на посадочных, наличие title/description/canonical/JSON-LD.
 *
 * Не заменяет Яндекс Вебмастер — для диагностики API: npm run webmaster:seo
 */

import {
  APEX_ORIGIN,
  CANONICAL_APEX,
  CANONICAL_ORIGIN,
  LEGACY_APEX,
} from "../config/domains.mjs";
import fetch from "./lib/fetch.mjs";

const SITE = (
  process.env.YANDEX_WEBMASTER_HOST_URL ||
  process.env.PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  CANONICAL_ORIGIN
).replace(/\/$/, "");
const APEX = APEX_ORIGIN;
const ALLOWED_HOST_MARKERS = [CANONICAL_APEX, LEGACY_APEX];

const LANDINGS = [
  "/",
  "/services",
  "/pricing",
  "/about",
  "/faq",
  "/automation",
  "/automation/sales",
  "/automation/documents",
  "/integrations/bitrix24",
  "/info",
  "/llms.txt",
  "/llm.txt",
  "/info.md",
  "/rss.xml",
  "/robots.txt",
  "/sitemap.xml",
];

let failed = 0;

function ok(msg) {
  console.log(`  ✓ ${msg}`);
}
function fail(msg) {
  failed += 1;
  console.log(`  ✗ ${msg}`);
}
function section(title) {
  console.log(`\n══ ${title} ══`);
}

async function head(url, { redirect = "manual" } = {}) {
  const res = await fetch(url, { method: "GET", redirect });
  const text = await res.text();
  const location = res.headers?.get?.("location") || "";
  return { status: res.status, text, location, headers: res.headers };
}

async function checkRobots() {
  section("robots.txt");
  const res = await head(`${SITE}/robots.txt`);
  if (res.status !== 200) {
    fail(`HTTP ${res.status}`);
    return;
  }
  ok("HTTP 200");
  if (!/User-Agent:\s*\*/i.test(res.text)) fail("нет User-Agent: *");
  else ok("User-Agent: *");
  if (!/Allow:\s*\//i.test(res.text)) fail("нет Allow: /");
  else ok("Allow: /");
  if (!/Disallow:\s*\/api\//i.test(res.text)) fail("нет Disallow: /api/");
  else ok("Disallow: /api/");
  if (!new RegExp(`Host:\\s*${SITE.replace("https://", "")}`, "i").test(res.text)) {
    fail(`Host должен быть ${SITE.replace("https://", "")}`);
  } else ok(`Host: ${SITE.replace("https://", "")}`);
  if (!res.text.includes(`${SITE}/sitemap.xml`)) fail("Sitemap URL не канонический");
  else ok("Sitemap → www");
  const yandexBlock = res.text.match(/User-agent:\s*Yandex\b[\s\S]*?(?=\nUser-agent:|\nHost:|\nSitemap:|$)/i)?.[0] || "";
  if (!/Allow:\s*\//i.test(yandexBlock)) {
    fail("секция User-agent: Yandex должна содержать Allow: /");
  } else ok("Yandex Allow: /");
  if (!/Clean-param:/i.test(res.text)) fail("нет Clean-param");
  else ok("Clean-param");
}

async function checkSitemap() {
  section("sitemap.xml");
  const res = await head(`${SITE}/sitemap.xml`);
  if (res.status !== 200) {
    fail(`HTTP ${res.status}`);
    return;
  }
  ok("HTTP 200");
  const locs = [...res.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.length < 50) fail(`мало URL: ${locs.length}`);
  else ok(`${locs.length} URL`);
  if (!locs.includes(SITE) && !locs.includes(`${SITE}/`)) fail("нет главной в sitemap");
  else ok("главная в sitemap");
  const badHost = locs.filter((u) => !ALLOWED_HOST_MARKERS.some((marker) => u.includes(marker)));
  if (badHost.length) fail(`чужие хосты: ${badHost.slice(0, 3).join(", ")}`);
  else ok("все loc на bober-systems.ru / www.bober-systems.ru / microsites");
  const trailingHome = locs.includes(`${SITE}/`) && !locs.includes(SITE);
  if (trailingHome) fail("главная в sitemap со слэшем — лучше без (как absoluteUrl)");
}

async function checkCanonicalHost() {
  section("канон и 301");
  const apex = await head(`${APEX}/`, { redirect: "manual" });
  if (apex.status === 301 || apex.status === 302) {
    const loc = apex.location || "";
    const okLoc =
      new RegExp(`^${CANONICAL_ORIGIN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/?(\\?.*)?$`, 'i').test(loc) &&
      !/:\d+/.test(loc);
    if (okLoc) {
      ok(`apex → ${loc} (${apex.status})`);
    } else {
      fail(`плохой Location: ${loc || "(пусто)"} — нужен ${CANONICAL_ORIGIN}/ без порта`);
    }
  } else {
    fail(`apex HTTP ${apex.status}, ожидали 301`);
  }

  const www = await head(`${SITE}/`);
  if (www.status === 200) ok("www/ → 200");
  else fail(`www/ → ${www.status}`);
}

async function checkPages() {
  section("посадочные (200 + meta + schema)");
  for (const path of LANDINGS) {
    const url = path.startsWith("http") ? path : `${SITE}${path}`;
    const res = await head(url);
    if (res.status !== 200) {
      fail(`${path} → ${res.status}`);
      continue;
    }

    if (path.endsWith(".txt") || path.endsWith(".xml")) {
      ok(`${path} → 200`);
      continue;
    }

    const title = res.text.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() || "";
    const desc =
      res.text.match(/name=["']description["']\s+content=["']([^"']*)["']/i)?.[1] ||
      res.text.match(/content=["']([^"']*)["']\s+name=["']description["']/i)?.[1] ||
      "";
    const canonical =
      res.text.match(/rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1] ||
      res.text.match(/href=["']([^"']+)["']\s+rel=["']canonical["']/i)?.[1] ||
      "";
    const hasLd = /application\/ld\+json/i.test(res.text);
    const problems = [];
    if (!title) problems.push("no title");
    if (!desc) problems.push("no description");
    if (!canonical) problems.push("no canonical");
    else if (!canonical.startsWith(SITE)) problems.push(`canonical off-host: ${canonical}`);
    else if (canonical.endsWith("/") && canonical !== `${SITE}/`) {
      // allow only if somehow root with slash — we prefer no slash
    }
    if (path === "/" || path === "") {
      if (canonical !== SITE && canonical !== `${SITE}/`) {
        problems.push(`home canonical=${canonical}`);
      }
    }
    if (!hasLd && !path.includes("/info")) problems.push("no JSON-LD");

    if (problems.length) fail(`${path}: ${problems.join("; ")}`);
    else ok(`${path} · «${title.slice(0, 48)}»`);
  }
}

async function checkLegacyRedirect() {
  section("legacy 301");
  const res = await head(`${SITE}/services/ai-kp-agent`, { redirect: "manual" });
  if ((res.status === 301 || res.status === 308) && /sales-ai-agent/.test(res.location)) {
    ok(`ai-kp-agent → ${res.location}`);
  } else if (res.status === 200) {
    // Next may resolve client-side; follow once
    fail(`ai-kp-agent → ${res.status} (ожидали 301 на sales-ai-agent)`);
  } else {
    fail(`ai-kp-agent → ${res.status} ${res.location || ""}`);
  }
}

async function main() {
  console.log(`Технический SEO · ${SITE}\n`);
  await checkRobots();
  await checkSitemap();
  await checkCanonicalHost();
  await checkPages();
  await checkLegacyRedirect();

  console.log(`\n${failed === 0 ? "Готово — критичных ошибок нет." : `Готово — ошибок: ${failed}`}`);
  console.log("Вебмастер API: npm run webmaster:seo");
  if (failed) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

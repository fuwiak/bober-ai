#!/usr/bin/env node
/**
 * Post-deploy SEO indexing validation (local or against live origin).
 * Usage: node scripts/seo-index-validate.mjs [https://www.bober-systems.ru]
 */
import { CANONICAL_ORIGIN } from "../config/domains.mjs";

const ORIGIN = (process.argv[2] || process.env.PUBLIC_SITE_URL || CANONICAL_ORIGIN).replace(/\/$/, "");
const failures = [];
const notes = [];

function fail(msg) {
  failures.push(msg);
  console.error(`✗ ${msg}`);
}
function ok(msg) {
  notes.push(msg);
  console.log(`✓ ${msg}`);
}

async function fetchText(path, opts = {}) {
  const res = await fetch(`${ORIGIN}${path}`, {
    redirect: opts.redirect || "manual",
    headers: { "user-agent": "bober-seo-validate/1.0" },
  });
  const text = opts.skipBody ? "" : await res.text();
  return { res, text, status: res.status, location: res.headers.get("location") || "" };
}

function pick(re, html) {
  const m = html.match(re);
  return m ? m[1] : "";
}

async function main() {
  console.log(`Validating ${ORIGIN}\n`);

  const sm = await fetchText("/sitemap.xml");
  if (sm.status !== 200) fail(`sitemap.xml HTTP ${sm.status}`);
  else ok("sitemap.xml 200");

  if (sm.text.includes("<sitemapindex")) {
    fail("sitemap.xml is still a sitemapindex — expect full urlset");
  } else if (sm.text.includes("<urlset")) {
    ok("sitemap.xml is urlset");
  }

  const locs = [...sm.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  ok(`sitemap url count: ${locs.length}`);
  if (!locs.some((u) => u === `${ORIGIN}/` || u === `${ORIGIN}`)) fail("homepage missing from sitemap");
  if (locs.some((u) => u.includes("/uz"))) fail("sitemap contains /uz");
  if (locs.some((u) => u.includes("/order"))) fail("sitemap contains /order");
  if (locs.some((u) => /[?&](utm_|yclid)/i.test(u))) fail("sitemap contains tracking params");

  // Sample sitemap URLs
  const sample = locs.slice(0, Math.min(25, locs.length));
  for (const loc of sample) {
    const path = loc.replace(ORIGIN, "") || "/";
    const { status, text } = await fetchText(path, { redirect: "follow" });
    if (status !== 200) {
      fail(`sitemap URL ${path} → HTTP ${status}`);
      continue;
    }
    const robots = pick(/name=["']robots["']\s+content=["']([^"']+)["']/i, text) ||
      pick(/content=["']([^"']+)["']\s+name=["']robots["']/i, text);
    if (/noindex/i.test(robots)) fail(`sitemap URL ${path} has noindex (${robots})`);
    const canonical = pick(/rel=["']canonical["']\s+href=["']([^"']+)["']/i, text) ||
      pick(/href=["']([^"']+)["']\s+rel=["']canonical["']/i, text);
    const expected = path === "/" ? `${ORIGIN}/` : `${ORIGIN}${path}`;
    const canonNorm = canonical.replace(/\/$/, "") || "";
    const expNorm = expected.replace(/\/$/, "");
    if (canonNorm && canonNorm !== expNorm && canonical !== expected) {
      fail(`sitemap URL ${path} canonical=${canonical} (want self ${expected})`);
    }
  }

  // UZ redirects
  for (const p of ["/uz", "/uz/automation", "/uz/services/n8n", "/uz/guides"]) {
    const { status, location } = await fetchText(p, { redirect: "manual", skipBody: true });
    if (status !== 301 && status !== 308) fail(`${p} → ${status} (want 301), location=${location}`);
    else ok(`${p} → ${status} ${location}`);
  }

  // order noindex
  const order = await fetchText("/order/rag");
  if (order.status !== 200) fail(`/order/rag HTTP ${order.status}`);
  else {
    const robots = pick(/name=["']robots["']\s+content=["']([^"']+)["']/i, order.text);
    if (!/noindex/i.test(robots) || !/follow/i.test(robots)) fail(`/order/rag robots=${robots}`);
    else ok(`/order/rag noindex,follow`);
  }

  // audit title
  const audit = await fetchText("/audit");
  const title = pick(/<title>([^<]*)<\/title>/i, audit.text);
  if (/pages\.audit/i.test(title)) fail(`audit title still pages.audit`);
  else ok(`audit title: ${title.slice(0, 80)}`);

  // commercial 301 samples
  for (const [from, to] of [
    ["/ai/private-llm", "/secure-ai"],
    ["/integrations/bitrix24", "/bitrix"],
    ["/solutions/rag-search", "/services/rag"],
    ["/kz/portfolio/kaspersky-ai-assistant", "/portfolio/kaspersky-ai-assistant"],
  ]) {
    const { status, location } = await fetchText(from, { redirect: "manual", skipBody: true });
    if (status !== 301 && status !== 308) fail(`${from} → ${status} (want 301)`);
    else if (!location.includes(to)) fail(`${from} → ${location} (want *${to}*)`);
    else ok(`${from} → ${status} …${to}`);
  }

  // robots.txt
  const robotsTxt = await fetchText("/robots.txt");
  if (/Disallow:\s*\/uz/i.test(robotsTxt.text)) fail("robots.txt still Disallow /uz");
  else ok("robots.txt does not block /uz");
  if (!/Sitemap:\s*https:\/\/www\.bober-systems\.ru\/sitemap\.xml/i.test(robotsTxt.text)) {
    fail("robots.txt missing Sitemap line");
  } else ok("robots.txt Sitemap OK");

  console.log(`\n${failures.length ? "FAIL" : "PASS"} — ${failures.length} failure(s), ${notes.length} checks`);
  process.exit(failures.length ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

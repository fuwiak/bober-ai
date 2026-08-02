#!/usr/bin/env node
/**
 * Generate sitemap index + section sitemaps from Astro dist/client after build.
 * Start-up policy for a new domain: RU commercial core only — no /en, no thin SEO sprawl.
 * Usage: node scripts/generate-sitemap.mjs
 */
import { CANONICAL_ORIGIN } from "../config/domains.mjs";
import { readdir, writeFile, stat, mkdir } from "node:fs/promises";
import { join, relative, dirname } from "node:path";

const SITE = process.env.PUBLIC_SITE_URL || CANONICAL_ORIGIN;
const ROOT = join(process.cwd(), "dist/client");
const INCLUDE_MARKETS = process.env.SITEMAP_INCLUDE_MARKETS !== "0";
/** Soft cap — prefer quality over programmatic SEO volume on a new domain. */
const MAX_URLS = Number(process.env.SITEMAP_MAX_URLS || 80);
/** Cap blog/guides/academy share so commercial pages stay first. */
const MAX_BLOG_URLS = Number(process.env.SITEMAP_MAX_BLOG || 20);

/** Always-include commercial / trust URLs (RU + KZ hub only). */
const PRIORITY_PATHS = [
  "/",
  "/kz",
  "/kz/pricing",
  "/about",
  "/pricing",
  "/services",
  "/portfolio",
  "/audit",
  "/ii-dlya-biznesa",
  "/secure-ai",
  "/partners",
  "/certificates",
  "/media",
  "/faq",
  "/guides",
  "/blog",
  "/process-review",
  "/white-label",
  "/bitrix",
  "/kaspersky",
  "/info",
];

/** Blog / academy slugs worth indexing early (extend later). */
const PRIORITY_BLOG_PREFIXES = ["/blog/", "/academy/", "/portfolio/"];

/** Sections for sitemap split. */
const SECTIONS = {
  core: { name: "sitemap-core.xml", test: (p) => PRIORITY_PATHS.includes(p) || p === "/" },
  services: {
    name: "sitemap-services.xml",
    test: (p) =>
      p.startsWith("/services/") ||
      p.startsWith("/automation/") ||
      p.startsWith("/integrations/") ||
      p.startsWith("/solutions/") ||
      p.startsWith("/industries/") ||
      p.startsWith("/secure-ai") ||
      p.startsWith("/kaspersky"),
  },
  portfolio: {
    name: "sitemap-portfolio.xml",
    test: (p) => p.startsWith("/portfolio"),
  },
  blog: {
    name: "sitemap-blog.xml",
    test: (p) => p.startsWith("/blog") || p.startsWith("/guides") || p.startsWith("/academy") || p.startsWith("/media"),
  },
};

async function walk(dir, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith("_") || entry.name === "api") continue;
      await walk(full, out);
    } else if (entry.name === "index.html") {
      out.push(full);
    }
  }
  return out;
}

function pathFromFile(file) {
  const rel = relative(ROOT, file).replace(/\\/g, "/");
  let path = "/" + rel.replace(/\/index\.html$/, "").replace(/^index\.html$/, "");
  if (path === "/") return "/";
  return path.replace(/\/$/, "") || "/";
}

/** Keep in sync with src/lib/seo-index-policy.ts (Node sitemap cannot import TS aliases). */
const NOINDEX_PREFIXES = [
  "/integrations/bitrix24",
  "/integrations/bitrix24-ai",
  "/integrations/bitrix24-sales-automation",
  "/integrations/crm",
  "/integrations/crm-automation",
  "/integrations/ai-for-crm",
  "/services/corporate-ai-agent-1c-crm",
  "/services/rag-search",
  "/solutions/rag-search",
  "/services/knowledge-base",
  "/solutions/knowledge-base",
  "/solutions/knowledge-chatbot",
  "/services/enterprise-ai-assistant",
  "/solutions/assistant",
  "/services/self-hosted-ai",
  "/services/private-llm-gigachat",
  "/services/corporate-neural-net",
  "/services/secure-private-ai-cloud",
  "/ai/corporate-neural-net",
  "/ai/private-llm",
  "/ai/corporate",
  "/services/ai-agent",
  "/services/sales-ai-agent",
  "/services/ai-automation",
  "/ai/ai-agents",
  "/services/langgraph",
  "/services/mcp",
  "/services/n8n",
  "/services/open-webui",
];

const NOINDEX_AUTOMATION_EXTRA = new Set([
  "order-processing",
  "payment-control",
  "inventory-requests",
  "meeting-notes",
  "email-triage",
  "contract-registry",
  "access-requests",
  "partner-leads",
  "field-reports",
  "quality-checklists",
  "whatsapp-crm",
  "avito-leads",
  "google-sheets-sync",
  "yandex-metrica-crm",
  "telephony-crm",
  "messengers-hub",
  "employee-assistant",
  "manager-copilot",
  "document-qa",
  "onboarding-bot",
]);

function isNoIndexCommercial(path) {
  if (NOINDEX_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`))) return true;
  const m = path.match(/^\/automation\/([^/]+)$/);
  if (m && NOINDEX_AUTOMATION_EXTRA.has(m[1])) return true;
  return false;
}

function isExcluded(path) {
  // Legacy EN redirects — never index.
  if (path === "/en" || path.startsWith("/en/")) return true;
  // Ghost contact URL — redirects to /#contact.
  if (path === "/contact" || path.startsWith("/contact/")) return true;
  // KZ: only hub + pricing until deeper localization ships.
  if (path.startsWith("/kz/") && path !== "/kz/pricing") return true;
  // UZ: hold out of sitemap until Uzbek content is finished.
  if (path === "/uz" || path.startsWith("/uz/")) return true;
  if (!INCLUDE_MARKETS && (path === "/kz" || path.startsWith("/kz/"))) return true;
  if (path.includes("/amocrm") || path.includes("/bitrix24") || path.includes("/cases/")) return true;
  if (path === "/ru" || path.startsWith("/ru/")) return true;
  if (path.startsWith("/api/")) return true;
  // Cannibalizing / thin Wordstat landings — see seo-index-policy.ts
  if (isNoIndexCommercial(path)) return true;
  return false;
}

function priorityScore(path) {
  if (PRIORITY_PATHS.includes(path)) return 1000 - PRIORITY_PATHS.indexOf(path);
  if (PRIORITY_BLOG_PREFIXES.some((p) => path.startsWith(p))) return 500;
  if (path.startsWith("/services/")) return 400;
  if (path.startsWith("/integrations/") || path.startsWith("/automation/")) return 200;
  if (path.startsWith("/industries/") || path.startsWith("/solutions/")) return 100;
  return 50;
}

function sectionFor(path) {
  for (const [key, section] of Object.entries(SECTIONS)) {
    if (section.test(path)) return key;
  }
  return "core";
}

function urlXml(loc, lastmod) {
  const mod = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "";
  return `  <url>\n    <loc>${loc}</loc>${mod}\n  </url>`;
}

const files = await walk(ROOT);
const entries = [];

for (const file of files) {
  const path = pathFromFile(file);
  if (isExcluded(path)) continue;
  let lastmod = null;
  try {
    const st = await stat(file);
    lastmod = st.mtime.toISOString().slice(0, 10);
  } catch {
    /* ignore */
  }
  entries.push({ path, loc: path === "/" ? `${SITE}/` : `${SITE}${path}`, lastmod, score: priorityScore(path) });
}

/** SSR/on-demand routes not present as dist/client HTML. */
const EXTRA_SSR_PATHS = ["/news", "/outages", "/tel"];
const today = new Date().toISOString().slice(0, 10);
for (const path of EXTRA_SSR_PATHS) {
  if (isExcluded(path)) continue;
  entries.push({ path, loc: `${SITE}${path}`, lastmod: today, score: 80 });
}

entries.sort((a, b) => b.score - a.score || a.path.localeCompare(b.path));

const seen = new Set();
const limited = [];
let blogCount = 0;
for (const e of entries) {
  if (seen.has(e.path)) continue;
  const isBlog = SECTIONS.blog.test(e.path) && !PRIORITY_PATHS.includes(e.path);
  if (isBlog && blogCount >= MAX_BLOG_URLS) continue;
  seen.add(e.path);
  limited.push(e);
  if (isBlog) blogCount += 1;
  if (limited.length >= MAX_URLS) break;
}

/** Ensure priority paths stay even if they scored low somehow. */
for (const path of PRIORITY_PATHS) {
  if (seen.has(path) || isExcluded(path)) continue;
  const file = path === "/" ? join(ROOT, "index.html") : join(ROOT, path.slice(1), "index.html");
  let lastmod = today;
  try {
    lastmod = (await stat(file)).mtime.toISOString().slice(0, 10);
  } catch {
    /* may not exist yet */
  }
  if (limited.length >= MAX_URLS) limited.pop();
  limited.push({ path, loc: path === "/" ? `${SITE}/` : `${SITE}${path}`, lastmod, score: 999 });
  seen.add(path);
}

const bySection = { core: [], services: [], portfolio: [], blog: [] };
for (const e of limited) {
  bySection[sectionFor(e.path)].push(e);
}

async function writeBoth(relPath, body) {
  const pub = join(process.cwd(), "public", relPath);
  const dist = join(ROOT, relPath);
  await mkdir(dirname(pub), { recursive: true }).catch(() => {});
  await mkdir(dirname(dist), { recursive: true }).catch(() => {});
  await writeFile(pub, body, "utf8");
  await writeFile(dist, body, "utf8");
}

const written = [];
for (const [key, section] of Object.entries(SECTIONS)) {
  const urls = bySection[key];
  if (!urls.length) continue;
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => urlXml(u.loc, u.lastmod)).join("\n")}
</urlset>
`;
  await writeBoth(section.name, body);
  written.push({ name: section.name, count: urls.length });
}

const indexBody = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${written
  .map(
    (s) => `  <sitemap>
    <loc>${SITE}/${s.name}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`,
  )
  .join("\n")}
</sitemapindex>
`;

await writeBoth("sitemap.xml", indexBody);

const total = written.reduce((n, s) => n + s.count, 0);
console.log(
  `sitemap index: ${total} urls (max ${MAX_URLS}, markets=${INCLUDE_MARKETS ? "on" : "off"}) → ${written.map((s) => `${s.name}:${s.count}`).join(", ")}`,
);

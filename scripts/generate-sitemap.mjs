#!/usr/bin/env node
/**
 * Generate sitemap index + section sitemaps from Astro dist/client after build.
 * Start-up policy for a new domain: RU commercial core only — no /en, no thin SEO sprawl.
 * Usage: node scripts/generate-sitemap.mjs
 */
import { CANONICAL_ORIGIN } from "../config/domains.mjs";
import { spawnSync } from "node:child_process";
import { accessSync, constants } from "node:fs";
import { readdir, writeFile, stat, mkdir } from "node:fs/promises";
import { join, relative, dirname } from "node:path";

const SITE = process.env.PUBLIC_SITE_URL || CANONICAL_ORIGIN;
const ROOT = join(process.cwd(), "dist/client");
const INCLUDE_MARKETS = process.env.SITEMAP_INCLUDE_MARKETS !== "0";
/** Full indexable set — Yandex needs real URL count in sitemap.xml (not only 4 index refs). */
const MAX_URLS = Number(process.env.SITEMAP_MAX_URLS || 5000);
const MAX_BLOG_URLS = Number(process.env.SITEMAP_MAX_BLOG || 500);

/** Always-include commercial / trust URLs (RU + KZ hub only). */
const PRIORITY_PATHS = [
  "/",
  "/kz",
  "/kz/pricing",
  "/about",
  "/pricing",
  "/services",
  "/automation",
  "/services/business-process-automation",
  "/services/crm-integration",
  "/services/ai-sales-loop",
  "/services/voice-ai",
  "/services/rag",
  "/automation/ocr-data-extraction",
  "/automation/documents",
  "/automation/sales",
  "/integrations/1c",
  "/integrations/bitrix24-1c",
  "/integrations/amocrm",
  "/portfolio",
  "/audit",
  "/ii-dlya-biznesa",
  "/secure-ai",
  "/ai-kubernetes",
  "/claude",
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
  "/ai-agents",
  "/for-ceo",
  "/for-sales-director",
  "/for-coo",
  "/for-cio",
];

/** Blog / academy slugs worth indexing early (extend later). */
const PRIORITY_BLOG_PREFIXES = ["/blog/", "/academy/", "/portfolio/"];

/** Path belongs in services / portfolio / blog slices (not core hubs). */
function isServicesPath(p) {
  return (
    p.startsWith("/services/") ||
    p.startsWith("/automation/") ||
    p.startsWith("/integrations/") ||
    p.startsWith("/solutions/") ||
    p.startsWith("/industries/") ||
    p.startsWith("/secure-ai") ||
    p.startsWith("/kaspersky")
  );
}
function isPortfolioPath(p) {
  return p.startsWith("/portfolio");
}
function isBlogPath(p) {
  return p.startsWith("/blog") || p.startsWith("/guides") || p.startsWith("/academy") || p.startsWith("/media");
}

/** Sections for sitemap split. */
const SECTIONS = {
  // Core = hubs only. Commercial landings stay in sitemap-services.xml even if PRIORITY.
  core: {
    name: "sitemap-core.xml",
    test: (p) =>
      (PRIORITY_PATHS.includes(p) || p === "/") &&
      !isServicesPath(p) &&
      !isPortfolioPath(p) &&
      !isBlogPath(p),
  },
  services: {
    name: "sitemap-services.xml",
    test: isServicesPath,
  },
  portfolio: {
    name: "sitemap-portfolio.xml",
    test: isPortfolioPath,
  },
  blog: {
    name: "sitemap-blog.xml",
    test: isBlogPath,
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

/** Keep in sync with src/lib/seo-redirects.ts (Node sitemap cannot import TS aliases). */
const REDIRECT_EXACT = new Set([
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
  "/contact",
]);

const REDIRECT_AUTOMATION_EXTRA = new Set([
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

function isRedirectSource(path) {
  if (REDIRECT_EXACT.has(path)) return true;
  const m = path.match(/^\/automation\/([^/]+)$/);
  if (m && REDIRECT_AUTOMATION_EXTRA.has(m[1])) return true;
  return false;
}

function isExcluded(path) {
  // Locale mirrors / legacy — 301 away, never sitemap.
  if (path === "/uz" || path.startsWith("/uz/")) return true;
  if (path === "/en" || path.startsWith("/en/")) return true;
  if (path === "/ru" || path.startsWith("/ru/")) return true;
  // Conversion forms — noindex,follow, not landings.
  if (path === "/order" || path.startsWith("/order/")) return true;
  if (path.startsWith("/api/")) return true;
  if (path.includes("/cases/")) return true;
  // KZ: only hub + pricing until deeper localization ships.
  if (path.startsWith("/kz/") && path !== "/kz/pricing") return true;
  if (!INCLUDE_MARKETS && (path === "/kz" || path.startsWith("/kz/"))) return true;
  // Keep indexable Bitrix24↔1C; exclude only redirecting bitrix24 URLs.
  if (path.includes("/bitrix24") && isRedirectSource(path)) return true;
  if (isRedirectSource(path)) return true;
  return false;
}

/** Map URL → source files whose git dates drive lastmod (not dist build mtime). */
function sourceFilesForPath(path) {
  const files = [];
  const pageIndex = join(process.cwd(), "src/pages", path === "/" ? "index.astro" : `${path.slice(1)}/index.astro`);
  const pageFile = join(process.cwd(), "src/pages", `${path.slice(1)}.astro`);
  for (const f of [pageIndex, pageFile]) {
    try {
      accessSync(f, constants.R_OK);
      files.push(f);
    } catch {
      /* missing */
    }
  }
  if (path.startsWith("/services/")) {
    files.push(
      join(process.cwd(), "src/lib/seo-services-content.ts"),
      join(process.cwd(), "src/lib/enterprise-services.ts"),
    );
  } else if (
    path.startsWith("/automation/") ||
    path.startsWith("/integrations/") ||
    path.startsWith("/solutions/") ||
    path.startsWith("/industries/") ||
    path.startsWith("/ai/")
  ) {
    files.push(
      join(process.cwd(), "src/lib/seo-catalog/landing-specs.ts"),
      join(process.cwd(), "src/lib/seo-catalog/landing-specs-intent.ts"),
      join(process.cwd(), "src/lib/seo-catalog/landing-specs-priority.ts"),
      join(process.cwd(), "src/lib/landing-pages.ts"),
    );
  } else if (path === "/automation") {
    files.push(join(process.cwd(), "src/lib/automation-page.ts"));
  } else if (path === "/bitrix") {
    files.push(join(process.cwd(), "src/lib/bitrix-landing.ts"));
  } else if (path === "/" || path === "/pricing" || path === "/about") {
    files.push(join(process.cwd(), "src/content/ru.ts"));
  } else if (path.startsWith("/portfolio/")) {
    files.push(join(process.cwd(), "src/lib/profile.ts"));
  }
  return files;
}

function gitLastmod(files) {
  let best = null;
  for (const file of files) {
    const rel = relative(process.cwd(), file);
    const r = spawnSync("git", ["log", "-1", "--format=%cs", "--", rel], {
      encoding: "utf8",
      cwd: process.cwd(),
    });
    const d = (r.stdout || "").trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(d) && (!best || d > best)) best = d;
  }
  return best;
}

async function lastmodForPath(path, distFile) {
  const fromGit = gitLastmod(sourceFilesForPath(path));
  if (fromGit) return fromGit;
  try {
    return (await stat(distFile)).mtime.toISOString().slice(0, 10);
  } catch {
    return null;
  }
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
  // Prefer topical slices over core so PRIORITY commercial URLs land in services/*.
  for (const key of ["services", "portfolio", "blog", "core"]) {
    if (SECTIONS[key].test(path)) return key;
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
  const lastmod = await lastmodForPath(path, file);
  entries.push({ path, loc: path === "/" ? SITE : `${SITE}${path}`, lastmod, score: priorityScore(path) });
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
  const lastmod = (await lastmodForPath(path, file)) || today;
  if (limited.length >= MAX_URLS) limited.pop();
  limited.push({ path, loc: path === "/" ? SITE : `${SITE}${path}`, lastmod, score: 999 });
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

/** Primary sitemap.xml = full urlset (Yandex was counting only 4 index entries). */
const allSorted = [...limited].sort((a, b) => a.path.localeCompare(b.path));
const fullBody = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allSorted.map((u) => urlXml(u.loc, u.lastmod)).join("\n")}
</urlset>
`;
await writeBoth("sitemap.xml", fullBody);

const total = allSorted.length;
console.log(
  `sitemap.xml: ${total} urls (max ${MAX_URLS}, markets=${INCLUDE_MARKETS ? "on" : "off"}) → ${written.map((s) => `${s.name}:${s.count}`).join(", ")}`,
);

#!/usr/bin/env node
/**
 * Inject schema.org dateModified into every built page.
 *
 * Answer engines and Yandex use a freshness signal when they decide whether a
 * document is still worth quoting; the site had none (0 of 435 pages).
 * Dates come from git history of the sources behind each route — the same
 * source as <lastmod> in sitemap.xml — so both always agree.
 *
 * Runs after `astro build`, before generate-sitemap + precompress.
 * Usage: node scripts/inject-page-dates.mjs
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { lastmodForPath } from "./lib/page-dates.mjs";

const ROOT = join(process.cwd(), "dist/client");
const DATED_TYPES = new Set([
  "WebPage",
  "CollectionPage",
  "ProfilePage",
  "AboutPage",
  "ContactPage",
  "FAQPage",
  "Article",
  "TechArticle",
  "BlogPosting",
  "NewsArticle",
]);

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

/** dist/client/foo/index.html → /foo · dist/client/index.html → / */
function pathForFile(file) {
  const rel = relative(ROOT, file).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"/index.html".length)}`;
  return `/${rel.slice(0, -".html".length)}`;
}

/** Set dateModified on every dated node, including @graph members. */
function stampNode(node, date) {
  if (Array.isArray(node)) return node.map((n) => stampNode(n, date)).some(Boolean);
  if (!node || typeof node !== "object") return false;
  let touched = false;
  if (Array.isArray(node["@graph"])) {
    for (const member of node["@graph"]) touched = stampNode(member, date) || touched;
  }
  const type = node["@type"];
  const types = Array.isArray(type) ? type : [type];
  if (types.some((t) => DATED_TYPES.has(t))) {
    node.dateModified = date;
    touched = true;
  }
  return touched;
}

/** JSON inside <script> must not carry a literal </script>. */
function serialize(value) {
  return JSON.stringify(value).replace(/<\//g, "<\\/");
}

const LD_RE = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;

function injectInto(html, date, url, title) {
  let stamped = false;
  let next = html.replace(LD_RE, (match, body) => {
    let parsed;
    try {
      parsed = JSON.parse(body);
    } catch {
      return match; // leave anything we cannot parse untouched
    }
    if (!stampNode(parsed, date)) return match;
    stamped = true;
    return `<script type="application/ld+json">${serialize(parsed)}</script>`;
  });

  if (!stamped) {
    const block = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url,
      name: title || url,
      dateModified: date,
    };
    next = next.replace(
      "</head>",
      `<script type="application/ld+json">${serialize(block)}</script></head>`,
    );
  }

  if (!next.includes('property="article:modified_time"')) {
    next = next.replace(
      "</head>",
      `<meta property="article:modified_time" content="${date}"></head>`,
    );
  }
  return next;
}

const SITE = process.env.PUBLIC_SITE_URL || "https://www.bober-systems.ru";

let stamped = 0;
let skipped = 0;
for (const file of await htmlFiles(ROOT)) {
  const path = pathForFile(file);
  const date = await lastmodForPath(path, file);
  if (!date) {
    skipped += 1;
    continue;
  }
  const html = await readFile(file, "utf8");
  if (html.includes("dateModified")) {
    skipped += 1;
    continue;
  }
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  const url = path === "/" ? `${SITE}/` : `${SITE}${path}`;
  const next = injectInto(html, date, url, title);
  if (next === html) {
    skipped += 1;
    continue;
  }
  await writeFile(file, next, "utf8");
  stamped += 1;
}

console.log(`inject-page-dates: dateModified on ${stamped} pages (${skipped} skipped)`);

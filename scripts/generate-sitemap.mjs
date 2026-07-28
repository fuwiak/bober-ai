#!/usr/bin/env node
/**
 * Generate public/sitemap.xml from Astro dist/client after build.
 * Usage: node scripts/generate-sitemap.mjs
 */
import { CANONICAL_ORIGIN } from "../config/domains.mjs";
import { readdir, writeFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";

const SITE = process.env.PUBLIC_SITE_URL || CANONICAL_ORIGIN;
const ROOT = join(process.cwd(), "dist/client");

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

const files = await walk(ROOT);
const urls = files
  .map((file) => {
    const rel = relative(ROOT, file).replace(/\\/g, "/");
    let path = "/" + rel.replace(/\/index\.html$/, "").replace(/^index\.html$/, "");
    if (path === "/") return SITE + "/";
    return SITE + path.replace(/\/$/, "");
  })
  .filter((u) => !u.includes("/amocrm") && !u.includes("/bitrix24") && !u.includes("/cases/") && !u.endsWith("/ru"))
  .sort();

/** SSR/on-demand routes not present as dist/client HTML (Next parity). */
const EXTRA_SSR_PATHS = ["/news", "/outages", "/tel"];
for (const path of EXTRA_SSR_PATHS) {
  urls.push(SITE + path);
}

const unique = [...new Set(urls)].sort();
const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${unique.map((loc) => `  <url><loc>${loc}</loc></url>`).join("\n")}
</urlset>
`;

await writeFile(join(process.cwd(), "public/sitemap.xml"), body, "utf8");
await writeFile(join(ROOT, "sitemap.xml"), body, "utf8");
console.log(`sitemap.xml: ${unique.length} urls`);

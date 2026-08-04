#!/usr/bin/env node
/**
 * Rebuild data/telegram-public-knowledge.md from curated sources.
 * Prefer this over shipping raw graphify-out (secrets risk + Railway size).
 *
 * Usage: node scripts/build-telegram-public-knowledge.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = join(root, "data/telegram-public-knowledge.md");
const curated = join(root, "data/telegram-public-knowledge.md");

const SECRETISH =
  /\b(?:api[_-]?key|token|secret|password|DATABASE_URL|Bearer\s+\S+|sk-\S+)\b/gi;

function sanitize(s) {
  return String(s)
    .replace(SECRETISH, "[redacted]")
    .replace(/\/Users\/[^\s]+/g, "[redacted-path]")
    .replace(/\b(?:10|192\.168|172\.(?:1[6-9]|2\d|3[0-1]))(?:\.\d{1,3}){2,3}\b/g, "[redacted-ip]");
}

let base = "";
if (existsSync(curated)) {
  base = readFileSync(curated, "utf8");
}

// Optionally append short hubs from GRAPH_REPORT (public-looking lines only)
const reportPath = join(root, "graphify-out/GRAPH_REPORT.md");
let extra = "";
if (existsSync(reportPath)) {
  const report = readFileSync(reportPath, "utf8");
  const allow =
    /bober|bitrix|ocr|meeting|telegram|offer|landing|crm|1с|speech|knowledge|assistant/i;
  const lines = report
    .split("\n")
    .filter((l) => allow.test(l) && !/password|token|\.env|secret/i.test(l))
    .slice(0, 40);
  if (lines.length) {
    extra = `\n\n## Graph hubs (filtered public)\n\n${lines.join("\n")}\n`;
  }
}

// Keep curated body if present; only refresh header stamp + graph hubs appendix
const stamp = `<!-- rebuilt ${new Date().toISOString().slice(0, 10)} -->\n`;
let body = base.replace(/^<!-- rebuilt .* -->\n?/, "");
if (!body.includes("# Bober AI Systems")) {
  console.error("Curated snapshot missing — abort");
  process.exit(1);
}
// Strip previous graph hubs appendix
body = body.replace(/\n## Graph hubs \(filtered public\)[\s\S]*$/, "");
const next = sanitize(stamp + body.trim() + extra);
writeFileSync(outPath, `${next.trim()}\n`);
console.log("Wrote", outPath, `(${next.length} chars)`);

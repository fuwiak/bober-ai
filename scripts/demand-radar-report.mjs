#!/usr/bin/env node
/**
 * Demand radar («радар спроса») — monthly per-landing table.
 *
 * Sources:
 *   Webmaster → impressions / avg position (popular queries + optional URL CSV)
 *   Metrica   → organic visits, CTA / form_start / form_submit by startURLPath
 *   Manual    → data/demand-radar/manual/YYYY-MM.json (CRM: pipeline, deals, …)
 *
 *   npm run demand-radar:report
 *   npm run demand-radar:report -- --month 2026-07
 *   npm run demand-radar:report -- --dry   # schema + empty rows, no API
 *
 * Quality (after 3–6 months): qualified_pipeline_value / (organic_visits / 100)
 *
 * Metrica alone cannot give signed deals / pipeline — fill manual JSON.
 */

import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import fetch from "./lib/fetch.mjs";
import { applyYagaCredentials } from "./lib/yaga-credentials.mjs";
import {
  getPopularQueries,
  resolveHostContext,
} from "./lib/yandex-webmaster.mjs";

applyYagaCredentials();

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "data", "demand-radar");
const MANUAL_DIR = join(OUT_DIR, "manual");
const WEBMASTER_URLS_DIR = join(OUT_DIR, "webmaster-urls");

const STAT_API = "https://api-metrika.yandex.net/stat/v1";
const MANAGEMENT_API = "https://api-metrika.yandex.net/management/v1";

const QUALITY_METRIC = "qualified_pipeline_value / (organic_visits / 100)";

const GOAL_IDENTS = {
  cta_clicks: "primary_cta_click",
  form_starts: "form_start",
  form_submits: "form_submit",
};

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--") && !a.includes("=")));

function readFlag(name, fallback = "") {
  const idx = args.indexOf(name);
  if (idx >= 0 && args[idx + 1] && !args[idx + 1].startsWith("--")) return args[idx + 1];
  const eq = args.find((a) => a.startsWith(`${name}=`));
  if (eq) return eq.slice(name.length + 1);
  return fallback;
}

function previousMonthIso(now = new Date()) {
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function monthBounds(month) {
  const [y, m] = month.split("-").map(Number);
  if (!y || !m) throw new Error(`Bad --month ${month}, expected YYYY-MM`);
  const date1 = `${y}-${String(m).padStart(2, "0")}-01`;
  const last = new Date(Date.UTC(y, m, 0));
  const date2 = last.toISOString().slice(0, 10);
  return { date1, date2 };
}

const config = {
  token:
    process.env.YANDEX_OAUTH_TOKEN?.trim() ||
    process.env.YANDEX_METRIKA_OAUTH_TOKEN?.trim() ||
    process.env.YANDEX_WEBMASTER_OAUTH_TOKEN?.trim(),
  counterId:
    process.env.PUBLIC_YANDEX_METRIKA_ID?.trim() ||
    process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim() ||
    "110635302",
  month: readFlag("--month", process.env.DEMAND_RADAR_MONTH?.trim() || previousMonthIso()),
  dry: flags.has("--dry"),
  skipMetrika: flags.has("--skip-metrika"),
  skipWebmaster: flags.has("--skip-webmaster"),
};

function fail(msg) {
  console.error(`\nОшибка: ${msg}`);
  process.exit(1);
}

function authHeaders() {
  return {
    Authorization: `OAuth ${config.token}`,
    Accept: "application/json",
  };
}

async function metrikaGet(path) {
  const response = await fetch(`${path.startsWith("http") ? "" : STAT_API}${path}`, {
    headers: authHeaders(),
  });
  const text = await response.text();
  let body = null;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }
  if (!response.ok) {
    throw new Error(`Metrika ${path} → HTTP ${response.status}: ${JSON.stringify(body)}`);
  }
  return body;
}

async function managementGet(path) {
  const response = await fetch(`${MANAGEMENT_API}${path}`, { headers: authHeaders() });
  const text = await response.text();
  let body = null;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }
  if (!response.ok) {
    throw new Error(`Management ${path} → HTTP ${response.status}: ${JSON.stringify(body)}`);
  }
  return body;
}

function normalizePath(value) {
  if (!value) return "/";
  try {
    const raw = String(value).includes("://")
      ? new URL(value).pathname
      : String(value).split("?")[0] || "/";
    const cleaned = raw.replace(/\/+$/, "") || "/";
    return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
  } catch {
    return "/";
  }
}

function qualifiedPipelinePer100Visits(pipeline, visits) {
  if (pipeline == null || !Number.isFinite(pipeline)) return null;
  if (visits == null || !Number.isFinite(visits) || visits <= 0) return null;
  return pipeline / (visits / 100);
}

function emptyRow(landing_path) {
  return {
    landing_path,
    service: undefined,
    lead_source: undefined,
    impressions: null,
    avg_position: null,
    organic_visits: null,
    cta_clicks: null,
    form_starts: null,
    form_submits: null,
    conversations: null,
    qualified_leads: null,
    pipeline_value: null,
    signed_deals: null,
    avg_budget: null,
    quality_score: null,
  };
}

function loadLandingPaths() {
  // Prefer sitemap-derived list if present; else seed common hubs + empty.
  const seeds = new Set([
    "/",
    "/ai",
    "/automation",
    "/integrations",
    "/solutions",
    "/industries",
    "/services",
    "/bitrix",
    "/secure-ai",
  ]);
  const catalogReport = join(ROOT, "data", "wordstat-landing-route-report.json");
  if (existsSync(catalogReport)) {
    try {
      const data = JSON.parse(readFileSync(catalogReport, "utf8"));
      const routes = data.routes || data.landings || data.pages || [];
      for (const r of routes) {
        const p = normalizePath(r.path || r.landing_path || r.url || r.href);
        if (p && p !== "/") seeds.add(p);
      }
    } catch {
      /* ignore */
    }
  }
  return [...seeds].sort();
}

function loadJsonIfExists(path) {
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (err) {
    console.warn(`! skip broken JSON ${path}: ${err.message}`);
    return null;
  }
}

function mergeManual(rowsByPath, manual) {
  if (!manual) return;
  const list = Array.isArray(manual) ? manual : manual.landings || [];
  for (const item of list) {
    const path = normalizePath(item.landing_path || item.path);
    if (!rowsByPath.has(path)) rowsByPath.set(path, emptyRow(path));
    const row = rowsByPath.get(path);
    for (const key of [
      "service",
      "lead_source",
      "conversations",
      "qualified_leads",
      "pipeline_value",
      "signed_deals",
      "avg_budget",
      "impressions",
      "avg_position",
    ]) {
      if (item[key] != null && item[key] !== "") row[key] = item[key];
    }
  }
}

function mergeWebmasterUrls(rowsByPath, payload) {
  if (!payload) return;
  const list = Array.isArray(payload) ? payload : payload.urls || payload.landings || [];
  for (const item of list) {
    const path = normalizePath(item.landing_path || item.path || item.url);
    if (!rowsByPath.has(path)) rowsByPath.set(path, emptyRow(path));
    const row = rowsByPath.get(path);
    if (item.impressions != null || item.shows != null) {
      row.impressions = Number(item.impressions ?? item.shows);
    }
    if (item.avg_position != null || item.position != null) {
      row.avg_position = Number(item.avg_position ?? item.position);
    }
  }
}

async function resolveGoalIds(counterId) {
  const data = await managementGet(`/counter/${counterId}/goals`);
  /** @type {Map<string, number>} */
  const byIdent = new Map();
  for (const g of data.goals || []) {
    for (const c of g.conditions || []) {
      if (c.type === "exact" && c.url) byIdent.set(c.url, g.id);
    }
    if (g.name && GOAL_IDENTS) {
      /* ident often stored in conditions url for javascript goals */
    }
  }
  // JS goals: condition type action / exact with ident as url
  for (const g of data.goals || []) {
    const ident = (g.conditions || []).find((c) => c.type === "exact")?.url;
    if (ident) byIdent.set(ident, g.id);
  }
  return byIdent;
}

async function fetchOrganicVisitsByPath(counterId, date1, date2) {
  const qs = new URLSearchParams({
    ids: String(counterId),
    metrics: "ym:s:visits",
    dimensions: "ym:s:startURLPath",
    date1,
    date2,
    accuracy: "full",
    limit: "10000",
    filters: "ym:s:trafficSource=='organic' AND ym:s:isRobot=='No'",
  });
  const data = await metrikaGet(`/data?${qs}`);
  /** @type {Map<string, number>} */
  const map = new Map();
  for (const row of data.data || []) {
    const path = normalizePath(row.dimensions?.[0]?.name || row.dimensions?.[0]?.id);
    const visits = Number(row.metrics?.[0] || 0);
    map.set(path, (map.get(path) || 0) + visits);
  }
  return map;
}

async function fetchGoalReachesByPath(counterId, goalId, date1, date2) {
  const qs = new URLSearchParams({
    ids: String(counterId),
    metrics: `ym:s:goal${goalId}reaches`,
    dimensions: "ym:s:startURLPath",
    date1,
    date2,
    accuracy: "full",
    limit: "10000",
    filters: "ym:s:isRobot=='No'",
  });
  const data = await metrikaGet(`/data?${qs}`);
  /** @type {Map<string, number>} */
  const map = new Map();
  for (const row of data.data || []) {
    const path = normalizePath(row.dimensions?.[0]?.name || row.dimensions?.[0]?.id);
    const n = Number(row.metrics?.[0] || 0);
    map.set(path, (map.get(path) || 0) + n);
  }
  return map;
}

function toCsv(landings) {
  const cols = [
    "landing_path",
    "service",
    "lead_source",
    "impressions",
    "avg_position",
    "organic_visits",
    "cta_clicks",
    "form_starts",
    "form_submits",
    "conversations",
    "qualified_leads",
    "pipeline_value",
    "signed_deals",
    "avg_budget",
    "quality_score",
  ];
  const esc = (v) => {
    if (v == null) return "";
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [cols.join(",")];
  for (const row of landings) {
    lines.push(cols.map((c) => esc(row[c])).join(","));
  }
  return `${lines.join("\n")}\n`;
}

function toMarkdown(report) {
  const lines = [
    `# Demand radar ${report.month}`,
    "",
    `Generated: ${report.generated_at}`,
    `Host: ${report.host} · Metrika: ${report.counter_id}`,
    `Quality: \`${report.quality_metric}\``,
    "",
    ...report.notes.map((n) => `- ${n}`),
    "",
    "| landing | impr | pos | organic | CTA | form↓ | submit | talks | qual | pipeline | deals | avg ₽ | quality |",
    "|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|",
  ];
  const fmt = (v) => (v == null ? "—" : typeof v === "number" ? (Number.isInteger(v) ? v : v.toFixed(1)) : v);
  for (const r of report.landings) {
    lines.push(
      `| \`${r.landing_path}\` | ${fmt(r.impressions)} | ${fmt(r.avg_position)} | ${fmt(r.organic_visits)} | ${fmt(r.cta_clicks)} | ${fmt(r.form_starts)} | ${fmt(r.form_submits)} | ${fmt(r.conversations)} | ${fmt(r.qualified_leads)} | ${fmt(r.pipeline_value)} | ${fmt(r.signed_deals)} | ${fmt(r.avg_budget)} | ${fmt(r.quality_score)} |`,
    );
  }
  lines.push("");
  return `${lines.join("\n")}\n`;
}

async function main() {
  const { date1, date2 } = monthBounds(config.month);
  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync(MANUAL_DIR, { recursive: true });
  mkdirSync(WEBMASTER_URLS_DIR, { recursive: true });

  const notes = [
    "Metrica: organic visits + goals by ym:s:startURLPath.",
    "Webmaster API: popular queries (site-level). Per-URL impressions → fill webmaster-urls/YYYY-MM.json or manual.",
    "CRM (conversations, qualified, pipeline, deals, avg budget): data/demand-radar/manual/YYYY-MM.json — Metrica cannot know deals.",
    `Period ${date1} → ${date2}.`,
  ];

  /** @type {Map<string, ReturnType<typeof emptyRow>>} */
  const rowsByPath = new Map();
  for (const p of loadLandingPaths()) rowsByPath.set(p, emptyRow(p));

  mergeManual(rowsByPath, loadJsonIfExists(join(MANUAL_DIR, `${config.month}.json`)));
  mergeWebmasterUrls(
    rowsByPath,
    loadJsonIfExists(join(WEBMASTER_URLS_DIR, `${config.month}.json`)),
  );

  let host = process.env.YANDEX_WEBMASTER_HOST_URL || "https://www.bober-systems.ru";
  /** @type {Array<{query:string,shows:number|null,clicks:number|null,avg_position:number|null}>} */
  let webmasterQueries = [];

  if (!config.dry && !config.skipWebmaster) {
    if (!config.token) fail("Нужен YANDEX_OAUTH_TOKEN / YANDEX_WEBMASTER_OAUTH_TOKEN");
    try {
      const ctx = await resolveHostContext();
      host = ctx.config.hostUrl || host;
      const popular = await getPopularQueries(ctx.config.token, ctx.userId, ctx.hostId, {
        orderBy: "TOTAL_SHOWS",
        limit: 100,
        queryIndicator: ["TOTAL_SHOWS", "TOTAL_CLICKS", "AVG_SHOW_POSITION"],
      });
      const queries = popular?.queries || popular?.search_queries || [];
      webmasterQueries = queries.map((q) => {
        const indicators = q.indicators || {};
        return {
          query: q.query_text || q.query || "",
          shows: indicators.TOTAL_SHOWS ?? q.TOTAL_SHOWS ?? null,
          clicks: indicators.TOTAL_CLICKS ?? q.TOTAL_CLICKS ?? null,
          avg_position: indicators.AVG_SHOW_POSITION ?? q.AVG_SHOW_POSITION ?? null,
        };
      });
      notes.push(`Webmaster popular queries: ${webmasterQueries.length}`);
    } catch (err) {
      notes.push(`Webmaster skip: ${err.message}`);
      console.warn(`! Webmaster: ${err.message}`);
    }
  }

  if (!config.dry && !config.skipMetrika) {
    if (!config.token) fail("Нужен YANDEX_OAUTH_TOKEN / YANDEX_METRIKA_OAUTH_TOKEN");
    try {
      const visits = await fetchOrganicVisitsByPath(config.counterId, date1, date2);
      for (const [path, n] of visits) {
        if (!rowsByPath.has(path)) rowsByPath.set(path, emptyRow(path));
        rowsByPath.get(path).organic_visits = n;
      }
      notes.push(`Metrika organic URL paths: ${visits.size}`);

      const goalIds = await resolveGoalIds(config.counterId);
      for (const [field, ident] of Object.entries(GOAL_IDENTS)) {
        const id = goalIds.get(ident);
        if (!id) {
          notes.push(`Goal ${ident} not found on counter — run npm run metrika:goals`);
          continue;
        }
        const map = await fetchGoalReachesByPath(config.counterId, id, date1, date2);
        for (const [path, n] of map) {
          if (!rowsByPath.has(path)) rowsByPath.set(path, emptyRow(path));
          rowsByPath.get(path)[field] = n;
        }
        notes.push(`Metrika ${ident}: ${map.size} paths`);
      }
    } catch (err) {
      notes.push(`Metrika skip: ${err.message}`);
      console.warn(`! Metrika: ${err.message}`);
    }
  }

  if (config.dry) {
    notes.push("Dry run — no API calls.");
  }

  const landings = [...rowsByPath.values()]
    .map((row) => {
      row.quality_score = qualifiedPipelinePer100Visits(row.pipeline_value, row.organic_visits);
      return row;
    })
    .sort((a, b) => {
      const av = a.quality_score;
      const bv = b.quality_score;
      if (av == null && bv == null) {
        return (b.organic_visits || 0) - (a.organic_visits || 0);
      }
      if (av == null) return 1;
      if (bv == null) return -1;
      return av - bv;
    });

  const report = {
    month: config.month,
    generated_at: new Date().toISOString(),
    host,
    counter_id: String(config.counterId),
    quality_metric: QUALITY_METRIC,
    notes,
    landings,
    webmaster_queries: webmasterQueries,
  };

  const jsonPath = join(OUT_DIR, `${config.month}.json`);
  const csvPath = join(OUT_DIR, `${config.month}.csv`);
  const mdPath = join(OUT_DIR, `${config.month}.md`);
  writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`);
  writeFileSync(csvPath, toCsv(landings));
  writeFileSync(mdPath, toMarkdown(report));

  console.log(`\nDemand radar ${config.month}`);
  console.log(`  landings: ${landings.length}`);
  console.log(`  → ${jsonPath}`);
  console.log(`  → ${csvPath}`);
  console.log(`  → ${mdPath}`);
  console.log(`\nManual CRM: ${join(MANUAL_DIR, `${config.month}.json`)}`);
  console.log(`URL impressions CSV/JSON: ${join(WEBMASTER_URLS_DIR, `${config.month}.json`)}`);
  console.log(`\nWeakest first (quality_score). Kill bottom hypotheses monthly.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

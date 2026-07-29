#!/usr/bin/env node
/**
 * Фильтры счётчика Яндекс.Метрики + снимок органики.
 *
 *   yaga metrika filters              # список + ensure «не считать мои»
 *   yaga metrika filters --status     # только список
 *   yaga metrika filters --organic    # органика за период
 *   yaga metrika filters --ip 1.2.3.4 # exclude IP
 *
 * Docs:
 * - Filters: https://yandex.com/dev/metrika/en/management/openapi/filter/filters
 * - «Не учитывать мои визиты»: attr=uniq_id, type=me, action=exclude
 * - Organic report: filters=ym:s:trafficSource=='organic'
 */

import fetch from "./lib/fetch.mjs";

const MANAGEMENT_API = "https://api-metrika.yandex.net/management/v1";
const STAT_API = "https://api-metrika.yandex.net/stat/v1";

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--") && !a.includes("=")));
function readFlag(name, fallback = "") {
  const idx = args.indexOf(name);
  if (idx >= 0 && args[idx + 1] && !args[idx + 1].startsWith("--")) return args[idx + 1];
  const eq = args.find((a) => a.startsWith(`${name}=`));
  if (eq) return eq.slice(name.length + 1);
  return fallback;
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
  clientId: process.env.YANDEX_WEBMASTER_CLIENT_ID?.trim() || "f2e2f11ae7e3492886ad61a6e45a4c5c",
  date1: readFlag("--from", "30daysAgo"),
  date2: readFlag("--to", "today"),
  ip: readFlag("--ip", process.env.YANDEX_METRIKA_EXCLUDE_IP?.trim() || ""),
};

const statusOnly = flags.has("--status") || flags.has("-s");
const organicOnly = flags.has("--organic") || flags.has("-o");
const skipEnsure = flags.has("--no-ensure");

function fail(message) {
  console.error(`\nОшибка: ${message}`);
  process.exit(1);
}

function authHeaders(json = false) {
  return {
    Authorization: `OAuth ${config.token}`,
    Accept: "application/json",
    ...(json ? { "Content-Type": "application/json" } : {}),
  };
}

async function api(base, path, { method = "GET", body } = {}) {
  const response = await fetch(`${base}${path}`, {
    method,
    headers: authHeaders(Boolean(body)),
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  let parsed = null;
  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }
  }
  if (!response.ok) {
    throw new Error(`${method} ${path} → HTTP ${response.status}: ${JSON.stringify(parsed)}`);
  }
  return parsed;
}

function printOAuthHelp() {
  console.log(`
Нужен OAuth-токен с metrika:read + metrika:write.

1. https://oauth.yandex.ru/authorize?response_type=token&client_id=${config.clientId}
2. export YANDEX_OAUTH_TOKEN="y0_..."
`);
}

function formatFilter(f) {
  const value = f.value || (f.start_ip ? `${f.start_ip}–${f.end_ip}` : "—");
  return `#${f.id} ${f.action} ${f.attr}/${f.type} value=${value} status=${f.status}`;
}

async function listFilters(counterId) {
  const data = await api(MANAGEMENT_API, `/counter/${counterId}/filters`);
  return data.filters || [];
}

async function ensureMeFilter(counterId, filters) {
  const existing = filters.find((f) => f.attr === "uniq_id" && f.type === "me");
  if (existing) {
    if (existing.status === "active") {
      return { created: false, filter: existing };
    }
    const updated = await api(MANAGEMENT_API, `/counter/${counterId}/filter/${existing.id}`, {
      method: "PUT",
      body: {
        filter: {
          attr: "uniq_id",
          type: "me",
          action: "exclude",
          status: "active",
        },
      },
    });
    return { created: false, activated: true, filter: updated.filter };
  }
  const created = await api(MANAGEMENT_API, `/counter/${counterId}/filters`, {
    method: "POST",
    body: {
      filter: {
        attr: "uniq_id",
        type: "me",
        action: "exclude",
        status: "active",
      },
    },
  });
  return { created: true, filter: created.filter };
}

async function ensureIpFilter(counterId, filters, ip) {
  const existing = filters.find(
    (f) =>
      f.attr === "client_ip" &&
      f.action === "exclude" &&
      (f.value === ip || f.start_ip === ip),
  );
  if (existing) return { created: false, filter: existing };
  const created = await api(MANAGEMENT_API, `/counter/${counterId}/filters`, {
    method: "POST",
    body: {
      filter: {
        attr: "client_ip",
        type: "equal",
        value: ip,
        action: "exclude",
        status: "active",
      },
    },
  });
  return { created: true, filter: created.filter };
}

async function reportTraffic(counterId) {
  const qs = (extra = {}) => {
    const p = new URLSearchParams({
      ids: String(counterId),
      metrics: "ym:s:visits,ym:s:users,ym:s:pageviews",
      date1: config.date1,
      date2: config.date2,
      accuracy: "full",
      ...extra,
    });
    return p.toString();
  };

  const all = await api(STAT_API, `/data?${qs()}`);
  const bySource = await api(
    STAT_API,
    `/data?${qs({ dimensions: "ym:s:lastTrafficSource" })}`,
  );
  const organic = await api(
    STAT_API,
    `/data?${qs({
      dimensions: "ym:s:searchEngineRoot",
      filters: "ym:s:trafficSource=='organic' AND ym:s:isRobot=='No'",
    })}`,
  );

  return {
    all: all.totals || [0, 0, 0],
    bySource: (bySource.data || []).map((row) => ({
      source: row.dimensions?.[0]?.name || row.dimensions?.[0]?.id || "?",
      metrics: row.metrics,
    })),
    organic: {
      totals: organic.totals || [0, 0, 0],
      engines: (organic.data || []).map((row) => ({
        engine: row.dimensions?.[0]?.name || "?",
        metrics: row.metrics,
      })),
    },
  };
}

function printTraffic(report) {
  const [v, u, p] = report.all;
  console.log(`Период: ${config.date1} → ${config.date2}`);
  console.log(`Всего:     визиты ${v} · посетители ${u} · просмотры ${p}`);
  console.log("По источникам:");
  for (const row of report.bySource) {
    const [rv, ru, rp] = row.metrics;
    console.log(`  · ${row.source}: ${rv} визитов / ${ru} польз. / ${rp} просм.`);
  }
  const [ov, ou, op] = report.organic.totals;
  console.log(`Органика (без роботов): визиты ${ov} · посетители ${ou} · просмотры ${op}`);
  for (const row of report.organic.engines) {
    const [ev, eu, ep] = row.metrics;
    console.log(`  · ${row.engine}: ${ev} / ${eu} / ${ep}`);
  }
}

async function main() {
  const id = config.counterId;
  console.log("Яндекс Метрика · фильтры / органика\n");
  console.log(`Счётчик: ${id}`);
  console.log(`UI: https://metrika.yandex.ru/settings?id=${id}&tab=filters\n`);

  if (!config.token) {
    printOAuthHelp();
    fail("Не задан YANDEX_OAUTH_TOKEN");
  }

  if (!statusOnly) {
    const report = await reportTraffic(id);
    printTraffic(report);
    console.log("");
    if (organicOnly) return;
  }

  let filters = await listFilters(id);
  console.log(`Фильтры сейчас (${filters.length}):`);
  if (!filters.length) console.log("  (пусто)");
  else for (const f of filters) console.log(`  ${formatFilter(f)}`);

  if (statusOnly || skipEnsure) return;

  console.log("");
  const me = await ensureMeFilter(id, filters);
  if (me.created) console.log(`✓ Добавлен фильтр «Не учитывать мои визиты» (#${me.filter.id})`);
  else if (me.activated) console.log(`✓ Включён фильтр «Не учитывать мои визиты» (#${me.filter.id})`);
  else console.log(`✓ Фильтр «Не учитывать мои визиты» уже активен (#${me.filter.id})`);

  if (config.ip) {
    filters = await listFilters(id);
    const ip = await ensureIpFilter(id, filters, config.ip);
    if (ip.created) console.log(`✓ Exclude IP ${config.ip} (#${ip.filter.id})`);
    else console.log(`✓ IP ${config.ip} уже в фильтрах (#${ip.filter.id})`);
  }

  console.log(`
Важно: «Не учитывать мои» работает после визита на сайт, пока вы залогинены
в Яндексе (cookie Метрики). Старые визиты в истории не удаляются — только новые.

  UI фильтры: https://metrika.yandex.ru/settings?id=${id}&tab=filters
  Обзор:      https://metrika.yandex.ru/overview?id=${id}&period=month
`);
}

main().catch((error) => {
  if (/401|403/.test(error.message)) {
    printOAuthHelp();
  }
  fail(error.message || error);
});

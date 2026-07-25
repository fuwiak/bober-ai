#!/usr/bin/env node

/**
 * Яндекс Аудитории — сегменты для микро-Direct ретаргетинга.
 *
 *   npm run yandex:audience -- status
 *   npm run yandex:audience -- list
 *   npm run yandex:audience -- sync-micro          # создать сегменты из целей Метрики
 *   npm run yandex:audience -- sync-micro --dry-run
 *
 * Сегменты из data/micro-direct-plan.json → create_metrika (goal_id).
 * @see https://yandex.com/dev/audience/en/ref/openapi/segments/createMetrika
 */

import { applyYagaCredentials } from "./lib/yaga-credentials.mjs";
import { getAudienceOAuthConfig, getValidAudienceToken, getWebmasterOAuthConfig } from "./lib/yandex-oauth.mjs";
import fetch from "./lib/fetch.mjs";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

applyYagaCredentials();

const AUDIENCE_API = "https://api-audience.yandex.ru/v1/management";
const METRIKA_API = "https://api-metrika.yandex.net/management/v1";

const args = process.argv.slice(2);
const command = args[0] || "status";
const flags = new Set(args.filter((a) => a.startsWith("--")));

const COUNTER_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim() || "110635302";

/** Иденты reachGoal → сегменты Audience для RTG. */
const MICRO_GOAL_SEGMENTS = [
  { key: "form", ident: "form_start", name: "Bober · form_start (14d warm)" },
  { key: "form_intent", ident: "contact_intent_open", name: "Bober · contact_intent_open" },
  { key: "cases", ident: "case_study_view", name: "Bober · case_study_view" },
  { key: "roi", ident: "roi_calculator_gate_open", name: "Bober · roi_calculator_gate_open" },
  { key: "lead", ident: "lead_delivered", name: "Bober · lead_delivered (converters)" },
  { key: "submit", ident: "form_submit", name: "Bober · form_submit" },
];

function fail(msg) {
  console.error(`\nОшибка: ${msg}`);
  process.exit(1);
}

function log(msg) {
  console.log(msg);
}

async function audienceFetch(token, path, options = {}) {
  const response = await fetch(`${AUDIENCE_API}${path}`, {
    ...options,
    headers: {
      Authorization: `OAuth ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
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
    const detail = typeof body === "string" ? body : JSON.stringify(body);
    const err = new Error(`Audience HTTP ${response.status}: ${detail.slice(0, 500)}`);
    err.status = response.status;
    err.body = body;
    throw err;
  }
  return body;
}

async function metrikaFetch(token, path) {
  const response = await fetch(`${METRIKA_API}${path}`, {
    headers: {
      Authorization: `OAuth ${token}`,
      Accept: "application/json",
    },
  });
  const text = await response.text();
  let body = null;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }
  if (!response.ok) {
    throw new Error(`Metrika HTTP ${response.status}: ${JSON.stringify(body).slice(0, 400)}`);
  }
  return body;
}

function metrikaToken() {
  return (
    process.env.YANDEX_METRIKA_OAUTH_TOKEN?.trim() ||
    process.env.YANDEX_OAUTH_TOKEN?.trim() ||
    process.env.YANDEX_WEBMASTER_OAUTH_TOKEN?.trim() ||
    getWebmasterOAuthConfig().accessToken
  );
}

function goalIdent(goal) {
  for (const c of goal.conditions || []) {
    if (c?.type === "exact" && c.url) return String(c.url);
  }
  return "";
}

async function cmdStatus() {
  const config = getAudienceOAuthConfig();
  log("Yandex Audience\n");
  log(`UI:     https://audience.yandex.com/`);
  log(`Token:  ${config.accessToken ? "задан" : "нет — npm run yandex:audience:oauth -- status"}`);
  if (!config.accessToken) process.exit(2);

  const token = await getValidAudienceToken(config);
  const data = await audienceFetch(token, "/segments");
  const segments = data.segments || [];
  log(`Сегментов: ${segments.length}`);
  for (const s of segments.slice(0, 20)) {
    log(`  · [${s.status}] id=${s.id}  ${s.name}  (${s.type})`);
  }
  if (segments.length > 20) log(`  … и ещё ${segments.length - 20}`);
}

async function cmdList() {
  await cmdStatus();
}

async function cmdSyncMicro() {
  const dryRun = flags.has("--dry-run");
  const audienceToken = await getValidAudienceToken(getAudienceOAuthConfig());
  const mToken = metrikaToken();
  if (!mToken) fail("Нужен токен Метрики (YANDEX_OAUTH_TOKEN / YANDEX_METRIKA_OAUTH_TOKEN)");

  log(`Синхронизация микро-RTG сегментов (counter ${COUNTER_ID})${dryRun ? " [dry-run]" : ""}\n`);

  const goalsBody = await metrikaFetch(mToken, `/counter/${COUNTER_ID}/goals`);
  const byIdent = new Map();
  for (const g of goalsBody.goals || []) {
    const ident = goalIdent(g);
    if (ident) byIdent.set(ident, g);
  }

  const existing = await audienceFetch(audienceToken, "/segments");
  const byName = new Map((existing.segments || []).map((s) => [s.name, s]));

  let created = 0;
  let skipped = 0;

  for (const spec of MICRO_GOAL_SEGMENTS) {
    const goal = byIdent.get(spec.ident);
    if (!goal) {
      log(`  ! ${spec.key}: цель Метрики «${spec.ident}» не найдена — npm run metrika:goals`);
      continue;
    }

    if (byName.has(spec.name)) {
      const s = byName.get(spec.name);
      log(`  = ${spec.key}: уже есть id=${s.id} status=${s.status}`);
      skipped += 1;
      continue;
    }

    const payload = {
      segment: {
        name: spec.name,
        metrika_segment_type: "goal_id",
        metrika_segment_id: Number(goal.id),
      },
    };

    if (dryRun) {
      log(`  + ${spec.key}: создал бы из goal ${goal.id} (${spec.ident})`);
      created += 1;
      continue;
    }

    try {
      const res = await audienceFetch(audienceToken, "/segments/create_metrika", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const seg = res.segment || res;
      log(`  + ${spec.key}: id=${seg.id} status=${seg.status} ← goal ${goal.id}`);
      created += 1;
    } catch (err) {
      log(`  ! ${spec.key}: ${err.message}`);
    }
  }

  log(`\nГотово. Создано: ${created}, уже было: ${skipped}`);
  log("Далее в Директе: кампания РСЯ → условия показа = эти сегменты Audience.");
  log("UI: https://audience.yandex.com/");

  try {
    const planPath = resolve("data/micro-direct-plan.json");
    const plan = JSON.parse(readFileSync(planPath, "utf8"));
    log(`\nПлан: ${plan.campaign2Retargeting?.name || "retargeting"}`);
  } catch {
    // optional
  }
}

async function main() {
  switch (command) {
    case "status":
    case "list":
      await cmdList();
      break;
    case "sync-micro":
      await cmdSyncMicro();
      break;
    default:
      fail(`Неизвестная команда: ${command}
Команды: status | list | sync-micro [--dry-run]`);
  }
}

main().catch((err) => fail(err.message));

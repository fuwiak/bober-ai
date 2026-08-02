#!/usr/bin/env node
/**
 * One-shot Wordstat dopal: Tier 3–4 + problem-intent (deferredSeeds).
 *
 * - Nie wali API w kółko.
 * - Czeka aż zniknie 429 (probe 1 fraza co N min).
 * - Po sukcesie: merge decisions + marker + unload launchd.
 * - Kolejne uruchomienia: skip (chyba że --force).
 *
 *   npm run yandex:wordstat:deferred
 *   node scripts/wordstat-deferred-run.mjs [--force]
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { spawn, spawnSync } from "node:child_process";
import fetch from "./lib/fetch.mjs";

const ROOT = process.cwd();
const DECISIONS = resolve(ROOT, "data/wordstat-purchase-intent-decisions.json");
const SEEDS_FILE = resolve(ROOT, "data/wordstat-seeds-purchase-deferred.txt");
const CSV_OUT = resolve(ROOT, "data/wordstat-purchase-deferred.csv");
const TOTALS_OUT = resolve(ROOT, "data/wordstat-purchase-deferred-seed-totals.json");
const LOG = resolve(ROOT, "data/wordstat-deferred-run.log");
const MARKER = resolve(ROOT, "data/wordstat-deferred-done.json");
const LAUNCHD_LABEL = "ru.bober-systems.wordstat-deferred";

/** Probe interval while waiting for hourly quota (ms). */
const PROBE_EVERY_MS = 5 * 60 * 1000;
/** Max wait for 429 to clear (~70 min covers one full hour window). */
const MAX_WAIT_MS = 75 * 60 * 1000;

async function log(line) {
  const stamp = new Date().toISOString();
  const text = `[${stamp}] ${line}\n`;
  process.stdout.write(text);
  await mkdir(dirname(LOG), { recursive: true });
  await writeFile(LOG, text, { flag: "a" });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function loadEnvFile() {
  try {
    const text = await readFile(resolve(ROOT, ".env"), "utf8");
    for (const raw of text.split(/\r?\n/)) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq <= 0) continue;
      const key = line.slice(0, eq).trim();
      if (!key || process.env[key] != null) continue;
      let value = line.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  } catch {
    // optional
  }
}

/** One cheap Wordstat call — true if API accepts requests. */
async function quotaOpen() {
  const apiKey = process.env.YANDEX_SEARCH_API_KEY?.trim();
  const folderId = (
    process.env.YANDEX_SEARCH_FOLDER_ID ||
    process.env.YANDEX_FOLDER_ID ||
    ""
  ).trim();
  if (!apiKey || !folderId) throw new Error("Need YANDEX_SEARCH_API_KEY + YANDEX_SEARCH_FOLDER_ID");

  const response = await fetch("https://searchapi.api.cloud.yandex.net/v2/wordstat/topRequests", {
    method: "POST",
    headers: {
      Authorization: `Api-Key ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      phrase: "внедрение ии под ключ",
      numPhrases: 1,
      folderId,
    }),
  });
  if (response.status === 429) return false;
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Wordstat probe ${response.status}: ${body.slice(0, 200)}`);
  }
  return true;
}

async function waitUntilQuotaOpen() {
  const started = Date.now();
  while (Date.now() - started < MAX_WAIT_MS) {
    const open = await quotaOpen();
    if (open) {
      await log("Quota open — starting one deferred pass");
      return true;
    }
    const left = Math.ceil((MAX_WAIT_MS - (Date.now() - started)) / 60000);
    await log(`429 still active — sleep ${PROBE_EVERY_MS / 60000}m (≈${left}m left in wait window)`);
    await sleep(PROBE_EVERY_MS);
  }
  await log("Quota still closed after wait window — exit; leave at/launchd for next slot");
  return false;
}

function runWordstatOnce() {
  return new Promise((resolvePromise) => {
    const child = spawn(
      process.execPath,
      [
        "scripts/yandex-wordstat.mjs",
        `--file=${SEEDS_FILE}`,
        "--csv",
        "--min=1",
        "--num=30",
        `--out=${CSV_OUT}`,
      ],
      { cwd: ROOT, env: process.env, stdio: ["ignore", "pipe", "pipe"] },
    );
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
      process.stdout.write(chunk);
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
      process.stderr.write(chunk);
    });
    child.on("close", (code) => {
      resolvePromise({ code: code ?? 1, stdout, stderr });
    });
  });
}

function isQuotaError(result) {
  const blob = `${result.stdout}\n${result.stderr}`;
  return blob.includes("429") || /rate quota|requestsPerHour/i.test(blob);
}

async function mergeDecisions() {
  let decisions;
  try {
    decisions = JSON.parse(await readFile(DECISIONS, "utf8"));
  } catch {
    decisions = { liveDemand: {}, deferredSeeds: [] };
  }

  let totals = [];
  const alt = CSV_OUT.replace(/\.csv$/i, "-seed-totals.json");
  for (const path of [TOTALS_OUT, alt]) {
    try {
      const payload = JSON.parse(await readFile(path, "utf8"));
      totals = payload.seeds || [];
      if (path !== TOTALS_OUT) await writeFile(TOTALS_OUT, JSON.stringify(payload, null, 2));
      break;
    } catch {
      // try next
    }
  }

  const ok = totals.filter((s) => s.totalCount != null && !s.error);
  const failed = totals.filter((s) => s.error || s.totalCount == null);

  const tier3 = [];
  const tier4 = [];
  const problem = [];
  const other = [];

  for (const s of ok.sort((a, b) => (b.totalCount || 0) - (a.totalCount || 0))) {
    const p = s.phrase.toLowerCase();
    const row = {
      phrase: s.phrase,
      total: s.totalCount,
      exact: s.exactCount || 0,
      action: s.exactCount
        ? "exact — keywords / ads"
        : s.totalCount > 0
          ? "cluster demand — check top1"
          : "near-zero — keep for ads only",
    };
    if (
      /закрыт|защищ|on premise|on-prem|152|безопас|локальн|частн|сервер|крупн|импорт|миграц|замен/.test(
        p,
      )
    ) {
      tier3.push(row);
    } else if (
      /доработ|аудит rag|плохо|неправильн|точност|оптимиз|ускор|исправ|сменить|поддержк|n8n/.test(p)
    ) {
      tier4.push(row);
    } else if (/кто может|заявк|звонк|ручн|переписк|менеджер/.test(p)) {
      problem.push(row);
    } else {
      other.push(row);
    }
  }

  decisions.date = new Date().toISOString().slice(0, 10);
  decisions.deferredRunAt = new Date().toISOString();
  decisions.liveDemand = {
    ...decisions.liveDemand,
    tier3_enterprise: tier3,
    tier4_rescue: tier4,
    problem_intent: problem,
    deferred_other: other,
  };
  decisions.deferredSeeds = failed.map((s) => s.phrase);
  decisions.deferredStatus = failed.length
    ? `partial — ${failed.length} errors`
    : "complete — one-shot Tier 3/4 done";
  decisions.apiNote = `One-shot deferred ${decisions.deferredRunAt}. failed=${failed.length}. No recurring cron after success.`;

  await writeFile(DECISIONS, `${JSON.stringify(decisions, null, 2)}\n`);
  await writeFile(
    MARKER,
    `${JSON.stringify(
      {
        doneAt: new Date().toISOString(),
        ok: ok.length,
        failed: failed.length,
        oneShot: true,
        csv: CSV_OUT,
        decisions: DECISIONS,
      },
      null,
      2,
    )}\n`,
  );
  await log(`Merged decisions: ok=${ok.length} failed=${failed.length}`);
}

function unloadLaunchd() {
  const uid = process.getuid?.() ?? "";
  const target = `gui/${uid}/${LAUNCHD_LABEL}`;
  try {
    spawnSync("launchctl", ["bootout", target], { stdio: "ignore" });
  } catch {
    // ignore
  }
}

async function main() {
  await loadEnvFile();
  const force = process.argv.includes("--force");

  try {
    const done = JSON.parse(await readFile(MARKER, "utf8"));
    if (done?.doneAt && done.failed === 0 && !force) {
      await log(`Skip — already complete ${done.doneAt} (use --force to re-run)`);
      unloadLaunchd();
      return;
    }
  } catch {
    // first run
  }

  const open = await waitUntilQuotaOpen();
  if (!open) {
    process.exitCode = 75; // EX_TEMPFAIL — at/launchd may retry once later
    return;
  }

  const result = await runWordstatOnce();
  if (isQuotaError(result) || result.code !== 0) {
    await log("Full pass hit 429/error after probe — exit tempfail; do not loop");
    process.exitCode = 75;
    return;
  }

  const autoTotals = CSV_OUT.replace(/\.csv$/i, "-seed-totals.json");
  try {
    await writeFile(TOTALS_OUT, await readFile(autoTotals, "utf8"));
  } catch {
    // optional
  }

  await mergeDecisions();
  unloadLaunchd();
  await log("SUCCESS one-shot deferred Wordstat — launchd unloaded");
}

main().catch(async (err) => {
  await log(`FATAL ${err.message}`);
  process.exit(1);
});

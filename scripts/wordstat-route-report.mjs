#!/usr/bin/env node

/**
 * Wordstat → landing router (report only, no src/ edits).
 *
 * Reads data/wordstat-purchase-intent-decisions.json (+ optional CSV),
 * scores buy intent, maps to existing offer URLs or proposes NEW landing.
 * Never rewrites homepage / H1 / prices.
 *
 *   npm run yandex:wordstat:route
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = process.cwd();
const DECISIONS = resolve(ROOT, "data/wordstat-purchase-intent-decisions.json");
const OUT = resolve(ROOT, "data/wordstat-landing-route-report.json");
const FREEZE = resolve(ROOT, "data/wordstat-publish-frozen.json");

/** Stable offer library — map demand here first before proposing new pages. */
const OFFER_LIBRARY = [
  {
    id: "docs-1c",
    url: "/automation/ocr-data-extraction",
    service: "/services/ocr",
    patterns: [/первичн/, /распознаван.*документ/, /ocr/, /документ.*1с/, /1с.*документ/],
  },
  {
    id: "bitrix24",
    url: "/integrations/bitrix24-implementation",
    service: "/bitrix",
    patterns: [/битрикс/, /bitrix/, /внедрение crm/],
  },
  {
    id: "kp",
    url: "/automation/proposal-generation",
    service: "/automation/sales",
    patterns: [/коммерческ.*предложен/, /\bкп\b/, /proposal/, /смет.*продаж/],
  },
  {
    id: "speech",
    url: "/automation/speech-analytics-sales",
    service: "/services/voice-ai",
    patterns: [/речев/, /анализ.*звонк/, /speech/, /контрол.*звонк/, /прослуш/],
  },
  {
    id: "meeting-crm",
    url: "/automation/meeting-to-crm",
    service: "/services/ai-meeting-crm",
    patterns: [/meeting/, /встреч/, /созвон/, /протокол.*встреч/, /telemost/],
  },
];

const BUY =
  /заказать|под ключ|стоимость|цена|интегратор|подрядчик|внедрение|интеграция|автоматизация|компания|услуги/;
const REJECT = /что такое|как сделать|своими руками|бесплатно|скачать|курс|обучен|ваканси|реферат|диплом/;

function scorePhrase(phrase) {
  const p = phrase.toLowerCase();
  let score = 0;
  if (BUY.test(p)) score += 3;
  if (/bitrix|битрикс|1с|crm|amocrm/.test(p)) score += 2;
  if (/стоимость|цена|бюджет|срок/.test(p)) score += 1;
  if (REJECT.test(p)) score -= 3;
  return score;
}

function matchOffer(phrase) {
  const p = phrase.toLowerCase();
  for (const offer of OFFER_LIBRARY) {
    if (offer.patterns.some((re) => re.test(p))) return offer;
  }
  return null;
}

function collectPhrases(decisions) {
  const rows = [];
  const live = decisions.liveDemand || {};
  for (const [bucket, items] of Object.entries(live)) {
    if (!Array.isArray(items)) continue;
    for (const item of items) {
      if (typeof item === "string") {
        rows.push({ phrase: item, exact: 0, total: 0, bucket });
        continue;
      }
      if (item?.phrase) {
        rows.push({
          phrase: item.phrase,
          exact: item.exact || 0,
          total: item.total || item.totalCount || 0,
          bucket,
          action: item.action,
        });
      }
    }
  }
  return rows;
}

function main() {
  if (!existsSync(DECISIONS)) {
    console.error("Missing", DECISIONS);
    process.exit(1);
  }
  const decisions = JSON.parse(readFileSync(DECISIONS, "utf8"));
  const freeze = existsSync(FREEZE) ? JSON.parse(readFileSync(FREEZE, "utf8")) : null;

  const routes = [];
  const proposeNew = [];
  const reject = [];
  const monitor = [];

  for (const row of collectPhrases(decisions)) {
    const score = scorePhrase(row.phrase);
    const offer = matchOffer(row.phrase);
    const base = {
      phrase: row.phrase,
      score,
      exact: row.exact,
      total: row.total,
      bucket: row.bucket,
    };

    if (score < 0 || REJECT.test(row.phrase.toLowerCase())) {
      reject.push({ ...base, verdict: "reject" });
      continue;
    }
    if (offer) {
      routes.push({
        ...base,
        verdict: "assign_existing",
        landing: offer.url,
        service: offer.service,
        offerId: offer.id,
        publish: "manual_only — keep URL + H1 stable",
      });
      continue;
    }
    if (score >= 3 && (row.exact > 0 || row.total >= 20)) {
      proposeNew.push({
        ...base,
        verdict: "propose_new_landing",
        publish: "manual approve required",
        hint: "Create LandingSpec only after human OK; never auto-edit homepage",
      });
      continue;
    }
    monitor.push({ ...base, verdict: "monitor" });
  }

  const report = {
    generatedAt: new Date().toISOString(),
    freeze: freeze?.rules || null,
    summary: {
      assignExisting: routes.length,
      proposeNew: proposeNew.length,
      monitor: monitor.length,
      reject: reject.length,
    },
    offerLibrary: OFFER_LIBRARY.map((o) => ({ id: o.id, url: o.url, service: o.service })),
    assignExisting: routes.sort((a, b) => b.score - a.score || b.exact - a.exact),
    proposeNew: proposeNew.sort((a, b) => b.total - a.total),
    monitor: monitor.slice(0, 40),
    reject: reject.slice(0, 40),
    policy: {
      autoPublish: false,
      mustNotWrite: ["src/**", "homepage", "H1", "prices"],
      flow: [
        "detect growing phrase",
        "score purchase intent",
        "assign existing landing OR propose new",
        "human approve",
        "monitor positions + leads",
      ],
    },
  };

  writeFileSync(OUT, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Wrote ${OUT}`);
  console.log(
    `assign=${routes.length} proposeNew=${proposeNew.length} monitor=${monitor.length} reject=${reject.length}`,
  );
  console.log("Auto-publish: OFF (frozen).");
}

main();

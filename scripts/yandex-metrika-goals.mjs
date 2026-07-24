#!/usr/bin/env node

/**
 * Синхронизация JavaScript-целей Яндекс.Метрики с reachGoal() в коде.
 *
 *   set -a && source .env && set +a
 *   npm run metrika:goals
 *
 * Создаёт недостающие цели type=action / condition exact:<ident>.
 * Не удаляет существующие. Работает для main / partners / bitrix.
 */

import fetch from "./lib/fetch.mjs";

const MANAGEMENT_API = "https://api-metrika.yandex.net/management/v1";

const config = {
  token:
    process.env.YANDEX_OAUTH_TOKEN?.trim() ||
    process.env.YANDEX_METRIKA_OAUTH_TOKEN?.trim() ||
    process.env.YANDEX_WEBMASTER_OAUTH_TOKEN?.trim(),
  clientId: process.env.YANDEX_WEBMASTER_CLIENT_ID?.trim() || "f2e2f11ae7e3492886ad61a6e45a4c5c",
};

/** @type {Record<string, { id: string, goals: { name: string, ident: string }[] }>} */
const COUNTERS = {
  main: {
    id: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim() || "110635302",
    goals: [
      { name: "WWW: primary CTA", ident: "primary_cta_click" },
      { name: "WWW: lead delivered", ident: "lead_delivered" },
      { name: "WWW: calendar CTA", ident: "calendar_cta_click" },
      { name: "WWW: hero secondary CTA", ident: "hero_secondary_cta_click" },
      { name: "WWW: header consult CTA", ident: "header_consult_cta_click" },
      { name: "WWW: mobile consult CTA", ident: "mobile_consult_cta_click" },
      { name: "WWW: budget gate CTA", ident: "budget_gate_cta_click" },
      { name: "WWW: audit CTA", ident: "audit_cta_click" },
      { name: "WWW: service estimate CTA", ident: "service_estimate_cta_click" },
      { name: "WWW: guide CTA", ident: "guide_cta_click" },
      { name: "WWW: guide bottom CTA", ident: "guide_bottom_cta" },
      { name: "WWW: lead magnet CTA", ident: "lead_magnet_cta_click" },
      { name: "WWW: micro conversion CTA", ident: "micro_conversion_click" },
      { name: "WWW: ROI gate open", ident: "roi_calculator_gate_open" },
      { name: "WWW: ROI lead submit", ident: "roi_calculator_lead_submit" },
      { name: "WWW: ROI discuss CTA", ident: "roi_calculator_discuss_click" },
      { name: "WWW: ROI audit CTA", ident: "roi_calculator_audit_click" },
      { name: "WWW: case study view", ident: "case_study_view" },
      { name: "WWW: case study discuss", ident: "case_study_discuss_click" },
      { name: "WWW: contact intent open", ident: "contact_intent_open" },
      { name: "WWW: diagnostic step", ident: "diagnostic_step" },
      { name: "WWW: A/B assign", ident: "ab_assign" },
      { name: "WWW: career Telegram", ident: "career_telegram_click" },
      { name: "WWW: career email", ident: "career_email_click" },
    ],
  },
  partners: {
    id: process.env.NEXT_PUBLIC_PARTNERS_YANDEX_METRIKA_ID?.trim() || "110926696",
    goals: [
      { name: "Partner: CTA kontakt", ident: "partner_cta_click" },
      { name: "Partner: Telegram", ident: "partner_telegram_click" },
      { name: "Partner: start formularza", ident: "partner_form_start" },
      { name: "Partner: wysłanie formularza", ident: "partner_form_submit" },
      { name: "Partner: lead delivered", ident: "partner_lead_delivered" },
    ],
  },
  bitrix: {
    id: process.env.NEXT_PUBLIC_BITRIX_YANDEX_METRIKA_ID?.trim() || "110926887",
    goals: [
      { name: "Bitrix: CTA kontakt", ident: "bitrix_cta_click" },
      { name: "Bitrix: Telegram", ident: "bitrix_telegram_click" },
      { name: "Bitrix: WhatsApp", ident: "bitrix_whatsapp_click" },
      { name: "Bitrix: email", ident: "bitrix_email_click" },
      { name: "Bitrix: phone", ident: "bitrix_phone_click" },
      { name: "Bitrix: packages", ident: "bitrix_packages_click" },
      { name: "Bitrix: start formularza", ident: "bitrix_form_start" },
      { name: "Bitrix: wysłanie formularza", ident: "bitrix_form_submit" },
      { name: "Bitrix: lead delivered", ident: "bitrix_lead_delivered" },
    ],
  },
};

function fail(msg) {
  console.error(`\nОшибка: ${msg}`);
  process.exit(1);
}

function authHeaders() {
  return {
    Authorization: `OAuth ${config.token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

async function api(path, options = {}) {
  const response = await fetch(`${MANAGEMENT_API}${path}`, {
    ...options,
    headers: { ...authHeaders(), ...(options.headers || {}) },
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
    const details = typeof body === "string" ? body : JSON.stringify(body, null, 2);
    const err = new Error(`HTTP ${response.status}\n${details}`);
    err.status = response.status;
    err.body = body;
    throw err;
  }
  return body;
}

function existingIdents(goals) {
  const set = new Set();
  for (const g of goals || []) {
    for (const c of g.conditions || []) {
      if (c.type === "exact" && c.url) set.add(String(c.url));
    }
    // fallback: some goals store condition differently
    if (g.type === "action" && g.conditions?.[0]?.url) {
      set.add(String(g.conditions[0].url));
    }
  }
  return set;
}

async function ensureGoals(label, counterId, desired) {
  console.log(`\n[${label}] counter ${counterId}`);
  const data = await api(`/counter/${counterId}/goals`);
  const have = existingIdents(data.goals);
  let created = 0;
  let skipped = 0;

  for (const goal of desired) {
    if (have.has(goal.ident)) {
      console.log(`  = ${goal.ident}`);
      skipped += 1;
      continue;
    }
    try {
      await api(`/counter/${counterId}/goals`, {
        method: "POST",
        body: JSON.stringify({
          goal: {
            name: goal.name,
            type: "action",
            is_retargeting: 0,
            conditions: [{ type: "exact", url: goal.ident }],
          },
        }),
      });
      console.log(`  + ${goal.ident}`);
      created += 1;
      have.add(goal.ident);
    } catch (err) {
      console.error(`  ! ${goal.ident}: ${err.message}`);
    }
  }

  console.log(`  → создано ${created}, уже было ${skipped}`);
  return { created, skipped };
}

async function ensureMirrors(counterId) {
  // apex без www — иначе визиты на bober-ai.dev не попадают в счётчик www
  try {
    const cur = (await api(`/counter/${counterId}`)).counter;
    const primary = String(cur.site2?.site || cur.site || "")
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "")
      .toLowerCase();
    const mirrors = cur.mirrors2 || [];
    const mirrorSites = new Set(
      mirrors
        .map((m) => String(m.site || m).replace(/^https?:\/\//, "").replace(/\/$/, "").toLowerCase())
        .filter(Boolean),
    );
    const want = ["bober-ai.dev"];
    const toAdd = want.filter((s) => s !== primary && !mirrorSites.has(s));
    if (!toAdd.length) {
      console.log(`\n[mirrors] OK primary=${primary} mirrors=[${[...mirrorSites].join(", ") || "—"}]`);
      return;
    }
    const next = [
      ...[...mirrorSites].map((site) => ({ site })),
      ...toAdd.map((site) => ({ site })),
    ];
    await api(`/counter/${counterId}`, {
      method: "PUT",
      body: JSON.stringify({ counter: { mirrors2: next } }),
    });
    console.log(`\n[mirrors] добавлено: ${toAdd.join(", ")}`);
  } catch (err) {
    console.warn(`\n[mirrors] пропуск: ${err.message.slice(0, 300)}`);
  }
}

function printOAuthHelp() {
  console.log(`
Нужен OAuth-токен с правом metrika:write (или metrika:read+write).

1. https://oauth.yandex.ru/authorize?response_type=token&client_id=${config.clientId}
2. export YANDEX_OAUTH_TOKEN="y0_..."
`);
}

async function main() {
  if (!config.token) {
    printOAuthHelp();
    fail("Не задан YANDEX_OAUTH_TOKEN");
  }

  console.log("Яндекс.Метрика — sync action-целей");
  await ensureMirrors(COUNTERS.main.id);

  let total = 0;
  for (const [label, cfg] of Object.entries(COUNTERS)) {
    const res = await ensureGoals(label, cfg.id, cfg.goals);
    total += res.created;
  }

  console.log(`\nГотово. Новых целей: ${total}`);
  console.log("UI: https://metrika.yandex.ru/goals?id=" + COUNTERS.main.id);
}

main().catch((err) => {
  if (err.status === 401 || err.status === 403) {
    printOAuthHelp();
  }
  fail(err.message);
});

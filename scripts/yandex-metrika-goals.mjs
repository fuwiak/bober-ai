#!/usr/bin/env node

/**
 * Sync Яндекс.Метрика goals — contact + CRM quality funnel.
 *
 * Business order (optimize Direct / reports on these):
 *   1. lead_qualified / kp_sent / deal_won — ценность (CRM → /api/crm/goal)
 *   2. lead_delivered / consultation_request — заявка доставлена
 *   3. form_submit — форма отправлена (не единственная цель оптимизации)
 *   4. phone / telegram / whatsapp / max / email clicks
 *   5. primary_cta_click / contact_intent_open / form_start — intent
 *
 *   npm run metrika:goals           # ensure + prune junk
 *   npm run metrika:goals -- --keep # only create/rename, no delete
 *
 * Не ставить целью оптимизации: organic_visit, primary_cta alone, CTA-шум.
 * Direct: prefer lead_qualified / kp_sent when enough data; until then lead_delivered.
 */

import fetch from "./lib/fetch.mjs";
import { applyYagaCredentials } from "./lib/yaga-credentials.mjs";

applyYagaCredentials();

const MANAGEMENT_API = "https://api-metrika.yandex.net/management/v1";
const args = new Set(process.argv.slice(2));
const prune = !args.has("--keep") && !args.has("--no-prune");

const config = {
  token:
    process.env.YANDEX_OAUTH_TOKEN?.trim() ||
    process.env.YANDEX_METRIKA_OAUTH_TOKEN?.trim() ||
    process.env.YANDEX_WEBMASTER_OAUTH_TOKEN?.trim(),
  clientId: process.env.YANDEX_WEBMASTER_CLIENT_ID?.trim() || "f2e2f11ae7e3492886ad61a6e45a4c5c",
};

/**
 * Contact-only goals. tier:
 * - conversion — человек связался / лид доставлен
 * - channel    — клик в канал связи
 * - intent     — открыл форму / CTA «связаться»
 */
const COUNTERS = {
  main: {
    id: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim() || "110635302",
    goals: [
      // —— CRM quality (optimize Direct here when volume allows) ——
      { name: "★ CRM: Lead qualified", ident: "lead_qualified", tier: "crm" },
      { name: "★ CRM: KP sent", ident: "kp_sent", tier: "crm" },
      { name: "★ CRM: Deal won", ident: "deal_won", tier: "crm" },
      // —— conversions ——
      { name: "★ CONTACT: Lead delivered", ident: "lead_delivered", tier: "conversion" },
      { name: "★ CONTACT: Consultation request", ident: "consultation_request", tier: "conversion" },
      { name: "CONTACT: Form submit", ident: "form_submit", tier: "conversion" },
      { name: "CONTACT: Order CTA", ident: "order_cta_click", tier: "conversion" },
      { name: "CONTACT: ROI lead submit", ident: "roi_calculator_lead_submit", tier: "conversion" },
      { name: "CONTACT: Process-review lead", ident: "process_review_lead_submit", tier: "conversion" },
      // —— fast channels (Telegram / phone) ——
      // Email brings mostly cold pitches, so the fast channels are the ones we
      // optimize on: the quick dock has its own idents to keep them separable.
      { name: "★ CONTACT: Telegram quick dock", ident: "quick_telegram_click", tier: "conversion" },
      { name: "★ CONTACT: Phone quick dock", ident: "quick_phone_click", tier: "conversion" },
      { name: "★ CONTACT: Phone click", ident: "phone_click", tier: "conversion" },
      { name: "★ CONTACT: Telegram click", ident: "telegram_click", tier: "conversion" },
      // —— other channels ——
      { name: "CONTACT: Modal Telegram", ident: "modal_telegram_click", tier: "channel" },
      { name: "CONTACT: WhatsApp", ident: "modal_whatsapp_click", tier: "channel" },
      { name: "CONTACT: MAX click", ident: "max_click", tier: "channel" },
      { name: "CONTACT: Email click", ident: "email_click", tier: "channel" },
      { name: "CONTACT: Modal email", ident: "modal_email_click", tier: "channel" },
      { name: "CONTACT: Career Telegram", ident: "career_telegram_click", tier: "channel" },
      { name: "CONTACT: Career email", ident: "career_email_click", tier: "channel" },
      // —— intent ——
      { name: "CONTACT: Primary CTA (open form)", ident: "primary_cta_click", tier: "intent" },
      { name: "CONTACT: Intent open", ident: "contact_intent_open", tier: "intent" },
      { name: "CONTACT: Form start", ident: "form_start", tier: "intent" },
    ],
  },
  partners: {
    id: process.env.NEXT_PUBLIC_PARTNERS_YANDEX_METRIKA_ID?.trim() || "110926696",
    goals: [
      { name: "★ Partner CONTACT: Lead delivered", ident: "partner_lead_delivered", tier: "conversion" },
      { name: "Partner CONTACT: Form submit", ident: "partner_form_submit", tier: "conversion" },
      { name: "Partner CONTACT: Telegram", ident: "partner_telegram_click", tier: "channel" },
      { name: "Partner CONTACT: CTA", ident: "partner_cta_click", tier: "intent" },
      { name: "Partner CONTACT: Form start", ident: "partner_form_start", tier: "intent" },
    ],
  },
  bitrix: {
    id: process.env.NEXT_PUBLIC_BITRIX_YANDEX_METRIKA_ID?.trim() || "110926887",
    goals: [
      { name: "★ Bitrix CONTACT: Lead delivered", ident: "bitrix_lead_delivered", tier: "conversion" },
      { name: "Bitrix CONTACT: Form submit", ident: "bitrix_form_submit", tier: "conversion" },
      { name: "Bitrix CONTACT: Telegram", ident: "bitrix_telegram_click", tier: "channel" },
      { name: "Bitrix CONTACT: WhatsApp", ident: "bitrix_whatsapp_click", tier: "channel" },
      { name: "Bitrix CONTACT: Email", ident: "bitrix_email_click", tier: "channel" },
      { name: "Bitrix CONTACT: Phone", ident: "bitrix_phone_click", tier: "channel" },
      { name: "Bitrix CONTACT: CTA", ident: "bitrix_cta_click", tier: "intent" },
      { name: "Bitrix CONTACT: Form start", ident: "bitrix_form_start", tier: "intent" },
    ],
  },
};

/** Auto-goals that help contact (keep). CRM order autos — prune. */
const KEEP_AUTO_TYPES = new Set([
  "contact_data",
  "contact_data_sent",
  "form",
  "messenger",
  "email",
  "phone",
]);

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

function existingByIdent(goals) {
  /** @type {Map<string, any>} */
  const map = new Map();
  for (const g of goals || []) {
    for (const c of g.conditions || []) {
      if (c?.type === "exact" && c.url) {
        map.set(String(c.url), g);
      }
    }
  }
  return map;
}

function goalIdent(g) {
  for (const c of g.conditions || []) {
    if (c?.type === "exact" && c.url) return String(c.url);
  }
  return null;
}

async function ensureGoals(label, counterId, desired) {
  console.log(`\n[${label}] counter ${counterId}`);
  const data = await api(`/counter/${counterId}/goals`);
  const byIdent = existingByIdent(data.goals);
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const goal of desired) {
    const tier = goal.tier ? ` [${goal.tier}]` : "";
    const existing = byIdent.get(goal.ident);

    if (!existing) {
      try {
        const createdBody = await api(`/counter/${counterId}/goals`, {
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
        const newGoal = createdBody?.goal;
        if (newGoal?.id) byIdent.set(goal.ident, newGoal);
        console.log(`  + ${goal.ident}${tier}`);
        created += 1;
      } catch (err) {
        console.error(`  ! ${goal.ident}: ${err.message}`);
      }
      continue;
    }

    if (existing.name !== goal.name) {
      try {
        await api(`/counter/${counterId}/goal/${existing.id}`, {
          method: "PUT",
          body: JSON.stringify({
            goal: {
              name: goal.name,
              type: "action",
              is_retargeting: existing.is_retargeting ?? 0,
              conditions: existing.conditions?.length
                ? existing.conditions
                : [{ type: "exact", url: goal.ident }],
            },
          }),
        });
        console.log(`  ~ ${goal.ident}${tier}  «${existing.name}» → «${goal.name}»`);
        updated += 1;
        existing.name = goal.name;
      } catch (err) {
        console.error(`  ! rename ${goal.ident}: ${err.message}`);
        skipped += 1;
      }
      continue;
    }

    console.log(`  = ${goal.ident}${tier}`);
    skipped += 1;
  }

  console.log(`  → создано ${created}, обновлено ${updated}, без изменений ${skipped}`);
  return { created, updated, skipped, goals: (await api(`/counter/${counterId}/goals`)).goals || [] };
}

async function pruneGoals(label, counterId, desired, goals) {
  const keepIdents = new Set(desired.map((g) => g.ident));
  let deleted = 0;

  for (const g of goals) {
    const source = g.goal_source || "user";
    const ident = goalIdent(g);
    const type = g.type;

    let drop = false;
    let reason = "";

    if (source === "auto" || source === "system") {
      if (String(type).startsWith("cdp_order") || String(g.name || "").startsWith("CRM:")) {
        drop = true;
        reason = "CRM auto (не контакт)";
      } else if (!KEEP_AUTO_TYPES.has(type) && !KEEP_AUTO_TYPES.has(String(g.conditions?.[0]?.url || ""))) {
        // keep contact autos; drop unknown autos only if clearly order-related
        if (/order|cdp_/i.test(type) || /order|cdp_/i.test(g.name || "")) {
          drop = true;
          reason = "auto non-contact";
        }
      }
    } else if (ident && !keepIdents.has(ident)) {
      drop = true;
      reason = "не в contact-funnel";
    } else if (!ident && source === "user") {
      // user goal without exact ident — leave
    }

    if (!drop) continue;

    try {
      await api(`/counter/${counterId}/goal/${g.id}`, { method: "DELETE" });
      console.log(`  − #${g.id} ${ident || type} (${reason}) «${g.name}»`);
      deleted += 1;
    } catch (err) {
      console.error(`  ! delete #${g.id}: ${err.message.slice(0, 200)}`);
    }
  }

  console.log(`  → удалено ${deleted}`);
  return deleted;
}

async function ensureMirrors(counterId) {
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
    const want = ["www.bober-systems.ru", "bober-systems.ru"];
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
Нужен OAuth-токен с правом metrika:write.

1. https://oauth.yandex.ru/authorize?response_type=token&client_id=${config.clientId}
2. export YANDEX_OAUTH_TOKEN="y0_..."
`);
}

async function main() {
  if (!config.token) {
    printOAuthHelp();
    fail("Не задан YANDEX_OAUTH_TOKEN");
  }

  console.log("Яндекс.Метрика — contact-funnel goals");
  console.log(
    "Главная конверсия: lead_delivered. Дальше form_submit → каналы (phone/telegram/…) → intent.\n" +
      (prune ? "Prune: ON (удаляем шум и CRM auto)" : "Prune: OFF (--keep)"),
  );
  await ensureMirrors(COUNTERS.main.id);

  let totalCreated = 0;
  let totalUpdated = 0;
  let totalDeleted = 0;
  for (const [label, cfg] of Object.entries(COUNTERS)) {
    const res = await ensureGoals(label, cfg.id, cfg.goals);
    totalCreated += res.created;
    totalUpdated += res.updated;
    if (prune) {
      totalDeleted += await pruneGoals(label, cfg.id, cfg.goals, res.goals);
    }
  }

  console.log(`\nГотово. +${totalCreated} ~${totalUpdated} −${totalDeleted}`);
  console.log("UI: https://metrika.yandex.ru/goals?id=" + COUNTERS.main.id);
  console.log("В Direct / отчётах целью ставь ★ CONTACT: Lead delivered.");
}

main().catch((err) => {
  if (err.status === 401 || err.status === 403) {
    printOAuthHelp();
  }
  fail(err.message);
});

export const prerender = false;

import type { APIRoute } from "astro";

/**
 * Bitrix / CRM → Metrika quality goals (server-side).
 *
 * POST JSON: { goal, clientId?, revenue?, leadId? }
 * Auth: Authorization: Bearer $CRM_GOAL_SECRET  or  x-crm-goal-secret
 *
 * Goals: lead_qualified | kp_sent | deal_won
 *
 * Fires Metrika Measurement Protocol hit so Direct can optimize on value,
 * not only cheap form_submit.
 */

const ALLOWED = new Set(["lead_qualified", "kp_sent", "deal_won"]);

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

function authorized(request: Request): boolean {
  const secret = process.env.CRM_GOAL_SECRET?.trim();
  if (!secret) return false;
  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();
  const header = request.headers.get("x-crm-goal-secret")?.trim();
  return bearer === secret || header === secret;
}

async function fireMetrikaGoal(goal: string, clientId?: string, revenue?: number) {
  const counterId =
    process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim() ||
    process.env.PUBLIC_YANDEX_METRIKA_ID?.trim() ||
    "110635302";

  const params = new URLSearchParams();
  params.set("page-url", `https://www.bober-systems.ru/crm-goal/${goal}`);
  params.set("page-ref", "https://crm.bober-systems.ru/");
  // ar=1 + browser-info pv — pageview; goals via site-info / e param
  params.set("browser-info", "s:1920x1080x24::ar:1::pv:1");
  params.set("ut", "noindex");
  if (clientId) params.set("cid", clientId);
  // Goal as artificial URL path — also create action goals in Metrika (ident = goal name)
  // Measurement: append rn + site-info with goal
  const rn = String(Date.now());
  params.set("rn", rn);
  params.set(
    "site-info",
    JSON.stringify({
      goals: { [goal]: revenue && revenue > 0 ? { [String(revenue)]: revenue } : {} },
    }),
  );

  const url = `https://mc.yandex.ru/watch/${counterId}?${params.toString()}`;
  const response = await fetch(url, {
    method: "GET",
    headers: { "User-Agent": "BoberCRMGoal/1.0" },
    redirect: "follow",
  });
  return { ok: response.ok || response.status === 302, status: response.status };
}

export const POST: APIRoute = async ({ request }) => {
  if (!process.env.CRM_GOAL_SECRET?.trim()) {
    return json({ ok: false, error: "CRM_GOAL_SECRET not configured" }, 503);
  }
  if (!authorized(request)) {
    return json({ ok: false, error: "unauthorized" }, 401);
  }

  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  const goal = String(body.goal || "").trim();
  if (!ALLOWED.has(goal)) {
    return json({ ok: false, error: "invalid_goal", allowed: [...ALLOWED] }, 400);
  }

  const clientId = typeof body.clientId === "string" ? body.clientId.trim() : undefined;
  const leadId = typeof body.leadId === "string" ? body.leadId.trim() : undefined;
  const revenue =
    typeof body.revenue === "number" && Number.isFinite(body.revenue)
      ? body.revenue
      : typeof body.revenue === "string"
        ? Number(body.revenue)
        : undefined;

  try {
    const result = await fireMetrikaGoal(goal, clientId, revenue);
    console.info("[crm/goal]", { goal, leadId, revenue, metrika: result.status });
    return json({ ok: true, goal, leadId, metrikaStatus: result.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[crm/goal]", message);
    return json({ ok: false, error: message }, 502);
  }
};

export const GET: APIRoute = async () =>
  json({
    ok: true,
    service: "crm-goal",
    goals: [...ALLOWED],
    auth: "Bearer CRM_GOAL_SECRET or x-crm-goal-secret",
  });

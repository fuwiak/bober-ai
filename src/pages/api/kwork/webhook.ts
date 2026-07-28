export const prerender = false;

import type { APIRoute } from "astro";

/**
 * Inbound webhook stub for Kwork → Bitrix24 (ported from Next route).
 * Auth: X-Kwork-Webhook-Secret or Authorization Bearer must match KWORK_WEBHOOK_SECRET.
 */

type KworkOrderPayload = {
  order_id?: string | number;
  orderId?: string | number;
  id?: string | number;
  buyer_name?: string;
  buyerName?: string;
  buyer?: string;
  title?: string;
  order_title?: string;
  budget?: string | number;
  price?: string | number;
  status?: string;
  order_url?: string;
  url?: string;
  email?: string;
  phone?: string;
  notes?: string;
};

function authorize(request: Request): boolean {
  const secret = process.env.KWORK_WEBHOOK_SECRET?.trim();
  if (!secret) return true;
  const header = request.headers.get("x-kwork-webhook-secret")?.trim();
  const auth = request.headers.get("authorization")?.trim();
  const bearer = auth?.toLowerCase().startsWith("bearer ") ? auth.slice(7).trim() : "";
  return header === secret || bearer === secret;
}

export const POST: APIRoute = async ({ request }) => {
  if (!authorize(request)) {
    return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = (await request.json().catch(() => ({}))) as
    | KworkOrderPayload
    | { orders?: KworkOrderPayload[]; items?: KworkOrderPayload[] };

  const orders: KworkOrderPayload[] = Array.isArray((body as { orders?: KworkOrderPayload[] }).orders)
    ? (body as { orders: KworkOrderPayload[] }).orders
    : Array.isArray((body as { items?: KworkOrderPayload[] }).items)
      ? (body as { items: KworkOrderPayload[] }).items
      : [body as KworkOrderPayload];

  // Stub acceptance — full Bitrix sync remains in scripts/kwork-bitrix-sync.mjs
  return new Response(
    JSON.stringify({
      ok: true,
      received: orders.length,
      note: "accepted; process via npm run kwork:bitrix:sync for full sync",
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
};

export const GET: APIRoute = async () =>
  new Response(JSON.stringify({ ok: true, service: "kwork-webhook" }), {
    headers: { "Content-Type": "application/json" },
  });

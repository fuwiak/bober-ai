/**
 * Inbound webhook stub for Kwork → Bitrix24.
 *
 * У Kwork нет официальных исходящих webhooks. Этот endpoint — задел:
 * - ручной POST из n8n/Make/скрипта;
 * - будущий прокси, если Kwork когда-нибудь откроет события.
 *
 * Auth: заголовок `X-Kwork-Webhook-Secret` или `Authorization: Bearer <secret>`
 * должен совпадать с KWORK_WEBHOOK_SECRET (если секрет задан).
 *
 * Body (JSON): один заказ или { orders: [...] } — те же поля, что в CSV-синке:
 *   order_id, buyer_name, title, budget, status, order_url, ...
 *
 * Локальный импорт пачкой: npm run kwork:bitrix:sync -- --json …
 */

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type KworkOrderPayload = {
  order_id?: string | number;
  orderId?: string | number;
  id?: string | number;
  buyer_name?: string;
  buyerName?: string;
  buyer?: string;
  buyer_username?: string;
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

type Body =
  | KworkOrderPayload
  | {
      orders?: KworkOrderPayload[];
      items?: KworkOrderPayload[];
      event?: string;
    };

const SOURCE_ID = (process.env.KWORK_SOURCE_ID || "KWORK").trim().toUpperCase();
const ORIGINATOR_ID = "kwork";
const PROFILE =
  process.env.KWORK_PROFILE_URL?.trim() || "https://kwork.ru/user/pasha_stasinski";

function portalRestBase(): string {
  const endpoint = process.env.BITRIX24_CLIENT_ENDPOINT?.trim();
  if (endpoint) return endpoint.replace(/\/?$/, "/");
  const portal = (process.env.BITRIX24_PORTAL?.trim() || "https://b24-tuh0lz.bitrix24.ru").replace(
    /\/$/,
    "",
  );
  return `${portal}/rest/`;
}

function isExpired(expiresAtRaw: string | undefined, skewMs = 60_000): boolean {
  if (!expiresAtRaw) return false;
  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt <= 0) return false;
  return Date.now() >= expiresAt - skewMs;
}

async function refreshBitrixAccessToken(): Promise<string | null> {
  const clientId = process.env.BITRIX24_CLIENT_ID?.trim();
  const clientSecret = process.env.BITRIX24_CLIENT_SECRET?.trim();
  const refreshToken = process.env.BITRIX24_REFRESH_TOKEN?.trim();
  if (!clientId || !clientSecret || !refreshToken) return null;

  const url = new URL("https://oauth.bitrix.info/oauth/token/");
  url.searchParams.set("grant_type", "refresh_token");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("client_secret", clientSecret);
  url.searchParams.set("refresh_token", refreshToken);

  const response = await fetch(url.toString(), { headers: { Accept: "application/json" } });
  const body = (await response.json().catch(() => ({}))) as {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    client_endpoint?: string;
    error?: string;
  };
  if (!response.ok || !body.access_token) return null;

  process.env.BITRIX24_ACCESS_TOKEN = body.access_token;
  if (body.refresh_token) process.env.BITRIX24_REFRESH_TOKEN = body.refresh_token;
  if (body.expires_in) {
    process.env.BITRIX24_TOKEN_EXPIRES_AT = String(Date.now() + Number(body.expires_in) * 1000);
  }
  if (body.client_endpoint) process.env.BITRIX24_CLIENT_ENDPOINT = body.client_endpoint;
  return body.access_token;
}

async function getAccessToken(): Promise<string | null> {
  const current = process.env.BITRIX24_ACCESS_TOKEN?.trim();
  if (current && !isExpired(process.env.BITRIX24_TOKEN_EXPIRES_AT)) return current;
  if (process.env.BITRIX24_REFRESH_TOKEN?.trim()) return refreshBitrixAccessToken();
  return current || null;
}

async function bitrixCall<T>(
  method: string,
  params: Record<string, unknown>,
  token: string,
): Promise<T> {
  const response = await fetch(`${portalRestBase()}${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...params, auth: token }),
  });
  const body = (await response.json().catch(() => ({}))) as {
    result?: T;
    error?: string;
    error_description?: string;
  };
  if (!response.ok || body.error) {
    throw new Error(body.error_description || body.error || `http_${response.status}`);
  }
  return body.result as T;
}

function normalize(raw: KworkOrderPayload) {
  const orderId = String(raw.order_id ?? raw.orderId ?? raw.id ?? "").trim();
  const title = String(raw.title ?? raw.order_title ?? "Заказ Kwork").trim();
  const buyerName = String(raw.buyer_name ?? raw.buyerName ?? raw.buyer ?? "Покупатель Kwork").trim();
  const budget = raw.budget ?? raw.price;
  const status = String(raw.status || "unknown").trim();
  let orderUrl = String(raw.order_url ?? raw.url ?? "").trim();
  if (!orderUrl && /^\d+$/.test(orderId)) {
    orderUrl = `https://kwork.ru/tracker/view?id=${orderId}`;
  }
  return {
    orderId: orderId || `wh-${Date.now()}`,
    title,
    buyerName,
    budget: budget != null ? String(budget) : "",
    status,
    orderUrl,
    email: String(raw.email || "").trim(),
    phone: String(raw.phone || "").trim(),
    notes: String(raw.notes || "").trim(),
    buyerUsername: String(raw.buyer_username || "").trim(),
  };
}

function authorize(request: NextRequest): boolean {
  const secret = process.env.KWORK_WEBHOOK_SECRET?.trim();
  if (!secret) return true;
  const header = request.headers.get("x-kwork-webhook-secret")?.trim();
  if (header && header === secret) return true;
  const auth = request.headers.get("authorization")?.trim() || "";
  if (auth.toLowerCase().startsWith("bearer ") && auth.slice(7).trim() === secret) {
    return true;
  }
  return false;
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "kwork-bitrix-webhook",
    profile: PROFILE,
    note:
      "Kwork не шлёт официальные webhooks. POST JSON заказа(ов) с X-Kwork-Webhook-Secret. " +
      "Пакетный импорт: npm run kwork:bitrix:sync",
  });
}

export async function POST(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (process.env.BITRIX24_LEADS_ENABLED === "0") {
    return NextResponse.json({ error: "disabled" }, { status: 503 });
  }

  const token = await getAccessToken();
  if (!token) {
    return NextResponse.json({ error: "no_bitrix_token" }, { status: 503 });
  }

  const body = (await request.json().catch(() => ({}))) as Body;
  const rawList: KworkOrderPayload[] = Array.isArray((body as { orders?: unknown }).orders)
    ? ((body as { orders: KworkOrderPayload[] }).orders)
    : Array.isArray((body as { items?: unknown }).items)
      ? ((body as { items: KworkOrderPayload[] }).items)
      : [body as KworkOrderPayload];

  const orders = rawList.map(normalize).filter((o) => o.orderId);
  if (!orders.length) {
    return NextResponse.json({ error: "empty_payload" }, { status: 400 });
  }

  const results: Array<{ orderId: string; ok: boolean; id?: number; error?: string }> = [];

  for (const order of orders) {
    try {
      const existing = await bitrixCall<Array<{ ID: string }>>(
        "crm.lead.list",
        {
          filter: { ORIGINATOR_ID, ORIGIN_ID: order.orderId },
          select: ["ID"],
        },
        token,
      );
      const comments = [
        `Источник: Kwork (${PROFILE})`,
        order.orderUrl ? `Заказ: ${order.orderUrl}` : `Order ID: ${order.orderId}`,
        `Статус Kwork: ${order.status}`,
        order.budget ? `Бюджет: ${order.budget}` : "",
        order.buyerUsername ? `Покупатель @${order.buyerUsername}` : "",
        order.notes,
        `event=webhook`,
      ]
        .filter(Boolean)
        .join("\n")
        .slice(0, 5000);

      const fields: Record<string, unknown> = {
        TITLE: `[Kwork] ${order.title} — ${order.buyerName}`,
        NAME: order.buyerName,
        SOURCE_ID,
        SOURCE_DESCRIPTION: `Kwork · ${order.status}`,
        COMMENTS: comments,
        OPENED: "Y",
        ORIGINATOR_ID,
        ORIGIN_ID: order.orderId,
      };
      const opp = Number(String(order.budget).replace(/[^\d.,]/g, "").replace(",", "."));
      if (Number.isFinite(opp) && opp > 0) {
        fields.OPPORTUNITY = opp;
        fields.CURRENCY_ID = "RUB";
      }
      if (order.email) fields.EMAIL = [{ VALUE: order.email, VALUE_TYPE: "WORK" }];
      if (order.phone) fields.PHONE = [{ VALUE: order.phone, VALUE_TYPE: "WORK" }];

      let id: number;
      if (existing?.[0]?.ID) {
        await bitrixCall("crm.lead.update", { id: existing[0].ID, fields }, token);
        id = Number(existing[0].ID);
      } else {
        id = await bitrixCall<number>("crm.lead.add", { fields }, token);
      }
      results.push({ orderId: order.orderId, ok: true, id });
    } catch (err) {
      results.push({
        orderId: order.orderId,
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  const failed = results.filter((r) => !r.ok).length;
  return NextResponse.json({
    ok: failed === 0,
    sourceId: SOURCE_ID,
    results,
  });
}

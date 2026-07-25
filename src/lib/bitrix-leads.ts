/**
 * Создание лидов в Битрикс24 CRM из заявок сайта.
 * Источник TELEGRAM — отдельный канал (crm.status SOURCE).
 */

type BitrixTokenBundle = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  expires?: number;
  client_endpoint?: string;
};

export type BitrixLeadInput = {
  name: string;
  contact: string;
  message: string;
  service?: string;
  company?: string;
  phone?: string;
  email?: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  landingPage?: string;
};

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
  const body = (await response.json().catch(() => ({}))) as BitrixTokenBundle & {
    error?: string;
    error_description?: string;
  };
  if (!response.ok || body.error || !body.access_token) {
    console.error("[bitrix] refresh failed", body.error || body.error_description || response.status);
    return null;
  }

  process.env.BITRIX24_ACCESS_TOKEN = body.access_token;
  if (body.refresh_token) process.env.BITRIX24_REFRESH_TOKEN = body.refresh_token;
  const expiresAt = body.expires_in
    ? Date.now() + Number(body.expires_in) * 1000
    : body.expires
      ? Number(body.expires) * 1000
      : 0;
  if (expiresAt) process.env.BITRIX24_TOKEN_EXPIRES_AT = String(expiresAt);
  if (body.client_endpoint) process.env.BITRIX24_CLIENT_ENDPOINT = body.client_endpoint;

  return body.access_token;
}

async function getAccessToken(): Promise<string | null> {
  const current = process.env.BITRIX24_ACCESS_TOKEN?.trim();
  if (current && !isExpired(process.env.BITRIX24_TOKEN_EXPIRES_AT)) return current;
  if (process.env.BITRIX24_REFRESH_TOKEN?.trim()) {
    return refreshBitrixAccessToken();
  }
  return current || null;
}

/** Канал лида: Telegram vs сайт. */
export function resolveBitrixLeadSourceId(input: BitrixLeadInput): "TELEGRAM" | "WEB" {
  const blob = [input.source, input.utmSource, input.contact, input.phone, input.message]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (
    /\btelegram\b|\btg\b|t\.me\//i.test(blob) ||
    input.utmSource?.toLowerCase() === "telegram" ||
    input.source?.toLowerCase().includes("telegram") ||
    /(^|\s)@[\w\d_]{4,}/.test(blob)
  ) {
    return "TELEGRAM";
  }
  return "WEB";
}

function pickEmail(input: BitrixLeadInput): string | undefined {
  if (input.email?.includes("@")) return input.email.trim();
  if (input.contact.includes("@") && !input.contact.trim().startsWith("@")) {
    const match = input.contact.match(/[^\s<>]+@[^\s<>]+/);
    return match?.[0];
  }
  return undefined;
}

function pickPhone(input: BitrixLeadInput): string | undefined {
  const raw = input.phone || input.contact;
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.replace(/\D/g, "").length >= 10) return digits;
  return undefined;
}

function pickTelegram(input: BitrixLeadInput): string | undefined {
  const raw = `${input.phone || ""} ${input.contact || ""}`;
  const at = raw.match(/@[\w\d_]{4,}/);
  if (at) return at[0];
  const tme = raw.match(/t\.me\/([\w\d_]+)/i);
  if (tme) return `@${tme[1]}`;
  return undefined;
}

export async function createBitrixLead(
  input: BitrixLeadInput,
): Promise<{ ok: true; id: number; sourceId: string } | { ok: false; error: string }> {
  if (process.env.BITRIX24_LEADS_ENABLED === "0") {
    return { ok: false, error: "disabled" };
  }

  const token = await getAccessToken();
  if (!token) return { ok: false, error: "no_token" };

  const sourceId = resolveBitrixLeadSourceId(input);
  const email = pickEmail(input);
  const phone = pickPhone(input);
  const telegram = pickTelegram(input);

  const comments = [
    input.message,
    input.service ? `Услуга: ${input.service}` : "",
    input.source ? `Источник формы: ${input.source}` : "",
    telegram ? `Telegram: ${telegram}` : "",
    input.landingPage ? `Landing: ${input.landingPage}` : "",
    input.utmSource ? `utm_source: ${input.utmSource}` : "",
    input.utmMedium ? `utm_medium: ${input.utmMedium}` : "",
    input.utmCampaign ? `utm_campaign: ${input.utmCampaign}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const fields: Record<string, unknown> = {
    TITLE: input.service ? `${input.service} — ${input.name}` : `Заявка с сайта — ${input.name}`,
    NAME: input.name,
    SOURCE_ID: sourceId,
    SOURCE_DESCRIPTION: sourceId === "TELEGRAM" ? "Telegram" : "Сайт bober-ai.dev",
    COMMENTS: comments.slice(0, 5000),
    OPENED: "Y",
  };
  if (input.company) fields.COMPANY_TITLE = input.company;
  if (email) fields.EMAIL = [{ VALUE: email, VALUE_TYPE: "WORK" }];
  if (phone) fields.PHONE = [{ VALUE: phone, VALUE_TYPE: "WORK" }];
  if (telegram) fields.IM = [{ VALUE: telegram, VALUE_TYPE: "TELEGRAM" }];

  const response = await fetch(`${portalRestBase()}crm.lead.add`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ fields, auth: token }),
  });
  const body = (await response.json().catch(() => ({}))) as {
    result?: number;
    error?: string;
    error_description?: string;
  };

  if (!response.ok || body.error || typeof body.result !== "number") {
    return {
      ok: false,
      error: body.error_description || body.error || `http_${response.status}`,
    };
  }

  return { ok: true, id: body.result, sourceId };
}

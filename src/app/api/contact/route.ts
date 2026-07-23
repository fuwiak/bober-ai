import { NextRequest, NextResponse } from "next/server";
import type { Attribution } from "@/lib/analytics";
import { deliverContactLead } from "@/lib/contact-delivery";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  contact?: string;
  message?: string;
  service?: string;
  company?: string;
  phone?: string;
  email?: string;
  source?: string;
  policyAccepted?: boolean;
  consent?: boolean;
  attribution?: Attribution;
  /** Honeypot — leave empty; bots often fill it */
  website?: string;
};

function requireString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as Payload;

  // Silent success for honeypot fills — do not tip off bots.
  if (requireString(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = requireString(body.name);
  const phone = requireString(body.phone);
  const email = requireString(body.email);
  const contact =
    requireString(body.contact) ||
    [phone && `Телефон / Telegram: ${phone}`, email && `Email: ${email}`].filter(Boolean).join("\n");
  const message = requireString(body.message) || "—";
  const service = requireString(body.service);
  const company = requireString(body.company);
  const source = requireString(body.source);
  const consent = body.consent === true;
  const policyAccepted = body.policyAccepted === true;
  const attribution = body.attribution;

  if (!name || !contact) {
    return NextResponse.json(
      { error: "invalid_payload", message: "Заполните обязательные поля" },
      { status: 400 },
    );
  }

  if (!policyAccepted) {
    return NextResponse.json(
      {
        error: "policy_required",
        message: "Необходимо ознакомление с политикой обработки персональных данных",
      },
      { status: 400 },
    );
  }

  if (!consent) {
    return NextResponse.json(
      { error: "consent_required", message: "Необходимо согласие на обработку персональных данных" },
      { status: 400 },
    );
  }

  const result = await deliverContactLead({
    name,
    contact,
    message,
    service: service || undefined,
    company: company || undefined,
    phone: phone || undefined,
    email: email || undefined,
    source: source || undefined,
    attribution,
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error, message: result.message },
      { status: result.status },
    );
  }

  if ("dryRun" in result && result.dryRun) {
    return NextResponse.json({ ok: true, dryRun: true, preview: result.preview });
  }

  return NextResponse.json({ ok: true, leadId: "leadId" in result ? result.leadId : undefined });
}

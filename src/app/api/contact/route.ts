import { NextRequest, NextResponse } from "next/server";
import { CONTACT_NOTIFICATION_EMAILS } from "@/lib/site";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  contact?: string;
  message?: string;
  policyAccepted?: boolean;
  consent?: boolean;
};

function requireString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as Payload;
  const name = requireString(body.name);
  const contact = requireString(body.contact);
  const message = requireString(body.message) || "—";
  const consent = body.consent === true;
  const policyAccepted = body.policyAccepted === true;

  if (!name || !contact) {
    return NextResponse.json({ error: "invalid_payload", message: "Заполните обязательные поля" }, { status: 400 });
  }

  if (!policyAccepted) {
    return NextResponse.json(
      { error: "policy_required", message: "Необходимо ознакомление с политикой обработки персональных данных" },
      { status: 400 },
    );
  }

  if (!consent) {
    return NextResponse.json(
      { error: "consent_required", message: "Необходимо согласие на обработку персональных данных" },
      { status: 400 },
    );
  }

  const envRecipients = process.env.CONTACT_TO_EMAIL
    ? process.env.CONTACT_TO_EMAIL.split(",").map((email) => email.trim()).filter(Boolean)
    : [];
  const to = envRecipients.length > 0 ? envRecipients : [...CONTACT_NOTIFICATION_EMAILS];
  const subject = `Заявка с сайта Bober AI Dev от ${name}`;
  const text = [`Имя: ${name}`, `Контакт: ${contact}`, "", "Сообщение:", message].join("\n");

  if (process.env.CONTACT_DRY_RUN === "1") {
    return NextResponse.json({ ok: true, dryRun: true, preview: { to, subject, text } });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  if (!resendApiKey) {
    return NextResponse.json(
      { error: "email_not_configured", message: "RESEND_API_KEY не настроен на сервере" },
      { status: 500 },
    );
  }

  const html = `
    <h2>Новая заявка с сайта Bober AI Dev</h2>
    <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
    <p><strong>Контакт:</strong> ${escapeHtml(contact)}</p>
    <p><strong>Сообщение:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
      html,
      reply_to: contact.includes("@") ? contact : undefined,
    }),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    return NextResponse.json(
      { error: "email_failed", message: `Не удалось отправить письмо: ${details.slice(0, 200)}` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

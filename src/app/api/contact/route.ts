import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { CONTACT_NOTIFICATION_EMAILS, SITE_NAME } from "@/lib/site";

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
  const subject = `Заявка с сайта ${SITE_NAME} от ${name}`;
  const text = [`Имя: ${name}`, `Контакт: ${contact}`, "", "Сообщение:", message].join("\n");

  if (process.env.CONTACT_DRY_RUN === "1") {
    return NextResponse.json({ ok: true, dryRun: true, preview: { to, subject, text } });
  }

  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpPort = Number(process.env.SMTP_PORT || "465");
  const smtpSecure = (process.env.SMTP_SECURE || "1") === "1";
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!smtpHost || !smtpUser || !smtpPass || !from) {
    return NextResponse.json(
      {
        error: "email_not_configured",
        message: "Не настроена отправка почты: задайте SMTP_HOST/SMTP_PORT/SMTP_SECURE/SMTP_USER/SMTP_PASS/CONTACT_FROM_EMAIL",
      },
      { status: 500 },
    );
  }

  const html = `
    <h2>Новая заявка с сайта ${SITE_NAME}</h2>
    <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
    <p><strong>Контакт:</strong> ${escapeHtml(contact)}</p>
    <p><strong>Сообщение:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
  `;

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const replyTo = contact.includes("@") ? contact : undefined;

    await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
      replyTo,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "SMTP error";
    return NextResponse.json({ error: "email_failed", message: `Не удалось отправить письмо: ${message}` }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

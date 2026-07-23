import { appendFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import nodemailer from "nodemailer";
import type { Attribution } from "@/lib/analytics";
import { CONTACT_NOTIFICATION_EMAILS, SITE_NAME } from "@/lib/site";

export type ContactLead = {
  name: string;
  contact: string;
  message: string;
  service?: string;
  company?: string;
  phone?: string;
  email?: string;
  attribution?: Attribution;
  source?: string;
};

export type ContactDeliveryResult =
  | { ok: true; dryRun: true; preview: { to: string[]; subject: string; text: string } }
  | { ok: true; dryRun?: false; leadId: string }
  | { ok: false; error: string; message: string; status: number };

function formatAttribution(attribution?: Attribution): string[] {
  if (!attribution) return [];
  const lines: string[] = [];
  if (attribution.landing_page) lines.push(`Landing: ${attribution.landing_page}`);
  if (attribution.utm_source) lines.push(`utm_source: ${attribution.utm_source}`);
  if (attribution.utm_medium) lines.push(`utm_medium: ${attribution.utm_medium}`);
  if (attribution.utm_campaign) lines.push(`utm_campaign: ${attribution.utm_campaign}`);
  if (attribution.utm_content) lines.push(`utm_content: ${attribution.utm_content}`);
  if (attribution.utm_term) lines.push(`utm_term: ${attribution.utm_term}`);
  if (attribution.yclid) lines.push(`yclid: ${attribution.yclid}`);
  return lines;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function recipients(): string[] {
  const envRecipients = process.env.CONTACT_TO_EMAIL
    ? process.env.CONTACT_TO_EMAIL.split(",")
        .map((email) => email.trim())
        .filter(Boolean)
    : [];
  return envRecipients.length > 0 ? envRecipients : [...CONTACT_NOTIFICATION_EMAILS];
}

function buildBodies(lead: ContactLead) {
  const attributionLines = formatAttribution(lead.attribution);
  const subject = lead.service
    ? `Заявка: ${lead.service} — ${lead.name}`
    : `Заявка с сайта ${SITE_NAME} от ${lead.name}`;

  const text = [
    `Имя: ${lead.name}`,
    `Контакт: ${lead.contact}`,
    lead.company ? `Компания: ${lead.company}` : "",
    lead.phone ? `Телефон / Telegram: ${lead.phone}` : "",
    lead.email ? `Email: ${lead.email}` : "",
    lead.service ? `Услуга: ${lead.service}` : "",
    lead.source ? `Источник формы: ${lead.source}` : "",
    "",
    "Сообщение:",
    lead.message,
    ...(attributionLines.length > 0 ? ["", "Источник:", ...attributionLines] : []),
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <h2>Новая заявка с сайта ${escapeHtml(SITE_NAME)}</h2>
    <p><strong>Имя:</strong> ${escapeHtml(lead.name)}</p>
    <p><strong>Контакт:</strong> ${escapeHtml(lead.contact)}</p>
    ${lead.company ? `<p><strong>Компания:</strong> ${escapeHtml(lead.company)}</p>` : ""}
    ${lead.phone ? `<p><strong>Телефон / Telegram:</strong> ${escapeHtml(lead.phone)}</p>` : ""}
    ${lead.email ? `<p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>` : ""}
    ${lead.service ? `<p><strong>Услуга:</strong> ${escapeHtml(lead.service)}</p>` : ""}
    ${lead.source ? `<p><strong>Источник формы:</strong> ${escapeHtml(lead.source)}</p>` : ""}
    <p><strong>Сообщение:</strong></p>
    <p>${escapeHtml(lead.message).replace(/\n/g, "<br/>")}</p>
    ${
      attributionLines.length > 0
        ? `<p><strong>Источник:</strong></p><ul>${attributionLines
            .map((line) => `<li>${escapeHtml(line)}</li>`)
            .join("")}</ul>`
        : ""
    }
  `;

  return { to: recipients(), subject, text, html, attributionLines };
}

async function persistLead(lead: ContactLead, leadId: string, text: string) {
  const logPath = process.env.LEADS_LOG_PATH?.trim();
  if (!logPath) return;

  await mkdir(dirname(logPath), { recursive: true });
  const row = JSON.stringify({
    id: leadId,
    at: new Date().toISOString(),
    ...lead,
    text,
  });
  await appendFile(logPath, `${row}\n`, "utf8");
}

async function notifyTelegram(subject: string, text: string) {
  const token = process.env.CONTACT_TELEGRAM_BOT_TOKEN?.trim() || process.env.TELEGRAM_BOT_KEY?.trim();
  const chatId = process.env.CONTACT_TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) return;

  const body = `🆕 ${subject}\n\n${text}`.slice(0, 3900);
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: body,
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Telegram notify failed: ${response.status} ${detail}`);
  }
}

export async function deliverContactLead(lead: ContactLead): Promise<ContactDeliveryResult> {
  const { to, subject, text, html } = buildBodies(lead);
  const leadId = `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

  if (process.env.CONTACT_DRY_RUN === "1") {
    await persistLead(lead, leadId, text).catch(() => undefined);
    return { ok: true, dryRun: true, preview: { to, subject, text } };
  }

  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpPort = Number(process.env.SMTP_PORT || "465");
  const smtpSecure = (process.env.SMTP_SECURE || "1") === "1";
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!smtpHost || !smtpUser || !smtpPass || !from) {
    return {
      ok: false,
      error: "email_not_configured",
      message:
        "Не настроена отправка почты: задайте SMTP_HOST/SMTP_PORT/SMTP_SECURE/SMTP_USER/SMTP_PASS/CONTACT_FROM_EMAIL",
      status: 500,
    };
  }

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

    const replyTo =
      lead.email?.includes("@") ? lead.email : lead.contact.includes("@") ? lead.contact : undefined;

    await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
      replyTo,
    });

    await persistLead(lead, leadId, text).catch(() => undefined);
    await notifyTelegram(subject, text).catch((error) => {
      console.error("[contact] telegram notify failed", error);
    });

    return { ok: true, leadId };
  } catch (error) {
    const message = error instanceof Error ? error.message : "SMTP error";
    return {
      ok: false,
      error: "email_failed",
      message: `Не удалось отправить письмо: ${message}`,
      status: 502,
    };
  }
}

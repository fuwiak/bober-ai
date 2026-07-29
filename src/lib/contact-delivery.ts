import { appendFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import nodemailer from "nodemailer";
import type { Attribution } from "@/lib/analytics";
import { createBitrixLead } from "@/lib/bitrix-leads";
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

async function persistLead(lead: ContactLead, leadId: string, text: string): Promise<boolean> {
  const logPath = process.env.LEADS_LOG_PATH?.trim() || "/app/data/leads.jsonl";

  try {
    await mkdir(dirname(logPath), { recursive: true });
    const row = JSON.stringify({
      id: leadId,
      at: new Date().toISOString(),
      ...lead,
      text,
    });
    await appendFile(logPath, `${row}\n`, "utf8");
    return true;
  } catch (error) {
    console.error("[contact] persist lead failed", error);
    return false;
  }
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

async function sendSmtpMail(params: {
  to: string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpPort = Number(process.env.SMTP_PORT || "465");
  const smtpSecure = (process.env.SMTP_SECURE || "1") === "1";
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!smtpHost || !smtpUser || !smtpPass || !from) {
    return { ok: false, error: "email_not_configured" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      connectionTimeout: 8_000,
      greetingTimeout: 8_000,
      socketTimeout: 15_000,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from,
      to: params.to,
      subject: params.subject,
      text: params.text,
      html: params.html,
      replyTo: params.replyTo,
    });
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "SMTP error";
    console.error("[contact] smtp failed", message);
    return { ok: false, error: message };
  }
}

export async function deliverContactLead(lead: ContactLead): Promise<ContactDeliveryResult> {
  const { to, subject, text, html } = buildBodies(lead);
  const leadId = `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

  if (process.env.CONTACT_DRY_RUN === "1") {
    await persistLead(lead, leadId, text);
    return { ok: true, dryRun: true, preview: { to, subject, text } };
  }

  const replyTo =
    lead.email?.includes("@") ? lead.email : lead.contact.includes("@") ? lead.contact : undefined;

  // Selectel (and many VDS) block outbound SMTP — skip instead of hanging the form.
  const skipSmtp =
    process.env.CONTACT_SKIP_SMTP === "1" ||
    !process.env.SMTP_HOST?.trim() ||
    !process.env.SMTP_USER?.trim() ||
    !process.env.SMTP_PASS?.trim() ||
    !process.env.CONTACT_FROM_EMAIL?.trim();
  const mail = skipSmtp
    ? ({ ok: false, error: "smtp_skipped" } as const)
    : await sendSmtpMail({ to, subject, text, html, replyTo });

  const logged = await persistLead(lead, leadId, text);
  await notifyTelegram(subject, text).catch((error) => {
    console.error("[contact] telegram notify failed", error);
  });

  const bitrixResult = await createBitrixLead({
    name: lead.name,
    contact: lead.contact,
    message: lead.message,
    service: lead.service,
    company: lead.company,
    phone: lead.phone,
    email: lead.email,
    source: lead.source,
    utmSource: lead.attribution?.utm_source,
    utmMedium: lead.attribution?.utm_medium,
    utmCampaign: lead.attribution?.utm_campaign,
    landingPage: lead.attribution?.landing_page,
  }).catch((error) => {
    console.error("[contact] bitrix lead failed", error);
    return null;
  });
  if (bitrixResult && !bitrixResult.ok && bitrixResult.error !== "disabled" && bitrixResult.error !== "no_token") {
    console.error("[contact] bitrix lead error", bitrixResult.error);
  }

  const bitrixOk = Boolean(bitrixResult?.ok);
  const hasTelegram =
    Boolean(process.env.CONTACT_TELEGRAM_BOT_TOKEN?.trim() || process.env.TELEGRAM_BOT_KEY?.trim()) &&
    Boolean(process.env.CONTACT_TELEGRAM_CHAT_ID?.trim());

  // Accept Bitrix / Telegram / on-disk log as delivery — SMTP is optional on VDS.
  if (mail.ok || bitrixOk || logged || hasTelegram) {
    if (!mail.ok) {
      console.warn("[contact] delivered without SMTP", {
        leadId,
        bitrixOk,
        logged,
        hasTelegram,
        mailError: mail.error,
      });
    }
    return { ok: true, leadId };
  }

  return {
    ok: false,
    error: "delivery_failed",
    message: `Не удалось доставить заявку: ${mail.error}`,
    status: 502,
  };
}

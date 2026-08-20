#!/usr/bin/env node
/**
 * Send a one-off SMTP test for the contact form pipeline.
 *
 *   node --env-file=.env scripts/contact-smtp-test.mjs
 *   node --env-file=.env scripts/contact-smtp-test.mjs --to you@example.com
 *
 * Ignores CONTACT_DRY_RUN / CONTACT_SKIP_SMTP — always tries real SMTP.
 */
import nodemailer from "nodemailer";

const args = process.argv.slice(2);
const toArgIdx = args.indexOf("--to");
const toOverride = toArgIdx >= 0 ? args[toArgIdx + 1] : "";

const host = process.env.SMTP_HOST?.trim();
const port = Number(process.env.SMTP_PORT || "465");
const secure = (process.env.SMTP_SECURE || "1") === "1";
const user = process.env.SMTP_USER?.trim();
const pass = process.env.SMTP_PASS?.trim();
const from = process.env.CONTACT_FROM_EMAIL?.trim() || user;
const to = (toOverride || process.env.CONTACT_TO_EMAIL || process.env.PUBLIC_CONTACT_EMAIL || "contact@bober-systems.ru")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

if (!host || !user || !pass || !from) {
  console.error("SMTP incomplete. Need SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_FROM_EMAIL.");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 20_000,
  auth: { user, pass },
});

const subject = "[TEST] Formularz kontaktowy Bober — SMTP";
const when = new Date().toISOString();
const text = `Mail testowy formularza kontaktowego.

Czas: ${when}
From: ${from}
To: ${to.join(", ")}
Host: ${host}:${port}

Jeśli widzisz tę wiadomość — SMTP działa.
Na VDS ustaw SMTP_* w deploy/.env i CONTACT_SKIP_SMTP=0.
`;

const info = await transporter.sendMail({
  from,
  to,
  subject,
  text,
  html: `<p><strong>Mail testowy</strong> formularza kontaktowego Bober.</p>
<p>Czas: <code>${when}</code></p>
<p>Jeśli widzisz tę wiadomość — SMTP działa.</p>`,
});

console.log(
  JSON.stringify(
    {
      ok: true,
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
      to,
      from,
      host,
      port,
    },
    null,
    2,
  ),
);

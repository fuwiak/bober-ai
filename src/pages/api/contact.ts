export const prerender = false;

import type { APIRoute } from "astro";
import { deliverContactLead } from "@/lib/contact-delivery";
import type { Attribution } from "@/lib/analytics";

function requireString(value: FormDataEntryValue | null | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

function htmlResponse(body: string, status = 200) {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function successHtml(locale: string) {
  const msg =
    locale === "en"
      ? "Thanks — we will reply within 4 business hours."
      : "Спасибо — ответим в течение 4 рабочих часов.";
  return `<div class="contact-form space-y-4 rounded-lg border border-hairline bg-surface-card p-6" role="status">
    <p class="body-copy text-success">${msg}</p>
  </div>`;
}

function errorHtml(message: string) {
  return `<div class="contact-form space-y-4" role="alert">
    <p class="body-copy text-error">${message}</p>
    <p class="text-sm text-muted">Попробуйте ещё раз или напишите в Telegram.</p>
  </div>`;
}

export const POST: APIRoute = async ({ request }) => {
  const contentType = request.headers.get("content-type") || "";
  let name = "";
  let contact = "";
  let message = "—";
  let service = "";
  let company = "";
  let phone = "";
  let email = "";
  let source = "";
  let website = "";
  let consent = false;
  let policyAccepted = false;
  let attribution: Attribution | undefined;
  let locale = "ru";

  if (contentType.includes("application/json")) {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    website = requireString(body.website as string);
    name = requireString(body.name as string);
    phone = requireString(body.phone as string);
    email = requireString(body.email as string);
    contact =
      requireString(body.contact as string) ||
      [phone && `Телефон / Telegram: ${phone}`, email && `Email: ${email}`].filter(Boolean).join("\n");
    message = requireString(body.message as string) || "—";
    service = requireString(body.service as string);
    company = requireString(body.company as string);
    source = requireString(body.source as string);
    consent = body.consent === true || body.consent === "true";
    policyAccepted = body.policyAccepted === true || body.policyAccepted === "true";
    attribution = body.attribution as Attribution | undefined;
    locale = body.locale === "en" ? "en" : "ru";
  } else {
    const form = await request.formData();
    website = requireString(form.get("website"));
    name = requireString(form.get("name"));
    phone = requireString(form.get("phone"));
    email = requireString(form.get("email"));
    contact =
      requireString(form.get("contact")) ||
      [phone && `Телефон / Telegram: ${phone}`, email && `Email: ${email}`].filter(Boolean).join("\n");
    const baseMessage = requireString(form.get("message")) || "—";
    const qualifyBits = [
      requireString(form.get("processType")) && `Процесс: ${requireString(form.get("processType"))}`,
      requireString(form.get("systems")) && `Системы: ${requireString(form.get("systems"))}`,
      requireString(form.get("budget")) && `Бюджет: ${requireString(form.get("budget"))}`,
      requireString(form.get("timeline")) && `Сроки: ${requireString(form.get("timeline"))}`,
    ].filter(Boolean);
    message =
      qualifyBits.length > 0
        ? `${baseMessage}\n\nКвалификация:\n${qualifyBits.join("\n")}`
        : baseMessage;
    service = requireString(form.get("service"));
    company = requireString(form.get("company"));
    source = requireString(form.get("source"));
    consent = form.get("consent") === "true" || form.get("consent") === "on";
    policyAccepted =
      form.get("policyAccepted") === "true" || form.get("policyAccepted") === "on";
    locale = form.get("locale") === "en" ? "en" : "ru";
    attribution = {
      utm_source: requireString(form.get("utm_source")) || undefined,
      utm_medium: requireString(form.get("utm_medium")) || undefined,
      utm_campaign: requireString(form.get("utm_campaign")) || undefined,
      utm_content: requireString(form.get("utm_content")) || undefined,
      utm_term: requireString(form.get("utm_term")) || undefined,
      yclid: requireString(form.get("yclid")) || undefined,
      landing_page: requireString(form.get("landing_page")) || "/",
    };
  }

  // Honeypot — silent success
  if (website) {
    return htmlResponse(successHtml(locale));
  }

  if (!name || !contact) {
    return htmlResponse(
      errorHtml(locale === "en" ? "Fill required fields" : "Заполните обязательные поля"),
      400,
    );
  }

  if (!policyAccepted || !consent) {
    return htmlResponse(
      errorHtml(
        locale === "en"
          ? "Consent to personal data processing is required"
          : "Необходимо согласие на обработку персональных данных",
      ),
      400,
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
    return htmlResponse(errorHtml(result.message), result.status);
  }

  return htmlResponse(successHtml(locale));
};

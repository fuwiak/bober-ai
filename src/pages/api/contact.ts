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
    locale === "uz"
      ? "Rahmat — 4 ish soati ichida javob beramiz."
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

/** Full document for native form POST (no HTMX) — Yandex / no-JS browsers. */
function fullPageHtml(title: string, bodyInner: string, backHref: string) {
  const safeBack = backHref.startsWith("/") ? backHref : "/";
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    body{font-family:system-ui,sans-serif;max-width:40rem;margin:3rem auto;padding:0 1.25rem;line-height:1.5;color:#111}
    .ok{color:#0a7a3e}.err{color:#b00020} a{color:#0b57d0}
  </style>
</head>
<body>
  ${bodyInner}
  <p style="margin-top:1.5rem"><a href="${safeBack}">← Вернуться</a></p>
</body>
</html>`;
}

export const POST: APIRoute = async ({ request }) => {
  const contentType = request.headers.get("content-type") || "";
  const isHtmx = request.headers.get("HX-Request") === "true";
  const referer = request.headers.get("referer") || "";
  let backPath = "/";
  try {
    if (referer) backPath = new URL(referer).pathname || "/";
  } catch {
    backPath = "/";
  }

  const respondHtml = (fragment: string, status = 200, title = "Заявка") => {
    if (isHtmx) return htmlResponse(fragment, status);
    const isError = status >= 400;
    const wrapped = isError
      ? `<h1 class="err">${title}</h1>${fragment}`
      : `<h1 class="ok">${title}</h1>${fragment}`;
    return htmlResponse(fullPageHtml(title, wrapped, backPath), status);
  };

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
    locale = ["uz", "kz", "ru"].includes(String(body.locale)) ? String(body.locale) : "ru";
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
    const formLocale = requireString(form.get("locale"));
    locale = ["uz", "kz", "ru"].includes(formLocale) ? formLocale : "ru";
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

  const wantsJson = contentType.includes("application/json");
  const json = (body: Record<string, unknown>, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });

  // Honeypot — silent success
  if (website) {
    return wantsJson
      ? json({ ok: true, dryRun: true })
      : respondHtml(successHtml(locale), 200, locale === "uz" ? "Buyurtma qabul qilindi" : "Заявка принята");
  }

  if (!name || !contact) {
    const messageText =
      locale === "uz" ? "Majburiy maydonlarni toʻldiring" : "Заполните обязательные поля";
    return wantsJson
      ? json({ ok: false, message: messageText }, 400)
      : respondHtml(errorHtml(messageText), 400, locale === "uz" ? "Xato" : "Ошибка");
  }

  if (!policyAccepted || !consent) {
    const messageText =
      locale === "uz"
        ? "Shaxsiy maʼlumotlarni qayta ishlashga rozilik kerak"
        : "Необходимо согласие на обработку персональных данных";
    return wantsJson
      ? json({ ok: false, message: messageText }, 400)
      : respondHtml(errorHtml(messageText), 400, locale === "uz" ? "Xato" : "Ошибка");
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
    return wantsJson
      ? json({ ok: false, message: result.message, error: result.error }, result.status)
      : respondHtml(errorHtml(result.message), result.status, locale === "uz" ? "Xato" : "Ошибка");
  }

  if (wantsJson) {
    return json({
      ok: true,
      leadId: "leadId" in result ? result.leadId : undefined,
      dryRun: "dryRun" in result ? result.dryRun : undefined,
    });
  }

  return respondHtml(
    successHtml(locale),
    200,
    locale === "uz" ? "Buyurtma qabul qilindi" : "Заявка принята",
  );
};

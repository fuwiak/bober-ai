"use client";

import NextLink from "next/link";
import { useState, type FormEvent } from "react";
import { getAttribution, reachGoal } from "@/lib/analytics";
import { LEGAL_ROUTES } from "@/lib/legal";
import { CONTACT_EMAIL } from "@/lib/site";

type Props = { locale: string };

export function ProcessReviewForm({ locale }: Props) {
  const ru = locale !== "en";
  const [description, setDescription] = useState("");
  const [systems, setSystems] = useState("");
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!consentAccepted) {
      setStatus("error");
      setErrorText(
        ru ? "Подтвердите согласие на обработку персональных данных" : "Please confirm consent to data processing",
      );
      return;
    }
    if (!description.trim()) {
      setStatus("error");
      setErrorText(ru ? "Опишите процесс" : "Describe the process");
      return;
    }
    if (!email.trim()) {
      setStatus("error");
      setErrorText(ru ? "Укажите email" : "Enter your email");
      return;
    }

    setStatus("sending");
    setErrorText("");

    const attribution = getAttribution();
    const message = [
      ru ? "Разбор одного процесса — заявка:" : "Single process review — request:",
      "",
      description.trim(),
      systems.trim() ? `\n${ru ? "Системы" : "Systems"}: ${systems.trim()}` : "",
      reference.trim() ? `${ru ? "Пример / скриншот" : "Example / screenshot"}: ${reference.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const contactValue = [email.trim() && `Email: ${email.trim()}`, telegram.trim() && `Telegram: ${telegram.trim()}`]
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: email.trim(),
          contact: contactValue,
          email: email.trim(),
          message,
          source: "process-review-intake",
          policyAccepted: true,
          consent: true,
          attribution,
          website: "",
        }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        message?: string;
        ok?: boolean;
        leadId?: string;
        dryRun?: boolean;
      };
      if (!response.ok) {
        throw new Error(data.message || (ru ? "Не удалось отправить заявку" : "Failed to send request"));
      }
      reachGoal("process_review_lead_submit", { leadId: data.leadId });
      if (data.ok && data.leadId && !data.dryRun) {
        reachGoal("lead_delivered", { source: "process-review-intake" });
      }
      setStatus("ok");
    } catch (error) {
      const subject = encodeURIComponent(ru ? "Разбор процесса — Bober AI" : "Process review — Bober AI");
      const body = encodeURIComponent(
        [`Email: ${email.trim()}`, telegram.trim() ? `Telegram: ${telegram.trim()}` : "", "", message]
          .filter(Boolean)
          .join("\n"),
      );
      setStatus("error");
      setErrorText(error instanceof Error ? error.message : ru ? "Ошибка отправки" : "Send error");
      window.setTimeout(() => {
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      }, 600);
    }
  }

  if (status === "ok") {
    return (
      <div className="roi-calculator__success" role="status" aria-live="polite">
        <p className="card-title text-xl">{ru ? "Заявка отправлена" : "Request sent"}</p>
        <p className="body-copy mt-3 text-base">
          {ru
            ? "Мы разберём процесс и ответим в течение одного рабочего дня (24 часа)."
            : "We'll review the process and reply within one business day (24 hours)."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="roi-calculator space-y-6">
      <div>
        <label htmlFor="process-description" className="form-label">
          {ru ? "Опишите один ручной процесс" : "Describe one manual process"}
        </label>
        <textarea
          id="process-description"
          rows={5}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={
            ru
              ? "Например: менеджер вручную собирает КП из прайса в Excel и шаблона Word"
              : "e.g. a manager manually assembles a quote from an Excel price list and a Word template"
          }
          className="textarea-input mt-2"
        />
      </div>
      <div>
        <label htmlFor="process-systems" className="form-label">
          {ru ? "Какие системы задействованы" : "Which systems are involved"}{" "}
          <span className="text-muted-soft">{ru ? "(необязательно)" : "(optional)"}</span>
        </label>
        <input
          id="process-systems"
          value={systems}
          onChange={(e) => setSystems(e.target.value)}
          placeholder={ru ? "Bitrix24, 1С, Excel…" : "Bitrix24, 1C, Excel…"}
          className="text-input mt-2"
        />
      </div>
      <div>
        <label htmlFor="process-reference" className="form-label">
          {ru ? "Ссылка на скриншот или пример документа" : "Link to a screenshot or example document"}{" "}
          <span className="text-muted-soft">{ru ? "(необязательно)" : "(optional)"}</span>
        </label>
        <input
          id="process-reference"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          placeholder="https://…"
          className="text-input mt-2"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="process-email" className="form-label">
            Email
          </label>
          <input
            id="process-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={ru ? "you@company.ru" : "you@company.com"}
            className="text-input mt-2"
          />
        </div>
        <div>
          <label htmlFor="process-telegram" className="form-label">
            Telegram <span className="text-muted-soft">{ru ? "(необязательно)" : "(optional)"}</span>
          </label>
          <input
            id="process-telegram"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            placeholder="@username"
            className="text-input mt-2"
          />
        </div>
      </div>
      <label htmlFor="process-consent" className="flex cursor-pointer items-start gap-3">
        <input
          id="process-consent"
          type="checkbox"
          checked={consentAccepted}
          onChange={(e) => setConsentAccepted(e.target.checked)}
          required
          className="mt-1 h-4 w-4 shrink-0 border-hairline-strong accent-ink"
        />
        <span className="text-sm leading-relaxed text-muted">
          {ru ? "Я ознакомлен(а) с" : "I have read the"}{" "}
          <NextLink href={LEGAL_ROUTES.privacyPolicy} className="text-link" target="_blank">
            {ru ? "политикой обработки персональных данных" : "privacy policy"}
          </NextLink>{" "}
          {ru ? "и даю" : "and give"}{" "}
          <NextLink href={LEGAL_ROUTES.consent} className="text-link" target="_blank">
            {ru ? "согласие на обработку персональных данных" : "consent to data processing"}
          </NextLink>
          .
        </span>
      </label>
      <button type="submit" disabled={!consentAccepted || status === "sending"} className="btn-primary w-full">
        {status === "sending" ? (ru ? "Отправляем…" : "Sending…") : ru ? "Отправить процесс на разбор" : "Submit process for review"}
      </button>
      {status === "error" ? <p className="text-sm text-error">{errorText}</p> : null}
    </form>
  );
}

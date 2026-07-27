"use client";

import NextLink from "next/link";
import { useState, type FormEvent } from "react";
import { ContactCta } from "@/components/ContactCta";
import { reachGoal, getAttribution } from "@/lib/analytics";
import { LEGAL_ROUTES } from "@/lib/legal";
import { CONTACT_EMAIL } from "@/lib/site";

type LeadCaptureGateProps = {
  locale: string;
  /** Analytics source tag + lead-delivery `source` field, e.g. "process-audit-quiz". */
  source: string;
  /** Called at submit time to build the full message body from current answers. */
  getMessage: () => string;
  /** Shown after a successful submit. */
  successText: string;
  serviceLabel?: string;
  gateSubtitle?: string;
  goalParams?: Record<string, unknown>;
};

/**
 * Shared "send the full result to email/Telegram" gate used by lead-magnet
 * quizzes: show a useful result for free, then require contact info only
 * for the detailed follow-up. Mirrors RoiCalculator's capture flow.
 */
export function LeadCaptureGate({
  locale,
  source,
  getMessage,
  successText,
  serviceLabel,
  gateSubtitle,
  goalParams,
}: LeadCaptureGateProps) {
  const ru = locale !== "en";
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
    if (!email.trim()) {
      setStatus("error");
      setErrorText(ru ? "Укажите email" : "Enter your email");
      return;
    }

    setStatus("sending");
    setErrorText("");

    const attribution = getAttribution();
    const message = getMessage();
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
          service: serviceLabel || undefined,
          source,
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
      reachGoal(`${source}_lead_submit`, { ...goalParams, leadId: data.leadId });
      if (data.ok && data.leadId && !data.dryRun) {
        reachGoal("lead_delivered", { ...goalParams, source });
      }
      setStatus("ok");
      setConsentAccepted(false);
    } catch (error) {
      const subject = encodeURIComponent(
        ru ? `Заявка: ${serviceLabel || "Bober AI"}` : `Request: ${serviceLabel || "Bober AI"}`,
      );
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
      <div className="roi-calculator__success mt-8" role="status" aria-live="polite">
        <p className="card-title text-xl">{ru ? "Заявка отправлена" : "Request sent"}</p>
        <p className="body-copy mt-3 text-base">{successText}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ContactCta goal={`${source}_discuss_click`}>{ru ? "Обсудить проект" : "Discuss a project"}</ContactCta>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="roi-calculator__gate mt-8 space-y-5">
      <div>
        <p className="card-title text-xl">{ru ? "Куда отправить результат" : "Where should we send the result"}</p>
        {gateSubtitle ? <p className="body-copy mt-2 text-sm">{gateSubtitle}</p> : null}
      </div>
      <div>
        <label htmlFor={`${source}-email`} className="form-label">
          Email
        </label>
        <input
          id={`${source}-email`}
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
        <label htmlFor={`${source}-telegram`} className="form-label">
          Telegram <span className="text-muted-soft">{ru ? "(необязательно)" : "(optional)"}</span>
        </label>
        <input
          id={`${source}-telegram`}
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
          placeholder={ru ? "@username или +7…" : "@username or phone"}
          className="text-input mt-2"
        />
      </div>
      <label htmlFor={`${source}-consent`} className="flex cursor-pointer items-start gap-3">
        <input
          id={`${source}-consent`}
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
        {status === "sending" ? (ru ? "Отправляем…" : "Sending…") : (ru ? "Отправить результат" : "Send the result")}
      </button>
      {status === "error" ? <p className="text-sm text-error">{errorText}</p> : null}
    </form>
  );
}

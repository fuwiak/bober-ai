"use client";

import NextLink from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { getAttribution, reachGoal } from "@/lib/analytics";
import { LEGAL_ROUTES } from "@/lib/legal";
import { CONTACT_EMAIL } from "@/lib/site";

type ContactFormProps = {
  defaultService?: string;
  defaultMessage?: string;
  onSuccess?: () => void;
  trackingPrefix?: string;
};

const SUCCESS_CLOSE_MS = 2400;

export function ContactForm({
  defaultService = "",
  defaultMessage = "",
  onSuccess,
  trackingPrefix = "",
}: ContactFormProps) {
  const t = useTranslations("form");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState(defaultMessage);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorText, setErrorText] = useState("");
  const formStartedRef = useRef(false);

  const canSubmit = consentAccepted && status !== "sending";

  useEffect(() => {
    if (status !== "ok" || !onSuccess) return;
    const timer = window.setTimeout(() => onSuccess(), SUCCESS_CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [onSuccess, status]);

  function trackFormStart() {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    reachGoal(trackingPrefix ? `${trackingPrefix}_form_start` : "form_start");
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!consentAccepted) {
      setStatus("error");
      setErrorText(t("errorConsent"));
      return;
    }

    setStatus("sending");
    setErrorText("");

    const parts = [defaultService ? `Услуга: ${defaultService}` : "", message.trim()].filter(Boolean);
    const fullMessage = parts.length > 0 ? parts.join("\n\n") : "—";
    const attribution = getAttribution();
    const attrLines = [
      attribution.landing_page && `Landing: ${attribution.landing_page}`,
      attribution.utm_source && `utm_source: ${attribution.utm_source}`,
      attribution.utm_campaign && `utm_campaign: ${attribution.utm_campaign}`,
      attribution.yclid && `yclid: ${attribution.yclid}`,
    ].filter(Boolean);

    const subject = encodeURIComponent(
      defaultService ? `Заявка: ${defaultService}` : `Заявка с сайта Bober AI`,
    );
    const body = encodeURIComponent(
      [
        `Имя: ${name.trim()}`,
        `Контакт: ${contact.trim()}`,
        "",
        fullMessage,
        ...(attrLines.length ? ["", ...attrLines] : []),
      ].join("\n"),
    );

    reachGoal(trackingPrefix ? `${trackingPrefix}_form_submit` : "form_submit", {
      service: defaultService || undefined,
    });
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setStatus("ok");
    setName("");
    setContact("");
    setMessage("");
    setConsentAccepted(false);
  }

  if (status === "ok") {
    return (
      <div className="contact-form-success" role="status" aria-live="polite">
        <div className="contact-form-success__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="contact-form-success__check">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="contact-form-success__title">{t("successTitle")}</p>
        <p className="contact-form-success__text">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="contact-form space-y-6">
      <div>
        <label htmlFor="name" className="form-label">
          {t("name")}
        </label>
        <input
          id="name"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={trackFormStart}
          className="text-input"
        />
      </div>

      <div>
        <label htmlFor="contact" className="form-label">
          {t("contact")}
        </label>
        <input
          id="contact"
          required
          autoComplete="email tel"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="text-input"
          placeholder={t("contactPlaceholder")}
        />
      </div>

      <div>
        <label htmlFor="message" className="form-label">
          {t("message")} <span className="text-muted-soft">{t("optional")}</span>
        </label>
        <textarea
          id="message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("messagePlaceholder")}
          className="textarea-input"
        />
      </div>

      <div className="border-t border-hairline pt-6">
        <label htmlFor="pd-consent" className="flex items-start gap-3 cursor-pointer">
          <input
            id="pd-consent"
            type="checkbox"
            checked={consentAccepted}
            onChange={(e) => setConsentAccepted(e.target.checked)}
            required
            className="mt-1 h-4 w-4 shrink-0 border-hairline-strong accent-ink"
          />
          <span className="text-sm leading-relaxed text-muted">
            {t("consentCombined")}{" "}
            <NextLink href={LEGAL_ROUTES.privacyPolicy} className="text-link" target="_blank">
              {t("policyLink")}
            </NextLink>{" "}
            {t("consentAnd")}{" "}
            <NextLink href={LEGAL_ROUTES.consent} className="text-link" target="_blank">
              {t("consentLink")}
            </NextLink>
            .
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className={`contact-submit btn-primary w-full${status === "sending" ? " contact-submit--sending" : ""}`}
      >
        <span className="contact-submit__label">{status === "sending" ? t("submitting") : t("submit")}</span>
        {status === "sending" ? <span className="contact-submit__spinner" aria-hidden="true" /> : null}
      </button>

      {status === "error" ? <p className="text-sm text-error">{errorText}</p> : null}
    </form>
  );
}

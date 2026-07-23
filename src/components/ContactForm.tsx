"use client";

import NextLink from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useFormLengthVariant } from "@/hooks/useAbVariant";
import { getAttribution, reachGoal } from "@/lib/analytics";
import { LEGAL_ROUTES } from "@/lib/legal";
import { CONTACT_EMAIL } from "@/lib/site";

type ContactFormProps = {
  defaultService?: string;
  defaultMessage?: string;
  onSuccess?: () => void;
  trackingPrefix?: string;
  /** Extended fields for company / deployment; Kaspersky is optional only */
  extended?: boolean;
  /** Short pre-meeting qualification selects (optional answers) */
  qualify?: boolean;
  /** When true (default), A/B short form drops qualify + extended extras */
  abTestLength?: boolean;
};

const SUCCESS_CLOSE_MS = 2400;

export function ContactForm({
  defaultService = "",
  defaultMessage = "",
  onSuccess,
  trackingPrefix = "",
  extended = false,
  qualify = false,
  abTestLength = true,
}: ContactFormProps) {
  const t = useTranslations("form");
  const formLength = useFormLengthVariant();
  const shortForm = abTestLength && formLength === "short";
  const showExtended = extended && !shortForm;
  const showQualify = qualify && !shortForm;

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState(defaultMessage);
  const [deployment, setDeployment] = useState("");
  const [processType, setProcessType] = useState("");
  const [systems, setSystems] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [kasperskyOptional, setKasperskyOptional] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorText, setErrorText] = useState("");
  const [mailtoHref, setMailtoHref] = useState("");
  const formStartedRef = useRef(false);

  const canSubmit = consentAccepted && status !== "sending";
  const deploymentOptions = t.raw("deploymentOptions") as string[];
  const processOptions = t.raw("processOptions") as string[];
  const systemsOptions = t.raw("systemsOptions") as string[];
  const budgetOptions = t.raw("budgetOptions") as string[];
  const timelineOptions = t.raw("timelineOptions") as string[];

  useEffect(() => {
    if (status !== "ok" || !onSuccess) return;
    const timer = window.setTimeout(() => onSuccess(), SUCCESS_CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [onSuccess, status]);

  function trackFormStart() {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    reachGoal(trackingPrefix ? `${trackingPrefix}_form_start` : "form_start", {
      form_length: formLength,
    });
  }

  function buildMailtoHref(fullMessage: string, contactLine: string[], attrLines: string[]) {
    const subject = encodeURIComponent(
      defaultService ? `Заявка: ${defaultService}` : `Заявка с сайта Bober AI`,
    );
    const body = encodeURIComponent(
      [
        `Имя: ${name.trim()}`,
        ...contactLine,
        "",
        fullMessage,
        ...(attrLines.length ? ["", ...attrLines] : []),
      ].join("\n"),
    );
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!consentAccepted) {
      setStatus("error");
      setErrorText(t("errorConsent"));
      return;
    }

    setStatus("sending");
    setErrorText("");
    setMailtoHref("");

    const contactLine = showExtended
      ? [`Телефон / Telegram: ${phone.trim()}`, `Email: ${email.trim()}`]
      : [`Контакт: ${contact.trim()}`];

    const parts = [
      defaultService ? `Услуга: ${defaultService}` : "",
      showExtended && company.trim() ? `Компания: ${company.trim()}` : "",
      showQualify && processType ? `Процесс: ${processType}` : "",
      showQualify && systems ? `Системы: ${systems}` : "",
      showQualify && budget ? `Бюджет: ${budget}` : "",
      showQualify && timeline ? `Сроки: ${timeline}` : "",
      showExtended && deployment ? `Контур: ${deployment}` : "",
      showExtended && kasperskyOptional ? "Опция: защита инфраструктуры (Kaspersky)" : "",
      shortForm ? `AB form_length: short` : "",
      message.trim(),
    ].filter(Boolean);
    const fullMessage = parts.length > 0 ? parts.join("\n\n") : "—";
    const attribution = getAttribution();
    const attrLines = [
      attribution.landing_page && `Landing: ${attribution.landing_page}`,
      attribution.utm_source && `utm_source: ${attribution.utm_source}`,
      attribution.utm_campaign && `utm_campaign: ${attribution.utm_campaign}`,
      attribution.yclid && `yclid: ${attribution.yclid}`,
    ].filter(Boolean) as string[];

    const contactValue = showExtended
      ? [phone.trim() && `Телефон / Telegram: ${phone.trim()}`, email.trim() && `Email: ${email.trim()}`]
          .filter(Boolean)
          .join("\n")
      : contact.trim();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          contact: contactValue,
          message: fullMessage,
          service: defaultService || undefined,
          company: showExtended ? company.trim() || undefined : undefined,
          phone: showExtended ? phone.trim() || undefined : undefined,
          email: showExtended ? email.trim() || undefined : undefined,
          source: trackingPrefix || "contact-form",
          policyAccepted: true,
          consent: true,
          attribution,
          website: honeypot,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        message?: string;
        ok?: boolean;
        leadId?: string;
        dryRun?: boolean;
      };
      if (!response.ok) {
        throw new Error(data.message || t("errorSend"));
      }

      const goalParams = {
        service: defaultService || undefined,
        form_length: formLength,
        leadId: data.leadId,
      };
      reachGoal(trackingPrefix ? `${trackingPrefix}_form_submit` : "form_submit", goalParams);

      // Confirms actual delivery (SMTP path returned leadId), not dry-run / honeypot ack.
      if (data.ok && data.leadId && !data.dryRun) {
        reachGoal(trackingPrefix ? `${trackingPrefix}_lead_delivered` : "lead_delivered", goalParams);
      }

      setStatus("ok");
      setName("");
      setCompany("");
      setPhone("");
      setEmail("");
      setContact("");
      setMessage("");
      setDeployment("");
      setProcessType("");
      setSystems("");
      setBudget("");
      setTimeline("");
      setKasperskyOptional(false);
      setConsentAccepted(false);
    } catch (error) {
      setStatus("error");
      setErrorText(error instanceof Error ? error.message : t("errorGeneric"));
      setMailtoHref(buildMailtoHref(fullMessage, contactLine, attrLines));
    }
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
    <form onSubmit={onSubmit} className="contact-form space-y-6" data-form-length={formLength}>
      <p className="body-copy text-sm text-muted">{shortForm ? t("introShort") : t("intro")}</p>
      {/* Honeypot — hidden from users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
      />
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

      {showExtended ? (
        <>
          <div>
            <label htmlFor="company" className="form-label">
              {t("company")}
            </label>
            <input
              id="company"
              required
              autoComplete="organization"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="text-input"
            />
          </div>

          <div>
            <label htmlFor="phone" className="form-label">
              {t("phone")}
            </label>
            <input
              id="phone"
              required
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="text-input"
              placeholder={t("phonePlaceholder")}
            />
          </div>

          <div>
            <label htmlFor="email" className="form-label">
              {t("email")}
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-input"
              placeholder={t("emailPlaceholder")}
            />
          </div>
        </>
      ) : (
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
      )}

      {showQualify ? (
        <fieldset className="contact-qualify">
          <legend className="form-label">{t("qualifyLegend")}</legend>
          <p className="body-copy mb-4 text-sm text-muted">{t("qualifyHint")}</p>
          <div className="contact-qualify__grid">
            <div>
              <label htmlFor="process-type" className="form-label">
                {t("processType")} <span className="text-muted-soft">{t("optional")}</span>
              </label>
              <select
                id="process-type"
                value={processType}
                onChange={(e) => setProcessType(e.target.value)}
                className="text-input"
              >
                <option value="">{t("selectPlaceholder")}</option>
                {processOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="systems" className="form-label">
                {t("systems")} <span className="text-muted-soft">{t("optional")}</span>
              </label>
              <select
                id="systems"
                value={systems}
                onChange={(e) => setSystems(e.target.value)}
                className="text-input"
              >
                <option value="">{t("selectPlaceholder")}</option>
                {systemsOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="budget" className="form-label">
                {t("budget")} <span className="text-muted-soft">{t("optional")}</span>
              </label>
              <select
                id="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="text-input"
              >
                <option value="">{t("selectPlaceholder")}</option>
                {budgetOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="timeline" className="form-label">
                {t("timeline")} <span className="text-muted-soft">{t("optional")}</span>
              </label>
              <select
                id="timeline"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="text-input"
              >
                <option value="">{t("selectPlaceholder")}</option>
                {timelineOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
      ) : null}

      {!shortForm ? (
        <div>
          <label htmlFor="message" className="form-label">
            {t("message")} {showExtended ? null : <span className="text-muted-soft">{t("optional")}</span>}
          </label>
          <textarea
            id="message"
            rows={showExtended ? 4 : 3}
            required={showExtended}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("messagePlaceholder")}
            className="textarea-input"
          />
        </div>
      ) : null}

      {showExtended ? (
        <>
          <div>
            <label htmlFor="deployment" className="form-label">
              {t("deployment")}
            </label>
            <select
              id="deployment"
              required
              value={deployment}
              onChange={(e) => setDeployment(e.target.value)}
              className="text-input"
            >
              <option value="">{t("selectPlaceholder")}</option>
              {deploymentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <label htmlFor="kaspersky-optional" className="flex cursor-pointer items-start gap-3">
            <input
              id="kaspersky-optional"
              type="checkbox"
              checked={kasperskyOptional}
              onChange={(e) => setKasperskyOptional(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 border-hairline-strong accent-ink"
            />
            <span className="text-sm leading-relaxed text-muted">
              {t("kasperskyNeed")} <span className="text-muted-soft">{t("optional")}</span>
            </span>
          </label>
        </>
      ) : null}

      <div className="border-t border-hairline pt-6">
        <label htmlFor="pd-consent" className="flex cursor-pointer items-start gap-3">
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

      {status === "error" ? (
        <div className="space-y-2">
          <p className="text-sm text-error">{errorText}</p>
          {mailtoHref ? (
            <p className="text-sm text-muted">
              {t("mailtoFallbackHint")}{" "}
              <a href={mailtoHref} className="text-link">
                {t("mailtoFallbackLink")}
              </a>
            </p>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}

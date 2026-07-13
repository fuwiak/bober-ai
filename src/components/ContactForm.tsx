"use client";

import NextLink from "next/link";
import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { LEGAL_ROUTES } from "@/lib/legal";

type ContactFormProps = {
  defaultService?: string;
};

function ConsentCheckbox({
  id,
  checked,
  onChange,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required
        className="mt-1 h-4 w-4 shrink-0 border-hairline-strong accent-ink"
      />
      <label htmlFor={id} className="text-sm leading-relaxed text-muted">
        {children}
      </label>
    </div>
  );
}

export function ContactForm({ defaultService = "" }: ContactFormProps) {
  const t = useTranslations("form");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [company, setCompany] = useState("");
  const [budget, setBudget] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [service, setService] = useState(defaultService);
  const [message, setMessage] = useState("");
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  const budgetOptions = t.raw("budgetOptions") as string[];
  const companyTypeOptions = t.raw("companyTypeOptions") as string[];
  const canSubmit = policyAccepted && consentAccepted;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("sending");
    setErrorText("");

    const parts = [
      company ? `Компания: ${company}` : "",
      companyType ? `Тип: ${companyType}` : "",
      budget ? `Бюджет: ${budget}` : "",
      service ? `Услуга: ${service}` : "",
      message,
    ].filter(Boolean);

    const fullMessage = parts.join("\n\n");

    if (!policyAccepted) {
      setStatus("error");
      setErrorText(t("errorPolicy"));
      return;
    }

    if (!consentAccepted) {
      setStatus("error");
      setErrorText(t("errorConsent"));
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          message: fullMessage,
          policyAccepted: true,
          consent: true,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) {
        throw new Error(data.message || t("errorSend"));
      }
      setStatus("ok");
      setName("");
      setContact("");
      setCompany("");
      setBudget("");
      setCompanyType("");
      setMessage("");
      setPolicyAccepted(false);
      setConsentAccepted(false);
    } catch (error) {
      setStatus("error");
      setErrorText(error instanceof Error ? error.message : t("errorGeneric"));
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div>
        <label htmlFor="name" className="form-label">
          {t("name")}
        </label>
        <input id="name" required value={name} onChange={(e) => setName(e.target.value)} className="text-input" />
      </div>
      <div>
        <label htmlFor="contact" className="form-label">
          {t("contact")}
        </label>
        <input id="contact" required value={contact} onChange={(e) => setContact(e.target.value)} className="text-input" />
      </div>
      <div>
        <label htmlFor="company" className="form-label">
          {t("company")}
        </label>
        <input
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder={t("companyPlaceholder")}
          className="text-input"
        />
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="companyType" className="form-label">
            {t("companyType")}
          </label>
          <select
            id="companyType"
            value={companyType}
            onChange={(e) => setCompanyType(e.target.value)}
            className="text-input"
          >
            <option value="">{t("companyTypePlaceholder")}</option>
            {companyTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="form-label">
            {t("budget")}
          </label>
          <select id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} className="text-input">
            <option value="">{t("budgetPlaceholder")}</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="service" className="form-label">
          {t("service")}
        </label>
        <input
          id="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder={t("servicePlaceholder")}
          className="text-input"
        />
      </div>
      <div>
        <label htmlFor="message" className="form-label">
          {t("message")}
        </label>
        <textarea id="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="textarea-input" />
      </div>
      <div className="space-y-4 border-t border-hairline pt-8">
        <ConsentCheckbox id="pd-policy" checked={policyAccepted} onChange={setPolicyAccepted}>
          {t("policy")}{" "}
          <NextLink href={LEGAL_ROUTES.privacyPolicy} className="text-link" target="_blank">
            {t("policyLink")}
          </NextLink>
          .
        </ConsentCheckbox>
        <ConsentCheckbox id="pd-consent" checked={consentAccepted} onChange={setConsentAccepted}>
          {t("consent")}{" "}
          <NextLink href={LEGAL_ROUTES.consent} className="text-link" target="_blank">
            {t("consentLink")}
          </NextLink>
          .
        </ConsentCheckbox>
      </div>
      <button type="submit" disabled={status === "sending" || !canSubmit} className="btn-primary w-full">
        {status === "sending" ? t("submitting") : t("submit")}
      </button>
      {status === "ok" ? <p className="text-sm text-success">{t("success")}</p> : null}
      {status === "error" ? <p className="text-sm text-error">{errorText}</p> : null}
    </form>
  );
}

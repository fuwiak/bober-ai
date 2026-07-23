"use client";

import NextLink from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { ContactCta } from "@/components/ContactCta";
import { reachGoal, getAttribution } from "@/lib/analytics";
import { LEGAL_ROUTES } from "@/lib/legal";
import { CONTACT_EMAIL } from "@/lib/site";

type RoiCalculatorProps = {
  locale: string;
  title: string;
  subtitle: string;
  employeesLabel: string;
  hoursLabel: string;
  salaryLabel: string;
  savingsLabel: string;
  resultLabel: string;
  resultNote: string;
  paybackLabel: string;
  paybackSuffix: string;
  auditDataTitle: string;
  auditDataItems: string[];
  captureCta: string;
  gateTitle: string;
  gateSubtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  telegramLabel: string;
  telegramPlaceholder: string;
  telegramOptional: string;
  gateSubmit: string;
  gateSubmitting: string;
  gateSuccessTitle: string;
  gateSuccess: string;
  consentCombined: string;
  policyLink: string;
  consentAnd: string;
  consentLink: string;
  errorConsent: string;
  nextCtaPrimary: string;
  nextCtaSecondary: string;
  currency: string;
  implementationFloor: number;
};

export function RoiCalculator({
  locale,
  title,
  subtitle,
  employeesLabel,
  hoursLabel,
  salaryLabel,
  savingsLabel,
  resultLabel,
  resultNote,
  paybackLabel,
  paybackSuffix,
  auditDataTitle,
  auditDataItems,
  captureCta,
  gateTitle,
  gateSubtitle,
  emailLabel,
  emailPlaceholder,
  telegramLabel,
  telegramPlaceholder,
  telegramOptional,
  gateSubmit,
  gateSubmitting,
  gateSuccessTitle,
  gateSuccess,
  consentCombined,
  policyLink,
  consentAnd,
  consentLink,
  errorConsent,
  nextCtaPrimary,
  nextCtaSecondary,
  currency,
  implementationFloor,
}: RoiCalculatorProps) {
  const [employees, setEmployees] = useState(5);
  const [hours, setHours] = useState(12);
  const [salary, setSalary] = useState(locale === "en" ? 3500 : 120000);
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorText, setErrorText] = useState("");
  const [gateOpen, setGateOpen] = useState(false);

  const monthlySavings = useMemo(() => {
    const hourlyRate = salary / 168;
    const automatableShare = 0.55;
    return Math.round(employees * hours * 4.33 * hourlyRate * automatableShare);
  }, [employees, hours, salary]);

  const paybackMonths = useMemo(() => {
    if (monthlySavings <= 0) return null;
    return Math.max(1, Math.ceil(implementationFloor / monthlySavings));
  }, [implementationFloor, monthlySavings]);

  const numberLocale = locale === "en" ? "en-US" : "ru-RU";

  function openGate() {
    setGateOpen(true);
    reachGoal("roi_calculator_gate_open", {
      employees,
      hours,
      savings: monthlySavings,
    });
  }

  function onSubmitLead(event: FormEvent) {
    event.preventDefault();
    if (!consentAccepted) {
      setStatus("error");
      setErrorText(errorConsent);
      return;
    }
    if (!email.trim()) {
      setStatus("error");
      setErrorText(locale === "en" ? "Enter your email" : "Укажите email");
      return;
    }

    setStatus("sending");
    setErrorText("");

    const attribution = getAttribution();
    const numberLocale = locale === "en" ? "en-US" : "ru-RU";
    const message = [
      locale === "en" ? "ROI calculator inputs:" : "Ввод калькулятора ROI:",
      `${employeesLabel}: ${employees}`,
      `${hoursLabel}: ${hours}`,
      `${salaryLabel}: ${salary.toLocaleString(numberLocale)} ${currency}`,
      "",
      `${resultLabel}: ${monthlySavings.toLocaleString(numberLocale)} ${currency} / ${savingsLabel}`,
      paybackMonths ? `${paybackLabel}: ~${paybackMonths} ${paybackSuffix}` : "",
      "",
      auditDataTitle,
      ...auditDataItems.map((item) => `— ${item}`),
    ]
      .filter(Boolean)
      .join("\n");

    const contactValue = [email.trim() && `Email: ${email.trim()}`, telegram.trim() && `Telegram: ${telegram.trim()}`]
      .filter(Boolean)
      .join("\n");

    void (async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: email.trim(),
            contact: contactValue,
            email: email.trim(),
            message,
            source: "roi-calculator",
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
          throw new Error(data.message || (locale === "en" ? "Failed to send request" : "Не удалось отправить заявку"));
        }
        const goalParams = {
          employees,
          hours,
          savings: monthlySavings,
          payback: paybackMonths ?? undefined,
          leadId: data.leadId,
        };
        reachGoal("roi_calculator_lead_submit", goalParams);
        if (data.ok && data.leadId && !data.dryRun) {
          reachGoal("lead_delivered", { ...goalParams, source: "roi-calculator" });
        }
        setStatus("ok");
        setConsentAccepted(false);
      } catch (error) {
        const subject = encodeURIComponent(
          locale === "en" ? "ROI estimate request — Bober AI" : "Заявка: расчёт ROI — Bober AI",
        );
        const body = encodeURIComponent(
          [
            `Email: ${email.trim()}`,
            telegram.trim() ? `Telegram: ${telegram.trim()}` : "",
            "",
            message,
          ]
            .filter(Boolean)
            .join("\n"),
        );
        setStatus("error");
        setErrorText(error instanceof Error ? error.message : locale === "en" ? "Send error" : "Ошибка отправки");
        window.setTimeout(() => {
          window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        }, 600);
      }
    })();
  }

  return (
    <div className="roi-calculator">
      <h3 className="card-title">{title}</h3>
      <p className="body-copy mt-4 max-w-2xl text-base">{subtitle}</p>
      <div className="roi-calculator__grid mt-8">
        <label className="roi-calculator__field">
          <span className="form-label">{employeesLabel}</span>
          <input
            type="number"
            min={1}
            max={500}
            value={employees}
            onChange={(e) => {
              setEmployees(Number(e.target.value) || 1);
              setGateOpen(false);
              setStatus("idle");
            }}
            className="form-input mt-2"
          />
        </label>
        <label className="roi-calculator__field">
          <span className="form-label">{hoursLabel}</span>
          <input
            type="number"
            min={1}
            max={80}
            value={hours}
            onChange={(e) => {
              setHours(Number(e.target.value) || 1);
              setGateOpen(false);
              setStatus("idle");
            }}
            className="form-input mt-2"
          />
        </label>
        <label className="roi-calculator__field">
          <span className="form-label">{salaryLabel}</span>
          <input
            type="number"
            min={locale === "en" ? 1000 : 30000}
            step={locale === "en" ? 100 : 5000}
            value={salary}
            onChange={(e) => {
              setSalary(Number(e.target.value) || (locale === "en" ? 1000 : 30000));
              setGateOpen(false);
              setStatus("idle");
            }}
            className="form-input mt-2"
          />
        </label>
      </div>

      <div className="roi-calculator__result mt-8">
        <p className="meta-label">{resultLabel}</p>
        <p className="roi-calculator__value mt-2">
          {monthlySavings.toLocaleString(numberLocale)} {currency}
          <span className="roi-calculator__period"> / {savingsLabel}</span>
        </p>
        {paybackMonths ? (
          <p className="roi-calculator__payback mt-3">
            {paybackLabel}: ~{paybackMonths} {paybackSuffix}
          </p>
        ) : null}
        <p className="body-copy mt-3 text-sm">{resultNote}</p>
      </div>

      <div className="roi-calculator__audit mt-8">
        <p className="meta-label">{auditDataTitle}</p>
        <ul className="mt-3 space-y-2">
          {auditDataItems.map((item) => (
            <li key={item} className="body-copy flex gap-3 text-sm">
              <span className="meta-label shrink-0">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {!gateOpen && status !== "ok" ? (
        <button type="button" className="btn-primary mt-8" onClick={openGate}>
          {captureCta}
        </button>
      ) : null}

      {gateOpen && status !== "ok" ? (
        <form onSubmit={onSubmitLead} className="roi-calculator__gate mt-8 space-y-5">
          <div>
            <p className="card-title text-xl">{gateTitle}</p>
            <p className="body-copy mt-2 text-sm">{gateSubtitle}</p>
          </div>
          <div>
            <label htmlFor="roi-email" className="form-label">
              {emailLabel}
            </label>
            <input
              id="roi-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={emailPlaceholder}
              className="text-input mt-2"
            />
          </div>
          <div>
            <label htmlFor="roi-telegram" className="form-label">
              {telegramLabel} <span className="text-muted-soft">{telegramOptional}</span>
            </label>
            <input
              id="roi-telegram"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              placeholder={telegramPlaceholder}
              className="text-input mt-2"
            />
          </div>
          <label htmlFor="roi-consent" className="flex cursor-pointer items-start gap-3">
            <input
              id="roi-consent"
              type="checkbox"
              checked={consentAccepted}
              onChange={(e) => setConsentAccepted(e.target.checked)}
              required
              className="mt-1 h-4 w-4 shrink-0 border-hairline-strong accent-ink"
            />
            <span className="text-sm leading-relaxed text-muted">
              {consentCombined}{" "}
              <NextLink href={LEGAL_ROUTES.privacyPolicy} className="text-link" target="_blank">
                {policyLink}
              </NextLink>{" "}
              {consentAnd}{" "}
              <NextLink href={LEGAL_ROUTES.consent} className="text-link" target="_blank">
                {consentLink}
              </NextLink>
              .
            </span>
          </label>
          <button
            type="submit"
            disabled={!consentAccepted || status === "sending"}
            className="btn-primary w-full"
          >
            {status === "sending" ? gateSubmitting : gateSubmit}
          </button>
          {status === "error" ? <p className="text-sm text-error">{errorText}</p> : null}
        </form>
      ) : null}

      {status === "ok" ? (
        <div className="roi-calculator__success mt-8" role="status" aria-live="polite">
          <p className="card-title text-xl">{gateSuccessTitle}</p>
          <p className="body-copy mt-3 text-base">{gateSuccess}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ContactCta goal="roi_calculator_discuss_click">{nextCtaPrimary}</ContactCta>
            <ContactCta
              variant="secondary"
              goal="roi_calculator_audit_click"
              defaultService={locale === "en" ? "AI audit" : "AI-аудит"}
            >
              {nextCtaSecondary}
            </ContactCta>
          </div>
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { COOKIE_CONSENT_KEY, LEGAL_ROUTES } from "@/lib/legal";
import { absoluteUrl } from "@/lib/site";

export type CookieConsentValue = "accepted" | "rejected";

export function getCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (value === "accepted" || value === "rejected") return value;
  return null;
}

export function setCookieConsent(value: CookieConsentValue): void {
  localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: value }));
}

const COOKIE_EXIT_MS = 240;

const COPY = {
  ru: {
    title: "Cookies и аналитика",
    descBefore: "Этот сайт использует Cookies и\u00a0Яндекс.Метрику для аналитики посещений. Подробности — в\u00a0",
    policy: "Политике конфиденциальности",
    descAfter:
      ". Продолжая пользоваться сайтом, вы\u00a0подтверждаете ознакомление с\u00a0политикой.",
    reject: "Только необходимые",
    accept: "Принять",
  },
  en: {
    title: "Cookies and analytics",
    descBefore:
      "This site uses cookies and\u00a0Yandex.Metrica for visit analytics. Details in the\u00a0",
    policy: "Privacy policy",
    descAfter: ". By continuing to use the site, you confirm that you have read the policy.",
    reject: "Essential only",
    accept: "Accept",
  },
} as const;

function isEnPath(pathname: string | null): boolean {
  if (!pathname) return false;
  return pathname === "/en" || pathname.startsWith("/en/");
}

export function CookieConsent() {
  const pathname = usePathname();
  const locale = isEnPath(pathname) ? "en" : "ru";
  const copy = COPY[locale];
  const privacyUrl = useMemo(
    () => absoluteUrl(locale === "en" ? `/en${LEGAL_ROUTES.privacyPolicy}` : LEGAL_ROUTES.privacyPolicy),
    [locale],
  );

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getCookieConsent() === null) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    }
  }, []);

  useEffect(() => {
    if (!visible && mounted) {
      const timer = window.setTimeout(() => setMounted(false), COOKIE_EXIT_MS);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [mounted, visible]);

  const accept = useCallback(() => {
    setCookieConsent("accepted");
    setVisible(false);
  }, []);

  const reject = useCallback(() => {
    setCookieConsent("rejected");
    setVisible(false);
  }, []);

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className={`cookie-consent fixed inset-x-4 z-[100] md:inset-x-auto md:right-6${visible ? " cookie-consent--open" : ""}`}
    >
      <div className="cookie-consent-card">
        <p id="cookie-consent-title" className="cookie-consent-title">
          {copy.title}
        </p>
        <p id="cookie-consent-desc" className="cookie-consent-desc">
          {copy.descBefore}
          <a href={privacyUrl} className="text-link">
            {copy.policy}
          </a>
          {copy.descAfter}
        </p>
        <div className="cookie-consent-actions">
          <button type="button" onClick={reject} className="btn-secondary-on-dark text-xs">
            {copy.reject}
          </button>
          <button type="button" onClick={accept} className="btn-inverted text-xs">
            {copy.accept}
          </button>
        </div>
      </div>
    </div>
  );
}

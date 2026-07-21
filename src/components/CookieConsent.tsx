"use client";

import { useCallback, useEffect, useState } from "react";
import { COOKIE_CONSENT_KEY, LEGAL_ROUTES } from "@/lib/legal";
import { absoluteUrl } from "@/lib/site";

/** Always www — relative /privacy-policy breaks SPA routing on microsite hosts. */
const PRIVACY_POLICY_URL = absoluteUrl(LEGAL_ROUTES.privacyPolicy);

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

export function CookieConsent() {
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
          Cookies и аналитика
        </p>
        <p id="cookie-consent-desc" className="cookie-consent-desc">
          Этот сайт собирает Cookies и&nbsp;данные о&nbsp;передвижении по&nbsp;сайту через сервис
          Яндекс.Метрика. Оставаясь на&nbsp;сайте, вы&nbsp;подтверждаете, что согласны с{" "}
          <a href={PRIVACY_POLICY_URL} className="text-link">
            Политикой конфиденциальности
          </a>
        </p>
        <div className="cookie-consent-actions">
          <button type="button" onClick={reject} className="btn-secondary-on-dark text-xs">
            Только необходимые
          </button>
          <button type="button" onClick={accept} className="btn-inverted text-xs">
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { COOKIE_CONSENT_KEY, LEGAL_ROUTES, YANDEX_METRIKA_ID } from "@/lib/legal";

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
      className={`cookie-consent fixed inset-x-4 z-[100] md:inset-x-auto md:right-6 md:max-w-md${visible ? " cookie-consent--open" : ""}`}
    >
      <div className="cookie-consent-card">
        <p id="cookie-consent-title" className="meta-label text-ink">
          Мы используем cookies и Яндекс.Метрику
        </p>
        <p id="cookie-consent-desc" className="body-copy mt-3 text-base text-body">
          Сайт использует cookies, «Яндекс.Метрику» (№ {YANDEX_METRIKA_ID}) и Varioqub для аналитики и экспериментов.
          Скрипты загружаются только после согласия. Подробнее — в{" "}
          <Link href={LEGAL_ROUTES.privacyPolicy} className="text-link">
            политике обработки ПДн
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
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

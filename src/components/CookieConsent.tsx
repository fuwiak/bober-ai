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

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getCookieConsent() === null);
  }, []);

  const accept = useCallback(() => {
    setCookieConsent("accepted");
    setVisible(false);
  }, []);

  const reject = useCallback(() => {
    setCookieConsent("rejected");
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-4 bottom-4 z-[100] md:inset-x-auto md:right-6 md:max-w-md"
    >
      <div className="cookie-consent-card">
        <p id="cookie-consent-title" className="meta-label text-ink">
          Мы используем cookies и Яндекс.Метрику
        </p>
        <p id="cookie-consent-desc" className="body-copy mt-3 text-base text-body">
          Сайт использует cookies и «Яндекс.Метрику» (№ {YANDEX_METRIKA_ID}) для аналитики. Скрипт загружается
          только после согласия. Подробнее — в{" "}
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

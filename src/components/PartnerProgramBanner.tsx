"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCallback, useEffect, useState } from "react";

const PARTNER_BANNER_DISMISS_KEY = "partner-banner-dismissed";
const PARTNER_BANNER_DELAY_MS = 30000;

export function PartnerProgramBanner() {
  const t = useTranslations("banner");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(PARTNER_BANNER_DISMISS_KEY) === "1";
    if (!dismissed) {
      const timer = window.setTimeout(() => {
        setMounted(true);
        requestAnimationFrame(() => setOpen(true));
      }, PARTNER_BANNER_DELAY_MS);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, []);

  const dismiss = useCallback(() => {
    localStorage.setItem(PARTNER_BANNER_DISMISS_KEY, "1");
    setOpen(false);
  }, []);

  if (!mounted) return null;

  return (
    <aside
      role="dialog"
      aria-labelledby="partner-banner-title"
      aria-live="polite"
      className={`partner-banner fixed inset-x-4 z-[90] border border-hairline bg-canvas transition-transform duration-500 ease-out sm:inset-x-auto sm:bottom-auto sm:right-0 sm:top-1/2 sm:w-[min(100vw-2rem,22rem)] sm:-translate-y-1/2 ${
        open ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-x-full sm:translate-y-[-50%]"
      }`}
    >
      <div className="border-b border-hairline px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="meta-label">{t("badge")}</p>
            <h2 id="partner-banner-title" className="card-title mt-2 text-xl">
              {t("title")}
            </h2>
          </div>
          <button
            type="button"
            onClick={dismiss}
            className="flex h-8 w-8 shrink-0 items-center justify-center border border-hairline text-muted"
            aria-label={t("close")}
          >
            <span aria-hidden="true" className="text-lg leading-none">
              ×
            </span>
          </button>
        </div>
      </div>

      <div className="p-5">
        <p className="body-copy text-base">{t("text")}</p>

        <div className="mt-6 flex flex-col gap-3">
          <Link href="/partners" onClick={dismiss} className="btn-primary w-full text-center">
            {t("cta")}
          </Link>
          <button type="button" onClick={dismiss} className="btn-secondary w-full text-center">
            {t("more")}
          </button>
        </div>
      </div>
    </aside>
  );
}

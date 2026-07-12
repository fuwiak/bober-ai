"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCallback, useEffect, useState } from "react";

const PARTNER_BANNER_DISMISS_KEY = "partner-banner-dismissed";

export function PartnerProgramBanner() {
  const t = useTranslations("banner");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const delay = Number(t("delay")) || 30000;

  useEffect(() => {
    const dismissed = localStorage.getItem(PARTNER_BANNER_DISMISS_KEY) === "1";
    if (!dismissed) {
      const timer = window.setTimeout(() => {
        setMounted(true);
        requestAnimationFrame(() => setOpen(true));
      }, delay);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [delay]);

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
      className={`fixed inset-x-3 bottom-20 z-[90] transition-transform duration-500 ease-out sm:inset-x-auto sm:bottom-auto sm:right-0 sm:top-1/2 sm:w-[min(100vw-1.5rem,22rem)] sm:-translate-y-1/2 ${
        open ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-x-full sm:translate-y-[-50%]"
      }`}
    >
      <div className="overflow-hidden rounded-xl border border-hairline bg-canvas shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.45)] sm:rounded-r-none sm:border-r-0">
        <div className="bg-primary px-5 py-3 text-on-primary">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-on-primary/80">{t("badge")}</p>
              <h2 id="partner-banner-title" className="mt-1 font-display text-xl tracking-tight">
                {t("title")}
              </h2>
            </div>
            <button
              type="button"
              onClick={dismiss}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-on-primary/80 active:bg-on-primary/10"
              aria-label={t("close")}
            >
              <span aria-hidden="true" className="text-lg leading-none">
                ×
              </span>
            </button>
          </div>
        </div>

        <div className="p-5">
          <p className="text-sm leading-relaxed text-body">
            {t("text", { percent: "10%" })}
          </p>

          <div className="mt-5 flex flex-col gap-2">
            <Link href="/partners" onClick={dismiss} className="btn-primary w-full text-center text-sm">
              {t("cta")}
            </Link>
            <button type="button" onClick={dismiss} className="btn-secondary w-full text-center text-sm">
              {t("more")}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

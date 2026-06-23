"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { PARTNER_PROGRAM } from "@/lib/profile";
import { getOrderTelegramUrl } from "@/lib/services-feed";

const PARTNER_BANNER_DISMISS_KEY = "partner-banner-dismissed";

export function PartnerProgramBanner() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(PARTNER_BANNER_DISMISS_KEY) === "1";
    if (!dismissed) {
      const timer = window.setTimeout(() => {
        setMounted(true);
        requestAnimationFrame(() => setOpen(true));
      }, 1200);
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
      className={`fixed inset-x-3 bottom-20 z-[90] transition-transform duration-500 ease-out sm:inset-x-auto sm:bottom-auto sm:right-0 sm:top-1/2 sm:w-[min(100vw-1.5rem,22rem)] sm:-translate-y-1/2 ${
        open ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-x-full sm:translate-y-[-50%]"
      }`}
    >
      <div className="overflow-hidden rounded-xl border border-hairline bg-canvas shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.45)] sm:rounded-r-none sm:border-r-0">
        <div className="bg-primary px-5 py-3 text-on-primary">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-on-primary/80">
                Для агентств и знакомых
              </p>
              <h2 id="partner-banner-title" className="mt-1 font-display text-xl tracking-tight">
                {PARTNER_PROGRAM.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={dismiss}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-on-primary/80 active:bg-on-primary/10"
              aria-label="Закрыть"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                ×
              </span>
            </button>
          </div>
        </div>

        <div className="p-5">
          <p className="text-sm leading-relaxed text-body">
            Приводите клиентов на AI-проекты —{" "}
            <strong className="font-medium text-ink">{PARTNER_PROGRAM.commissionPercent}%</strong> сразу после аванса
            клиента.
          </p>

          <ol className="mt-4 space-y-2 border-t border-hairline pt-4">
            {PARTNER_PROGRAM.steps.map((step, index) => (
              <li key={step.title} className="flex gap-3 text-sm">
                <span className="font-display text-lg leading-none text-primary/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-body">
                  <span className="font-medium text-ink">{step.title}.</span> {step.text}
                </span>
              </li>
            ))}
          </ol>

          <ul className="mt-4 space-y-1 text-xs text-muted">
            <li>· Без скрытых условий</li>
            <li>· Прозрачный расчёт от суммы аванса</li>
            <li>· Подходит фрилансерам, агентствам, интеграторам</li>
          </ul>

          <div className="mt-5 flex flex-col gap-2">
            <a
              href={getOrderTelegramUrl("партнёрскую программу")}
              target="_blank"
              rel="noreferrer"
              className="btn-primary w-full text-center text-sm"
            >
              Стать партнёром
            </a>
            <Link href="/#partners" onClick={dismiss} className="btn-secondary w-full text-center text-sm">
              Подробнее на странице
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

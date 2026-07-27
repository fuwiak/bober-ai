"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { yandexMetrikaIdForLocation } from "@/lib/legal";

type YmFn = (id: number, method: string, ...args: unknown[]) => void;

/**
 * SPA hit tracking after first paint.
 * Counter init + noscript live in root layout (all hosts: www / partners / bitrix).
 */
export function YandexMetrika() {
  const pathname = usePathname();
  const firstPageRef = useRef(true);
  const previousUrlRef = useRef("");

  useEffect(() => {
    if (firstPageRef.current) {
      firstPageRef.current = false;
      previousUrlRef.current = window.location.href;
      return;
    }

    const ym = (window as Window & { ym?: YmFn }).ym;
    if (typeof ym !== "function") return;

    const id = Number(yandexMetrikaIdForLocation(window.location.hostname, window.location.pathname));
    if (!Number.isFinite(id)) return;

    ym(id, "hit", window.location.href, {
      title: document.title,
      referer: previousUrlRef.current || document.referrer,
    });
    previousUrlRef.current = window.location.href;
  }, [pathname]);

  return null;
}

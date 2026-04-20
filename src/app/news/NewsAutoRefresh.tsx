"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type Props = {
  hasData: boolean;
  generatedAt: string | null;
};

export default function NewsAutoRefresh({ hasData, generatedAt }: Props) {
  const router = useRouter();
  const lastSeenRef = useRef<string | null>(generatedAt);

  useEffect(() => {
    lastSeenRef.current = generatedAt;
  }, [generatedAt]);

  useEffect(() => {
    let cancelled = false;
    const initialDelay = hasData ? 60_000 : 2_500;
    const interval = hasData ? 5 * 60_000 : 4_000;

    const check = async () => {
      if (cancelled) return;
      try {
        const res = await fetch("/api/news", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { generatedAt?: string; items?: unknown[] };
        const gen = typeof data.generatedAt === "string" ? data.generatedAt : null;
        const hasItems = Array.isArray(data.items) && data.items.length > 0;
        if (gen && gen !== lastSeenRef.current && hasItems) {
          lastSeenRef.current = gen;
          router.refresh();
        }
      } catch {
        /* ignore */
      }
    };

    const initial = setTimeout(check, initialDelay);
    const timer = setInterval(check, interval);
    return () => {
      cancelled = true;
      clearTimeout(initial);
      clearInterval(timer);
    };
  }, [hasData, router]);

  return null;
}

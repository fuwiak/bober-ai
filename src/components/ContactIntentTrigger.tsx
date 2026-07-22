"use client";

import { useEffect, useRef } from "react";
import { useContactModal } from "@/components/ContactModalProvider";
import { reachGoal } from "@/lib/analytics";

const STORAGE_KEY = "bober_contact_intent_dismissed";
const SCROLL_DEPTH = 0.48;
const TIMER_MS = 26_000;
const MIN_ENGAGE_MS = 8_000;

/**
 * Soft auto-open for the contact modal: exit-intent, scroll depth, or ~26s.
 * Once per session, dismissible, skips when user is already in #contact.
 */
export function ContactIntentTrigger() {
  const modal = useContactModal();
  const firedRef = useRef(false);
  const engagedAtRef = useRef(0);

  useEffect(() => {
    if (!modal) return undefined;
    if (typeof window === "undefined") return undefined;

    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return undefined;
    } catch {
      return undefined;
    }

    engagedAtRef.current = Date.now();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function markDismissed() {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore quota */
      }
    }

    function isInContact() {
      const el = document.getElementById("contact");
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.85 && rect.bottom > 80;
    }

    function fire(reason: "exit" | "scroll" | "timer") {
      if (firedRef.current) return;
      if (Date.now() - engagedAtRef.current < MIN_ENGAGE_MS) return;
      if (isInContact()) return;
      firedRef.current = true;
      markDismissed();
      reachGoal("contact_intent_open", { reason });
      modal!.open("", { softOffer: true, source: reason });
    }

    const onMouseOut = (event: MouseEvent) => {
      if (event.clientY > 0) return;
      if (event.relatedTarget) return;
      fire("exit");
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      if (window.scrollY / maxScroll >= SCROLL_DEPTH) fire("scroll");
    };

    const timerDelay = reducedMotion ? TIMER_MS + 8_000 : TIMER_MS;
    const timer = window.setTimeout(() => fire("timer"), timerDelay);

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, [modal]);

  return null;
}

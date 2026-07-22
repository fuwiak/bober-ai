"use client";

import { useEffect, useRef } from "react";
import { useContactModal } from "@/components/ContactModalProvider";
import { reachGoal } from "@/lib/analytics";

const STORAGE_KEY = "bober_contact_intent_dismissed";
/** ~35–40% scroll depth */
const SCROLL_DEPTH = 0.38;
/** ~12–15s idle timer */
const TIMER_MS = 14_000;
/** Avoid opening in the first paint / route transition flash */
const MIN_ENGAGE_MS = 1_500;

/**
 * Soft auto-open for the contact modal: timer, scroll depth, or exit-intent (desktop).
 * Once per session; dismiss persisted in sessionStorage.
 */
export function ContactIntentTrigger() {
  const modal = useContactModal();
  const openRef = useRef(modal?.open);
  openRef.current = modal?.open;
  const firedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (!openRef.current) return undefined;

    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return undefined;
    } catch {
      return undefined;
    }

    const engagedAt = Date.now();
    let timerId = 0;
    let deferredId = 0;

    function markDismissed() {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore quota */
      }
    }

    function isContactInView() {
      const el =
        document.querySelector<HTMLElement>("section#contact") ??
        document.querySelector<HTMLElement>("#contact.section-band");
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.75 && rect.bottom > 100;
    }

    function cleanup() {
      window.clearTimeout(timerId);
      window.clearTimeout(deferredId);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    }

    function fire(reason: "exit" | "scroll" | "timer") {
      if (firedRef.current) return;
      if (!openRef.current) return;

      const wait = MIN_ENGAGE_MS - (Date.now() - engagedAt);
      if (wait > 0) {
        window.clearTimeout(deferredId);
        deferredId = window.setTimeout(() => fire(reason), wait);
        return;
      }

      // Already looking at the in-page contact block — don't spam a duplicate modal.
      if (isContactInView()) {
        firedRef.current = true;
        markDismissed();
        cleanup();
        return;
      }

      firedRef.current = true;
      markDismissed();
      cleanup();
      reachGoal("contact_intent_open", { reason });
      openRef.current("", { softOffer: true, source: reason });
    }

    function onMouseOut(event: MouseEvent) {
      if (event.clientY > 0) return;
      if (event.relatedTarget) return;
      // Exit-intent is desktop-oriented; skip coarse pointers (touch).
      if (window.matchMedia("(pointer: coarse)").matches) return;
      fire("exit");
    }

    function onScroll() {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      if (window.scrollY / maxScroll >= SCROLL_DEPTH) fire("scroll");
    }

    timerId = window.setTimeout(() => fire("timer"), TIMER_MS);
    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return cleanup;
    // Mount once: open() is read via ref so provider re-renders do not reset the timer.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional one-shot listeners
  }, []);

  return null;
}

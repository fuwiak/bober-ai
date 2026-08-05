import { demandRadarParams, reachGoal } from "@/lib/analytics";
import { DEMAND_RADAR_EVENTS } from "@/lib/demand-radar/tracking-contract";
import { PRIMARY_CTA_GOAL } from "@/lib/site";

const INTENT_STORAGE_KEY = "bober_contact_intent_dismissed";
const EXIT_MS = 240;

let wired = false;
let contactObserver: IntersectionObserver | null = null;

function modalRoot() {
  return document.querySelector<HTMLElement>("[data-contact-modal]");
}

function setService(service: string) {
  const input = document.querySelector<HTMLInputElement>("[data-contact-default-service]");
  if (input) input.value = service;
}

function setSoftOffer(soft: boolean) {
  const root = modalRoot();
  if (!root) return;
  root.querySelectorAll<HTMLElement>("[data-contact-soft-only]").forEach((el) => {
    el.hidden = !soft;
  });
  root.querySelectorAll<HTMLElement>("[data-contact-default-only]").forEach((el) => {
    el.hidden = soft;
  });
}

export function openContactModal(service = "", options?: { softOffer?: boolean; goal?: string }) {
  const root = modalRoot();
  if (!root) return;

  const soft = Boolean(options?.softOffer);
  const resolvedService = service || (soft ? root.dataset.intentService || "" : "");
  setSoftOffer(soft);
  setService(resolvedService);
  const goal = options?.goal || PRIMARY_CTA_GOAL || DEMAND_RADAR_EVENTS.cta_click;
  reachGoal(
    goal,
    demandRadarParams({
      service: resolvedService,
      source: soft ? "intent-modal" : "contact-modal",
      landing_path: window.location.pathname,
      destination: "form",
    }),
  );

  root.hidden = false;
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => root.classList.add("contact-modal--open"));
}

export function closeContactModal() {
  const root = modalRoot();
  if (!root) return;
  root.classList.remove("contact-modal--open");
  try {
    sessionStorage.setItem(INTENT_STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
  window.setTimeout(() => {
    root.hidden = true;
    setService("");
    setSoftOffer(false);
    document.body.style.overflow = "";
  }, EXIT_MS);
}

function openTriggerFromEvent(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  return target.closest<HTMLElement>("[data-contact-open]");
}

function closeTriggerFromEvent(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  return target.closest<HTMLElement>("[data-contact-close]");
}

function onDocumentClick(event: MouseEvent) {
  const openEl = openTriggerFromEvent(event.target);
  if (openEl) {
    event.preventDefault();
    const service = openEl.getAttribute("data-contact-service") || "";
    const soft = openEl.getAttribute("data-contact-soft") === "1";
    const goal = openEl.getAttribute("data-contact-goal") || undefined;
    openContactModal(service, { softOffer: soft, goal });
    document.querySelector<HTMLElement>("[data-nav-mobile-close]")?.click();
    return;
  }

  if (closeTriggerFromEvent(event.target)) {
    closeContactModal();
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") closeContactModal();
}

function cookieBannerOpen() {
  const root = document.querySelector<HTMLElement>("[data-cookie-consent]");
  return Boolean(root && !root.hidden && root.classList.contains("cookie-consent--open"));
}

function syncFabCookieOffset() {
  const fab = document.querySelector<HTMLElement>("[data-contact-fab]");
  const sticky = document.querySelector<HTMLElement>("[data-direct-sticky]");
  const blocked = cookieBannerOpen();
  fab?.classList.toggle("contact-fab--cookie-blocked", blocked);
  sticky?.classList.toggle("direct-sticky-bar--cookie-blocked", blocked);
}

function syncPaidTrafficChrome() {
  const fab = document.querySelector<HTMLElement>("[data-contact-fab]");
  const sticky = document.querySelector<HTMLElement>("[data-direct-sticky]");
  const paid = document.documentElement.hasAttribute("data-paid-traffic");
  if (paid) {
    fab?.setAttribute("hidden", "");
    sticky?.removeAttribute("hidden");
  } else {
    sticky?.setAttribute("hidden", "");
    fab?.removeAttribute("hidden");
  }
}

function syncContactIntersection() {
  contactObserver?.disconnect();
  contactObserver = null;

  const contact = document.getElementById("contact");
  const fab = document.querySelector<HTMLElement>("[data-contact-fab]");
  const sticky = document.querySelector<HTMLElement>("[data-direct-sticky]");
  if (!contact || !(fab || sticky)) return;

  contactObserver = new IntersectionObserver(
    ([entry]) => {
      const hide = entry.isIntersecting;
      fab?.classList.toggle("contact-fab--hidden", hide);
      sticky?.classList.toggle("direct-sticky-bar--hidden", hide);
    },
    { threshold: 0.15, rootMargin: "-80px 0px 0px 0px" },
  );
  contactObserver.observe(contact);
}

function refreshContactChrome() {
  syncPaidTrafficChrome();
  syncContactIntersection();
  syncFabCookieOffset();
}

function initContactModal() {
  if (!wired) {
    document.addEventListener("click", onDocumentClick);
    window.addEventListener("keydown", onKeydown);
    window.addEventListener("cookie-consent-change", syncFabCookieOffset);
    window.addEventListener("cookie-consent-open", syncFabCookieOffset);
    document.addEventListener("htmx:afterSwap", refreshContactChrome);
    document.addEventListener("htmx:historyRestore", refreshContactChrome);
    wired = true;
  }
  refreshContactChrome();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initContactModal, { once: true });
} else {
  initContactModal();
}

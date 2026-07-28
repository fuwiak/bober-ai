import { reachGoal } from "@/lib/analytics";
import { PRIMARY_CTA_GOAL } from "@/lib/site";

const INTENT_STORAGE_KEY = "bober_contact_intent_dismissed";
const EXIT_MS = 240;

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
  setSoftOffer(soft);
  setService(service || (soft ? root.dataset.intentService || "" : ""));
  reachGoal(options?.goal || PRIMARY_CTA_GOAL, { destination: "form" });

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

function initContactModal() {
  document.querySelectorAll<HTMLElement>("[data-contact-open]").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      const service = el.getAttribute("data-contact-service") || "";
      const soft = el.getAttribute("data-contact-soft") === "1";
      const goal = el.getAttribute("data-contact-goal") || undefined;
      openContactModal(service, { softOffer: soft, goal });
      // close mobile nav if open
      document.querySelector<HTMLElement>("[data-nav-mobile-close]")?.click();
    });
  });

  document.querySelectorAll<HTMLElement>("[data-contact-close]").forEach((el) => {
    el.addEventListener("click", () => closeContactModal());
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeContactModal();
  });

  // Hide FAB when #contact is in view
  const contact = document.getElementById("contact");
  const fab = document.querySelector<HTMLElement>("[data-contact-fab]");
  const sticky = document.querySelector<HTMLElement>("[data-direct-sticky]");
  if (contact && (fab || sticky)) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const hide = entry.isIntersecting;
        fab?.classList.toggle("contact-fab--hidden", hide);
        sticky?.classList.toggle("direct-sticky-bar--hidden", hide);
      },
      { threshold: 0.15, rootMargin: "-80px 0px 0px 0px" },
    );
    observer.observe(contact);
  }

  // Paid traffic sticky bar vs FAB (marker set by attribution.ts)
  const paid = document.documentElement.hasAttribute("data-paid-traffic");
  if (paid) {
    fab?.setAttribute("hidden", "");
    sticky?.removeAttribute("hidden");
  } else {
    sticky?.setAttribute("hidden", "");
    fab?.removeAttribute("hidden");
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initContactModal, { once: true });
} else {
  initContactModal();
}

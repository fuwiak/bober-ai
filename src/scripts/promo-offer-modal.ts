import { demandRadarParams, reachGoal } from "@/lib/analytics";
import { DEMAND_RADAR_EVENTS } from "@/lib/demand-radar/tracking-contract";

/**
 * Лид-магнит попап («разбор процесса»). Мобильный приоритет:
 * на телефоне открывается раньше (скролл / время), на десктопе — ещё и exit-intent.
 *
 * Частота: после отправки не показываем 180 дней, после закрытия — 7 дней,
 * в одной сессии — один раз. Не мешаем странице, где человек уже в форме.
 */

const STORAGE_KEY = "bober_promo_offer";
const SESSION_KEY = "bober_promo_offer_session";
const DAY_MS = 24 * 60 * 60 * 1000;
const SUBMITTED_COOLDOWN_MS = 180 * DAY_MS;
const DISMISSED_COOLDOWN_MS = 7 * DAY_MS;
const EXIT_MS = 240;

/** Страницы, где попап только мешает: там уже есть своя форма или это не клиентский трафик. */
const BLOCKED_PREFIXES = [
  "/partners",
  "/white-label",
  "/career",
  "/order",
  "/process-review",
  "/audit",
  "/privacy-policy",
  "/consent",
  "/terms",
  "/legal",
];

type PromoState = { submittedAt?: number; dismissedAt?: number };

let wired = false;
let shown = false;
let timers: number[] = [];
let scrollHandler: (() => void) | null = null;
let exitHandler: ((event: MouseEvent) => void) | null = null;
let lastFocused: HTMLElement | null = null;

function root() {
  return document.querySelector<HTMLElement>("[data-promo-offer]");
}

function readState(): PromoState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PromoState) : {};
  } catch {
    return {};
  }
}

function writeState(patch: PromoState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readState(), ...patch }));
  } catch {
    /* приватный режим — просто не запоминаем */
  }
}

function seenThisSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeenThisSession() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* ignore */
  }
}

function isMobile() {
  return window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(hover: none)").matches;
}

function pathBlocked() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const withoutLocale = path.replace(/^\/(en|kz|uz|ru)(?=\/|$)/, "") || "/";
  return BLOCKED_PREFIXES.some((prefix) => withoutLocale === prefix || withoutLocale.startsWith(`${prefix}/`));
}

function cooldownActive() {
  const state = readState();
  const now = Date.now();
  if (state.submittedAt && now - state.submittedAt < SUBMITTED_COOLDOWN_MS) return true;
  if (state.dismissedAt && now - state.dismissedAt < DISMISSED_COOLDOWN_MS) return true;
  return false;
}

function otherOverlayOpen() {
  const contactModal = document.querySelector<HTMLElement>("[data-contact-modal]");
  if (contactModal && !contactModal.hidden) return true;
  const cookie = document.querySelector<HTMLElement>("[data-cookie-consent]");
  if (cookie && !cookie.hidden && cookie.classList.contains("cookie-consent--open")) return true;
  const nav = document.querySelector<HTMLElement>("[data-nav-mobile].mobile-menu--open");
  return Boolean(nav);
}

/** Человек уже печатает в другой форме — не перебиваем. */
function userBusyInForm() {
  const active = document.activeElement;
  return Boolean(active && active.closest("form") && !active.closest("[data-promo-offer]"));
}

function eligible() {
  if (shown || seenThisSession() || cooldownActive() || pathBlocked()) return false;
  if (new URLSearchParams(window.location.search).has("nopopup")) return false;
  return Boolean(root());
}

function scrollRatio() {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return 0;
  return window.scrollY / scrollable;
}

function focusablesIn(panel: HTMLElement) {
  return Array.from(
    panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled])',
    ),
  ).filter((el) => el.offsetParent !== null);
}

function onKeydown(event: KeyboardEvent) {
  const el = root();
  if (!el || el.hidden) return;
  if (event.key === "Escape") {
    close("escape");
    return;
  }
  if (event.key !== "Tab") return;
  const panel = el.querySelector<HTMLElement>("[data-promo-panel]");
  if (!panel) return;
  const items = focusablesIn(panel);
  if (items.length === 0) return;
  const first = items[0];
  const last = items[items.length - 1];
  const active = document.activeElement as HTMLElement | null;
  if (event.shiftKey && (active === first || active === panel)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

function clearTriggers() {
  timers.forEach((id) => window.clearTimeout(id));
  timers = [];
  if (scrollHandler) {
    window.removeEventListener("scroll", scrollHandler);
    scrollHandler = null;
  }
  if (exitHandler) {
    document.removeEventListener("mouseout", exitHandler);
    exitHandler = null;
  }
}

function open(trigger: string) {
  const el = root();
  if (!el || shown || !eligible() || otherOverlayOpen() || userBusyInForm()) return;

  shown = true;
  clearTriggers();
  markSeenThisSession();
  lastFocused = document.activeElement as HTMLElement | null;

  el.hidden = false;
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => {
    el.classList.add("promo-offer--open");
    el.querySelector<HTMLElement>("[data-promo-panel]")?.focus();
  });

  reachGoal(
    DEMAND_RADAR_EVENTS.cta_click,
    demandRadarParams({
      service: el.querySelector<HTMLInputElement>('input[name="service"]')?.value || "",
      source: "promo-modal",
      landing_path: window.location.pathname,
      destination: "form",
      trigger,
      viewport: isMobile() ? "mobile" : "desktop",
    }),
  );
}

function close(reason: string) {
  const el = root();
  if (!el || el.hidden) return;
  el.classList.remove("promo-offer--open");
  if (reason !== "submit") writeState({ dismissedAt: Date.now() });
  window.setTimeout(() => {
    el.hidden = true;
    document.body.style.overflow = "";
    lastFocused?.focus?.();
    lastFocused = null;
  }, EXIT_MS);
}

function armTriggers() {
  clearTriggers();
  if (!eligible()) return;

  const mobile = isMobile();
  const dwellMs = mobile ? 25000 : 40000;
  const depth = mobile ? 0.4 : 0.65;

  timers.push(window.setTimeout(() => open("dwell"), dwellMs));

  scrollHandler = () => {
    if (scrollRatio() >= depth) open("scroll");
  };
  window.addEventListener("scroll", scrollHandler, { passive: true });

  if (!mobile) {
    exitHandler = (event: MouseEvent) => {
      if (event.relatedTarget === null && event.clientY <= 4) open("exit-intent");
    };
    document.addEventListener("mouseout", exitHandler);
  }
}

function onDocumentClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (target.closest("[data-promo-close]")) {
    close("close-button");
    return;
  }
  // Открыл обычную форму сам — попап больше не нужен в этой сессии.
  if (target.closest("[data-contact-open]")) {
    shown = true;
    clearTriggers();
    markSeenThisSession();
  }
}

function onFormSubmitted(event: Event) {
  const form = (event.target as HTMLElement | null)?.closest?.("form.contact-form");
  if (!form) return;
  const detail = (event as CustomEvent).detail as { successful?: boolean } | undefined;
  if (!detail?.successful) return;
  writeState({ submittedAt: Date.now() });
  if (form.closest("[data-promo-offer]")) {
    shown = true;
    window.setTimeout(() => close("submit"), 2600);
  }
}

function init() {
  if (!wired) {
    document.addEventListener("click", onDocumentClick);
    window.addEventListener("keydown", onKeydown);
    document.body.addEventListener("htmx:afterRequest", onFormSubmitted);
    document.body.addEventListener("htmx:afterSwap", () => {
      shown = false;
      armTriggers();
    });
    wired = true;
  }
  armTriggers();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}

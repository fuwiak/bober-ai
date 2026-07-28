/**
 * Site header: desktop mega/drop + mobile drawer.
 * Event delegation so HTMX body swaps rebind without duplicate listeners.
 */

function getRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>("[data-nav-root]");
}

function closeAllPanels(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-nav-panel]").forEach((panel) => {
    panel.setAttribute("aria-hidden", "true");
  });
  root.querySelectorAll<HTMLButtonElement>("[data-nav-trigger]").forEach((trigger) => {
    trigger.setAttribute("aria-expanded", "false");
  });
  root.querySelectorAll<HTMLElement>("[data-nav-pop]").forEach((pop) => {
    pop.classList.remove("site-header__pop--open");
  });
  root.classList.remove("site-header--pop-open");
}

function openPanel(root: HTMLElement, id: string) {
  closeAllPanels(root);
  const panel = root.querySelector<HTMLElement>(`[data-nav-panel="${id}"]`);
  const trigger = root.querySelector<HTMLButtonElement>(`[data-nav-trigger="${id}"]`);
  const pop = root.querySelector<HTMLElement>(`[data-nav-pop="${id}"]`);
  if (!panel || !trigger) return;
  panel.setAttribute("aria-hidden", "false");
  trigger.setAttribute("aria-expanded", "true");
  pop?.classList.add("site-header__pop--open");
  root.classList.add("site-header--pop-open");
}

function closeMobile(root: HTMLElement) {
  const mobile = root.querySelector<HTMLElement>("[data-nav-mobile]");
  const toggle = root.querySelector<HTMLButtonElement>("[data-nav-mobile-toggle]");
  if (!mobile || !toggle) return;
  mobile.classList.remove("mobile-menu--open");
  mobile.setAttribute("aria-hidden", "true");
  toggle.setAttribute("aria-expanded", "false");
  root.classList.remove("site-header--menu-open");
  document.body.style.overflow = "";
}

function openMobile(root: HTMLElement) {
  const mobile = root.querySelector<HTMLElement>("[data-nav-mobile]");
  const toggle = root.querySelector<HTMLButtonElement>("[data-nav-mobile-toggle]");
  if (!mobile || !toggle) return;
  mobile.classList.add("mobile-menu--open");
  mobile.setAttribute("aria-hidden", "false");
  toggle.setAttribute("aria-expanded", "true");
  root.classList.add("site-header--menu-open");
  document.body.style.overflow = "hidden";
}

function isPanelOpen(root: HTMLElement, id: string): boolean {
  const pop = root.querySelector<HTMLElement>(`[data-nav-pop="${id}"]`);
  return Boolean(pop?.classList.contains("site-header__pop--open"));
}

let closeTimer: ReturnType<typeof setTimeout> | null = null;
let wired = false;

function syncScroll(root: HTMLElement) {
  root.classList.toggle("site-header--scrolled", window.scrollY > 8);
}

function wireNav() {
  if (wired) return;
  wired = true;

  document.addEventListener("click", (event) => {
    const root = getRoot();
    if (!root) return;
    const target = event.target as Element | null;
    if (!target) return;

    const mobileToggle = target.closest<HTMLElement>("[data-nav-mobile-toggle]");
    if (mobileToggle && root.contains(mobileToggle)) {
      event.preventDefault();
      const mobile = root.querySelector<HTMLElement>("[data-nav-mobile]");
      if (mobile?.classList.contains("mobile-menu--open")) closeMobile(root);
      else openMobile(root);
      return;
    }

    if (target.closest("[data-nav-mobile-close]") && root.contains(target)) {
      closeMobile(root);
      return;
    }

    const accTrigger = target.closest<HTMLButtonElement>("[data-nav-mobile-acc-trigger]");
    if (accTrigger && root.contains(accTrigger)) {
      const id = accTrigger.getAttribute("data-nav-mobile-acc-trigger");
      if (!id) return;
      const acc = root.querySelector<HTMLElement>(`[data-nav-mobile-acc="${id}"]`);
      const open = !acc?.classList.contains("mobile-menu__acc--open");
      root.querySelectorAll<HTMLElement>("[data-nav-mobile-acc]").forEach((el) => {
        const openThis = el === acc && open;
        el.classList.toggle("mobile-menu__acc--open", openThis);
        const btn = el.querySelector<HTMLButtonElement>("[data-nav-mobile-acc-trigger]");
        btn?.setAttribute("aria-expanded", openThis ? "true" : "false");
        el.querySelector<HTMLElement>("[data-nav-mobile-acc-panel]")?.setAttribute(
          "aria-hidden",
          openThis ? "false" : "true",
        );
      });
      return;
    }

    const trigger = target.closest<HTMLButtonElement>("[data-nav-trigger]");
    if (trigger && root.contains(trigger)) {
      event.preventDefault();
      const id = trigger.getAttribute("data-nav-trigger");
      if (!id) return;
      if (isPanelOpen(root, id)) closeAllPanels(root);
      else openPanel(root, id);
      return;
    }

    if (target.closest("[data-nav-mobile] a")) {
      closeMobile(root);
    }

    if (!root.contains(target)) closeAllPanels(root);
  });

  document.addEventListener(
    "mouseover",
    (event) => {
      const root = getRoot();
      if (!root) return;
      const pop = (event.target as Element | null)?.closest<HTMLElement>("[data-nav-pop]");
      if (!pop || !root.contains(pop)) return;
      const id = pop.getAttribute("data-nav-pop");
      if (!id) return;
      if (closeTimer) clearTimeout(closeTimer);
      openPanel(root, id);
    },
    true,
  );

  document.addEventListener(
    "mouseout",
    (event) => {
      const root = getRoot();
      if (!root) return;
      const pop = (event.target as Element | null)?.closest<HTMLElement>("[data-nav-pop]");
      if (!pop || !root.contains(pop)) return;
      const related = event.relatedTarget as Node | null;
      if (related && pop.contains(related)) return;
      if (closeTimer) clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        const current = getRoot();
        if (current) closeAllPanels(current);
      }, 150);
    },
    true,
  );

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const root = getRoot();
    if (!root) return;
    closeAllPanels(root);
    closeMobile(root);
  });

  window.addEventListener(
    "scroll",
    () => {
      const root = getRoot();
      if (root) syncScroll(root);
    },
    { passive: true },
  );
}

function refreshNav() {
  wireNav();
  const root = getRoot();
  if (root) syncScroll(root);
}

function boot() {
  refreshNav();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

document.addEventListener("htmx:afterSwap", boot);
document.addEventListener("htmx:historyRestore", boot);

/**
 * Site header: desktop mega/drop + mobile drawer.
 * Event delegation so HTMX body swaps rebind without duplicate listeners.
 *
 * Mega/drop panels are laid out with position:fixed (measured from the lime bar /
 * trigger) so body overflow-x:clip + sticky header cannot clip the flyout —
 * same intent as the Next.js portal era.
 */

function getRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>("[data-nav-root]");
}

function clearPanelLayout(panel: HTMLElement) {
  panel.style.position = "";
  panel.style.left = "";
  panel.style.right = "";
  panel.style.top = "";
  panel.style.width = "";
  panel.style.minWidth = "";
}

function layoutPanel(root: HTMLElement, panel: HTMLElement, pop: HTMLElement) {
  const isMega = panel.classList.contains("site-mega");
  if (isMega) {
    const bar = root.querySelector<HTMLElement>(".site-header__bar");
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    panel.style.position = "fixed";
    panel.style.left = `${Math.round(rect.left)}px`;
    panel.style.width = `${Math.round(rect.width)}px`;
    panel.style.right = "auto";
    panel.style.top = `${Math.round(rect.bottom + 10)}px`;
    panel.style.minWidth = "";
    return;
  }

  const rect = pop.getBoundingClientRect();
  panel.style.position = "fixed";
  panel.style.left = `${Math.round(rect.left)}px`;
  panel.style.top = `${Math.round(rect.bottom + 10)}px`;
  panel.style.right = "auto";
  panel.style.width = "auto";
  panel.style.minWidth = "300px";
}

function relayoutOpenPanels(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-nav-pop].site-header__pop--open").forEach((pop) => {
    const id = pop.getAttribute("data-nav-pop");
    if (!id) return;
    const panel = root.querySelector<HTMLElement>(`[data-nav-panel="${id}"]`);
    if (panel) layoutPanel(root, panel, pop);
  });
}

function closeAllPanels(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-nav-panel]").forEach((panel) => {
    panel.setAttribute("aria-hidden", "true");
    clearPanelLayout(panel);
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
  if (!panel || !trigger || !pop) return;
  panel.setAttribute("aria-hidden", "false");
  trigger.setAttribute("aria-expanded", "true");
  pop.classList.add("site-header__pop--open");
  root.classList.add("site-header--pop-open");
  layoutPanel(root, panel, pop);
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

/** True if node is inside an open desktop flyout (pop trigger or its panel). */
function isInsideOpenFlyout(root: HTMLElement, node: Node | null): boolean {
  if (!node || !(node instanceof Element)) return false;
  const pop = node.closest<HTMLElement>("[data-nav-pop]");
  if (pop && root.contains(pop) && pop.classList.contains("site-header__pop--open")) return true;
  const panel = node.closest<HTMLElement>("[data-nav-panel]");
  if (!panel || !root.contains(panel)) return false;
  const id = panel.getAttribute("data-nav-panel");
  if (!id) return false;
  return isPanelOpen(root, id);
}

let closeTimer: ReturnType<typeof setTimeout> | null = null;
let wired = false;

function syncScroll(root: HTMLElement) {
  root.classList.toggle("site-header--scrolled", window.scrollY > 8);
  if (root.classList.contains("site-header--pop-open")) relayoutOpenPanels(root);
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
      // Mouse/pointer only — keyboard keeps focus for a11y (Next SiteHeaderClient)
      if (event.detail > 0) trigger.blur();
      return;
    }

    if (target.closest("[data-nav-mobile] a")) {
      closeMobile(root);
    }

    if (!root.contains(target) && !isInsideOpenFlyout(root, target)) closeAllPanels(root);
  });

  document.addEventListener(
    "pointerover",
    (event) => {
      if (event.pointerType === "touch") return;
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
    "pointerout",
    (event) => {
      if (event.pointerType === "touch") return;
      const root = getRoot();
      if (!root) return;
      const related = event.relatedTarget as Node | null;
      if (isInsideOpenFlyout(root, related)) return;

      const target = event.target as Element | null;
      const fromPop = target?.closest<HTMLElement>("[data-nav-pop]");
      const fromPanel = target?.closest<HTMLElement>("[data-nav-panel]");
      const leavingFlyout =
        (fromPop && root.contains(fromPop)) || (fromPanel && root.contains(fromPanel));
      if (!leavingFlyout) return;

      if (closeTimer) clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        const current = getRoot();
        if (current) closeAllPanels(current);
      }, 160);
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

  window.addEventListener(
    "resize",
    () => {
      const root = getRoot();
      if (root?.classList.contains("site-header--pop-open")) relayoutOpenPanels(root);
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

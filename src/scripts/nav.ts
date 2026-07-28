function closeAllPanels(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-nav-panel]").forEach((panel) => {
    panel.hidden = true;
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
  panel.hidden = false;
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

function initNav() {
  const root = document.querySelector<HTMLElement>("[data-nav-root]");
  if (!root) return;

  let closeTimer: ReturnType<typeof setTimeout> | null = null;

  root.querySelectorAll<HTMLButtonElement>("[data-nav-trigger]").forEach((trigger) => {
    const id = trigger.getAttribute("data-nav-trigger");
    if (!id) return;

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const panel = root.querySelector<HTMLElement>(`[data-nav-panel="${id}"]`);
      const isOpen = panel && !panel.hidden;
      if (isOpen) closeAllPanels(root);
      else openPanel(root, id);
    });
  });

  root.querySelectorAll<HTMLElement>("[data-nav-pop]").forEach((pop) => {
    const id = pop.getAttribute("data-nav-pop");
    if (!id) return;

    pop.addEventListener("mouseenter", () => {
      if (closeTimer) clearTimeout(closeTimer);
      openPanel(root, id);
    });

    pop.addEventListener("mouseleave", () => {
      if (closeTimer) clearTimeout(closeTimer);
      closeTimer = setTimeout(() => closeAllPanels(root), 150);
    });
  });

  document.addEventListener("click", (event) => {
    if (!root.contains(event.target as Node)) closeAllPanels(root);
  });

  const mobileToggle = root.querySelector<HTMLButtonElement>("[data-nav-mobile-toggle]");
  mobileToggle?.addEventListener("click", () => {
    const mobile = root.querySelector<HTMLElement>("[data-nav-mobile]");
    const isOpen = mobile?.classList.contains("mobile-menu--open");
    if (isOpen) closeMobile(root);
    else openMobile(root);
  });

  root.querySelectorAll<HTMLElement>("[data-nav-mobile-close]").forEach((el) => {
    el.addEventListener("click", () => closeMobile(root));
  });

  root.querySelectorAll<HTMLButtonElement>("[data-nav-mobile-acc-trigger]").forEach((trigger) => {
    const id = trigger.getAttribute("data-nav-mobile-acc-trigger");
    if (!id) return;
    const panel = root.querySelector<HTMLElement>(`[data-nav-mobile-acc-panel="${id}"]`);
    const acc = root.querySelector<HTMLElement>(`[data-nav-mobile-acc="${id}"]`);

    trigger.addEventListener("click", () => {
      const isOpen = panel && !panel.hidden;
      if (panel) panel.hidden = isOpen;
      trigger.setAttribute("aria-expanded", isOpen ? "false" : "true");
      acc?.classList.toggle("mobile-menu__acc--open", !isOpen);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeAllPanels(root);
    closeMobile(root);
  });

  window.addEventListener(
    "scroll",
    () => {
      root.classList.toggle("site-header--scrolled", window.scrollY > 8);
    },
    { passive: true },
  );
  root.classList.toggle("site-header--scrolled", window.scrollY > 8);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNav);
} else {
  initNav();
}

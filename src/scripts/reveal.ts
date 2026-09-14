function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function siblingRevealIndex(el: HTMLElement): number {
  const parent = el.parentElement;
  if (!parent) return 0;
  const siblings = Array.from(parent.children).filter(
    (node): node is HTMLElement =>
      node instanceof HTMLElement &&
      (node.classList.contains("reveal") || node.hasAttribute("data-reveal")),
  );
  const index = siblings.indexOf(el);
  return index < 0 ? 0 : index;
}

/** Chux-style hero: arm → ready so no-JS keeps content visible. */
export function initHeroStage() {
  const stage = document.querySelector<HTMLElement>(".hero-stage");
  if (!stage) return;

  if (prefersReducedMotion()) {
    stage.classList.add("is-ready");
    return;
  }

  stage.classList.add("is-armed");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      stage.classList.add("is-ready");
    });
  });
}

export function initReveal() {
  initHeroStage();

  const nodes = document.querySelectorAll<HTMLElement>(".reveal, [data-reveal]");
  if (!nodes.length) return;

  const reveal = (el: HTMLElement) => {
    el.classList.add("is-visible");
  };

  if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
    nodes.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        reveal(el);
        observer.unobserve(el);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
  );

  nodes.forEach((el) => {
    const delay = el.dataset.revealDelay;
    if (delay) {
      el.style.transitionDelay = `${delay}ms`;
    } else if (el.parentElement?.classList.contains("reveal-stagger")) {
      const index = siblingRevealIndex(el);
      /* Cap total stagger so long grids do not wait forever */
      el.style.transitionDelay = `${Math.min(index * 90, 450)}ms`;
    }
    observer.observe(el);
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initReveal, { once: true });
  } else {
    initReveal();
  }
}

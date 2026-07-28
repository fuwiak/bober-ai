export function initReveal() {
  const nodes = document.querySelectorAll<HTMLElement>(".reveal, [data-reveal]");
  if (!nodes.length) return;

  const reveal = (el: HTMLElement) => {
    el.classList.add("is-visible");
  };

  if (!("IntersectionObserver" in window)) {
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
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );

  nodes.forEach((el, index) => {
    const delay = el.dataset.revealDelay;
    if (delay) el.style.transitionDelay = `${delay}ms`;
    else if (el.parentElement?.classList.contains("reveal-stagger")) {
      el.style.transitionDelay = `${Math.min(index * 50, 400)}ms`;
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

type YmFn = (id: number, method: string, ...args: unknown[]) => void;

let previousUrl = typeof window !== "undefined" ? window.location.href : "";
let first = true;

function hit() {
  if (first) {
    first = false;
    previousUrl = window.location.href;
    return;
  }
  const ym = (window as Window & { ym?: YmFn }).ym;
  const id = Number((window as Window & { __boberYmId?: number }).__boberYmId);
  if (typeof ym !== "function" || !Number.isFinite(id)) return;
  ym(id, "hit", window.location.href, {
    title: document.title,
    referer: previousUrl || document.referrer,
  });
  previousUrl = window.location.href;
}

document.body.addEventListener("htmx:afterSettle", () => hit());
window.addEventListener("popstate", () => hit());

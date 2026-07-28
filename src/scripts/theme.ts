const STORAGE_KEY = "theme";

function readPreferredDark(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light") return false;
    if (stored === "dark") return true;
  } catch {
    /* ignore */
  }
  return true;
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}

let wired = false;

function wireTheme() {
  if (wired) return;
  wired = true;

  document.addEventListener("click", (event) => {
    const button = (event.target as Element | null)?.closest<HTMLButtonElement>("[data-theme-toggle]");
    if (!button) return;
    const next = !document.documentElement.classList.contains("dark");
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  });
}

function boot() {
  wireTheme();
  applyTheme(readPreferredDark());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

document.addEventListener("htmx:afterSwap", boot);
document.addEventListener("htmx:historyRestore", boot);

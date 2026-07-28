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

function initTheme() {
  applyTheme(readPreferredDark());

  document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = !document.documentElement.classList.contains("dark");
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
      } catch {
        /* ignore */
      }
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTheme);
} else {
  initTheme();
}

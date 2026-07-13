"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback, useLayoutEffect, useState } from "react";

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

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    const dark = readPreferredDark();
    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
    setMounted(true);
  }, []);

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    setIsDark(next);
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-hairline bg-canvas text-ink active:bg-surface-soft"
      aria-label={isDark ? "Светлая тема" : "Тёмная тема"}
      title={isDark ? "Светлая тема" : "Тёмная тема"}
    >
      {mounted ? (
        isDark ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />
      ) : (
        <Moon className="h-4 w-4 opacity-0" aria-hidden />
      )}
    </button>
  );
}

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
  const [isDark, setIsDark] = useState(true);

  useLayoutEffect(() => {
    const dark = readPreferredDark();
    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
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
      className="flex h-10 w-10 items-center justify-center rounded-2xl border border-outline-variant/25 bg-surface-container-lowest text-on-surface shadow-sm transition hover:border-primary/40 hover:text-primary active:scale-95"
      aria-label={isDark ? "Светлая тема" : "Тёмная тема"}
      title={isDark ? "Светлая тема" : "Тёмная тема"}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

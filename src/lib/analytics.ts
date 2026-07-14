import { YANDEX_METRIKA_ID } from "@/lib/legal";

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  yclid?: string;
  landing_page: string;
};

const STORAGE_KEY = "bober_attribution";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "yclid"] as const;

type YmFn = (id: number, method: string, ...args: unknown[]) => void;

function readStoredAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Attribution;
  } catch {
    return null;
  }
}

function writeAttribution(data: Attribution) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore quota / private mode
  }
}

export function captureAttribution() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const stored = readStoredAttribution();
  const next: Attribution = {
    landing_page: stored?.landing_page || `${window.location.pathname}${window.location.search}`,
  };

  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) {
      next[key] = value;
    } else if (stored?.[key]) {
      next[key] = stored[key];
    }
  }

  if (!stored?.landing_page) {
    next.landing_page = `${window.location.pathname}${window.location.search}`;
  }

  writeAttribution(next);
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") {
    return { landing_page: "/" };
  }

  captureAttribution();
  return readStoredAttribution() ?? { landing_page: window.location.pathname };
}

export function reachGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const ym = (window as Window & { ym?: YmFn }).ym;
  if (typeof ym !== "function") return;

  const id = Number(YANDEX_METRIKA_ID);
  if (!Number.isFinite(id)) return;

  if (params) {
    ym(id, "reachGoal", goal, params);
    return;
  }

  ym(id, "reachGoal", goal);
}

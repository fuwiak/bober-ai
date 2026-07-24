import { yandexMetrikaIdForLocation } from "@/lib/legal";

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

const PAID_MEDIUMS = new Set(["cpc", "cpm", "paid", "ppc", "display", "retargeting"]);
const ORGANIC_MEDIUMS = new Set(["organic", "seo"]);

function searchEngineFromReferrer(referrer = ""): string | null {
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if (/(^|\.)yandex\.|(^|\.)ya\.ru$/.test(host)) return "yandex";
    if (/(^|\.)google\./.test(host)) return "google";
    if (/(^|\.)bing\.com$/.test(host)) return "bing";
    if (/(^|\.)duckduckgo\.com$/.test(host)) return "duckduckgo";
    if (/(^|\.)mail\.ru$/.test(host) || /(^|\.)go\.mail\.ru$/.test(host)) return "mailru";
    if (/(^|\.)yahoo\./.test(host)) return "yahoo";
    return null;
  } catch {
    return null;
  }
}

/** Яндекс Директ / CPC: yclid или классические UTM платного трафика. */
export function isPaidTraffic(attr?: Attribution | null): boolean {
  const a = attr ?? (typeof window === "undefined" ? null : getAttribution());
  if (!a) return false;
  if (a.yclid) return true;
  const medium = (a.utm_medium || "").toLowerCase();
  if (PAID_MEDIUMS.has(medium)) return true;
  const source = (a.utm_source || "").toLowerCase();
  return source === "yandex_direct" || source === "ydirect";
}

/** Органика: referrer поисковика или utm_medium=organic, без paid/yclid. */
export function isOrganicTraffic(attr?: Attribution | null): boolean {
  const a = attr ?? (typeof window === "undefined" ? null : getAttribution());
  if (!a || isPaidTraffic(a)) return false;

  const medium = (a.utm_medium || "").toLowerCase();
  if (ORGANIC_MEDIUMS.has(medium)) return true;

  if (typeof document === "undefined") return false;
  return Boolean(searchEngineFromReferrer(document.referrer));
}

export function organicEngine(attr?: Attribution | null): string | undefined {
  const a = attr ?? (typeof window === "undefined" ? null : getAttribution());
  if (!a || isPaidTraffic(a)) return undefined;
  const medium = (a.utm_medium || "").toLowerCase();
  if (ORGANIC_MEDIUMS.has(medium)) {
    return (a.utm_source || "organic").toLowerCase();
  }
  if (typeof document === "undefined") return undefined;
  return searchEngineFromReferrer(document.referrer) ?? undefined;
}

export function attributionGoalParams(extra?: Record<string, unknown>): Record<string, unknown> {
  const a = getAttribution();
  const organic = isOrganicTraffic(a);
  return {
    ...extra,
    utm_source: a.utm_source,
    utm_medium: a.utm_medium,
    utm_campaign: a.utm_campaign,
    utm_content: a.utm_content,
    utm_term: a.utm_term,
    yclid: a.yclid,
    landing_page: a.landing_page,
    paid: isPaidTraffic(a) ? 1 : 0,
    organic: organic ? 1 : 0,
    engine: organic ? organicEngine(a) : undefined,
  };
}

/** Помечает <html data-paid-traffic> для CSS / sticky CTA. */
export function syncPaidTrafficMarker() {
  if (typeof document === "undefined") return false;
  const paid = isPaidTraffic();
  document.documentElement.toggleAttribute("data-paid-traffic", paid);
  document.documentElement.toggleAttribute("data-organic-traffic", !paid && isOrganicTraffic());
  return paid;
}

export function reachGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const ym = (window as Window & { ym?: YmFn }).ym;
  if (typeof ym !== "function") return;

  const id = Number(yandexMetrikaIdForLocation(window.location.hostname, window.location.pathname));
  if (!Number.isFinite(id)) return;

  if (params) {
    ym(id, "reachGoal", goal, params);
    return;
  }

  ym(id, "reachGoal", goal);
}

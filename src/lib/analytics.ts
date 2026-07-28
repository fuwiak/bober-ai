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

const PAID_MEDIUMS = new Set(["cpc", "cpm", "paid", "ppc", "display", "retargeting"]);
const ORGANIC_MEDIUMS = new Set(["organic", "seo"]);

/**
 * Хосты поисковиков для диагностического события organic_visit.
 * Источник истины для SEO-отчётов — автоклассификация Метрики
 * (Источники → Поисковые системы), не этот список.
 */
const ORGANIC_SEARCH_HOSTS = [
  "yandex.ru",
  "yandex.com",
  "yandex.by",
  "yandex.kz",
  "yandex.uz",
  "ya.ru",
  "google.com",
  "google.ru",
  "bing.com",
  "search.mail.ru",
  "go.mail.ru",
  "rambler.ru",
  "duckduckgo.com",
  "yahoo.com",
] as const;

const YM_READY_ATTEMPTS = 40;
const YM_READY_INTERVAL_MS = 250;

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

function normalizeHostname(hostname: string): string {
  return hostname.toLowerCase().replace(/^www\./, "");
}

/** Диагностика: referrer с известного поисковика (не замена отчёта Метрики). */
export function isOrganicSearchVisit(referrerUrl: string): boolean {
  if (!referrerUrl) return false;
  try {
    const hostname = normalizeHostname(new URL(referrerUrl).hostname);
    return ORGANIC_SEARCH_HOSTS.some(
      (searchHost) => hostname === searchHost || hostname.endsWith(`.${searchHost}`),
    );
  } catch {
    return false;
  }
}

export function organicEngineFromReferrer(referrerUrl = ""): string | null {
  if (!isOrganicSearchVisit(referrerUrl)) return null;
  try {
    const hostname = normalizeHostname(new URL(referrerUrl).hostname);
    if (hostname === "ya.ru" || hostname.endsWith(".ya.ru") || hostname.includes("yandex.")) {
      return "yandex";
    }
    if (hostname.includes("google.")) return "google";
    if (hostname === "bing.com" || hostname.endsWith(".bing.com")) return "bing";
    if (hostname.includes("duckduckgo.")) return "duckduckgo";
    if (hostname.includes("mail.ru")) return "mailru";
    if (hostname.includes("rambler.")) return "rambler";
    if (hostname.includes("yahoo.")) return "yahoo";
    return hostname;
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

/**
 * Органика для диагностического события organic_visit.
 * Не использовать как конверсию / цель оптимизации Direct.
 * SEO-отчёты: Метрика → Источники → Поисковые системы.
 */
export function isOrganicTraffic(attr?: Attribution | null): boolean {
  const a = attr ?? (typeof window === "undefined" ? null : getAttribution());
  if (!a || isPaidTraffic(a)) return false;

  const medium = (a.utm_medium || "").toLowerCase();
  if (ORGANIC_MEDIUMS.has(medium)) return true;

  if (typeof document === "undefined") return false;
  return isOrganicSearchVisit(document.referrer);
}

export function organicEngine(attr?: Attribution | null): string | undefined {
  const a = attr ?? (typeof window === "undefined" ? null : getAttribution());
  if (!a || isPaidTraffic(a)) return undefined;
  const medium = (a.utm_medium || "").toLowerCase();
  if (ORGANIC_MEDIUMS.has(medium)) {
    return (a.utm_source || "organic").toLowerCase();
  }
  if (typeof document === "undefined") return undefined;
  return organicEngineFromReferrer(document.referrer) ?? undefined;
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

/** Помечает <html data-paid-traffic / data-organic-traffic> для UI. */
export function syncPaidTrafficMarker() {
  if (typeof document === "undefined") return false;
  const paid = isPaidTraffic();
  document.documentElement.toggleAttribute("data-paid-traffic", paid);
  document.documentElement.toggleAttribute("data-organic-traffic", !paid && isOrganicTraffic());
  return paid;
}

function counterId(): number | null {
  if (typeof window === "undefined") return null;
  const raw = yandexMetrikaIdForLocation(window.location.hostname, window.location.pathname);
  if (!raw) return null;
  const id = Number(raw);
  return Number.isFinite(id) ? id : null;
}

function getYm(): YmFn | null {
  if (typeof window === "undefined") return null;
  const ym = (window as Window & { ym?: YmFn }).ym;
  return typeof ym === "function" ? ym : null;
}

function fireGoal(goal: string, params?: Record<string, unknown>) {
  const ym = getYm();
  const id = counterId();
  if (!ym || id == null) return false;
  if (params) {
    ym(id, "reachGoal", goal, params);
  } else {
    ym(id, "reachGoal", goal);
  }
  return true;
}

/**
 * Отправляет reachGoal сразу или ждёт загрузки tag.js (послеInteractive).
 * Без ожидания organic_visit/direct_visit часто теряются на первом hit.
 */
export function reachGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  if (fireGoal(goal, params)) return;

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (fireGoal(goal, params) || attempts >= YM_READY_ATTEMPTS) {
      window.clearInterval(timer);
    }
  }, YM_READY_INTERVAL_MS);
}

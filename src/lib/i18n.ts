import type { Locale } from "./markets";

export type { Locale } from "./markets";
export { LOCALES, marketOf, contentLang, isPrefixedLocale } from "./markets";

import ru from "../content/ru";
import kz from "../content/kz";
import uz from "../content/uz";

export type Messages = typeof ru;

const catalogs: Record<Locale, Messages> = { ru, kz, uz };

const PREFIXES: Exclude<Locale, "ru">[] = ["kz", "uz"];

export function loadMessages(locale: Locale): Messages {
  return catalogs[locale] ?? ru;
}

export function t(messages: Messages, path: string): string {
  const parts = path.split(".");
  let current: unknown = messages;

  for (const part of parts) {
    if (current && typeof current === "object" && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return path;
    }
  }

  return typeof current === "string" ? current : path;
}

/** Strip /kz or /uz prefix from an internal path. */
export function stripLocalePrefix(path: string): string {
  for (const p of PREFIXES) {
    if (path === `/${p}`) return "/";
    if (path.startsWith(`/${p}/`)) return path.slice(p.length + 1) || "/";
  }
  // Legacy EN → treat as bare path (redirects handle SEO).
  if (path === "/en") return "/";
  if (path.startsWith("/en/")) return path.slice(3) || "/";
  return path;
}

export function localizePath(path: string, locale: Locale): string {
  const hashIndex = path.indexOf("#");
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : "";
  let base = hashIndex >= 0 ? path.slice(0, hashIndex) : path;

  if (!base.startsWith("/")) base = `/${base}`;
  base = stripLocalePrefix(base);

  if (locale === "kz" || locale === "uz") {
    if (base === "/") return `/${locale}${hash}`;
    return `/${locale}${base}${hash}`;
  }

  return `${base}${hash}`;
}

/** Alternate markets for hreflang / switcher (excludes current). UZ omitted — 301 to RU. */
export function otherLocales(locale: Locale): Locale[] {
  return (["ru", "kz"] as Locale[]).filter((l) => l !== locale);
}

/** @deprecated use otherLocales — kept for gradual migration */
export function otherLocale(locale: Locale): Locale {
  if (locale === "ru") return "kz";
  return "ru";
}

export function localeFromPath(pathname: string): Locale {
  if (pathname === "/kz" || pathname.startsWith("/kz/")) return "kz";
  if (pathname === "/uz" || pathname.startsWith("/uz/")) return "uz";
  return "ru";
}

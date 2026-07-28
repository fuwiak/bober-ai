import ru from "../content/ru";
import en from "../content/en";

export type Locale = "ru" | "en";
export type Messages = typeof ru;

const catalogs: Record<Locale, Messages> = { ru, en };

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

/** Strip locale prefix from an internal path. */
function stripLocalePrefix(path: string): string {
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

  if (locale === "en") {
    if (base === "/") return `/en${hash}`;
    return `/en${base}${hash}`;
  }

  return `${base}${hash}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "ru" ? "en" : "ru";
}

export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ru";
}

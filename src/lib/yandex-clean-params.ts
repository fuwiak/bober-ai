/**
 * Tracking GET-params for Yandex Clean-param / Webmaster «Настройка GET-параметров».
 * Keep in sync with scripts/postbuild-static.mjs (static export fallback).
 */
export const YANDEX_CLEAN_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "yclid",
  "fbclid",
  "gclid",
  "_openstat",
] as const;

/** `Clean-param: a&b&c` — Yandex ignores these query keys when choosing the index URL. */
export function yandexCleanParamLine(): string {
  return `Clean-param: ${YANDEX_CLEAN_PARAMS.join("&")}`;
}

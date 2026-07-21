/**
 * Важные URL для мониторинга в Яндекс Вебмастере
 * (Индексирование → Мониторинг важных страниц).
 * Держим в коде, чтобы CLI и документация совпадали с реальным приоритетом.
 */
import { BITRIX_SITE_URL, PARTNERS_SITE_URL, SITE_URL } from "@/lib/site";

export const YANDEX_IMPORTANT_PATHS = [
  "/",
  "/services",
  "/pricing",
  "/portfolio",
  "/blog",
  "/faq",
  "/automation",
  "/partners",
  "/guides",
  "/media",
  "/integrations/bitrix24",
  "/integrations/amocrm",
] as const;

/** Standalone GEO hosts (not under www path). */
export function yandexImportantStandaloneUrls(): string[] {
  return [
    `${PARTNERS_SITE_URL.replace(/\/$/, "")}/`,
    `${BITRIX_SITE_URL.replace(/\/$/, "")}/`,
  ];
}

export function yandexImportantUrls(base = SITE_URL): string[] {
  const hostPaths = YANDEX_IMPORTANT_PATHS.map((path) =>
    path === "/" ? base.replace(/\/$/, "") + "/" : `${base.replace(/\/$/, "")}${path}`,
  );
  return [...hostPaths, ...yandexImportantStandaloneUrls()];
}

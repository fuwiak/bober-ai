/**
 * Важные URL для мониторинга в Яндекс Вебмастере
 * (Индексирование → Мониторинг важных страниц).
 * Держим в коде, чтобы CLI и документация совпадали с реальным приоритетом.
 */
import { SITE_URL } from "@/lib/site";

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
] as const;

export function yandexImportantUrls(base = SITE_URL): string[] {
  return YANDEX_IMPORTANT_PATHS.map((path) =>
    path === "/" ? base.replace(/\/$/, "") + "/" : `${base.replace(/\/$/, "")}${path}`,
  );
}

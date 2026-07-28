/**
 * Ключевые URL для проверки в валидаторе микроразметки Яндекса.
 * UI (только вручную, API нет): https://webmaster.yandex.ru/tools/microtest/
 *
 * CLI: npm run webmaster:microtest · yaga webmaster microtest
 */
import { SITE_URL } from "@/lib/site";

export const YANDEX_MICROTEST_URL = "https://webmaster.yandex.ru/tools/microtest/";
export const YANDEX_MICROTEST_DOCS =
  "https://yandex.ru/support/webmaster/ru/yandex-indexing/validator";

/** Страницы с разной разметкой (Organization, Service, FAQ, Article, Breadcrumb…). */
export const YANDEX_MICROTEST_PATHS = [
  "/",
  "/services",
  "/services/business-process-automation",
  "/faq",
  "/pricing",
  "/portfolio",
  "/about",
  "/blog",
  "/secure-ai",
  "/kaspersky",
] as const;

export function yandexMicrotestUrls(base = SITE_URL): string[] {
  const root = base.replace(/\/$/, "");
  return YANDEX_MICROTEST_PATHS.map((path) =>
    path === "/" ? `${root}/` : `${root}${path}`,
  );
}

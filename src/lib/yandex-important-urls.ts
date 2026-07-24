/**
 * Важные URL для мониторинга в Яндекс Вебмастере
 * (Индексирование → Мониторинг важных страниц).
 * Держим в коде, чтобы CLI и документация совпадали с реальным приоритетом.
 *
 * API Вебмастера умеет только GET important-urls — добавление только в UI.
 * В UI «Важные страницы» принимаются только URL текущего хоста
 * (www ≠ partners. / bitrix.).
 *
 * Список: `npm run webmaster:boost` / `yaga webmaster boost --checklist`.
 */
import { BITRIX_SITE_URL, PARTNERS_SITE_URL, SITE_URL } from "@/lib/site";

/** Разделы и коммерческие лендинги на главном зеркале (www). */
export const YANDEX_IMPORTANT_PATHS = [
  "/",
  "/services",
  "/pricing",
  "/portfolio",
  "/about",
  "/blog",
  "/faq",
  "/automation",
  "/partners",
  "/guides",
  "/media",
  "/integrations/bitrix24",
  "/integrations/amocrm",
  // Ключевые услуги (коммерческий интент)
  "/services/business-process-automation",
  "/services/sales-ai-agent",
  "/services/ai-discovery-roadmap",
  "/services/enterprise-ai-assistant",
  "/services/private-llm-gigachat",
  "/services/crm-integration",
  "/services/ai-consulting",
  "/services/n8n",
  "/services/document-processing",
] as const;

/**
 * Отдельные хосты — добавлять только в Вебмастере на их собственном сайте
 * (не в важных страницах www).
 */
export function yandexImportantStandaloneUrls(): string[] {
  return [
    `${PARTNERS_SITE_URL.replace(/\/$/, "")}/`,
    `${BITRIX_SITE_URL.replace(/\/$/, "")}/`,
  ];
}

/** URL для текущего хоста (по умолчанию www) — то, что можно вставить в UI. */
export function yandexImportantUrls(base = SITE_URL): string[] {
  const root = base.replace(/\/$/, "");
  return YANDEX_IMPORTANT_PATHS.map((path) =>
    path === "/" ? `${root}/` : `${root}${path}`,
  );
}

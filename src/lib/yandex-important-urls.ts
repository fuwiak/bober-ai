/**
 * Важные URL для мониторинга в Яндекс Вебмастере
 * (Индексирование → Мониторинг важных страниц).
 * Держим в коде, чтобы CLI и документация совпадали с реальным приоритетом.
 *
 * API Вебмастера умеет только GET important-urls — добавление только в UI.
 * Список ниже используется для recrawl / чеклиста: `npm run webmaster:boost`.
 */
import { BITRIX_SITE_URL, PARTNERS_SITE_URL, SITE_URL } from "@/lib/site";

/** Разделы и коммерческие лендинги — приоритет для индекса и сниппетов. */
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

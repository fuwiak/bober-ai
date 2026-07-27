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
  "/integrations",
  "/solutions",
  "/partners",
  "/secure-ai",
  "/ai-kubernetes",
  "/claude",
  "/kaspersky",
  "/kaspersky/llm-rag-aist",
  "/kaspersky/container-security-kira",
  "/kaspersky/soc-kuma-kira",
  "/kaspersky/secure-ai-agent-gateway",
  "/kaspersky/mail-ai-phishing",
  "/guides",
  "/media",
  // Priority commercial pack (problem + system)
  "/integrations/bitrix24",
  "/integrations/bitrix24-ai",
  "/integrations/bitrix24-sales-automation",
  "/integrations/bitrix24-1c",
  "/integrations/amocrm",
  "/integrations/amocrm-automation",
  "/integrations/amocrm-1c",
  "/integrations/1c",
  "/automation/documents",
  "/automation/sales",
  "/automation/proposal-generation",
  "/solutions/knowledge-base",
  "/ai/private-llm",
  "/portfolio/bitrix24-kwork-crm",
  "/portfolio/wildberries-independent-sales-channel",
  "/portfolio/invoice-processing-pipeline",
  // Ключевые услуги (коммерческий интент)
  "/services/business-process-automation",
  "/services/sales-ai-agent",
  "/services/ai-discovery-roadmap",
  "/services/enterprise-ai-assistant",
  "/services/self-hosted-ai",
  "/services/private-llm-gigachat",
  "/services/crm-integration",
  "/services/ai-consulting",
  "/services/n8n",
  "/services/document-processing",
  "/services/wildberries-independent-sales-channel",
  "/services/secure-private-ai-cloud",
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

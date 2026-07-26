import { KASPERSKY_PRODUCTS } from "@/lib/kaspersky-page";

/** Specialist line under Bober AI Systems — path /secure-ai (not a separate brand). */
export const SECURE_AI_PAGE = {
  lineRu: "Bober Secure AI",
  lineEn: "Bober Secure AI",
  parentRu: "линия Bober AI Systems",
  parentEn: "line of Bober AI Systems",
  metaTitleRu: "Bober Secure AI — безопасные LLM, RAG и AI-агенты | Bober AI",
  metaTitleEn: "Bober Secure AI — secure LLM, RAG and AI agents | Bober AI",
  metaDescRu:
    "Специализированная линия Bober AI Systems: безопасные корпоративные LLM/RAG, Agent Gateway, Container Security и Kaspersky. Не отдельный бренд — один ИП.",
  metaDescEn:
    "Specialist line of Bober AI Systems: secure corporate LLM/RAG, Agent Gateway, Container Security and Kaspersky. Not a separate brand — same legal entity.",
  h1Ru: "Безопасные корпоративные LLM, RAG и AI-агенты",
  h1En: "Secure corporate LLM, RAG and AI agents",
  subtitleRu:
    "Отдельный коммерческий питч для ИБ и IT: безопасность модели, данных, агентов и инфраструктуры. Формально — та же марка и тот же ИП, что Bober AI Systems.",
  subtitleEn:
    "A focused pitch for security and IT: model, data, agent and infrastructure safety. Same brand group and legal entity as Bober AI Systems.",
  brandNoteRu:
    "Отдельную марку и домен (Bober Secure Systems / security.*) имеет смысл только когда пойдут независимые продажи Container Security, SIEM/KUMA, managed security. Сейчас отдельный бренд дробит SEO и референсы.",
  brandNoteEn:
    "A separate brand and domain (Bober Secure Systems / security.*) only makes sense once you sell Container Security, SIEM/KUMA and managed security on their own. Today a second brand splits SEO and references.",
  mainBrandTitleRu: "Bober AI Systems — основная деятельность",
  mainBrandTitleEn: "Bober AI Systems — core business",
  mainBrandRu: [
    "Автоматизация бизнеса",
    "LLM, RAG, агенты",
    "CRM, документы, продажи",
    "Cloud / on-prem",
    "AI consulting и интеграции",
  ],
  mainBrandEn: [
    "Business automation",
    "LLM, RAG, agents",
    "CRM, documents, sales",
    "Cloud / on-prem",
    "AI consulting and integrations",
  ],
  lineTitleRu: "Bober Secure AI — специалистская линия",
  lineTitleEn: "Bober Secure AI — specialist line",
  lineScopeRu: [
    "Безопасность LLM и RAG",
    "Prompt injection и jailbreak",
    "Защита данных и контроль агентов",
    "Secure AI Agent Gateway",
    "Kubernetes и Container Security",
    "Инфраструктура с решениями Kaspersky",
  ],
  lineScopeEn: [
    "LLM and RAG security",
    "Prompt injection and jailbreak",
    "Data protection and agent control",
    "Secure AI Agent Gateway",
    "Kubernetes and Container Security",
    "Infrastructure with Kaspersky products",
  ],
  homePitchRu:
    "На главной Bober Dev безопасность — элемент внедрения, не отдельный продукт: корпоративные AI-системы в cloud, on-prem и закрытом контуре с контролем доступа и защитой инфраструктуры.",
  homePitchEn:
    "On the main Bober Dev site, security is a deployment trait — not a standalone product: corporate AI systems in cloud, on-prem and closed contours with access control and infrastructure protection.",
  packHref: "/services/secure-private-ai-cloud",
  packLabelRu: "Пакет Secure Private AI Cloud",
  packLabelEn: "Secure Private AI Cloud pack",
  kasperskyHref: "/kaspersky",
  kasperskyLabelRu: "Партнёрский хаб Kaspersky",
  kasperskyLabelEn: "Kaspersky partner hub",
} as const;

export function getSecureAiProductLinks() {
  return KASPERSKY_PRODUCTS.map((p) => ({
    slug: p.slug,
    href: `/kaspersky/${p.slug}` as const,
    titleRu: p.titleRu,
    titleEn: p.titleEn,
    badgeRu: p.badgeRu,
    badgeEn: p.badgeEn,
    summaryRu: p.summaryRu,
    summaryEn: p.summaryEn,
  }));
}

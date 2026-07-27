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
    "Специализированная линия Bober AI Systems: безопасные корпоративные LLM/RAG, Agent Gateway, Container Security и Kaspersky для ИБ и IT-команд.",
  metaDescEn:
    "Specialist line of Bober AI Systems: secure corporate LLM/RAG, Agent Gateway, Container Security and Kaspersky for security and IT teams.",
  h1Ru: "Безопасные корпоративные LLM, RAG и AI-агенты",
  h1En: "Secure corporate LLM, RAG and AI agents",
  subtitleRu:
    "Специализированные решения для ИБ и IT: безопасное проектирование LLM, RAG и агентов, внедрение в существующую инфраструктуру клиента и опциональная интеграция с решениями защиты инфраструктуры.",
  subtitleEn:
    "Specialized solutions for security and IT teams: secure design of LLM, RAG and agents, deployment into the client's existing infrastructure, with optional integration into infrastructure-protection products.",
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
  packHref: "/services/secure-private-ai-cloud",
  packLabelRu: "Пакет Secure Private AI Cloud",
  packLabelEn: "Secure Private AI Cloud pack",
  kasperskyHref: "/kaspersky",
  kasperskyLabelRu: "Партнёрский хаб Kaspersky",
  kasperskyLabelEn: "Kaspersky partner hub",

  trustTitleRu: "Партнёрский статус",
  trustTitleEn: "Partner status",
  trustIntroRu:
    "Registered Partner «Лаборатории Касперского» (B2B и B2C) — оригиналы сертификатов ниже, лицензии поставляются через авторизованную дистрибуцию.",
  trustIntroEn:
    "Kaspersky Lab Registered Partner (B2B and B2C) — certificate originals below; licenses are supplied via authorized distribution.",

  processTitleRu: "Как проходит внедрение",
  processTitleEn: "How an engagement runs",
  processRu: [
    "Аудит контура: данные, модель, агенты, инфраструктура — что уже есть и чего не хватает",
    "Выбор линии: LLM/RAG + аудит AIST, Container Security, SOC-ассистент на KUMA/KIRA, Agent Gateway или защита почты",
    "Внедрение AI Security Gateway (RAG, интеграции) и продуктов Kaspersky через партнёрскую дистрибуцию",
    "Мониторинг, отчёты для руководства и ИБ, продление лицензий",
  ],
  processEn: [
    "Contour audit: data, model, agents, infrastructure — what exists and what is missing",
    "Pick a line: LLM/RAG + AIST audit, Container Security, SOC assistant on KUMA/KIRA, Agent Gateway or mail protection",
    "Deploy the AI Security Gateway (RAG, integrations) plus Kaspersky products via authorized distribution",
    "Monitoring, reports for leadership and security, license renewals",
  ],

  faqRu: [
    {
      q: "Bober Secure AI — это отдельная компания?",
      a: "Нет. Это специализированная линия той же команды и того же ИП, что Bober AI Systems: общие сертификаты, портфолио, контакты и реквизиты.",
    },
    {
      q: "Можно развернуть решение on-prem или в закрытом контуре?",
      a: "Да. Private LLM/RAG и Secure AI Agent Gateway разворачиваются on-prem, в российском облаке (Yandex Cloud, Selectel, Cloud.ru) или в гибридном контуре — вариант зависит от требований к данным.",
    },
    {
      q: "Чем Secure AI Agent Gateway отличается от антивируса Kaspersky?",
      a: "Kaspersky защищает инфраструктуру — хосты, контейнеры, почту, SIEM. Gateway — отдельный слой контроля над самим LLM-агентом: RBAC, allowlist инструментов, маскирование данных, human approval и audit log.",
    },
    {
      q: "С чего начать, если ещё нет лицензий Kaspersky?",
      a: "С аудита контура и сметы лицензий через партнёрскую дистрибуцию (Registered Partner Kaspersky) — после этого выбираем линию: LLM/RAG с AIST, Container Security, SOC-ассистент или защита почты.",
    },
  ],
  faqEn: [
    {
      q: "Is Bober Secure AI a separate company?",
      a: "No. It's a specialist line of the same team and legal entity as Bober AI Systems — same certificates, portfolio, contacts and legal details.",
    },
    {
      q: "Can this run on-prem or in a closed contour?",
      a: "Yes. Private LLM/RAG and the Secure AI Agent Gateway deploy on-prem, in a Russian cloud (Yandex Cloud, Selectel, Cloud.ru) or in a hybrid contour, depending on data requirements.",
    },
    {
      q: "How is the Secure AI Agent Gateway different from Kaspersky antivirus?",
      a: "Kaspersky protects infrastructure — hosts, containers, mail, SIEM. The Gateway is a separate control layer over the LLM agent itself: RBAC, tool allowlists, data masking, human approval and an audit log.",
    },
    {
      q: "Where do we start without existing Kaspersky licenses?",
      a: "With a contour audit and a license quote via authorized distribution (Kaspersky Registered Partner) — then we pick a line: LLM/RAG with AIST, Container Security, a SOC assistant, or mail protection.",
    },
  ],
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

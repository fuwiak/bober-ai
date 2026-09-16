import type { LandingSpec } from "@/lib/seo-catalog/types";

/**
 * Алиса ИИ (Yandex Alice) — навыки, диалог, интеграция в бизнес-контур.
 * Landing: /integrations/alisa-ai · Uslugi: data/uslugi-alisa-ai-2026-09.json
 */
export const CATALOG_LANDING_SPECS_ALISA: LandingSpec[] = [
  {
    category: "integrations",
    slug: "alisa-ai",
    contentKey: "alisa_ai_integration",
    cluster: "alice",
    serviceSlug: "alisa-ai",
    coverImage: "/stock/offers/land-integrations-alisa-ai.jpg",
    keywords: [
      "алиса ии",
      "алиса ai",
      "интеграция алиса ии",
      "разработка навыков алисы",
      "навык алисы для бизнеса",
      "яндекс алиса для бизнеса",
      "алиса голосовой ассистент бизнес",
      "внедрение алиса ии",
    ],
    caseStudySlugs: ["lead-generation", "crm-telegram-sheets"],
    related: [
      { href: "/services/voice-ai", labelRu: "Voice AI", labelEn: "Voice AI" },
      { href: "/services/ai-agent", labelRu: "ИИ-агенты", labelEn: "AI agents" },
      { href: "/integrations/integraciya-ii-s-crm", labelRu: "ИИ ↔ CRM", labelEn: "AI ↔ CRM" },
      { href: "/claude", labelRu: "Claude AI", labelEn: "Claude AI" },
      { href: "/pricing", labelRu: "Цены", labelEn: "Pricing" },
    ],
    ru: {
      h1: "Интеграция Алиса ИИ",
      subtitle:
        "Навыки Алисы, диалог и действия в CRM/сайте: запись, статус заказа, FAQ. Фиксированная смета, пилот 2–4 недели. От 300 000 ₽.",
      problems: [
        "Нужен навык Алисы под бизнес — не демо из каталога",
        "Голос и чат не связаны с CRM: заявки теряются",
        "FAQ и статусы отвечают вручную, хотя Алиса уже в экосистеме клиента",
        "Нет приёмки: навык «есть», сценарии продаж — нет",
      ],
      deliverables: [
        "Сценарии навыка и карта интентов под ваш процесс",
        "Связка с CRM / сайтом / API (запись, статус, эскалация)",
        "Тестовый контур, логи и критерии приёмки",
        "Регламент поддержки и что менять без интегратора",
      ],
      intro: [
        "Алиса ИИ — точка входа клиентов Яндекса: голос, диалог, быстрые ответы. Мы делаем навык и интеграцию под ваш процесс, а не витринный демо-бот.",
        "Типовые сценарии: запись на услугу, статус заказа, FAQ по каталогу, передача лида в Bitrix24 / amoCRM с UTM и ответственным.",
      ],
      howWeSolve: [
        {
          title: "Сценарии",
          text: "Интенты, слоты, отказные ветки, эскалация к человеку. Без «под ключ» в названии — с фиксированной сметой и KPI.",
        },
        {
          title: "Интеграция",
          text: "API навыка ↔ CRM, сайт, календарь. Логи запросов, retry, тестовая среда до продакшена.",
        },
        {
          title: "Приёмка",
          text: "Чеклист диалогов, замер ошибок, handover команде. Доработки — отдельной сметой.",
        },
      ],
      faq: [
        {
          q: "Это разработка навыка Алисы или «просто чат»?",
          a: "Навык с действиями: запись, статус, передача в CRM. Чистый FAQ без интеграций — отдельный узкий пакет от 150 000 ₽.",
        },
        {
          q: "Нужен ли аккаунт разработчика Яндекса?",
          a: "Да. Помогаем с кабинетом навыка, публикацией и политиками модерации. Доступы — на стороне заказчика.",
        },
        {
          q: "Срок и цена?",
          a: "Пилот 2–4 недели. Интеграция с CRM — от 300 000 ₽; узкий навык FAQ — от 150 000 ₽. Смета до кода.",
        },
      ],
    },
    en: {
      h1: "Yandex Alice AI integration",
      subtitle:
        "Alice skills, dialogue and CRM/site actions: booking, order status, FAQ. Fixed estimate; pilot 2–4 weeks.",
      problems: [
        "Need a business Alice skill — not a catalog demo",
        "Voice/chat are not linked to CRM; leads are lost",
        "FAQ and status are answered manually",
        "No acceptance criteria — skill exists, sales flow does not",
      ],
      deliverables: [
        "Skill scenarios and intent map",
        "CRM / site / API wiring (booking, status, escalation)",
        "Test contour, logs and acceptance checklist",
        "Support playbook for your team",
      ],
      intro: [
        "Alice AI is a Yandex entry point: voice, dialogue, quick answers. We build the skill and integrations for your process.",
        "Typical flows: appointment booking, order status, catalog FAQ, lead handoff to Bitrix24 / amoCRM.",
      ],
      howWeSolve: [
        {
          title: "Scenarios",
          text: "Intents, slots, fallbacks, human escalation — with a fixed estimate and KPIs.",
        },
        {
          title: "Integration",
          text: "Skill API ↔ CRM, site, calendar. Request logs, retries, staging before prod.",
        },
        {
          title: "Accept",
          text: "Dialogue checklist, error rate, team handover. Follow-ups as a separate estimate.",
        },
      ],
      faq: [
        {
          q: "Full skill or FAQ-only?",
          a: "Full skill with CRM actions is the default. FAQ-only is a narrower package.",
        },
        {
          q: "Yandex developer account?",
          a: "Yes. We help with the skill console and moderation; credentials stay with the client.",
        },
        {
          q: "Timeline and price?",
          a: "Pilot 2–4 weeks. CRM-linked contour from a mid-market package; FAQ-only is cheaper.",
        },
      ],
    },
  },
];

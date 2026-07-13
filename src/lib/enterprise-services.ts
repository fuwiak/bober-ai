export type EnterpriseService = {
  id: string;
  slug: string;
  title: string;
  description: string;
  about: string;
  salesNotes: string;
  deliveryDays: number;
  price: number;
  serviceImage: string;
};

const IMAGES: Record<string, string> = {
  // Stock-ish visuals (local assets) for homepage cards
  "enterprise-ai-assistant": "/portfolio/elia-suite.png",
  "ai-discovery-roadmap": "/yandex/pasha-ai3.png",
  "private-llm-gigachat": "/media/legal-gpu-02.jpg",
  "business-process-automation": "/yandex/mac-mini.png",
  "sales-ai-agent": "/portfolio/offer-kp-llm.png",
};

const ruServices: EnterpriseService[] = [
  {
    id: "enterprise-ai-assistant",
    slug: "enterprise-ai-assistant",
    title: "Корпоративный AI-ассистент",
    description: "Диалоги, сценарии, интеграции с CRM и мессенджерами. LLM + оркестрация под ваши процессы.",
    about:
      "Проектируем архитектуру, подключаем LLM, интегрируем CRM/мессенджеры, деплоим в production и передаём команде с документацией.",
    salesNotes: "от 500 000 ₽",
    deliveryDays: 28,
    price: 500000,
    serviceImage: IMAGES["enterprise-ai-assistant"],
  },
  {
    id: "ai-discovery-roadmap",
    slug: "ai-discovery-roadmap",
    title: "AI Discovery & Roadmap",
    description: "Аудит, архитектура, выбор моделей, оценка сроков и бюджета до старта разработки.",
    about: "Сессия с экспертом: аудит идеи, рекомендации по стеку, roadmap и смета PoC/Production.",
    salesNotes: "от 150 000 ₽",
    deliveryDays: 10,
    price: 150000,
    serviceImage: IMAGES["ai-discovery-roadmap"],
  },
  {
    id: "private-llm-gigachat",
    slug: "private-llm-gigachat",
    title: "Приватный LLM-контур",
    description: "GigaChat, on-prem и изолированное облако — без утечки данных во внешние сервисы.",
    about: "Разворачиваем LLM в вашем контуре, настраиваем API, guardrails, мониторинг и интеграции.",
    salesNotes: "от 500 000 ₽",
    deliveryDays: 28,
    price: 500000,
    serviceImage: IMAGES["private-llm-gigachat"],
  },
  {
    id: "business-process-automation",
    slug: "business-process-automation",
    title: "Автоматизация процессов с AI",
    description: "Документы, отчёты, CRM, уведомления — цепочки задач без ручной рутины.",
    about: "Аудит процессов, настройка агентов, интеграция с вашими инструментами и обучение команды.",
    salesNotes: "от 400 000 ₽",
    deliveryDays: 21,
    price: 400000,
    serviceImage: IMAGES["business-process-automation"],
  },
  {
    id: "sales-ai-agent",
    slug: "sales-ai-agent",
    title: "AI-агент для продаж и КП",
    description: "Сбор коммерческих предложений из CRM и шаблонов. PDF за минуты, не за часы.",
    about: "Настраиваем агента под шаблоны и CRM, тестируем и запускаем в отделе продаж.",
    salesNotes: "от 400 000 ₽",
    deliveryDays: 14,
    price: 400000,
    serviceImage: IMAGES["sales-ai-agent"],
  },
];

const enServices: EnterpriseService[] = [
  {
    id: "enterprise-ai-assistant",
    slug: "enterprise-ai-assistant",
    title: "Enterprise AI assistant",
    description: "Dialogs, workflows, CRM and messenger integrations. LLM orchestration for your processes.",
    about: "Architecture, LLM integration, CRM/messenger connectors, production deployment, and team handover.",
    salesNotes: "from €5,000",
    deliveryDays: 28,
    price: 5000,
    serviceImage: IMAGES["enterprise-ai-assistant"],
  },
  {
    id: "ai-discovery-roadmap",
    slug: "ai-discovery-roadmap",
    title: "AI Discovery & Roadmap",
    description: "Audit, architecture, model selection, timeline and budget estimate before development.",
    about: "Expert session: idea audit, stack recommendations, roadmap, and PoC/production estimate.",
    salesNotes: "from €1,500",
    deliveryDays: 10,
    price: 1500,
    serviceImage: IMAGES["ai-discovery-roadmap"],
  },
  {
    id: "private-llm-gigachat",
    slug: "private-llm-gigachat",
    title: "Private LLM environment",
    description: "GigaChat, on-prem and isolated cloud — no data leakage to public APIs.",
    about: "Deploy LLM in your perimeter, configure API, guardrails, monitoring, and integrations.",
    salesNotes: "from €5,000",
    deliveryDays: 28,
    price: 5000,
    serviceImage: IMAGES["private-llm-gigachat"],
  },
  {
    id: "business-process-automation",
    slug: "business-process-automation",
    title: "AI business process automation",
    description: "Documents, reports, CRM, notifications — task chains without manual routine.",
    about: "Process audit, agent setup, tool integrations, and team training.",
    salesNotes: "from €4,000",
    deliveryDays: 21,
    price: 4000,
    serviceImage: IMAGES["business-process-automation"],
  },
  {
    id: "sales-ai-agent",
    slug: "sales-ai-agent",
    title: "AI agent for sales & proposals",
    description: "Commercial proposals from CRM and templates. PDF in minutes, not hours.",
    about: "Configure the agent for your templates and CRM, test, and launch in sales.",
    salesNotes: "from €4,000",
    deliveryDays: 14,
    price: 4000,
    serviceImage: IMAGES["sales-ai-agent"],
  },
];

export function getEnterpriseServices(locale: string): EnterpriseService[] {
  return locale === "en" ? enServices : ruServices;
}

export function getEnterpriseService(slug: string, locale: string) {
  return getEnterpriseServices(locale).find((item) => item.slug === slug);
}

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
  "enterprise-ai-assistant": "/stock/team-collab.jpg",
  "ai-discovery-roadmap": "/stock/roadmap-sticky-notes.jpg",
  "private-llm-gigachat": "/stock/cyber-padlock.jpg",
  "business-process-automation": "/stock/automation-code.jpg",
  "sales-ai-agent": "/stock/sales-proposal.jpg",
};

const ruServices: EnterpriseService[] = [
  {
    id: "business-process-automation",
    slug: "business-process-automation",
    title: "Автоматизация бизнес-процессов",
    description: "Аудит, интеграции CRM/1С, workflow — цепочки задач без ручной рутины.",
    about: "Аудит процессов, настройка автоматизации, интеграция с CRM и документами, обучение команды.",
    salesNotes: "от 400 000 ₽",
    deliveryDays: 21,
    price: 400000,
    serviceImage: IMAGES["business-process-automation"],
  },
  {
    id: "sales-ai-agent",
    slug: "sales-ai-agent",
    title: "Автоматизация отдела продаж",
    description: "Лиды, CRM, коммерческие предложения, follow-up — PDF за минуты, не за часы.",
    about: "Настраиваем автоматизацию под шаблоны и CRM, тестируем и запускаем в отделе продаж.",
    salesNotes: "от 400 000 ₽",
    deliveryDays: 14,
    price: 400000,
    serviceImage: IMAGES["sales-ai-agent"],
  },
  {
    id: "ai-discovery-roadmap",
    slug: "ai-discovery-roadmap",
    title: "AI & Automation Advisor",
    description: "Анализируем процесс, считаем ROI, выбираем технологию, внедряем.",
    about: "Бизнес-аудит, карта процессов, расчёт ROI, дорожная карта и смета до старта разработки.",
    salesNotes: "от 150 000 ₽",
    deliveryDays: 10,
    price: 150000,
    serviceImage: IMAGES["ai-discovery-roadmap"],
  },
  {
    id: "enterprise-ai-assistant",
    slug: "enterprise-ai-assistant",
    title: "Внедрение AI",
    description: "LLM, агенты, интеграции с CRM — production, не пилот на ChatGPT.",
    about: "Архитектура, LLM, интеграции CRM/мессенджеры, production-деплой и передача команде.",
    salesNotes: "от 500 000 ₽",
    deliveryDays: 28,
    price: 500000,
    serviceImage: IMAGES["enterprise-ai-assistant"],
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
];

const enServices: EnterpriseService[] = [
  {
    id: "business-process-automation",
    slug: "business-process-automation",
    title: "Business process automation",
    description: "Audit, CRM/ERP integrations, workflow — task chains without manual routine.",
    about: "Process audit, automation setup, CRM and document integrations, team training.",
    salesNotes: "from €4,000",
    deliveryDays: 21,
    price: 4000,
    serviceImage: IMAGES["business-process-automation"],
  },
  {
    id: "sales-ai-agent",
    slug: "sales-ai-agent",
    title: "Sales department automation",
    description: "Leads, CRM, proposals, follow-up — PDF in minutes, not hours.",
    about: "Configure automation for your templates and CRM, test, and launch in sales.",
    salesNotes: "from €4,000",
    deliveryDays: 14,
    price: 4000,
    serviceImage: IMAGES["sales-ai-agent"],
  },
  {
    id: "ai-discovery-roadmap",
    slug: "ai-discovery-roadmap",
    title: "AI & Automation Advisor",
    description: "We analyze the process, calculate ROI, choose technology, implement.",
    about: "Business audit, process map, ROI calculation, roadmap and estimate before development.",
    salesNotes: "from €1,500",
    deliveryDays: 10,
    price: 1500,
    serviceImage: IMAGES["ai-discovery-roadmap"],
  },
  {
    id: "enterprise-ai-assistant",
    slug: "enterprise-ai-assistant",
    title: "AI implementation",
    description: "LLM, agents, CRM integrations — production, not a ChatGPT pilot.",
    about: "Architecture, LLM integration, CRM/messenger connectors, production deployment, and team handover.",
    salesNotes: "from €5,000",
    deliveryDays: 28,
    price: 5000,
    serviceImage: IMAGES["enterprise-ai-assistant"],
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
];

export function getEnterpriseServices(locale: string): EnterpriseService[] {
  return locale === "en" ? enServices : ruServices;
}

export function getEnterpriseService(slug: string, locale: string) {
  return getEnterpriseServices(locale).find((item) => item.slug === slug);
}

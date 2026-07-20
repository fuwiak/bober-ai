import { DIAGRAM_IMAGES, STOCK_IMAGES } from "@/lib/site";
import type { HubDef } from "@/lib/seo-catalog/types";

export const SEO_HUBS: HubDef[] = [
  {
    category: "automation",
    contentKey: "hubAutomation",
    coverImage: STOCK_IMAGES.automation,
    children: [
      { href: "/automation/processes", labelRu: "Бизнес-процессы", labelEn: "Business processes", blurbRu: "Главный кластер спроса Wordstat", blurbEn: "Top Wordstat demand cluster" },
      { href: "/automation/documents", labelRu: "Документы", labelEn: "Documents", blurbRu: "Согласование, OCR, шаблоны", blurbEn: "Approvals, OCR, templates" },
      { href: "/automation/sales", labelRu: "Продажи", labelEn: "Sales", blurbRu: "КП, лиды, follow-up", blurbEn: "Proposals, leads, follow-up" },
      { href: "/automation/support", labelRu: "Поддержка", labelEn: "Support", blurbRu: "Заявки, боты, SLA", blurbEn: "Tickets, bots, SLA" },
      { href: "/automation/hr", labelRu: "HR", labelEn: "HR", blurbRu: "Резюме, онбординг, политики", blurbEn: "Resumes, onboarding, policies" },
      { href: "/automation/management", labelRu: "Руководителю", labelEn: "Management", blurbRu: "Дашборды и сводки", blurbEn: "Dashboards and digests" },
      { href: "/automation/knowledge-base", labelRu: "База знаний", labelEn: "Knowledge base", blurbRu: "Поиск по регламентам", blurbEn: "Policy search" },
    ],
    ru: {
      metaTitle: "Автоматизация бизнес-процессов — каталог решений | Bober AI",
      metaDescription:
        "Автоматизация процессов, документов, продаж, поддержки, HR и управленческой аналитики. AI — только там, где даёт ROI.",
      h1: "Автоматизация для бизнеса",
      subtitle: "Кластеры решений по реальному спросу Wordstat: процессы, CRM-сценарии, документы и операции.",
      intro: [
        "AI не является продуктом. Продукт — автоматизация. Ниже — входные страницы по болям бизнеса.",
        "Выберите кластер или сценарий — получите план, смету и production-внедрение.",
      ],
    },
    en: {
      metaTitle: "Business process automation — solutions catalog | Bober AI",
      metaDescription:
        "Automation for processes, documents, sales, support, HR and management analytics. AI only where it pays back.",
      h1: "Business automation",
      subtitle: "Solution clusters based on real search demand: processes, CRM scenarios, documents and ops.",
      intro: [
        "AI is not the product. Automation is. Below are entry pages by business pain.",
        "Pick a cluster or scenario — get a plan, fixed scope and production delivery.",
      ],
    },
  },
  {
    category: "integrations",
    contentKey: "hubIntegrations",
    coverImage: DIAGRAM_IMAGES.crm,
    children: [
      { href: "/integrations/crm", labelRu: "CRM", labelEn: "CRM", blurbRu: "Внедрение и автоматизация", blurbEn: "Implementation and automation" },
      { href: "/integrations/amocrm", labelRu: "amoCRM", labelEn: "amoCRM", blurbRu: "Воронки, виджеты, AI", blurbEn: "Pipelines, widgets, AI" },
      { href: "/integrations/bitrix24", labelRu: "Bitrix24", labelEn: "Bitrix24", blurbRu: "Боты, задачи, линии", blurbEn: "Bots, tasks, open lines" },
      { href: "/integrations/1c", labelRu: "1С", labelEn: "1C", blurbRu: "Синхронизация и AI-слой", blurbEn: "Sync and AI layer" },
      { href: "/integrations/api-integrations", labelRu: "API", labelEn: "API", blurbRu: "Кастомные интеграции", blurbEn: "Custom integrations" },
      { href: "/integrations/n8n-automation", labelRu: "n8n", labelEn: "n8n", blurbRu: "Workflow-автоматизация", blurbEn: "Workflow automation" },
    ],
    ru: {
      metaTitle: "Интеграции CRM, 1С, Bitrix24, amoCRM | Bober AI",
      metaDescription:
        "Интеграции CRM, 1С, Bitrix24, amoCRM и API. Надёжный обмен данными без ручного копирования.",
      h1: "Интеграции для бизнеса",
      subtitle: "Связываем CRM, учёт, сайт и мессенджеры — чтобы данные не жили в Excel и чатах.",
      intro: [
        "Интеграция — часто самый быстрый ROI: убрать ручной мост между системами.",
        "Ниже — готовые входные страницы по популярным стекам российского B2B.",
      ],
    },
    en: {
      metaTitle: "CRM, 1C, Bitrix24, amoCRM integrations | Bober AI",
      metaDescription:
        "CRM, 1C, Bitrix24, amoCRM and API integrations. Reliable data exchange without copy-paste.",
      h1: "Business integrations",
      subtitle: "Connect CRM, ledger, website and messengers — so data does not live in Excel and chats.",
      intro: [
        "Integration is often the fastest ROI: remove the manual bridge between systems.",
        "Below are entry pages for common RU/CIS B2B stacks.",
      ],
    },
  },
  {
    category: "industries",
    contentKey: "hubIndustries",
    coverImage: DIAGRAM_IMAGES.workflow,
    children: [
      { href: "/industries/construction", labelRu: "Строительство", labelEn: "Construction", blurbRu: "Сметы, подрядчики, документы", blurbEn: "Estimates, contractors, docs" },
      { href: "/industries/manufacturing", labelRu: "Производство", labelEn: "Manufacturing", blurbRu: "Заявки, склад, смены", blurbEn: "Requests, stock, shifts" },
      { href: "/industries/logistics", labelRu: "Логистика", labelEn: "Logistics", blurbRu: "Перевозки и статусы", blurbEn: "Shipments and statuses" },
      { href: "/industries/medicine", labelRu: "Медицина", labelEn: "Healthcare", blurbRu: "Клиники и документы", blurbEn: "Clinics and documents" },
      { href: "/industries/ecommerce", labelRu: "E-commerce", labelEn: "Ecommerce", blurbRu: "Заказы и поддержка", blurbEn: "Orders and support" },
      { href: "/industries/real-estate", labelRu: "Недвижимость", labelEn: "Real estate", blurbRu: "Лиды и сделки", blurbEn: "Leads and deals" },
      { href: "/industries/legal", labelRu: "Юристы", labelEn: "Legal", blurbRu: "Договоры и поиск", blurbEn: "Contracts and search" },
      { href: "/industries/banks", labelRu: "Финансы", labelEn: "Finance", blurbRu: "Заявки и документы", blurbEn: "Applications and docs" },
    ],
    ru: {
      metaTitle: "AI и автоматизация по отраслям | Bober AI",
      metaDescription:
        "Автоматизация и AI для строительства, производства, логистики, медицины, e-commerce и других отраслей.",
      h1: "Отраслевые решения",
      subtitle: "Одинаковые технологии — разные процессы. Входные страницы по отраслям из спроса Wordstat.",
      intro: [
        "Отраслевая страница помогает Яндексу и клиенту понять ваш контекст быстрее, чем общий «AI для бизнеса».",
        "Внутри каждого направления — те же принципы: процесс, ROI, затем AI.",
      ],
    },
    en: {
      metaTitle: "Industry AI and automation | Bober AI",
      metaDescription:
        "Automation and AI for construction, manufacturing, logistics, healthcare, ecommerce and more.",
      h1: "Industry solutions",
      subtitle: "Same technologies — different processes. Industry entry pages from search demand.",
      intro: [
        "Industry pages help search engines and buyers understand context faster than generic “AI for business”.",
        "Inside each vertical: process, ROI, then AI.",
      ],
    },
  },
  {
    category: "solutions",
    contentKey: "hubSolutions",
    coverImage: DIAGRAM_IMAGES.architecture,
    children: [
      { href: "/solutions/knowledge-base", labelRu: "База знаний", labelEn: "Knowledge base", blurbRu: "RAG и поиск", blurbEn: "RAG and search" },
      { href: "/solutions/assistant", labelRu: "Ассистент", labelEn: "Assistant", blurbRu: "Корпоративный бот", blurbEn: "Corporate bot" },
      { href: "/solutions/rag-search", labelRu: "RAG-поиск", labelEn: "RAG search", blurbRu: "Ответы по документам", blurbEn: "Answers from documents" },
      { href: "/solutions/ocr-pipeline", labelRu: "OCR", labelEn: "OCR", blurbRu: "Извлечение данных", blurbEn: "Data extraction" },
      { href: "/solutions/employee-assistant", labelRu: "Ассистент сотрудников", labelEn: "Employee assistant", blurbRu: "Внутренний Q&A", blurbEn: "Internal Q&A" },
      { href: "/solutions/manager-copilot", labelRu: "Копилот продаж", labelEn: "Sales copilot", blurbRu: "Помощник менеджера", blurbEn: "Rep assistant" },
    ],
    ru: {
      metaTitle: "AI-решения для бизнеса | Bober AI Systems",
      metaDescription: "База знаний, ассистенты, RAG, OCR и копилоты для продаж — с ROI и production-внедрением.",
      h1: "AI-решения",
      subtitle: "Готовые продуктовые сценарии на стыке автоматизации и AI.",
      intro: [
        "Решения ниже — не «коробочный AI», а сценарии под конкретную работу команды.",
        "Каждый сценарий можно встроить в CRM, портал или мессенджер.",
      ],
    },
    en: {
      metaTitle: "AI solutions for business | Bober AI Systems",
      metaDescription: "Knowledge base, assistants, RAG, OCR and sales copilots — with ROI and production delivery.",
      h1: "AI solutions",
      subtitle: "Product scenarios at the intersection of automation and AI.",
      intro: [
        "These are not boxed AI products — they are scenarios for concrete team work.",
        "Each scenario can live in CRM, a portal or a messenger.",
      ],
    },
  },
  {
    category: "ai",
    contentKey: "hubAi",
    coverImage: DIAGRAM_IMAGES.architecture,
    children: [
      { href: "/ai/corporate", labelRu: "Корпоративный ИИ", labelEn: "Enterprise AI", blurbRu: "Внедрение ИИ в бизнес", blurbEn: "AI implementation" },
      { href: "/ai/private-llm", labelRu: "Приватный LLM", labelEn: "Private LLM", blurbRu: "On-prem и контур", blurbEn: "On-prem and private" },
      { href: "/ai/ai-audit", labelRu: "AI-аудит", labelEn: "AI audit", blurbRu: "Дорожная карта", blurbEn: "Roadmap" },
      { href: "/ai/ai-agents", labelRu: "AI-агенты", labelEn: "AI agents", blurbRu: "Агенты в процессах", blurbEn: "Agents in processes" },
    ],
    ru: {
      metaTitle: "Внедрение ИИ в бизнес | Bober AI Systems",
      metaDescription: "Корпоративный ИИ, приватный LLM, AI-аудит и агенты. Технология — после бизнес-задачи.",
      h1: "Корпоративный ИИ",
      subtitle: "Внедряем ИИ туда, где он ускоряет процесс и окупается.",
      intro: [
        "Запросы «внедрение ИИ» широкие. Мы сужаем их до процесса с KPI.",
        "Ниже — входные страницы: от аудита до приватного LLM и агентов.",
      ],
    },
    en: {
      metaTitle: "Enterprise AI implementation | Bober AI Systems",
      metaDescription: "Enterprise AI, private LLM, AI audit and agents. Technology after the business job.",
      h1: "Enterprise AI",
      subtitle: "We implement AI where it speeds a process and pays back.",
      intro: [
        "“Implement AI” queries are broad. We narrow them to a process with KPIs.",
        "Below: entry pages from audit to private LLM and agents.",
      ],
    },
  },
];

export function getHub(category: string) {
  return SEO_HUBS.find((hub) => hub.category === category);
}

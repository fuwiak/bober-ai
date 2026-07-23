import { DIAGRAM_IMAGES, STOCK_IMAGES } from "@/lib/site";
import type { HubDef } from "@/lib/seo-catalog/types";

export const SEO_HUBS: HubDef[] = [
  {
    category: "automation",
    contentKey: "hubAutomation",
    coverImage: STOCK_IMAGES.automation,
    children: [
      {
        href: "/automation/proposal-generation",
        labelRu: "Автоматизация коммерческих предложений",
        labelEn: "Commercial proposal automation",
        blurbRu: "КП из CRM и прайса за минуты — без копипаста в Word.",
        blurbEn: "Proposals from CRM and price lists in minutes — no Word copy-paste.",
      },
      {
        href: "/automation/documents",
        labelRu: "Автоматизация документооборота",
        labelEn: "Document workflow automation",
        blurbRu: "Согласования, маршруты, версии и связка с CRM/1С.",
        blurbEn: "Approvals, routes, versions and CRM/1C linkage.",
      },
      {
        href: "/integrations/bitrix24-ai",
        labelRu: "AI для Bitrix24",
        labelEn: "AI for Bitrix24",
        blurbRu: "AI-слой поверх Bitrix24: сделки, документы, задачи.",
        blurbEn: "AI layer on Bitrix24: deals, documents, tasks.",
      },
      {
        href: "/integrations/amocrm-ai",
        labelRu: "AI для amoCRM",
        labelEn: "AI for amoCRM",
        blurbRu: "Квалификация, КП и follow-up внутри amoCRM.",
        blurbEn: "Qualification, proposals and follow-up inside amoCRM.",
      },
      {
        href: "/integrations/1c-ai-layer",
        labelRu: "AI для 1С",
        labelEn: "AI for 1C",
        blurbRu: "AI-слой поверх 1С: документы, остатки, статусы.",
        blurbEn: "AI layer on 1C: documents, stock, statuses.",
      },
      {
        href: "/services/rag",
        labelRu: "Корпоративный RAG",
        labelEn: "Corporate RAG",
        blurbRu: "Ответы по вашим документам с цитатами источников.",
        blurbEn: "Answers from your documents with source citations.",
      },
      {
        href: "/automation/ocr-data-extraction",
        labelRu: "Распознавание документов",
        labelEn: "Document recognition",
        blurbRu: "OCR и извлечение полей из сканов и PDF в CRM/1С.",
        blurbEn: "OCR and field extraction from scans and PDF into CRM/ERP.",
      },
      {
        href: "/automation/ai-for-sales",
        labelRu: "AI для отдела продаж",
        labelEn: "AI for the sales team",
        blurbRu: "Квалификация лидов, follow-up и помощник менеджера.",
        blurbEn: "Lead qualification, follow-up and sales assistant.",
      },
    ],
    ru: {
      metaTitle: "Автоматизация бизнес-процессов — каталог решений | Bober AI",
      metaDescription:
        "Pillar-страница: автоматизация КП, документооборота, Bitrix24, amoCRM, 1С, RAG, OCR и AI для продаж. Кластеры с фиксированной сметой.",
      h1: "Автоматизация бизнес-процессов",
      subtitle:
        "Один pillar-каталог — восемь кластеров. Выберите сценарий: КП, документы, CRM/1С, RAG, OCR или AI для продаж — получите план, смету и production.",
      intro: [
        "AI не является продуктом. Продукт — автоматизация бизнес-процесса с KPI.",
        "Ниже — кластеры без пересечения head-термов: каждый URL отвечает за свою фразу.",
      ],
    },
    en: {
      metaTitle: "Business process automation — solutions catalog | Bober AI",
      metaDescription:
        "Pillar page: proposal automation, documents, Bitrix24, amoCRM, 1C, RAG, OCR and AI for sales. Clusters with a fixed estimate.",
      h1: "Business process automation",
      subtitle:
        "One pillar catalog — eight clusters. Pick a scenario: proposals, documents, CRM/1C, RAG, OCR or AI for sales — get a plan, estimate and production delivery.",
      intro: [
        "AI is not the product. The product is a business process with KPIs.",
        "Below are non-overlapping clusters: each URL owns its head term.",
      ],
    },
  },
  {
    category: "integrations",
    contentKey: "hubIntegrations",
    coverImage: DIAGRAM_IMAGES.crm,
    children: [
      { href: "/integrations/amocrm-ai", labelRu: "AI для amoCRM", labelEn: "AI for amoCRM", blurbRu: "AI-слой и автоматизация воронки", blurbEn: "AI layer and pipeline automation" },
      { href: "/integrations/bitrix24-ai", labelRu: "AI для Bitrix24", labelEn: "AI for Bitrix24", blurbRu: "AI-слой, боты и документы", blurbEn: "AI layer, bots and documents" },
      { href: "/integrations/1c-ai-layer", labelRu: "AI для 1С", labelEn: "AI for 1C", blurbRu: "AI-слой поверх учёта", blurbEn: "AI layer on top of ERP" },
      { href: "/integrations/crm", labelRu: "CRM", labelEn: "CRM", blurbRu: "Внедрение и синхронизация", blurbEn: "Implementation and sync" },
      { href: "/integrations/amocrm", labelRu: "amoCRM", labelEn: "amoCRM", blurbRu: "Воронки, виджеты, API", blurbEn: "Pipelines, widgets, API" },
      { href: "/integrations/bitrix24", labelRu: "Bitrix24", labelEn: "Bitrix24", blurbRu: "Боты, задачи, линии", blurbEn: "Bots, tasks, open lines" },
      { href: "/integrations/1c", labelRu: "1С ↔ CRM", labelEn: "1C ↔ CRM", blurbRu: "Двусторонняя синхронизация", blurbEn: "Bidirectional sync" },
      { href: "/integrations/n8n-automation", labelRu: "n8n workflow", labelEn: "n8n workflows", blurbRu: "Сценарии без vendor lock-in", blurbEn: "Workflows without vendor lock-in" },
    ],
    ru: {
      metaTitle: "Интеграции CRM, 1С, Bitrix24, amoCRM | Bober AI",
      metaDescription:
        "Интеграции и AI-слои для amoCRM, Bitrix24 и 1С. Отдельные кластеры: AI для CRM и синхронизация данных.",
      h1: "Интеграции для бизнеса",
      subtitle: "Связываем CRM, учёт, сайт и мессенджеры — AI-кластеры отдельно от «просто синхронизации».",
      intro: [
        "Интеграция — часто самый быстрый ROI: убрать ручной мост между системами.",
        "AI для amoCRM / Bitrix24 / 1С — отдельные кластеры; страницы синхронизации не конкурируют с ними по H1.",
      ],
    },
    en: {
      metaTitle: "CRM, 1C, Bitrix24, amoCRM integrations | Bober AI",
      metaDescription:
        "Integrations and AI layers for amoCRM, Bitrix24 and 1C. Separate clusters: AI for CRM vs data sync.",
      h1: "Business integrations",
      subtitle: "Connect CRM, ledger, website and messengers — AI clusters stay separate from plain sync pages.",
      intro: [
        "Integration is often the fastest ROI: remove the manual bridge between systems.",
        "AI for amoCRM / Bitrix24 / 1C are separate clusters; sync pages do not reuse those H1s.",
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
      { href: "/services/rag", labelRu: "Корпоративный RAG", labelEn: "Corporate RAG", blurbRu: "Внедрение RAG с цитатами", blurbEn: "RAG delivery with citations" },
      { href: "/solutions/rag-search", labelRu: "RAG-поиск", labelEn: "RAG search", blurbRu: "Сценарий поиска по документам", blurbEn: "Document search scenario" },
      { href: "/solutions/knowledge-base", labelRu: "Создание базы знаний", labelEn: "Build a knowledge base", blurbRu: "Сценарий KB", blurbEn: "KB scenario" },
      { href: "/solutions/assistant", labelRu: "Ассистент", labelEn: "Assistant", blurbRu: "Корпоративный бот", blurbEn: "Corporate bot" },
      { href: "/solutions/ocr-pipeline", labelRu: "OCR-конвейер", labelEn: "OCR pipeline", blurbRu: "Сценарий извлечения данных", blurbEn: "Data extraction scenario" },
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

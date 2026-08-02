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
        href: "/automation/sales",
        labelRu: "Автоматизация отдела продаж",
        labelEn: "Sales team automation",
        blurbRu: "Заявка → CRM → КП → follow-up.",
        blurbEn: "Lead → CRM → proposal → follow-up.",
      },
      {
        href: "/integrations/bitrix24-sales-automation",
        labelRu: "Продажи в Битрикс24",
        labelEn: "Bitrix24 sales",
        blurbRu: "Автоматизация воронки Bitrix24 с ИИ.",
        blurbEn: "Bitrix24 pipeline automation with AI.",
      },
      {
        href: "/integrations/bitrix24-ai",
        labelRu: "Внедрение ИИ в Битрикс24",
        labelEn: "AI in Bitrix24",
        blurbRu: "AI-слой поверх Bitrix24: сделки, документы, задачи.",
        blurbEn: "AI layer on Bitrix24: deals, documents, tasks.",
      },
      {
        href: "/integrations/amocrm-automation",
        labelRu: "Автоматизация amoCRM",
        labelEn: "amoCRM automation",
        blurbRu: "Роботы, заявки и follow-up.",
        blurbEn: "Robots, intake and follow-up.",
      },
      {
        href: "/integrations/1c-ai-layer",
        labelRu: "AI для 1С",
        labelEn: "AI for 1C",
        blurbRu: "AI-слой поверх 1С: документы, остатки, статусы.",
        blurbEn: "AI layer on 1C: documents, stock, statuses.",
      },
      {
        href: "/solutions/knowledge-base",
        labelRu: "Корпоративная база знаний с ИИ",
        labelEn: "Corporate knowledge base with AI",
        blurbRu: "Ответы по регламентам с цитатами.",
        blurbEn: "Policy answers with citations.",
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
        labelRu: "ИИ для отдела продаж",
        labelEn: "AI for the sales team",
        blurbRu: "Квалификация лидов, follow-up и помощник менеджера.",
        blurbEn: "Lead qualification, follow-up and sales assistant.",
      },
      {
        href: "/services/self-hosted-ai",
        labelRu: "Приватный AI / локальная нейросеть",
        labelEn: "Private AI / on-prem LLM",
        blurbRu: "Контур без утечки данных.",
        blurbEn: "Private contour without data leakage.",
      },
    ],
    ru: {
      metaTitle: "Автоматизация бизнес-процессов — каталог решений | Bober AI",
      metaDescription:
        "Автоматизация компании, КП, документооборота, Bitrix24, amoCRM, 1С, внедрение ИИ, OCR и AI для продаж. Фиксированная смета.",
      h1: "Автоматизация бизнес-процессов",
      subtitle:
        "Компания, документы, CRM/1С, внедрение ИИ, RAG, OCR, продажи — план, смета и production.",
      intro: [
        "AI не является продуктом. Продукт — автоматизация бизнес-процесса с KPI.",
        "Клиенты ищут внедрение и автоматизацию конкретного процесса — не абстрактный консалтинг.",
      ],
    },
    en: {
      metaTitle: "Business process automation — solutions catalog | Bober AI",
      metaDescription:
        "Company automation, proposals, documents, Bitrix24, amoCRM, 1C, AI implementation, OCR and AI for sales. Fixed estimate.",
      h1: "Business process automation",
      subtitle:
        "Directions with commercial search demand: company, documents, CRM/1C, AI implementation, RAG, OCR, sales — plan, estimate and production.",
      intro: [
        "AI is not the product. The product is a business process with KPIs.",
        "Buyers look for implementation and process automation — not abstract consulting.",
      ],
    },
  },
  {
    category: "integrations",
    contentKey: "hubIntegrations",
    coverImage: DIAGRAM_IMAGES.crm,
    children: [
      {
        href: "/integrations/bitrix24-sales-automation",
        labelRu: "Автоматизация продаж в Битрикс24",
        labelEn: "Bitrix24 sales automation",
        blurbRu: "Заявка → квалификация → КП → follow-up",
        blurbEn: "Lead → qualification → proposal → follow-up",
      },
      {
        href: "/integrations/bitrix24-ai",
        labelRu: "Внедрение ИИ в Битрикс24",
        labelEn: "AI in Bitrix24",
        blurbRu: "AI-слой: сделки, документы, линии",
        blurbEn: "AI layer: deals, documents, lines",
      },
      {
        href: "/integrations/bitrix24-1c",
        labelRu: "Интеграция Битрикс24 с 1С",
        labelEn: "Bitrix24 ↔ 1C",
        blurbRu: "Сделки, заказы, оплаты без копипаста",
        blurbEn: "Deals, orders, payments without copy-paste",
      },
      {
        href: "/integrations/amocrm-automation",
        labelRu: "Автоматизация amoCRM",
        labelEn: "amoCRM automation",
        blurbRu: "Воронка, заявки, роботы",
        blurbEn: "Pipeline, intake, robots",
      },
      {
        href: "/integrations/amocrm-1c",
        labelRu: "Интеграция amoCRM с 1С",
        labelEn: "amoCRM ↔ 1C",
        blurbRu: "Заказы и оплаты в одном контуре",
        blurbEn: "Orders and payments in one loop",
      },
      { href: "/integrations/amocrm-ai", labelRu: "AI для amoCRM", labelEn: "AI for amoCRM", blurbRu: "AI-слой и автоматизация воронки", blurbEn: "AI layer and pipeline automation" },
      { href: "/integrations/1c-ai-layer", labelRu: "AI для 1С", labelEn: "AI for 1C", blurbRu: "AI-слой поверх учёта", blurbEn: "AI layer on top of ERP" },
      { href: "/integrations/crm-sales-automation", labelRu: "Продажи в CRM", labelEn: "CRM sales", blurbRu: "Follow-up и КП", blurbEn: "Follow-up and proposals" },
      { href: "/integrations/crm-1c-automation", labelRu: "1С и CRM", labelEn: "1C and CRM", blurbRu: "Обмен без копипаста", blurbEn: "Sync without copy-paste" },
      { href: "/integrations/crm", labelRu: "CRM", labelEn: "CRM", blurbRu: "Внедрение и синхронизация", blurbEn: "Implementation and sync" },
      { href: "/integrations/amocrm", labelRu: "amoCRM", labelEn: "amoCRM", blurbRu: "Воронки, виджеты, API", blurbEn: "Pipelines, widgets, API" },
      { href: "/integrations/bitrix24", labelRu: "Bitrix24", labelEn: "Bitrix24", blurbRu: "Боты, задачи, линии", blurbEn: "Bots, tasks, open lines" },
      { href: "/integrations/1c", labelRu: "1С ↔ CRM", labelEn: "1C ↔ CRM", blurbRu: "Двусторонняя синхронизация", blurbEn: "Bidirectional sync" },
      { href: "/integrations/n8n-automation", labelRu: "n8n workflow", labelEn: "n8n workflows", blurbRu: "Сценарии без vendor lock-in", blurbEn: "Workflows without vendor lock-in" },
    ],
    ru: {
      metaTitle: "Интеграции CRM, 1С, Bitrix24, amoCRM | Bober AI",
      metaDescription:
        "Интеграции и AI-слои для amoCRM, Bitrix24 и 1С. AI для CRM и синхронизация данных.",
      h1: "Интеграции для бизнеса",
      subtitle: "Связываем CRM, учёт, сайт и мессенджеры — AI-слой и синхронизация данных как отдельные сценарии.",
      intro: [
        "Интеграция — часто самый быстрый ROI: убрать ручной мост между системами.",
        "AI для amoCRM / Bitrix24 / 1С — отдельные направления; синхронизация данных — отдельный сценарий.",
      ],
    },
    en: {
      metaTitle: "CRM, 1C, Bitrix24, amoCRM integrations | Bober AI",
      metaDescription:
        "Integrations and AI layers for amoCRM, Bitrix24 and 1C. AI for CRM and data sync as separate scenarios.",
      h1: "Business integrations",
      subtitle: "Connect CRM, ledger, website and messengers — AI layer and data sync as distinct scenarios.",
      intro: [
        "Integration is often the fastest ROI: remove the manual bridge between systems.",
        "AI for amoCRM / Bitrix24 / 1C are separate directions; data sync is its own scenario.",
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
      subtitle: "Одинаковые технологии — разные процессы. Входные страницы по отраслям.",
      intro: [
        "Отраслевая страница помогает понять ваш контекст быстрее, чем общий «AI для бизнеса».",
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
      { href: "/solutions/knowledge-chatbot", labelRu: "Чат-бот по базе знаний", labelEn: "Knowledge chatbot", blurbRu: "Ответы со ссылкой на регламент", blurbEn: "Answers with policy citations" },
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
      { href: "/ai/ai-implementation", labelRu: "Компания по внедрению ИИ", labelEn: "AI implementation company", blurbRu: "Стоимость, сроки, под ключ", blurbEn: "Price, timeline, turnkey" },
      { href: "/ai/corporate", labelRu: "Корпоративный ИИ", labelEn: "Enterprise AI", blurbRu: "Стратегия и контур", blurbEn: "Strategy and contour" },
      { href: "/ai/corporate-neural-net", labelRu: "Корпоративная нейросеть", labelEn: "Corporate neural net", blurbRu: "Закрытый контур", blurbEn: "Private contour" },
      { href: "/ai/private-llm", labelRu: "Приватный LLM", labelEn: "Private LLM", blurbRu: "On-prem и контур", blurbEn: "On-prem and private" },
      { href: "/ai/ai-audit", labelRu: "AI-аудит", labelEn: "AI audit", blurbRu: "Дорожная карта", blurbEn: "Roadmap" },
      { href: "/ai/ai-agents", labelRu: "AI-агенты", labelEn: "AI agents", blurbRu: "Агенты в процессах", blurbEn: "Agents in processes" },
    ],
    ru: {
      metaTitle: "Компания по внедрению ИИ | Bober AI Systems",
      metaDescription: "Компания по внедрению ИИ: стоимость, сроки, под ключ. Корпоративная нейросеть, приватный LLM, AI-аудит. Москва.",
      h1: "Корпоративный ИИ",
      subtitle: "Компания по внедрению ИИ с фиксированной стоимостью и сроками — production в CRM и 1С, не консалтинг ради слайдов.",
      intro: [
        "Клиент ищет исполнителя и бюджет: кто внедрит ИИ, сколько стоит, какие сроки.",
        "Ниже — входные страницы: от сметы до приватного LLM и агентов.",
      ],
    },
    en: {
      metaTitle: "Enterprise AI implementation | Bober AI Systems",
      metaDescription: "AI implementation, corporate neural net, private LLM, AI audit and agents. Fixed estimate.",
      h1: "Enterprise AI",
      subtitle: "We implement AI where it speeds a process and pays back — not abstract consulting.",
      intro: [
        "“Implement AI” beats “AI consulting”: buyers want a working contour.",
        "Below: entry pages from audit to private LLM and agents.",
      ],
    },
  },
];

export function getHub(category: string) {
  return SEO_HUBS.find((hub) => hub.category === category);
}

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
  /** YML offer URL path (SEO landing). Defaults to `/services/{slug}`. */
  feedPath?: string;
  /**
   * When false, offer is feed-only (Wordstat niche) — no `/services/{slug}` page.
   * Default true.
   */
  inServicesCatalog?: boolean;
};

const IMAGES: Record<string, string> = {
  "enterprise-ai-assistant": "/stock/enterprise-ai-assistant.jpg",
  "ai-discovery-roadmap": "/stock/ai-discovery-roadmap.jpg",
  "private-llm-gigachat": "/stock/private-llm.jpg",
  "business-process-automation": "/stock/business-process-automation.jpg",
  "sales-ai-agent": "/stock/sales-ai-agent.jpg",
  "ai-automation": "/stock/automation-code.jpg",
  rag: "/stock/rag-search.jpg",
  "llm-development": "/stock/automation-code.jpg",
  n8n: "/stock/automation-code.jpg",
  "ai-agent": "/stock/team-collab.jpg",
  "document-processing": "/stock/document-processing.jpg",
  "voice-ai": "/stock/team-collab.jpg",
  ocr: "/stock/document-processing.jpg",
  "open-webui": "/stock/cyber-padlock.jpg",
  "self-hosted-ai": "/stock/private-llm.jpg",
  mcp: "/stock/automation-code.jpg",
  langgraph: "/stock/automation-code.jpg",
  "knowledge-base": "/stock/rag-search.jpg",
  "ai-consulting": "/stock/ai-discovery-roadmap.jpg",
  "crm-integration": "/stock/crm-integration.jpg",
  bitrix: "/stock/crm-integration.jpg",
  "ai-sales-loop": "/stock/crm-integration.jpg",
  "ai-meeting-crm": "/stock/offers/ai-meeting-crm.jpg",
  "corporate-ai-agent-1c-crm": "/stock/offers/ai-agent.jpg",
  "ai-inbound-calls": "/stock/offers/voice-ai.jpg",
  "crm-quote-offers": "/stock/offers/sales-ai-agent.jpg",
  "claude-smb": "/stock/enterprise-ai-assistant.jpg",
  "ii-dlya-biznesa": "/stock/enterprise-ai-assistant.jpg",
  automation: "/stock/business-process-automation.jpg",
  "company-automation": "/stock/business-process-automation.jpg",
  "crm-automation": "/stock/crm-integration.jpg",
  "document-ai": "/stock/document-processing.jpg",
  "ai-for-crm": "/stock/crm-integration.jpg",
  "corporate-ai-assistant": "/stock/enterprise-ai-assistant.jpg",
  "business-process-audit": "/stock/ai-discovery-roadmap.jpg",
  "wildberries-independent-sales-channel": "/cases/wildberries-independent-sales-channel.jpg",
  "secure-private-ai-cloud": "/stock/private-llm.jpg",
};

const ruExtra: EnterpriseService[] = [
  { id: "ai-automation", slug: "ai-automation", title: "AI-автоматизация", description: "Системы AI для автоматизации операций — от аудита до production.", about: "Проектируем и внедряем AI-автоматизацию с интеграциями CRM, документов и workflow.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES["ai-automation"] },
  { id: "rag", slug: "rag", title: "RAG для бизнеса", description: "Поиск по документам и ответы LLM со ссылкой на источник.", about: "Индексация, векторный поиск, guardrails и интеграция в чат/CRM.", salesNotes: "от 500 000 ₽", deliveryDays: 21, price: 500000, serviceImage: IMAGES.rag, feedPath: "/solutions/rag-search" },
  { id: "llm-development", slug: "llm-development", title: "Разработка LLM-решений", description: "Кастомные LLM-приложения, API, промпт-инженерия и production-деплой.", about: "Архитектура, разработка, тестирование и передача команде.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES["llm-development"] },
  { id: "n8n", slug: "n8n", title: "Автоматизация на n8n", description: "n8n-воркфлоу с AI-слоем и интеграциями CRM, мессенджеров, API.", about: "Проектируем, разворачиваем и сопровождаем n8n в production.", salesNotes: "от 300 000 ₽", deliveryDays: 14, price: 300000, serviceImage: IMAGES.n8n },
  { id: "ai-agent", slug: "ai-agent", title: "AI-агенты для бизнеса", description: "Агенты с действиями: CRM, документы, workflow, эскалация к человеку.", about: "Многошаговые агенты с инструментами, мониторингом и handover.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES["ai-agent"] },
  { id: "document-processing", slug: "document-processing", title: "Автоматизация документооборота", description: "OCR, согласования, извлечение данных — в CRM/ERP без ручного ввода.", about: "Пайплайны документов, workflow и интеграции с учётными системами.", salesNotes: "от 500 000 ₽", deliveryDays: 21, price: 500000, serviceImage: IMAGES["document-processing"], feedPath: "/automation/documents" },
  { id: "voice-ai", slug: "voice-ai", title: "Голосовой AI", description: "Speech-to-text, голосовые боты, логирование звонков в CRM.", about: "Голосовые сценарии для поддержки и продаж с интеграцией в CRM.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES["voice-ai"] },
  { id: "ocr", slug: "ocr", title: "OCR и распознавание", description: "Извлечение текста и полей из PDF, сканов и фото.", about: "OCR-пайплайны с валидацией и выгрузкой в 1С, CRM или ERP.", salesNotes: "от 300 000 ₽", deliveryDays: 14, price: 300000, serviceImage: IMAGES.ocr },
  { id: "open-webui", slug: "open-webui", title: "Open WebUI", description: "Корпоративный чат с LLM, SSO и политиками доступа.", about: "Развёртывание Open WebUI, подключение моделей и guardrails.", salesNotes: "от 500 000 ₽", deliveryDays: 21, price: 500000, serviceImage: IMAGES["open-webui"] },
  { id: "self-hosted-ai", slug: "self-hosted-ai", title: "Self-hosted AI", description: "Приватный AI-стек в вашем контуре — без утечки данных.", about: "On-prem LLM, API, мониторинг и интеграции под NDA.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES["self-hosted-ai"] },
  { id: "mcp", slug: "mcp", title: "MCP-интеграции", description: "Model Context Protocol — подключение LLM к CRM, БД и API.", about: "MCP-серверы для внутренних систем и инструментов агентов.", salesNotes: "от 500 000 ₽", deliveryDays: 21, price: 500000, serviceImage: IMAGES.mcp },
  { id: "langgraph", slug: "langgraph", title: "LangGraph-агенты", description: "Многошаговые агенты со state, HITL и observability.", about: "LangGraph для сложных сценариев с контролем и аудитом.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES.langgraph },
  { id: "knowledge-base", slug: "knowledge-base", title: "Корпоративная база знаний", description: "Единое место для регламентов, FAQ и AI-ответов со ссылками.", about: "База знаний, поиск, чат-бот для сотрудников и клиентов.", salesNotes: "от 500 000 ₽", deliveryDays: 21, price: 500000, serviceImage: IMAGES["knowledge-base"] },
  { id: "ai-consulting", slug: "ai-consulting", title: "AI-консалтинг", description: "Стратегия, ROI, выбор технологий и дорожная карта внедрения.", about: "Аудит, рекомендации и план до закупки разработки.", salesNotes: "от 150 000 ₽", deliveryDays: 10, price: 150000, serviceImage: IMAGES["ai-consulting"] },
  { id: "crm-integration", slug: "crm-integration", title: "Bitrix24 · amoCRM", description: "Внедрение и автоматизация CRM: Bitrix24 (AI-слой поверх BitrixGPT) и amoCRM — 1С, телефония, документы, воронки; портал и интеграции остаются у вас.", about: "Двусторонние интеграции, webhooks, retry и мониторинг.", salesNotes: "от 500 000 ₽", deliveryDays: 21, price: 500000, serviceImage: IMAGES["crm-integration"] },
  {
    id: "bitrix",
    slug: "bitrix",
    title: "Настройка Bitrix24",
    description:
      "Внедрение Битрикс24 с AI: портал, автоматизация, 1С, телефония, документы, MCP и AI-контур продаж поверх BitrixGPT.",
    about:
      "Пилот на одном процессе: воронка, REST/webhooks, интеграции и AI-слой. Партнёр 1С-Битрикс · ID 28909898.",
    salesNotes: "от 300 000 ₽",
    deliveryDays: 21,
    price: 300000,
    serviceImage: IMAGES.bitrix,
    feedPath: "/bitrix",
    inServicesCatalog: false,
  },
  { id: "ai-sales-loop", slug: "ai-sales-loop", title: "AI-контур отдела продаж", description: "Телефония, переписки, CRM и автоматические следующие действия — один продукт, не отдельные боты.", about: "Интеграция Bitrix24 / amoCRM с телефонией и AI — квалификация лидов, саммари звонков, задачи, follow-up и отчёт об упущенных сделках.", salesNotes: "от 300 000 ₽", deliveryDays: 21, price: 300000, serviceImage: IMAGES["ai-sales-loop"] },
  {
    id: "ai-meeting-crm",
    slug: "ai-meeting-crm",
    title: "AI Meeting-to-CRM",
    description:
      "Встреча → решения → задачи → CRM → документы → контроль срока. Не «саммари ради саммари» — исполнение после созвона.",
    about:
      "Транскрипт из Yandex Telemost / Yandex 360, MTS Link, SaluteJazz или IVA360 → договорённости, ответственные, сроки → Bitrix24/amoCRM, задачи и follow-up с human-in-the-loop.",
    salesNotes: "от 300 000 ₽",
    deliveryDays: 21,
    price: 300000,
    serviceImage: IMAGES["ai-meeting-crm"],
  },
  {
    id: "corporate-ai-agent-1c-crm",
    slug: "corporate-ai-agent-1c-crm",
    title: "Интеграция корпоративного AI-агента с 1С и CRM",
    description:
      "Не «агент из коробки» — внедрение в ваш ландшафт: CRM, 1С, роли, процессы, исключения, безопасность и KPI.",
    about:
      "Карта процессов и прав, фирменные skills и конекторы к нестандартным системам, тесты качества и безопасности, HITL, связка с 1С/legacy; сравнение Yandex AI Studio с private/on-prem.",
    salesNotes: "от 500 000 ₽",
    deliveryDays: 28,
    price: 500000,
    serviceImage: IMAGES["corporate-ai-agent-1c-crm"],
  },
  {
    id: "ai-inbound-calls",
    slug: "ai-inbound-calls",
    title: "AI для входящих звонков и колл-центра",
    description:
      "Приём звонков, STT в реальном времени, намерение, ответы на типовые вопросы, перевод на оператора, история и аналитика.",
    about:
      "Пилот: один сценарий и одна линия — не полная замена колл-центра сразу. SpeechKit/SpeechSense, телефония, LLM, CRM, containment и handoff.",
    salesNotes: "от 500 000 ₽",
    deliveryDays: 28,
    price: 500000,
    serviceImage: IMAGES["ai-inbound-calls"],
  },
  {
    id: "crm-quote-offers",
    slug: "crm-quote-offers",
    title: "Автоматизация смет и КП в CRM",
    description:
      "Аудит, ремонт или пересборка контура: смета → коммерческое предложение → отправка клиенту (email/Telegram). CRM любая — Megaplan, Bitrix24, amoCRM и др.",
    about:
      "Восстановление сломанной автоматизации или новый контур: прайс/Sheets, шаблоны КП, лендинг/PDF, доставка. Дальше — развитие, гарантия и сопровождение. Кейсы: KP-LLM, ELIA Suite.",
    salesNotes: "от 300 000 ₽",
    deliveryDays: 21,
    price: 300000,
    serviceImage: IMAGES["crm-quote-offers"],
  },
  {
    id: "claude-smb",
    slug: "claude-smb",
    title: "Claude AI для малого и среднего бизнеса",
    description: "Внедрение Claude AI, Claude API, Claude Code и Claude MCP в процессы МСБ — CRM, документы, продажи, поддержка.",
    about: "Claude API и MCP в CRM, документы, продажи и базу знаний — не подписка Claude Pro. Фиксированная смета, NDA, Россия и СНГ.",
    salesNotes: "от 300 000 ₽",
    deliveryDays: 21,
    price: 300000,
    serviceImage: IMAGES["claude-smb"],
    feedPath: "/claude",
    inServicesCatalog: false,
  },
  {
    id: "ii-dlya-biznesa",
    slug: "ii-dlya-biznesa",
    title: "ИИ для бизнеса — аудит, разработка и внедрение",
    description:
      "ИИ для бизнеса под ключ: аудит процессов, пилот с KPI и production-внедрение в CRM, документы, базу знаний и продажи.",
    about:
      "Гибрид коммерческого лендинга и гида: сценарии, ассистент vs агент, архитектура (Yandex Cloud / Selectel / on-prem), безопасность, кейсы. Фиксированная смета, NDA.",
    salesNotes: "от 150 000 ₽",
    deliveryDays: 28,
    price: 150000,
    serviceImage: IMAGES["ii-dlya-biznesa"],
    feedPath: "/ii-dlya-biznesa",
    inServicesCatalog: false,
  },
  {
    id: "automation",
    slug: "automation",
    title: "Автоматизация бизнес-процессов",
    description:
      "Каталог направлений и внедрение: КП, документы, CRM/1С, OCR, RAG, продажи. Аудит, пилот и production с фиксированной сметой.",
    about:
      "Pillar /automation: Wordstat-направления + коммерческий оффер. AI только там, где снимает ручной труд. NDA, on-prem, Россия и СНГ.",
    salesNotes: "от 150 000 ₽",
    deliveryDays: 21,
    price: 150000,
    serviceImage: IMAGES.automation,
    feedPath: "/automation",
    inServicesCatalog: false,
  },
  {
    id: "wildberries-independent-sales-channel",
    slug: "wildberries-independent-sales-channel",
    title: "Независимый канал продаж для продавцов Wildberries",
    description:
      "Собственный магазин/каталог, CRM и автоматизация заказов параллельно с Wildberries — база клиентов остаётся у вас.",
    about:
      "Запуск собственного канала продаж параллельно с Wildberries: витрина, Bitrix24/amoCRM, 1С/МойСклад, оплата, доставка, Telegram/VK/email, AI-ассистент по товарам, синхронизация цен и остатков. Срок от 14 дней.",
    salesNotes: "от 300 000 ₽",
    deliveryDays: 14,
    price: 300000,
    serviceImage: IMAGES["wildberries-independent-sales-channel"],
  },
  {
    id: "secure-private-ai-cloud",
    slug: "secure-private-ai-cloud",
    title: "Защищенная AI-инфраструктура на базе российских облаков и решений Kaspersky",
    description:
      "Приватный AI (RAG, ассистент, модели) + Yandex Cloud / Selectel / Cloud.ru + защита Kaspersky для VM, серверов и контейнеров.",
    about:
      "Контур: слой AI (private LLM, RAG, база знаний, Bitrix24/1С), инфраструктура (российское облако, VPN, IAM, backup, логи) и Kaspersky (VM, Linux/Windows, контейнеры, Security Center). Внедрение, мониторинг, отчёт, реакция на события. Лицензии Kaspersky — через авторизованную дистрибуцию.",
    salesNotes: "от 800 000 ₽",
    deliveryDays: 28,
    price: 800000,
    serviceImage: IMAGES["secure-private-ai-cloud"],
  },
  // Wordstat niche offers (exact titles) → SEO landings; feed-only (no thin /services pages).
  { id: "company-automation", slug: "company-automation", title: "Автоматизация компании", description: "Процессы, CRM, документы и отчёты без ручного копирования — фиксированная смета и ROI.", about: "Аудит узкого места, workflow и интеграции, production-запуск и обучение команды.", salesNotes: "от 500 000 ₽", deliveryDays: 21, price: 500000, serviceImage: IMAGES["company-automation"], feedPath: "/automation/company-automation", inServicesCatalog: false },
  { id: "crm-automation", slug: "crm-automation", title: "Автоматизация CRM", description: "Стадии, роботы, заявки с сайта и мессенджеров, отчёты без ручного ввода.", about: "Автоматизация воронки CRM — триггеры, задачи, уведомления и контроль конверсии.", salesNotes: "от 500 000 ₽", deliveryDays: 21, price: 500000, serviceImage: IMAGES["crm-automation"], feedPath: "/integrations/crm-automation", inServicesCatalog: false },
  { id: "document-ai", slug: "document-ai", title: "ИИ для обработки документов", description: "Извлечение полей, классификация, маршруты в CRM/1С — меньше ручного ввода.", about: "ИИ-пайплайн документов — OCR, классификация, валидация и выгрузка в учётные системы.", salesNotes: "от 500 000 ₽", deliveryDays: 21, price: 500000, serviceImage: IMAGES["document-ai"], feedPath: "/automation/document-ai", inServicesCatalog: false },
  { id: "ai-for-crm", slug: "ai-for-crm", title: "ИИ для CRM", description: "Ассистент в карточке сделки, квалификация лидов, черновики писем и КП.", about: "ИИ-слой поверх CRM — саммари, скоринг, follow-up без хаоса в воронке.", salesNotes: "от 300 000 ₽", deliveryDays: 21, price: 300000, serviceImage: IMAGES["ai-for-crm"], feedPath: "/integrations/ai-for-crm", inServicesCatalog: false },
  { id: "corporate-ai-assistant", slug: "corporate-ai-assistant", title: "Корпоративный ИИ-ассистент", description: "Корпоративная нейросеть и ассистент в закрытом контуре — без утечки данных.", about: "Приватный LLM-контур, политики доступа, интеграции с внутренними системами.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES["corporate-ai-assistant"], feedPath: "/ai/corporate-neural-net", inServicesCatalog: false },
  { id: "business-process-audit", slug: "business-process-audit", title: "Аудит бизнес-процессов", description: "Карта потерь, приоритеты и смета пилота — до закупки разработки.", about: "Аудит процессов, ROI, дорожная карта на 90 дней и критерии приёмки пилота.", salesNotes: "от 150 000 ₽", deliveryDays: 10, price: 150000, serviceImage: IMAGES["business-process-audit"], feedPath: "/automation/business-process-audit", inServicesCatalog: false },
];

const enExtra: EnterpriseService[] = [
  { id: "ai-automation", slug: "ai-automation", title: "AI automation", description: "AI systems for operations automation — from audit to production.", about: "Design and deploy AI automation with CRM, document and workflow integrations.", salesNotes: "from €5,000", deliveryDays: 28, price: 5000, serviceImage: IMAGES["ai-automation"] },
  { id: "rag", slug: "rag", title: "RAG for business", description: "Document search and LLM answers with source citations.", about: "Indexing, vector search, guardrails and chat/CRM integration.", salesNotes: "from €4,000", deliveryDays: 21, price: 4000, serviceImage: IMAGES.rag, feedPath: "/solutions/rag-search" },
  { id: "llm-development", slug: "llm-development", title: "LLM development", description: "Custom LLM apps, APIs, prompt engineering and production deploy.", about: "Architecture, development, testing and team handover.", salesNotes: "from €5,000", deliveryDays: 28, price: 5000, serviceImage: IMAGES["llm-development"] },
  { id: "n8n", slug: "n8n", title: "n8n automation", description: "n8n workflows with AI layer and CRM, messenger, API integrations.", about: "Design, deploy and support n8n in production.", salesNotes: "from €3,000", deliveryDays: 14, price: 3000, serviceImage: IMAGES.n8n },
  { id: "ai-agent", slug: "ai-agent", title: "AI agents for business", description: "Agents that act: CRM updates, documents, workflow, human escalation.", about: "Multi-step agents with tools, monitoring and handover.", salesNotes: "from €5,000", deliveryDays: 28, price: 5000, serviceImage: IMAGES["ai-agent"] },
  { id: "document-processing", slug: "document-processing", title: "Document workflow automation", description: "OCR, approvals, data extraction — into CRM/ERP without manual entry.", about: "Document pipelines, workflow and accounting system integrations.", salesNotes: "from €4,000", deliveryDays: 21, price: 4000, serviceImage: IMAGES["document-processing"], feedPath: "/automation/documents" },
  { id: "voice-ai", slug: "voice-ai", title: "Voice AI", description: "Speech-to-text, voice bots, call logging in CRM.", about: "Voice scenarios for support and sales with CRM integration.", salesNotes: "from €5,000", deliveryDays: 28, price: 5000, serviceImage: IMAGES["voice-ai"] },
  { id: "ocr", slug: "ocr", title: "OCR & recognition", description: "Text and field extraction from PDF, scans and photos.", about: "OCR pipelines with validation and export to 1C, CRM or ERP.", salesNotes: "from €3,000", deliveryDays: 14, price: 3000, serviceImage: IMAGES.ocr },
  { id: "open-webui", slug: "open-webui", title: "Open WebUI", description: "Corporate LLM chat with SSO and access policies.", about: "Open WebUI deployment, model connectors and guardrails.", salesNotes: "from €4,000", deliveryDays: 21, price: 4000, serviceImage: IMAGES["open-webui"] },
  { id: "self-hosted-ai", slug: "self-hosted-ai", title: "Self-hosted AI", description: "Private AI stack in your perimeter — no data leakage.", about: "On-prem LLM, API, monitoring and integrations under NDA.", salesNotes: "from €5,000", deliveryDays: 28, price: 5000, serviceImage: IMAGES["self-hosted-ai"] },
  { id: "mcp", slug: "mcp", title: "MCP integrations", description: "Model Context Protocol — connect LLMs to CRM, DB and APIs.", about: "MCP servers for internal systems and agent tools.", salesNotes: "from €4,000", deliveryDays: 21, price: 4000, serviceImage: IMAGES.mcp },
  { id: "langgraph", slug: "langgraph", title: "LangGraph agents", description: "Multi-step agents with state, HITL and observability.", about: "LangGraph for complex scenarios with control and audit.", salesNotes: "from €5,000", deliveryDays: 28, price: 5000, serviceImage: IMAGES.langgraph },
  { id: "knowledge-base", slug: "knowledge-base", title: "Corporate knowledge base", description: "One place for policies, FAQ and AI answers with citations.", about: "Knowledge base, search, employee and client chatbot.", salesNotes: "from €4,000", deliveryDays: 21, price: 4000, serviceImage: IMAGES["knowledge-base"] },
  { id: "ai-consulting", slug: "ai-consulting", title: "AI consulting", description: "Strategy, ROI, technology selection and implementation roadmap.", about: "Audit, recommendations and plan before procurement.", salesNotes: "from €1,500", deliveryDays: 10, price: 1500, serviceImage: IMAGES["ai-consulting"] },
  { id: "crm-integration", slug: "crm-integration", title: "Bitrix24 · amoCRM", description: "CRM implementation and automation: Bitrix24 (AI layer on BitrixGPT) and amoCRM — 1C, telephony, documents, pipelines; the portal and integrations stay with you.", about: "Bidirectional integrations, webhooks, retry and monitoring.", salesNotes: "from €4,000", deliveryDays: 21, price: 4000, serviceImage: IMAGES["crm-integration"] },
  { id: "ai-sales-loop", slug: "ai-sales-loop", title: "AI sales loop", description: "Telephony, chats, CRM and automatic next actions — one product, not separate bots.", about: "Bitrix24 / amoCRM with telephony and AI — lead qualification, call summaries, tasks, follow-up and lost-deal reports.", salesNotes: "from €3,000", deliveryDays: 21, price: 3000, serviceImage: IMAGES["ai-sales-loop"] },
  {
    id: "ai-meeting-crm",
    slug: "ai-meeting-crm",
    title: "AI Meeting-to-CRM",
    description:
      "Meeting → decisions → tasks → CRM → documents → deadline control. Not summary-for-summary — execution after the call.",
    about:
      "Transcript from Yandex Telemost / Yandex 360, MTS Link, SaluteJazz or IVA360 → agreements, owners, due dates → Bitrix24/amoCRM, tasks and follow-up with human-in-the-loop.",
    salesNotes: "from €3,000",
    deliveryDays: 21,
    price: 3000,
    serviceImage: IMAGES["ai-meeting-crm"],
  },
  {
    id: "corporate-ai-agent-1c-crm",
    slug: "corporate-ai-agent-1c-crm",
    title: "Corporate AI agent integration with 1C and CRM",
    description:
      "Not an off-the-shelf agent — deployment into your landscape: CRM, 1C, roles, processes, exceptions, security and KPIs.",
    about:
      "Process and access mapping, company skills and connectors to non-standard systems, quality/security tests, HITL, 1C/legacy glue; Yandex AI Studio vs private/on-prem comparison.",
    salesNotes: "from €5,000",
    deliveryDays: 28,
    price: 5000,
    serviceImage: IMAGES["corporate-ai-agent-1c-crm"],
  },
  {
    id: "ai-inbound-calls",
    slug: "ai-inbound-calls",
    title: "AI for inbound calls and call center",
    description:
      "Answer calls, real-time STT, intent, FAQ replies, warm transfer to an agent, history and analytics.",
    about:
      "Pilot: one scenario and one phone line — not a full call-center swap on day one. SpeechKit/SpeechSense, telephony, LLM, CRM, containment and handoff.",
    salesNotes: "from €5,000",
    deliveryDays: 28,
    price: 5000,
    serviceImage: IMAGES["ai-inbound-calls"],
  },
  {
    id: "crm-quote-offers",
    slug: "crm-quote-offers",
    title: "Quote and proposal automation in CRM",
    description:
      "Audit, repair or rebuild: estimate → commercial offer → send to client (email/Telegram). Any CRM — Megaplan, Bitrix24, amoCRM and others.",
    about:
      "Restore broken automation or build a new loop: price lists/Sheets, proposal templates, landing/PDF, delivery. Then development, warranty and support. Cases: KP-LLM, ELIA Suite.",
    salesNotes: "from €3,000",
    deliveryDays: 21,
    price: 3000,
    serviceImage: IMAGES["crm-quote-offers"],
  },
  {
    id: "claude-smb",
    slug: "claude-smb",
    title: "Claude AI for small and mid-size business",
    description: "Deploy Claude AI, Claude API, Claude Code and Claude MCP into SMB workflows — CRM, documents, sales, support.",
    about: "Claude API and MCP in CRM, documents, sales and knowledge bases — not Claude Pro subscriptions. Fixed estimate, NDA, Russia & CIS.",
    salesNotes: "from €3,000",
    deliveryDays: 21,
    price: 3000,
    serviceImage: IMAGES["claude-smb"],
    feedPath: "/claude",
    inServicesCatalog: false,
  },
  {
    id: "ii-dlya-biznesa",
    slug: "ii-dlya-biznesa",
    title: "AI for business — audit, development and deployment",
    description:
      "Turnkey AI for business: process audit, KPI pilot and production deployment into CRM, documents, knowledge base and sales.",
    about:
      "Hybrid commercial landing and guide: scenarios, assistant vs agent, architecture (Yandex Cloud / Selectel / on-prem), security, cases. Fixed estimate, NDA.",
    salesNotes: "from €1,500",
    deliveryDays: 28,
    price: 1500,
    serviceImage: IMAGES["ii-dlya-biznesa"],
    feedPath: "/ii-dlya-biznesa",
    inServicesCatalog: false,
  },
  {
    id: "automation",
    slug: "automation",
    title: "Business process automation",
    description:
      "Direction catalog and delivery: proposals, documents, CRM/ERP, OCR, RAG, sales. Audit, pilot and production with a fixed estimate.",
    about:
      "Pillar /automation: Wordstat directions + commercial offer. AI only where it removes manual work. NDA, on-prem, Russia & CIS.",
    salesNotes: "from €1,500",
    deliveryDays: 21,
    price: 1500,
    serviceImage: IMAGES.automation,
    feedPath: "/automation",
    inServicesCatalog: false,
  },
  {
    id: "wildberries-independent-sales-channel",
    slug: "wildberries-independent-sales-channel",
    title: "Independent sales channel for Wildberries sellers",
    description:
      "Your own store/catalog, CRM and order automation alongside Wildberries — the customer base stays yours.",
    about:
      "Launch an owned sales channel next to Wildberries: storefront, Bitrix24/amoCRM, 1C/MoySklad, payments, delivery, Telegram/VK/email, product AI assistant, price and stock sync. From 14 days.",
    salesNotes: "from €3,000",
    deliveryDays: 14,
    price: 3000,
    serviceImage: IMAGES["wildberries-independent-sales-channel"],
  },
  {
    id: "secure-private-ai-cloud",
    slug: "secure-private-ai-cloud",
    title: "Secure Private AI Cloud on Russian clouds + Kaspersky",
    description:
      "Private AI (RAG, assistant, models) + Yandex Cloud / Selectel / Cloud.ru + Kaspersky for VMs, servers and containers.",
    about:
      "Contour: AI layer (private LLM, RAG, knowledge base, Bitrix24/1C), infrastructure (RU cloud, VPN, IAM, backup, logs) and Kaspersky (VM, Linux/Windows, containers, Security Center). Deploy, monitoring, monthly report, incident response. Kaspersky licenses via authorized distribution.",
    salesNotes: "from €8,000",
    deliveryDays: 28,
    price: 8000,
    serviceImage: IMAGES["secure-private-ai-cloud"],
  },
  { id: "company-automation", slug: "company-automation", title: "Company automation", description: "Processes, CRM, documents and reports without manual copy-paste.", about: "Bottleneck audit, workflow and integrations, production launch and team training.", salesNotes: "from €5,000", deliveryDays: 21, price: 5000, serviceImage: IMAGES["company-automation"], feedPath: "/automation/company-automation", inServicesCatalog: false },
  { id: "crm-automation", slug: "crm-automation", title: "CRM automation", description: "Stages, robots, website and messenger intake, reports without manual entry.", about: "CRM pipeline automation — triggers, tasks, alerts and conversion control.", salesNotes: "from €4,000", deliveryDays: 21, price: 4000, serviceImage: IMAGES["crm-automation"], feedPath: "/integrations/crm-automation", inServicesCatalog: false },
  { id: "document-ai", slug: "document-ai", title: "AI for document processing", description: "Field extraction, classification, routes into CRM/ERP — less manual entry.", about: "AI document pipeline — OCR, classification, validation and export to accounting systems.", salesNotes: "from €4,000", deliveryDays: 21, price: 4000, serviceImage: IMAGES["document-ai"], feedPath: "/automation/document-ai", inServicesCatalog: false },
  { id: "ai-for-crm", slug: "ai-for-crm", title: "AI for CRM", description: "In-deal assistant, lead scoring, email and proposal drafts.", about: "AI layer on CRM — summaries, scoring, follow-up without pipeline chaos.", salesNotes: "from €3,000", deliveryDays: 21, price: 3000, serviceImage: IMAGES["ai-for-crm"], feedPath: "/integrations/ai-for-crm", inServicesCatalog: false },
  { id: "corporate-ai-assistant", slug: "corporate-ai-assistant", title: "Corporate AI assistant", description: "Corporate neural net and assistant in a private contour — no data leakage.", about: "Private LLM contour, access policies, integrations with internal systems.", salesNotes: "from €5,000", deliveryDays: 28, price: 5000, serviceImage: IMAGES["corporate-ai-assistant"], feedPath: "/ai/corporate-neural-net", inServicesCatalog: false },
  { id: "business-process-audit", slug: "business-process-audit", title: "Business process audit", description: "Loss map, priorities and pilot estimate — before procurement.", about: "Process audit, ROI, 90-day roadmap and pilot acceptance criteria.", salesNotes: "from €1,500", deliveryDays: 10, price: 1500, serviceImage: IMAGES["business-process-audit"], feedPath: "/automation/business-process-audit", inServicesCatalog: false },
];

const ruServices: EnterpriseService[] = [
  {
    id: "business-process-automation",
    slug: "business-process-automation",
    title: "Автоматизация бизнес-процессов",
    description: "Аудит, интеграции CRM/1С, workflow — цепочки задач без ручной рутины.",
    about: "Аудит процессов, настройка автоматизации, интеграция с CRM и документами, обучение команды.",
    salesNotes: "от 500 000 ₽",
    deliveryDays: 21,
    price: 500000,
    serviceImage: IMAGES["business-process-automation"],
  },
  {
    id: "sales-ai-agent",
    slug: "sales-ai-agent",
    title: "Автоматизация отдела продаж",
    description: "Лиды, CRM, коммерческие предложения, follow-up — PDF за минуты, не за часы.",
    about: "Настраиваем автоматизацию под шаблоны и CRM, тестируем и запускаем в отделе продаж.",
    salesNotes: "от 500 000 ₽",
    deliveryDays: 14,
    price: 500000,
    serviceImage: IMAGES["sales-ai-agent"],
  },
  {
    id: "ai-discovery-roadmap",
    slug: "ai-discovery-roadmap",
    title: "Аудит процессов и дорожная карта ИИ",
    description: "Разбираем процесс, считаем окупаемость, выбираем технологию, внедряем.",
    about:
      "Бизнес-аудит, карта процессов, расчёт окупаемости, дорожная карта и смета до старта разработки.",
    salesNotes: "от 150 000 ₽",
    deliveryDays: 10,
    price: 150000,
    serviceImage: IMAGES["ai-discovery-roadmap"],
  },
  {
    id: "enterprise-ai-assistant",
    slug: "enterprise-ai-assistant",
    title: "Внедрение ИИ под ключ",
    description: "Компания по внедрению ИИ: фиксированная стоимость, сроки, интеграция с CRM и 1С — production, не демо-чат.",
    about: "Смета и сроки до старта, LLM и агенты, интеграции CRM/1С, production-деплой и передача команде. Москва и удалённо.",
    salesNotes: "стоимость внедрения ИИ — от 500 000 ₽",
    deliveryDays: 28,
    price: 500000,
    serviceImage: IMAGES["enterprise-ai-assistant"],
    feedPath: "/ai/ai-implementation",
  },
  {
    id: "private-llm-gigachat",
    slug: "private-llm-gigachat",
    title: "Приватный контур языковых моделей",
    description:
      "GigaChat, свой сервер и изолированное облако — без утечки данных во внешние сервисы.",
    about:
      "Разворачиваем языковые модели в вашем контуре, настраиваем интерфейс, ограничения безопасности, мониторинг и интеграции.",
    salesNotes: "от 500 000 ₽",
    deliveryDays: 28,
    price: 500000,
    serviceImage: IMAGES["private-llm-gigachat"],
  },
  ...ruExtra,
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
    title: "AI implementation for business",
    description: "LLM, agents, CRM integrations — production, not a ChatGPT pilot.",
    about: "Architecture, LLM integration, CRM/messenger connectors, production deployment, and team handover.",
    salesNotes: "from €5,000",
    deliveryDays: 28,
    price: 5000,
    serviceImage: IMAGES["enterprise-ai-assistant"],
    feedPath: "/ai/ai-implementation",
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
  ...enExtra,
];

/** Курируемый набор для маркетинговой сетки «Решения по задачам бизнеса» на /services. */
export const ENTERPRISE_SERVICES_LISTING_SLUGS = [
  "business-process-automation",
  "crm-quote-offers",
  "ai-inbound-calls",
  "corporate-ai-agent-1c-crm",
  "ai-meeting-crm",
  "ai-sales-loop",
  "sales-ai-agent",
  "wildberries-independent-sales-channel",
  "secure-private-ai-cloud",
  "enterprise-ai-assistant",
  "private-llm-gigachat",
  "crm-integration",
  "rag",
  "ai-discovery-roadmap",
] as const;

/** RU marketplace offer — hide from UZ /services grid. */
const UZ_EXCLUDED_SERVICE_SLUGS = new Set(["wildberries-independent-sales-channel"]);

/** Uzbek Latin overlays for enterprise catalog (prices: RUB×100 → UZS). */
const UZ_SERVICE_COPY: Partial<
  Record<string, Pick<EnterpriseService, "title" | "description" | "about">>
> = {
  "business-process-automation": {
    title: "Biznes-jarayonlarni avtomatlashtirish",
    description: "Audit, CRM/1С integratsiyalar, workflow — qoʻlda rutinasiz vazifa zanjirlari.",
    about: "Jarayonlar auditi, avtomatlashtirish sozlash, CRM va hujjatlar integratsiyasi, jamoa oʻqitish.",
  },
  "sales-ai-agent": {
    title: "Savdo boʻlimini avtomatlashtirish",
    description: "Lidlar, CRM, tijorat takliflari, follow-up — PDF soatlar emas, daqiqalarda.",
    about: "Shablonlar va CRM uchun avtomatlashtirish sozlaymiz, sinab, savdoda ishga tushiramiz.",
  },
  "ai-discovery-roadmap": {
    title: "AI & Automation Advisor",
    description: "Jarayonni tahlil qilamiz, ROI hisoblaymiz, texnologiya tanlaymiz, joriy qilamiz.",
    about: "Biznes-audit, jarayonlar xaritasi, ROI, yoʻl xaritasi va ishlab chiqishdan oldin smeta.",
  },
  "enterprise-ai-assistant": {
    title: "Biznesga AI joriy etish",
    description: "LLM, agentlar, CRM integratsiyalari — ChatGPT demosi emas, production.",
    about: "Arxitektura, LLM, CRM/messenjerlar, production deploy va jamoaga topshirish.",
  },
  "private-llm-gigachat": {
    title: "Private LLM kontur",
    description: "On-prem va izolyatsiyalangan bulut — tashqi servislarga maʼlumot oqimisiz.",
    about: "Konturingizda LLM joylashtiramiz: API, guardrails, monitoring va integratsiyalar.",
  },
  "ai-sales-loop": {
    title: "Savdo boʻlimi AI konturi",
    description: "Telefoniya, yozishmalar, CRM va avtomatik keyingi harakatlar — alohida botlar emas, bitta mahsulot.",
    about: "Bitrix24 / amoCRM + telefoniya + AI: lidlar, qoʻngʻiroq samarilari, vazifalar, follow-up.",
  },
  "ai-meeting-crm": {
    title: "AI Meeting-to-CRM",
    description:
      "Uchrashuv → qarorlar → vazifalar → CRM → hujjatlar → muddat nazorati. Faqat samari emas — ijro.",
    about:
      "Yandex Telemost / Yandex 360, MTS Link, SaluteJazz yoki IVA360 transkripti → kelishuvlar, masʼullar, muddatlar → Bitrix24/amoCRM va follow-up (odam tasdiqlaydi).",
  },
  "corporate-ai-agent-1c-crm": {
    title: "Korporativ AI-agentni 1С va CRM bilan integratsiya",
    description:
      "Tayyor agent emas — sizning landshaftingiz: CRM, 1С, rollar, jarayonlar, istisnolar, xavfsizlik va KPI.",
    about:
      "Jarayon va huquqlar xaritasi, firma skills va nostandart konektorlar, sifat/xavfsizlik testlari, HITL, 1С/legacy; Yandex AI Studio vs private/on-prem.",
  },
  "ai-inbound-calls": {
    title: "Kiruvchi qoʻngʻiroqlar va koll-markaz uchun AI",
    description:
      "Qoʻngʻiroq qabul, real vaqtda STT, niyat, tipik savollarga javob, operatorga uzatish, tarix va analitika.",
    about:
      "Pilot: bitta stsenariy va bitta liniya — toʻliq koll-markazni bir kunda almashtirmaymiz. Telefoniya, SpeechKit, LLM, CRM.",
  },
  "crm-quote-offers": {
    title: "CRM da smeta va KP avtomatlashtirish",
    description:
      "Audit, taʼmir yoki qayta yigʻish: smeta → tijorat taklifi → mijozga yuborish. Har qanday CRM — Megaplan, Bitrix24, amoCRM.",
    about:
      "Buzilgan avtomatlashtirishni tiklash yoki yangi kontur: narxlar, shablonlar, PDF/landing, email/Telegram. Keyin rivojlantirish va qoʻllab-quvvatlash. Keyslar: KP-LLM, ELIA.",
  },
  "crm-integration": {
    title: "Bitrix24 · amoCRM",
    description:
      "CRM joriy etish va avtomatlashtirish: Bitrix24 va amoCRM — 1С, telefoniya, hujjatlar, voronkalar; portal sizda qoladi.",
    about: "Ikki tomonlama integratsiyalar, webhooks, retry va monitoring.",
  },
  rag: {
    title: "Biznes uchun RAG",
    description: "Hujjatlar boʻyicha qidiruv va LLM javoblari — manba havolasi bilan.",
    about: "Indeksatsiya, vektor qidiruv, guardrails va chat/CRM integratsiya.",
  },
  "secure-private-ai-cloud": {
    title: "Secure private AI bulut",
    description: "Yopiq konturda AI — kirish nazorati, jurnallar, infratuzilma himoyasi.",
    about: "Secure AI: bulut yoki on-prem, NDA, rollar va monitoring.",
  },
  "ai-automation": {
    title: "AI-avtomatlashtirish",
    description: "Operatsiyalarni avtomatlashtirish uchun AI tizimlari — auditdan production gacha.",
    about: "CRM, hujjatlar va workflow integratsiyalari bilan AI-avtomatlashtirish.",
  },
  "document-processing": {
    title: "Hujjat aylanishini avtomatlashtirish",
    description: "OCR, kelishuvlar, maʼlumot ajratish — CRM/ERP ga qoʻlda kiritishsiz.",
    about: "Hujjat pipeline, workflow va hisob tizimlari integratsiyasi.",
  },
  "ai-agent": {
    title: "Biznes uchun AI-agentlar",
    description: "Harakatli agentlar: CRM, hujjatlar, workflow, odamga eskalatsiya.",
    about: "Vositalar, monitoring va handover bilan koʻp bosqichli agentlar.",
  },
  "knowledge-base": {
    title: "Korporativ bilim bazasi",
    description: "Reglamentlar, FAQ va manba havolali AI javoblar uchun yagona joy.",
    about: "Bilim bazasi, qidiruv, xodimlar va mijozlar uchun chatbot.",
  },
  "ai-consulting": {
    title: "AI-konsalting",
    description: "Strategiya, ROI, texnologiya tanlash va joriy etish yoʻl xaritasi.",
    about: "Audit, tavsiyalar va ishlab chiqish xarididan oldin reja.",
  },
  bitrix: {
    title: "Bitrix24 sozlash",
    description: "Bitrix24 + AI: portal, avtomatlashtirish, 1С, telefoniya, hujjatlar va savdo AI konturi.",
    about: "Bitta jarayonda pilot: voronka, REST/webhooks, integratsiyalar va AI qatlam.",
  },
  "claude-smb": {
    title: "Kichik va oʻrta biznes uchun Claude AI",
    description: "Claude AI, API, Code va MCP ni KMB jarayonlariga joriy etish — CRM, hujjatlar, savdo.",
    about: "Claude API va MCP — Claude Pro obunasi emas. Qatʼiy smeta, NDA, Oʻzbekiston.",
  },
  "ii-dlya-biznesa": {
    title: "Biznes uchun AI — audit, ishlab chiqish va joriy etish",
    description: "Kalit topshirish: jarayonlar auditi, KPI li pilot va CRM/hujjatlar/savdoda production.",
    about: "Stsenariylar, arxitektura, xavfsizlik, keyslar. Qatʼiy smeta, NDA.",
  },
};

function formatUzsFrom(priceRub: number): string {
  const uzs = priceRub * 100;
  return `${uzs.toLocaleString("ru-RU").replace(/\u00a0/g, " ")} soʻmdan`;
}

function toUzService(item: EnterpriseService): EnterpriseService {
  const copy = UZ_SERVICE_COPY[item.slug];
  const price = item.price * 100;
  return {
    ...item,
    title: copy?.title ?? item.title,
    description: copy?.description ?? item.description,
    about: copy?.about ?? item.about,
    price,
    salesNotes: `${formatUzsFrom(item.price)}`.replace(/^от /, "").replace(/^from /, "") ,
  };
}

/** Build once — map all RU catalog entries to UZS + Uzbek copy where available. */
const uzServices: EnterpriseService[] = ruServices.map(toUzService);

export function getEnterpriseServices(locale: string): EnterpriseService[] {
  if (locale === "uz") return uzServices;
  return ruServices;
}

/** Короткий листинг для /services (SEO long-tail остаётся в маршрутах). */
export function getEnterpriseServicesListing(locale: string): EnterpriseService[] {
  const bySlug = new Map(getEnterpriseServices(locale).map((item) => [item.slug, item]));
  const slugs =
    locale === "uz"
      ? ENTERPRISE_SERVICES_LISTING_SLUGS.filter((slug) => !UZ_EXCLUDED_SERVICE_SLUGS.has(slug))
      : ENTERPRISE_SERVICES_LISTING_SLUGS;
  return slugs.map((slug) => bySlug.get(slug)).filter((item): item is EnterpriseService => Boolean(item));
}

export function getEnterpriseService(slug: string, locale: string) {
  return getEnterpriseServices(locale).find((item) => item.slug === slug);
}

/** Match YML feed offer by landing path (`/automation/company-automation`). */
export function getEnterpriseServiceByFeedPath(path: string, locale: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return getEnterpriseServices(locale).find((item) => item.feedPath === normalized);
}

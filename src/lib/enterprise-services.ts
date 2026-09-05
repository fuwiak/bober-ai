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
  /**
   * Deprecated: do not use. Empty/missing `<url>` fails Yandex Hatter_WrongUrl.
   * Always emit a real https://www.bober-systems.ru/... URL via feedPath.
   */
  omitFeedUrl?: boolean;
  /**
   * When true, YML offer omits `<picture>` (no photo).
   * Prefer omit over placeholder images for Wordstat niche offers.
   */
  omitFeedPicture?: boolean;
  /**
   * When true, skip this entry in performers YML (keep page/order routes).
   * Use for Wordstat paraphrases that collide with a canonical offer title.
   */
  omitFromFeed?: boolean;
  /** `/order/{orderSlug}` when the offer id is not a catalog service (landings/hubs). */
  orderSlug?: string;
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
  "erp-moysklad": "/portfolio/erp-moysklad-chatgpt-ux.webp",
};

const ruExtra: EnterpriseService[] = [
  { id: "ai-automation", slug: "ai-automation", title: "ИИ-автоматизация", description: "Системы ИИ для автоматизации операций — от аудита до промышленного запуска.", about: "Проектируем и внедряем ИИ-автоматизацию с интеграциями CRM, документов и workflow.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES["ai-automation"] },
  { id: "rag", slug: "rag", title: "RAG для бизнеса", description: "Поиск по документам и ответы LLM со ссылкой на источник.", about: "Индексация документов, поиск по смыслу, ограничители ответа и встраивание в чат или CRM.", salesNotes: "от 500 000 ₽", deliveryDays: 21, price: 500000, serviceImage: IMAGES.rag, feedPath: "/solutions/rag-search" },
  { id: "llm-development", slug: "llm-development", title: "Разработка LLM-решений", description: "Кастомные LLM-приложения, API, промпт-инженерия и промышленный запуск.", about: "Архитектура, разработка, тестирование и передача команде.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES["llm-development"] },
  { id: "n8n", slug: "n8n", title: "Автоматизация на n8n", description: "n8n-воркфлоу с AI-слоем и интеграциями CRM, мессенджеров, API.", about: "Проектируем, разворачиваем и сопровождаем n8n в промышленной эксплуатации.", salesNotes: "от 300 000 ₽", deliveryDays: 14, price: 300000, serviceImage: IMAGES.n8n },
  { id: "ai-agent", slug: "ai-agent", title: "ИИ-агенты для бизнеса", description: "Агенты с действиями: CRM, документы, workflow, эскалация к человеку.", about: "Многошаговые агенты с инструментами, мониторингом и handover.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES["ai-agent"] },
  { id: "document-processing", slug: "document-processing", title: "Автоматизация документооборота", description: "OCR, согласования, извлечение данных — в CRM/ERP без ручного ввода.", about: "Пайплайны документов, workflow и интеграции с учётными системами.", salesNotes: "от 500 000 ₽", deliveryDays: 21, price: 500000, serviceImage: IMAGES["document-processing"], feedPath: "/automation/documents" },
  { id: "voice-ai", slug: "voice-ai", title: "Речевая аналитика звонков", description: "Транскрипты, качество разговоров, факты в CRM и контроль менеджеров.", about: "Речевая аналитика и голосовые сценарии для продаж с интеграцией в CRM.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES["voice-ai"] },
  { id: "ocr", slug: "ocr", title: "Распознавание первичных документов в 1С", description: "Счета, акты, УПД → поля в 1С без ручного ввода.", about: "OCR-пайплайны с валидацией и выгрузкой в 1С, CRM или ERP.", salesNotes: "от 300 000 ₽", deliveryDays: 14, price: 300000, serviceImage: IMAGES.ocr },
  { id: "open-webui", slug: "open-webui", title: "Open WebUI", description: "Корпоративный чат с LLM, SSO и политиками доступа.", about: "Развёртывание Open WebUI, подключение моделей и guardrails.", salesNotes: "от 500 000 ₽", deliveryDays: 21, price: 500000, serviceImage: IMAGES["open-webui"] },
  { id: "self-hosted-ai", slug: "self-hosted-ai", title: "Self-hosted AI", description: "Приватный AI-стек в вашем контуре — без утечки данных.", about: "On-prem LLM, API, мониторинг и интеграции под NDA.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES["self-hosted-ai"] },
  { id: "mcp", slug: "mcp", title: "MCP-интеграции", description: "Model Context Protocol — подключение LLM к CRM, БД и API.", about: "MCP-серверы для внутренних систем и инструментов агентов.", salesNotes: "от 500 000 ₽", deliveryDays: 21, price: 500000, serviceImage: IMAGES.mcp },
  { id: "langgraph", slug: "langgraph", title: "LangGraph-агенты", description: "Многошаговые агенты со state, HITL и observability.", about: "LangGraph для сложных сценариев с контролем и аудитом.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES.langgraph },
  { id: "knowledge-base", slug: "knowledge-base", title: "Корпоративная база знаний", description: "Единое место для регламентов, FAQ и AI-ответов со ссылками.", about: "База знаний, поиск, чат-бот для сотрудников и клиентов.", salesNotes: "от 500 000 ₽", deliveryDays: 21, price: 500000, serviceImage: IMAGES["knowledge-base"] },
  { id: "ai-consulting", slug: "ai-consulting", title: "ИИ-консалтинг", description: "Стратегия, ROI, выбор технологий и дорожная карта внедрения.", about: "Аудит, рекомендации и план до закупки разработки.", salesNotes: "от 150 000 ₽", deliveryDays: 10, price: 150000, serviceImage: IMAGES["ai-consulting"] },
  {
    id: "crm-integration",
    slug: "crm-integration",
    title: "Внедрение и настройка Битрикс24 / amoCRM",
    description:
      "Внедрение CRM под ключ. Битрикс24: настройка от 150 000 ₽, 1С/документы/телефония от 300 000 ₽, ИИ для продаж от 500 000 ₽.",
    about: "Двусторонние интеграции, webhooks, retry и мониторинг. Портал и данные остаются у вас.",
    salesNotes: "от 150 000 ₽",
    deliveryDays: 21,
    price: 150000,
    serviceImage: IMAGES["crm-integration"],
  },
  {
    id: "bitrix",
    slug: "bitrix",
    title: "Настройка Bitrix24",
    description:
      "Настройка и автоматизация Bitrix24 от 150 000 ₽; связка с 1С/документами/телефонией от 300 000 ₽; ИИ-контур поверх CRM от 500 000 ₽.",
    about:
      "Партнёр 1С-Битрикс · ID 28909898. Стартуем с воронки и роботов; ИИ добавляем отдельным пакетом.",
    salesNotes: "от 150 000 ₽",
    deliveryDays: 21,
    price: 150000,
    serviceImage: IMAGES.bitrix,
    feedPath: "/bitrix",
    inServicesCatalog: false,
  },
  {
    id: "ai-sales-loop",
    slug: "ai-sales-loop",
    title: "ИИ для отдела продаж: звонки, CRM и контроль",
    description:
      "Анализ звонков, автозаполнение CRM, задачи и дожим — поверх Bitrix24/amoCRM.",
    about:
      "Квалификация лидов, саммари звонков, задачи, дожим и отчёт об упущенных сделках. От 500 000 ₽.",
    salesNotes: "от 500 000 ₽",
    deliveryDays: 21,
    price: 500000,
    serviceImage: IMAGES["ai-sales-loop"],
  },
  {
    id: "ai-meeting-crm",
    slug: "ai-meeting-crm",
    title: "AI Meeting-to-CRM",
    description:
      "Встреча → решения → задачи → CRM → документы → контроль срока. Не «саммари ради саммари» — исполнение после созвона.",
    about:
      "Транскрипт из Yandex Telemost / Yandex 360, MTS Link, SaluteJazz или IVA360 → договорённости, ответственные, сроки → Bitrix24/amoCRM, задачи и дожим с human-in-the-loop.",
    salesNotes: "от 300 000 ₽",
    deliveryDays: 21,
    price: 300000,
    serviceImage: IMAGES["ai-meeting-crm"],
  },
  {
    id: "corporate-ai-agent-1c-crm",
    slug: "corporate-ai-agent-1c-crm",
    title: "Интеграция корпоративного ИИ-агента с 1С и CRM",
    description:
      "Не «агент из коробки» — внедрение в ваш ландшафт: CRM, 1С, роли, процессы, исключения, безопасность и KPI.",
    about:
      "Карта процессов и прав, фирменные skills и конекторы к нестандартным системам, тесты качества и безопасности, HITL, связка с 1С/legacy; сравнение Yandex AI Studio с private/on-premise.",
    salesNotes: "от 500 000 ₽",
    deliveryDays: 28,
    price: 500000,
    serviceImage: IMAGES["corporate-ai-agent-1c-crm"],
  },
  {
    id: "ai-inbound-calls",
    slug: "ai-inbound-calls",
    title: "ИИ для входящих звонков и колл-центра",
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
      "ИИ для бизнеса под ключ: аудит процессов, пилот с KPI и промышленное внедрение в CRM, документы, базу знаний и продажи.",
    about:
      "Гибрид коммерческого лендинга и гида: сценарии, ассистент vs агент, архитектура (Yandex Cloud / Selectel / on-premise), безопасность, кейсы. Фиксированная смета, NDA.",
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
    title: "Каталог автоматизации бизнеса",
    description:
      "Каталог направлений и внедрение: КП, документы, CRM/1С, OCR, RAG, продажи. Аудит, пилот и промышленный запуск с фиксированной сметой.",
    about:
      "Каталог /automation + коммерческий оффер. ИИ только там, где снимает ручной труд. NDA, on-premise, Россия и СНГ.",
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
      "Запуск собственного канала продаж параллельно с Wildberries: витрина, Bitrix24/amoCRM, 1С/МойСклад, оплата, доставка, Telegram/VK/email, ИИ-ассистент по товарам, синхронизация цен и остатков. Срок от 14 дней.",
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
      "Приватный ИИ (RAG, ассистент, модели) + Yandex Cloud / Selectel / Cloud.ru + защита Kaspersky для VM, серверов и контейнеров.",
    about:
      "Контур: слой ИИ (private LLM, RAG, база знаний, Bitrix24/1С), инфраструктура (российское облако, VPN, IAM, backup, логи) и Kaspersky (VM, Linux/Windows, контейнеры, Security Center). Внедрение, мониторинг, отчёт, реакция на события. Лицензии Kaspersky — через авторизованную дистрибуцию.",
    salesNotes: "от 800 000 ₽",
    deliveryDays: 28,
    price: 800000,
    serviceImage: IMAGES["secure-private-ai-cloud"],
  },
  // Wordstat niche offers (exact titles) → SEO landings; feed-only (no thin /services pages).
  { id: "company-automation", slug: "company-automation", title: "Автоматизация компании", description: "Процессы, CRM, документы и отчёты без ручного копирования — фиксированная смета и ROI.", about: "Аудит узкого места, workflow и интеграции, промышленный запуск и обучение команды.", salesNotes: "от 500 000 ₽", deliveryDays: 21, price: 500000, serviceImage: IMAGES["company-automation"], feedPath: "/automation/company-automation", inServicesCatalog: false },
  { id: "crm-automation", slug: "crm-automation", title: "Автоматизация CRM", description: "Стадии, роботы, заявки с сайта и мессенджеров, отчёты без ручного ввода.", about: "Автоматизация воронки CRM — триггеры, задачи, уведомления и контроль конверсии.", salesNotes: "от 500 000 ₽", deliveryDays: 21, price: 500000, serviceImage: IMAGES["crm-automation"], feedPath: "/integrations/crm-automation", inServicesCatalog: false },
  { id: "document-ai", slug: "document-ai", title: "ИИ для обработки документов", description: "Извлечение полей, классификация, маршруты в CRM/1С — меньше ручного ввода.", about: "ИИ-пайплайн документов — OCR, классификация, валидация и выгрузка в учётные системы.", salesNotes: "от 500 000 ₽", deliveryDays: 21, price: 500000, serviceImage: IMAGES["document-ai"], feedPath: "/automation/document-ai", inServicesCatalog: false },
  { id: "ai-for-crm", slug: "ai-for-crm", title: "ИИ для CRM", description: "Ассистент в карточке сделки, квалификация лидов, черновики писем и КП.", about: "ИИ-слой поверх CRM — саммари, скоринг, дожим без хаоса в воронке.", salesNotes: "от 300 000 ₽", deliveryDays: 21, price: 300000, serviceImage: IMAGES["ai-for-crm"], feedPath: "/integrations/ai-for-crm", inServicesCatalog: false },
  { id: "corporate-ai-assistant", slug: "corporate-ai-assistant", title: "Корпоративный ИИ-ассистент", description: "Корпоративная нейросеть и ассистент в закрытом контуре — без утечки данных.", about: "Приватный LLM-контур, политики доступа, интеграции с внутренними системами.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES["corporate-ai-assistant"], feedPath: "/ai/corporate-neural-net", inServicesCatalog: false },
  { id: "business-process-audit", slug: "business-process-audit", title: "Аудит бизнес-процессов", description: "Карта потерь, приоритеты и смета пилота — до закупки разработки.", about: "Аудит процессов, ROI, дорожная карта на 90 дней и критерии приёмки пилота.", salesNotes: "от 150 000 ₽", deliveryDays: 10, price: 150000, serviceImage: IMAGES["business-process-audit"], feedPath: "/automation/business-process-audit", inServicesCatalog: false },
  // amoCRM Wordstat 2026-08-05 — landings exist; YML: no picture; URL → feedPath landing.
  { id: "amocrm-setup", slug: "amocrm-setup", title: "Настройка amoCRM", description: "Настроить amoCRM: воронка, поля, роботы и заявки с сайта.", about: "Настройка портала amoCRM под процесс продаж — фиксированная смета.", salesNotes: "от 150 000 ₽", deliveryDays: 21, price: 150000, serviceImage: IMAGES["crm-integration"], feedPath: "/integrations/amocrm-setup", inServicesCatalog: false },
  { id: "amocrm-implementation", slug: "amocrm-implementation", title: "Внедрение amoCRM", description: "Внедрить amoCRM под ключ: воронка, интеграции, регламенты и приёмка.", about: "Внедрение amoCRM с сметой, сроками и промышленный контуром.", salesNotes: "от 300 000 ₽", deliveryDays: 28, price: 300000, serviceImage: IMAGES["crm-integration"], feedPath: "/integrations/amocrm-implementation", inServicesCatalog: false },
  { id: "amocrm-services", slug: "amocrm-services", title: "Услуги amoCRM под ключ", description: "Интегратор amoCRM: настройка, внедрение, интеграции и ИИ.", about: "Пакеты услуг amoCRM со сметой до старта.", salesNotes: "от 150 000 ₽", deliveryDays: 21, price: 150000, serviceImage: IMAGES["crm-integration"], feedPath: "/integrations/amocrm-services", inServicesCatalog: false },
  { id: "amocrm-pricing", slug: "amocrm-pricing", title: "Сколько стоит внедрение amoCRM", description: "Цена настройки и внедрения amoCRM — понятные пакеты и смета до старта.", about: "Ориентиры бюджета на настройку, внедрение и ИИ-слой для amoCRM.", salesNotes: "от 150 000 ₽", deliveryDays: 14, price: 150000, serviceImage: IMAGES["crm-integration"], feedPath: "/integrations/amocrm-pricing", inServicesCatalog: false },
  { id: "amocrm-ai-agent", slug: "amocrm-ai-agent", title: "ИИ-агент для amoCRM", description: "ИИ-агент в amoCRM: квалификация, задачи и дожим в карточке сделки.", about: "Агент с действиями в amoCRM и human-in-the-loop.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES["ai-agent"], feedPath: "/integrations/amocrm-ai-agent", inServicesCatalog: false },
  // Yandex Услуги «amoCRM» intent titles 2026-08-05 — feed-only; YML: no picture; URL → closest landing.
  { id: "amocrm-nastroit", slug: "amocrm-nastroit", title: "Настроить amoCRM", description: "Настроить amoCRM: воронка, поля, роботы, заявки с сайта и мессенджеров.", about: "Настройка amoCRM под ваш процесс продаж — фиксированная смета.", salesNotes: "от 150 000 ₽", deliveryDays: 21, price: 150000, serviceImage: IMAGES["crm-integration"], feedPath: "/integrations/amocrm", inServicesCatalog: false, omitFeedPicture: true, omitFromFeed: true },
  { id: "amocrm-dorabotka", slug: "amocrm-dorabotka", title: "Доработка amoCRM", description: "Доработка amoCRM: воронки, виджеты, API, отчёты и устранение узких мест.", about: "Точечная доработка портала amoCRM со сметой до старта.", salesNotes: "от 150 000 ₽", deliveryDays: 14, price: 150000, serviceImage: IMAGES["crm-integration"], feedPath: "/integrations/amocrm", inServicesCatalog: false, omitFeedPicture: true, omitFromFeed: true },
  { id: "amocrm-vnedrit", slug: "amocrm-vnedrit", title: "Внедрить amoCRM", description: "Внедрить amoCRM под ключ: воронка, интеграции, регламенты и приёмка.", about: "Внедрение amoCRM с сметой, сроками и промышленным контуром.", salesNotes: "от 300 000 ₽", deliveryDays: 28, price: 300000, serviceImage: IMAGES["crm-integration"], feedPath: "/integrations/amocrm-implementation", inServicesCatalog: false, omitFeedPicture: true, omitFromFeed: true },
  { id: "amocrm-integraciya", slug: "amocrm-integraciya", title: "Интеграция amoCRM", description: "Интеграция amoCRM с сайтом, 1С, телефонией, WhatsApp и Telegram.", about: "Двусторонний обмен и вебхуки — логирование и retry.", salesNotes: "от 300 000 ₽", deliveryDays: 21, price: 300000, serviceImage: IMAGES["crm-integration"], feedPath: "/integrations/amocrm", inServicesCatalog: false, omitFeedPicture: true, omitFromFeed: true },
  { id: "amocrm-konsultaciya", slug: "amocrm-konsultaciya", title: "Консультация amoCRM", description: "Консультация amoCRM: аудит воронки, приоритеты и смета пилота до закупки.", about: "Разбор текущего портала и дорожная карта до внедрения.", salesNotes: "от 50 000 ₽", deliveryDays: 7, price: 50000, serviceImage: IMAGES["ai-consulting"], feedPath: "/integrations/amocrm", inServicesCatalog: false, omitFeedPicture: true, omitFromFeed: true },
  { id: "amocrm-pod-klyuch", slug: "amocrm-pod-klyuch", title: "amoCRM под ключ", description: "amoCRM под ключ: настройка, внедрение, интеграции и обучение команды.", about: "Полный контур amoCRM со сметой и приёмкой.", salesNotes: "от 300 000 ₽", deliveryDays: 28, price: 300000, serviceImage: IMAGES["crm-integration"], feedPath: "/integrations/amocrm-services", inServicesCatalog: false, omitFeedPicture: true, omitFromFeed: true },
  { id: "amocrm-integrator", slug: "amocrm-integrator", title: "Интегратор amoCRM", description: "Интегратор amoCRM: настройка, доработка, API и связка с учётными системами.", about: "Партнёрский контур amoCRM — смета до старта работ.", salesNotes: "от 150 000 ₽", deliveryDays: 21, price: 150000, serviceImage: IMAGES["crm-integration"], feedPath: "/integrations/amocrm", inServicesCatalog: false, omitFeedPicture: true, omitFromFeed: true },
  { id: "amocrm-avtomatizaciya", slug: "amocrm-avtomatizaciya", title: "Роботы и триггеры amoCRM", description: "Роботы и триггеры amoCRM: задачи и дожим без ручного копирования.", about: "Автоматизация воронки amoCRM — фиксированная смета.", salesNotes: "от 150 000 ₽", deliveryDays: 21, price: 150000, serviceImage: IMAGES["crm-automation"], feedPath: "/integrations/amocrm-automation", inServicesCatalog: false, omitFeedPicture: true },
  { id: "amocrm-voronka-setup", slug: "amocrm-voronka-setup", title: "Настройка воронки amoCRM", description: "Настройка воронки amoCRM: стадии, поля, права и контроль конверсии.", about: "Рабочая воронка продаж в amoCRM под ваш регламент.", salesNotes: "от 150 000 ₽", deliveryDays: 14, price: 150000, serviceImage: IMAGES["crm-integration"], feedPath: "/integrations/amocrm-setup", inServicesCatalog: false, omitFeedPicture: true, omitFromFeed: true },
  { id: "amocrm-audit", slug: "amocrm-audit", title: "Аудит amoCRM", description: "Аудит amoCRM: карта потерь в воронке, приоритеты и смета доработок.", about: "Аудит портала amoCRM с ROI и планом на 90 дней.", salesNotes: "от 50 000 ₽", deliveryDays: 7, price: 50000, serviceImage: IMAGES["business-process-audit"], feedPath: "/integrations/amocrm", inServicesCatalog: false, omitFeedPicture: true, omitFromFeed: true },
  { id: "crm-erp-development", slug: "crm-erp-development", title: "Разработка CRM и ERP", description: "Разработка CRM и ERP под процесс: доработка Bitrix24/amoCRM/1С или кастом.", about: "Архитектура и разработка контура CRM ↔ ERP со сметой до кода.", salesNotes: "от 500 000 ₽", deliveryDays: 42, price: 500000, serviceImage: IMAGES["crm-integration"], feedPath: "/solutions/crm-erp-development", inServicesCatalog: false },
  // Yandex Услуги «ИИ» visibility 2026-08-05 — competitor-style titles; YML: no picture; URL → closest landing.
  { id: "ii-vnedrenie-v-biznes", slug: "ii-vnedrenie-v-biznes", title: "Внедрение ИИ в бизнес", description: "Внедрение ИИ в бизнес: аудит процессов, пилот и промышленный запуск со сметой.", about: "ИИ в CRM, документах и продажах — фиксированная смета и ROI до старта.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES["ai-consulting"], feedPath: "/ii-dlya-biznesa", inServicesCatalog: false, omitFeedPicture: true },
  { id: "ii-prodavets", slug: "ii-prodavets", title: "ИИ-продавец", description: "ИИ-продавец: квалификация лидов, дожим и черновики КП в CRM.", about: "Агент продаж с действиями в CRM и эскалацией к менеджеру.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES["sales-ai-agent"], feedPath: "/services/sales-ai-agent", inServicesCatalog: false, omitFeedPicture: true, omitFromFeed: true },
  { id: "ii-vnedrenie-iskusstvennogo-intellekta", slug: "ii-vnedrenie-iskusstvennogo-intellekta", title: "Внедрение искусственного интеллекта", description: "Внедрение искусственного интеллекта под ключ: roadmap, пилот, интеграции.", about: "От аудита до промышленного запуска LLM/агентов в вашем контуре.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES["ai-discovery-roadmap"], feedPath: "/ii-dlya-biznesa", inServicesCatalog: false, omitFeedPicture: true },
  { id: "ii-vnedrenie-v-vash-biznes", slug: "ii-vnedrenie-v-vash-biznes", title: "Внедрение искусственного интеллекта в ваш бизнес", description: "Внедрение искусственного интеллекта в ваш бизнес — смета, сроки, приёмка.", about: "Пилот на узком месте, затем масштабирование в CRM и операции.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES["enterprise-ai-assistant"], feedPath: "/ii-dlya-biznesa", inServicesCatalog: false, omitFeedPicture: true },
  { id: "ii-neyro-sotrudnik", slug: "ii-neyro-sotrudnik", title: "Разработка нейро-сотрудника", description: "Разработка нейро-сотрудника: ассистент с доступом к CRM, базе знаний и задачам.", about: "Цифровой сотрудник с инструментами, мониторингом и human-in-the-loop.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES["ai-agent"], feedPath: "/services/ai-agent", inServicesCatalog: false, omitFeedPicture: true },
  { id: "ii-sozdanie-botov", slug: "ii-sozdanie-botov", title: "Создание ИИ-ботов", description: "Создание ИИ-ботов для сайта, Telegram и мессенджеров с передачей в CRM.", about: "Боты с LLM, сценариями эскалации и интеграцией в воронку продаж.", salesNotes: "от 300 000 ₽", deliveryDays: 21, price: 300000, serviceImage: IMAGES["enterprise-ai-assistant"], feedPath: "/services/ai-agent", inServicesCatalog: false, omitFeedPicture: true },
  { id: "ii-chatboty-pod-klyuch", slug: "ii-chatboty-pod-klyuch", title: "Разработка чат-ботов под ключ для бизнеса", description: "Разработка чат-ботов под ключ для бизнеса: квалификация, FAQ, заявки в CRM.", about: "Чат-бот под процесс продаж/поддержки со сметой и приёмкой.", salesNotes: "от 300 000 ₽", deliveryDays: 21, price: 300000, serviceImage: IMAGES["enterprise-ai-assistant"], feedPath: "/services/ai-agent", inServicesCatalog: false, omitFeedPicture: true },
  { id: "ii-integraciya", slug: "ii-integraciya", title: "Интеграция ИИ в CRM", description: "Интеграция ИИ в CRM: ассистент в карточке, скоринг, саммари и задачи.", about: "ИИ-слой поверх Bitrix24/amoCRM без смены воронки.", salesNotes: "от 300 000 ₽", deliveryDays: 21, price: 300000, serviceImage: IMAGES["ai-for-crm"], feedPath: "/integrations/ai-for-crm", inServicesCatalog: false, omitFeedPicture: true },
  { id: "ii-neyronnye-seti", slug: "ii-neyronnye-seti", title: "Разработка нейронных сетей для бизнеса", description: "Разработка нейронных сетей для бизнеса: LLM, RAG и агенты под ваши данные.", about: "Приватный LLM-контур, база знаний и интеграции с учётными системами.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES["llm-development"], feedPath: "/services/llm-development", inServicesCatalog: false, omitFeedPicture: true },
  { id: "ii-agenty-vnedrenie", slug: "ii-agenty-vnedrenie", title: "Внедрение ИИ-агентов", description: "Внедрение ИИ-агентов: действия в CRM, документах и workflow с контролем.", about: "Многошаговые агенты с инструментами, аудитом и эскалацией к человеку.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES["ai-agent"], feedPath: "/services/ai-agent", inServicesCatalog: false, omitFeedPicture: true },
  // Yandex Услуги «ERP МойСклад» 2026-08-05 — feed-only title variants; YML: no picture; URL → erp-moysklad.
  { id: "erp-moysklad", slug: "erp-moysklad", title: "Внедрение ERP МойСклад", description: "Внедрение ERP МойСклад: склад, учёт, CRM и ChatGPT-like UX со сметой.", about: "Настройка МойСклад, интеграции и ИИ-чат к остаткам и заказам.", salesNotes: "от 300 000 ₽", deliveryDays: 28, price: 300000, serviceImage: IMAGES["erp-moysklad"], feedPath: "/solutions/erp-moysklad", inServicesCatalog: false },
  { id: "moysklad-setup", slug: "moysklad-setup", title: "Настройка МойСклад", description: "Настройка МойСклад: склады, номенклатура, резервы и статусы заказов.", about: "Настройка ERP МойСклад под складской учёт — фиксированная смета.", salesNotes: "от 150 000 ₽", deliveryDays: 14, price: 150000, serviceImage: IMAGES["erp-moysklad"], feedPath: "/solutions/erp-moysklad", inServicesCatalog: false, omitFeedPicture: true },
  { id: "moysklad-crm-integration", slug: "moysklad-crm-integration", title: "Интеграция МойСклад с CRM", description: "Интеграция МойСклад с Bitrix24 / amoCRM: остатки, заказы, задачи.", about: "Двусторонний обмен МойСклад ↔ CRM с логированием и retry.", salesNotes: "от 300 000 ₽", deliveryDays: 21, price: 300000, serviceImage: IMAGES["crm-integration"], feedPath: "/solutions/erp-moysklad", inServicesCatalog: false, omitFeedPicture: true },
  { id: "moysklad-automation", slug: "moysklad-automation", title: "Автоматизация МойСклад", description: "Автоматизация МойСклад: резервы, отгрузки, алерты и задачи без ручного копирования.", about: "Workflow поверх МойСклад и CRM — смета до старта.", salesNotes: "от 300 000 ₽", deliveryDays: 21, price: 300000, serviceImage: IMAGES["business-process-automation"], feedPath: "/solutions/erp-moysklad", inServicesCatalog: false, omitFeedPicture: true },
  { id: "moysklad-pod-klyuch", slug: "moysklad-pod-klyuch", title: "МойСклад под ключ", description: "МойСклад под ключ: внедрение, интеграции, обучение и приёмка.", about: "Полный контур ERP МойСклад со сметой и сроками.", salesNotes: "от 500 000 ₽", deliveryDays: 28, price: 500000, serviceImage: IMAGES["erp-moysklad"], feedPath: "/solutions/erp-moysklad", inServicesCatalog: false, omitFeedPicture: true },
  { id: "moysklad-pricing", slug: "moysklad-pricing", title: "Сколько стоит внедрение МойСклад", description: "Цена настройки и внедрения МойСклад — понятные пакеты и смета до старта.", about: "Ориентиры бюджета на МойСклад, интеграции и ИИ-чат.", salesNotes: "от 150 000 ₽", deliveryDays: 14, price: 150000, serviceImage: IMAGES["erp-moysklad"], feedPath: "/solutions/erp-moysklad", inServicesCatalog: false, omitFeedPicture: true },
  { id: "moysklad-ai", slug: "moysklad-ai", title: "ИИ для МойСклад", description: "ИИ для МойСклад: чат к остаткам, заказам и отгрузкам с действиями в ERP.", about: "LLM + tools к API МойСклад — не пилот на публичном ChatGPT.", salesNotes: "от 300 000 ₽", deliveryDays: 21, price: 300000, serviceImage: IMAGES["enterprise-ai-assistant"], feedPath: "/solutions/erp-moysklad", inServicesCatalog: false, omitFeedPicture: true },
  { id: "moysklad-chatgpt-ux", slug: "moysklad-chatgpt-ux", title: "ChatGPT UX для МойСклад", description: "ChatGPT-like UX для МойСклад: диалог со складом и учётом в вашем контуре.", about: "Привычный чат-интерфейс с доступом к ERP и CRM.", salesNotes: "от 300 000 ₽", deliveryDays: 21, price: 300000, serviceImage: IMAGES["enterprise-ai-assistant"], feedPath: "/solutions/erp-moysklad", inServicesCatalog: false, omitFeedPicture: true },
  { id: "moysklad-crm-sync", slug: "moysklad-crm-sync", title: "Интеграция CRM и МойСклад", description: "Интеграция CRM и МойСклад: сделки видят резервы, склад — статусы продаж.", about: "Единый контур CRM ↔ ERP без ручного переноса.", salesNotes: "от 300 000 ₽", deliveryDays: 21, price: 300000, serviceImage: IMAGES["crm-integration"], feedPath: "/solutions/erp-moysklad", inServicesCatalog: false, omitFeedPicture: true },
  { id: "moysklad-warehouse", slug: "moysklad-warehouse", title: "Внедрение склада МойСклад", description: "Внедрение склада и учёта в МойСклад: номенклатура, резервы, отгрузки.", about: "Складской контур МойСклад под ваш процесс — смета и приёмка.", salesNotes: "от 300 000 ₽", deliveryDays: 21, price: 300000, serviceImage: IMAGES["erp-moysklad"], feedPath: "/solutions/erp-moysklad", inServicesCatalog: false, omitFeedPicture: true },
  // Yandex Услуги «Настройка YClients / amoCRM / Bitrix24 / МойСклад» 2026-08-05 — feed-only; YML: no picture; URL → crm-setup.
  { id: "yclients-amocrm-bitrix-moysklad-setup", slug: "yclients-amocrm-bitrix-moysklad-setup", title: "Настройка YClients, amoCRM, Bitrix24, МойСклад", description: "Комплексная настройка YClients, amoCRM, Bitrix24 и МойСклад под один процесс.", about: "Онлайн-запись, CRM и склад в одном контуре — фиксированная смета.", salesNotes: "от 300 000 ₽", deliveryDays: 28, price: 300000, serviceImage: IMAGES["crm-integration"], feedPath: "/integrations/crm-setup", inServicesCatalog: false, omitFeedPicture: true },
  { id: "yclients-setup", slug: "yclients-setup", title: "Настройка YClients", description: "Настройка YClients: онлайн-запись, услуги, сотрудники и уведомления.", about: "Настройка YClients под запись клиентов — фиксированная смета.", salesNotes: "от 150 000 ₽", deliveryDays: 14, price: 150000, serviceImage: IMAGES["crm-integration"], feedPath: "/integrations/yclients", inServicesCatalog: false, omitFeedPicture: true, omitFromFeed: true },
  { id: "yclients-amocrm-setup", slug: "yclients-amocrm-setup", title: "Настройка YClients и amoCRM", description: "Настройка YClients и amoCRM: записи становятся сделками без ручного переноса.", about: "Связка онлайн-записи и воронки amoCRM со сметой до старта.", salesNotes: "от 300 000 ₽", deliveryDays: 21, price: 300000, serviceImage: IMAGES["crm-integration"], feedPath: "/integrations/crm-setup", inServicesCatalog: false, omitFeedPicture: true },
  { id: "yclients-bitrix-setup", slug: "yclients-bitrix-setup", title: "Настройка YClients и Bitrix24", description: "Настройка YClients и Bitrix24: запись, сделка, задачи менеджеру.", about: "Онлайн-запись ↔ Bitrix24 без копипаста между окнами.", salesNotes: "от 300 000 ₽", deliveryDays: 21, price: 300000, serviceImage: IMAGES["crm-integration"], feedPath: "/integrations/crm-setup", inServicesCatalog: false, omitFeedPicture: true },
  { id: "yclients-moysklad-setup", slug: "yclients-moysklad-setup", title: "Настройка YClients и МойСклад", description: "Настройка YClients и МойСклад: запись, расход материалов и остатки.", about: "Связка онлайн-записи со складом МойСклад — смета до старта.", salesNotes: "от 300 000 ₽", deliveryDays: 21, price: 300000, serviceImage: IMAGES["erp-moysklad"], feedPath: "/integrations/crm-setup", inServicesCatalog: false, omitFeedPicture: true },
  { id: "bitrix-amocrm-moysklad-setup", slug: "bitrix-amocrm-moysklad-setup", title: "Настройка Bitrix24, amoCRM и МойСклад", description: "Настройка Bitrix24 или amoCRM и МойСклад: сделки видят остатки.", about: "CRM ↔ склад без ручного переноса статусов и резервов.", salesNotes: "от 300 000 ₽", deliveryDays: 21, price: 300000, serviceImage: IMAGES["crm-integration"], feedPath: "/integrations/crm-setup", inServicesCatalog: false, omitFeedPicture: true },
  { id: "yclients-online-booking-setup", slug: "yclients-online-booking-setup", title: "Настройка онлайн-записи YClients", description: "Настройка онлайн-записи YClients: слоты, услуги, напоминания клиентам.", about: "Рабочая онлайн-запись в YClients под ваш график и команду.", salesNotes: "от 150 000 ₽", deliveryDays: 14, price: 150000, serviceImage: IMAGES["crm-integration"], feedPath: "/integrations/crm-setup", inServicesCatalog: false, omitFeedPicture: true },
  { id: "complex-crm-moysklad-setup", slug: "complex-crm-moysklad-setup", title: "Комплексная настройка CRM и МойСклад", description: "Комплексная настройка CRM и МойСклад: воронка, склад, обмен статусами.", about: "Единый контур продаж и склада со сметой и приёмкой.", salesNotes: "от 300 000 ₽", deliveryDays: 28, price: 300000, serviceImage: IMAGES["crm-integration"], feedPath: "/integrations/crm-setup", inServicesCatalog: false, omitFeedPicture: true },
  { id: "yclients-crm-setup-pod-klyuch", slug: "yclients-crm-setup-pod-klyuch", title: "Настройка YClients и CRM под ключ", description: "Настройка YClients и CRM под ключ: запись, воронка, обучение команды.", about: "Полный контур онлайн-записи и CRM со сметой до старта.", salesNotes: "от 300 000 ₽", deliveryDays: 28, price: 300000, serviceImage: IMAGES["crm-integration"], feedPath: "/integrations/crm-setup", inServicesCatalog: false, omitFeedPicture: true },
  { id: "multi-crm-systems-setup", slug: "multi-crm-systems-setup", title: "Настройка CRM-систем YClients Bitrix24 amoCRM", description: "Настройка CRM-систем: YClients, Bitrix24, amoCRM — под ваш процесс продаж и сервиса.", about: "Мультисистемная настройка записи и CRM без лишних модулей.", salesNotes: "от 300 000 ₽", deliveryDays: 28, price: 300000, serviceImage: IMAGES["crm-integration"], feedPath: "/integrations/crm-setup", inServicesCatalog: false, omitFeedPicture: true },
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
  {
    id: "crm-integration",
    slug: "crm-integration",
    title: "Bitrix24 · amoCRM",
    description:
      "CRM setup and automation. Bitrix24 ladder: setup from €1,500; 1C/docs/telephony from €3,000; AI contour from €5,000.",
    about: "Bidirectional integrations, webhooks, retry and monitoring. Portal and data stay with you.",
    salesNotes: "from €1,500",
    deliveryDays: 21,
    price: 1500,
    serviceImage: IMAGES["crm-integration"],
  },
  {
    id: "ai-sales-loop",
    slug: "ai-sales-loop",
    title: "AI sales loop",
    description:
      "Telephony, chats, CRM and automatic next actions — AI contour on Bitrix24/amoCRM.",
    about:
      "Lead qualification, call summaries, tasks, follow-up and lost-deal reports. From €5,000.",
    salesNotes: "from €5,000",
    deliveryDays: 21,
    price: 5000,
    serviceImage: IMAGES["ai-sales-loop"],
  },
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
      "/automation catalog + commercial offer. AI only where it removes manual work. NDA, on-prem, Russia & CIS.",
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
    title: "ИИ-агент для отдела продаж",
    description: "Лиды, CRM, коммерческие предложения, дожим — PDF за минуты, не за часы.",
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
    description: "Компания по внедрению ИИ: фиксированная стоимость, сроки, интеграция с CRM и 1С — промышленный запуск, не демо-чат.",
    about: "Смета и сроки до старта, LLM и агенты, интеграции CRM/1С, промышленный запуск и передача команде. Москва и удалённо.",
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
  "crm-integration",
  "ocr",
  "voice-ai",
  "ai-sales-loop",
  "business-process-automation",
  "document-processing",
  "ai-discovery-roadmap",
  "crm-quote-offers",
  "ai-inbound-calls",
  "rag",
  "wildberries-independent-sales-channel",
  "secure-private-ai-cloud",
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
      "Jarayon va huquqlar xaritasi, firma skills va nostandart konektorlar, sifat/xavfsizlik testlari, HITL, 1С/legacy; Yandex AI Studio vs private/on-premise.",
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
    description: "Bitrix24 + ИИ: portal, avtomatlashtirish, 1С, telefoniya, hujjatlar va savdo ИИ konturi.",
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

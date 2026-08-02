import type { LandingSpec } from "@/lib/seo-catalog/types";

/**
 * High buyer-intent landings from Wordstat.
 * Live purchase-intent refresh 2026-08-02: data/wordstat-purchase-intent-decisions.json
 * Tier 1 vendor + Tier 2 budget lead; prefer компания/стоимость/под ключ/Москва over bare «ИИ для бизнеса».
 */
export const CATALOG_LANDING_SPECS_INTENT: LandingSpec[] = [
  {
    category: "ai",
    slug: "ai-implementation",
    contentKey: "intent_ai_implementation",
    cluster: "ai-corporate",
    serviceSlug: "enterprise-ai-assistant",
    coverImage: "/diagrams/system-architecture.svg",
    keywords: [
      "компания по внедрению ии",
      "стоимость внедрения ии",
      "компании по разработке ии",
      "внедрение ии москва",
      "внедрение ии под ключ",
      "внедрение ии в бизнес под ключ",
      "сколько стоит внедрить ии",
      "бюджет внедрения ии",
      "сроки внедрения ии",
      "заказать внедрение ии",
      "интегратор искусственного интеллекта",
      "внедрение ии в бизнес",
      "услуги по внедрению ии",
      "интеграция ии с 1с",
      "интеграция ии с crm",
    ],
    caseStudySlugs: ["kaspersky-ai-assistant", "yandex-telemost-agent"],
    related: [
      { href: "/ii-dlya-biznesa", labelRu: "ИИ для бизнеса", labelEn: "AI for business" },
      { href: "/services/ai-discovery-roadmap", labelRu: "AI-аудит и смета", labelEn: "AI audit & estimate" },
      { href: "/ai/corporate-neural-net", labelRu: "Корпоративная нейросеть", labelEn: "Corporate neural net" },
      { href: "/integrations/ai-for-crm", labelRu: "ИИ для CRM / 1С", labelEn: "AI for CRM / 1C" },
      { href: "/automation/sales-department", labelRu: "ИИ в отдел продаж", labelEn: "AI for sales" },
      { href: "/solutions/rag-search", labelRu: "RAG под ключ", labelEn: "RAG turnkey" },
    ],
    ru: {
      h1: "Компания по внедрению ИИ",
      subtitle:
        "Заказать внедрение ИИ под ключ: фиксированная стоимость, сроки и production-контур. Москва и удалённо — от аудита до запуска в CRM и 1С.",
      problems: [
        "Нужна компания по внедрению ИИ, а не курс и не демо-чат",
        "Неясны стоимость внедрения ИИ, бюджет и сроки до production",
        "Пилоты не доходят до CRM, 1С и реальных заявок",
        "Нужен интегратор искусственного интеллекта с критериями приёмки",
      ],
      deliverables: [
        "Смета и сроки внедрения ИИ до старта разработки",
        "Один приоритетный процесс: продажи, заявки или документы",
        "Интеграция ИИ с CRM / 1С и production-пилот 2–6 недель",
        "Документация, обучение, передача команде — внедрение под ключ",
      ],
      howWeSolve: [
        {
          title: "Смета и бюджет",
          text: "Считаем стоимость внедрения ИИ и окупаемость до кода. Аудит — от 150 000 ₽; пакет внедрения — от 500 000 ₽.",
        },
        {
          title: "Интеграции в процессы",
          text: "Связываем ИИ с CRM, 1С, почтой и заявками — не «чат ради чата», а шаг в воронке с KPI.",
        },
        {
          title: "Запуск под ключ",
          text: "Production, сроки внедрения, обучение и поддержка. Москва или удалённо — одна команда-интегратор.",
        },
      ],
      intro: [
        "В поиске лидируют запросы «компания по внедрению ИИ» и «стоимость внедрения ИИ» — вы ищете исполнителя и бюджет, не теорию.",
        "Bober AI Systems — интегратор: заказать внедрение ИИ под ключ с фиксированной сметой, сроками и приёмкой.",
        "Стартуем с одного сценария (часто отдел продаж или документы), подключаем CRM/1С, выводим в production за 2–6 недель.",
      ],
      faq: [
        {
          q: "Сколько стоит внедрить ИИ?",
          a: "Стоимость внедрения ИИ: аудит и дорожная карта — от 150 000 ₽. Внедрение одного процесса под ключ — обычно от 500 000 ₽ (интеграции, пилот, передача). Бюджет внедрения ИИ фиксируем в смете до старта.",
        },
        {
          q: "Какие сроки внедрения ИИ?",
          a: "Аудит — 1–2 недели. Production-пилот одного контура — обычно 2–6 недель. Сроки внедрения ИИ пишем в договоре вместе с критериями приёмки.",
        },
        {
          q: "Вы компания по внедрению или только консалтинг?",
          a: "Компания по внедрению и разработке ИИ: аудит → архитектура → production. Клиент получает работающий контур в CRM/1С, не только презентацию.",
        },
        {
          q: "Делаете внедрение ИИ в Москве?",
          a: "Да — внедрение ИИ Москва и удалённо по РФ. Выезд по согласованию; основная поставка — удалённый production с доступом к вашим системам.",
        },
        {
          q: "Можно заказать внедрение ИИ под ключ сразу?",
          a: "Да. Пакет «под ключ»: сценарий, интеграции, запуск, обучение. Если бюджет ещё не ясен — начнём с аудита и сметы за 1–2 недели.",
        },
      ],
    },
    en: {
      h1: "AI implementation company",
      subtitle:
        "Order turnkey AI implementation: fixed price, timeline, production contour. Moscow and remote — audit to CRM/1C launch.",
      problems: [
        "You need an AI implementation vendor, not a course or demo chat",
        "AI implementation cost, budget and go-live dates are unclear",
        "Pilots never reach CRM, 1C and real intake",
        "You need an AI integrator with acceptance criteria",
      ],
      deliverables: [
        "Price and timeline before build starts",
        "One priority process: sales, intake or documents",
        "AI × CRM / 1C integration and 2–6 week production pilot",
        "Docs, training, handover — turnkey delivery",
      ],
      howWeSolve: [
        {
          title: "Budget first",
          text: "We lock AI implementation cost and ROI before code. Audit from a fixed entry package; turnkey delivery from the full package.",
        },
        {
          title: "Process integrations",
          text: "Wire AI into CRM, 1C, mail and intake — a funnel step with KPI, not chat for chat’s sake.",
        },
        {
          title: "Turnkey launch",
          text: "Production, timeline, training and support. Moscow or remote — one integrator team.",
        },
      ],
      intro: [
        "Buyers search for an AI implementation company and price — not theory.",
        "We are the integrator: turnkey AI with fixed estimate, dates and acceptance.",
        "One scenario first (often sales or documents), CRM/1C wired, production in 2–6 weeks.",
      ],
      faq: [
        {
          q: "What does AI implementation cost?",
          a: "Audit/roadmap from a fixed entry package; turnkey process delivery typically from the full package depending on integrations. Budget is locked before build.",
        },
        {
          q: "How long does it take?",
          a: "Audit 1–2 weeks. Production pilot of one contour usually 2–6 weeks, written into the contract with acceptance criteria.",
        },
        {
          q: "Vendor or consulting only?",
          a: "Implementation and build: audit → architecture → production. You get a working CRM/1C contour, not only slides.",
        },
        {
          q: "Moscow delivery?",
          a: "Yes — Moscow and remote across Russia. On-site by agreement; default is remote production with access to your systems.",
        },
        {
          q: "Can we order turnkey AI immediately?",
          a: "Yes. Turnkey package: scenario, integrations, launch, training. If budget is unclear — start with a 1–2 week audit and estimate.",
        },
      ],
    },
  },
  {
    category: "automation",
    slug: "company-automation",
    contentKey: "intent_company_automation",
    cluster: "automation-processes",
    serviceSlug: "business-process-automation",
    coverImage: "/diagrams/workflow-automation.svg",
    keywords: [
      "автоматизация компании",
      "автоматизация процессов компания",
      "компания автоматизация бизнеса",
      "внедрение автоматизации в компании",
      "автоматизация работы компании",
      "автоматизация бизнес процессов",
      "автоматизация бизнес процессов цена",
      "заказать автоматизацию бизнеса",
    ],
    caseStudySlugs: ["elia-suite", "crm-telegram-sheets"],
    related: [
      { href: "/automation/processes", labelRu: "Сквозные workflow", labelEn: "End-to-end workflow" },
      { href: "/automation/process-audit", labelRu: "Аудит процессов", labelEn: "Process audit" },
      { href: "/ai/ai-implementation", labelRu: "Внедрение ИИ", labelEn: "AI implementation" },
      { href: "/automation/sales-department", labelRu: "Отдел продаж", labelEn: "Sales department" },
    ],
    ru: {
      h1: "Автоматизация компании",
      subtitle:
        "Автоматизация компании: процессы, CRM, документы и отчёты без ручного копирования. Фиксированная смета и ROI до старта.",
      problems: [
        "Процессы держатся на чатах и таблицах",
        "Нет единого статуса заявки или сделки",
        "Руководитель видит факты с опозданием",
        "Масштабирование упирается в найм, а не в систему",
      ],
      deliverables: [
        "Аудит 1–2 процессов с расчётом часов",
        "Workflow и интеграции CRM / документы / 1С",
        "Production-запуск с мониторингом",
        "Регламент и обучение команды",
      ],
      intro: [
        "«Автоматизация компании» в поиске — запрос на работающую систему, не на курс по Python.",
        "Берём узкое место (продажи, заявки, документы) и закрываем его end-to-end.",
        "AI подключаем только там, где ускоряет конкретный шаг.",
      ],
      faq: [
        {
          q: "С чего начать автоматизацию компании?",
          a: "С аудита одного процесса с понятным KPI: время на заявку, ошибки, конверсия.",
        },
        {
          q: "Какая цена?",
          a: "Аудит — от 150 000 ₽. Пилот автоматизации — обычно от 300–500 000 ₽.",
        },
        {
          q: "Нужен ли сразу ИИ?",
          a: "Часто нет. Сначала workflow и интеграции; ИИ — на рутину с текстом и классификацией.",
        },
      ],
    },
    en: {
      h1: "Company automation",
      subtitle:
        "Company automation: processes, CRM, documents and reporting without manual copy-paste. Fixed estimate and ROI before build.",
      problems: [
        "Processes live in chats and spreadsheets",
        "No single status for a request or deal",
        "Leaders see facts too late",
        "Growth depends on hiring, not on systems",
      ],
      deliverables: [
        "Audit of 1–2 processes with hour math",
        "Workflow and CRM / docs / ERP integrations",
        "Production launch with monitoring",
        "Playbook and team training",
      ],
      intro: [
        "“Company automation” search intent means a working system — not a coding course.",
        "We close one bottleneck end-to-end: sales, intake, or documents.",
        "AI only where it speeds a concrete step.",
      ],
      faq: [
        {
          q: "Where to start?",
          a: "Audit one process with a clear KPI: cycle time, errors, conversion.",
        },
        {
          q: "Budget?",
          a: "Audit from a fixed entry package; automation pilots typically mid five figures.",
        },
        {
          q: "Is AI required?",
          a: "Often not. Workflow and integrations first; AI for text and classification later.",
        },
      ],
    },
  },
  {
    category: "automation",
    slug: "ai-business-automation",
    contentKey: "intent_ai_business_automation",
    cluster: "automation-processes",
    serviceSlug: "business-process-automation",
    coverImage: "/diagrams/workflow-automation.svg",
    keywords: [
      "автоматизация бизнеса с помощью ии",
      "автоматизация бизнес процессов с помощью ии",
      "ии автоматизация бизнес процессов",
      "автоматизация бизнеса через ии",
      "ai автоматизация",
    ],
    related: [
      { href: "/ai/ai-implementation", labelRu: "Внедрение ИИ", labelEn: "AI implementation" },
      { href: "/automation/company-automation", labelRu: "Автоматизация компании", labelEn: "Company automation" },
      { href: "/automation/ai-for-sales", labelRu: "AI для продаж", labelEn: "AI for sales" },
    ],
    ru: {
      h1: "Автоматизация бизнеса с помощью ИИ",
      subtitle:
        "Автоматизация бизнеса с помощью ИИ: заявки, документы, продажи и поддержка — с KPI и фиксированной сметой.",
      problems: [
        "ИИ обсуждают, а рутина остаётся на людях",
        "Нет связки LLM с CRM и файлами",
        "Страх утечки данных во внешние чаты",
        "Непонятно, какой процесс автоматизировать первым",
      ],
      deliverables: [
        "Выбор 1 процесса с измеримым эффектом",
        "Интеграции + AI-слой там, где нужно",
        "Пилот в production",
        "Контроль качества и handover",
      ],
      intro: [
        "Коммерческая формулировка: автоматизация бизнеса с помощью ИИ — не «что такое нейросеть».",
        "Сначала процесс и данные, затем модель. Иначе пилот умирает в презентации.",
      ],
      faq: [
        {
          q: "Чем отличается от обычной автоматизации?",
          a: "Workflow и интеграции закрывают правила; ИИ — неструктурированный текст, классификацию, черновики.",
        },
        {
          q: "Какие процессы лучше всего?",
          a: "Обработка заявок, документы, КП, первая линия поддержки, квалификация лидов.",
        },
        {
          q: "Срок?",
          a: "Пилот 2–6 недель на один контур.",
        },
      ],
    },
    en: {
      h1: "Business automation with AI",
      subtitle:
        "Business automation with AI: intake, documents, sales and support — with KPIs and a fixed estimate.",
      problems: [
        "AI is discussed while routine stays manual",
        "No link between LLM, CRM and files",
        "Fear of leaking data to public chats",
        "Unclear which process to automate first",
      ],
      deliverables: [
        "One process with measurable impact",
        "Integrations + AI only where needed",
        "Production pilot",
        "Quality control and handover",
      ],
      intro: [
        "This query is commercial: automation with AI, not “what is a neural net”.",
        "Process and data first, then the model.",
      ],
      faq: [
        {
          q: "How is this different from plain automation?",
          a: "Workflow covers rules; AI covers unstructured text, classification and drafts.",
        },
        {
          q: "Best first processes?",
          a: "Request intake, documents, proposals, first-line support, lead qualification.",
        },
        {
          q: "Timeline?",
          a: "2–6 weeks for one contour.",
        },
      ],
    },
  },
  {
    category: "automation",
    slug: "document-ai",
    contentKey: "intent_document_ai",
    cluster: "automation-documents",
    serviceSlug: "document-processing",
    coverImage: "/diagrams/document-flow.svg",
    keywords: [
      "ии для обработки документов",
      "автоматизация обработки документов",
      "автоматизации обработки документов",
      "автоматизация документооборота",
      "автоматизация обработки pdf",
    ],
    caseStudySlugs: ["kp-llm-automation"],
    related: [
      { href: "/automation/documents", labelRu: "Документооборот", labelEn: "Documents" },
      { href: "/automation/ocr-data-extraction", labelRu: "OCR", labelEn: "OCR" },
      { href: "/solutions/rag-search", labelRu: "RAG-поиск", labelEn: "RAG search" },
    ],
    ru: {
      h1: "ИИ для обработки документов",
      subtitle:
        "ИИ для обработки документов: извлечение полей, классификация, маршруты в CRM/1С. Меньше ручного ввода.",
      problems: [
        "PDF и сканы разбирают вручную",
        "Ошибки в полях и дубли в CRM",
        "Согласования теряются в почте",
        "Нет связи документа со сделкой",
      ],
      deliverables: [
        "Пайплайн OCR / LLM под ваши типы файлов",
        "Валидация и выгрузка в CRM или 1С",
        "Маршруты согласования",
        "Метрики ошибок и времени обработки",
      ],
      intro: [
        "Сильный коммерческий спрос: автоматизация обработки документов и ИИ для документов.",
        "Не «умный чат», а конвейер: файл → поля → система учёта.",
      ],
      faq: [
        {
          q: "Какие документы?",
          a: "Счета, акты, договоры, заявки PDF, КП, паспортные пакеты — по согласованным шаблонам.",
        },
        {
          q: "Нужен ли OCR?",
          a: "Для сканов — да. Для цифровых PDF часто достаточно парсинга + LLM.",
        },
        {
          q: "Бюджет пилота?",
          a: "Обычно от 300 000 ₽ на один тип документа и интеграцию.",
        },
      ],
    },
    en: {
      h1: "AI for document processing",
      subtitle:
        "AI for document processing: field extraction, classification, routes into CRM/ERP. Less manual entry.",
      problems: [
        "PDFs and scans are handled manually",
        "Field errors and CRM duplicates",
        "Approvals get lost in email",
        "Documents are not linked to deals",
      ],
      deliverables: [
        "OCR/LLM pipeline for your file types",
        "Validation and export to CRM or ERP",
        "Approval routes",
        "Error and cycle-time metrics",
      ],
      intro: [
        "Strong commercial demand for document processing automation.",
        "Not a smart chat — a pipeline: file → fields → system of record.",
      ],
      faq: [
        {
          q: "Which documents?",
          a: "Invoices, acts, contracts, PDF requests, proposals — by agreed templates.",
        },
        {
          q: "Is OCR required?",
          a: "For scans — yes. For digital PDFs, parsing + LLM is often enough.",
        },
        {
          q: "Pilot budget?",
          a: "Typically from a mid-market package for one document type and integration.",
        },
      ],
    },
  },
  {
    category: "automation",
    slug: "routine-tasks",
    contentKey: "intent_routine_tasks",
    cluster: "automation-processes",
    serviceSlug: "business-process-automation",
    coverImage: "/diagrams/workflow-automation.svg",
    keywords: [
      "автоматизация рутинных задач",
      "автоматизация ручных процессов",
      "ии автоматизация рутинных задач",
      "reduce manual work",
    ],
    related: [
      { href: "/automation/reduce-manual-work", labelRu: "Меньше ручной работы", labelEn: "Less manual work" },
      { href: "/automation/request-intake", labelRu: "Обработка заявок", labelEn: "Request intake" },
      { href: "/automation/company-automation", labelRu: "Автоматизация компании", labelEn: "Company automation" },
    ],
    ru: {
      h1: "Автоматизация рутинных задач",
      subtitle:
        "Автоматизация рутинных задач: копипаст, напоминания, разбор писем и файлов — без найма «ещё одного оператора».",
      problems: [
        "Сотрудники тратят дни на повторяющиеся действия",
        "Ошибки из-за усталости и копипаста",
        "Рутина мешает продажам и экспертизе",
        "Скрипты «на коленке» без мониторинга",
      ],
      deliverables: [
        "Список рутинных задач с оценкой часов",
        "Workflow / n8n / CRM-роботы",
        "AI только на текстовую рутину",
        "Алерты и регламент поддержки",
      ],
      intro: [
        "Запрос близок к «reduce manual work»: убрать ручные процессы, а не купить ещё один чат-бот.",
        "Начинаем с задач, которые повторяются ежедневно и имеют чёткие правила.",
      ],
      faq: [
        {
          q: "Что автоматизировать первым?",
          a: "То, что занимает больше 5–10 часов в неделю и уже описано правилами.",
        },
        {
          q: "Python или no-code?",
          a: "Зависит от стека. Часто n8n + CRM; кастом — где нужны сложные правила.",
        },
        {
          q: "Срок?",
          a: "1–3 недели на один пакет рутинных задач.",
        },
      ],
    },
    en: {
      h1: "Routine task automation",
      subtitle:
        "Routine task automation: copy-paste, reminders, mail and file triage — without hiring another operator.",
      problems: [
        "People spend days on repetitive actions",
        "Errors from fatigue and copy-paste",
        "Routine blocks sales and expertise",
        "Ad-hoc scripts without monitoring",
      ],
      deliverables: [
        "Routine task list with hour estimates",
        "Workflow / n8n / CRM robots",
        "AI only for text routine",
        "Alerts and support playbook",
      ],
      intro: [
        "Intent is reduce manual work — not another chatbot.",
        "Start with daily tasks that already have clear rules.",
      ],
      faq: [
        {
          q: "What first?",
          a: "Anything taking 5–10+ hours/week with known rules.",
        },
        {
          q: "Python or no-code?",
          a: "Depends on stack. Often n8n + CRM; custom code for complex rules.",
        },
        {
          q: "Timeline?",
          a: "1–3 weeks for one routine pack.",
        },
      ],
    },
  },
  {
    category: "integrations",
    slug: "crm-automation",
    contentKey: "intent_crm_automation",
    cluster: "crm",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/crm-integration.svg",
    keywords: [
      "автоматизация crm",
      "система автоматизации crm",
      "crm автоматизация",
      "crm автоматизация процессов",
      "crm автоматизация бизнеса",
      "crm автоматизации бизнес процессов",
      "crm системы автоматизация бизнес процессов",
      "crm система автоматизация бизнеса",
      "комплексная автоматизация crm",
      "внедрение crm с искусственным интеллектом",
      "автоматизация воронки продаж",
      "внедрение crm",
      "внедрение crm системы",
      "интеграция crm",
      "интеграция с crm",
      "интеграция crm систем",
      "настройка crm под ключ",
    ],
    related: [
      { href: "/integrations/crm", labelRu: "Внедрение CRM", labelEn: "CRM implementation" },
      { href: "/integrations/ai-for-crm", labelRu: "ИИ для CRM", labelEn: "AI for CRM" },
      { href: "/integrations/bitrix24-ai", labelRu: "AI для Bitrix24", labelEn: "AI for Bitrix24" },
      { href: "/integrations/amocrm-ai", labelRu: "AI для amoCRM", labelEn: "AI for amoCRM" },
    ],
    ru: {
      h1: "Автоматизация CRM",
      subtitle:
        "Автоматизация CRM: стадии, роботы, заявки с сайта и мессенджеров, отчёты без ручного ввода.",
      problems: [
        "CRM заполняют «когда вспомнят»",
        "Заявки теряются между сайтом и менеджером",
        "Нет роботов и эскалаций",
        "Руководитель не видит воронку в реальном времени",
      ],
      deliverables: [
        "Воронка, поля, права",
        "Роботы и интеграции источников",
        "Дашборды и контроль дисциплины",
        "Обучение отдела продаж",
      ],
      intro: [
        "«Автоматизация CRM» — отдельный коммерческий запрос, не общая «автоматизация бизнеса».",
        "Сначала дисциплина данных в CRM, затем AI-слой.",
      ],
      faq: [
        {
          q: "Bitrix24 или amoCRM?",
          a: "Зависит от текущего стека и команды. Поддерживаем оба + связку с 1С.",
        },
        {
          q: "Нужен ли ИИ сразу?",
          a: "Сначала роботы и интеграции. ИИ — на квалификацию, саммари, КП.",
        },
        {
          q: "Срок?",
          a: "Базовая автоматизация CRM — 2–4 недели; с AI-слоем — дольше.",
        },
      ],
    },
    en: {
      h1: "CRM automation",
      subtitle:
        "CRM automation: stages, robots, website/messenger intake, reporting without manual entry.",
      problems: [
        "CRM is filled “when people remember”",
        "Leads get lost between site and manager",
        "No robots or escalations",
        "Leaders lack a live pipeline view",
      ],
      deliverables: [
        "Pipeline, fields, permissions",
        "Robots and source integrations",
        "Dashboards and data hygiene",
        "Sales team training",
      ],
      intro: [
        "“CRM automation” is a distinct commercial query.",
        "Data discipline in CRM first, then an AI layer.",
      ],
      faq: [
        {
          q: "Bitrix24 or amoCRM?",
          a: "Depends on your stack and team. We support both plus 1C links.",
        },
        {
          q: "AI immediately?",
          a: "Robots and integrations first. AI for qualification, summaries, proposals.",
        },
        {
          q: "Timeline?",
          a: "Base CRM automation 2–4 weeks; longer with AI.",
        },
      ],
    },
  },
  {
    category: "integrations",
    slug: "ai-for-crm",
    contentKey: "intent_ai_for_crm",
    cluster: "crm",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/crm-integration.svg",
    keywords: [
      "ии для crm",
      "интеграция ии в crm",
      "ai ассистент для crm",
      "ai crm и автоматизации",
      "интеграция искусственного интеллекта",
    ],
    related: [
      { href: "/integrations/crm-automation", labelRu: "Автоматизация CRM", labelEn: "CRM automation" },
      { href: "/integrations/crm-sales-automation", labelRu: "Продажи в CRM", labelEn: "CRM sales" },
      { href: "/integrations/bitrix24-ai", labelRu: "AI для Bitrix24", labelEn: "AI for Bitrix24" },
      { href: "/solutions/assistant", labelRu: "AI-ассистент", labelEn: "AI assistant" },
    ],
    ru: {
      h1: "ИИ для CRM",
      subtitle:
        "ИИ для CRM: ассистент в карточке сделки, квалификация лидов, черновики писем и КП. Без хаоса в воронке.",
      problems: [
        "Менеджеры вручную пишут одни и те же письма",
        "Лиды не квалифицируются вовремя",
        "История переписки не попадает в CRM",
        "Нет контроля качества AI-ответов",
      ],
      deliverables: [
        "Сценарии AI внутри CRM",
        "Интеграция с почтой / телефонией / мессенджерами",
        "Правила эскалации к человеку",
        "Логи и метрики качества",
      ],
      intro: [
        "Отдельный intent: «ИИ для CRM» и «интеграция ИИ в CRM» — не общая автоматизация.",
        "AI пишет черновики и классифицирует; решение и ответственность остаются у менеджера.",
      ],
      faq: [
        {
          q: "Какие CRM?",
          a: "Bitrix24, amoCRM и кастом через API/webhook.",
        },
        {
          q: "Данные уходят наружу?",
          a: "Можно облако с политиками или закрытый контур — по требованиям безопасности.",
        },
        {
          q: "С чего пилот?",
          a: "Один сценарий: саммари звонка, квалификация лида или черновик КП.",
        },
      ],
    },
    en: {
      h1: "AI for CRM",
      subtitle:
        "AI for CRM: in-deal assistant, lead qualification, email and proposal drafts — without pipeline chaos.",
      problems: [
        "Managers rewrite the same emails",
        "Leads are not qualified in time",
        "Chat history never reaches CRM",
        "No quality control for AI answers",
      ],
      deliverables: [
        "AI scenarios inside CRM",
        "Mail / telephony / messenger integrations",
        "Human escalation rules",
        "Logs and quality metrics",
      ],
      intro: [
        "Distinct intent: AI for CRM — not generic automation.",
        "AI drafts and classifies; humans keep decisions.",
      ],
      faq: [
        {
          q: "Which CRMs?",
          a: "Bitrix24, amoCRM, and custom via API/webhook.",
        },
        {
          q: "Where does data go?",
          a: "Cloud with policies or a private contour — by security needs.",
        },
        {
          q: "Pilot first step?",
          a: "One scenario: call summary, lead scoring, or proposal draft.",
        },
      ],
    },
  },
  {
    category: "ai",
    slug: "corporate-neural-net",
    contentKey: "intent_corporate_neural_net",
    cluster: "ai-corporate",
    serviceSlug: "private-llm-gigachat",
    coverImage: "/diagrams/system-architecture.svg",
    keywords: [
      "корпоративная нейросеть",
      "корпоративный ии ассистент",
      "частная нейросеть для компании",
      "локальная нейросеть для бизнеса",
      "локальная llm для компании",
      "ии в закрытом контуре",
      "нейросеть в закрытом контуре",
    ],
    related: [
      { href: "/ai/private-llm", labelRu: "Приватный LLM", labelEn: "Private LLM" },
      { href: "/ai/corporate", labelRu: "Корпоративный ИИ", labelEn: "Enterprise AI" },
      { href: "/solutions/assistant", labelRu: "AI-ассистент", labelEn: "AI assistant" },
      { href: "/solutions/knowledge-chatbot", labelRu: "Чат-бот по базе знаний", labelEn: "Knowledge chatbot" },
    ],
    ru: {
      h1: "Корпоративная нейросеть и ИИ-ассистент",
      subtitle:
        "Корпоративная нейросеть и корпоративный ИИ-ассистент в вашем контуре: без утечки данных во внешние чаты.",
      problems: [
        "Сотрудники копируют данные в публичные чаты",
        "Нужен единый ассистент по регламентам",
        "Требования 152-ФЗ и NDA",
        "Облачные модели нельзя для части контента",
      ],
      deliverables: [
        "Архитектура закрытого контура",
        "Модели, политики доступа, SSO",
        "Интеграция с базой знаний / CRM",
        "Мониторинг и runbook",
      ],
      intro: [
        "«Корпоративная нейросеть» и «корпоративный ИИ-ассистент» — B2B-запросы на приватный контур.",
        "Это не потребительский чат, а корпоративный инструмент с правами и аудитом.",
      ],
      faq: [
        {
          q: "On-prem или VPC?",
          a: "Оба варианта. Выбор по чувствительности данных и IT-политике.",
        },
        {
          q: "Какие модели?",
          a: "GigaChat, YandexGPT, open-source, Claude через разрешённый контур — по задаче.",
        },
        {
          q: "Срок?",
          a: "Базовый контур 3–6 недель; с RAG и CRM — дольше.",
        },
      ],
    },
    en: {
      h1: "Corporate neural net & AI assistant",
      subtitle:
        "Corporate neural net and enterprise AI assistant in your perimeter — without leaking data to public chats.",
      problems: [
        "Staff paste data into public chats",
        "Need one assistant over policies",
        "Compliance and NDA requirements",
        "Cloud models blocked for some content",
      ],
      deliverables: [
        "Private contour architecture",
        "Models, access policies, SSO",
        "Knowledge base / CRM integration",
        "Monitoring and runbook",
      ],
      intro: [
        "B2B intent for a private corporate assistant — not a consumer chatbot.",
        "Permissions and audit are part of the product.",
      ],
      faq: [
        {
          q: "On-prem or VPC?",
          a: "Both. Choice depends on data sensitivity and IT policy.",
        },
        {
          q: "Which models?",
          a: "GigaChat, YandexGPT, open-source, Claude via approved contour — by task.",
        },
        {
          q: "Timeline?",
          a: "Base contour 3–6 weeks; longer with RAG and CRM.",
        },
      ],
    },
  },
  {
    category: "solutions",
    slug: "knowledge-chatbot",
    contentKey: "intent_knowledge_chatbot",
    cluster: "knowledge-base",
    serviceSlug: "enterprise-ai-assistant",
    coverImage: "/diagrams/system-architecture.svg",
    keywords: [
      "чат бот по базе знаний компании",
      "ии ассистент по базе знаний",
      "корпоративная база знаний с ии",
      "локальный чат бот для компании",
      "rag для бизнеса",
    ],
    related: [
      { href: "/solutions/rag-search", labelRu: "RAG-поиск", labelEn: "RAG search" },
      { href: "/automation/knowledge-base", labelRu: "База знаний", labelEn: "Knowledge base" },
      { href: "/services/rag", labelRu: "Корпоративный RAG", labelEn: "Corporate RAG" },
      { href: "/ai/corporate-neural-net", labelRu: "Корпоративная нейросеть", labelEn: "Corporate neural net" },
    ],
    ru: {
      h1: "Чат-бот по базе знаний компании",
      subtitle:
        "Чат-бот по базе знаний компании: ответы со ссылкой на регламент. Для сотрудников и клиентов.",
      problems: [
        "Одни и те же вопросы к экспертам",
        "Регламенты в папках, никто не ищет",
        "Бот выдумывает ответы без источника",
        "Нет разделения доступа к документам",
      ],
      deliverables: [
        "Индексация базы знаний",
        "RAG с цитатами источников",
        "Права доступа и эскалация",
        "Интеграция в Telegram / сайт / CRM",
      ],
      intro: [
        "Связка «чат-бот + база знаний + RAG» — типовой B2B-запрос с высоким чеком.",
        "Ответ без источника не принимаем в production.",
      ],
      faq: [
        {
          q: "Чем отличается от обычного бота?",
          a: "Отвечает по вашим документам со ссылкой на фрагмент, а не по общим знаниям модели.",
        },
        {
          q: "Где хостить?",
          a: "Облако или закрытый контур — по политике данных.",
        },
        {
          q: "Срок пилота?",
          a: "2–4 недели на один корпус документов и канал.",
        },
      ],
    },
    en: {
      h1: "Company knowledge-base chatbot",
      subtitle:
        "Knowledge-base chatbot: answers with policy citations — for staff and customers.",
      problems: [
        "Experts answer the same questions",
        "Policies live in folders nobody searches",
        "Bots invent answers without sources",
        "No access control on documents",
      ],
      deliverables: [
        "Knowledge base indexing",
        "RAG with source citations",
        "Access rights and escalation",
        "Telegram / site / CRM integration",
      ],
      intro: [
        "Chatbot + knowledge base + RAG is a high-ticket B2B pattern.",
        "Answers without sources do not ship to production.",
      ],
      faq: [
        {
          q: "Difference from a normal bot?",
          a: "It answers from your documents with citations — not general model knowledge.",
        },
        {
          q: "Where to host?",
          a: "Cloud or private contour — by data policy.",
        },
        {
          q: "Pilot length?",
          a: "2–4 weeks for one corpus and channel.",
        },
      ],
    },
  },
  {
    category: "automation",
    slug: "business-process-audit",
    contentKey: "intent_business_process_audit",
    cluster: "automation-processes",
    serviceSlug: "ai-discovery-roadmap",
    coverImage: "/diagrams/workflow-automation.svg",
    keywords: [
      "аудит бизнес процессов",
      "аудит автоматизации бизнеса",
      "аудит процессов компании",
      "аудит бизнес процессов стоимость",
      "анализ автоматизации бизнес процессов",
    ],
    related: [
      { href: "/automation/process-audit", labelRu: "Аудит процессов", labelEn: "Process audit" },
      { href: "/ai/ai-audit", labelRu: "AI-аудит", labelEn: "AI audit" },
      { href: "/automation/company-automation", labelRu: "Автоматизация компании", labelEn: "Company automation" },
      { href: "/ai/ai-implementation", labelRu: "Внедрение ИИ", labelEn: "AI implementation" },
    ],
    ru: {
      h1: "Аудит бизнес-процессов и автоматизации",
      subtitle:
        "Аудит бизнес-процессов и автоматизации: карта потерь, приоритеты, смета пилота. До закупки разработки.",
      problems: [
        "Неясно, что автоматизировать первым",
        "Вендоры продают платформу без боли",
        "Нет цифр по часам и деньгам",
        "Пилоты выбирают наугад",
      ],
      deliverables: [
        "Карта процессов и узких мест",
        "Приоритеты с ROI",
        "Дорожная карта на 90 дней",
        "Смета пилота и критерии приёмки",
      ],
      intro: [
        "«Аудит бизнес процессов» (~570) — сильный buyer intent перед внедрением.",
        "Это вход в проект автоматизации или внедрения ИИ, а не отдельная «консалтинговая полка».",
      ],
      faq: [
        {
          q: "Сколько стоит аудит?",
          a: "От 150 000 ₽. Стоимость аудита засчитывается в проект внедрения, если идёте дальше.",
        },
        {
          q: "Срок?",
          a: "1–2 недели на 1–2 процесса.",
        },
        {
          q: "Нужен ли доступ к системам?",
          a: "Желателен: CRM, примеры документов, интервью с владельцами процессов.",
        },
      ],
    },
    en: {
      h1: "Business process & automation audit",
      subtitle:
        "Business process and automation audit: loss map, priorities, pilot estimate — before you buy development.",
      problems: [
        "Unclear what to automate first",
        "Vendors sell platforms without pain points",
        "No hour/money numbers",
        "Pilots picked at random",
      ],
      deliverables: [
        "Process and bottleneck map",
        "Priorities with ROI",
        "90-day roadmap",
        "Pilot estimate and acceptance criteria",
      ],
      intro: [
        "Process audit is strong buyer intent before implementation.",
        "It is the entry to automation or AI delivery — not a consulting shelf alone.",
      ],
      faq: [
        {
          q: "Audit cost?",
          a: "From a fixed entry package; credited toward implementation if you proceed.",
        },
        {
          q: "Timeline?",
          a: "1–2 weeks for 1–2 processes.",
        },
        {
          q: "System access needed?",
          a: "Preferred: CRM, sample documents, interviews with process owners.",
        },
      ],
    },
  },
];

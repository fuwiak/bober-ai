import type { LandingSpec } from "@/lib/seo-catalog/types";

/**
 * amoCRM + AI buy-intent cluster (Wordstat 2026-08-05).
 * Source: data/wordstat-amocrm-ai-intent-seed-totals.json
 * Merge near-duplicates; skip zero-volume / brand-login noise.
 */
export const CATALOG_LANDING_SPECS_AMOCRM_WORDSTAT: LandingSpec[] = [
  {
    category: "integrations",
    slug: "amocrm-setup",
    contentKey: "amocrm_ws_setup",
    cluster: "amocrm",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/crm-integration.svg",
    keywords: [
      "настройка amocrm",
      "настроить amocrm",
      "настройка amoCRM",
      "настроить amoCRM",
      "заказать настройку amocrm",
    ],
    caseStudySlugs: ["amocrm-website-integration", "lead-generation"],
    related: [
      { href: "/integrations/amocrm", labelRu: "Интеграция amoCRM", labelEn: "amoCRM integration" },
      { href: "/integrations/amocrm-implementation", labelRu: "Внедрение amoCRM", labelEn: "amoCRM implementation" },
      { href: "/integrations/amocrm-automation", labelRu: "Автоматизация amoCRM", labelEn: "amoCRM automation" },
      { href: "/integrations/amocrm-pricing", labelRu: "Цена настройки amoCRM", labelEn: "amoCRM setup pricing" },
      { href: "/pricing", labelRu: "Стоимость", labelEn: "Pricing" },
    ],
    ru: {
      h1: "Настройка amoCRM",
      subtitle:
        "Настроить amoCRM под воронку продаж: поля, этапы, права, роботы и заявки с сайта. Фиксированная смета, пилот 2–4 недели.",
      problems: [
        "amoCRM купили, но воронка и поля не отражают процесс",
        "Нужно настроить amoCRM: этапы, права, обязательные поля",
        "Заявки и UTM не доходят до сделок",
        "Роботы слабые — менеджеры живут в чатах",
      ],
      deliverables: [
        "Карта воронки, полей и прав доступа",
        "Настройка этапов, роботов и уведомлений",
        "Приём лидов с сайта / рекламы в сделки",
        "Регламент и обучение команды",
      ],
      intro: [
        "Запросы «настройка amoCRM» и «настроить amoCRM» — про рабочий портал, а не про лицензию.",
        "Собираем воронку, поля и роботов под ваш процесс; интеграции и AI — отдельными пакетами.",
        "Базовая интеграция — /integrations/amocrm; полное внедрение — /integrations/amocrm-implementation.",
      ],
      faq: [
        {
          q: "Чем настройка отличается от внедрения?",
          a: "Настройка — воронка, поля, роботы внутри amoCRM. Внедрение — плюс интеграции, регламенты и приёмка под ключ.",
        },
        {
          q: "Срок и цена?",
          a: "Пилот настройки 2–4 недели. Бюджет от 150 000 ₽; с интеграциями обычно от 300 000 ₽.",
        },
        {
          q: "Можно заказать только настройку?",
          a: "Да. Сначала фиксируем воронку и роботов, потом при необходимости добавляем сайт, 1С или AI.",
        },
      ],
    },
    en: {
      h1: "amoCRM setup",
      subtitle:
        "Configure amoCRM for your sales pipeline: fields, stages, roles, robots and website intake. Fixed estimate; pilot 2–4 weeks.",
      problems: [
        "amoCRM is purchased but the pipeline does not match the process",
        "Stages, roles and required fields need setup",
        "Leads and UTMs do not become deals",
        "Weak robots — reps live in chats",
      ],
      deliverables: [
        "Pipeline, field and permission map",
        "Stages, robots and notifications",
        "Website / ads lead intake into deals",
        "Playbook and team training",
      ],
      intro: [
        "“amoCRM setup” means a working portal — not a license.",
        "We configure pipeline and robots first; integrations and AI as separate packages.",
      ],
      faq: [
        {
          q: "Setup vs implementation?",
          a: "Setup is pipeline and robots inside amoCRM. Implementation adds integrations, playbooks and turnkey acceptance.",
        },
        {
          q: "Timeline and price?",
          a: "2–4 week setup pilot. From a mid-market package; integrations usually raise the scope.",
        },
        {
          q: "Setup only?",
          a: "Yes. Pipeline first, then website, 1C or AI if needed.",
        },
      ],
    },
  },
  {
    category: "integrations",
    slug: "amocrm-implementation",
    contentKey: "amocrm_ws_implementation",
    cluster: "amocrm",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/crm-integration.svg",
    keywords: [
      "внедрение amocrm",
      "внедрить amocrm",
      "внедрение amoCRM",
      "внедрить amoCRM",
      "заказать внедрение amocrm",
      "amocrm услуги внедрения",
    ],
    caseStudySlugs: ["amocrm-website-integration", "kp-llm-automation"],
    related: [
      { href: "/integrations/amocrm-setup", labelRu: "Настройка amoCRM", labelEn: "amoCRM setup" },
      { href: "/integrations/amocrm-services", labelRu: "Услуги amoCRM", labelEn: "amoCRM services" },
      { href: "/integrations/amocrm-automation", labelRu: "Автоматизация amoCRM", labelEn: "amoCRM automation" },
      { href: "/integrations/amocrm-pricing", labelRu: "Стоимость внедрения", labelEn: "Implementation pricing" },
      { href: "/integrations/amocrm-ai", labelRu: "AI для amoCRM", labelEn: "AI for amoCRM" },
      { href: "/pricing", labelRu: "Цены", labelEn: "Pricing" },
    ],
    ru: {
      h1: "Внедрение amoCRM",
      subtitle:
        "Внедрить amoCRM под ключ: воронка, интеграции, регламенты и приёмка. Пилот от 300 000 ₽, 2–4 недели.",
      problems: [
        "Нужно внедрение amoCRM с нуля или перезапуск «мёртвого» портала",
        "Нет сметы, сроков и критериев приёмки",
        "Сайт, телефония и 1С не связаны со сделками",
        "Команда не пользуется CRM — процесс живёт в чатах",
      ],
      deliverables: [
        "Аудит процесса и смета внедрения до старта",
        "Воронка, поля, роботы и права",
        "Интеграции сайта / мессенджеров / учёта по приоритету",
        "Обучение, документация и приёмка под ключ",
      ],
      intro: [
        "Wordstat: «внедрение amoCRM» и «внедрить amoCRM» — коммерческий спрос на исполнителя и результат, не на обзор CRM.",
        "Bober AI Systems — интегратор: фиксированная смета, сроки и production-контур в amoCRM.",
        "Узкая настройка — /integrations/amocrm-setup; услуги и пакеты — /integrations/amocrm-services.",
      ],
      faq: [
        {
          q: "Сколько длится внедрение amoCRM?",
          a: "Аудит 1–2 недели. Пилот одной воронки — обычно 2–4 недели. Полный контур с интеграциями — 4–10 недель.",
        },
        {
          q: "Можно на уже купленной amoCRM?",
          a: "Да — чаще дорабатываем текущий портал, чем переносим на другую CRM.",
        },
        {
          q: "Что входит в «под ключ»?",
          a: "Воронка, интеграции по смете, обучение, критерии приёмки. AI-слой — отдельным пакетом при необходимости.",
        },
      ],
    },
    en: {
      h1: "amoCRM implementation",
      subtitle:
        "Implement amoCRM turnkey: pipeline, integrations, playbooks and acceptance. Pilot from mid-market package; 2–4 weeks.",
      problems: [
        "Need amoCRM from scratch or a restart of a dead portal",
        "No estimate, timeline or acceptance criteria",
        "Website, telephony and ERP are not linked to deals",
        "Team ignores CRM — process lives in chats",
      ],
      deliverables: [
        "Process audit and estimate before build",
        "Pipeline, fields, robots and roles",
        "Priority integrations: site / messengers / ledger",
        "Training, docs and turnkey acceptance",
      ],
      intro: [
        "“amoCRM implementation” is a buy request for an integrator and a working contour.",
        "We deliver a fixed estimate, timeline and production setup in amoCRM.",
      ],
      faq: [
        {
          q: "How long?",
          a: "Audit 1–2 weeks. One-pipeline pilot usually 2–4 weeks. Full contour with integrations 4–10 weeks.",
        },
        {
          q: "Keep existing amoCRM?",
          a: "Yes — we usually upgrade the current portal instead of migrating.",
        },
        {
          q: "What is turnkey?",
          a: "Pipeline, agreed integrations, training and acceptance. AI layer is optional.",
        },
      ],
    },
  },
  {
    category: "integrations",
    slug: "amocrm-services",
    contentKey: "amocrm_ws_services",
    cluster: "amocrm",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/crm-integration.svg",
    keywords: [
      "amocrm услуги",
      "услуги amocrm",
      "интегратор amocrm",
      "интегратор amoCRM",
      "amocrm под ключ",
      "подрядчик amocrm",
      "агентство amocrm",
    ],
    caseStudySlugs: ["amocrm-website-integration", "kp-llm-automation"],
    related: [
      { href: "/integrations/amocrm-implementation", labelRu: "Внедрение amoCRM", labelEn: "amoCRM implementation" },
      { href: "/integrations/amocrm-setup", labelRu: "Настройка amoCRM", labelEn: "amoCRM setup" },
      { href: "/integrations/amocrm-ai", labelRu: "AI для amoCRM", labelEn: "AI for amoCRM" },
      { href: "/integrations/amocrm-1c", labelRu: "amoCRM ↔ 1С", labelEn: "amoCRM ↔ 1C" },
      { href: "/integrations/amocrm-pricing", labelRu: "Цены на услуги", labelEn: "Service pricing" },
      { href: "/pricing", labelRu: "Форматы работ", labelEn: "Engagement formats" },
    ],
    ru: {
      h1: "Услуги amoCRM под ключ",
      subtitle:
        "Интегратор amoCRM: настройка, внедрение, интеграции и AI. Пакеты под ключ со сметой до старта.",
      problems: [
        "Ищете интегратора amoCRM, а не курс и не «настройщика полей»",
        "Нужны услуги amoCRM: воронка, сайт, 1С, документы",
        "Хотите amoCRM под ключ с приёмкой и обучением",
        "Нет единого подрядчика на CRM + автоматизацию",
      ],
      deliverables: [
        "Пакеты услуг: настройка, внедрение, интеграции, AI",
        "Смета и сроки до разработки",
        "Production-контур в вашей amoCRM",
        "Документация, обучение, SLA по запросу",
      ],
      intro: [
        "«amoCRM услуги», «интегратор amoCRM» и «amoCRM под ключ» — запросы на исполнителя с результатом.",
        "Работаем как интегратор: фиксируем процесс, смету и критерии приёмки; портал и данные остаются у вас.",
        "Точечная настройка — /integrations/amocrm-setup; внедрение — /integrations/amocrm-implementation.",
      ],
      faq: [
        {
          q: "Вы интегратор или партнёр amoCRM?",
          a: "Интегратор-внедренец: API, воронки, 1С, AI. Лицензии amoCRM оформляете у вендора или своего партнёра.",
        },
        {
          q: "Какие услуги входят?",
          a: "Настройка воронки, внедрение под ключ, сайт/телефония/1С, автоматизация КП, AI-слой поверх CRM.",
        },
        {
          q: "Работаете удалённо?",
          a: "Да — по РФ. Выезд по согласованию.",
        },
      ],
    },
    en: {
      h1: "amoCRM services turnkey",
      subtitle:
        "amoCRM integrator: setup, implementation, integrations and AI. Turnkey packages with an estimate before build.",
      problems: [
        "Need an amoCRM integrator — not a course or field-only setup",
        "Need services: pipeline, website, 1C, documents",
        "Want turnkey amoCRM with acceptance and training",
        "No single contractor for CRM + automation",
      ],
      deliverables: [
        "Service packages: setup, implementation, integrations, AI",
        "Estimate and timeline before development",
        "Production contour in your amoCRM",
        "Docs, training, optional SLA",
      ],
      intro: [
        "“amoCRM services” and “integrator” mean a vendor with delivery — not a license sale.",
        "We act as integrator: process, estimate, acceptance; portal stays yours.",
      ],
      faq: [
        {
          q: "Integrator or amoCRM partner?",
          a: "Implementation integrator: API, pipelines, 1C, AI. Licenses via vendor or your partner.",
        },
        {
          q: "What’s included?",
          a: "Pipeline setup, turnkey implementation, site/telephony/1C, proposal automation, optional AI layer.",
        },
        {
          q: "Remote?",
          a: "Yes. On-site by agreement.",
        },
      ],
    },
  },
  {
    category: "integrations",
    slug: "amocrm-pricing",
    contentKey: "amocrm_ws_pricing",
    cluster: "amocrm",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/crm-integration.svg",
    keywords: [
      "сколько стоит внедрение amocrm",
      "настройка amocrm цена",
      "стоимость внедрения amocrm",
      "цена внедрения amocrm",
      "сколько стоит настройка amocrm",
      "бюджет внедрения amocrm",
    ],
    related: [
      { href: "/integrations/amocrm-implementation", labelRu: "Внедрение amoCRM", labelEn: "amoCRM implementation" },
      { href: "/integrations/amocrm-setup", labelRu: "Настройка amoCRM", labelEn: "amoCRM setup" },
      { href: "/integrations/amocrm-services", labelRu: "Услуги amoCRM", labelEn: "amoCRM services" },
      { href: "/pricing", labelRu: "Общий прайс", labelEn: "General pricing" },
      { href: "/services/ai-discovery-roadmap", labelRu: "Аудит и смета", labelEn: "Audit & estimate" },
    ],
    ru: {
      h1: "Сколько стоит внедрение amoCRM",
      subtitle:
        "Цена настройки и внедрения amoCRM: понятные пакеты от 150 000 ₽. Смета до старта — без «от и до» в воздухе.",
      problems: [
        "Неясна цена внедрения amoCRM до разговора с подрядчиком",
        "Смета «от 50 тыс.» без состава работ",
        "Путают лицензию amoCRM и работу интегратора",
        "Нужен бюджет настройки отдельно от AI и 1С",
      ],
      deliverables: [
        "Вилка пакетов: настройка / внедрение / AI",
        "Состав работ и сроки в смете",
        "Критерии приёмки до договора",
        "Опциональный аудит 1–2 недели, если объём неясен",
      ],
      howWeSolve: [
        {
          title: "Настройка",
          text: "Воронка, поля, роботы — от 150 000 ₽. Пилот 2–4 недели.",
        },
        {
          title: "Внедрение",
          text: "Контур с интеграциями сайта/мессенджеров — обычно от 300 000 ₽. Полный контур с 1С/документами — от 500 000 ₽.",
        },
        {
          title: "AI-слой",
          text: "Квалификация, саммари, агент поверх amoCRM — от 500 000 ₽ отдельным пакетом.",
        },
      ],
      intro: [
        "Запросы «сколько стоит внедрение amoCRM» и «настройка amoCRM цена» — про бюджет интегратора, не про тариф amoCRM.",
        "Ниже ориентиры; точная смета после короткого аудита процесса.",
      ],
      faq: [
        {
          q: "Сколько стоит настройка amoCRM?",
          a: "Базовая настройка воронки и роботов — от 150 000 ₽. С приёмом лидов с сайта чаще от 300 000 ₽.",
        },
        {
          q: "Сколько стоит внедрение amoCRM под ключ?",
          a: "Типичный пакет внедрения с интеграциями — от 300–500 000 ₽. Сложный контур с 1С и документами — от 500 000 ₽.",
        },
        {
          q: "Лицензия входит?",
          a: "Нет — лицензию amoCRM оплачиваете вендору. В смете только наши работы.",
        },
        {
          q: "Как получить точную цену?",
          a: "Короткий бриф или аудит 1–2 недели (от 150 000 ₽) — затем фиксированная смета.",
        },
      ],
    },
    en: {
      h1: "amoCRM implementation cost",
      subtitle:
        "amoCRM setup and implementation pricing: clear packages. Fixed estimate before build.",
      problems: [
        "No clear amoCRM implementation price before a sales call",
        "Vague “from …” quotes without scope",
        "License cost mixed with integrator work",
        "Need setup budget separate from AI and 1C",
      ],
      deliverables: [
        "Package bands: setup / implementation / AI",
        "Scope and timeline in the estimate",
        "Acceptance criteria before contract",
        "Optional 1–2 week audit if scope is unclear",
      ],
      howWeSolve: [
        {
          title: "Setup",
          text: "Pipeline, fields, robots — entry package; pilot 2–4 weeks.",
        },
        {
          title: "Implementation",
          text: "Contour with site/messenger integrations — mid package. Full contour with 1C/docs — higher package.",
        },
        {
          title: "AI layer",
          text: "Qualification, summaries, agent on amoCRM — separate package.",
        },
      ],
      intro: [
        "“How much does amoCRM implementation cost” is about integrator budget — not the SaaS tariff.",
        "Bands below; exact estimate after a short process audit.",
      ],
      faq: [
        {
          q: "Setup price?",
          a: "Basic pipeline/robots from an entry package; with website intake usually higher.",
        },
        {
          q: "Turnkey implementation?",
          a: "Typical with integrations mid-to-upper package; complex 1C/docs higher.",
        },
        {
          q: "License included?",
          a: "No — amoCRM license is paid to the vendor. Our estimate is labor only.",
        },
        {
          q: "Exact quote?",
          a: "Short brief or 1–2 week audit, then a fixed estimate.",
        },
      ],
    },
  },
  {
    category: "integrations",
    slug: "amocrm-ai-agent",
    contentKey: "amocrm_ws_ai_agent",
    cluster: "amocrm",
    serviceSlug: "ai-agent",
    coverImage: "/diagrams/crm-integration.svg",
    keywords: [
      "amocrm ai агент",
      "ии агент amocrm",
      "ai агент amocrm",
      "агент amocrm",
      "amocrm бот для продаж",
    ],
    caseStudySlugs: ["kp-llm-automation", "amocrm-website-integration"],
    related: [
      { href: "/integrations/amocrm-ai", labelRu: "AI для amoCRM", labelEn: "AI for amoCRM" },
      { href: "/services/ai-agent", labelRu: "AI-агенты", labelEn: "AI agents" },
      { href: "/services/sales-ai-agent", labelRu: "AI для продаж", labelEn: "Sales AI agent" },
      { href: "/integrations/amocrm-automation", labelRu: "Автоматизация amoCRM", labelEn: "amoCRM automation" },
      { href: "/pricing", labelRu: "Стоимость", labelEn: "Pricing" },
    ],
    ru: {
      h1: "AI-агент для amoCRM",
      subtitle:
        "ИИ-агент в amoCRM: квалификация, ответы, задачи и follow-up в карточке сделки. Пилот от 500 000 ₽, 2–4 недели.",
      problems: [
        "Нужен AI-агент amoCRM, а не чат «для галочки»",
        "Лиды квалифицируют вручную, follow-up забывается",
        "Бот не пишет факты в сделку и не ставит задачи",
        "Нет human-in-the-loop и контроля качества",
      ],
      deliverables: [
        "Агент с действиями в amoCRM: поля, задачи, этапы",
        "Правила эскалации к менеджеру",
        "Мониторинг качества и логи решений",
        "Пилот на одном сценарии с KPI",
      ],
      intro: [
        "Запросы «amoCRM AI агент» и «ИИ агент amoCRM» — про агента с действиями в CRM, не про виджет чата.",
        "AI-слой без агента — /integrations/amocrm-ai; автоматизация роботов — /integrations/amocrm-automation.",
      ],
      faq: [
        {
          q: "Чем агент отличается от AI для amoCRM?",
          a: "AI для amoCRM — скоринг и черновики. Агент сам выполняет шаги в CRM (поля, задачи, follow-up) с контролем.",
        },
        {
          q: "Срок и цена?",
          a: "Пилот одного сценария 2–4 недели, от 500 000 ₽.",
        },
        {
          q: "Можно on-prem LLM?",
          a: "Да — если политика данных требует закрытый контур.",
        },
      ],
    },
    en: {
      h1: "AI agent for amoCRM",
      subtitle:
        "AI agent in amoCRM: qualification, replies, tasks and follow-up in the deal card. Pilot from €5,000; 2–4 weeks.",
      problems: [
        "Need an amoCRM AI agent — not a demo chat",
        "Leads qualified manually; follow-up is forgotten",
        "Bot does not write facts into the deal or create tasks",
        "No human-in-the-loop or quality control",
      ],
      deliverables: [
        "Agent with amoCRM actions: fields, tasks, stages",
        "Escalation rules to a human rep",
        "Quality monitoring and decision logs",
        "One-scenario pilot with KPI",
      ],
      intro: [
        "“amoCRM AI agent” means an agent that acts in CRM — not a chat widget.",
        "AI layer without agent: /integrations/amocrm-ai; robots: /integrations/amocrm-automation.",
      ],
      faq: [
        {
          q: "Agent vs AI for amoCRM?",
          a: "AI for amoCRM is scoring and drafts. The agent executes CRM steps with control.",
        },
        {
          q: "Timeline and price?",
          a: "One-scenario pilot 2–4 weeks, from €5,000.",
        },
        {
          q: "On-prem LLM?",
          a: "Yes — when data policy requires a private contour.",
        },
      ],
    },
  },
  {
    category: "solutions",
    slug: "crm-erp-development",
    contentKey: "amocrm_ws_crm_erp_dev",
    cluster: "crm",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/erp-sync.svg",
    keywords: [
      "разработка crm и erp",
      "разработка crm erp",
      "разработка crm",
      "разработка erp",
      "кастомная crm erp",
      "создание crm системы",
    ],
    caseStudySlugs: ["crm-1c-sync", "bitrix24-erp-sync"],
    related: [
      { href: "/integrations/crm", labelRu: "Внедрение CRM", labelEn: "CRM implementation" },
      { href: "/integrations/1c", labelRu: "Интеграция 1С", labelEn: "1C integration" },
      { href: "/services/crm-integration", labelRu: "Bitrix24 · amoCRM", labelEn: "Bitrix24 · amoCRM" },
      { href: "/automation/company-automation", labelRu: "Автоматизация компании", labelEn: "Company automation" },
      { href: "/pricing", labelRu: "Стоимость", labelEn: "Pricing" },
    ],
    ru: {
      h1: "Разработка CRM и ERP",
      subtitle:
        "Разработка CRM и ERP под процесс: доработка Bitrix24/amoCRM/1С или кастомный контур. Смета и ROI до кода.",
      problems: [
        "Коробка не закрывает процесс — нужна разработка CRM и ERP-слоя",
        "CRM и учёт расходятся: заказы, оплаты, остатки",
        "Ищете кастом, хотя хватило бы доработки Bitrix24 / amoCRM / 1С",
        "Нет архитектуры, сметы и критериев приёмки",
      ],
      deliverables: [
        "Аудит: коробка vs кастом vs гибрид",
        "Архитектура CRM ↔ ERP / 1С",
        "Разработка или доработка с интеграциями",
        "Production, мониторинг, передача команде",
      ],
      intro: [
        "«Разработка CRM и ERP» — коммерческий запрос на контур продаж + учёт, не на абстрактный «софт».",
        "Чаще усиливаем Bitrix24 / amoCRM и 1С. Кастом — если процесс не укладывается в коробку.",
        "Внедрение без разработки с нуля — /integrations/crm; обмен с 1С — /integrations/1c.",
      ],
      faq: [
        {
          q: "Всегда ли нужна кастомная CRM?",
          a: "Нет. Сначала проверяем Bitrix24 / amoCRM + 1С. Кастом — при жёстких отраслевых правилах или уникальном процессе.",
        },
        {
          q: "Срок и бюджет?",
          a: "Пилот обмена или модуля 2–6 недель. Бюджет от 500 000 ₽ за согласованный контур; кастом ERP-слоя — выше.",
        },
        {
          q: "Что с поддержкой?",
          a: "Передаём документацию и схему. Сопровождение — по SLA.",
        },
      ],
    },
    en: {
      h1: "CRM and ERP development",
      subtitle:
        "CRM and ERP development for your process: Bitrix24/amoCRM/1C upgrade or a custom contour. Estimate and ROI before code.",
      problems: [
        "Boxed CRM/ERP does not fit — need development",
        "CRM and ledger diverge: orders, payments, stock",
        "Looking for custom when an upgrade would suffice",
        "No architecture, estimate or acceptance criteria",
      ],
      deliverables: [
        "Audit: boxed vs custom vs hybrid",
        "CRM ↔ ERP / 1C architecture",
        "Build or upgrade with integrations",
        "Production, monitoring, team handover",
      ],
      intro: [
        "“CRM and ERP development” means a sales + ledger contour — not abstract software.",
        "We usually extend Bitrix24 / amoCRM and 1C. Custom only when the process does not fit.",
      ],
      faq: [
        {
          q: "Always custom CRM?",
          a: "No. We check Bitrix24 / amoCRM + 1C first. Custom for strict industry rules or unique process.",
        },
        {
          q: "Timeline and budget?",
          a: "Exchange/module pilot 2–6 weeks. From a mid-market package; custom ERP layer higher.",
        },
        {
          q: "Support?",
          a: "Docs and schema handover. Optional SLA support.",
        },
      ],
    },
  },
];

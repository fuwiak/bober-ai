import type { LandingSpec } from "@/lib/seo-catalog/types";

/**
 * High buy-intent integrator + AI GAP landings (Wordstat 2026-08/09).
 * SEO hero = raster `/stock/offers/land-*` (not SVG diagram costume).
 * Sources: amocrm/bitrix seed totals + ai-automation-sell GAP.
 */
export const CATALOG_LANDING_SPECS_INTEGRATOR_BUY: LandingSpec[] = [
  {
    category: "integrations",
    slug: "amocrm-integrator",
    contentKey: "buy_amocrm_integrator",
    cluster: "amocrm",
    serviceSlug: "amocrm-integrator",
    coverImage: "/stock/offers/land-integrations-amocrm-integrator.jpg",
    keywords: [
      "интегратор amocrm",
      "amocrm интегратор",
      "интегратор amoCRM",
      "подрядчик amocrm",
      "агентство amocrm",
    ],
    caseStudySlugs: ["amocrm-website-integration", "lead-generation"],
    related: [
      { href: "/integrations/amocrm-setup", labelRu: "Настройка amoCRM", labelEn: "amoCRM setup" },
      { href: "/integrations/amocrm-implementation", labelRu: "Внедрение amoCRM", labelEn: "amoCRM implementation" },
      { href: "/integrations/amocrm-1c", labelRu: "amoCRM ↔ 1С", labelEn: "amoCRM ↔ 1C" },
      { href: "/amocrm", labelRu: "Пакеты amoCRM", labelEn: "amoCRM packages" },
      { href: "/pricing", labelRu: "Цены", labelEn: "Pricing" },
    ],
    ru: {
      h1: "Интегратор amoCRM",
      subtitle:
        "Интегратор amoCRM: воронка, API, сайт, 1С и мессенджеры. Фиксированная смета, пилот 2–4 недели. От 300 000 ₽.",
      problems: [
        "Нужен интегратор amoCRM — не курс и не «скачать бесплатно»",
        "Сайт, телефония и 1С не связаны со сделками",
        "Готовый модуль падает без логов и ответственного",
        "Команда живёт в чатах, CRM пустая",
      ],
      deliverables: [
        "Карта потоков и смета до кода",
        "Рабочий обмен с логом и retry",
        "Воронка, права и источники лидов",
        "Регламент и приёмка на тестовых сделках",
      ],
      intro: [
        "Wordstat: «amocrm интегратор» — запрос на подрядчика с результатом, не на обзор CRM.",
        "Настройка портала — /integrations/amocrm-setup. Полное внедрение — /integrations/amocrm-implementation.",
      ],
      faq: [
        {
          q: "Чем интегратор отличается от настройки?",
          a: "Интегратор закрывает обмен данными и промышленный контур. Настройка — воронка и роботы внутри amoCRM.",
        },
        {
          q: "Срок и цена?",
          a: "Пилот 2–4 недели. От 300 000 ₽; узкая настройка — от 150 000 ₽.",
        },
      ],
    },
    en: {
      h1: "amoCRM integrator",
      subtitle:
        "amoCRM integrator: pipeline, API, website, 1C and messengers. Fixed estimate; pilot 2–4 weeks.",
      problems: [
        "Need an amoCRM integrator — not a course",
        "Website, telephony and ledger are not linked to deals",
        "A ready module fails without logs",
        "Team lives in chats; CRM is empty",
      ],
      deliverables: [
        "Flow map and estimate before code",
        "Working exchange with logs and retries",
        "Pipeline, roles and lead sources",
        "Playbook and acceptance on test deals",
      ],
      intro: [
        "“amoCRM integrator” is a buy request for a delivery partner.",
        "Portal setup: /integrations/amocrm-setup. Full rollout: /integrations/amocrm-implementation.",
      ],
      faq: [
        {
          q: "Integrator vs setup?",
          a: "Integrator owns data exchange. Setup is pipeline and robots inside amoCRM.",
        },
        {
          q: "Timeline and price?",
          a: "Pilot 2–4 weeks. Mid-market package; narrow setup is cheaper.",
        },
      ],
    },
  },
  {
    category: "integrations",
    slug: "bitrix24-integrator",
    contentKey: "buy_bitrix24_integrator",
    cluster: "bitrix24",
    serviceSlug: "bitrix24-integrator",
    coverImage: "/stock/offers/land-integrations-bitrix24-integrator.jpg",
    keywords: [
      "интегратор битрикс24",
      "интегратор bitrix24",
      "заказать интеграцию битрикс24",
      "стоимость интеграции битрикс24",
      "интеграция битрикс24 цена",
    ],
    caseStudySlugs: ["bitrix24-kwork-crm", "bitrix24-erp-sync"],
    related: [
      {
        href: "/integrations/bitrix24-integration",
        labelRu: "Интеграция Битрикс24",
        labelEn: "Bitrix24 integration",
      },
      {
        href: "/integrations/bitrix24-implementation",
        labelRu: "Внедрение Битрикс24",
        labelEn: "Bitrix24 implementation",
      },
      { href: "/integrations/bitrix24-1c", labelRu: "Битрикс24 ↔ 1С", labelEn: "Bitrix24 ↔ 1C" },
      { href: "/bitrix", labelRu: "Пакеты Bitrix24", labelEn: "Bitrix24 packages" },
      { href: "/pricing", labelRu: "Цены", labelEn: "Pricing" },
    ],
    ru: {
      h1: "Интегратор Битрикс24",
      subtitle:
        "Интегратор Битрикс24: сайт, 1С, телефония, мессенджеры. Чиним обмен или собираем новый контур. Бизнес-партнёр Битрикс24 · от 300 000 ₽.",
      problems: [
        "Интеграция Битрикс24 не работает: дубли и потерянные заявки",
        "Нужен интегратор Битрикс24 с логом и приёмкой",
        "1С и CRM расходятся в статусах и суммах",
        "Модуль есть, но нет ответственного за сбои",
      ],
      deliverables: [
        "Карта потоков и смета до кода",
        "Обмен с логом, retry и идемпотентностью",
        "Связка сайта / 1С / телефонии / мессенджеров",
        "Регламент и критерии приёмки",
      ],
      intro: [
        "Wordstat: «интегратор битрикс24» (304) рядом с «интеграция битрикс24» (1833) — покупают исполнителя.",
        "Детали обмена — /integrations/bitrix24-integration. Портал целиком — /integrations/bitrix24-implementation.",
      ],
      faq: [
        {
          q: "Вы партнёр Битрикс24?",
          a: "Да, бизнес-партнёр 1С-Битрикс. Внедряем и интегрируем портал под процесс.",
        },
        {
          q: "Сколько стоит?",
          a: "Аудит контура от 150 000 ₽. Рабочий обмен обычно от 300 000 ₽.",
        },
      ],
    },
    en: {
      h1: "Bitrix24 integrator",
      subtitle:
        "Bitrix24 integrator: website, 1C, telephony, messengers. Fix or rebuild the contour. Official Bitrix partner · fixed estimate.",
      problems: [
        "Bitrix24 integration is broken: duplicates and lost leads",
        "Need a Bitrix24 integrator with logs and acceptance",
        "1C and CRM disagree on statuses and amounts",
        "A module exists but nobody owns failures",
      ],
      deliverables: [
        "Flow map and estimate before code",
        "Exchange with logs, retries and idempotency",
        "Website / 1C / telephony / messengers wired",
        "Playbook and acceptance criteria",
      ],
      intro: [
        "Buyers search for an integrator, not a tutorial.",
        "Exchange detail: /integrations/bitrix24-integration. Full portal: /integrations/bitrix24-implementation.",
      ],
      faq: [
        {
          q: "Bitrix partner?",
          a: "Yes — 1C-Bitrix business partner.",
        },
        {
          q: "Price?",
          a: "Contour audit from a mid package; working exchange usually higher.",
        },
      ],
    },
  },
  {
    category: "ai",
    slug: "vnedrenie-ii-v-biznes-processy",
    contentKey: "buy_vnedrenie_ii_bp",
    cluster: "ai-corporate",
    serviceSlug: "vnedrenie-ii-v-biznes-processy",
    coverImage: "/stock/offers/land-ai-vnedrenie-ii-v-biznes-processy.jpg",
    keywords: [
      "внедрение ии в бизнес процессы",
      "внедрение ии в бизнес-процессы",
      "внедрение искусственного интеллекта в процессы",
    ],
    caseStudySlugs: ["kaspersky-ai-assistant", "elia-suite"],
    related: [
      { href: "/ai/ai-implementation", labelRu: "Компания по внедрению ИИ", labelEn: "AI implementation company" },
      { href: "/automation/ai-business-automation", labelRu: "Автоматизация с ИИ", labelEn: "AI business automation" },
      { href: "/ai/stoimost-vnedreniya-ii", labelRu: "Стоимость внедрения ИИ", labelEn: "AI cost" },
      { href: "/pricing", labelRu: "Цены", labelEn: "Pricing" },
    ],
    ru: {
      h1: "Внедрение ИИ в бизнес-процессы",
      subtitle:
        "Внедрение ИИ в бизнес-процессы: один процесс с KPI, связка с CRM и файлами, смета до кода. От 400 000 ₽.",
      problems: [
        "ИИ обсуждают, а процесс остаётся ручным",
        "Нет связки модели с CRM и документами",
        "Страх утечки данных во внешние чаты",
        "Непонятно, какой процесс брать первым",
      ],
      deliverables: [
        "Выбор процесса с измеримым эффектом",
        "Интеграции + ИИ-слой только где нужно",
        "Пилот в промышленной эксплуатации",
        "Контроль качества и передача команде",
      ],
      intro: [
        "Wordstat exact «внедрение ии в бизнес процессы» (284) — buy intent на внедрение, не на обзор нейросетей.",
        "Стоимость и пакеты — /ai/stoimost-vnedreniya-ii.",
      ],
      faq: [
        {
          q: "С чего начать?",
          a: "С одного процесса: заявки, документы или follow-up. Затем масштаб.",
        },
        {
          q: "Закрытый контур?",
          a: "Да — private LLM / VPC по требованиям 152-ФЗ.",
        },
      ],
    },
    en: {
      h1: "AI into business processes",
      subtitle:
        "Deploy AI into one process with KPI, CRM/file wiring and a fixed estimate before code.",
      problems: [
        "AI is discussed while the process stays manual",
        "No link from the model to CRM and files",
        "Leak risk into public chats",
        "Unclear which process to start with",
      ],
      deliverables: [
        "One process with a measurable KPI",
        "Integrations plus AI only where needed",
        "Production pilot",
        "Quality control and handover",
      ],
      intro: [
        "Buyers want implementation, not an AI explainer.",
        "Pricing: /ai/stoimost-vnedreniya-ii.",
      ],
      faq: [
        {
          q: "Where to start?",
          a: "One process: leads, documents or follow-up — then scale.",
        },
        {
          q: "Private contour?",
          a: "Yes — private LLM / VPC when required.",
        },
      ],
    },
  },
  {
    category: "ai",
    slug: "llm-dlya-1c",
    contentKey: "buy_llm_1c",
    cluster: "ai-corporate",
    serviceSlug: "llm-dlya-1c",
    coverImage: "/stock/offers/land-ai-llm-dlya-1c.jpg",
    keywords: ["llm для 1с", "интеграция ии с 1с", "ии для 1с", "chatgpt для 1с"],
    caseStudySlugs: ["erp-moysklad-chatgpt-ux", "elia-suite"],
    related: [
      { href: "/integrations/integraciya-ii-s-crm", labelRu: "ИИ × CRM", labelEn: "AI × CRM" },
      { href: "/integrations/bitrix24-1c", labelRu: "Битрикс24 ↔ 1С", labelEn: "Bitrix24 ↔ 1C" },
      { href: "/integrations/amocrm-1c", labelRu: "amoCRM ↔ 1С", labelEn: "amoCRM ↔ 1C" },
      { href: "/ai/ai-implementation", labelRu: "Внедрение ИИ", labelEn: "AI implementation" },
    ],
    ru: {
      h1: "LLM для 1С",
      subtitle:
        "LLM для 1С: ответы по справочникам, черновики документов, контроль доступа. Без утечки во внешние чаты. От 400 000 ₽.",
      problems: [
        "Сотрудники спрашивают ChatGPT по данным 1С",
        "Черновики документов собирают вручную",
        "Нет политики доступа к учётным данным",
        "Готовый «бот для 1С» не проходит ИБ",
      ],
      deliverables: [
        "Контур LLM с доступом к разрешённым данным 1С",
        "Сценарии: поиск, черновик, классификация",
        "Журнал запросов и ограничения",
        "Пилот на одном типе документа или справочника",
      ],
      intro: [
        "Wordstat: «llm для 1с» (94) и «интеграция ии с 1с» (82) — коммерческий спрос на связку учёта и модели.",
        "CRM-слой — отдельной услугой: /integrations/integraciya-ii-s-crm.",
      ],
      faq: [
        {
          q: "Данные уходят наружу?",
          a: "Нет — контур в вашем периметре или VPC. Внешние чаты не используем для учётки.",
        },
        {
          q: "Нужна доработка 1С?",
          a: "Часто достаточно API/обмена. Доработку конфигурации оцениваем отдельно.",
        },
      ],
    },
    en: {
      h1: "LLM for 1C",
      subtitle:
        "LLM for 1C: answers over directories, document drafts, access control — no leak into public chats.",
      problems: [
        "Staff ask public ChatGPT about ledger data",
        "Document drafts are assembled by hand",
        "No access policy for accounting data",
        "Off-the-shelf bots fail security review",
      ],
      deliverables: [
        "LLM contour over allowed 1C data",
        "Search, draft and classify scenarios",
        "Query log and limits",
        "Pilot on one document or directory type",
      ],
      intro: [
        "Buyers want ledger-safe AI, not a toy bot.",
        "CRM layer: /integrations/integraciya-ii-s-crm.",
      ],
      faq: [
        {
          q: "Data leave the perimeter?",
          a: "No — private contour / VPC. No public chats for ledger data.",
        },
        {
          q: "1C customization?",
          a: "Often API is enough; config work is scoped separately.",
        },
      ],
    },
  },
  {
    category: "integrations",
    slug: "integraciya-ii-s-crm",
    contentKey: "buy_ii_crm",
    cluster: "crm",
    serviceSlug: "integraciya-ii-s-crm",
    coverImage: "/stock/offers/land-integrations-integraciya-ii-s-crm.jpg",
    keywords: [
      "интеграция ии с crm",
      "ии для crm",
      "ai для crm",
      "интеграция ии с битрикс24",
      "amocrm ии",
    ],
    caseStudySlugs: ["amocrm-website-integration", "yandex-telemost-agent"],
    related: [
      { href: "/integrations/ai-for-crm", labelRu: "ИИ для CRM", labelEn: "AI for CRM" },
      { href: "/integrations/amocrm-ai-agent", labelRu: "ИИ-агент amoCRM", labelEn: "amoCRM AI agent" },
      { href: "/integrations/bitrix24-ai", labelRu: "ИИ для Битрикс24", labelEn: "Bitrix24 AI" },
      { href: "/ai/llm-dlya-1c", labelRu: "LLM для 1С", labelEn: "LLM for 1C" },
    ],
    ru: {
      h1: "Интеграция ИИ с CRM",
      subtitle:
        "Интеграция ИИ с CRM (Bitrix24 / amoCRM): ассистент в сделке, задачи, дожим. Пилот на одной воронке. От 300 000 ₽.",
      problems: [
        "ИИ живёт отдельно от воронки",
        "Менеджеры копируют ответы из чатов в CRM",
        "Нет контроля качества и эскалации к человеку",
        "Нужна связка ИИ с Bitrix24 или amoCRM",
      ],
      deliverables: [
        "ИИ-слой в карточке сделки",
        "Задачи и follow-up по правилам",
        "Human-in-the-loop на спорных кейсах",
        "Пилот на одной воронке с KPI",
      ],
      intro: [
        "Wordstat: «интеграция ии с crm» — buy на связку, не на общий чат-бот.",
        "Узкие страницы: /integrations/amocrm-ai-agent, /integrations/bitrix24-ai.",
      ],
      faq: [
        {
          q: "Какая CRM?",
          a: "Bitrix24 и amoCRM. Другие — по аудиту API.",
        },
        {
          q: "Срок?",
          a: "Пилот обычно 2–4 недели на одной воронке.",
        },
      ],
    },
    en: {
      h1: "AI × CRM integration",
      subtitle:
        "Wire AI into Bitrix24 / amoCRM: deal assistant, tasks and follow-up. One-pipeline pilot.",
      problems: [
        "AI lives outside the pipeline",
        "Reps copy chat answers into CRM",
        "No quality control or human escalation",
        "Need AI wired to Bitrix24 or amoCRM",
      ],
      deliverables: [
        "AI layer in the deal card",
        "Tasks and follow-up by rules",
        "Human-in-the-loop on edge cases",
        "One-pipeline pilot with KPI",
      ],
      intro: [
        "Buyers want CRM wiring, not a generic chatbot.",
        "Narrow pages: /integrations/amocrm-ai-agent, /integrations/bitrix24-ai.",
      ],
      faq: [
        {
          q: "Which CRM?",
          a: "Bitrix24 and amoCRM. Others after an API audit.",
        },
        {
          q: "Timeline?",
          a: "Usually a 2–4 week pilot on one pipeline.",
        },
      ],
    },
  },
  {
    category: "ai",
    slug: "integrator-iskusstvennogo-intellekta",
    contentKey: "buy_ii_integrator",
    cluster: "ai-corporate",
    serviceSlug: "integrator-iskusstvennogo-intellekta",
    coverImage: "/stock/offers/land-ai-integrator-ii.jpg",
    keywords: [
      "интегратор искусственного интеллекта",
      "компания по внедрению ии",
      "заказать внедрение ии",
      "услуги внедрения ии",
    ],
    caseStudySlugs: ["kaspersky-ai-assistant", "yandex-telemost-agent"],
    related: [
      { href: "/ai/ai-implementation", labelRu: "Компания по внедрению ИИ", labelEn: "AI company" },
      { href: "/ai/vnedrenie-ii-v-biznes-processy", labelRu: "ИИ в процессы", labelEn: "AI into processes" },
      { href: "/ai/zakazat-vnedrenie-ii", labelRu: "Заказать внедрение ИИ", labelEn: "Order AI" },
      { href: "/pricing", labelRu: "Цены", labelEn: "Pricing" },
    ],
    ru: {
      h1: "Интегратор искусственного интеллекта",
      subtitle:
        "Интегратор искусственного интеллекта: внедрение в процессы компании, не демо-чат. Смета, KPI, передача команде. От 400 000 ₽.",
      problems: [
        "Нужен интегратор ИИ с промышленным контуром",
        "Демо на ChatGPT не проходит закупку и ИБ",
        "Нет сметы, сроков и критериев приёмки",
        "Пилоты умирают без интеграции в CRM/1С",
      ],
      deliverables: [
        "Аудит процесса и смета до разработки",
        "Пилот с KPI в вашем контуре",
        "Интеграции CRM / 1С / почты по приоритету",
        "Документация и handover",
      ],
      intro: [
        "Wordstat: «интегратор искусственного интеллекта» (28) + «компания по внедрению ии» (151) — запрос на подрядчика.",
        "Близкий H1 «Компания по внедрению ИИ» — /ai/ai-implementation.",
      ],
      faq: [
        {
          q: "Это консалтинг или внедрение?",
          a: "Внедрение. Аудит — вход; дальше пилот и production.",
        },
        {
          q: "Минимальный бюджет?",
          a: "Аудит от 150 000 ₽, пилот обычно от 300–400 000 ₽.",
        },
      ],
    },
    en: {
      h1: "Artificial intelligence integrator",
      subtitle:
        "AI integrator for company processes — not a demo chat. Estimate, KPI and handover.",
      problems: [
        "Need an AI integrator with a production contour",
        "ChatGPT demos fail procurement and security",
        "No estimate, timeline or acceptance",
        "Pilots die without CRM/1C wiring",
      ],
      deliverables: [
        "Process audit and estimate before build",
        "KPI pilot in your contour",
        "Priority CRM / 1C / mail integrations",
        "Docs and handover",
      ],
      intro: [
        "Buyers hire an integrator, not a slide deck.",
        "Related H1: /ai/ai-implementation.",
      ],
      faq: [
        {
          q: "Consulting or delivery?",
          a: "Delivery. Audit is the entry; then pilot and production.",
        },
        {
          q: "Budget floor?",
          a: "Audit from a starter package; pilots usually higher.",
        },
      ],
    },
  },
];

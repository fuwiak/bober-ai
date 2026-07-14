export type GuideContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  sections: { title: string; paragraphs: string[] }[];
  checklist?: string[];
  ctaTitle: string;
  ctaText: string;
};

export type GuideLocale = "ru" | "en";

const GUIDES_RU: Record<string, GuideContent> = {
  automateSales: {
    metaTitle: "Как автоматизировать отдел продаж — пошаговый гайд",
    metaDescription:
      "Как автоматизировать отдел продаж: лиды, CRM, коммерческие предложения, follow-up. Практический гайд без buzzword.",
    h1: "Как автоматизировать отдел продаж",
    subtitle: "Пошаговый подход: от карты процесса до production — без «ещё одного SaaS».",
    sections: [
      {
        title: "Шаг 1. Найдите узкое место",
        paragraphs: [
          "Не автоматизируйте всё сразу. Выберите один процесс с максимальной болью: подготовка КП (45 минут на документ), потерянные лиды, ручной follow-up или дублирование данных между CRM и Excel.",
          "Интервью с 2–3 менеджерами: где они тратят время, что копируют вручную, где заявки «зависают». Это и есть карта для ROI.",
        ],
      },
      {
        title: "Шаг 2. CRM как центр, не как отчётность",
        paragraphs: [
          "Автоматизация продаж работает, когда CRM — единственное место правды. Лид с сайта → сделка за секунды. Стадии меняются автоматически. Задачи на follow-up создаются роботом, а не «когда вспомнят».",
          "Интеграции: сайт, Telegram, реклама → amoCRM или Bitrix24. Документы и 1С — двусторонняя синхронизация, чтобы менеджер не дублировал заказ.",
        ],
      },
      {
        title: "Шаг 3. Коммерческие предложения за минуты",
        paragraphs: [
          "Типичный выигрыш: CRM + каталог + шаблон → PDF за 2 минуты вместо 45. Цены и SKU только из каталога — без выдуманных позиций.",
          "AI нужен не всегда. Шаблоны и правила дают 90% эффекта. LLM — для нестандартных формулировок и подбора позиций из большого каталога.",
        ],
      },
      {
        title: "Шаг 4. Follow-up и аналитика",
        paragraphs: [
          "Автонапоминания менеджерам, уведомления в Telegram, эскалация «зависших» сделок руководителю. Воронка на дашборде: входящие → лиды → оплата.",
          "Измеряйте: время от лида до КП, конверсия этапов, доля сделок без активности > 3 дней.",
        ],
      },
    ],
    checklist: [
      "Карта процесса от лида до оплаты",
      "100% лидов попадают в CRM автоматически",
      "КП генерируется из CRM без копипаста",
      "Follow-up по расписанию, не «когда вспомнят»",
      "Дашборд воронки для руководителя",
    ],
    ctaTitle: "Нужен аудит отдела продаж?",
    ctaText: "Проведём аудит, посчитаем ROI и предложим план внедрения с фиксированной сметой.",
  },
  speedUpProposals: {
    metaTitle: "Как ускорить подготовку коммерческих предложений",
    metaDescription:
      "Как сократить время подготовки КП с 45 минут до 2: CRM, шаблоны, каталог, автоматизация документов.",
    h1: "Как ускорить подготовку коммерческих предложений",
    subtitle: "От 45 минут ручной работы до 2 минут — на реальных кейсах клиентов.",
    sections: [
      {
        title: "Почему КП занимает 45 минут",
        paragraphs: [
          "Менеджер ищет цены в Excel или 1С, копирует SKU в Word, считает НДС и валюту, согласует скидку с руководителем, сохраняет PDF и отправляет клиенту. Каждый шаг — отдельная система.",
          "Ошибки: устаревший прайс, неверный артикул, разные версии шаблона у разных менеджеров.",
        ],
      },
      {
        title: "Архитектура быстрого КП",
        paragraphs: [
          "Единый каталог (1С или PIM) → CRM (сделка + позиции) → шаблон DOCX/PDF → генерация за 1–2 минуты. Скидки и условия — из правил, не из головы менеджера.",
          "Опционально: AI-слой для сборки текста и подбора позиций из диалога «нужно 500 штук модели X».",
        ],
      },
      {
        title: "Результат на практике",
        paragraphs: [
          "Кейс ELIA Suite: 45 минут → 2 минуты, +32% конверсия quote→заказ. Кейс KP-LLM: цены только из каталога, таблица, НДС, скачивание DOCX/PDF одним кликом.",
          "ROI: при 20 КП в неделю экономия 15+ часов менеджера — окупаемость за 2–4 месяца.",
        ],
      },
    ],
    checklist: [
      "Каталог — единственный источник цен и SKU",
      "Шаблон КП один на всю компанию",
      "Генерация из CRM в 1–2 клика",
      "Версионирование и аудит изменений",
    ],
    ctaTitle: "Хотите так же?",
    ctaText: "Покажем архитектуру на вашем каталоге и CRM — смета после короткого аудита.",
  },
  connectCrm1c: {
    metaTitle: "Как связать CRM с 1С — интеграция без ручного дублирования",
    metaDescription:
      "Как связать CRM с 1С: схема обмена, сущности, типичные ошибки. Практический гайд для amoCRM, Bitrix24 и 1С.",
    h1: "Как связать CRM с 1С",
    subtitle: "Двусторонний обмен без копипаста: заказы, оплаты, контрагенты, остатки.",
    sections: [
      {
        title: "Зачем интеграция",
        paragraphs: [
          "Без связки CRM и 1С менеджер создаёт сделку, бухгалтер — заказ в 1С, данные расходятся. Остатки в CRM устаревают, оплаты не закрывают этапы воронки.",
          "Интеграция даёт единый источник правды: сделка «выиграна» → заказ в 1С; оплата в 1С → сделка закрыта.",
        ],
      },
      {
        title: "Схема обмена",
        paragraphs: [
          "Промежуточный слой (API-шлюз): CRM отправляет событие → сервис создаёт документ в 1С → подтверждение и ID обратно в CRM. Очередь сообщений, retry при сбоях, журнал операций.",
          "Направления: CRM→1С (заказы, контрагенты), 1С→CRM (оплаты, остатки, статусы отгрузки). Частота: real-time для заказов, по расписанию для каталога.",
        ],
      },
      {
        title: "Типичные ошибки",
        paragraphs: [
          "Прямая связка без очереди — при сбое 1С теряются заказы. Дублирование контрагентов без сопоставления по ИНН. Синхронизация всего каталога в real-time — перегрузка.",
          "Правильно: идемпотентность (повторный запрос не создаёт второй заказ), сверка данных, алерты при расхождениях.",
        ],
      },
      {
        title: "Кто что делает",
        paragraphs: [
          "Мы — слой интеграции, спецификация, тесты, мониторинг. Доработки конфигурации 1С — ваш 1С-специалист или партнёр. CRM настраиваем мы.",
          "Бюджет базовой двусторонней синхронизации — от 300 000 ₽. Точная смета после аудита конфигурации.",
        ],
      },
    ],
    checklist: [
      "Карта сущностей: что синхронизируем",
      "Очередь и retry при сбоях",
      "Сопоставление контрагентов по ИНН",
      "Журнал операций и алерты",
      "Сверка данных раз в сутки",
    ],
    ctaTitle: "Нужна интеграция CRM и 1С?",
    ctaText: "Аудит конфигурации, схема обмена и смета — в течение 4 рабочих дней.",
  },
  whenAiMakesSense: {
    metaTitle: "Когда AI имеет смысл, а когда достаточно workflow",
    metaDescription:
      "Когда внедрять AI в бизнес, а когда хватит CRM и автоматизации без LLM. Практический гайд для CEO и IT.",
    h1: "Когда AI имеет смысл, а когда достаточно workflow",
    subtitle: "Технология выбирается в конце — после карты процесса и ROI.",
    sections: [
      {
        title: "Workflow без AI",
        paragraphs: [
          "Правила, маршруты, интеграции — когда процесс предсказуем: лид → CRM → задача → КП → отправка. Согласование документов по цепочке. Синхронизация CRM и 1С.",
          "Инструменты: amoCRM-роботы, Bitrix24 БП, n8n, кастомный API. Дешевле, предсказуемее, проще поддерживать.",
        ],
      },
      {
        title: "Когда AI оправдан",
        paragraphs: [
          "Неструктурированный текст: ответы по базе знаний, классификация обращений, извлечение полей из произвольных PDF. Диалоги с вариативными формулировками клиента.",
          "Условие: есть структурированные данные и процесс. AI без CRM и документов — пилот, который не масштабируется.",
        ],
      },
      {
        title: "Как принять решение",
        paragraphs: [
          "Аудит: посчитайте стоимость ручного труда в часах × ставка. Сравните сценарий «только workflow» и «workflow + AI». AI добавляет 20–40% к бюджету и требует MLOps.",
          "Начните с workflow. Добавьте AI на узком участке с измеримым ROI — поддержка L1, поиск в документах, сборка КП из диалога.",
        ],
      },
      {
        title: "Корпоративный контур",
        paragraphs: [
          "Для данных компании — private LLM, YandexGPT или GigaChat в вашем периметре. RAG со ссылками на источники. Guardrails и эскалация к человеку.",
          "Не отправляйте клиентские данные в публичный ChatGPT без DPA и политики.",
        ],
      },
    ],
    checklist: [
      "Карта процесса до выбора технологии",
      "ROI workflow и workflow+AI в одной таблице",
      "Пилот на одном участке, не «AI на всю компанию»",
      "Данные в периметре для корпоративных сценариев",
    ],
    ctaTitle: "AI & Automation Audit",
    ctaText: "Проведём аудит, посчитаем ROI по сценариям и скажем честно — нужен ли AI или хватит workflow.",
  },
  aiGlossary: {
    metaTitle: "Глоссарий AI для бизнеса — RAG, агенты, MCP, LangGraph",
    metaDescription:
      "Словарь терминов enterprise AI: LLM, RAG, AI-агенты, MCP, LangGraph, on-prem, guardrails — для закупки и IT.",
    h1: "Глоссарий AI для бизнеса",
    subtitle: "Ключевые термины enterprise AI — без маркетингового шума.",
    sections: [
      {
        title: "LLM (Large Language Model)",
        paragraphs: [
          "Большая языковая модель — основа генерации текста, классификации и диалога. В бизнесе LLM не заменяет CRM, а добавляет слой понимания неструктурированных данных: письма, документы, чаты.",
          "Выбор модели зависит от языка, compliance и бюджета: Claude, OpenAI, YandexGPT, GigaChat, self-hosted.",
        ],
      },
      {
        title: "RAG (Retrieval-Augmented Generation)",
        paragraphs: [
          "Подход, при котором LLM отвечает на основе ваших документов: поиск релевантных фрагментов → подстановка в промпт → ответ со ссылкой на источник.",
          "RAG снижает галлюцинации и обязателен для поддержки, баз знаний и внутренних ассистентов.",
        ],
      },
      {
        title: "AI-агент",
        paragraphs: [
          "Система, которая не только отвечает текстом, но и выполняет действия: создаёт сделку в CRM, генерирует PDF, запускает workflow, эскалирует к человеку.",
          "Агент = LLM + инструменты (API, MCP) + политики безопасности + мониторинг.",
        ],
      },
      {
        title: "MCP (Model Context Protocol)",
        paragraphs: [
          "Стандарт подключения LLM к внешним системам: CRM, базы данных, файловые хранилища. MCP-сервер описывает инструменты, которые модель может вызывать.",
          "Упрощает интеграцию агентов с корпоративным IT без хаотичных кастомных плагинов.",
        ],
      },
      {
        title: "LangGraph",
        paragraphs: [
          "Фреймворк для многошаговых агентов с состоянием (state), ветвлением, human-in-the-loop и observability. Используется, когда сценарий сложнее одной цепочки промптов.",
        ],
      },
      {
        title: "On-prem / Self-hosted AI",
        paragraphs: [
          "Развёртывание моделей и AI-сервисов в периметре компании. Данные не передаются в публичные API. Обязательно для банков, госсектора и компаний с жёстким compliance.",
        ],
      },
      {
        title: "Guardrails",
        paragraphs: [
          "Политики безопасности вокруг LLM: фильтрация PII, запрет опасных действий, лимиты токенов, эскалация при низкой уверенности, аудит запросов.",
        ],
      },
    ],
    ctaTitle: "Нужна помощь с выбором архитектуры?",
    ctaText: "Проведём AI & Automation Audit и переведём термины в конкретный план внедрения.",
  },
};

const GUIDES_EN: Record<string, GuideContent> = {
  automateSales: {
    metaTitle: "How to automate a sales department — step-by-step guide",
    metaDescription:
      "How to automate sales: leads, CRM, proposals, follow-up. Practical guide without buzzwords.",
    h1: "How to automate a sales department",
    subtitle: "Step-by-step: from process map to production — without shelfware.",
    sections: [
      {
        title: "Step 1. Find the bottleneck",
        paragraphs: [
          "Don't automate everything at once. Pick one high-pain process: proposal prep (45 min per doc), lost leads, manual follow-up or CRM–Excel duplication.",
          "Interview 2–3 managers: where time goes, what's copied manually, where deals stall. That's your ROI map.",
        ],
      },
      {
        title: "Step 2. CRM as center, not reporting",
        paragraphs: [
          "Sales automation works when CRM is the single source of truth. Website lead → deal in seconds. Stages change automatically. Follow-up tasks created by robots.",
          "Integrations: website, Telegram, ads → amoCRM or Bitrix24. Documents and 1C — bidirectional sync so managers don't duplicate orders.",
        ],
      },
      {
        title: "Step 3. Proposals in minutes",
        paragraphs: [
          "Typical win: CRM + catalog + template → PDF in 2 minutes not 45. Prices and SKU only from catalog — no invented line items.",
          "AI isn't always needed. Templates and rules deliver 90% of value. LLM for non-standard wording and large-catalog matching.",
        ],
      },
      {
        title: "Step 4. Follow-up and analytics",
        paragraphs: [
          "Auto reminders, Telegram alerts, escalation of stale deals to manager. Funnel dashboard: inbound → leads → payment.",
          "Measure: lead-to-proposal time, stage conversion, share of deals inactive > 3 days.",
        ],
      },
    ],
    checklist: [
      "Process map from lead to payment",
      "100% of leads reach CRM automatically",
      "Proposals generated from CRM without copy-paste",
      "Scheduled follow-up, not when someone remembers",
      "Funnel dashboard for leadership",
    ],
    ctaTitle: "Need a sales department audit?",
    ctaText: "We'll audit, calculate ROI and propose an implementation plan with fixed scope.",
  },
  speedUpProposals: {
    metaTitle: "How to speed up commercial proposal preparation",
    metaDescription:
      "How to cut proposal time from 45 minutes to 2: CRM, templates, catalog, document automation.",
    h1: "How to speed up commercial proposal preparation",
    subtitle: "From 45 minutes of manual work to 2 — on real client cases.",
    sections: [
      {
        title: "Why proposals take 45 minutes",
        paragraphs: [
          "Manager finds prices in Excel or 1C, copies SKU to Word, calculates VAT and currency, gets discount approval, saves PDF and sends. Each step — different system.",
          "Errors: outdated price list, wrong SKU, different template versions per manager.",
        ],
      },
      {
        title: "Fast proposal architecture",
        paragraphs: [
          "Single catalog (1C or PIM) → CRM (deal + line items) → DOCX/PDF template → generation in 1–2 minutes. Discounts and terms from rules.",
          "Optional: AI layer for text assembly and matching from dialog «need 500 units of model X».",
        ],
      },
      {
        title: "Real results",
        paragraphs: [
          "ELIA Suite case: 45 min → 2 min, +32% quote→order conversion. KP-LLM case: prices only from catalog, table, VAT, one-click DOCX/PDF.",
          "ROI: at 20 proposals/week, 15+ manager hours saved — payback in 2–4 months.",
        ],
      },
    ],
    checklist: [
      "Catalog — single source of prices and SKU",
      "One proposal template company-wide",
      "Generation from CRM in 1–2 clicks",
      "Versioning and change audit",
    ],
    ctaTitle: "Want the same?",
    ctaText: "We'll show architecture on your catalog and CRM — estimate after short audit.",
  },
  connectCrm1c: {
    metaTitle: "How to connect CRM with 1C — integration without manual duplication",
    metaDescription:
      "How to connect CRM with 1C: exchange schema, entities, typical mistakes. Practical guide for amoCRM, Bitrix24 and 1C.",
    h1: "How to connect CRM with 1C",
    subtitle: "Bidirectional exchange without copy-paste: orders, payments, counterparties, stock.",
    sections: [
      {
        title: "Why integrate",
        paragraphs: [
          "Without CRM–1C link, manager creates deal, accountant creates order in 1C, data diverges. Stock in CRM goes stale, payments don't close funnel stages.",
          "Integration gives single source of truth: deal won → order in 1C; payment in 1C → deal closed.",
        ],
      },
      {
        title: "Exchange schema",
        paragraphs: [
          "Middleware (API gateway): CRM event → service creates 1C document → confirmation and ID back to CRM. Message queue, retry on failure, operation log.",
          "Directions: CRM→1C (orders, counterparties), 1C→CRM (payments, stock, shipment status). Frequency: real-time for orders, scheduled for catalog.",
        ],
      },
      {
        title: "Typical mistakes",
        paragraphs: [
          "Direct link without queue — 1C outage loses orders. Duplicate counterparties without INN matching. Full catalog sync in real-time — overload.",
          "Right approach: idempotency, data reconciliation, alerts on mismatch.",
        ],
      },
      {
        title: "Who does what",
        paragraphs: [
          "We deliver integration layer, spec, tests, monitoring. 1C config changes — your 1C specialist or partner. CRM setup — us.",
          "Basic bidirectional sync budget — from €3,000. Exact estimate after configuration audit.",
        ],
      },
    ],
    checklist: [
      "Entity map: what syncs",
      "Queue and retry on failure",
      "Counterparty matching by tax ID",
      "Operation log and alerts",
      "Daily data reconciliation",
    ],
    ctaTitle: "Need CRM–1C integration?",
    ctaText: "Configuration audit, exchange schema and estimate — within 4 business days.",
  },
  whenAiMakesSense: {
    metaTitle: "When AI makes sense vs when workflow is enough",
    metaDescription:
      "When to deploy AI in business vs CRM and automation without LLM. Practical guide for CEO and IT.",
    h1: "When AI makes sense vs when workflow is enough",
    subtitle: "Technology is chosen last — after process map and ROI.",
    sections: [
      {
        title: "Workflow without AI",
        paragraphs: [
          "Rules, routes, integrations — when process is predictable: lead → CRM → task → proposal → send. Document approval chains. CRM–1C sync.",
          "Tools: amoCRM robots, Bitrix24 BP, n8n, custom API. Cheaper, predictable, easier to maintain.",
        ],
      },
      {
        title: "When AI is justified",
        paragraphs: [
          "Unstructured text: knowledge base answers, ticket classification, field extraction from arbitrary PDFs. Dialogs with variable client wording.",
          "Prerequisite: structured data and process. AI without CRM and documents — a pilot that won't scale.",
        ],
      },
      {
        title: "How to decide",
        paragraphs: [
          "Audit: calculate manual labor cost in hours × rate. Compare «workflow only» vs «workflow + AI». AI adds 20–40% to budget and needs MLOps.",
          "Start with workflow. Add AI on a narrow slice with measurable ROI — L1 support, document search, proposal assembly from dialog.",
        ],
      },
      {
        title: "Corporate perimeter",
        paragraphs: [
          "For company data — private LLM, YandexGPT or GigaChat in your contour. RAG with source citations. Guardrails and human escalation.",
          "Don't send client data to public ChatGPT without DPA and policy.",
        ],
      },
    ],
    checklist: [
      "Process map before technology choice",
      "ROI table for workflow vs workflow+AI",
      "Pilot on one slice, not «AI for whole company»",
      "Data in perimeter for corporate scenarios",
    ],
    ctaTitle: "AI & Automation Audit",
    ctaText: "We'll audit, calculate ROI by scenario and honestly say whether AI is needed or workflow suffices.",
  },
  aiGlossary: {
    metaTitle: "AI glossary for business — RAG, agents, MCP, LangGraph",
    metaDescription:
      "Enterprise AI terms: LLM, RAG, AI agents, MCP, LangGraph, on-prem, guardrails — for procurement and IT.",
    h1: "AI glossary for business",
    subtitle: "Key enterprise AI terms — without marketing noise.",
    sections: [
      {
        title: "LLM (Large Language Model)",
        paragraphs: [
          "The foundation for text generation, classification and dialogue. In business, LLM doesn't replace CRM — it adds a layer for unstructured data: emails, documents, chats.",
          "Model choice depends on language, compliance and budget: Claude, OpenAI, YandexGPT, GigaChat, self-hosted.",
        ],
      },
      {
        title: "RAG (Retrieval-Augmented Generation)",
        paragraphs: [
          "LLM answers based on your documents: retrieve relevant chunks → inject into prompt → answer with source citation.",
          "RAG reduces hallucinations and is essential for support, knowledge bases and internal assistants.",
        ],
      },
      {
        title: "AI agent",
        paragraphs: [
          "A system that not only replies but acts: creates CRM deals, generates PDFs, triggers workflows, escalates to humans.",
          "Agent = LLM + tools (API, MCP) + security policies + monitoring.",
        ],
      },
      {
        title: "MCP (Model Context Protocol)",
        paragraphs: [
          "Standard for connecting LLMs to external systems: CRM, databases, file storage. MCP server describes tools the model can invoke.",
          "Simplifies agent integration with corporate IT without chaotic custom plugins.",
        ],
      },
      {
        title: "LangGraph",
        paragraphs: [
          "Framework for multi-step agents with state, branching, human-in-the-loop and observability — when scenarios exceed simple prompt chains.",
        ],
      },
      {
        title: "On-prem / Self-hosted AI",
        paragraphs: [
          "Deploying models and AI services inside company perimeter. Data never goes to public APIs. Required for banks, government and strict compliance.",
        ],
      },
      {
        title: "Guardrails",
        paragraphs: [
          "Security policies around LLM: PII filtering, blocking dangerous actions, token limits, escalation on low confidence, request audit.",
        ],
      },
    ],
    ctaTitle: "Need help choosing architecture?",
    ctaText: "We'll run an AI & Automation Audit and turn terms into a concrete implementation plan.",
  },
};

export function getGuideContent(contentKey: string, locale: GuideLocale): GuideContent | undefined {
  const map = locale === "en" ? GUIDES_EN : GUIDES_RU;
  return map[contentKey];
}

export const GUIDE_LABELS = {
  ru: {
    salesLanding: "Автоматизация продаж",
    crmLanding: "Внедрение CRM",
    documentsLanding: "Документооборот",
    oneCLanding: "Интеграция 1С",
    processesLanding: "Автоматизация процессов",
    aiLanding: "Enterprise AI",
    ragLanding: "RAG и поиск",
    agentLanding: "AI-агенты",
    backToGuides: "← Все гайды",
    checklistTitle: "Чеклист",
    relatedTitle: "Связанные страницы",
    readGuide: "Читать гайд",
    guidesTitle: "Гайды и практика",
    guidesSubtitle: "Как автоматизировать, как связать системы, когда AI имеет смысл — без buzzword.",
  },
  en: {
    salesLanding: "Sales automation",
    crmLanding: "CRM implementation",
    documentsLanding: "Document workflow",
    oneCLanding: "1C integration",
    processesLanding: "Process automation",
    aiLanding: "Enterprise AI",
    ragLanding: "RAG & search",
    agentLanding: "AI agents",
    backToGuides: "← All guides",
    checklistTitle: "Checklist",
    relatedTitle: "Related pages",
    readGuide: "Read guide",
    guidesTitle: "Guides & practice",
    guidesSubtitle: "How to automate, how to connect systems, when AI makes sense — no buzzwords.",
  },
} as const;

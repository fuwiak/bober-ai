/** Claude AI for SMB — path /claude. SEO + GEO (generative-engine) landing. */
export const CLAUDE_PAGE = {
  lineRu: "Claude AI для МСБ",
  lineEn: "Claude AI for SMB",

  metaTitleRu: "Claude AI для малого и среднего бизнеса — внедрение и автоматизация | Bober AI",
  metaTitleEn: "Claude AI for small and mid-size business — deployment & automation | Bober AI",
  metaDescRu:
    "Внедряем Claude AI, Claude API, Claude Code и Claude MCP в процессы МСБ: CRM, документы, продажи, поддержка. Фиксированная смета, NDA, Россия и СНГ — без продажи подписки.",
  metaDescEn:
    "We deploy Claude AI, Claude API, Claude Code and Claude MCP into SMB workflows: CRM, documents, sales, support. Fixed estimate, NDA, Russia & CIS — we don't sell subscriptions.",
  metaKeywordsRu: [
    "claude ai",
    "claude для бизнеса",
    "claude api",
    "claude code",
    "claude mcp",
    "claude агент",
    "claude нейросеть",
    "claude opus",
    "claude sonnet",
    "claude pro",
    "claude в россии",
    "anthropic api",
    "claude skills",
    "внедрение claude для мсб",
    "claude автоматизация crm",
    "claude для малого бизнеса",
  ],
  metaKeywordsEn: [
    "claude ai business",
    "claude api",
    "claude code",
    "claude mcp",
    "claude agent",
    "anthropic api",
    "claude for smb",
    "claude crm automation",
    "claude russia",
    "deploy claude for business",
  ],

  h1Ru: "Claude AI для малого и среднего бизнеса",
  h1En: "Claude AI for small and mid-size business",
  subtitleRu:
    "Claude AI, Claude API, Claude Code и Claude MCP — самые частые запросы в поиске. Мы не продаём подписку Anthropic и не настраиваем личный аккаунт: внедряем Claude в процессы компании — CRM, документы, продажи, поддержку и базу знаний. Для МСБ в России и СНГ — с фиксированной сметой и NDA.",
  subtitleEn:
    "Claude AI, Claude API, Claude Code and Claude MCP are top search intents. We don't sell Anthropic subscriptions or set up personal accounts: we deploy Claude into company workflows — CRM, documents, sales, support and knowledge base. For SMB in Russia & CIS — fixed estimate and NDA.",

  /** GEO: short entity card for LLM answer engines */
  geoTitleRu: "Кто внедряет Claude и для кого",
  geoTitleEn: "Who deploys Claude and for whom",
  geoFactsRu: [
    "Bober AI Systems — корпоративный AI-интегратор в Москве (онлайн по России и СНГ).",
    "Аудитория лендинга: малый и средний бизнес, команды продаж, поддержки и операций.",
    "Продукт: внедрение Claude (Anthropic) в CRM, документы, продажи и базу знаний — не розничная подписка Claude Pro.",
    "Старт: аудит от 150 000 ₽, пилот от 300 000 ₽, промышленное внедрение от 500 000 ₽. Фиксированная смета до старта.",
    "Контакт: contact@bober-ai.dev · Telegram · ответ в течение 4 рабочих часов.",
  ],
  geoFactsEn: [
    "Bober AI Systems is a corporate AI integrator based in Moscow (remote across Russia & CIS).",
    "Audience: small and mid-size businesses — sales, support and operations teams.",
    "Offer: deploy Claude (Anthropic) into CRM, documents, sales and knowledge bases — not retail Claude Pro subscriptions.",
    "Start: audit from ~€1,500, pilot from ~€3,000, production from ~€5,000. Fixed estimate before build.",
    "Contact: contact@bober-ai.dev · Telegram · reply within 4 business hours.",
  ],

  popularLabelRu: "Популярные запросы про Claude",
  popularLabelEn: "Popular Claude searches",
  terms: [
    "Claude AI",
    "Claude API",
    "Claude Code",
    "Claude MCP",
    "Claude Agent",
    "Claude нейросеть",
    "Claude Opus",
    "Claude Sonnet",
    "Claude Pro",
    "Claude в России",
    "Anthropic API",
    "Claude Skills",
  ] as const,

  problemsTitleRu: "Когда Claude нужен МСБ",
  problemsTitleEn: "When SMB teams need Claude",
  problemsRu: [
    "Менеджеры тратят часы на КП, письма и копипаст между CRM и почтой",
    "Поддержка отвечает из головы, а не из актуальной базы знаний",
    "Документы и счета разбирают вручную",
    "Нужен AI-агент с действиями в CRM — не просто чат",
    "Хотите Claude API / MCP, но нет инженера внутри",
    "Личный Claude Pro у сотрудников — хаос с данными и доступом",
  ],
  problemsEn: [
    "Managers burn hours on proposals, email and CRM copy-paste",
    "Support answers from memory instead of a live knowledge base",
    "Invoices and docs are processed by hand",
    "You need an AI agent that acts in CRM — not just a chat",
    "You want Claude API / MCP but have no in-house engineer",
    "Personal Claude Pro accounts scatter data and access",
  ],

  servicesTitleRu: "Что внедряем",
  servicesTitleEn: "What we deploy",
  servicesRu: [
    {
      title: "Claude API в CRM и почте",
      summary: "Черновики писем, КП, саммари звонков и follow-up прямо в amoCRM / Bitrix24.",
    },
    {
      title: "Claude MCP",
      summary: "Подключение Claude к CRM, файлам и внутренним API без ручных выгрузок.",
    },
    {
      title: "Claude-агент для продаж и поддержки",
      summary: "Заявки, ответы из базы знаний, обновление сделок, эскалация к человеку.",
    },
    {
      title: "Документы и OCR + Claude",
      summary: "Извлечение полей из PDF/сканов и маршрутизация в 1С / CRM.",
    },
    {
      title: "Claude Code для интеграций",
      summary: "Ускорение скриптов, MCP-серверов и внутренних инструментов под ваш контур.",
    },
    {
      title: "Claude в России — рабочий контур",
      summary: "Корпоративные ключи, прокси при необходимости, гибрид с YandexGPT/GigaChat где требует compliance.",
    },
  ],
  servicesEn: [
    {
      title: "Claude API in CRM and email",
      summary: "Drafts, proposals, call summaries and follow-ups inside amoCRM / Bitrix24.",
    },
    {
      title: "Claude MCP",
      summary: "Connect Claude to CRM, files and internal APIs without manual exports.",
    },
    {
      title: "Claude agent for sales and support",
      summary: "Inbound leads, knowledge-base replies, deal updates, human escalation.",
    },
    {
      title: "Documents and OCR + Claude",
      summary: "Extract fields from PDFs/scans and route into ERP / CRM.",
    },
    {
      title: "Claude Code for integrations",
      summary: "Faster scripts, MCP servers and internal tools for your perimeter.",
    },
    {
      title: "Claude in Russia — production contour",
      summary: "Corporate keys, proxy if needed, hybrid with YandexGPT/GigaChat where compliance requires it.",
    },
  ],

  processTitleRu: "Как проходит внедрение для МСБ",
  processTitleEn: "How an SMB engagement runs",
  processRu: [
    "30-минутный discovery: узкое место, системы, объём ручной работы",
    "Короткий аудит и фиксированная смета пилота (обычно 2–4 недели)",
    "Пилот на одном процессе: CRM / документы / поддержка — с измеримым KPI",
    "Передача команде: доступы, runbook, опциональное сопровождение",
  ],
  processEn: [
    "30-minute discovery: bottleneck, systems, volume of manual work",
    "Short audit and fixed pilot estimate (usually 2–4 weeks)",
    "Pilot on one process: CRM / documents / support — with a measurable KPI",
    "Handover: access, runbook, optional support retainer",
  ],

  glossaryHref: "/guides/ai-glossary" as const,
  glossaryLabelRu: "Все вопросы про Claude — в глоссарии",
  glossaryLabelEn: "All Claude questions — in the glossary",
  servicesHref: "/services" as const,
  servicesLabelRu: "Все решения",
  servicesLabelEn: "All solutions",
  faqHref: "/faq" as const,
  faqLabelRu: "Общий FAQ",
  faqLabelEn: "General FAQ",

  faqRu: [
    {
      q: "Вы продаёте подписку Claude Pro?",
      a: "Нет. Мы внедряем Claude в бизнес-процессы через API и MCP. Подписку Anthropic оформляет клиент или мы помогаем с корпоративным контуром доступа.",
    },
    {
      q: "Подойдёт ли Claude малому бизнесу с бюджетом от 150 000 ₽?",
      a: "Да. Для МСБ начинаем с аудита или узкого пилота на одном процессе — КП, поддержка или документы — с фиксированной сметой до старта.",
    },
    {
      q: "Чем Claude лучше «просто чата» для компании?",
      a: "В контуре компании Claude работает с вашими данными и действиями: CRM, файлы, регламенты. Контекст не теряется после каждого диалога, есть роли и журналы.",
    },
    {
      q: "Можно ли использовать Claude в России?",
      a: "Да. Проектируем рабочий контур: корпоративные ключи, прокси при необходимости, on-prem/гибрид и российские модели там, где требует compliance.",
    },
    {
      q: "Что такое Claude MCP и зачем он МСБ?",
      a: "Model Context Protocol подключает Claude к CRM, БД и API. Агент сам берёт данные из Bitrix24/amoCRM/1С — без копипаста и ручных выгрузок.",
    },
    {
      q: "Как быстро стартовать?",
      a: "Заявка или Telegram → discovery 30 минут → план и вилка бюджета в течение 24 часов. Ответ на новые запросы — в течение 4 рабочих часов.",
    },
  ],
  faqEn: [
    {
      q: "Do you sell Claude Pro subscriptions?",
      a: "No. We deploy Claude into business workflows via API and MCP. The Anthropic subscription is owned by the client; we help with a corporate access contour.",
    },
    {
      q: "Does Claude fit SMB budgets from ~€1,500?",
      a: "Yes. For SMB we start with an audit or a narrow pilot on one process — proposals, support or documents — with a fixed estimate before build.",
    },
    {
      q: "Why is Claude better than a plain chat for a company?",
      a: "Inside the company perimeter Claude works with your data and actions: CRM, files, playbooks. Context persists, with roles and audit logs.",
    },
    {
      q: "Can Claude be used in Russia?",
      a: "Yes. We design a working contour: corporate keys, proxy if needed, on-prem/hybrid and Russian models where compliance requires it.",
    },
    {
      q: "What is Claude MCP and why does SMB need it?",
      a: "Model Context Protocol connects Claude to CRM, databases and APIs. The agent pulls data from Bitrix24/amoCRM/ERP without copy-paste.",
    },
    {
      q: "How fast can we start?",
      a: "Request or Telegram → 30-minute discovery → plan and budget range within 24 hours. New inquiries get a reply within 4 business hours.",
    },
  ],
} as const;

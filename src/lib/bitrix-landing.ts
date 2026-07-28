/**
 * Контент и ключи пакетов для bitrix.bober-systems.ru.
 * Используется лендингом и YML-фидом (якоря #slug).
 */

export type BitrixPackage = {
  /** Стабильный ключ оффера (feed offer id). */
  id: string;
  /** Якорь секции на лендинге / set-id в YML. */
  slug: string;
  title: string;
  /** SEO/партнёрские ключи (Битрикс24 + AI) — UI и meta. */
  keywords: string[];
  /** Короткое описание пакета. */
  description: string;
  /** Что получает клиент (1–2 строки). */
  gets: string;
  /** Цена для UI. */
  priceLabel: string;
  /** Нижняя граница цены для фида (RUR). */
  priceFrom: number;
  salesNotes: string;
  picture: string;
  conversion: number;
};

export const BITRIX_LANDING_ABOUT =
  "Внедряем Битрикс24 и AI-автоматизацию под ключ: CRM, продажи, аналитика, интеграции с 1С/телефонией и локальный LLM. Пилот от 300 000 ₽.";

/** Партнёрская программа 1С-Битрикс (официальный ID). */
export const BITRIX_PARTNER_PROGRAM = {
  label: "Участие в партнерской программе 1С-Битрикс",
  id: "28909898",
  line: "Участие в партнерской программе 1С-Битрикс · ID 28909898",
} as const;

/**
 * Позиционирование поверх нативного BitrixGPT / агента CRM:
 * не конкурируем с генератором текста — продаём слой внедрения.
 */
export const BITRIX_LAYER_POSITIONING = {
  headline: "Расширяем возможности Bitrix24 AI под реальные процессы компании",
  lead:
    "1С, телефония, документы, коммерческие предложения и собственная бизнес-логика — поверх нативного агента CRM, а не вместо него.",
  nativeLimits: [
    "Генерация сообщений и простые саммари",
    "Базовые вопросы к данным CRM",
    "Стандартный «ассистент Битрикс24» без вашего контура",
  ],
  ourLayer: [
    "Связка Битрикс24 с 1С, телефонией, складом и документами",
    "Свои правила квалификации лидов и контроль полноты данных",
    "Действия вне Битрикс24: КП, учёт, эскалации, нестандартные отчёты",
    "MCP: внешние сервисы в BitrixGPT и Битрикс24 в Claude / ChatGPT",
  ],
} as const;

/**
 * MCP в экосистеме Битрикс24: два направления — внутрь BitrixGPT и наружу к Claude/ChatGPT.
 */
export const BITRIX_MCP = {
  title: "MCP для Битрикс24 и BitrixGPT",
  lead:
    "MCP — открытый протокол безопасного подключения AI к сервисам и данным без разовых «костыльных» интеграций. Настраиваем оба направления: сервисы → BitrixGPT и внешние AI → действия в Битрикс24.",
  inbound: {
    title: "Внешние сервисы → BitrixGPT",
    text: "Через MCP Hub сотрудники подключают 1С, базы знаний, календари, почту и другие системы. Поручения AI-агентам прямо из Битрикс24: договорённости из письма, остатки из 1С, встреча в календаре.",
    points: [
      "Подключение сервисов к BitrixGPT и AI-агентам портала",
      "Права: кто может подключать (роли / все сотрудники — по политике компании)",
      "Каталог подключений и аудит действий",
    ],
  },
  outbound: {
    title: "Claude / ChatGPT → Битрикс24",
    text: "Внешние AI-системы выполняют действия в Битрикс24 от имени сотрудника через MCP-сервер: поиск и анализ данных, задачи, обновление сделок — в рамках его прав доступа.",
    points: [
      "MCP-сервер Битрикс24 для Claude, ChatGPT, Perplexity и своих агентов",
      "Действия только в периметре прав сотрудника",
      "Логи и критерии приёмки — без «чёрного ящика»",
    ],
  },
  offer:
    "Внедряем MCP-контур под ваши системы: схема tools, права, деплой в вашем облаке или on-premise, связка с уже работающим AI-слоем продаж.",
} as const;

/**
 * Сильный продуктовый пример: закрытый контур продаж
 * (разговор → вывод → CRM → задача → follow-up → контроль).
 */
export const BITRIX_SALES_LOOP = {
  title: "AI-контур отдела продаж",
  lead:
    "Телефония, переписки, CRM и AI — один операционный контур. Не отдельный чат-бот, не «анализ звонков» и не CRM-интеграция порознь: контакт → анализ разговора → обновление CRM → следующее действие → отчёт менеджеру.",
  steps: [
    "Анализ всех разговоров и чатов",
    "Выявление намерений и возражений",
    "Автозаполнение CRM",
    "Создание следующего действия",
    "Напоминания и эскалации",
    "Отчёт об упущенных сделках",
  ],
  scenarios: [
    "Квалификация новых лидов",
    "Реактивация старой базы",
    "Контроль качества разговоров",
    "Автозадачи и follow-up",
    "Выявление упущенных сделок",
  ],
  why:
    "Ценнее, чем «AI-анализ звонков»: напрямую влияет на дисциплину продаж. Телефония — обязательный канал контура, не опция «потом».",
} as const;

/**
 * Product-shot кейс: собственный контур Kwork → Bitrix24.
 * Картинка: public/cases/bitrix24-kwork-crm.jpg
 */
export const BITRIX_CASE_KWORK = {
  label: "Кейс · Kwork → Bitrix24",
  title: "Заказы Kwork автоматически попадают в воронку Bitrix24",
  lead:
    "Кастомная интеграция Kwork с Bitrix24 CRM: клиент, услуга, сумма и статус в единой воронке — собственный контур без зависимости от стороннего SaaS.",
  steps: [
    "Захват заказа с Kwork (pull / capture / webhook)",
    "Маппинг клиента, услуги и суммы",
    "Создание или обновление сделки в Bitrix24",
    "Фиксация суммы и статуса в карточке CRM",
    "Лог синка и обработка ошибок по заказам",
  ],
  result:
    "Живая доска сделок: ML/Python и другие заказы с Kwork видны в Bitrix24 со стадиями и суммами.",
  systems: "Kwork · Bitrix24 REST · webhook / sync",
  metric: "Собственный интеграционный контур без зависимости от стороннего SaaS",
  metricNote: "Скриншот живой воронки на портале",
  image: "/cases/bitrix24-kwork-crm.jpg",
  imageAlt:
    "Скриншот канбана сделок Bitrix24 CRM: сделки из Kwork (в том числе ML и Python) на тёмном интерфейсе — живая воронка кастомной интеграции",
  imageCaption:
    "Канбан сделок Bitrix24: заказы с Kwork в единой воронке со стадиями и суммами",
} as const;

/**
 * Точные Wordstat-фразы = title услуг в кабинете Яндекс Услуг
 * (спека «Настройка Битрикс»). Порядок — по частоте.
 */
export const BITRIX_WORDSTAT_SERVICES = [
  {
    id: "ws-doc-automation",
    slug: "avtomatizaciya-dokumentov",
    title: "Автоматизация документов",
    wordstat: 4771,
    priceFrom: 24000,
    priceLabel: "от 24 000 ₽",
    description:
      "Автоматизация документов: шаблоны, генерация из сделки Bitrix24, согласования и PDF. Меньше ручного копипаста.",
  },
  {
    id: "ws-bitrix-setup",
    slug: "nastrojka-bitrix24",
    title: "Настройка Bitrix24",
    wordstat: 1377,
    priceFrom: 18000,
    priceLabel: "от 18 000 ₽",
    description:
      "Настройка Bitrix24: воронка, поля, права, базовые роботы под отдел продаж. Фиксированная смета.",
  },
  {
    id: "ws-bitrix-automation",
    slug: "avtomatizaciya-bitrix24",
    title: "Автоматизация Bitrix24",
    wordstat: 300,
    priceFrom: 20000,
    priceLabel: "от 20 000 ₽",
    description:
      "Автоматизация Bitrix24: интеграция с 1С, 1С:Битрикс, МойСклад, WordPress; открытые линии Telegram, ВКонтакте, WhatsApp; роботы и бизнес-процессы внутри портала.",
  },
  {
    id: "ws-bitrix-1c",
    slug: "integraciya-bitrix24-1c",
    title: "Интеграция Bitrix24 с 1С",
    wordstat: 162,
    priceFrom: 35000,
    priceLabel: "от 35 000 ₽",
    description:
      "Интеграция Bitrix24 с 1С: заказы, контрагенты, статусы без ручного переноса. Маппинг, тест, регламент.",
  },
  {
    id: "ws-kp-gen",
    slug: "generaciya-kommercheskogo-predlozheniya",
    title: "Генерация коммерческого предложения",
    wordstat: 90,
    priceFrom: 20000,
    priceLabel: "от 20 000 ₽",
    description:
      "Генерация коммерческого предложения из Bitrix24: каталог, условия, PDF. Типовое КП за минуты.",
  },
  {
    id: "ws-bitrix-ai",
    slug: "bitrix24-ai",
    title: "Bitrix24 AI",
    wordstat: 79,
    priceFrom: 28000,
    priceLabel: "от 28 000 ₽",
    description:
      "Bitrix24 AI: ассистент в CRM — черновики писем, суммаризация сделки, подсказки менеджеру.",
  },
  {
    id: "ws-kp-auto",
    slug: "avtomatizaciya-kommercheskogo-predlozheniya",
    title: "Автоматизация коммерческого предложения",
    wordstat: 73,
    priceFrom: 22000,
    priceLabel: "от 22 000 ₽",
    description:
      "Автоматизация коммерческого предложения в Bitrix24: прайс → КП → отправка из сделки.",
  },
  {
    id: "ws-telephony",
    slug: "nastrojka-telefonii-bitrix24",
    title: "Настройка телефонии Bitrix24",
    wordstat: 59,
    priceFrom: 18000,
    priceLabel: "от 18 000 ₽",
    description:
      "Настройка телефонии Bitrix24: запись звонков, привязка к сделке, пропущенные и задачи. База для AI-контура продаж (саммари → CRM → follow-up).",
  },
  {
    id: "ws-ai-assistant",
    slug: "vnedrenie-ai-assistenta",
    title: "Внедрение AI-ассистента",
    wordstat: 46,
    priceFrom: 32000,
    priceLabel: "от 32 000 ₽",
    description:
      "Внедрение AI-ассистента: база знаний, ответы в чате или CRM Bitrix24, контроль качества.",
  },
  {
    id: "ws-rag",
    slug: "razrabotka-rag-sistem",
    title: "Разработка RAG-систем",
    wordstat: 39,
    priceFrom: 45000,
    priceLabel: "от 45 000 ₽",
    description:
      "Разработка RAG-систем: поиск по документам со ссылкой на источник, связка с Bitrix24.",
  },
] as const;

/** SEO-ключи лендинга: сначала точные Wordstat, затем пары Битрикс24 + AI. */
export const BITRIX_LANDING_KEYWORDS = [
  ...BITRIX_WORDSTAT_SERVICES.map((s) => s.title),
  "внедрение битрикс24 с ai",
  "ai-автоматизация битрикс24",
  "ai-аналитика битрикс24",
  "битрикс24 + локальный llm",
  "интеграция битрикс24 и ai для продаж",
  "ai ассистент crm",
  "автоматизация amocrm",
  "bitrixgpt",
  "ai-контур отдела продаж",
  "телефония crm ai битрикс24",
  "анализ звонков битрикс24",
  "партнер 1с-битрикс",
  "mcp битрикс24",
  "bitrixgpt mcp",
  "mcp hub битрикс24",
] as const;

/** Пакеты внедрения — эталон RU для лендинга и фида. */
export const BITRIX_PACKAGES: BitrixPackage[] = [
  {
    id: "bitrix-start",
    slug: "bitrix-start",
    title: "Внедрение Битрикс24 с AI",
    keywords: ["внедрение битрикс24 с ai", "битрикс24 ai", "запуск портала битрикс24"],
    description:
      "Разворачиваем и настраиваем портал Битрикс24 с заделом под AI: воронка, права, поля сделок, сайт и реклама.",
    gets: "Рабочий портал с воронкой продаж, ролями и первичными интеграциями — команда ведёт сделки в CRM, а не в Excel.",
    priceLabel: "от 150 000 ₽",
    priceFrom: 150000,
    // YML sales_notes ≤50 chars (Yandex rejects longer)
    salesNotes: "от 150 000 ₽",
    picture: "/stock/office-tower.jpg",
    conversion: 91,
  },
  {
    id: "bitrix-crm-automation",
    slug: "crm-automation",
    title: "AI-автоматизация Битрикс24",
    keywords: ["ai-автоматизация битрикс24", "интеграция битрикс24 и ai для продаж", "роботы битрикс24"],
    description:
      "Роботы, бизнес-процессы и AI-слой поверх BitrixGPT: автозаполнение карточек, скоринг, follow-up и замкнутый контур «звонок → CRM → задача».",
    gets: "Карточки заполняются из звонков и писем, просроченные касания поднимаются автоматически, руководитель видит живую воронку и эскалации.",
    priceLabel: "от 300 000 ₽",
    priceFrom: 300000,
    salesNotes: "от 300 000 ₽",
    picture: "/diagrams/crm-integration.svg",
    conversion: 94,
  },
  {
    id: "bitrix-ai-analytics",
    slug: "ai-analytics",
    title: "AI-аналитика Битрикс24",
    keywords: ["ai-аналитика битрикс24", "чат по данным crm", "аналитика воронки битрикс24"],
    description:
      "Чат по данным CRM, звонкам и задачам — ответы о воронке и менеджерах вместо ручных отчётов в Excel.",
    gets: "Ответы по факту сделок и коммуникаций за минуты: где падает конверсия, кто отстаёт, какие этапы чинить первыми.",
    priceLabel: "от 300 000 ₽",
    priceFrom: 300000,
    salesNotes: "от 300 000 ₽",
    picture: "/diagrams/sales-pipeline.svg",
    conversion: 93,
  },
  {
    id: "bitrix-sales-loop",
    slug: "sales-loop",
    title: "AI-контур отдела продаж",
    keywords: [
      "ai-контур отдела продаж",
      "телефония crm ai битрикс24",
      "анализ звонков битрикс24",
      "автоматизация follow-up crm",
    ],
    description:
      "Телефония + переписки + Bitrix24/amoCRM + AI: квалификация лидов, саммари звонков, автозадачи, follow-up и отчёт об упущенных сделках — один продукт.",
    gets: "Замкнутый цикл продаж: звонок или чат → факты в карточке CRM → задача менеджеру → контроль исполнения и отчёт руководителю.",
    priceLabel: "от 300 000 ₽",
    priceFrom: 300000,
    salesNotes: "от 300 000 ₽",
    picture: "/diagrams/sales-pipeline.svg",
    conversion: 95,
  },
  {
    id: "bitrix-integrations",
    slug: "integrations-1c",
    title: "Интеграция Битрикс24 и AI для продаж",
    keywords: [
      "интеграция битрикс24 и ai для продаж",
      "интеграция битрикс24 1с",
      "битрикс24 телефония мессенджеры",
    ],
    description:
      "Связка Битрикс24 с 1С, amoCRM, телефонией и мессенджерами плюс AI-сценарии поверх единого контура продаж.",
    gets: "Единая картина по клиенту и заказу: CRM, учёт, звонки и мессенджеры без ручного копирования и расхождений статусов.",
    priceLabel: "от 500 000 ₽",
    priceFrom: 500000,
    salesNotes: "от 500 000 ₽",
    picture: "/diagrams/erp-sync.svg",
    conversion: 92,
  },
  {
    id: "bitrix-mcp",
    slug: "mcp",
    title: "MCP для Битрикс24 и BitrixGPT",
    keywords: ["mcp битрикс24", "bitrixgpt mcp", "mcp hub битрикс24"],
    description:
      "Подключаем внешние сервисы к BitrixGPT через MCP Hub и отдаём Битрикс24 во внешние AI (Claude, ChatGPT) через MCP-сервер — в рамках прав сотрудников.",
    gets: "Рабочий MCP-контур: 1С, знания, почта и календарь для агентов внутри портала плюс безопасные действия из внешних AI в CRM и задачах.",
    priceLabel: "от 300 000 ₽",
    priceFrom: 300000,
    salesNotes: "от 300 000 ₽",
    picture: "/diagrams/crm-integration.svg",
    conversion: 93,
  },
  {
    id: "bitrix-private-llm",
    slug: "private-llm",
    title: "Битрикс24 + локальный LLM",
    keywords: ["битрикс24 + локальный llm", "приватный llm", "on-premise ai битрикс24"],
    description:
      "Локальный LLM в вашем облаке или on-premise — AI для Битрикс24 без передачи данных во внешние сервисы без согласия.",
    gets: "AI-сценарии на ваших серверах или выделенном контуре: NDA, журналы доступа, периметр компании.",
    priceLabel: "по запросу",
    priceFrom: 500000,
    salesNotes: "от 500 000 ₽",
    picture: "/stock/cyber-padlock.jpg",
    conversion: 90,
  },
];

export const BITRIX_SERVICES_SUMMARY =
  "Настройка Bitrix24, автоматизация документов, автоматизация Bitrix24, интеграция Bitrix24 с 1С, генерация и автоматизация коммерческого предложения, Bitrix24 AI, настройка телефонии Bitrix24, внедрение AI-ассистента, разработка RAG-систем. Плюс внедрение Битрикс24 с AI, AI-контур отдела продаж, MCP, локальный LLM. Участие в партнерской программе 1С-Битрикс · ID 28909898.";

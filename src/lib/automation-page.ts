import type { SeoServiceContent } from "@/lib/seo-services-content";

/**
 * Landing /automation — SeoServicePage hybrid:
 * каталог направлений + коммерческий оффер (аудит → пилот → production).
 * Отдельно от /services/business-process-automation (заказ: смета и SLA).
 */

export type AutomationDirection = {
  href: string;
  labelRu: string;
  labelEn: string;
  blurbRu: string;
  blurbEn: string;
};

export const AUTOMATION_PAGE = {
  lineRu: "Автоматизация бизнес-процессов",
  lineEn: "Business process automation",

  metaTitleRu: "Автоматизация документов, CRM и КП — каталог решений | Bober AI",
  metaTitleEn: "Business process automation — solutions catalog | Bober AI",
  metaDescRu:
    "Автоматизация документов, документооборота, КП, CRM, Bitrix24, amoCRM, OCR в 1С, корпоративный RAG и внедрение ИИ. Фиксированная смета.",
  metaDescEn:
    "Company automation, proposals, documents, Bitrix24, amoCRM, 1C, AI implementation, OCR and AI for sales. Fixed estimate.",
  metaKeywordsRu: [
    "автоматизация документов",
    "автоматизация документооборота",
    "автоматизация коммерческих предложений",
    "автоматизация кп",
    "автоматизация crm",
    "внедрение битрикс24",
    "автоматизация отдела продаж",
    "распознавание документов 1с",
    "корпоративный rag",
    "компания по внедрению ии",
  ],
  metaKeywordsEn: [
    "business process automation",
    "company automation",
    "document workflow automation",
    "sales automation",
    "crm automation",
    "ai implementation",
    "document recognition",
    "bitrix24 automation",
    "amocrm automation",
    "corporate rag",
  ],

  h1Ru: "Автоматизация документов, CRM и бизнес-процессов",
  h1En: "Business process automation",
  subtitleRu:
    "Документы, ЭДО, КП из CRM, Bitrix24/amoCRM, OCR в 1С и RAG — план, смета и production.",
  subtitleEn:
    "Company, documents, CRM/1C, AI implementation, RAG, OCR, sales — plan, estimate and production.",

  directionsLabelRu: "Направления",
  directionsLabelEn: "Directions",
  directionsTitleRu: "Каталог сценариев автоматизации",
  directionsTitleEn: "Automation scenario catalog",
  directionsSubtitleRu:
    "Выберите процесс — откроется страница сценария. Заказ внедрения со сметой и SLA — на странице услуги.",
  directionsSubtitleEn:
    "Pick a process — opens the scenario page. Order with estimate and SLA lives on the service page.",
  orderCtaRu: "Заказать автоматизацию — смета и SLA",
  orderCtaEn: "Order automation — estimate & SLA",
} as const;

/** Hub children for /automation catalog. */
export const AUTOMATION_DIRECTIONS: AutomationDirection[] = [
  {
    href: "/automation/documents",
    labelRu: "Автоматизация документов",
    labelEn: "Document automation",
    blurbRu: "Документы, ЭДО, OCR → CRM/1С. Пилот от 300 000 ₽.",
    blurbEn: "Documents, e-doc, OCR → CRM/1C. Pilot from €3,000.",
  },
  {
    href: "/automation/ocr-data-extraction",
    labelRu: "Распознавание первичных документов в 1С",
    labelEn: "Primary document recognition into 1C",
    blurbRu: "OCR → проверка → поля в 1С. Пилот от 300 000 ₽.",
    blurbEn: "OCR → check → 1C fields. Pilot from €3,000.",
  },
  {
    href: "/automation/proposal-generation",
    labelRu: "Автоматизация коммерческих предложений",
    labelEn: "Commercial proposal automation",
    blurbRu: "Генерация КП из CRM и прайса за минуты.",
    blurbEn: "Proposals from CRM and price lists in minutes.",
  },
  {
    href: "/automation/kp-from-crm",
    labelRu: "Автоматизация КП из CRM",
    labelEn: "KP automation from CRM",
    blurbRu: "КП прямо из карточки сделки.",
    blurbEn: "Proposals from the deal card.",
  },
  {
    href: "/automation/sales-department",
    labelRu: "Автоматизация отдела продаж",
    labelEn: "Sales department automation",
    blurbRu: "Заявка → CRM → КП → follow-up.",
    blurbEn: "Lead → CRM → proposal → follow-up.",
  },
  {
    href: "/integrations/bitrix24-implementation",
    labelRu: "Внедрение Битрикс24",
    labelEn: "Bitrix24 implementation",
    blurbRu: "Внедрение и интеграция Битрикс24 под ключ.",
    blurbEn: "Turnkey Bitrix24 implementation.",
  },
  {
    href: "/integrations/crm-automation",
    labelRu: "Автоматизация CRM",
    labelEn: "CRM automation",
    blurbRu: "Внедрение CRM: роботы, заявки, воронка.",
    blurbEn: "CRM rollout: robots, intake, pipeline.",
  },
  {
    href: "/integrations/bitrix24-sales-automation",
    labelRu: "Продажи в Битрикс24",
    labelEn: "Bitrix24 sales",
    blurbRu: "Автоматизация воронки Bitrix24 с ИИ.",
    blurbEn: "Bitrix24 pipeline automation with AI.",
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
    href: "/solutions/rag-search",
    labelRu: "Корпоративный RAG",
    labelEn: "Corporate RAG",
    blurbRu: "Ответы по документам с цитатами.",
    blurbEn: "Answers from documents with citations.",
  },
  {
    href: "/ai/ai-implementation",
    labelRu: "Компания по внедрению ИИ",
    labelEn: "AI implementation company",
    blurbRu: "Стоимость, под ключ, Москва.",
    blurbEn: "Price, turnkey, Moscow.",
  },
  {
    href: "/automation/speech-analytics-sales",
    labelRu: "Речевая аналитика отдела продаж",
    labelEn: "Sales speech analytics",
    blurbRu: "Звонки → скоринг → факты в CRM.",
    blurbEn: "Calls → scoring → CRM facts.",
  },
  {
    href: "/automation/meeting-to-crm",
    labelRu: "Встречи → задачи в CRM",
    labelEn: "Meetings → CRM tasks",
    blurbRu: "Договорённости со встречи сразу в сделку.",
    blurbEn: "Meeting decisions straight into the deal.",
  },
];

export function getAutomationSeoContent(locale: "ru" | "kz" | "uz"): SeoServiceContent {
  const ru = locale === "ru";

  return {
    metaTitle: ru ? AUTOMATION_PAGE.metaTitleRu : AUTOMATION_PAGE.metaTitleEn,
    metaDescription: ru ? AUTOMATION_PAGE.metaDescRu : AUTOMATION_PAGE.metaDescEn,
    eyebrow: ru ? "Каталог · Автоматизация" : "Catalog · Automation",
    h1: ru ? AUTOMATION_PAGE.h1Ru : AUTOMATION_PAGE.h1En,
    subtitle: ru ? AUTOMATION_PAGE.subtitleRu : AUTOMATION_PAGE.subtitleEn,

    problemsTitle: ru ? "Типичные потери" : "Typical losses",
    problems: ru
      ? [
          "Менеджеры обходят CRM и ведут сделки в Excel, Telegram и почте",
          "Один и тот же заказ вводится вручную в CRM, 1С и документы",
          "Согласования занимают дни из-за отсутствия маршрутов и уведомлений",
          "КП собирают копипастом из прайса — часы на одну сделку",
          "Руководство не видит узкие места — нет единой картины процесса",
          "AI покупают «в целом», а нужен конкретный процесс с KPI",
        ]
      : [
          "Reps bypass CRM and run deals in Excel, messengers and email",
          "The same order is typed into CRM, ERP and documents by hand",
          "Approvals take days without routes and notifications",
          "Proposals are copy-pasted from price lists — hours per deal",
          "Leadership cannot see bottlenecks — no single process picture",
          "Buyers look for “AI in general” when they need a process with KPIs",
        ],

    deliverablesTitle: ru ? "Что вы получаете" : "What you get",
    deliverables: ru
      ? [
          "Карта процессов и расчёт ROI по 2–3 сценариям",
          "Архитектура интеграций CRM, ERP, документов и мессенджеров",
          "Production workflow с логированием, retry и мониторингом",
          "Документация, обучение команды и план масштабирования",
        ]
      : [
          "Process map and ROI for 2–3 scenarios",
          "Integration architecture for CRM, ERP, documents and messengers",
          "Production workflow with logging, retry and monitoring",
          "Documentation, team training and a scale-out plan",
        ],

    intro: ru
      ? [
          "AI не является продуктом. Продукт — автоматизация бизнес-процесса с KPI.",
          "Клиенты ищут внедрение и автоматизацию конкретного процесса — не абстрактный консалтинг.",
          "Здесь — каталог направлений и коммерческий вход: что автоматизировать, как выглядит внедрение, вилки бюджета и кейсы. Заказ со сметой и SLA — на /services/business-process-automation.",
          "Частый случай: продажи тратят почти половину времени на рутину — собрать документ, перекинуть данные между системами, напомнить вручную. Берём одно узкое место с наибольшим эффектом и автоматизируем его первым.",
          "AI подключаем только там, где он реально снимает ручной труд. В большинстве проектов основной выигрыш дают интеграции, workflow и правила — без LLM.",
        ]
      : [
          "AI is not the product. The product is a business process with KPIs.",
          "Buyers look for implementation and process automation — not abstract consulting.",
          "This page is a direction catalog and commercial entry: what to automate, how delivery works, budget ranges and cases. Order with estimate and SLA — /services/business-process-automation.",
          "Common case: sales burn almost half their time on routine — assemble docs, move data between systems, chase follow-ups. We pick one high-ROI bottleneck first.",
          "We add AI only where it removes real manual work. Most projects win from integrations, workflows and rules — without an LLM.",
        ],

    howWeSolveTitle: ru ? "Как мы работаем" : "How we work",
    howWeSolve: ru
      ? [
          {
            title: "Аудит и ROI",
            text: "Интервью с владельцами процессов, карта потоков, точки потерь. Приоритет сценариев по окупаемости.",
          },
          {
            title: "Архитектура",
            text: "Стек: CRM, workflow, API-шлюз, опциональный AI-слой. Спецификация интеграций до разработки.",
          },
          {
            title: "Разработка",
            text: "Связка Bitrix24, amoCRM, 1С, Telegram, документов и внутренних API. Очереди, идемпотентность, журнал.",
          },
          {
            title: "Production",
            text: "Деплой, мониторинг, документация, обучение. Сопровождение после go-live по SLA — опционально.",
          },
        ]
      : [
          {
            title: "Audit & ROI",
            text: "Interviews with process owners, flow map, loss points. Prioritize scenarios by payback.",
          },
          {
            title: "Architecture",
            text: "Stack: CRM, workflow, API gateway, optional AI layer. Integration spec before build.",
          },
          {
            title: "Build",
            text: "Bitrix24, amoCRM, ERP, messengers, documents and internal APIs. Queues, idempotency, audit log.",
          },
          {
            title: "Production",
            text: "Deploy, monitoring, docs, training. Optional post go-live SLA support.",
          },
        ],

    architectureTitle: ru ? "Типовая архитектура" : "Typical architecture",
    architecture: ru
      ? [
          "CRM/ERP как система записи — единый источник правды по сделкам и заказам",
          "Workflow-слой: события → правила → задачи, уведомления, смена этапов",
          "API-шлюз с очередью сообщений, retry и аудитом операций",
          "Документы: шаблоны, генерация PDF/DOCX, привязка к сущностям CRM",
          "Опциональный AI-слой: классификация, извлечение, генерация текста, RAG",
          "Контур: Yandex Cloud / Selectel / on-prem — данные в согласованном периметре",
        ]
      : [
          "CRM/ERP as system of record — single source of truth for deals and orders",
          "Workflow layer: events → rules → tasks, notifications, stage changes",
          "API gateway with message queue, retry and operation audit",
          "Documents: templates, PDF/DOCX generation, CRM entity binding",
          "Optional AI layer: classification, extraction, text generation, RAG",
          "Contour: Yandex Cloud / Selectel / on-prem — data stays in agreed perimeter",
        ],

    roiTitle: ru ? "Стоимость и сроки" : "Cost and timeline",
    roi: ru
      ? [
          { value: "от 150 000 ₽", label: "аудит процесса и карта интеграций · ~10 дней" },
          { value: "от 300 000 ₽", label: "пилот на одном сценарии · 2–4 недели" },
          { value: "от 500 000 ₽", label: "промышленное внедрение · 4–12 недель" },
        ]
      : [
          { value: "from ~€1,500", label: "process audit and integration map · ~10 days" },
          { value: "from ~€3,000", label: "pilot on one scenario · 2–4 weeks" },
          { value: "from ~€5,000", label: "production rollout · 4–12 weeks" },
        ],

    faqTitle: ru ? "Частые вопросы" : "FAQ",
    faq: ru
      ? [
          {
            q: "Чем /automation отличается от страницы услуги?",
            a: "Здесь — каталог направлений и коммерческий вход. Заказ со сметой, этапами и SLA — на /services/business-process-automation.",
          },
          {
            q: "С чего начать автоматизацию?",
            a: "С аудита одного процесса с максимальной болью: продажи, документы или согласования. Результат — карта, ROI и приоритеты, а не сразу разработка.",
          },
          {
            q: "Нужен ли отдельный BPM-софт?",
            a: "Не всегда. Часто достаточно CRM + workflow + интеграции. BPM рекомендуем при сложных маршрутах согласования и формальном аудите.",
          },
          {
            q: "Можно ли без AI?",
            a: "Да. Большинство проектов начинается с интеграций и правил. AI добавляем, когда он даёт измеримый выигрыш.",
          },
          {
            q: "Какой бюджет?",
            a: "Аудит — от 150 000 ₽. Пилот — от 300 000 ₽. Внедрение — от 500 000 ₽ в зависимости от числа интеграций и процессов. Фиксированная смета до старта.",
          },
          {
            q: "Какие CRM поддерживаете?",
            a: "Bitrix24, amoCRM, кастомные API. Двусторонняя синхронизация с 1С и документами. Отдельный хаб — bitrix.bober-systems.ru.",
          },
          {
            q: "Работаете удалённо?",
            a: "Да. Москва, Россия и СНГ. NDA, on-prem и 152-ФЗ — по запросу. Ответ на заявку — в течение 4 рабочих часов.",
          },
          {
            q: "Как заказать?",
            a: "Форма на странице, Telegram или mailto:contact@bober-systems.ru / mailto:info@bober-systems.ru → discovery → план и вилка бюджета.",
          },
        ]
      : [
          {
            q: "How is /automation different from the service page?",
            a: "This is the direction catalog and commercial entry. Order with estimate, stages and SLA lives on /services/business-process-automation.",
          },
          {
            q: "Where should we start automation?",
            a: "With an audit of one high-pain process: sales, documents or approvals. You get a map, ROI and priorities — not a full build on day one.",
          },
          {
            q: "Do we need separate BPM software?",
            a: "Not always. CRM + workflow + integrations often suffice. Recommend BPM for complex approval routes and formal audit trails.",
          },
          {
            q: "Can we skip AI?",
            a: "Yes. Most projects start with integrations and rules. We add AI when it delivers measurable gain.",
          },
          {
            q: "What is the budget?",
            a: "Audit from ~€1,500. Pilot from ~€3,000. Production from ~€5,000 depending on integrations and processes. Fixed estimate before kickoff.",
          },
          {
            q: "Which CRMs do you support?",
            a: "Bitrix24, amoCRM, custom APIs. Bidirectional sync with ERP and documents. Dedicated hub: bitrix.bober-systems.ru.",
          },
          {
            q: "Do you work remotely?",
            a: "Yes. Moscow base, Russia & CIS. NDA, on-prem and data-residency on request. Reply within 4 business hours.",
          },
          {
            q: "How do we order?",
            a: "Form on this page, Telegram or mailto:contact@bober-systems.ru / mailto:info@bober-systems.ru → discovery → plan and budget range.",
          },
        ],

    related: [
      {
        href: "/services/business-process-automation",
        label: ru ? "Заказать автоматизацию — смета и SLA" : "Order automation — estimate & SLA",
      },
      {
        href: "/automation/proposal-generation",
        label: ru ? "Автоматизация КП" : "Proposal automation",
      },
      {
        href: "/automation/documents",
        label: ru ? "Документооборот" : "Document workflow",
      },
      {
        href: "/bitrix",
        label: ru ? "Bitrix24 · внедрение и ИИ" : "Bitrix24 · implementation & AI",
      },
      {
        href: "/services/ai-sales-loop",
        label: ru ? "AI Sales Loop" : "AI Sales Loop",
      },
      {
        href: "/services/rag",
        label: ru ? "Корпоративный RAG" : "Corporate RAG",
      },
      {
        href: "/ii-dlya-biznesa",
        label: ru ? "ИИ для бизнеса" : "AI for business",
      },
      {
        href: "/pricing",
        label: ru ? "Стоимость" : "Pricing",
      },
    ],

    caseStudySlugs: ["elia-suite", "kp-llm-automation", "crm-1c-sync", "kaspersky-ai-assistant"],

    comparison: {
      label: ru ? "Сценарии" : "Scenarios",
      title: ru ? "Где автоматизация даёт быстрый ROI" : "Where automation pays back fast",
      subtitle: ru
        ? "Не «внедрить AI», а закрыть конкретный процесс с измеримым KPI."
        : "Not “deploy AI” — close a concrete process with a measurable KPI.",
      items: ru
        ? [
            {
              title: "КП и продажи",
              problem: "Менеджер собирает предложение вручную из CRM и прайса.",
              solution: "Шаблоны + данные сделки → PDF/DOCX за минуты, follow-up по правилам.",
            },
            {
              title: "Документы и OCR",
              problem: "Сканы и PDF разбирают руками — ошибки уходят в 1С.",
              solution: "Извлечение полей, валидация, маршрут в CRM/ERP с журналом.",
            },
            {
              title: "CRM / Bitrix24 / amoCRM",
              problem: "Воронка живёт в чатах; роботы и стадии не работают.",
              solution: "Триггеры, задачи, AI-слой поверх портала — факты в карточке сделки.",
            },
            {
              title: "База знаний и RAG",
              problem: "Ответы «из головы», регламенты размазаны по чатам.",
              solution: "Поиск по документам с цитатой источника — для поддержки и внутренних FAQ.",
            },
            {
              title: "1С и учёт",
              problem: "Остатки, статусы и документы копируют между системами.",
              solution: "Двусторонний обмен + опциональный AI-слой на документах и статусах.",
            },
            {
              title: "Приватный контур",
              problem: "Данные нельзя отдавать в публичные LLM.",
              solution: "On-prem / РФ-облако, роли, NDA, модели в согласованном периметре.",
            },
          ]
        : [
            {
              title: "Proposals & sales",
              problem: "Reps assemble proposals by hand from CRM and price lists.",
              solution: "Templates + deal data → PDF/DOCX in minutes, rule-based follow-up.",
            },
            {
              title: "Documents & OCR",
              problem: "Scans and PDFs are handled manually — errors hit ERP.",
              solution: "Field extraction, validation, CRM/ERP routing with an audit log.",
            },
            {
              title: "CRM / Bitrix24 / amoCRM",
              problem: "The funnel lives in chats; robots and stages fail.",
              solution: "Triggers, tasks, AI layer on the portal — facts stay on the deal card.",
            },
            {
              title: "Knowledge & RAG",
              problem: "Answers from memory; policies scattered in chats.",
              solution: "Document search with source citations — for support and internal FAQ.",
            },
            {
              title: "ERP / 1C",
              problem: "Stock, statuses and docs are copied between systems.",
              solution: "Bidirectional sync + optional AI on documents and statuses.",
            },
            {
              title: "Private contour",
              problem: "Data cannot leave to public LLMs.",
              solution: "On-prem / RU cloud, roles, NDA, models inside the agreed perimeter.",
            },
          ],
    },
  };
}

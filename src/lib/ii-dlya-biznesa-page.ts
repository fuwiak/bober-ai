import type { SeoServiceContent } from "@/lib/seo-services-content";

/** Hybrid commercial + expert guide for «ИИ для бизнеса» — path /ii-dlya-biznesa. */
export const II_DLYA_BIZNESA_PAGE = {
  lineRu: "ИИ для бизнеса",
  lineEn: "AI for business",

  metaTitleRu: "Внедрение ИИ в бизнес под ключ — компания, цена, Москва | Bober AI",
  metaTitleEn: "AI for business — audit, development and turnkey deployment | Bober AI",
  metaDescRu:
    "Компания по внедрению ИИ: стоимость внедрения ИИ, под ключ, Москва и удалённо. CRM, 1С, документы, звонки. Фиксированная смета от 150 000 ₽.",
  metaDescEn:
    "AI for business: process audit, pilot and production deployment. CRM, documents, knowledge base, sales. Fixed estimate, NDA, Yandex Cloud / Selectel / on-prem.",
  metaKeywordsRu: [
    "компания по внедрению ии",
    "стоимость внедрения ии",
    "внедрение ии под ключ",
    "внедрение ии москва",
    "внедрение ии в бизнес",
    "внедрение ии в бизнес процессы",
    "ии для бизнеса",
    "заказать внедрение ии",
    "интегратор искусственного интеллекта",
    "внедрение искусственного интеллекта",
    "корпоративный ии",
  ],
  metaKeywordsEn: [
    "ai for business",
    "ai solutions for business",
    "enterprise ai implementation",
    "ai integration for business",
    "buy ai for business",
    "corporate ai",
    "ai deployment russia",
  ],

  h1Ru: "Компания по внедрению ИИ в бизнес-процессы",
  h1En: "AI for business: from process audit to a working deployment",
  subtitleRu:
    "Заказать внедрение ИИ под ключ: фиксированная стоимость, сроки и production. Москва и удалённо — CRM, 1С, документы, звонки. Аудит от 150 000 ₽.",
  subtitleEn:
    "A commercial landing and expert guide in one: what to buy, which processes to cover, how an assistant differs from an agent, how deployment works, architecture, security, cases and budget ranges — without five near-identical SEO pages.",
} as const;

export function getIiDlyaBiznesaSeoContent(locale: "ru" | "kz" | "uz"): SeoServiceContent {
  const ru = locale === "ru";

  return {
    metaTitle: ru ? II_DLYA_BIZNESA_PAGE.metaTitleRu : II_DLYA_BIZNESA_PAGE.metaTitleEn,
    metaDescription: ru ? II_DLYA_BIZNESA_PAGE.metaDescRu : II_DLYA_BIZNESA_PAGE.metaDescEn,
    eyebrow: ru ? "Услуга · Guide · Bober AI" : "Service · Guide · Bober AI",
    h1: ru ? II_DLYA_BIZNESA_PAGE.h1Ru : II_DLYA_BIZNESA_PAGE.h1En,
    subtitle: ru ? II_DLYA_BIZNESA_PAGE.subtitleRu : II_DLYA_BIZNESA_PAGE.subtitleEn,

    problemsTitle: ru ? "Какие проблемы закрываем" : "Problems we solve",
    problems: ru
      ? [
          "CRM живёт отдельно от почты, мессенджеров и таблиц — сделки «теряются» между системами",
          "Документы и счета разбирают вручную: OCR нет, маршруты согласования размыты",
          "База знаний размазана по Confluence, чатам и головам сотрудников",
          "Заявки и тикеты квалифицируют люди — очередь растёт, SLA падает",
          "Продажи тратят часы на КП, follow-up и копипаст вместо переговоров",
          "Аналитика и отчёты собираются к пятнице вручную — решений «на сейчас» нет",
        ]
      : [
          "CRM sits apart from email, messengers and spreadsheets — deals get lost between systems",
          "Documents and invoices are handled by hand: no OCR, fuzzy approval routes",
          "Knowledge is scattered across wikis, chats and people's heads",
          "Humans qualify tickets — queues grow, SLA slips",
          "Sales burn hours on proposals, follow-up and copy-paste instead of selling",
          "Reports are assembled manually by Friday — no decisions in real time",
        ],

    deliverablesTitle: ru ? "Что можно купить" : "What you can buy",
    deliverables: ru
      ? [
          "Аудит процесса: карта потоков, узкие места, ROI и смета пилота (от 150 000 ₽, ~10 дней)",
          "Пилот на одном сценарии с KPI: 2–4 недели, фиксированная смета (от 300 000 ₽)",
          "Промышленное внедрение под ключ: интеграции, мониторинг, обучение, handover (от 500 000 ₽)",
          "Сопровождение после go-live: SLA, доработки, контроль качества ответов модели",
        ]
      : [
          "Process audit: flow map, bottlenecks, ROI and pilot estimate (from ~€1,500, ~10 days)",
          "Pilot on one scenario with KPIs: 2–4 weeks, fixed estimate (from ~€3,000)",
          "Turnkey production: integrations, monitoring, training, handover (from ~€5,000)",
          "Post go-live support: SLA, iterations, model-answer quality control",
        ],

    intro: ru
      ? [
          "Bober AI Systems внедряет ИИ в процессы компании: CRM, документы, база знаний, продажи и аналитика. Не продаём «коробку нейросети» — собираем рабочий контур под вашу задачу со сметой до старта.",
          "Шесть рабочих сценариев ниже — с техническим результатом, а не лозунгом. Дальше: чем ассистент отличается от агента и от обычной автоматизации, этапы внедрения, архитектура (Yandex Cloud, Selectel, on-prem, Kubernetes), безопасность и вилки бюджета.",
          "Безопасность по умолчанию в проекте: роли и доступы, журналы действий, работа с ПДн (152-ФЗ), защита от prompt injection, закрытый контур по запросу. NDA до старта — стандарт.",
        ]
      : [
          "Bober AI Systems deploys AI into company workflows: CRM, documents, knowledge base, sales and analytics. We don’t sell a “neural net box” — we build a working contour for your process with a fixed estimate before kickoff.",
          "The six scenarios below end in a technical outcome, not a slogan. Next: assistant vs agent vs plain automation, deployment stages, architecture (Yandex Cloud, Selectel, on-prem, Kubernetes), security and budget ranges.",
          "Security is default: roles and access, audit logs, personal-data handling, prompt-injection defenses, private contour on request. NDA before kickoff is standard.",
        ],

    howWeSolveTitle: ru ? "Как выглядит внедрение" : "How deployment works",
    howWeSolve: ru
      ? [
          {
            title: "Discovery",
            text: "30–60 минут: узкое место, системы, объём ручной работы, риски по данным. Понимаем, нужен ли ИИ или хватит правил и интеграций.",
          },
          {
            title: "Прототип",
            text: "Узкий прототип на реальных данных: проверка качества ответов/извлечения до полной сметы пилота.",
          },
          {
            title: "Пилот",
            text: "2–4 недели на одном процессе с KPI: время цикла, доля автообработки, качество, нагрузка на команду.",
          },
          {
            title: "Production",
            text: "Интеграции, очереди, мониторинг, роли, runbook. Деплой в ваш контур: облако РФ или on-prem.",
          },
          {
            title: "Support",
            text: "Обучение, передача, опциональный SLA: доработки сценариев и контроль дрейфа качества модели.",
          },
        ]
      : [
          {
            title: "Discovery",
            text: "30–60 minutes: bottleneck, systems, manual volume, data risk. Decide if AI is needed or rules and integrations are enough.",
          },
          {
            title: "Prototype",
            text: "Narrow prototype on real data: validate answer/extraction quality before a full pilot estimate.",
          },
          {
            title: "Pilot",
            text: "2–4 weeks on one process with KPIs: cycle time, automation share, quality, team load.",
          },
          {
            title: "Production",
            text: "Integrations, queues, monitoring, roles, runbook. Deploy in your contour: RU cloud or on-prem.",
          },
          {
            title: "Support",
            text: "Training, handover, optional SLA: scenario iterations and model-quality drift control.",
          },
        ],

    architectureTitle: ru ? "Архитектура и безопасность" : "Architecture and security",
    architecture: ru
      ? [
          "Контур: Yandex Cloud, Selectel или on-prem — модели и данные остаются в согласованном периметре",
          "Оркестрация: Kubernetes / Docker, API-шлюз, очереди, retry и журнал операций",
          "Интеграции CRM: Bitrix24, amoCRM, 1С, почта, мессенджеры, телефония",
          "Слой ИИ: LLM / RAG / агенты с инструментами — только там, где есть измеримый выигрыш",
          "Безопасность: RBAC, аудит логов, маскирование ПДн, защита от prompt injection, закрытый контур",
          "Observability: метрики качества, алерты, human-in-the-loop на критичных действиях",
        ]
      : [
          "Contour: Yandex Cloud, Selectel or on-prem — models and data stay in the agreed perimeter",
          "Orchestration: Kubernetes / Docker, API gateway, queues, retry and operation audit",
          "CRM integrations: Bitrix24, amoCRM, ERP, email, messengers, telephony",
          "AI layer: LLM / RAG / tool-using agents — only where the gain is measurable",
          "Security: RBAC, audit logs, PII masking, prompt-injection defenses, private contour",
          "Observability: quality metrics, alerts, human-in-the-loop on critical actions",
        ],

    roiTitle: ru ? "Стоимость и сроки" : "Cost and timeline",
    roi: ru
      ? [
          { value: "от 150 000 ₽", label: "аудит процесса и карта интеграций · ~10 дней" },
          { value: "от 300 000 ₽", label: "пилот на одном сценарии · 2–4 недели" },
          { value: "от 500 000 ₽", label: "промышленное внедрение под ключ · от 4 недель" },
        ]
      : [
          { value: "from ~€1,500", label: "process audit and integration map · ~10 days" },
          { value: "from ~€3,000", label: "pilot on one scenario · 2–4 weeks" },
          { value: "from ~€5,000", label: "turnkey production · from 4 weeks" },
        ],

    faqTitle: ru ? "Частые вопросы" : "FAQ",
    faq: ru
      ? [
          {
            q: "С чего начать внедрение ИИ для бизнеса?",
            a: "С аудита одного процесса с максимальной болью: продажи, документы или поддержка. Результат — карта, ROI и смета пилота, а не сразу разработка «всего ИИ».",
          },
          {
            q: "Сколько стоит ИИ для бизнеса под ключ?",
            a: "Аудит — от 150 000 ₽, пилот — от 300 000 ₽, промышленное внедрение — от 500 000 ₽. Фиксированная смета до старта работ.",
          },
          {
            q: "Чем ИИ-ассистент отличается от ИИ-агента?",
            a: "Ассистент помогает человеку: черновики, поиск, саммари. Агент выполняет действия в системах (CRM, задачи, маршруты) с правилами и эскалацией к человеку.",
          },
          {
            q: "Всегда ли нужен ИИ — или хватит обычной автоматизации?",
            a: "Часто основной выигрыш дают интеграции и правила без LLM. ИИ подключаем, когда качество распознавания/генерации даёт измеримый эффект.",
          },
          {
            q: "Можно ли внедрить ИИ в Bitrix24 / amoCRM?",
            a: "Да. Типичные сценарии: саммари звонков, квалификация лидов, черновики КП и писем, обновление карточек, follow-up. Отдельный хаб — bitrix.bober-systems.ru.",
          },
          {
            q: "Как защитить данные и соблюсти 152-ФЗ?",
            a: "Роли, журналы, маскирование ПДн, договор обработки, on-prem или российское облако по запросу. NDA подписываем до старта.",
          },
          {
            q: "Что такое закрытый контур и prompt injection?",
            a: "Закрытый контур — модели и данные не уходят в публичные API. Prompt injection — попытка через текст заставить модель обойти правила; закрываем фильтрами, политиками инструментов и HITL.",
          },
          {
            q: "Сколько длится пилот?",
            a: "Обычно 2–4 недели на одном сценарии с заранее согласованным KPI. После пилота — решение о production или остановке без раздувания бюджета.",
          },
          {
            q: "Работаете удалённо по России и СНГ?",
            a: "Да. База — Москва, поставка удалённо. Ответ на новую заявку — в течение 4 рабочих часов.",
          },
          {
            q: "Какие кейсы можно посмотреть?",
            a: "Ниже — Kaspersky AI-ассистент, Elia Suite, автоматизация КП и другие. В портфолио — измеримые метрики: время цикла, конверсия, снижение нагрузки.",
          },
          {
            q: "Как заказать внедрение?",
            a: "Форма на странице, Telegram или mailto:contact@bober-systems.ru / mailto:info@bober-systems.ru → discovery → план и вилка бюджета. Без обязательства сразу покупать разработку.",
          },
        ]
      : [
          {
            q: "Where should we start with AI for business?",
            a: "With an audit of one high-pain process: sales, documents or support. You get a map, ROI and pilot estimate — not a build of “all the AI”.",
          },
          {
            q: "How much does turnkey AI for business cost?",
            a: "Audit from ~€1,500, pilot from ~€3,000, production from ~€5,000. Fixed estimate before work starts.",
          },
          {
            q: "How is an AI assistant different from an AI agent?",
            a: "An assistant helps a human: drafts, search, summaries. An agent performs actions in systems (CRM, tasks, routes) with rules and human escalation.",
          },
          {
            q: "Do we always need AI — or is plain automation enough?",
            a: "Often integrations and rules without an LLM deliver most of the gain. We add AI when recognition/generation quality has a measurable effect.",
          },
          {
            q: "Can you deploy AI into Bitrix24 / amoCRM?",
            a: "Yes. Typical scenarios: call summaries, lead scoring, proposal/email drafts, card updates, follow-up. Dedicated hub: bitrix.bober-systems.ru.",
          },
          {
            q: "How do you protect data and comply with privacy rules?",
            a: "Roles, audit logs, PII masking, processing agreements, on-prem or RU cloud on request. NDA before kickoff.",
          },
          {
            q: "What is a private contour and prompt injection?",
            a: "Private contour means models and data don’t leave to public APIs. Prompt injection tries to override model rules via text; we mitigate with filters, tool policies and HITL.",
          },
          {
            q: "How long is a pilot?",
            a: "Usually 2–4 weeks on one scenario with an agreed KPI. After the pilot you decide on production or stop — without inflating budget.",
          },
          {
            q: "Do you work remotely across Russia and CIS?",
            a: "Yes. Based in Moscow, delivery remote. New inquiries get a reply within 4 business hours.",
          },
          {
            q: "Which case studies can we see?",
            a: "Below: Kaspersky AI assistant, Elia Suite, proposal automation and more — with measurable metrics.",
          },
          {
            q: "How do we order deployment?",
            a: "Form on this page, Telegram or mailto:contact@bober-systems.ru / mailto:info@bober-systems.ru → discovery → plan and budget range. No obligation to buy a full build immediately.",
          },
        ],

    related: [
      {
        href: "/services/ai-agent",
        label: ru ? "ИИ-агенты для бизнеса" : "AI agents for business",
      },
      {
        href: "/ai/corporate-neural-net",
        label: ru ? "Корпоративный ИИ-ассистент" : "Corporate AI assistant",
      },
      {
        href: "/automation/document-ai",
        label: ru ? "ИИ для обработки документов" : "AI for documents",
      },
      {
        href: "/services/rag",
        label: ru ? "Корпоративная база знаний RAG" : "Corporate RAG knowledge base",
      },
      {
        href: "/secure-ai",
        label: ru ? "Bober Secure AI" : "Bober Secure AI",
      },
      {
        href: "/pricing",
        label: ru ? "Стоимость внедрения" : "Pricing",
      },
      {
        href: "/ai/ai-implementation",
        label: ru ? "Внедрение ИИ (хаб)" : "AI implementation hub",
      },
      {
        href: "/portfolio",
        label: ru ? "Все кейсы" : "All case studies",
      },
    ],

    caseStudySlugs: [
      "kaspersky-ai-assistant",
      "elia-suite",
      "kp-llm-automation",
      "yandex-telemost-agent",
      "support-knowledge-base",
    ],

    comparison: {
      label: ru ? "Сценарии" : "Scenarios",
      title: ru
        ? "6 конкретных сценариев ИИ для бизнеса"
        : "6 concrete AI-for-business scenarios",
      subtitle: ru
        ? "Не лозунги — технический результат на стыке процесса и систем."
        : "Not slogans — technical outcomes at the process/system boundary.",
      items: ru
        ? [
            {
              title: "ИИ в CRM и продажах",
              problem: "Менеджеры копируют факты между звонком, чатом и карточкой сделки.",
              solution:
                "Саммари, скоринг, черновики КП/писем и автозадачи в Bitrix24 / amoCRM — меньше ручного ввода.",
            },
            {
              title: "Документы и счета",
              problem: "PDF и сканы разбирают вручную, ошибки уходят в 1С и оплату.",
              solution:
                "OCR + извлечение полей + маршрут в CRM/ERP с валидацией и журналом.",
            },
            {
              title: "Корпоративный поиск (RAG)",
              problem: "Ответы «из головы» и устаревшие регламенты в чатах.",
              solution:
                "Поиск по базе знаний с цитатой источника — для поддержки и внутренних FAQ.",
            },
            {
              title: "Обработка заявок",
              problem: "Очередь тикетов растёт, первая линия тратит время на типовое.",
              solution:
                "Классификация, черновик ответа, эскалация к человеку по правилам SLA.",
            },
            {
              title: "Саммари встреч и звонков",
              problem: "Итоги живут в блокнотах — в CRM пусто.",
              solution:
                "Транскрипт → саммари → задачи и поля сделки без ручного протокола.",
            },
            {
              title: "Аналитика операций",
              problem: "Отчёты собирают к пятнице из Excel и выгрузок.",
              solution:
                "Автосбор метрик по воронке и качеству касаний — сигнал руководителю в тот же день.",
            },
          ]
        : [
            {
              title: "AI in CRM and sales",
              problem: "Reps copy facts between calls, chats and deal cards.",
              solution:
                "Summaries, scoring, proposal/email drafts and auto-tasks in Bitrix24 / amoCRM — less manual entry.",
            },
            {
              title: "Documents and invoices",
              problem: "PDFs and scans are handled by hand; errors hit ERP and payments.",
              solution: "OCR + field extraction + CRM/ERP routing with validation and logs.",
            },
            {
              title: "Corporate search (RAG)",
              problem: "Answers from memory and outdated policies in chats.",
              solution: "Knowledge-base search with source citations — for support and internal FAQ.",
            },
            {
              title: "Ticket handling",
              problem: "Queues grow; L1 burns time on repetitive cases.",
              solution: "Classification, draft replies, human escalation by SLA rules.",
            },
            {
              title: "Meeting and call summaries",
              problem: "Notes live in notebooks — CRM stays empty.",
              solution: "Transcript → summary → tasks and deal fields without a manual protocol.",
            },
            {
              title: "Ops analytics",
              problem: "Friday Excel exports instead of live signals.",
              solution: "Auto metrics on funnel and touch quality — same-day alerts for managers.",
            },
          ],
    },

    comparisonSecondary: {
      label: ru ? "Выбор подхода" : "Approach",
      title: ru
        ? "ИИ-ассистент vs ИИ-агент vs обычная автоматизация"
        : "AI assistant vs AI agent vs plain automation",
      subtitle: ru
        ? "Один кластер запросов — три разных продукта. Выбираем по задаче, не по моде."
        : "One query cluster — three different products. Choose by job, not by hype.",
      items: ru
        ? [
            {
              title: "ИИ-ассистент",
              problem: "Нужна помощь человеку: найти, набросать, объяснить.",
              solution:
                "Чат/виджет с доступом к базе знаний и черновикам. Действия в CRM — только через человека или по жёстким шаблонам.",
            },
            {
              title: "ИИ-агент",
              problem: "Нужны действия в системах без копипаста на каждом шаге.",
              solution:
                "Инструменты: обновить сделку, создать задачу, отправить письмо, эскалировать. Обязательны роли, лимиты и HITL на критичном.",
            },
            {
              title: "Обычная автоматизация",
              problem: "Процесс повторяемый и правила уже известны — LLM избыточен.",
              solution:
                "Workflow, роботы CRM, интеграции и очереди. ИИ добавляем позже, если появится неструктурированный вход.",
            },
          ]
        : [
            {
              title: "AI assistant",
              problem: "You need help for a human: find, draft, explain.",
              solution:
                "Chat/widget with knowledge access and drafts. CRM actions only via a human or strict templates.",
            },
            {
              title: "AI agent",
              problem: "You need system actions without copy-paste at every step.",
              solution:
                "Tools: update a deal, create a task, send email, escalate. Roles, limits and HITL on critical paths are mandatory.",
            },
            {
              title: "Plain automation",
              problem: "The process is repeatable and rules are known — an LLM is overkill.",
              solution:
                "Workflows, CRM robots, integrations and queues. Add AI later if unstructured input appears.",
            },
          ],
    },
  };
}

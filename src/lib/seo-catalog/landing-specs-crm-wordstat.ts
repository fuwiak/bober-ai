import type { LandingSpec } from "@/lib/seo-catalog/types";

/**
 * CRM Wordstat cluster (exact +ops demand, 2026-07-26).
 * Source phrases: автоматизация crm, система автоматизации crm, crm автоматизация процессов, …
 */
export const CATALOG_LANDING_SPECS_CRM_WORDSTAT: LandingSpec[] = [
  {
    category: "integrations",
    slug: "crm-automation-system",
    contentKey: "crm_ws_automation_system",
    cluster: "crm",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/crm-integration.svg",
    keywords: [
      "система автоматизации crm",
      "crm система автоматизация бизнеса",
      "автоматизация продаж crm система",
      "комплексная автоматизация crm",
    ],
    related: [
      { href: "/integrations/crm-automation", labelRu: "Автоматизация CRM", labelEn: "CRM automation" },
      { href: "/integrations/crm", labelRu: "Внедрение CRM", labelEn: "CRM implementation" },
      { href: "/integrations/crm-process-automation", labelRu: "CRM и процессы", labelEn: "CRM processes" },
    ],
    ru: {
      h1: "Система автоматизации CRM",
      subtitle:
        "Система автоматизации CRM: воронка, роботы, источники заявок и отчёты в одном контуре. Фиксированная смета.",
      problems: [
        "CRM есть, но нет системы правил и роботов",
        "Заявки и статусы живут в чатах",
        "Отчёты собирают вручную",
        "Нет единого источника правды по сделкам",
      ],
      deliverables: [
        "Архитектура автоматизации CRM",
        "Роботы, стадии, обязательные поля",
        "Интеграции сайта / мессенджеров / 1С",
        "Регламент и обучение команды",
      ],
      intro: [
        "Запрос «система автоматизации CRM» (~267) — про рабочий контур, а не про лицензию.",
        "Собираем комплексную автоматизацию CRM под ваш процесс продаж или сервиса.",
      ],
      faq: [
        {
          q: "Это новая CRM или доработка?",
          a: "Чаще доработка Bitrix24 / amoCRM. Кастом — если процесс не укладывается в коробку.",
        },
        {
          q: "Срок?",
          a: "Пилот 2–4 недели на одну воронку.",
        },
        {
          q: "Бюджет?",
          a: "От 300 000 ₽ за согласованный контур автоматизации.",
        },
      ],
    },
    en: {
      h1: "CRM automation system",
      subtitle:
        "CRM automation system: pipeline, robots, lead sources and reporting in one contour. Fixed estimate.",
      problems: [
        "CRM exists without rules and robots",
        "Leads and statuses live in chats",
        "Reports are assembled manually",
        "No single source of truth for deals",
      ],
      deliverables: [
        "CRM automation architecture",
        "Robots, stages, required fields",
        "Site / messenger / ERP integrations",
        "Playbook and team training",
      ],
      intro: [
        "“CRM automation system” means a working contour — not a license.",
        "We build automation around your sales or service process.",
      ],
      faq: [
        {
          q: "New CRM or upgrade?",
          a: "Usually Bitrix24 / amoCRM upgrade. Custom only if the process does not fit a boxed CRM.",
        },
        {
          q: "Timeline?",
          a: "2–4 week pilot for one pipeline.",
        },
        {
          q: "Budget?",
          a: "From a fixed mid-market package for an agreed automation contour.",
        },
      ],
    },
  },
  {
    category: "integrations",
    slug: "crm-process-automation",
    contentKey: "crm_ws_process_automation",
    cluster: "crm",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/workflow-automation.svg",
    keywords: [
      "crm автоматизация процессов",
      "crm автоматизация бизнеса",
      "crm автоматизации бизнес процессов",
      "crm системы автоматизация бизнес процессов",
    ],
    related: [
      { href: "/integrations/crm-automation", labelRu: "Автоматизация CRM", labelEn: "CRM automation" },
      { href: "/automation/company-automation", labelRu: "Автоматизация компании", labelEn: "Company automation" },
      { href: "/automation/business-process-audit", labelRu: "Аудит процессов", labelEn: "Process audit" },
    ],
    ru: {
      h1: "CRM-автоматизация процессов",
      subtitle:
        "CRM-автоматизация процессов и бизнеса: заявки → сделки → задачи → документы без ручного копирования.",
      problems: [
        "Процесс продаж живёт вне CRM",
        "Нет автоматизации переходов и эскалаций",
        "Документы и 1С не связаны со сделкой",
        "Руководитель не видит узкие места",
      ],
      deliverables: [
        "Карта процесса в CRM",
        "Роботы и триггеры по стадиям",
        "Связка с документами / 1С",
        "KPI и дашборд",
      ],
      intro: [
        "Кластер Wordstat: «CRM автоматизация процессов / бизнеса / бизнес-процессов».",
        "Цель — процесс в CRM, а не «ещё поля для заполнения».",
      ],
      faq: [
        {
          q: "С чего начать?",
          a: "С одного процесса: квалификация лида, КП или передача в исполнение.",
        },
        {
          q: "Нужен ли AI?",
          a: "Не обязательно. Сначала роботы и интеграции; AI — на текст и классификацию.",
        },
        {
          q: "Срок?",
          a: "2–5 недель на один процесс.",
        },
      ],
    },
    en: {
      h1: "CRM process automation",
      subtitle:
        "CRM process and business automation: leads → deals → tasks → documents without copy-paste.",
      problems: [
        "Sales process lives outside CRM",
        "No stage transitions or escalations",
        "Documents and ERP not linked to the deal",
        "Leaders cannot see bottlenecks",
      ],
      deliverables: [
        "Process map in CRM",
        "Stage robots and triggers",
        "Document / ERP linkage",
        "KPI dashboard",
      ],
      intro: [
        "Wordstat cluster: CRM process / business / business-process automation.",
        "Goal is the process in CRM — not more empty fields.",
      ],
      faq: [
        {
          q: "Where to start?",
          a: "One process: lead qualification, proposal, or handoff to delivery.",
        },
        {
          q: "Is AI required?",
          a: "Not always. Robots and integrations first; AI for text and classification.",
        },
        {
          q: "Timeline?",
          a: "2–5 weeks for one process.",
        },
      ],
    },
  },
  {
    category: "integrations",
    slug: "crm-sales-automation",
    contentKey: "crm_ws_sales_automation",
    cluster: "crm",
    serviceSlug: "sales-ai-agent",
    coverImage: "/diagrams/sales-pipeline.svg",
    keywords: [
      "автоматизация продаж crm",
      "автоматизация продаж crm система",
      "crm автоматизация продаж",
    ],
    related: [
      { href: "/automation/sales-department", labelRu: "Отдел продаж", labelEn: "Sales department" },
      { href: "/integrations/crm-automation", labelRu: "Автоматизация CRM", labelEn: "CRM automation" },
      { href: "/automation/ai-for-sales", labelRu: "AI для продаж", labelEn: "AI for sales" },
    ],
    ru: {
      h1: "Автоматизация продаж в CRM",
      subtitle:
        "Автоматизация продаж CRM: лиды, follow-up, КП и контроль воронки. Меньше ручной дисциплины менеджеров.",
      problems: [
        "Лиды зависают без следующего шага",
        "КП собирают вручную",
        "Нет контроля SLA по касаниям",
        "Отчёт по воронке собирают к понедельнику",
      ],
      deliverables: [
        "Воронка и роботы follow-up",
        "Шаблоны и генерация КП из CRM",
        "Напоминания и эскалации",
        "Дашборд конверсии",
      ],
      intro: [
        "«Автоматизация продаж CRM» (~92) — коммерческий запрос отдела продаж.",
        "Автоматизируем касания и документы внутри CRM, не вместо менеджера.",
      ],
      faq: [
        {
          q: "Bitrix24 или amoCRM?",
          a: "Оба. Выбор по текущей системе и команде.",
        },
        {
          q: "Нужен ли AI для КП?",
          a: "Опционально: шаблоны + прайс часто хватает; AI — для черновиков.",
        },
        {
          q: "Срок пилота?",
          a: "2–4 недели на одну воронку.",
        },
      ],
    },
    en: {
      h1: "CRM sales automation",
      subtitle:
        "CRM sales automation: leads, follow-up, proposals and pipeline control — less manual sales discipline.",
      problems: [
        "Leads stall without a next step",
        "Proposals are built manually",
        "No SLA on touches",
        "Pipeline reports arrive every Monday",
      ],
      deliverables: [
        "Pipeline and follow-up robots",
        "Proposal templates from CRM",
        "Reminders and escalations",
        "Conversion dashboard",
      ],
      intro: [
        "“CRM sales automation” is a commercial sales-ops query.",
        "We automate touches and documents inside CRM — not instead of the rep.",
      ],
      faq: [
        {
          q: "Bitrix24 or amoCRM?",
          a: "Both. Choice depends on current system and team.",
        },
        {
          q: "AI for proposals?",
          a: "Optional: templates + price list often enough; AI for drafts.",
        },
        {
          q: "Pilot length?",
          a: "2–4 weeks for one pipeline.",
        },
      ],
    },
  },
  {
    category: "integrations",
    slug: "crm-marketing-automation",
    contentKey: "crm_ws_marketing_automation",
    cluster: "crm",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/crm-integration.svg",
    keywords: ["автоматизация crm маркетинг", "crm маркетинг автоматизация"],
    related: [
      { href: "/integrations/crm-automation", labelRu: "Автоматизация CRM", labelEn: "CRM automation" },
      { href: "/integrations/crm-sales-automation", labelRu: "Продажи в CRM", labelEn: "CRM sales" },
      { href: "/integrations/site-to-crm", labelRu: "Сайт → CRM", labelEn: "Site to CRM" },
    ],
    ru: {
      h1: "Автоматизация CRM и маркетинга",
      subtitle:
        "Автоматизация CRM-маркетинга: лиды с рекламы и сайта в воронку, UTM, сегменты и follow-up без таблиц.",
      problems: [
        "Лиды с рекламы не доходят до CRM",
        "UTM теряются",
        "Маркетинг и продажи спорят о статусах",
        "Нет автоматических касаний после заявки",
      ],
      deliverables: [
        "Связка рекламы / сайта с CRM",
        "UTM и источники в карточке",
        "Сценарии nurture / follow-up",
        "Отчёт по каналам",
      ],
      intro: [
        "Запрос «автоматизация CRM маркетинг» (~43) — стык маркетинга и продаж.",
        "Закрываем разрыв между заявкой и первым касанием менеджера.",
      ],
      faq: [
        {
          q: "Какие каналы?",
          a: "Сайт, Яндекс/Google Ads, мессенджеры, формы — по вашему стеку.",
        },
        {
          q: "Срок?",
          a: "1–3 недели на один канал + воронку.",
        },
        {
          q: "Нужен ли CDP?",
          a: "Обычно нет. Хватает CRM + корректные источники и роботы.",
        },
      ],
    },
    en: {
      h1: "CRM marketing automation",
      subtitle:
        "CRM marketing automation: ads and site leads into the pipeline, UTMs, segments and follow-up — no spreadsheets.",
      problems: [
        "Ad leads never reach CRM",
        "UTMs get lost",
        "Marketing and sales argue about statuses",
        "No automatic touches after a form submit",
      ],
      deliverables: [
        "Ads / site to CRM linkage",
        "UTM and sources on the card",
        "Nurture / follow-up scenarios",
        "Channel reporting",
      ],
      intro: [
        "“CRM marketing automation” sits between marketing and sales.",
        "We close the gap between the form and the first sales touch.",
      ],
      faq: [
        {
          q: "Which channels?",
          a: "Site, ads, messengers, forms — by your stack.",
        },
        {
          q: "Timeline?",
          a: "1–3 weeks for one channel + pipeline.",
        },
        {
          q: "Need a CDP?",
          a: "Usually no. CRM + clean sources and robots is enough.",
        },
      ],
    },
  },
  {
    category: "integrations",
    slug: "crm-1c-automation",
    contentKey: "crm_ws_1c_automation",
    cluster: "crm",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/erp-sync.svg",
    keywords: [
      "1с crm автоматизация",
      "1с комплексная автоматизация crm",
      "интеграция 1с crm",
    ],
    related: [
      { href: "/integrations/1c", labelRu: "1С ↔ CRM", labelEn: "1C ↔ CRM" },
      { href: "/integrations/1c-crm-sync", labelRu: "Синхронизация 1С", labelEn: "1C sync" },
      { href: "/integrations/crm-automation", labelRu: "Автоматизация CRM", labelEn: "CRM automation" },
    ],
    ru: {
      h1: "Автоматизация 1С и CRM",
      subtitle:
        "1С CRM автоматизация: заказы, контрагенты и статусы без ручного переноса между учётом и воронкой.",
      problems: [
        "Менеджеры дублируют данные в 1С и CRM",
        "Статусы заказа расходятся",
        "Нет единого клиента",
        "Ошибки при выгрузке документов",
      ],
      deliverables: [
        "Карта полей 1С ↔ CRM",
        "Двусторонняя синхронизация",
        "Обработка ошибок и логи",
        "Регламент для продаж и учёта",
      ],
      intro: [
        "Запросы «1С CRM автоматизация» отделяем от коробочной «1С:Комплексная автоматизация».",
        "Мы автоматизируем обмен CRM ↔ 1С под ваш процесс, а не продаём лицензию 1С.",
      ],
      faq: [
        {
          q: "Какие конфигурации 1С?",
          a: "Типовые и доработанные — после аудита обменов.",
        },
        {
          q: "Bitrix24 или amoCRM?",
          a: "Оба. Часто Bitrix24 + 1С.",
        },
        {
          q: "Срок?",
          a: "Пилот обмена 2–4 недели на один контур сущностей.",
        },
      ],
    },
    en: {
      h1: "1C and CRM automation",
      subtitle:
        "1C–CRM automation: orders, counterparties and statuses without manual transfer between ledger and pipeline.",
      problems: [
        "Reps duplicate data in 1C and CRM",
        "Order statuses diverge",
        "No single customer record",
        "Document export errors",
      ],
      deliverables: [
        "1C ↔ CRM field map",
        "Bidirectional sync",
        "Error handling and logs",
        "Sales and accounting playbook",
      ],
      intro: [
        "We automate CRM ↔ 1C exchange for your process — not a 1C license sale.",
      ],
      faq: [
        {
          q: "Which 1C configs?",
          a: "Standard and customized — after an exchange audit.",
        },
        {
          q: "Bitrix24 or amoCRM?",
          a: "Both. Bitrix24 + 1C is common.",
        },
        {
          q: "Timeline?",
          a: "2–4 week pilot for one entity contour.",
        },
      ],
    },
  },
];

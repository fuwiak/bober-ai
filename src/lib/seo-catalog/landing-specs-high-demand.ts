import type { LandingSpec } from "@/lib/seo-catalog/types";

/**
 * High-demand commercial stack from the performer profile:
 * manage the business from a phone — automation / marketing / sales.
 * Partners we implement (not all are official partner badges):
 * Bitrix24, amoCRM, YCLIENTS, RetailCRM, МойСклад, Roistat, Mango Telecom, Tinkoff.
 */
export const CATALOG_LANDING_SPECS_HIGH_DEMAND: LandingSpec[] = [
  {
    category: "integrations",
    slug: "business-from-phone",
    contentKey: "hd_business_from_phone",
    cluster: "crm",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/system-architecture.svg",
    keywords: [
      "управляй бизнесом с телефона",
      "автоматизация маркетинг продажи",
      "настройка crm с телефона",
      "внедрение битрикс24 amocrm yclients",
      "retailcrm мойсклад roistat",
      "mango telecom тинькофф crm",
    ],
    caseStudySlugs: ["amocrm-website-integration", "erp-moysklad-chatgpt-ux", "lead-generation"],
    related: [
      { href: "/bitrix", labelRu: "Битрикс24", labelEn: "Bitrix24" },
      { href: "/amocrm", labelRu: "amoCRM", labelEn: "amoCRM" },
      { href: "/integrations/yclients", labelRu: "YCLIENTS", labelEn: "YCLIENTS" },
      { href: "/integrations/retailcrm", labelRu: "RetailCRM", labelEn: "RetailCRM" },
      { href: "/solutions/erp-moysklad", labelRu: "МойСклад", labelEn: "MoySklad" },
      { href: "/integrations/roistat", labelRu: "Roistat", labelEn: "Roistat" },
      { href: "/integrations/mango-telecom", labelRu: "Mango Telecom", labelEn: "Mango Telecom" },
      { href: "/integrations/tinkoff", labelRu: "Тинькофф Банк", labelEn: "Tinkoff" },
    ],
    ru: {
      h1: "Управляй бизнесом с телефона: автоматизация, маркетинг, продажи",
      subtitle:
        "Свяжем CRM, запись, склад, аналитику, телефонию и оплаты — Битрикс24, amoCRM, YCLIENTS, RetailCRM, МойСклад, Roistat, Mango Telecom, Тинькофф Банк. Пилот от 300 000 ₽.",
      problems: [
        "Заявки, записи и оплаты живут в разных приложениях — с телефона не видно, где сделка",
        "Маркетинг считает клики, продажи — другое: нет сквозной воронки",
        "Телефония и банк не пишут статусы в CRM",
        "Склад и онлайн-запись не связаны со сделкой",
      ],
      deliverables: [
        "Карта контура: лид / запись → сделка → склад / оплата",
        "Настройка систем, которые уже куплены — без лишних модулей",
        "Связка статусов, задач и уведомлений в CRM",
        "Регламент, доступ с телефона и обучение команды",
      ],
      intro: [
        "Контур «с телефона»: менеджер видит запись, сделку, остаток и оплату в одном процессе — не в пяти вкладках.",
        "Автоматизация, маркетинг и продажи закрываем стеком, который у вас уже есть: CRM, YCLIENTS, RetailCRM, МойСклад, Roistat, Mango, Тинькофф.",
        "Узкие страницы: YCLIENTS — /integrations/yclients, RetailCRM — /integrations/retailcrm, Roistat — /integrations/roistat, Mango — /integrations/mango-telecom, Тинькофф — /integrations/tinkoff.",
      ],
      howWeSolve: [
        {
          title: "Аудит стека",
          text: "Фиксируем, что уже оплачено: CRM, запись, склад, коллтрекинг, ATS, эквайринг. Выбираем узкое место.",
        },
        {
          title: "Связка и мобильный контур",
          text: "Статусы, задачи, уведомления. Менеджер ведёт процесс с телефона — без копипаста между приложениями.",
        },
        {
          title: "Запуск",
          text: "Прогон сценариев, регламент, приёмка. Дальше — автоматизация или ИИ-слой, если процесс уже держится.",
        },
      ],
      faq: [
        {
          q: "Это официальное партнёрство со всеми вендорами?",
          a: "Официальный статус — 1С-Битрикс. Остальные системы внедряем и интегрируем: amoCRM, YCLIENTS, RetailCRM, МойСклад, Roistat, Mango Telecom, Тинькофф Банк.",
        },
        {
          q: "Можно начать с одной системы?",
          a: "Да. Часто стартуют с CRM или YCLIENTS, затем подключают склад, Roistat, телефонию или эквайринг.",
        },
        {
          q: "Срок и цена?",
          a: "Пилот 2–4 недели от 300 000 ₽. Точечная настройка одной системы — от 150 000 ₽.",
        },
      ],
    },
    en: {
      h1: "Run the business from a phone: automation, marketing, sales",
      subtitle:
        "Connect CRM, booking, warehouse, analytics, telephony and payments — Bitrix24, amoCRM, YCLIENTS, RetailCRM, MoySklad, Roistat, Mango Telecom, Tinkoff. Pilot from a mid-market package.",
      problems: [
        "Leads, bookings and payments live in different apps — the deal is invisible on a phone",
        "Marketing counts clicks, sales counts something else — no end-to-end funnel",
        "Telephony and the bank never write statuses into CRM",
        "Warehouse and online booking are not tied to the deal",
      ],
      deliverables: [
        "Contour map: lead / booking → deal → stock / payment",
        "Setup of systems you already pay for — no extra modules",
        "Status, task and notification wiring in CRM",
        "Playbook, phone access and team training",
      ],
      intro: [
        "Phone-first contour: the manager sees booking, deal, stock and payment in one process.",
        "We implement the stack you already run. Narrow pages: YCLIENTS, RetailCRM, Roistat, Mango, Tinkoff.",
        "Official partner badge is 1C-Bitrix; other vendors are implementation and integration work.",
      ],
      howWeSolve: [
        {
          title: "Stack audit",
          text: "List what is already paid for. Lock the bottleneck.",
        },
        {
          title: "Linking and mobile contour",
          text: "Statuses, tasks, notifications — the manager works from the phone.",
        },
        {
          title: "Launch",
          text: "Scenario walkthrough, playbook, acceptance.",
        },
      ],
      faq: [
        {
          q: "Are you an official partner of every vendor?",
          a: "Official badge: 1C-Bitrix. The rest we implement and integrate.",
        },
        {
          q: "Can we start with one system?",
          a: "Yes. Teams often start with CRM or YCLIENTS, then add warehouse, analytics, telephony or acquiring.",
        },
        {
          q: "Timeline and price?",
          a: "Pilot 2–4 weeks. Single-system setup is a smaller package.",
        },
      ],
    },
  },
  {
    category: "integrations",
    slug: "yclients",
    contentKey: "hd_yclients",
    cluster: "crm",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/crm-integration.svg",
    keywords: [
      "настройка yclients",
      "внедрение yclients",
      "онлайн запись yclients",
      "интеграция yclients amocrm",
      "yclients битрикс24",
      "настройка онлайн записи",
    ],
    caseStudySlugs: ["amocrm-website-integration", "lead-generation"],
    related: [
      { href: "/integrations/crm-setup", labelRu: "Комплекс: запись + CRM + склад", labelEn: "Booking + CRM + warehouse" },
      { href: "/integrations/amocrm-setup", labelRu: "Настройка amoCRM", labelEn: "amoCRM setup" },
      { href: "/integrations/business-from-phone", labelRu: "Контур с телефона", labelEn: "Phone contour" },
      { href: "/pricing", labelRu: "Стоимость", labelEn: "Pricing" },
    ],
    ru: {
      h1: "Настройка YCLIENTS: онлайн-запись под ключ",
      subtitle:
        "Настроим YCLIENTS: услуги, сотрудники, слоты, уведомления. Запись уходит в CRM без ручного переноса. От 150 000 ₽, 2–4 недели.",
      problems: [
        "Онлайн-запись есть, но администратор всё равно вносит клиентов вручную",
        "Записи не становятся сделками в amoCRM или Битрикс24",
        "Напоминания клиентам и загрузка мастеров не работают",
        "С телефона не видно свободные слоты и неявки",
      ],
      deliverables: [
        "Каталог услуг, сотрудники, график и виджет записи",
        "Напоминания клиентам и правила отмены",
        "Связка записи со сделкой в CRM — по запросу",
        "Регламент для администратора и приёмка",
      ],
      intro: [
        "YCLIENTS закрывает запись. Мы настраиваем портал так, чтобы слот, мастер и статус были видны с телефона.",
        "Связка с amoCRM, Битрикс24 или МойСклад — отдельным этапом: /integrations/crm-setup.",
      ],
      howWeSolve: [
        {
          title: "Карта записи",
          text: "Услуги, длительность, ресурсы, филиалы. Что клиент видит в виджете.",
        },
        {
          title: "Настройка YCLIENTS",
          text: "Слоты, права, уведомления, виджет. Без лишних модулей.",
        },
        {
          title: "CRM по необходимости",
          text: "Запись → сделка и ответственный. Комплекс — на странице настройки CRM и МойСклад.",
        },
      ],
      faq: [
        {
          q: "Только YCLIENTS, без CRM?",
          a: "Да. Базовая настройка записи — от 150 000 ₽. Связка с CRM — от 300 000 ₽.",
        },
        {
          q: "Делаете интеграцию YCLIENTS ↔ amoCRM / Битрикс24?",
          a: "Да. Комплексный контур — /integrations/crm-setup.",
        },
        {
          q: "Срок?",
          a: "2–4 недели на запись; связка с CRM — плюс итерация.",
        },
      ],
    },
    en: {
      h1: "YCLIENTS setup: online booking turnkey",
      subtitle:
        "Configure YCLIENTS: services, staff, slots, reminders. Bookings become CRM deals without copy-paste.",
      problems: [
        "Booking widget exists, but the front desk still types clients by hand",
        "Bookings never become deals in amoCRM or Bitrix24",
        "Reminders and staff load do not work",
        "Free slots and no-shows are invisible on a phone",
      ],
      deliverables: [
        "Service catalog, staff, schedule and booking widget",
        "Client reminders and cancellation rules",
        "Booking → CRM deal wiring on request",
        "Front-desk playbook and acceptance",
      ],
      intro: [
        "YCLIENTS owns the booking. We set the portal so slot, staff and status are visible from a phone.",
        "Linking amoCRM, Bitrix24 or MoySklad is a separate step: /integrations/crm-setup.",
      ],
      howWeSolve: [
        {
          title: "Booking map",
          text: "Services, duration, resources, branches.",
        },
        {
          title: "YCLIENTS setup",
          text: "Slots, roles, reminders, widget.",
        },
        {
          title: "CRM if needed",
          text: "Booking → deal and owner.",
        },
      ],
      faq: [
        {
          q: "YCLIENTS only, no CRM?",
          a: "Yes. Booking-only is a smaller package; CRM linking is a larger one.",
        },
        {
          q: "Do you connect YCLIENTS to amoCRM / Bitrix24?",
          a: "Yes — see /integrations/crm-setup.",
        },
        {
          q: "Timeline?",
          a: "2–4 weeks for booking; CRM link adds an iteration.",
        },
      ],
    },
  },
  {
    category: "integrations",
    slug: "retailcrm",
    contentKey: "hd_retailcrm",
    cluster: "crm",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/sales-pipeline.svg",
    keywords: [
      "внедрение retailcrm",
      "настройка retailcrm",
      "интеграция retailcrm",
      "retailcrm мойсклад",
      "retailcrm интернет магазин",
      "автоматизация retailcrm",
    ],
    caseStudySlugs: ["lead-generation", "erp-moysklad-chatgpt-ux"],
    related: [
      { href: "/integrations/business-from-phone", labelRu: "Контур с телефона", labelEn: "Phone contour" },
      { href: "/solutions/erp-moysklad", labelRu: "МойСклад", labelEn: "MoySklad" },
      { href: "/integrations/roistat", labelRu: "Roistat", labelEn: "Roistat" },
      { href: "/integrations/tinkoff", labelRu: "Тинькофф", labelEn: "Tinkoff" },
      { href: "/pricing", labelRu: "Стоимость", labelEn: "Pricing" },
    ],
    ru: {
      h1: "Внедрение и настройка RetailCRM",
      subtitle:
        "Настроим RetailCRM под интернет-магазин: заказы, статусы, склады, доставка. Связка с сайтом, МойСклад и оплатами. От 300 000 ₽.",
      problems: [
        "Заказы с сайта дублируются, статусы доставки не совпадают со складом",
        "Менеджер не видит заказ с телефона — правит Excel",
        "Маркетинг и продажи считают разные цифры",
        "МойСклад и RetailCRM живут отдельно",
      ],
      deliverables: [
        "Воронка заказов, поля, права, триггеры",
        "Обмен с сайтом: заказы, остатки, статусы",
        "Связка с МойСклад / доставкой / оплатами — по контуру",
        "Регламент и обучение менеджеров",
      ],
      intro: [
        "RetailCRM — контур e-com: заказ, склад, доставка. Настраиваем так, чтобы менеджер вёл заказ с телефона.",
        "Сквозная аналитика — /integrations/roistat. Склад — /solutions/erp-moysklad. Эквайринг — /integrations/tinkoff.",
      ],
      howWeSolve: [
        {
          title: "Карта заказа",
          text: "Сайт → RetailCRM → склад / доставка / оплата. Где рвётся статус.",
        },
        {
          title: "Настройка RetailCRM",
          text: "Статусы, триггеры, письма, роли. Только то, что закрывает процесс.",
        },
        {
          title: "Интеграции",
          text: "Сайт, МойСклад, доставка, банк. Логи и retry в промышленном контуре.",
        },
      ],
      faq: [
        {
          q: "Это замена Битрикс24 / amoCRM?",
          a: "RetailCRM — для интернет-магазина. B2B-воронку обычно закрываем Битрикс24 или amoCRM. Можно связать контуры.",
        },
        {
          q: "Срок и цена?",
          a: "Пилот 2–4 недели от 300 000 ₽. Объём зависит от витрин, складов и доставок.",
        },
        {
          q: "Делаете обмен с МойСклад?",
          a: "Да: остатки, резервы, отгрузки. Отдельная страница склада — /solutions/erp-moysklad.",
        },
      ],
    },
    en: {
      h1: "RetailCRM implementation and setup",
      subtitle:
        "Configure RetailCRM for the store: orders, statuses, stock, delivery. Wire the site, MoySklad and payments.",
      problems: [
        "Site orders duplicate; delivery statuses disagree with stock",
        "The manager cannot run the order from a phone",
        "Marketing and sales count different numbers",
        "MoySklad and RetailCRM are silos",
      ],
      deliverables: [
        "Order pipeline, fields, roles, triggers",
        "Site sync: orders, stock, statuses",
        "MoySklad / delivery / payments wiring",
        "Playbook and manager training",
      ],
      intro: [
        "RetailCRM is the e-com contour. We set it so the manager runs the order from a phone.",
        "Analytics: /integrations/roistat. Warehouse: /solutions/erp-moysklad. Acquiring: /integrations/tinkoff.",
      ],
      howWeSolve: [
        {
          title: "Order map",
          text: "Site → RetailCRM → stock / delivery / payment.",
        },
        {
          title: "RetailCRM setup",
          text: "Statuses, triggers, mail, roles.",
        },
        {
          title: "Integrations",
          text: "Site, MoySklad, delivery, bank — with logs and retry.",
        },
      ],
      faq: [
        {
          q: "Is this a Bitrix24 / amoCRM replacement?",
          a: "RetailCRM is for the online store. B2B pipelines usually stay on Bitrix24 or amoCRM.",
        },
        {
          q: "Timeline and price?",
          a: "Pilot 2–4 weeks. Scope depends on storefronts, warehouses and carriers.",
        },
        {
          q: "Do you sync MoySklad?",
          a: "Yes: stock, reserves, shipments.",
        },
      ],
    },
  },
  {
    category: "integrations",
    slug: "roistat",
    contentKey: "hd_roistat",
    cluster: "crm",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/workflow-automation.svg",
    keywords: [
      "внедрение roistat",
      "настройка roistat",
      "сквозная аналитика roistat",
      "roistat amocrm",
      "roistat битрикс24",
      "коллтрекинг roistat crm",
    ],
    caseStudySlugs: ["lead-generation", "bitrix24-kwork-crm"],
    related: [
      { href: "/integrations/business-from-phone", labelRu: "Контур с телефона", labelEn: "Phone contour" },
      { href: "/integrations/retailcrm", labelRu: "RetailCRM", labelEn: "RetailCRM" },
      { href: "/amocrm", labelRu: "amoCRM", labelEn: "amoCRM" },
      { href: "/bitrix", labelRu: "Битрикс24", labelEn: "Bitrix24" },
      { href: "/pricing", labelRu: "Стоимость", labelEn: "Pricing" },
    ],
    ru: {
      h1: "Внедрение Roistat: сквозная аналитика в CRM",
      subtitle:
        "Свяжем рекламу, коллтрекинг и сделки: Roistat ↔ Битрикс24 / amoCRM / RetailCRM. Маркетинг видит продажи, не только клики. От 150 000 ₽.",
      problems: [
        "Директолог считает заявки, РОП — другие: нет сквозной воронки",
        "Звонки и заявки с сайта не привязаны к каналу",
        "С телефона не видно, какой канал принёс оплату",
        "CRM и Roistat расходятся по статусам сделок",
      ],
      deliverables: [
        "Схема источников: реклама → заявка / звонок → сделка → оплата",
        "Настройка Roistat и обмен статусами с CRM",
        "Коллтрекинг и цели, которые совпадают с воронкой",
        "Регламент для маркетинга и продаж",
      ],
      intro: [
        "Roistat закрывает маркетинг: канал → сделка. Мы связываем его с CRM, чтобы цифры совпадали.",
        "Продажи в CRM — /bitrix или /amocrm. E-com — /integrations/retailcrm. Телефония — /integrations/mango-telecom.",
      ],
      howWeSolve: [
        {
          title: "Карта атрибуции",
          text: "Какие каналы и статусы сделки считаем успехом. Без этого отчёты врут.",
        },
        {
          title: "Связка Roistat ↔ CRM",
          text: "Сделки, статусы, суммы. Коллтрекинг в ту же карточку.",
        },
        {
          title: "Контроль",
          text: "Сверка за период. Регламент: кто правит статусы, чтобы аналитика не разъезжалась.",
        },
      ],
      faq: [
        {
          q: "Roistat вместо CRM?",
          a: "Нет. Roistat — аналитика и коллтрекинг. Сделки живут в CRM. Мы связываем оба контура.",
        },
        {
          q: "Срок и цена?",
          a: "Настройка и связка — от 150 000 ₽, 2–4 недели. Сложные мультиканальные схемы — от 300 000 ₽.",
        },
        {
          q: "Работаете с Битрикс24 и amoCRM?",
          a: "Да. RetailCRM — тоже, если заказ живёт там.",
        },
      ],
    },
    en: {
      h1: "Roistat implementation: end-to-end analytics in CRM",
      subtitle:
        "Wire ads, call tracking and deals: Roistat ↔ Bitrix24 / amoCRM / RetailCRM. Marketing sees sales, not only clicks.",
      problems: [
        "Ads count leads, sales counts something else",
        "Calls and site leads are not tied to a channel",
        "The paid channel is invisible on a phone",
        "CRM and Roistat disagree on deal statuses",
      ],
      deliverables: [
        "Source map: ads → lead / call → deal → payment",
        "Roistat setup and CRM status sync",
        "Call tracking and goals that match the pipeline",
        "Playbook for marketing and sales",
      ],
      intro: [
        "Roistat owns marketing attribution. We wire it to CRM so the numbers match.",
        "Sales CRM: /bitrix or /amocrm. E-com: /integrations/retailcrm. Telephony: /integrations/mango-telecom.",
      ],
      howWeSolve: [
        {
          title: "Attribution map",
          text: "Which channels and deal statuses count as success.",
        },
        {
          title: "Roistat ↔ CRM",
          text: "Deals, statuses, amounts. Call tracking into the same card.",
        },
        {
          title: "Control",
          text: "Period reconciliation and a playbook so statuses stay clean.",
        },
      ],
      faq: [
        {
          q: "Is Roistat a CRM replacement?",
          a: "No. Roistat is analytics and call tracking. Deals live in CRM.",
        },
        {
          q: "Timeline and price?",
          a: "Setup 2–4 weeks. Multi-channel schemes raise scope.",
        },
        {
          q: "Bitrix24 and amoCRM?",
          a: "Yes. RetailCRM too when the order lives there.",
        },
      ],
    },
  },
  {
    category: "integrations",
    slug: "mango-telecom",
    contentKey: "hd_mango_telecom",
    cluster: "crm",
    serviceSlug: "ai-sales-loop",
    coverImage: "/diagrams/sales-pipeline.svg",
    keywords: [
      "интеграция mango telecom",
      "mango office crm",
      "mango битрикс24",
      "mango amocrm",
      "телефония mango crm",
      "настройка mango office",
    ],
    caseStudySlugs: ["yandex-telemost-agent", "bitrix24-kwork-crm"],
    related: [
      { href: "/integrations/telephony-ai", labelRu: "Телефония + CRM + ИИ", labelEn: "Telephony + CRM + AI" },
      { href: "/integrations/business-from-phone", labelRu: "Контур с телефона", labelEn: "Phone contour" },
      { href: "/integrations/roistat", labelRu: "Roistat", labelEn: "Roistat" },
      { href: "/services/voice-ai", labelRu: "Речевая аналитика", labelEn: "Speech analytics" },
      { href: "/pricing", labelRu: "Стоимость", labelEn: "Pricing" },
    ],
    ru: {
      h1: "Интеграция Mango Telecom с CRM",
      subtitle:
        "Свяжем Mango Office / ATS со сделками: звонок → карточка в Битрикс24, amoCRM или RetailCRM. Пропущенные не теряются. От 150 000 ₽.",
      problems: [
        "Звонки идут через Mango, а в CRM пустая карточка",
        "Пропущенный вызов никто не видит с телефона",
        "Коллтрекинг и сделка живут в разных отчётах",
        "Нет записи разговора в карточке клиента",
      ],
      deliverables: [
        "Схема: линия Mango → ответственный → сделка / задача",
        "Интеграция ATS с CRM: звонки, записи, статусы",
        "Правила пропущенных и перезвона",
        "Опционально: речевая аналитика и ИИ-слой",
      ],
      intro: [
        "Mango — телефония. Мы пишем звонок в CRM, чтобы менеджер вёл клиента с телефона: история, задача, следующий шаг.",
        "Полный контур звонки + ИИ — /integrations/telephony-ai. Речевая аналитика — /services/voice-ai. Сквозная аналитика — /integrations/roistat.",
      ],
      howWeSolve: [
        {
          title: "Карта линий",
          text: "Входящие, исходящие, очереди, ответственные. Куда падает пропущенный.",
        },
        {
          title: "Связка Mango ↔ CRM",
          text: "Карточка, запись разговора, задача. Без ручного копирования номера.",
        },
        {
          title: "Контроль качества",
          text: "По запросу — транскрипт и скоринг. Это отдельный пакет речевой аналитики.",
        },
      ],
      faq: [
        {
          q: "Только Mango или любая телефония?",
          a: "Эта страница — Mango Telecom. Другие АТС закрываем на /integrations/telephony-ai.",
        },
        {
          q: "Срок и цена?",
          a: "Связка ATS ↔ CRM — от 150 000 ₽, 2–4 недели. ИИ-слой и аналитика звонков — от 300 000 ₽.",
        },
        {
          q: "Нужен ли Roistat?",
          a: "Не обязательно. Roistat добавляем, если нужен канал рекламы на том же звонке.",
        },
      ],
    },
    en: {
      h1: "Mango Telecom integration with CRM",
      subtitle:
        "Wire Mango Office / PBX to deals: call → card in Bitrix24, amoCRM or RetailCRM. Missed calls do not disappear.",
      problems: [
        "Calls go through Mango, the CRM card stays empty",
        "Missed calls are invisible on a phone",
        "Call tracking and the deal live in different reports",
        "No recording on the client card",
      ],
      deliverables: [
        "Line map: Mango → owner → deal / task",
        "PBX ↔ CRM: calls, recordings, statuses",
        "Missed-call and callback rules",
        "Optional speech analytics and AI layer",
      ],
      intro: [
        "Mango is telephony. We write the call into CRM so the manager works from a phone.",
        "Full calls + AI: /integrations/telephony-ai. Speech analytics: /services/voice-ai.",
      ],
      howWeSolve: [
        {
          title: "Line map",
          text: "Inbound, outbound, queues, owners.",
        },
        {
          title: "Mango ↔ CRM",
          text: "Card, recording, task — no number copy-paste.",
        },
        {
          title: "Quality",
          text: "Transcript and scoring as a separate speech-analytics package.",
        },
      ],
      faq: [
        {
          q: "Mango only?",
          a: "This page is Mango Telecom. Other PBX: /integrations/telephony-ai.",
        },
        {
          q: "Timeline and price?",
          a: "PBX ↔ CRM is a smaller package; AI scoring is larger.",
        },
        {
          q: "Do we need Roistat?",
          a: "Only if the ad channel must sit on the same call.",
        },
      ],
    },
  },
  {
    category: "integrations",
    slug: "tinkoff",
    contentKey: "hd_tinkoff",
    cluster: "crm",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/erp-sync.svg",
    keywords: [
      "интеграция тинькофф crm",
      "тинькофф эквайринг crm",
      "тинькофф банк amocrm",
      "тинькофф битрикс24",
      "оплаты тинькофф мойсклад",
      "тинькофф бизнес api",
    ],
    caseStudySlugs: ["erp-moysklad-chatgpt-ux", "lead-generation"],
    related: [
      { href: "/integrations/business-from-phone", labelRu: "Контур с телефона", labelEn: "Phone contour" },
      { href: "/integrations/retailcrm", labelRu: "RetailCRM", labelEn: "RetailCRM" },
      { href: "/solutions/erp-moysklad", labelRu: "МойСклад", labelEn: "MoySklad" },
      { href: "/integrations/bitrix24-1c", labelRu: "Битрикс24 ↔ 1С", labelEn: "Bitrix24 ↔ 1C" },
      { href: "/pricing", labelRu: "Стоимость", labelEn: "Pricing" },
    ],
    ru: {
      h1: "Интеграция Тинькофф Банк с CRM и учётом",
      subtitle:
        "Свяжем эквайринг и Тинькофф Бизнес со сделками: оплата → статус в Битрикс24, amoCRM, RetailCRM или МойСклад. От 150 000 ₽.",
      problems: [
        "Оплата прошла в Тинькофф, сделка в CRM всё ещё «ожидает»",
        "Менеджер с телефона не видит, оплатил клиент или нет",
        "Сверка банка и склада — ручной Excel",
        "Возвраты и частичные оплаты не попадают в воронку",
      ],
      deliverables: [
        "Схема: счёт / ссылка на оплату → вебхук банка → статус сделки",
        "Интеграция эквайринга и выписок с CRM / МойСклад",
        "Правила возвратов и частичных оплат",
        "Регламент сверки и алерты расхождений",
      ],
      intro: [
        "Тинькофф закрывает оплаты. Мы пишем факт оплаты в CRM и склад, чтобы воронка с телефона была правдой, а не таблицей.",
        "E-com — /integrations/retailcrm. Склад — /solutions/erp-moysklad. 1С — /integrations/bitrix24-1c.",
      ],
      howWeSolve: [
        {
          title: "Карта платежей",
          text: "Какие статусы сделки считаем оплатой. Что делаем с возвратом.",
        },
        {
          title: "Связка Тинькофф ↔ CRM",
          text: "Ссылка на оплату, вебхуки, идемпотентность. Без двойных списаний в карточке.",
        },
        {
          title: "Сверка",
          text: "Алерты, если банк и CRM разошлись. Регламент для бухгалтерии и продаж.",
        },
      ],
      faq: [
        {
          q: "Это партнёрство с Тинькофф?",
          a: "Мы внедряем и интегрируем эквайринг и API Тинькофф Бизнес с вашим CRM. Официальный банковский агентский статус не заявляем.",
        },
        {
          q: "Срок и цена?",
          a: "Связка оплат со сделкой — от 150 000 ₽, 2–4 недели. Несколько юрлиц и складов — от 300 000 ₽.",
        },
        {
          q: "Работает с МойСклад?",
          a: "Да: оплата закрывает отгрузку или резерв. Страница склада — /solutions/erp-moysklad.",
        },
      ],
    },
    en: {
      h1: "Tinkoff Bank integration with CRM and ledger",
      subtitle:
        "Wire acquiring and Tinkoff Business to deals: payment → status in Bitrix24, amoCRM, RetailCRM or MoySklad.",
      problems: [
        "The bank shows paid, the CRM deal still waits",
        "The manager cannot see payment status on a phone",
        "Bank vs warehouse reconciliation is a spreadsheet",
        "Refunds and partial payments never hit the pipeline",
      ],
      deliverables: [
        "Map: invoice / payment link → bank webhook → deal status",
        "Acquiring and statements wired to CRM / MoySklad",
        "Refund and partial-payment rules",
        "Reconciliation playbook and mismatch alerts",
      ],
      intro: [
        "Tinkoff owns payments. We write the payment into CRM and stock so the phone funnel is true.",
        "E-com: /integrations/retailcrm. Warehouse: /solutions/erp-moysklad.",
      ],
      howWeSolve: [
        {
          title: "Payment map",
          text: "Which deal statuses mean paid. What a refund does.",
        },
        {
          title: "Tinkoff ↔ CRM",
          text: "Payment links, webhooks, idempotency.",
        },
        {
          title: "Reconciliation",
          text: "Alerts when the bank and CRM disagree.",
        },
      ],
      faq: [
        {
          q: "Are you a Tinkoff partner?",
          a: "We implement acquiring and Tinkoff Business API against your CRM. We do not claim a bank-agent badge.",
        },
        {
          q: "Timeline and price?",
          a: "Payment ↔ deal is a smaller package; multi-entity warehouses raise scope.",
        },
        {
          q: "MoySklad?",
          a: "Yes: payment can close shipment or reserve.",
        },
      ],
    },
  },
];

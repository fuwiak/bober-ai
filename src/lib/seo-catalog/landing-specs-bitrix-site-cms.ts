import type { LandingSpec, LocaleCopy } from "@/lib/seo-catalog/types";

const IMG = {
  crm: "/diagrams/crm-integration.svg",
  sales: "/diagrams/sales-pipeline.svg",
  workflow: "/diagrams/workflow-automation.svg",
  architecture: "/diagrams/system-architecture.svg",
  erp: "/diagrams/erp-sync.svg",
} as const;

const RELATED = [
  { href: "/integrations/bitrix24-s-sajtom", labelRu: "Битрикс24 с сайтом", labelEn: "Bitrix24 ↔ site" },
  { href: "/integrations/nastrojka-1c-bitrix", labelRu: "Настройка 1С-Битрикс", labelEn: "1C-Bitrix setup" },
  { href: "/integrations/sajt-s-bitrix24", labelRu: "Сайт → Битрикс24", labelEn: "Site → Bitrix24" },
  { href: "/integrations/formy-sajta-bitrix24", labelRu: "Формы сайта → CRM", labelEn: "Site forms → CRM" },
  { href: "/integrations/internet-magazin-bitrix24", labelRu: "Магазин → Битрикс24", labelEn: "Shop → Bitrix24" },
  { href: "/integrations/tilda-bitrix24", labelRu: "Тильда → Битрикс24", labelEn: "Tilda → Bitrix24" },
  { href: "/integrations/zayavki-sajta-bitrix24", labelRu: "Заявки с сайта", labelEn: "Website leads" },
  { href: "/integrations/nastrojka-sajta-1c-bitrix", labelRu: "Сайт на 1С-Битрикс", labelEn: "1C-Bitrix site" },
  { href: "/integrations/nastrojka-1c-bitrix-dlya-biznesa", labelRu: "1С-Битрикс для бизнеса", labelEn: "1C-Bitrix for business" },
  { href: "/integrations/nastrojka-1c-bitrix-posle-ustanovki", labelRu: "После установки", labelEn: "After install" },
  { href: "/integrations/nastrojka-1c-bitrix-kompleksnaya", labelRu: "Комплексная настройка", labelEn: "Full setup" },
  { href: "/integrations/nastrojka-infoblokov-1c-bitrix", labelRu: "Инфоблоки", labelEn: "Infoblocks" },
  { href: "/integrations/bitrix24-integration", labelRu: "Интеграция Битрикс24", labelEn: "Bitrix24 integration" },
  { href: "/bitrix", labelRu: "пакеты Bitrix24", labelEn: "Bitrix24 packages" },
  { href: "/pricing", labelRu: "цены", labelEn: "pricing" },
] as const;

function related(slug: string) {
  const path = `/integrations/${slug}`;
  return RELATED.filter((item) => item.href !== path).map((item) => ({ ...item }));
}

type Page = {
  slug: string;
  contentKey: string;
  coverImage: string;
  keywords: string[];
  ru: LocaleCopy;
  en: LocaleCopy;
};

function page(def: Page): LandingSpec {
  return {
    category: "integrations",
    slug: def.slug,
    contentKey: def.contentKey,
    cluster: "bitrix24",
    serviceSlug: "crm-integration",
    coverImage: def.coverImage,
    keywords: def.keywords,
    caseStudySlugs: ["amocrm-website-integration", "bitrix24-kwork-crm", "bitrix24-erp-sync"],
    related: related(def.slug),
    ru: def.ru,
    en: def.en,
  };
}

/**
 * Exact titles + 10 variants:
 * «Интеграция Битрикс24 с сайтом» and «Настройка 1С-Битрикс».
 */
export const CATALOG_LANDING_SPECS_BITRIX_SITE_CMS: LandingSpec[] = [
  page({
    slug: "bitrix24-s-sajtom",
    contentKey: "bx24_site",
    coverImage: IMG.crm,
    keywords: [
      "интеграция битрикс24 с сайтом",
      "битрикс24 интеграция с сайтом",
      "связать сайт с битрикс24",
      "заказать интеграцию битрикс24 с сайтом",
      "интеграция битрикс24 сайт цена",
    ],
    ru: {
      h1: "Интеграция Битрикс24 с сайтом",
      subtitle:
        "Заявки, формы и заказы с сайта сразу в Битрикс24: UTM, ответственный, без дублей. Бизнес-партнёр Битрикс24. От 150 000 ₽.",
      problems: [
        "Заявки с сайта падают в почту, менеджер копирует в CRM руками",
        "Дубли лидов, пустые UTM, нет ответственного в сделке",
        "Форма «отправилась», в Битрикс24 карточки нет",
      ],
      deliverables: [
        "Связка форм / корзины / вебхуков с воронкой Битрикс24",
        "UTM, источник, антидубль и назначение ответственного",
        "Лог обмена, тест на живой форме, регламент",
      ],
      intro: [
        "Интеграция Битрикс24 с сайтом — не модуль «скачать». Заявка с витрины становится сделкой с полями, которые нужны продажам.",
        "Тильда, свой сайт, WordPress, 1С-Битрикс — отдельные страницы ниже. Общий контур интеграций — /integrations/bitrix24-integration.",
      ],
      howWeSolve: [
        { title: "Карта источников", text: "Какие формы, корзина, чат, коллбек уже есть и куда должны писать." },
        { title: "Связка", text: "Вебхук / REST / готовый коннектор. Маппинг полей, дубли, ответственный." },
        { title: "Приёмка", text: "Контрольные заявки, лог ошибок, краткий регламент для менеджеров." },
      ],
      faq: [
        {
          q: "Сколько стоит интеграция Битрикс24 с сайтом?",
          a: "Типовая связка форм — от 150 000 ₽. Интернет-магазин с заказами и статусами — от 300 000 ₽. Смета фиксируется до старта.",
        },
        {
          q: "Какие сайты подключаете?",
          a: "Свой сайт, Тильда, WordPress, 1С-Битрикс, лендинги с вебхуком. Если API нет — промежуточный шлюз.",
        },
        {
          q: "Вы партнёр Битрикс24?",
          a: "Да. Бизнес-партнёр Битрикс24, участие в программе 1С-Битрикс · ID 28909898.",
        },
      ],
    },
    en: {
      h1: "Bitrix24 integration with the website",
      subtitle:
        "Forms and orders from the site into Bitrix24: UTM, owner, no duplicates. Bitrix24 Business Partner. From a mid-market package.",
      problems: [
        "Leads land in email; managers copy them into CRM",
        "Duplicate leads, empty UTM, no deal owner",
        "The form says sent, Bitrix24 has no card",
      ],
      deliverables: [
        "Forms / cart / webhooks wired to the Bitrix24 pipeline",
        "UTM, source, dedupe and owner assignment",
        "Sync log, live-form test, playbook",
      ],
      intro: [
        "Bitrix24 ↔ website is a production contour, not a downloadable module.",
        "Tilda, WordPress, 1C-Bitrix CMS have their own pages. Broader integration: /integrations/bitrix24-integration.",
      ],
      howWeSolve: [
        { title: "Source map", text: "Forms, cart, chat, callbacks — where they must write." },
        { title: "Wire-up", text: "Webhook / REST / connector. Field map, duplicates, owner." },
        { title: "Accept", text: "Control leads, error log, short playbook." },
      ],
      faq: [
        { q: "Price?", a: "Typical forms contour is a mid-market package; shop with order statuses is larger. Fixed estimate first." },
        { q: "Which sites?", a: "Custom, Tilda, WordPress, 1C-Bitrix, any landing with a webhook." },
        { q: "Official partner?", a: "Yes — Bitrix24 Business Partner, 1C-Bitrix program ID 28909898." },
      ],
    },
  }),
  page({
    slug: "nastrojka-1c-bitrix",
    contentKey: "cms_1c_bitrix",
    coverImage: IMG.architecture,
    keywords: [
      "настройка 1с-битрикс",
      "настройка 1с битрикс",
      "настроить 1с-битрикс",
      "настройка cms 1с-битрикс",
      "настройка 1с-битрикс цена",
    ],
    ru: {
      h1: "Настройка 1С-Битрикс",
      subtitle:
        "Настройка 1С-Битрикс: структура, модули, права, формы, каталог. Партнёр 1С-Битрикс. От 45 000 ₽ за согласованный объём.",
      problems: [
        "Лицензия куплена, сайт «пустой»: нет разделов, прав и форм",
        "После установки не работают обновления, кэш или шаблон",
        "Нужна базовая связка заявок с CRM, не новая витрина с нуля",
      ],
      deliverables: [
        "Структура разделов, роли, модули под задачу",
        "Формы, уведомления, опционально CRM",
        "Регламент редакторов и чек-лист запуска",
      ],
      intro: [
        "Настройка 1С-Битрикс — CMS сайта (не портал Битрикс24). Модули, инфоблоки, шаблон, права.",
        "Битрикс24 с сайтом — /integrations/bitrix24-s-sajtom. Магазин, инфоблоки, «после установки» — страницы ниже.",
      ],
      howWeSolve: [
        { title: "Аудит установки", text: "Редакция, шаблон, что уже сломано, какие модули нужны." },
        { title: "Настройка", text: "Разделы, права, формы, каталог — только то, чем будут пользоваться." },
        { title: "Передача", text: "Обучение редакторов, бэкап, чек-лист." },
      ],
      faq: [
        {
          q: "Это Битрикс24 или CMS?",
          a: "Эта страница — про CMS 1С-Битрикс (сайт). CRM Битрикс24 — /integrations/bitrix24-s-sajtom и /bitrix.",
        },
        {
          q: "Срок и цена?",
          a: "Базовая настройка — от 45 000 ₽. Комплекс (магазин, каталог, CRM) — от 80 000 ₽. Срок 1–4 недели.",
        },
        {
          q: "Вы партнёр 1С-Битрикс?",
          a: "Да. Участие в программе 1С-Битрикс · ID 28909898.",
        },
      ],
    },
    en: {
      h1: "1C-Bitrix setup",
      subtitle:
        "1C-Bitrix CMS: structure, modules, roles, forms, catalog. 1C-Bitrix partner. From a scoped setup package.",
      problems: [
        "License is paid, the site is empty: no sections, roles or forms",
        "Updates, cache or the template break after install",
        "You need lead-to-CRM wiring, not a new storefront from scratch",
      ],
      deliverables: [
        "Sections, roles, modules for the job",
        "Forms, notifications, optional CRM",
        "Editor playbook and launch checklist",
      ],
      intro: [
        "This is the 1C-Bitrix CMS — not the Bitrix24 portal.",
        "Bitrix24 ↔ website: /integrations/bitrix24-s-sajtom.",
      ],
      howWeSolve: [
        { title: "Audit", text: "Edition, template, what is broken, which modules you need." },
        { title: "Setup", text: "Sections, roles, forms, catalog — only what the team will use." },
        { title: "Handover", text: "Editor training, backup, checklist." },
      ],
      faq: [
        { q: "CMS or Bitrix24?", a: "CMS. Bitrix24 CRM is /integrations/bitrix24-s-sajtom." },
        { q: "Price?", a: "Basic setup is a smaller package; shop + catalog + CRM is larger. 1–4 weeks." },
        { q: "Partner?", a: "Yes — 1C-Bitrix program ID 28909898." },
      ],
    },
  }),
  page({
    slug: "sajt-s-bitrix24",
    contentKey: "bx24_site_reverse",
    coverImage: IMG.sales,
    keywords: [
      "интеграция сайта с битрикс24",
      "подключить сайт к битрикс24",
      "сайт битрикс24 интеграция",
    ],
    ru: {
      h1: "Интеграция сайта с Битрикс24",
      subtitle:
        "Сайт → Битрикс24: лид или сделка в момент отправки формы. Источник и UTM в карточке. От 150 000 ₽.",
      problems: [
        "Сайт и CRM живут отдельно — заявки теряются в почте",
        "Маркетинг не видит, какая страница привела сделку",
        "Нет единого ответственного за входящий лид",
      ],
      deliverables: [
        "Поток: событие на сайте → сущность в Битрикс24",
        "UTM и посадочная в полях сделки",
        "Тест и журнал ошибок",
      ],
      intro: [
        "Та же связка, что «интеграция Битрикс24 с сайтом», акцент на стороне витрины: какие события сайта пишем в CRM.",
        "Точная страница кластера — /integrations/bitrix24-s-sajtom.",
      ],
      howWeSolve: [
        { title: "События сайта", text: "Форма, чат, коллбек, заказ — что считаем лидом." },
        { title: "Карточка CRM", text: "Куда пишем, какие поля обязательны, кто владеет." },
        { title: "Контроль", text: "Прогон с реальной страницы, алерты если обмен молчит." },
      ],
      faq: [
        { q: "Чем отличается от страницы «Битрикс24 с сайтом»?", a: "Зеркало запроса «интеграция сайта с битрикс24». Работы те же, канон кластера — /integrations/bitrix24-s-sajtom." },
        { q: "Можно только одну форму?", a: "Да. Часто начинают с главной заявки, затем корзина и чат." },
      ],
    },
    en: {
      h1: "Website integration with Bitrix24",
      subtitle: "Site → Bitrix24: lead or deal on form submit. Source and UTM on the card.",
      problems: ["Site and CRM are separate", "Marketing cannot see the landing that closed", "No owner for inbound leads"],
      deliverables: ["Site event → Bitrix24 entity", "UTM and landing in deal fields", "Test and error journal"],
      intro: ["Same contour as /integrations/bitrix24-s-sajtom, from the website side."],
      howWeSolve: [
        { title: "Site events", text: "Form, chat, callback, order." },
        { title: "CRM card", text: "Where we write, required fields, owner." },
        { title: "Control", text: "Live-page test, alerts if sync goes quiet." },
      ],
      faq: [
        { q: "Vs Bitrix24 ↔ site page?", a: "Mirror query. Canon: /integrations/bitrix24-s-sajtom." },
        { q: "One form only?", a: "Yes — start with the main lead form." },
      ],
    },
  }),
  page({
    slug: "formy-sajta-bitrix24",
    contentKey: "bx24_site_forms",
    coverImage: IMG.workflow,
    keywords: [
      "интеграция форм сайта с битрикс24",
      "форма сайта в битрикс24",
      "заявка с формы в битрикс24",
    ],
    ru: {
      h1: "Интеграция форм сайта с Битрикс24",
      subtitle:
        "Каждая форма — лид или сделка: поля, файлы, антиспам, уведомление менеджеру. От 150 000 ₽.",
      problems: [
        "Несколько форм, все сыпятся в один ящик без типа заявки",
        "Файлы и комментарии не попадают в карточку",
        "Спам и пустые отправки засоряют воронку",
      ],
      deliverables: [
        "Маппинг полей каждой формы на карточку Битрикс24",
        "Антиспам, обязательные поля, тип лида",
        "Уведомление ответственному и тест отправки",
      ],
      intro: [
        "Узкий сценарий: не «весь сайт», а формы. Корзина магазина — /integrations/internet-magazin-bitrix24.",
      ],
      howWeSolve: [
        { title: "Инвентарь форм", text: "Сколько форм, какие поля, куда должны попадать." },
        { title: "Маппинг", text: "Тип лида, воронка, обязательные поля, файлы." },
        { title: "Защита", text: "Антиспам и отсев пустых, чтобы воронка не забивалась." },
      ],
      faq: [
        { q: "Bitrix, Tilda, кастом?", a: "Все три. Важно, чтобы форма умела вебхук или серверный хук." },
        { q: "Цена?", a: "От 150 000 ₽ за пакет форм на одном домене. Смета после списка форм." },
      ],
    },
    en: {
      h1: "Website forms to Bitrix24",
      subtitle: "Each form becomes a lead or deal: fields, files, anti-spam, manager alert.",
      problems: ["Many forms, one mailbox, no lead type", "Files never reach the card", "Spam fills the pipeline"],
      deliverables: ["Field map per form", "Anti-spam and lead type", "Owner alert and send test"],
      intro: ["Narrow: forms only. Shop cart: /integrations/internet-magazin-bitrix24."],
      howWeSolve: [
        { title: "Form inventory", text: "How many, which fields, where they must land." },
        { title: "Mapping", text: "Lead type, pipeline, required fields, files." },
        { title: "Guard", text: "Anti-spam so the funnel stays clean." },
      ],
      faq: [
        { q: "Bitrix, Tilda, custom?", a: "All three if the form can webhook." },
        { q: "Price?", a: "A forms package on one domain. Estimate after the form list." },
      ],
    },
  }),
  page({
    slug: "internet-magazin-bitrix24",
    contentKey: "bx24_shop",
    coverImage: IMG.erp,
    keywords: [
      "интеграция интернет-магазина с битрикс24",
      "заказы сайта в битрикс24",
      "магазин битрикс24 интеграция",
    ],
    ru: {
      h1: "Интеграция интернет-магазина с Битрикс24",
      subtitle:
        "Заказ с витрины → сделка: состав, сумма, статус оплаты и доставки. От 300 000 ₽.",
      problems: [
        "Заказы в админке магазина, продажи — в Excel или другой CRM",
        "Оплата прошла, в Битрикс24 статус не сдвинулся",
        "Состав заказа и комментарий клиента теряются",
      ],
      deliverables: [
        "Обмен заказами и статусами магазин ↔ Битрикс24",
        "Состав, сумма, клиент, способ оплаты/доставки",
        "Журнал и повтор при сбое",
      ],
      intro: [
        "Тяжелее форм: сущности заказа, статусы, иногда остатки. 1С-учёт — /integrations/bitrix24-1c.",
      ],
      howWeSolve: [
        { title: "Модель заказа", text: "Что считается сделкой, какие статусы зеркалим." },
        { title: "Шлюз", text: "Очередь, идемпотентность, разбор ошибок оплаты." },
        { title: "Приёмка", text: "Контрольные заказы: новый, оплачен, отменён." },
      ],
      faq: [
        { q: "WooCommerce, 1С-Битрикс, Shopify?", a: "Да, если есть API или вебхуки заказа. Платформу фиксируем на брифе." },
        { q: "Цена?", a: "От 300 000 ₽. Сложный контур со складом и 1С — отдельно." },
      ],
    },
    en: {
      h1: "Online store integration with Bitrix24",
      subtitle: "Store order → deal: lines, amount, payment and delivery status.",
      problems: ["Orders in the shop admin, sales in a spreadsheet", "Payment succeeded, CRM status did not move", "Line items get lost"],
      deliverables: ["Order and status sync", "Lines, amount, customer, payment/delivery", "Journal and retry"],
      intro: ["Heavier than forms. 1C accounting: /integrations/bitrix24-1c."],
      howWeSolve: [
        { title: "Order model", text: "What is a deal, which statuses we mirror." },
        { title: "Gateway", text: "Queue, idempotency, payment errors." },
        { title: "Accept", text: "Control orders: new, paid, cancelled." },
      ],
      faq: [
        { q: "Woo, 1C-Bitrix, Shopify?", a: "Yes if order API/webhooks exist." },
        { q: "Price?", a: "Larger package. Warehouse + 1C is a separate contour." },
      ],
    },
  }),
  page({
    slug: "tilda-bitrix24",
    contentKey: "bx24_tilda",
    coverImage: IMG.crm,
    keywords: [
      "интеграция тильды с битрикс24",
      "тильда битрикс24",
      "tilda bitrix24",
      "заявки тильда в битрикс24",
    ],
    ru: {
      h1: "Интеграция Тильды с Битрикс24",
      subtitle:
        "Формы и оплаты Tilda → лид или сделка в Битрикс24. UTM с страницы. От 150 000 ₽.",
      problems: [
        "Заявки Tilda уходят на почту или в Google Таблицу",
        "Оплата на Тильде не двигает стадию в CRM",
        "Несколько лендингов, в CRM всё в одной куче",
      ],
      deliverables: [
        "Подключение форм Tilda к воронке Битрикс24",
        "Разведение лендингов по источникам / воронкам",
        "Опционально статус оплаты, тест с опубликованной страницы",
      ],
      intro: [
        "Тильда часто первый сайт у SMB. Не путаем с CMS 1С-Битрикс — та на /integrations/nastrojka-1c-bitrix.",
      ],
      howWeSolve: [
        { title: "Инвентарь лендингов", text: "Какие страницы, какие формы, какие оплаты." },
        { title: "Связка Tilda", text: "Вебхук / коннектор, поля, источник = URL лендинга." },
        { title: "Прогон", text: "Отправка с опубликованной Tilda, проверка карточки." },
      ],
      faq: [
        { q: "Нужен платный тариф Tilda?", a: "Обычно да: вебхуки и интеграции. Уточняем на брифе." },
        { q: "Несколько лендингов?", a: "Да. Каждый — свой источник или направление в CRM." },
      ],
    },
    en: {
      h1: "Tilda integration with Bitrix24",
      subtitle: "Tilda forms and payments → Bitrix24 lead or deal. UTM from the page.",
      problems: ["Tilda leads go to email or Sheets", "Tilda payment does not move CRM stage", "Many landings, one pile in CRM"],
      deliverables: ["Tilda forms → Bitrix24 pipeline", "Landings split by source", "Optional payment status, live-page test"],
      intro: ["Tilda ≠ 1C-Bitrix CMS. CMS: /integrations/nastrojka-1c-bitrix."],
      howWeSolve: [
        { title: "Landing inventory", text: "Pages, forms, payments." },
        { title: "Tilda wire", text: "Webhook/connector, fields, source = landing URL." },
        { title: "Run", text: "Submit on the published page, check the card." },
      ],
      faq: [
        { q: "Paid Tilda plan?", a: "Usually yes for webhooks. Confirmed on the brief." },
        { q: "Many landings?", a: "Yes — each gets its own source or pipeline." },
      ],
    },
  }),
  page({
    slug: "zayavki-sajta-bitrix24",
    contentKey: "bx24_site_leads",
    coverImage: IMG.sales,
    keywords: [
      "заявки с сайта в битрикс24",
      "лиды с сайта битрикс24",
      "заявка сайт битрикс24",
    ],
    ru: {
      h1: "Заявки с сайта в Битрикс24",
      subtitle:
        "Лид не теряется: с сайта в воронку за секунды, со SLA и ответственным. От 150 000 ₽.",
      problems: [
        "Заявки в почте, мессенджере и CRM одновременно — дубли",
        "Нет SLA: кто взял лид и за сколько минут",
        "Ночью заявка лежит до утра без задачи",
      ],
      deliverables: [
        "Единая точка входа заявок в Битрикс24",
        "Правила распределения и задача при простое",
        "Антидубль по телефону / email",
      ],
      intro: [
        "Коммерческий запрос «заявки с сайта». Общий CRM без привязки к Битрикс24 — /integrations/site-to-crm.",
      ],
      howWeSolve: [
        { title: "Вход", text: "Все формы и кнопки — в одну сущность CRM." },
        { title: "Маршрутизация", text: "Кто берёт, очередь, эскалация если молчит." },
        { title: "Контроль", text: "Антидубль и отчёт: сколько заявок не взяли." },
      ],
      faq: [
        { q: "Чем отличается от site-to-crm?", a: "Здесь только Битрикс24. Универсальная страница — /integrations/site-to-crm." },
        { q: "Мессенджеры тоже?", a: "Открытые линии — соседний контур. Здесь фокус: формы и заявки сайта." },
      ],
    },
    en: {
      h1: "Website leads into Bitrix24",
      subtitle: "Lead does not leak: site → pipeline in seconds, with SLA and an owner.",
      problems: ["Leads in email, chat and CRM at once", "No SLA for pickup", "Night leads sit until morning"],
      deliverables: ["Single intake into Bitrix24", "Routing and idle task", "Dedupe by phone/email"],
      intro: ["Bitrix24-only. Generic CRM: /integrations/site-to-crm."],
      howWeSolve: [
        { title: "Intake", text: "All forms into one CRM entity." },
        { title: "Routing", text: "Owner, queue, escalate if silent." },
        { title: "Control", text: "Dedupe and a report of untouched leads." },
      ],
      faq: [
        { q: "Vs site-to-crm?", a: "Here Bitrix24 only. Generic: /integrations/site-to-crm." },
        { q: "Messengers?", a: "Open lines are a separate contour. This page is site forms." },
      ],
    },
  }),
  page({
    slug: "nastrojka-sajta-1c-bitrix",
    contentKey: "cms_site_1c_bitrix",
    coverImage: IMG.architecture,
    keywords: [
      "настройка сайта на 1с-битрикс",
      "настроить сайт 1с-битрикс",
      "сайт на 1с битрикс настройка",
    ],
    ru: {
      h1: "Настройка сайта на 1С-Битрикс",
      subtitle:
        "Рабочий сайт на CMS: разделы, шаблон, формы, мобильная вёрстка. От 45 000 ₽.",
      problems: [
        "Шаблон стоит, контент не разложен, меню пустое",
        "Мобильная версия ломает формы и каталог",
        "Редакторы боятся админки — нет ролей и инструкций",
      ],
      deliverables: [
        "Структура меню и посадочных",
        "Настройка шаблона и ключевых страниц",
        "Формы + краткое обучение редакторов",
      ],
      intro: [
        "Ближе к «сделать сайт живым», чем к пустой установке ядра. Канон CMS — /integrations/nastrojka-1c-bitrix.",
      ],
      howWeSolve: [
        { title: "Каркас", text: "Разделы, шаблон, главная, контакты." },
        { title: "Контент-контур", text: "Что редактируют сами, что оставляем в коде." },
        { title: "Запуск", text: "Адаптив, формы, доступы." },
      ],
      faq: [
        { q: "С нуля или на готовом?", a: "Оба. Чаще доводим уже купленную лицензию и шаблон (АСПРО и аналоги)." },
        { q: "Цена?", a: "От 45 000 ₽. Посадка макета Figma — отдельная смета." },
      ],
    },
    en: {
      h1: "1C-Bitrix website setup",
      subtitle: "A working CMS site: sections, template, forms, mobile layout.",
      problems: ["Template installed, menu empty", "Mobile breaks forms", "Editors fear the admin"],
      deliverables: ["Menu and landing structure", "Template and key pages", "Forms + editor training"],
      intro: ["Canon CMS page: /integrations/nastrojka-1c-bitrix."],
      howWeSolve: [
        { title: "Frame", text: "Sections, template, home, contacts." },
        { title: "Edit contour", text: "What editors own vs what stays in code." },
        { title: "Launch", text: "Responsive, forms, access." },
      ],
      faq: [
        { q: "From scratch?", a: "Both. Often we finish a paid license and ASPRO-class template." },
        { q: "Price?", a: "Scoped setup package. Figma-to-Bitrix is a separate estimate." },
      ],
    },
  }),
  page({
    slug: "nastrojka-1c-bitrix-dlya-biznesa",
    contentKey: "cms_1c_bitrix_biz",
    coverImage: IMG.workflow,
    keywords: [
      "настройка 1с-битрикс для бизнеса",
      "1с-битрикс для компании",
      "корпоративный сайт 1с-битрикс",
    ],
    ru: {
      h1: "Настройка 1С-Битрикс для бизнеса",
      subtitle:
        "Корпоративный сайт: услуги, заявки, роли, без лишнего магазина. От 60 000 ₽.",
      problems: [
        "Нужна витрина услуг, не интернет-магазин",
        "Несколько отделов правят сайт и ломают друг друга",
        "Заявки с «Услуг» не попадают менеджеру",
      ],
      deliverables: [
        "Структура под B2B/услуги",
        "Роли по отделам",
        "Формы заявок и уведомления",
      ],
      intro: [
        "Для компаний, которым CMS нужна как витрина и лидогенерация, не как каталог SKU. Магазин — /integrations/internet-magazin-bitrix24 если нужна CRM.",
      ],
      howWeSolve: [
        { title: "Задача бизнеса", text: "Лиды, контент, каталог услуг — что главное." },
        { title: "Роли", text: "Кто публикует, кто только читает, кто формы." },
        { title: "Лиды", text: "Форма → почта и/или Битрикс24." },
      ],
      faq: [
        { q: "Подойдёт редакция «Старт»?", a: "Зависит от модулей. На аудите скажем, хватит или нужна «Бизнес»." },
        { q: "Цена?", a: "От 60 000 ₽. Связка с Битрикс24 — плюсом, см. /integrations/bitrix24-s-sajtom." },
      ],
    },
    en: {
      h1: "1C-Bitrix setup for business",
      subtitle: "Corporate site: services, leads, roles — no extra storefront.",
      problems: ["Need a services site, not a shop", "Departments overwrite each other", "Service forms never reach sales"],
      deliverables: ["B2B/services IA", "Roles per team", "Lead forms and alerts"],
      intro: ["CMS as lead gen, not SKU catalog."],
      howWeSolve: [
        { title: "Business job", text: "Leads, content, service catalog." },
        { title: "Roles", text: "Who publishes, who only reads." },
        { title: "Leads", text: "Form → email and/or Bitrix24." },
      ],
      faq: [
        { q: "Start edition?", a: "Depends on modules. Audit first." },
        { q: "Price?", a: "Business-site package. Bitrix24 wire is extra." },
      ],
    },
  }),
  page({
    slug: "nastrojka-1c-bitrix-posle-ustanovki",
    contentKey: "cms_1c_bitrix_after",
    coverImage: IMG.architecture,
    keywords: [
      "настройка 1с-битрикс после установки",
      "1с-битрикс после установки",
      "довести 1с-битрикс после инсталляции",
    ],
    ru: {
      h1: "Настройка 1С-Битрикс после установки",
      subtitle:
        "Ядро стоит, сайта нет: права, модули, шаблон, первый контент. От 25 000 ₽.",
      problems: [
        "Хостер или интегратор поставил CMS и исчез",
        "Админка открывается, публичка — заглушка",
        "Не настроены почта, HTTPS, бэкап, обновления",
      ],
      deliverables: [
        "Базовые модули и почта",
        "Шаблон и 3–5 стартовых страниц",
        "Права, бэкап, план обновлений",
      ],
      intro: [
        "Короткий пакет «довести установку». Не путать с комплексным внедрением — /integrations/nastrojka-1c-bitrix-kompleksnaya.",
      ],
      howWeSolve: [
        { title: "Диагностика", text: "Что уже стоит, какие ошибки в журнале." },
        { title: "Минимум для продакшена", text: "Почта, HTTPS, шаблон, формы." },
        { title: "Передача", text: "Доступы, бэкап, что не трогать в админке." },
      ],
      faq: [
        { q: "Если установка кривая?", a: "Сначала чиним ядро и права, потом контент. Иногда быстрее переустановить на копии." },
        { q: "Цена?", a: "От 25 000 ₽, если ядро живое. Кривой хостинг — отдельная оценка." },
      ],
    },
    en: {
      h1: "1C-Bitrix setup after installation",
      subtitle: "Core is in, site is not: roles, modules, template, first pages.",
      problems: ["Installer vanished", "Admin works, public is a stub", "No mail, HTTPS, backup"],
      deliverables: ["Base modules and mail", "Template and 3–5 starter pages", "Roles, backup, update plan"],
      intro: ["Short “finish the install” pack. Full rollout: /integrations/nastrojka-1c-bitrix-kompleksnaya."],
      howWeSolve: [
        { title: "Diagnose", text: "What is installed, log errors." },
        { title: "Production minimum", text: "Mail, HTTPS, template, forms." },
        { title: "Handover", text: "Access, backup, what not to click." },
      ],
      faq: [
        { q: "Broken install?", a: "Fix core first. Sometimes a reinstall on a copy is faster." },
        { q: "Price?", a: "Smaller package if the core is healthy." },
      ],
    },
  }),
  page({
    slug: "nastrojka-1c-bitrix-kompleksnaya",
    contentKey: "cms_1c_bitrix_full",
    coverImage: IMG.erp,
    keywords: [
      "комплексная настройка 1с-битрикс",
      "внедрение и настройка 1с-битрикс",
      "1с-битрикс под ключ настройка",
    ],
    ru: {
      h1: "Комплексная настройка 1С-Битрикс",
      subtitle:
        "Сайт + каталог + формы + базовая CRM-связка. Один контур, смета до старта. От 80 000 ₽.",
      problems: [
        "Нужно сразу: витрина, заявки, каталог, не три разных подрядчика",
        "Шаблон, модули и CRM настраивали разные люди — ничего не сходится",
        "Нет чек-листа запуска и ответственного за прод",
      ],
      deliverables: [
        "Структура, шаблон, каталог или услуги",
        "Формы и связка с Битрикс24 / почтой",
        "Запуск, обучение, чек-лист",
      ],
      intro: [
        "Максимальный CMS-пакет в этом кластере. CRM-портал Битрикс24 целиком — /integrations/bitrix24-implementation.",
      ],
      howWeSolve: [
        { title: "Объём", text: "Фиксируем страницы, каталог, интеграции — в смете." },
        { title: "Сборка", text: "CMS, затем формы, затем CRM если нужно." },
        { title: "Прод", text: "Релиз, доступы, что мониторить." },
      ],
      faq: [
        { q: "Почему не 300 000 ₽ как CRM?", a: "Это CMS-контур сайта. Полное внедрение портала Битрикс24 — от 300 000 ₽ на /bitrix." },
        { q: "Срок?", a: "2–6 недель в зависимости от каталога и вёрстки." },
      ],
    },
    en: {
      h1: "Full 1C-Bitrix setup",
      subtitle: "Site + catalog + forms + basic CRM wire. One contour, estimate first.",
      problems: ["Need storefront, leads and catalog from one team", "Template, modules and CRM disagree", "No launch checklist"],
      deliverables: ["IA, template, catalog or services", "Forms and Bitrix24/email", "Launch, training, checklist"],
      intro: ["Largest CMS pack here. Full Bitrix24 portal: /integrations/bitrix24-implementation."],
      howWeSolve: [
        { title: "Scope", text: "Pages, catalog, integrations — in the estimate." },
        { title: "Build", text: "CMS, then forms, then CRM." },
        { title: "Prod", text: "Release, access, what to monitor." },
      ],
      faq: [
        { q: "Why not CRM pricing?", a: "This is the CMS contour. Full Bitrix24 portal is /bitrix." },
        { q: "Timeline?", a: "2–6 weeks depending on catalog and layout." },
      ],
    },
  }),
  page({
    slug: "nastrojka-infoblokov-1c-bitrix",
    contentKey: "cms_1c_bitrix_iblock",
    coverImage: IMG.workflow,
    keywords: [
      "настройка инфоблоков 1с-битрикс",
      "инфоблоки битрикс",
      "свойства инфоблока 1с-битрикс",
    ],
    ru: {
      h1: "Настройка инфоблоков 1С-Битрикс",
      subtitle:
        "Типы, свойства, разделы, привязки к шаблону и фильтру. От 25 000 ₽.",
      problems: [
        "Каталог или новости заведены криво: свойства не те, фильтр пустой",
        "Дубли инфоблоков, редакторы не понимают куда класть контент",
        "Карточка элемента не показывает нужные поля",
      ],
      deliverables: [
        "Схема инфоблоков и свойств",
        "Привязка к компонентам шаблона",
        "Тест фильтров и карточки",
      ],
      intro: [
        "Точечная CMS-работа. Весь сайт — /integrations/nastrojka-1c-bitrix. Каталог магазина шире — комплексная страница.",
      ],
      howWeSolve: [
        { title: "Модель данных", text: "Что сущность, какие свойства, какие разделы." },
        { title: "Админка", text: "Удобный ввод, права, обязательные поля." },
        { title: "Публичка", text: "Список, деталка, фильтр." },
      ],
      faq: [
        { q: "Импорт из Excel/1С?", a: "Да, по согласованию. Обмен с 1С учёта — другой контур (/integrations/bitrix24-1c)." },
        { q: "Цена?", a: "От 25 000 ₽ за согласованный набор инфоблоков." },
      ],
    },
    en: {
      h1: "1C-Bitrix infoblock setup",
      subtitle: "Types, properties, sections, template and filter wiring.",
      problems: ["Wrong properties, empty filters", "Duplicate iblocks", "Detail page missing fields"],
      deliverables: ["Iblock and property schema", "Template component wiring", "Filter and detail test"],
      intro: ["Narrow CMS job. Whole site: /integrations/nastrojka-1c-bitrix."],
      howWeSolve: [
        { title: "Data model", text: "Entity, properties, sections." },
        { title: "Admin", text: "Input UX, roles, required fields." },
        { title: "Public", text: "List, detail, filter." },
      ],
      faq: [
        { q: "Excel/1C import?", a: "Yes if scoped. Accounting 1C sync is a different contour." },
        { q: "Price?", a: "Smaller package for an agreed iblock set." },
      ],
    },
  }),
];

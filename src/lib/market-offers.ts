/**
 * Market-facing commercial offers ordered by Yandex Webmaster demand clusters.
 * Language matches search intent (внедрение / настройка / цена / под ключ) — not internal “AI-контур”.
 */
export type MarketOffer = {
  id: string;
  href: string;
  title: string;
  description: string;
  priceLabel: string;
  /** Relative Direct budget weight hint (UI only). */
  demandRank: number;
};

/** Performer-profile stack: manage business from a phone. */
export const HIGH_DEMAND_PARTNER_OFFERS: MarketOffer[] = [
  {
    id: "bitrix24",
    href: "/bitrix",
    title: "Внедрение и настройка Битрикс24 под ключ",
    description: "Портал, воронка, роли и роботы. От 150 000 ₽ — партнёр 1С-Битрикс.",
    priceLabel: "от 150 000 ₽",
    demandRank: 1,
  },
  {
    id: "amocrm",
    href: "/amocrm",
    title: "Внедрение и настройка amoCRM под ключ",
    description:
      "Аудит продаж, воронки, карточки, роли и автоматизация. Настраиваем amoCRM под реальные процессы отдела продаж.",
    priceLabel: "от 150 000 ₽",
    demandRank: 2,
  },
  {
    id: "yougile",
    href: "/integrations/yougile",
    title: "Внедрение корпоративного мессенджера YouGile",
    description:
      "Рабочие чаты и чаты задач. Гостей зовёте по ссылке — без лицензий и без доступа к внутренней структуре.",
    priceLabel: "от 150 000 ₽",
    demandRank: 3,
  },
  {
    id: "yclients",
    href: "/integrations/yclients",
    title: "Настройка YCLIENTS: онлайн-запись",
    description: "Услуги, слоты, уведомления. Запись уходит в CRM без ручного переноса.",
    priceLabel: "от 150 000 ₽",
    demandRank: 4,
  },
  {
    id: "retailcrm",
    href: "/integrations/retailcrm",
    title: "Внедрение и настройка RetailCRM",
    description: "Заказы интернет-магазина, статусы, склад и доставка в одном контуре.",
    priceLabel: "от 300 000 ₽",
    demandRank: 5,
  },
  {
    id: "moysklad",
    href: "/solutions/erp-moysklad",
    title: "Внедрение ERP МойСклад",
    description: "Склад, остатки и отгрузки. Связка с CRM — без копипаста в Excel.",
    priceLabel: "от 150 000 ₽",
    demandRank: 6,
  },
  {
    id: "roistat",
    href: "/integrations/roistat",
    title: "Внедрение Roistat: сквозная аналитика",
    description: "Реклама, коллтрекинг и сделки в CRM. Маркетинг видит продажи, не только клики.",
    priceLabel: "от 150 000 ₽",
    demandRank: 7,
  },
  {
    id: "mango-telecom",
    href: "/integrations/mango-telecom",
    title: "Интеграция Mango Telecom с CRM",
    description: "Звонок → карточка сделки. Пропущенные не теряются, запись в CRM.",
    priceLabel: "от 150 000 ₽",
    demandRank: 8,
  },
  {
    id: "tinkoff",
    href: "/integrations/tinkoff",
    title: "Интеграция Тинькофф Банк с CRM",
    description: "Эквайринг и оплаты → статус сделки в CRM или МойСклад.",
    priceLabel: "от 150 000 ₽",
    demandRank: 9,
  },
];

/** Wordstat «настройка CRM» — exact title + 10 variants. */
export const CRM_SETUP_OFFERS: MarketOffer[] = [
  {
    id: "crm-nastrojka",
    href: "/integrations/nastrojka-crm",
    title: "Настройка CRM",
    description: "Воронка, поля, права, заявки с сайта. Битрикс24, amoCRM или другая система.",
    priceLabel: "от 150 000 ₽",
    demandRank: 1,
  },
  {
    id: "crm-nastrojka-sistemy",
    href: "/integrations/nastrojka-crm-sistemy",
    title: "Настройка CRM системы",
    description: "Карточки, стадии, справочники, роли. Готово к ежедневной работе продаж.",
    priceLabel: "от 150 000 ₽",
    demandRank: 2,
  },
  {
    id: "crm-nastrojka-pod-klyuch",
    href: "/integrations/nastrojka-crm-pod-klyuch",
    title: "Настройка CRM под ключ",
    description: "Аудит процесса, воронка, интеграции, обучение команды и приёмка.",
    priceLabel: "от 300 000 ₽",
    demandRank: 3,
  },
  {
    id: "crm-nastrojka-biznes",
    href: "/integrations/nastrojka-crm-dlya-biznesa",
    title: "Настройка CRM для бизнеса",
    description: "Продажи, сервис и заявки в одной системе. Без лишних модулей.",
    priceLabel: "от 200 000 ₽",
    demandRank: 4,
  },
  {
    id: "crm-nastrojka-sales",
    href: "/integrations/nastrojka-crm-otdel-prodazh",
    title: "Настройка CRM для отдела продаж",
    description: "Стадии, обязательные поля, задачи, контроль менеджеров.",
    priceLabel: "от 180 000 ₽",
    demandRank: 5,
  },
  {
    id: "crm-nastrojka-scratch",
    href: "/integrations/nastrojka-crm-s-nulya",
    title: "Настройка CRM с нуля",
    description: "Выбор системы, рабочий портал: воронка, поля, источники заявок.",
    priceLabel: "от 200 000 ₽",
    demandRank: 6,
  },
  {
    id: "crm-nastrojka-voronka",
    href: "/integrations/nastrojka-crm-voronka",
    title: "Настройка воронки CRM",
    description: "Стадии, причины отказа, SLA. Видно, где зависают продажи.",
    priceLabel: "от 150 000 ₽",
    demandRank: 7,
  },
  {
    id: "crm-nastrojka-smb",
    href: "/integrations/nastrojka-crm-malyj-biznes",
    title: "Настройка CRM для малого бизнеса",
    description: "Простая воронка, заявки с сайта и мессенджеров. Без тяжёлого портала.",
    priceLabel: "от 150 000 ₽",
    demandRank: 8,
  },
  {
    id: "crm-nastrojka-polya",
    href: "/integrations/nastrojka-crm-polya",
    title: "Настройка карточек и полей CRM",
    description: "Обязательные поля и справочники. Карточка заполняется за минуту.",
    priceLabel: "от 150 000 ₽",
    demandRank: 9,
  },
  {
    id: "crm-nastrojka-process",
    href: "/integrations/nastrojka-crm-pod-process",
    title: "Настройка CRM под ваш процесс",
    description: "Не шаблон вендора: стадии, роли, документы, связка с сайтом и учётом.",
    priceLabel: "от 250 000 ₽",
    demandRank: 10,
  },
  {
    id: "crm-nastrojka-kompleks",
    href: "/integrations/nastrojka-crm-kompleksnaya",
    title: "Комплексная настройка CRM",
    description: "Воронка, поля, роботы, источники заявок, базовые интеграции и обучение.",
    priceLabel: "от 300 000 ₽",
    demandRank: 11,
  },
];

export const MARKET_HOME_OFFERS: MarketOffer[] = [
  ...HIGH_DEMAND_PARTNER_OFFERS,
  {
    id: "amocrm-messengers",
    href: "/amocrm/messengers",
    title: "Интеграция amoCRM с Telegram, MAX, телефонией и сайтом",
    description:
      "Все обращения → в amoCRM. Переписка, звонки, заявки с сайта и источники лидов сохраняются в карточке клиента.",
    priceLabel: "от 150 000 ₽",
    demandRank: 9,
  },
  {
    id: "amocrm-sales",
    href: "/amocrm/sales",
    title: "Автоматизация воронки продаж в amoCRM",
    description:
      "Digital Pipeline, Salesbot, задачи, триггеры и распределение лидов. Меньше ручной работы и потерянных заявок.",
    priceLabel: "от 200 000 ₽",
    demandRank: 10,
  },
  {
    id: "ocr-1c",
    href: "/automation/ocr-data-extraction",
    title: "Распознавание первичных документов в 1С",
    description: "Счета, акты, УПД → поля в 1С без ручного ввода. Пилот на одном типе документа.",
    priceLabel: "от 300 000 ₽",
    demandRank: 11,
  },
  {
    id: "bitrix-1c",
    href: "/integrations/bitrix24-1c",
    title: "Интеграция Битрикс24 с 1С, ЗУП и УНФ",
    description: "Сделки, заказы, оплаты и номенклатура без копипаста между CRM и учётом.",
    priceLabel: "от 300 000 ₽",
    demandRank: 12,
  },
  {
    id: "ai-turnkey",
    href: "/ii-dlya-biznesa",
    title: "Внедрение ИИ в бизнес-процессы под ключ",
    description: "Аудит → пилот → production. Фиксированная смета, NDA, передача команде.",
    priceLabel: "от 300 000 ₽",
    demandRank: 13,
  },
  {
    id: "speech-analytics",
    href: "/services/voice-ai",
    title: "Речевая аналитика звонков для отдела продаж",
    description: "Транскрипты, качество разговоров, факты в CRM и контроль менеджеров.",
    priceLabel: "от 500 000 ₽",
    demandRank: 14,
  },
  {
    id: "ai-sales",
    href: "/services/ai-sales-loop",
    title: "ИИ для отдела продаж: звонки, CRM и контроль",
    description: "Анализ звонков → карточка CRM → задачи и follow-up. Не отдельный бот.",
    priceLabel: "от 500 000 ₽",
    demandRank: 15,
  },
];

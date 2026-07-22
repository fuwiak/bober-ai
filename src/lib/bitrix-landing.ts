/**
 * Контент и ключи пакетов для bitrix.bober-ai.dev.
 * Используется лендингом и YML-фидом (якоря #slug).
 */

export type BitrixPackage = {
  /** Стабильный ключ оффера (feed offer id). */
  id: string;
  /** Якорь секции на лендинге / set-id в YML. */
  slug: string;
  title: string;
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
  "Внедряем Битрикс24 и AI-автоматизацию под ключ: CRM, продажи, аналитика, интеграции с 1С/телефонией и локальный контур. Пилот от 300 000 ₽.";

/** Пакеты внедрения — эталон RU для лендинга и фида. */
export const BITRIX_PACKAGES: BitrixPackage[] = [
  {
    id: "bitrix-start",
    slug: "bitrix-start",
    title: "Битрикс24 Старт",
    description:
      "Разворачиваем и настраиваем портал: воронка, права доступа, поля сделок, интеграция с сайтом и рекламой.",
    gets: "Рабочий портал с воронкой продаж, ролями и первичными интеграциями — команда начинает вести сделки в CRM, а не в Excel.",
    priceLabel: "от 150 000 ₽",
    priceFrom: 150000,
    salesNotes: "Аудит и запуск портала от 150 000 ₽",
    picture: "/stock/office-tower.jpg",
    conversion: 91,
  },
  {
    id: "bitrix-crm-automation",
    slug: "crm-automation",
    title: "CRM и автоматизация продаж",
    description:
      "Роботы, бизнес-процессы, автозаполнение карточек, скоринг лидов и follow-up без ручной работы менеджера.",
    gets: "Карточки заполняются из звонков и писем, просроченные касания поднимаются автоматически, руководитель видит живую воронку.",
    priceLabel: "от 300 000 ₽",
    priceFrom: 300000,
    salesNotes: "Пилот автоматизации от 300 000 ₽ · 2–4 недели",
    picture: "/diagrams/crm-integration.svg",
    conversion: 94,
  },
  {
    id: "bitrix-ai-analytics",
    slug: "ai-analytics",
    title: "AI-аналитика для руководителя",
    description:
      "Чат по данным CRM, звонкам и задачам — ответы на вопросы о воронке и менеджерах вместо ручных отчётов.",
    gets: "Ответы по факту сделок и коммуникаций за минуты: где падает конверсия, кто отстаёт, какие этапы чинить первыми.",
    priceLabel: "от 300 000 ₽",
    priceFrom: 300000,
    salesNotes: "Пилот AI-аналитики от 300 000 ₽",
    picture: "/diagrams/sales-pipeline.svg",
    conversion: 93,
  },
  {
    id: "bitrix-integrations",
    slug: "integrations-1c",
    title: "Интеграция Битрикс24 с 1С, amoCRM, телефонией и мессенджерами",
    description:
      "Двусторонняя синхронизация заказов, остатков и клиентов между Битрикс24 и вашим учётным контуром.",
    gets: "Единая картина по клиенту и заказу: CRM, учёт, звонки и мессенджеры без ручного копирования и расхождений статусов.",
    priceLabel: "от 500 000 ₽",
    priceFrom: 500000,
    salesNotes: "Промышленная интеграция от 500 000 ₽",
    picture: "/diagrams/erp-sync.svg",
    conversion: 92,
  },
  {
    id: "bitrix-private-llm",
    slug: "private-llm",
    title: "Локальный AI в защищённом контуре",
    description:
      "Развёртывание в вашем облаке или on-premise — для данных, которые не должны покидать периметр компании.",
    gets: "AI-сценарии на ваших серверах или выделенном контуре: NDA, журналы доступа, без передачи данных во внешние сервисы без согласия.",
    priceLabel: "по запросу",
    priceFrom: 500000,
    salesNotes: "Цена по запросу · от 500 000 ₽",
    picture: "/stock/cyber-padlock.jpg",
    conversion: 90,
  },
];

export const BITRIX_SERVICES_SUMMARY =
  "Внедрение и настройка Битрикс24, AI-автоматизация продаж и аналитики, интеграции с 1С, МойСклад, телефонией и мессенджерами, локальный AI-контур, сопровождение после запуска.";

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

export const MARKET_HOME_OFFERS: MarketOffer[] = [
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
    id: "amocrm-messengers",
    href: "/integrations/amocrm-messengers",
    title: "Интеграция amoCRM с Telegram, MAX, телефонией и сайтом",
    description:
      "Все обращения → в amoCRM. Переписка, звонки, заявки с сайта и источники лидов сохраняются в карточке клиента.",
    priceLabel: "от 150 000 ₽",
    demandRank: 3,
  },
  {
    id: "amocrm-sales",
    href: "/automation/amocrm-sales",
    title: "Автоматизация воронки продаж в amoCRM",
    description:
      "Digital Pipeline, Salesbot, задачи, триггеры и распределение лидов. Меньше ручной работы и потерянных заявок.",
    priceLabel: "от 200 000 ₽",
    demandRank: 4,
  },
  {
    id: "ocr-1c",
    href: "/automation/ocr-data-extraction",
    title: "Распознавание первичных документов в 1С",
    description: "Счета, акты, УПД → поля в 1С без ручного ввода. Пилот на одном типе документа.",
    priceLabel: "от 300 000 ₽",
    demandRank: 5,
  },
  {
    id: "bitrix-1c",
    href: "/integrations/bitrix24-1c",
    title: "Интеграция Битрикс24 с 1С, ЗУП и УНФ",
    description: "Сделки, заказы, оплаты и номенклатура без копипаста между CRM и учётом.",
    priceLabel: "от 300 000 ₽",
    demandRank: 6,
  },
  {
    id: "ai-turnkey",
    href: "/ii-dlya-biznesa",
    title: "Внедрение ИИ в бизнес-процессы под ключ",
    description: "Аудит → пилот → production. Фиксированная смета, NDA, передача команде.",
    priceLabel: "от 300 000 ₽",
    demandRank: 7,
  },
  {
    id: "speech-analytics",
    href: "/services/voice-ai",
    title: "Речевая аналитика звонков для отдела продаж",
    description: "Транскрипты, качество разговоров, факты в CRM и контроль менеджеров.",
    priceLabel: "от 500 000 ₽",
    demandRank: 8,
  },
  {
    id: "ai-sales",
    href: "/services/ai-sales-loop",
    title: "ИИ для отдела продаж: звонки, CRM и контроль",
    description: "Анализ звонков → карточка CRM → задачи и follow-up. Не отдельный бот.",
    priceLabel: "от 500 000 ₽",
    demandRank: 9,
  },
];

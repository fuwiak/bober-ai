import { CONTACT_EMAIL, KWORK_URL, SITE_NAME, TELEGRAM_URL } from "@/lib/site";
import { PROFILE } from "@/lib/profile";

export type ServiceFeedOffer = {
  id: string;
  slug: string;
  executorName: string;
  title: string;
  description: string;
  about: string;
  price: number;
  salesNotes: string;
  deliveryDays: number;
  yearsExperience: number;
  conversion: number;
  picture: string;
  serviceImage: string;
  remote: boolean;
  atExecutorAddress: boolean;
  atCustomerAddress: boolean;
  kworkUrl?: string;
};

const FEED_SITE_URL = "https://www.bober-ai.dev";
const CONSULTATION_HOURLY_RATE = PROFILE.hourlyRate;
const CONSULTATION_SALES_NOTES = `от ${CONSULTATION_HOURLY_RATE.toLocaleString("ru-RU")} ₽/час`;

export const serviceFeedOffers: ServiceFeedOffer[] = [
  {
    id: "kwork-ai-assistant",
    slug: "ai-bot-llm-rasa-n8n",
    executorName: "Павел Стасиньский",
    title: "AI-бот — виртуальный ассистент на базе LLM, Rasa, n8n и ElisaOS",
    description:
      "Виртуальный ассистент для бизнеса: диалоги, сценарии, интеграции и автоматизация на стеке LLM + Rasa + n8n.",
    about:
      "Проектируем архитектуру бота, подключаем LLM и Rasa, настраиваем n8n-воркфлоу и передаём готовое решение с документацией.",
    price: 40000,
    salesNotes: "40 000 ₽",
    deliveryDays: 14,
    yearsExperience: 10,
    conversion: 92,
    picture: `${FEED_SITE_URL}/yandex/mess_icons.png`,
    serviceImage: "/yandex/mess_icons.png",
    remote: true,
    atExecutorAddress: false,
    atCustomerAddress: true,
    kworkUrl: KWORK_URL,
  },
  {
    id: "kwork-llm-consult",
    slug: "llm-ai-consultation",
    executorName: "Павел Стасиньский",
    title: "Консультации по LLM и AI",
    description:
      "Разбор вашей задачи: выбор модели, архитектура, интеграции, оценка сроков и бюджета внедрения ИИ.",
    about:
      "Онлайн-сессия с экспертом: аудит идеи, рекомендации по стеку (OpenAI, Claude, GigaChat, YandexGPT) и план следующих шагов.",
    price: CONSULTATION_HOURLY_RATE,
    salesNotes: CONSULTATION_SALES_NOTES,
    deliveryDays: 1,
    yearsExperience: 10,
    conversion: 95,
    picture: `${FEED_SITE_URL}/yandex/yandex_ai_studio.png`,
    serviceImage: "/yandex/yandex_ai_studio.png",
    remote: true,
    atExecutorAddress: false,
    atCustomerAddress: true,
    kworkUrl: KWORK_URL,
  },
  {
    id: "kwork-gigachat-bot",
    slug: "ai-bot-gigachat-n8n-local",
    executorName: "Павел Стасиньский",
    title: "Создание AI-бота: GigaChat, LLM, n8n API — локально",
    description:
      "AI-бот на GigaChat и локальных LLM с n8n API: приватный контур, без утечки данных во внешние сервисы.",
    about:
      "Разворачиваем бота в вашем или изолированном контуре, подключаем GigaChat/локальные модели, настраиваем API и интеграции.",
    price: 40000,
    salesNotes: "40 000 ₽",
    deliveryDays: 14,
    yearsExperience: 10,
    conversion: 90,
    picture: `${FEED_SITE_URL}/yandex/ai-lawyer.png`,
    serviceImage: "/yandex/ai-lawyer.png",
    remote: true,
    atExecutorAddress: false,
    atCustomerAddress: true,
    kworkUrl: KWORK_URL,
  },
  {
    id: "kwork-ml-consult",
    slug: "ml-data-consultation",
    executorName: "Павел Стасиньский",
    title: "Консультация по анализу данных и машинному обучению",
    description:
      "Экспресс-разбор задачи ML/AI: данные, модели, метрики, пайплайн. От 10 минут, почасовая оплата.",
    about:
      "Помогаем сформулировать задачу, выбрать подход и оценить реализуемость: от быстрой консультации до полноценного аудита.",
    price: CONSULTATION_HOURLY_RATE,
    salesNotes: CONSULTATION_SALES_NOTES,
    deliveryDays: 1,
    yearsExperience: 10,
    conversion: 88,
    picture: `${FEED_SITE_URL}/yandex/rod2.png`,
    serviceImage: "/yandex/rod2.png",
    remote: true,
    atExecutorAddress: false,
    atCustomerAddress: true,
    kworkUrl: KWORK_URL,
  },
  {
    id: "kwork-telegram-discord-bot",
    slug: "telegram-discord-miniapp-bot",
    executorName: "Павел Стасиньский",
    title: "Разработка бота Telegram, Discord, Mini App на OpenAI",
    description:
      "ИИ-бот для Telegram, Discord или Mini App: диалоги, команды, интеграция с OpenAI и вашими сервисами.",
    about:
      "Проектируем UX бота, подключаем OpenAI/другие LLM, деплоим и передаём исходники с инструкцией по поддержке.",
    price: 40000,
    salesNotes: "40 000 ₽",
    deliveryDays: 14,
    yearsExperience: 10,
    conversion: 91,
    picture: `${FEED_SITE_URL}/yandex/max1.png`,
    serviceImage: "/yandex/max1.png",
    remote: true,
    atExecutorAddress: false,
    atCustomerAddress: true,
    kworkUrl: KWORK_URL,
  },
  {
    id: "kwork-claude-automation",
    slug: "claude-business-automation",
    executorName: "Павел Стасиньский",
    title: "Автоматизация бизнеса с помощью Claude",
    description:
      "Внедрение Claude в процессы: отчёты, документы, CRM, уведомления и цепочки задач без ручной рутины.",
    about:
      "Аудит процессов, настройка промптов и агентов на Claude, интеграция с вашими инструментами и обучение команды.",
    price: 5000,
    salesNotes: "от 5 000 ₽/час",
    deliveryDays: 7,
    yearsExperience: 10,
    conversion: 93,
    picture: `${FEED_SITE_URL}/openclaw-icon.png`,
    serviceImage: "/openclaw-icon.png",
    remote: true,
    atExecutorAddress: false,
    atCustomerAddress: true,
    kworkUrl: KWORK_URL,
  },
  {
    id: "kwork-kp-agent",
    slug: "ai-kp-agent",
    executorName: "Павел Стасиньский",
    title: "AI-агент для создания коммерческих предложений",
    description:
      "Агент собирает КП из CRM и шаблонов: номенклатура, цены, сроки — готовый PDF или документ за минуты.",
    about:
      "Настраиваем агента под ваши шаблоны и данные, подключаем CRM/таблицы, тестируем и запускаем в работу отдела продаж.",
    price: 40000,
    salesNotes: "40 000 ₽",
    deliveryDays: 10,
    yearsExperience: 10,
    conversion: 94,
    picture: `${FEED_SITE_URL}/yandex/ai-lawyer.png`,
    serviceImage: "/yandex/ai-lawyer.png",
    remote: true,
    atExecutorAddress: false,
    atCustomerAddress: true,
    kworkUrl: KWORK_URL,
  },
];

export function getServiceOfferUrl(slug: string) {
  return `${FEED_SITE_URL}/services/${slug}`;
}

export function getOrderTelegramUrl(serviceTitle: string) {
  const text = `Здравствуйте! Хочу заказать: ${serviceTitle}`;
  return `${TELEGRAM_URL}?text=${encodeURIComponent(text)}`;
}

export function formatPrice(price: number) {
  return `от ${price.toLocaleString("ru-RU")} ₽`;
}

export function formatOfferPrice(offer: ServiceFeedOffer) {
  return offer.salesNotes;
}

export function getServiceFeedXml(now = new Date()) {
  const date = now.toISOString().slice(0, 16).replace("T", " ");
  const escapeXml = (value: string) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&apos;");

  const offers = serviceFeedOffers
    .map((offer) => {
      const url = getServiceOfferUrl(offer.slug);
      return `    <offer id="${escapeXml(offer.id)}">
      <name>${escapeXml(offer.executorName)}</name>
      <url>${escapeXml(url)}</url>
      <price from="true">${offer.price}</price>
      <currencyId>RUR</currencyId>
      <picture>${escapeXml(offer.picture)}</picture>
      <description>${escapeXml(offer.title)}</description>
      <param name="план">базовый</param>
      <param name="продолжительность">${offer.deliveryDays} дней</param>
      <param name="Годы опыта">${offer.yearsExperience}</param>
      <param name="Регион">Россия</param>
      <param name="Конверсия">${offer.conversion}</param>
      <param name="Ссылка на чат">${escapeXml(TELEGRAM_URL)}</param>
      <param name="Ссылка на создание заказа">${escapeXml(`${FEED_SITE_URL}/#contact`)}</param>
      <param name="Ссылка на профиль исполнителя">${escapeXml(KWORK_URL)}</param>
      <param name="Исполнитель проверен">true</param>
      <param name="Организация">true</param>
      <param name="Выполняется удаленно">${offer.remote ? "true" : "false"}</param>
      <param name="Выполняется по адресу исполнителя">${offer.atExecutorAddress ? "true" : "false"}</param>
      <param name="Выполняется по адресу заказчика">${offer.atCustomerAddress ? "true" : "false"}</param>
      <param name="Об исполнителе">${escapeXml(offer.about)}</param>
      <param name="Другая услуга исполнителя - 1">${escapeXml(offer.description)}</param>
      <param name="Сайт работодателя">${escapeXml(FEED_SITE_URL)}</param>
      <sales_notes>${escapeXml(offer.salesNotes)}</sales_notes>
    </offer>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${date}">
  <shop>
    <name>${escapeXml(SITE_NAME)}</name>
    <company>${escapeXml(SITE_NAME)}</company>
    <url>${escapeXml(FEED_SITE_URL)}</url>
    <email>${escapeXml(CONTACT_EMAIL)}</email>
    <picture>${escapeXml(`${FEED_SITE_URL}/favicon.png`)}</picture>
    <description>${escapeXml("ИИ-агенты, автоматизация, чат-боты и разработка под ключ.")}</description>
    <currencies>
      <currency id="RUR" rate="1"/>
    </currencies>
    <offers>
${offers}
    </offers>
  </shop>
</yml_catalog>`;
}

import { CONTACT_EMAIL, SITE_NAME, SITE_URL, TELEGRAM_URL, absoluteUrl } from "@/lib/site";

export type ServiceFeedOffer = {
  id: string;
  slug: string;
  executorName: string;
  title: string;
  description: string;
  about: string;
  price: number;
  salesNotes: string;
  yearsExperience: number;
  rating: number;
  reviews: number;
  conversion: number;
  picture: string;
  serviceImage: string;
  remote: boolean;
  atExecutorAddress: boolean;
  atCustomerAddress: boolean;
};

export const SERVICE_SET_ID = "kinetic-services";
const FEED_SITE_URL = "https://www.kinetic-ai.ru";

export const serviceFeedOffers: ServiceFeedOffer[] = [
  {
    id: "svc-ai-architect",
    slug: "ai-architect",
    executorName: "AI-архитектор Kinetic AI",
    title: "Корпоративный ИИ, чат-боты и приватные LLM для бизнеса",
    description:
      "Проектируем и внедряем корпоративный ИИ: чат-боты, приватные LLM, базы знаний, внутренние ассистенты и автоматизацию бизнес-процессов.",
    about:
      "Команда внедряет корпоративные AI-сценарии под KPI бизнеса: RAG, ассистенты, AI-поиск, автоматизация поддержки и продаж.",
    price: 50000,
    salesNotes: "от 50 000 ₽ за AI-сценарий",
    yearsExperience: 6,
    rating: 4.9,
    reviews: 12,
    conversion: 95,
    picture: absoluteUrl("/yandex/ai-lawyer.png"),
    serviceImage: absoluteUrl("/yandex/ai-lawyer.png"),
    remote: true,
    atExecutorAddress: false,
    atCustomerAddress: true,
  },
  {
    id: "svc-cloud-engineer",
    slug: "cloud-engineer",
    executorName: "Cloud-инженер Kinetic AI",
    title: "Облачная инфраструктура в Yandex Cloud и Selectel",
    description:
      "Настройка, миграция и сопровождение инфраструктуры в Yandex Cloud и Selectel: production-контуры, мониторинг, Kubernetes, резервирование и безопасность.",
    about:
      "Специализируемся на облачной архитектуре, миграции критичных систем, эксплуатации и предсказуемой стоимости владения инфраструктурой.",
    price: 50000,
    salesNotes: "от 50 000 ₽ за проект",
    yearsExperience: 8,
    rating: 4.8,
    reviews: 9,
    conversion: 90,
    picture: absoluteUrl("/yandex/mac-mini.png"),
    serviceImage: absoluteUrl("/yandex/mac-mini.png"),
    remote: true,
    atExecutorAddress: false,
    atCustomerAddress: true,
  },
  {
    id: "svc-voice-ai",
    slug: "voice-ai-engineer",
    executorName: "Voice AI инженер Kinetic AI",
    title: "Голосовые агенты, контакт-центр и realtime AI",
    description:
      "Делаем голосовых AI-агентов, автоматизируем контакт-центр, внедряем подсказки оператору во время звонка и саммари в CRM.",
    about:
      "Фокус на voice AI, speech-to-text, realtime сценариях, аналитике звонков и интеграции с CRM, базами знаний и сервисами компании.",
    price: 80000,
    salesNotes: "от 80 000 ₽ за внедрение",
    yearsExperience: 5,
    rating: 4.9,
    reviews: 7,
    conversion: 88,
    picture: absoluteUrl("/yandex/yandex_ai_studio.png"),
    serviceImage: absoluteUrl("/yandex/yandex_ai_studio.png"),
    remote: true,
    atExecutorAddress: false,
    atCustomerAddress: true,
  },
];

export function getServiceSetUrl() {
  return `${FEED_SITE_URL}/services`;
}

export function getServiceOfferUrl(slug: string) {
  return `${FEED_SITE_URL}/services/${slug}`;
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
      <set-ids>${SERVICE_SET_ID}</set-ids>
      <picture>${escapeXml(offer.picture)}</picture>
      <description>${escapeXml(offer.title)}</description>
      <param name="план">базовый</param>
      <param name="продолжительность">30 дней</param>
      <param name="Рейтинг">${offer.rating}</param>
      <param name="Число отзывов">${offer.reviews}</param>
      <param name="Годы опыта">${offer.yearsExperience}</param>
      <param name="Регион">Россия</param>
      <param name="Конверсия">${offer.conversion}</param>
      <param name="Ссылка на чат">${escapeXml(TELEGRAM_URL)}</param>
      <param name="Ссылка на создание заказа">${escapeXml(`${FEED_SITE_URL}/#contact`)}</param>
      <param name="Ссылка на профиль исполнителя">${escapeXml(url)}</param>
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
    <description>${escapeXml("AI-инфраструктура, корпоративный ИИ, voice AI и облачные решения для бизнеса.")}</description>
    <currencies>
      <currency id="RUR" rate="1"/>
    </currencies>
    <sets>
      <set id="${SERVICE_SET_ID}">
        <name>AI-услуги Kinetic AI</name>
        <url>${escapeXml(getServiceSetUrl())}</url>
      </set>
    </sets>
    <offers>
${offers}
    </offers>
  </shop>
</yml_catalog>`;
}

import { CONTACT_EMAIL, CONTACT_PHONE, SITE_NAME, TELEGRAM_URL } from "@/lib/site";
import { PROFILE } from "@/lib/profile";
import { getEnterpriseServices } from "@/lib/enterprise-services";

const FEED_CATEGORY_ID = "18";
const FEED_CATEGORY_PARENT_ID = "1";
const FEED_SITE_URL = "https://www.bober-ai.dev";

const FEED_CONVERSION: Record<string, number> = {
  "enterprise-ai-assistant": 92,
  "ai-discovery-roadmap": 95,
  "private-llm-gigachat": 90,
  "business-process-automation": 93,
  "sales-ai-agent": 94,
};

export function getServiceOfferUrl(slug: string) {
  return `${FEED_SITE_URL}/services/${slug}`;
}

export function getOrderTelegramUrl(serviceTitle: string) {
  const text = `Здравствуйте! Хочу обсудить проект: ${serviceTitle}`;
  return `${TELEGRAM_URL}?text=${encodeURIComponent(text)}`;
}

export function getServiceFeedXml(now = new Date()) {
  const offers = getEnterpriseServices("ru");
  const date = now.toISOString().slice(0, 16).replace("T", " ");

  const escapeXml = (value: string) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&apos;");

  const sets = offers
    .map((offer) => {
      const url = getServiceOfferUrl(offer.slug);
      return `      <set id="${escapeXml(offer.slug)}">
        <name>${escapeXml(offer.title)}</name>
        <url>${escapeXml(url)}</url>
      </set>`;
    })
    .join("\n");

  const offerBlocks = offers
    .map((offer) => {
      const url = getServiceOfferUrl(offer.slug);
      const picture = `${FEED_SITE_URL}${offer.serviceImage}`;
      const conversion = FEED_CONVERSION[offer.slug] ?? 90;

      return `    <offer id="${escapeXml(offer.id)}">
      <name>${escapeXml(PROFILE.name)}</name>
      <url>${escapeXml(url)}</url>
      <price from="true">${offer.price}</price>
      <currencyId>RUR</currencyId>
      <categoryId>${FEED_CATEGORY_ID}</categoryId>
      <set-ids>${escapeXml(offer.slug)}</set-ids>
      <picture>${escapeXml(picture)}</picture>
      <description>${escapeXml(offer.title)}</description>
      <param name="Рейтинг">${PROFILE.rating}</param>
      <param name="Число отзывов">${PROFILE.reviewsCount}</param>
      <param name="Годы опыта">${PROFILE.experienceYears}</param>
      <param name="Регион">Россия</param>
      <param name="Конверсия">${conversion}</param>
      <param name="Ссылка на телефон">${escapeXml(`tel:${CONTACT_PHONE}`)}</param>
      <param name="Ссылка на чат">${escapeXml(TELEGRAM_URL)}</param>
      <param name="Ссылка на создание заказа">${escapeXml(`${FEED_SITE_URL}/#contact`)}</param>
      <param name="Ссылка на профиль исполнителя">${escapeXml(FEED_SITE_URL)}</param>
      <param name="Исполнитель проверен">true</param>
      <param name="Организация">true</param>
      <param name="Выполняется удаленно">true</param>
      <param name="Выполняется по адресу исполнителя">false</param>
      <param name="Выполняется по адресу заказчика">true</param>
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
    <description>${escapeXml("Внедрение AI в бизнес под ключ: RAG, AI-агенты, интеграции CRM/ERP, MLOps. Москва и онлайн.")}</description>
    <currencies>
      <currency id="RUR" rate="1"/>
    </currencies>
    <categories>
      <category id="${FEED_CATEGORY_PARENT_ID}">Исполнитель</category>
      <category id="${FEED_CATEGORY_ID}" parentId="${FEED_CATEGORY_PARENT_ID}">Компьютеры и IT</category>
    </categories>
    <sets>
${sets}
    </sets>
    <offers>
${offerBlocks}
    </offers>
  </shop>
</yml_catalog>`;
}

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_REGION, SITE_URL, TELEGRAM_URL } from "@/lib/site";
import { PROFILE } from "@/lib/profile";
import { getEnterpriseServices } from "@/lib/enterprise-services";

const FEED_CATEGORY_ID = "18";
const FEED_CATEGORY_PARENT_ID = "1";
const FEED_SITE_URL = SITE_URL.replace(/\/$/, "");
const CONTACT_PHONE_URL = `${FEED_SITE_URL}/tel`;
/** Must match visible rating on /services/* (Yandex compares YML ↔ page). Always one decimal like sample YML. */
const FEED_RATING = PROFILE.rating.toFixed(1);
const FEED_REVIEWS_COUNT = String(PROFILE.reviewsCount);

const FEED_CONVERSION: Record<string, number> = {
  "enterprise-ai-assistant": 92,
  "ai-discovery-roadmap": 95,
  "private-llm-gigachat": 90,
  "business-process-automation": 93,
  "sales-ai-agent": 94,
  "ai-automation": 92,
  rag: 91,
  "llm-development": 90,
  n8n: 91,
  "ai-agent": 93,
  "document-processing": 92,
  "voice-ai": 90,
  ocr: 91,
  "open-webui": 89,
  "self-hosted-ai": 90,
  mcp: 90,
  langgraph: 91,
  "knowledge-base": 92,
  "ai-consulting": 94,
  "crm-integration": 93,
};

/** Old slugs kept only for next.config redirects — never emit as feed offer URLs (308/404 fail moderation). */
export const LEGACY_FEED_SLUGS: Record<string, string> = {
  "ai-bot-llm-rasa-n8n": "enterprise-ai-assistant",
  "llm-ai-consultation": "ai-discovery-roadmap",
  "ai-bot-gigachat-n8n-local": "private-llm-gigachat",
  "ml-data-consultation": "ai-discovery-roadmap",
  "telegram-discord-miniapp-bot": "enterprise-ai-assistant",
  "claude-business-automation": "business-process-automation",
  "ai-kp-agent": "sales-ai-agent",
};

/** Yandex forbids repeating <picture> hrefs; use dedicated files (no query string — crawler often fails on ?). */
export function feedPicturePath(offerId: string, serviceImage: string) {
  const ext = serviceImage.includes(".") ? serviceImage.split(".").pop()!.toLowerCase() : "jpg";
  return `/stock/offers/${offerId}.${ext}`;
}

export function getServiceOfferUrl(slug: string) {
  return `${FEED_SITE_URL}/services/${slug}`;
}

export function getOrderTelegramUrl(serviceTitle: string) {
  const text = `Здравствуйте! Хочу обсудить проект: ${serviceTitle}`;
  return `${TELEGRAM_URL}?text=${encodeURIComponent(text)}`;
}

/** Copy each offer image to a unique public path for the YML <picture> tags. */
export function materializeFeedPictures(rootDir = process.cwd()) {
  const offers = getEnterpriseServices("ru");
  for (const offer of offers) {
    const rel = feedPicturePath(offer.id, offer.serviceImage);
    const dest = join(rootDir, "public", rel.replace(/^\//, ""));
    const src = join(rootDir, "public", offer.serviceImage.replace(/^\//, ""));
    mkdirSync(dirname(dest), { recursive: true });
    if (!existsSync(src)) {
      throw new Error(`Feed picture source missing: ${src}`);
    }
    copyFileSync(src, dest);
  }
  return offers.length;
}

export function getServiceFeedXml(now = new Date()) {
  // Only live canonical offers — no legacy redirect/404 slugs.
  const offers = getEnterpriseServices("ru");
  const date = now.toISOString().slice(0, 16).replace("T", " ");

  const escapeXml = (value: string) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&apos;");

  const urlParam = (name: string, value: string) =>
    `<param name="${escapeXml(name)}">${escapeXml(value)}</param>`;

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
      const picture = `${FEED_SITE_URL}${feedPicturePath(offer.id, offer.serviceImage)}`;
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
      <!--Обязательные params: Рейтинг, Число отзывов, Годы опыта, Регион, Конверсия-->
      <param name="Рейтинг">${FEED_RATING}</param>
      <param name="Число отзывов">${FEED_REVIEWS_COUNT}</param>
      <param name="Годы опыта">${PROFILE.experienceYears}</param>
      <param name="Регион">${SITE_REGION}</param>
      <param name="Конверсия">${conversion}</param>
      ${urlParam("Ссылка на телефон", CONTACT_PHONE_URL)}
      ${urlParam("Ссылка на чат", TELEGRAM_URL)}
      ${urlParam("Ссылка на создание заказа", `${FEED_SITE_URL}/#contact`)}
      ${urlParam("Ссылка на профиль исполнителя", FEED_SITE_URL)}
      <param name="Исполнитель проверен">true</param>
      <param name="Организация">true</param>
      <param name="Выполняется удаленно">true</param>
      <param name="Выполняется по адресу исполнителя">false</param>
      <param name="Выполняется по адресу заказчика">true</param>
      <param name="Об исполнителе">${escapeXml(offer.about)}</param>
      <param name="Другая услуга исполнителя - 1">${escapeXml(offer.description)}</param>
      ${urlParam("Сайт работодателя", FEED_SITE_URL)}
      <sales_notes>${escapeXml(offer.salesNotes)}</sales_notes>
    </offer>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<yml_catalog date="${date}">
  <shop>
    <name>${escapeXml(SITE_NAME)}</name>
    <company>${escapeXml(SITE_NAME)}</company>
    <url>${escapeXml(FEED_SITE_URL)}</url>
    <email>${escapeXml(CONTACT_EMAIL)}</email>
    <picture>${escapeXml(`${FEED_SITE_URL}/favicon-120x120.png`)}</picture>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
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

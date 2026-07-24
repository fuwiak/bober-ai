import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { CONTACT_EMAIL, SITE_NAME, SITE_REGION, SITE_URL, TELEGRAM_URL } from "@/lib/site";
import { PROFILE } from "@/lib/profile";
import { getEnterpriseServices } from "@/lib/enterprise-services";
import { FEED_RATING, FEED_REVIEWS_COUNT } from "@/lib/feed-rating";

export { FEED_RATING, FEED_REVIEWS_COUNT } from "@/lib/feed-rating";

const FEED_CATEGORY_ID = "18";
const FEED_CATEGORY_PARENT_ID = "1";
const FEED_SITE_URL = SITE_URL.replace(/\/$/, "");
const CONTACT_PHONE_URL = `${FEED_SITE_URL}/tel`;
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

/** Always JPEG 320×320 under /stock/offers — unique href, small for Yandex crawler. */
export function feedPicturePath(offerId: string) {
  return `/stock/offers/${offerId}.jpg`;
}

export function getServiceOfferUrl(slug: string) {
  return `${FEED_SITE_URL}/services/${slug}`;
}

export function getOrderTelegramUrl(serviceTitle: string) {
  const text = `Здравствуйте! Хочу обсудить проект: ${serviceTitle}`;
  return `${TELEGRAM_URL}?text=${encodeURIComponent(text)}`;
}

/** Resize each offer image to unique 320×320 JPEG for YML <picture>. */
export function materializeFeedPictures(rootDir = process.cwd()) {
  const offers = getEnterpriseServices("ru");
  const mapping: Record<string, string> = {};
  for (const offer of offers) {
    mapping[offer.id] = offer.serviceImage;
  }
  const script = join(rootDir, "scripts", "materialize-feed-pictures.py");
  const result = spawnSync("python3", [script, rootDir, JSON.stringify(mapping)], {
    cwd: rootDir,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || "materialize-feed-pictures failed");
  }
  if (result.stdout) process.stdout.write(result.stdout);
  return offers.length;
}

/** Microsite offer pictures (ms-*.jpg), same 320×320 pipeline. */
export function materializeMicrositePictures(
  rootDir: string,
  items: Array<{ id: string; picture: string }>,
) {
  const mapping: Record<string, string> = {};
  for (const item of items) {
    mapping[`ms-${item.id}`] = item.picture;
  }
  const script = join(rootDir, "scripts", "materialize-feed-pictures.py");
  const result = spawnSync("python3", [script, rootDir, JSON.stringify(mapping)], {
    cwd: rootDir,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || "materialize microsite pictures failed");
  }
  if (result.stdout) process.stdout.write(result.stdout);
  return items.length;
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

  const sets = offers
    .map((offer) => {
      const url = getServiceOfferUrl(offer.slug);
      return `      <set id="${escapeXml(offer.slug)}">
        <name>${escapeXml(offer.title)}</name>
        <url>${escapeXml(url)}</url>
      </set>`;
    })
    .join("\n");

  // Minimal sample-compatible offer: required params first, then optional phone/chat.
  const offerBlocks = offers
    .map((offer) => {
      const url = getServiceOfferUrl(offer.slug);
      const picture = `${FEED_SITE_URL}${feedPicturePath(offer.id)}`;
      const conversion = FEED_CONVERSION[offer.slug] ?? 90;

      return `    <offer id="${escapeXml(offer.id)}">
      <name>${escapeXml(PROFILE.name)}</name>
      <url>${escapeXml(url)}</url>
      <price from="true">${offer.price}</price>
      <currencyId>RUR</currencyId>
      <sales_notes>${escapeXml(offer.salesNotes)}</sales_notes>
      <categoryId>${FEED_CATEGORY_ID}</categoryId>
      <set-ids>${escapeXml(offer.slug)}</set-ids>
      <picture>${escapeXml(picture)}</picture>
      <description>${escapeXml(offer.title)}</description>
      <adult>false</adult>
      <expiry>P5Y</expiry>
      <param name="Рейтинг">${FEED_RATING}</param>
      <param name="Число отзывов">${FEED_REVIEWS_COUNT}</param>
      <param name="Годы опыта">${PROFILE.experienceYears}</param>
      <param name="Регион">${SITE_REGION}</param>
      <param name="Конверсия">${conversion}</param>
      <param name="Ссылка на телефон">${escapeXml(CONTACT_PHONE_URL)}</param>
      <param name="Ссылка на чат">${escapeXml(TELEGRAM_URL)}</param>
      <param name="Ссылка на создание заказа">${escapeXml(url)}</param>
      <param name="Ссылка на профиль исполнителя">${escapeXml(FEED_SITE_URL)}</param>
      <param name="Выполняется удаленно">true</param>
      <param name="Об исполнителе">${escapeXml(offer.about)}</param>
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

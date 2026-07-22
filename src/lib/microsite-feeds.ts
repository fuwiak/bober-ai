import {
  BITRIX_SITE_URL,
  CONTACT_EMAIL,
  PARTNERS_SITE_URL,
  SITE_NAME,
  SITE_REGION,
  SITE_URL,
  TELEGRAM_URL,
} from "@/lib/site";
import { PROFILE, REVIEWS } from "@/lib/profile";

const FEED_CATEGORY_ID = "18";
const FEED_CATEGORY_PARENT_ID = "1";
const FEED_RATING = Number.isInteger(PROFILE.rating) ? String(PROFILE.rating) : PROFILE.rating.toFixed(1);
const FEED_REVIEWS_COUNT = String(PROFILE.reviewsCount);
const FEED_REVIEW_SNIPPETS = REVIEWS.slice(0, 5);
/** Phone landing lives on the main host; microsites rewrite unknown paths to HTML. */
const CONTACT_PHONE_URL = `${SITE_URL.replace(/\/$/, "")}/tel`;

type MicrositeOffer = {
  id: string;
  slug: string;
  title: string;
  description: string;
  about: string;
  salesNotes: string;
  price: number;
  picture: string;
  conversion: number;
};

type MicrositeFeedConfig = {
  siteUrl: string;
  shopName: string;
  shopDescription: string;
  orderPath: string;
  offers: MicrositeOffer[];
};

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function buildYmlCatalog(config: MicrositeFeedConfig, now = new Date()) {
  const feedSiteUrl = config.siteUrl.replace(/\/$/, "");
  const orderUrl = `${feedSiteUrl}${config.orderPath}`;
  const date = now.toISOString().slice(0, 16).replace("T", " ");

  const urlParam = (name: string, value: string) =>
    `<param name="${escapeXml(name)}" unit="URL">${escapeXml(value)}</param>`;

  const sets = config.offers
    .map(
      (offer) => `      <set id="${escapeXml(offer.slug)}">
        <name>${escapeXml(offer.title)}</name>
        <url>${escapeXml(`${feedSiteUrl}/#${offer.slug}`)}</url>
      </set>`,
    )
    .join("\n");

  const offerBlocks = config.offers
    .map((offer) => {
      const url = `${feedSiteUrl}/#${offer.slug}`;
      // Pictures are served from the shared static tree (www + microsite hosts).
      const picture = offer.picture.startsWith("http")
        ? offer.picture
        : `${SITE_URL.replace(/\/$/, "")}${offer.picture}`;

      return `    <offer id="${escapeXml(offer.id)}">
      <name>${escapeXml(PROFILE.name)}</name>
      <url>${escapeXml(url)}</url>
      <price from="true">${offer.price}</price>
      <currencyId>RUR</currencyId>
      <categoryId>${FEED_CATEGORY_ID}</categoryId>
      <set-ids>${escapeXml(offer.slug)}</set-ids>
      <picture>${escapeXml(picture)}</picture>
      <description>${escapeXml(offer.title)}</description>
      <param name="Рейтинг">${FEED_RATING}</param>
      <param name="Число отзывов">${FEED_REVIEWS_COUNT}</param>
      <param name="Годы опыта">${PROFILE.experienceYears}</param>
      <param name="Регион">${SITE_REGION}</param>
      <param name="Конверсия">${offer.conversion}</param>
      ${urlParam("Ссылка на телефон", CONTACT_PHONE_URL)}
      ${urlParam("Ссылка на чат", TELEGRAM_URL)}
      ${urlParam("Ссылка на создание заказа", orderUrl)}
      ${urlParam("Ссылка на профиль исполнителя", feedSiteUrl)}
      <param name="Исполнитель проверен">true</param>
      <param name="Организация">true</param>
      <param name="Выполняется удаленно">true</param>
      <param name="Выполняется по адресу исполнителя">false</param>
      <param name="Выполняется по адресу заказчика">true</param>
      <param name="Об исполнителе">${escapeXml(offer.about)}</param>
      ${FEED_REVIEW_SNIPPETS.map(
        (review, index) =>
          `<param name="Отзыв на исполнителя - ${index + 1}" unit="5">${escapeXml(`${review.author}: ${review.text}`)}</param>`,
      ).join("\n      ")}
      <param name="Другая услуга исполнителя - 1">${escapeXml(offer.description)}</param>
      ${urlParam("Сайт работодателя", feedSiteUrl)}
      <sales_notes>${escapeXml(offer.salesNotes)}</sales_notes>
    </offer>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${date}">
  <shop>
    <name>${escapeXml(config.shopName)}</name>
    <company>${escapeXml(SITE_NAME)}</company>
    <url>${escapeXml(feedSiteUrl)}</url>
    <email>${escapeXml(CONTACT_EMAIL)}</email>
    <picture>${escapeXml(`${feedSiteUrl}/favicon-120x120.png`)}</picture>
    <description>${escapeXml(config.shopDescription)}</description>
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

const BITRIX_ABOUT =
  "Внедряем AI-автоматизацию в Битрикс24 и amoCRM: анализ сделок и звонков, автозаполнение CRM, КП из 1С/МойСклад, локальный контур. Пилот от 300 000 ₽.";

const PARTNERS_ABOUT =
  "White-label AI-разработка для агентств и software house: архитектура, backend, LLM и deployment под вашим брендом. Клиент и маржа остаются у партнёра.";

const BITRIX_OFFERS: MicrositeOffer[] = [
  {
    id: "bitrix-start",
    slug: "bitrix-start",
    title: "Битрикс24 Старт",
    description: "Разворачиваем и настраиваем портал: воронка, права, поля сделок, интеграция с сайтом и рекламой.",
    about: BITRIX_ABOUT,
    salesNotes: "Аудит и запуск портала от 150 000 ₽",
    price: 150000,
    picture: "/stock/office-tower.jpg",
    conversion: 91,
  },
  {
    id: "bitrix-crm-automation",
    slug: "crm-automation",
    title: "CRM и автоматизация продаж",
    description: "Роботы, бизнес-процессы, автозаполнение карточек, скоринг лидов и follow-up без ручной работы менеджера.",
    about: BITRIX_ABOUT,
    salesNotes: "Пилот автоматизации от 300 000 ₽ · 2–4 недели",
    price: 300000,
    picture: "/diagrams/crm-integration.svg",
    conversion: 94,
  },
  {
    id: "bitrix-ai-analytics",
    slug: "ai-analytics",
    title: "AI-аналитика для руководителя",
    description: "Чат по данным CRM, звонкам и задачам — ответы о воронке и менеджерах вместо ручных отчётов.",
    about: BITRIX_ABOUT,
    salesNotes: "Пилот AI-аналитики от 300 000 ₽",
    price: 300000,
    picture: "/diagrams/sales-pipeline.svg",
    conversion: 93,
  },
  {
    id: "bitrix-integrations",
    slug: "integrations-1c",
    title: "Интеграция с 1С, amoCRM, телефонией и мессенджерами",
    description: "Двусторонняя синхронизация заказов, остатков и клиентов между Битрикс24 и учётным контуром.",
    about: BITRIX_ABOUT,
    salesNotes: "Промышленная интеграция от 500 000 ₽",
    price: 500000,
    picture: "/diagrams/erp-sync.svg",
    conversion: 92,
  },
  {
    id: "bitrix-private-llm",
    slug: "private-llm",
    title: "Локальный AI в защищённом контуре",
    description: "Развёртывание в облаке заказчика или on-premise — данные не покидают периметр без согласия.",
    about: BITRIX_ABOUT,
    salesNotes: "Цена по запросу · от 500 000 ₽",
    price: 500000,
    picture: "/stock/cyber-padlock.jpg",
    conversion: 90,
  },
];

const PARTNERS_OFFERS: MicrositeOffer[] = [
  {
    id: "partners-presale",
    slug: "presale-support",
    title: "Presale support для агентств",
    description: "Анализ брифа, архитектура, оценка себестоимости и участие в технической встрече под брендом партнёра.",
    about: PARTNERS_ABOUT,
    salesNotes: "Wholesale / fixed · база для вашей маржи",
    price: 150000,
    picture: "/stock/roadmap-sticky-notes.jpg",
    conversion: 91,
  },
  {
    id: "partners-delivery",
    slug: "project-delivery",
    title: "White-label project delivery",
    description: "Разработка, интеграции, тестирование, deployment и документация — клиент видит только вас.",
    about: PARTNERS_ABOUT,
    salesNotes: "Пилот на рынке от 300 000 ₽ · партнёрская цена по проекту",
    price: 300000,
    picture: "/stock/team-collab.jpg",
    conversion: 94,
  },
  {
    id: "partners-ongoing",
    slug: "ongoing-ai-team",
    title: "Ongoing AI team",
    description: "Ежемесячный пул часов, несколько проектов, приоритетная поддержка и быстрые оценки.",
    about: PARTNERS_ABOUT,
    salesNotes: "Retainer / hourly · приоритет партнёра",
    price: 300000,
    picture: "/stock/automation-code.jpg",
    conversion: 92,
  },
  {
    id: "partners-bitrix-analytics",
    slug: "bitrix24-ai-analytics",
    title: "AI-аналитика для Битрикс24 (white-label)",
    description: "Вопросы о продажах, задачах и звонках на естественном языке — внутри CRM клиента под вашим брендом.",
    about: PARTNERS_ABOUT,
    salesNotes: "Subcontract / technical partner",
    price: 300000,
    picture: "/diagrams/crm-integration.svg",
    conversion: 93,
  },
  {
    id: "partners-kp-docs",
    slug: "kp-documents",
    title: "Автоматизация КП и документов",
    description: "OCR, договоры, счета, спецификации и генерация коммерческих предложений из каталога.",
    about: PARTNERS_ABOUT,
    salesNotes: "Delivery под брендом партнёра",
    price: 300000,
    picture: "/diagrams/document-flow.svg",
    conversion: 93,
  },
];

/** YML для bitrix.bober-ai.dev (Битрикс24 + amoCRM). */
export function getBitrixFeedXml(now = new Date()) {
  return buildYmlCatalog(
    {
      siteUrl: BITRIX_SITE_URL,
      shopName: `${SITE_NAME} — Битрикс24`,
      shopDescription:
        "AI-автоматизация продаж и управления в Битрикс24 и amoCRM: CRM, звонки, КП, 1С и МойСклад. Пилот от 300 000 ₽.",
      orderPath: "/#contact",
      offers: BITRIX_OFFERS,
    },
    now,
  );
}

/** YML для partners.bober-ai.dev (white-label / partner program). */
export function getPartnersFeedXml(now = new Date()) {
  return buildYmlCatalog(
    {
      siteUrl: PARTNERS_SITE_URL,
      shopName: `${SITE_NAME} — Partner Program`,
      shopDescription:
        "White-label AI-разработка для агентств и software house: архитектура, backend, LLM и deployment под вашим брендом.",
      orderPath: "/#contact",
      offers: PARTNERS_OFFERS,
    },
    now,
  );
}

export const MICROSITE_FEED_PATHS = {
  bitrix: "feeds/bitrix.yml",
  partners: "feeds/partners.yml",
} as const;

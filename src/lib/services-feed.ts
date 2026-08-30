import { spawnSync } from "node:child_process";
import { join } from "node:path";
import {
  CONTACT_EMAIL,
  SITE_NAME,
  SITE_REGION,
  SITE_URL,
  STOCK_IMAGES,
  TELEGRAM_URL,
} from "@/lib/site";
import { PROFILE, REVIEWS } from "@/lib/profile";
import { getEnterpriseServices, type EnterpriseService } from "@/lib/enterprise-services";
import { FEED_RATING, FEED_REVIEWS_COUNT } from "@/lib/feed-rating";
import { KASPERSKY_PAGE, KASPERSKY_PRODUCTS } from "@/lib/kaspersky-page";
import { LANDING_PAGES, landingPath } from "@/lib/landing-pages";
import { getLandingSeoServiceContent } from "@/lib/landing-seo-service";
import { resolveSeoRedirect } from "@/lib/seo-redirects";

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
  "ai-sales-loop": 94,
  "ai-meeting-crm": 95,
  "corporate-ai-agent-1c-crm": 95,
  "ai-inbound-calls": 95,
  "crm-quote-offers": 94,
  "wildberries-independent-sales-channel": 93,
  "secure-private-ai-cloud": 94,
  "company-automation": 94,
  "crm-automation": 93,
  "document-ai": 92,
  "ai-for-crm": 93,
  "corporate-ai-assistant": 92,
  "business-process-audit": 95,
  "amocrm-setup": 93,
  "amocrm-implementation": 94,
  "amocrm-services": 93,
  "amocrm-pricing": 95,
  "amocrm-ai-agent": 94,
  "crm-erp-development": 93,
  "ii-vnedrenie-v-biznes": 94,
  "ii-prodavets": 94,
  "ii-vnedrenie-iskusstvennogo-intellekta": 94,
  "ii-vnedrenie-v-vash-biznes": 94,
  "ii-neyro-sotrudnik": 93,
  "ii-sozdanie-botov": 93,
  "ii-chatboty-pod-klyuch": 93,
  "ii-integraciya": 93,
  "ii-neyronnye-seti": 92,
  "ii-agenty-vnedrenie": 94,
  "erp-moysklad": 94,
  "moysklad-setup": 94,
  "moysklad-crm-integration": 94,
  "moysklad-automation": 93,
  "moysklad-pod-klyuch": 93,
  "moysklad-pricing": 95,
  "moysklad-ai": 94,
  "moysklad-chatgpt-ux": 94,
  "moysklad-crm-sync": 93,
  "moysklad-warehouse": 93,
};

export function getFeedConversion(slug: string, fallback = 90) {
  return FEED_CONVERSION[slug] ?? fallback;
}

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

/** Yandex YML: sales_notes max 50 chars — longer → feed errors. */
function clampSalesNotes(value: string, max = 50) {
  const text = String(value || "").trim();
  if (text.length <= max) return text;
  return `${text.slice(0, Math.max(0, max - 1)).trimEnd()}…`;
}

function rasterFeedImage(src: string, fallback: string) {
  return /\.svg$/i.test(src) ? fallback : src;
}

/**
 * Yandex quality check needs ≥25 set URLs already in search.
 * 301/canonical sources never enter the index (REDIRECT_NOTSEARCHABLE).
 */
export function canonicalizeFeedPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const bare = normalized.length > 1 ? normalized.replace(/\/+$/, "") : normalized || "/";
  return resolveSeoRedirect(bare) || bare;
}

export function getServiceOfferUrl(
  offer: Pick<EnterpriseService, "slug" | "feedPath"> | string,
) {
  if (typeof offer === "string") {
    const path = canonicalizeFeedPath(`/services/${offer}`);
    return `${FEED_SITE_URL}${path}`;
  }
  const path = canonicalizeFeedPath(offer.feedPath?.trim() || `/services/${offer.slug}`);
  const url = `${FEED_SITE_URL}${path}`;
  if (!url.startsWith("https://") || !url.includes("bober-systems.ru")) {
    throw new Error(`Invalid feed offer URL for ${offer.slug}: ${url}`);
  }
  return url;
}

const FEED_LANDING_CATEGORIES = new Set(["automation", "integrations", "solutions", "ai"]);

const HUB_FEED_PAGES: Array<{
  path: string;
  slug: string;
  title: string;
  about: string;
  parentSlug: string;
  image: string;
}> = [
  {
    path: "/services",
    slug: "hub-services",
    title: "Услуги внедрения ИИ и автоматизации",
    about: "Каталог услуг: аудит, CRM, документы, агенты продаж и приватный ИИ-контур.",
    parentSlug: "business-process-automation",
    image: STOCK_IMAGES.team,
  },
  {
    path: "/integrations",
    slug: "hub-integrations",
    title: "Интеграции CRM, 1С и мессенджеров",
    about: "Связки Bitrix24, amoCRM, 1С, телефонии и мессенджеров без ручного копирования.",
    parentSlug: "crm-integration",
    image: STOCK_IMAGES.automation,
  },
  {
    path: "/solutions",
    slug: "hub-solutions",
    title: "Готовые ИИ-решения для бизнеса",
    about: "RAG, OCR, голосовые сценарии и контуры под задачу — фиксированная смета.",
    parentSlug: "enterprise-ai-assistant",
    image: STOCK_IMAGES.roadmap,
  },
  {
    path: "/ai",
    slug: "hub-ai",
    title: "Внедрение ИИ в процессы компании",
    about: "Аудит, пилот с KPI и промышленный запуск LLM/агентов в вашем контуре.",
    parentSlug: "ai-consulting",
    image: STOCK_IMAGES.security,
  },
  {
    path: "/pricing",
    slug: "hub-pricing",
    title: "Цены на внедрение ИИ и автоматизацию",
    about: "Пакеты и ориентиры бюджета: настройка CRM, документы, ИИ-контур.",
    parentSlug: "ai-discovery-roadmap",
    image: STOCK_IMAGES.sales,
  },
  {
    path: "/kaspersky",
    slug: "hub-kaspersky",
    title: KASPERSKY_PAGE.h1Ru,
    about: KASPERSKY_PAGE.subtitleRu,
    parentSlug: "secure-private-ai-cloud",
    image: STOCK_IMAGES.security,
  },
  {
    path: "/amocrm",
    slug: "hub-amocrm",
    title: "Внедрение и автоматизация amoCRM",
    about: "Воронка, роботы, интеграции и ИИ-слой в amoCRM — смета до старта.",
    parentSlug: "amocrm-setup",
    image: STOCK_IMAGES.automation,
  },
  {
    path: "/secure-ai",
    slug: "hub-secure-ai",
    title: "Приватный контур ИИ без утечки данных",
    about: "On-prem и изолированное облако: LLM, RAG, доступы и мониторинг.",
    parentSlug: "private-llm-gigachat",
    image: STOCK_IMAGES.security,
  },
];

function cloneParent(
  parent: EnterpriseService | undefined,
  extra: Pick<EnterpriseService, "id" | "slug" | "title" | "description" | "about" | "feedPath" | "serviceImage"> &
    Partial<Pick<EnterpriseService, "orderSlug">>,
): EnterpriseService {
  return {
    id: extra.id,
    slug: extra.slug,
    title: extra.title,
    description: extra.description,
    about: extra.about,
    salesNotes: parent?.salesNotes || "от 150 000 ₽",
    deliveryDays: parent?.deliveryDays || 21,
    price: parent?.price || 150000,
    serviceImage: extra.serviceImage,
    feedPath: extra.feedPath,
    inServicesCatalog: false,
    orderSlug: extra.orderSlug || parent?.slug,
  };
}

/** Extra 200-OK landings so quality check can pick ≥25 set URLs already in search. */
export function extraFeedOffers(): EnterpriseService[] {
  const bySlug = new Map(getEnterpriseServices("ru").map((item) => [item.slug, item]));
  const extras: EnterpriseService[] = [];

  for (const hub of HUB_FEED_PAGES) {
    if (resolveSeoRedirect(hub.path)) continue;
    const parent = bySlug.get(hub.parentSlug);
    extras.push(
      cloneParent(parent, {
        id: hub.slug,
        slug: hub.slug,
        title: hub.title,
        description: hub.about,
        about: hub.about,
        feedPath: hub.path,
        serviceImage: rasterFeedImage(hub.image, STOCK_IMAGES.team),
        orderSlug: hub.parentSlug,
      }),
    );
  }

  for (const page of LANDING_PAGES) {
    if (!FEED_LANDING_CATEGORIES.has(page.category)) continue;
    const path = landingPath(page);
    if (resolveSeoRedirect(path)) continue;
    const content = getLandingSeoServiceContent(page, "ru");
    const title = content?.h1?.trim();
    if (!content || !title) continue;
    const parent = bySlug.get(page.serviceSlug);
    const fallbackImage = parent?.serviceImage || STOCK_IMAGES.team;
    extras.push(
      cloneParent(parent, {
        id: `land-${page.category}-${page.slug}`,
        slug: `land-${page.category}-${page.slug}`,
        title,
        description: content.subtitle?.trim() || title,
        about: content.intro?.[0]?.trim() || content.subtitle?.trim() || title,
        feedPath: path,
        serviceImage: rasterFeedImage(page.coverImage, fallbackImage),
        orderSlug: page.serviceSlug,
      }),
    );
  }

  for (const product of KASPERSKY_PRODUCTS) {
    const path = `/kaspersky/${product.slug}`;
    if (resolveSeoRedirect(path)) continue;
    const parent = bySlug.get("secure-private-ai-cloud");
    extras.push(
      cloneParent(parent, {
        id: `land-kaspersky-${product.slug}`,
        slug: `land-kaspersky-${product.slug}`,
        title: product.titleRu,
        description: product.summaryRu,
        about: product.summaryRu,
        feedPath: path,
        serviceImage: STOCK_IMAGES.security,
        orderSlug: "secure-private-ai-cloud",
      }),
    );
  }

  return extras;
}

export function catalogFeedOffers(): EnterpriseService[] {
  return [...getEnterpriseServices("ru"), ...extraFeedOffers()];
}

/**
 * Yandex DupOfferName: several Wordstat satellites share one landing feedPath.
 * Keep one offer (and set) per unique URL — prefer slug matching the path basename.
 */
export function dedupeFeedOffersByUrl(offers: EnterpriseService[]): EnterpriseService[] {
  const byUrl = new Map<string, EnterpriseService[]>();
  for (const offer of offers) {
    const url = getServiceOfferUrl(offer);
    const group = byUrl.get(url);
    if (group) group.push(offer);
    else byUrl.set(url, [offer]);
  }

  const picked: EnterpriseService[] = [];
  for (const group of byUrl.values()) {
    if (group.length === 1) {
      picked.push(group[0]!);
      continue;
    }
    const ranked = [...group].sort((a, b) => {
      const score = (item: EnterpriseService) => {
        const path = (item.feedPath?.trim() || `/services/${item.slug}`).replace(/\/$/, "");
        const base = path.split("/").pop() || "";
        let points = 0;
        if (item.slug === base || item.id === base) points += 100;
        if (item.inServicesCatalog !== false) points += 10;
        if (item.omitFeedPicture !== true) points += 5;
        return points;
      };
      const diff = score(b) - score(a);
      if (diff !== 0) return diff;
      return group.indexOf(a) - group.indexOf(b);
    });
    picked.push(ranked[0]!);
  }

  // Preserve original catalog order.
  const keep = new Set(picked.map((item) => item.id));
  return offers.filter((item) => keep.has(item.id));
}

/** Collapse verb/noun paraphrases so «Настройка»/«Настроить» share one key. */
export function normalizeFeedTitle(title: string): string {
  let text = title.toLowerCase().replaceAll("ё", "е");
  text = text.replace(/[^a-zа-я0-9]+/g, " ").trim();
  const replacements: Array<[RegExp, string]> = [
    [/\bнастроить\b/g, "настройка"],
    [/\bвнедрить\b/g, "внедрение"],
    [/\bразработать\b/g, "разработка"],
    [/\bсоздать\b/g, "создание"],
  ];
  for (const [pattern, value] of replacements) {
    text = text.replace(pattern, value);
  }
  return text.replace(/\s+/g, " ").trim();
}

/**
 * Yandex DupOfferName also fires on near-duplicate service titles (description),
 * e.g. «Настройка amoCRM» vs «Настроить amoCRM».
 */
export function dedupeFeedOffersByTitle(offers: EnterpriseService[]): EnterpriseService[] {
  const byTitle = new Map<string, EnterpriseService[]>();
  for (const offer of offers) {
    const key = normalizeFeedTitle(offer.title);
    const group = byTitle.get(key);
    if (group) group.push(offer);
    else byTitle.set(key, [offer]);
  }

  const picked: EnterpriseService[] = [];
  for (const group of byTitle.values()) {
    if (group.length === 1) {
      picked.push(group[0]!);
      continue;
    }
    const ranked = [...group].sort((a, b) => {
      const score = (item: EnterpriseService) => {
        let points = 0;
        if (item.inServicesCatalog !== false) points += 10;
        if (item.omitFeedPicture !== true) points += 5;
        if (!item.feedPath) points += 2;
        return points;
      };
      const diff = score(b) - score(a);
      if (diff !== 0) return diff;
      return group.indexOf(a) - group.indexOf(b);
    });
    picked.push(ranked[0]!);
  }

  const keep = new Set(picked.map((item) => item.id));
  return offers.filter((item) => keep.has(item.id));
}

export function selectFeedOffers(offers: EnterpriseService[]): EnterpriseService[] {
  const visible = offers.filter((offer) => offer.omitFromFeed !== true);
  return dedupeFeedOffersByTitle(dedupeFeedOffersByUrl(visible));
}

/** Dedicated order form page — Yandex «создание заказа» must land on a working form, not only a modal CTA. */
export function getServiceOrderUrl(
  offer: Pick<EnterpriseService, "slug" | "orderSlug"> | string,
) {
  const slug =
    typeof offer === "string" ? offer : offer.orderSlug?.trim() || offer.slug;
  return `${FEED_SITE_URL}/order/${encodeURIComponent(slug)}`;
}

export function getOrderTelegramUrl(serviceTitle: string) {
  const text = `Здравствуйте! Хочу обсудить проект: ${serviceTitle}`;
  return `${TELEGRAM_URL}?text=${encodeURIComponent(text)}`;
}

/** Resize each offer image to unique 320×320 JPEG for YML <picture>. */
export function materializeFeedPictures(rootDir = process.cwd()) {
  const offers = selectFeedOffers(catalogFeedOffers()).filter((offer) => !offer.omitFeedPicture);
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
  // Unique 200-OK URLs + titles. Yandex quality: ≥25 sets whose URLs are already in search.
  const offers = selectFeedOffers(catalogFeedOffers());
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
      // Always emit a real domain URL — empty/omitted <url> → Yandex Hatter_WrongUrl fatal.
      const offerUrl = getServiceOfferUrl(offer);
      return `      <set id="${escapeXml(offer.slug)}">
        <name>${escapeXml(offer.title)}</name>
        <url>${escapeXml(offerUrl)}</url>
      </set>`;
    })
    .join("\n");

  // Official sample: description → adult → expiry → required params block.
  // https://yandex.ru/support/webmaster/ru/search-appearance/services
  // No public reviews → Рейтинг/Число отзывов = 0; omit review text params.
  const hasPublicReviews = Number(FEED_REVIEWS_COUNT) > 0 && Number(FEED_RATING) > 0;
  const reviewParams = hasPublicReviews
    ? REVIEWS.slice(0, 5)
        .map(
          (review, index) =>
            `      <param name="Отзыв на исполнителя - ${index + 1}" unit="5">${escapeXml(review.text)}</param>`,
        )
        .join("\n")
    : "";

  const offerBlocks = offers
    .map((offer) => {
      const offerUrl = getServiceOfferUrl(offer);
      const pictureLine =
        offer.omitFeedPicture === true
          ? ""
          : `\n      <picture>${escapeXml(`${FEED_SITE_URL}${feedPicturePath(offer.id)}`)}</picture>`;
      const conversion = getFeedConversion(offer.slug);
      const otherServices = offers
        .filter((item) => item.slug !== offer.slug)
        .slice(0, 5)
        .map(
          (item, index) =>
            `      <param name="Другая услуга исполнителя - ${index + 1}">${escapeXml(item.title)}</param>`,
        )
        .join("\n");
      const optionalReviewBlock = reviewParams ? `\n${reviewParams}` : "";
      const optionalOtherBlock = otherServices ? `\n${otherServices}` : "";

      return `    <offer id="${escapeXml(offer.id)}">
      <name>${escapeXml(PROFILE.name)}</name>
      <url>${escapeXml(offerUrl)}</url>
      <price from="true">${offer.price}</price>
      <currencyId>RUR</currencyId>
      <sales_notes>${escapeXml(clampSalesNotes(offer.salesNotes))}</sales_notes>
      <categoryId>${FEED_CATEGORY_ID}</categoryId>
      <set-ids>${escapeXml(offer.slug)}</set-ids>${pictureLine}
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
      <param name="Ссылка на создание заказа">${escapeXml(getServiceOrderUrl(offer))}</param>
      <param name="Ссылка на профиль исполнителя">${escapeXml(FEED_SITE_URL)}</param>
      <param name="Исполнитель проверен">true</param>
      <param name="Организация">true</param>
      <param name="Выполняется удаленно">true</param>
      <param name="Об исполнителе">${escapeXml(offer.about)}</param>${optionalReviewBlock}${optionalOtherBlock}
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

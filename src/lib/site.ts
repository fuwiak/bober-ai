import {
  AMOCRM_ORIGIN,
  BITRIX_ORIGIN,
  CANONICAL_ORIGIN,
  PARTNERS_ORIGIN,
} from "../../config/domains.mjs";

/** On-page hero / about portrait — WebP ~56 KB (PNG kept as source master). */
export const FOUNDER_IMAGE = "/hero/pavel-main.webp";
/** Social / OG share image — 1200×630 JPEG (LinkedIn/Telegram prefer raster OG). */
export const OG_IMAGE = "/hero/pavel-og.jpg";
export const HERO_STOCK_IMAGE = "/stock/office-tower.jpg";
export const ABOUT_STOCK_IMAGE = FOUNDER_IMAGE;
export const OFFICE_STOCK_IMAGES = {
  tower: "/stock/office-tower.jpg",
  facade: "/stock/office-facade.jpg",
  interior: "/stock/office-interior.jpg",
} as const;
export const DIAGRAM_IMAGES = {
  workflow: "/diagrams/workflow-automation.svg",
  crm: "/diagrams/crm-integration.svg",
  documents: "/diagrams/document-flow.svg",
  sales: "/diagrams/sales-pipeline.svg",
  architecture: "/diagrams/system-architecture.svg",
  erp: "/diagrams/erp-sync.svg",
} as const;
export const STOCK_IMAGES = {
  automation: "/stock/automation-code.jpg",
  team: "/stock/team-collab.jpg",
  sales: "/stock/sales-proposal.jpg",
  security: "/stock/cyber-padlock.jpg",
  roadmap: "/stock/roadmap-sticky-notes.jpg",
  officeTower: OFFICE_STOCK_IMAGES.tower,
  officeFacade: OFFICE_STOCK_IMAGES.facade,
  officeInterior: OFFICE_STOCK_IMAGES.interior,
} as const;

export const PORTFOLIO_IMAGES = {
  telemost: "/portfolio/yandex-telemost-agent.png",
  kaspersky: "/partners/kaspersky/smb-assistant-ui.png",
  leads: "/portfolio/gtm-flow-leads.png",
  kpLlm: "/portfolio/offer-kp-llm.png",
  elia: "/portfolio/elia-suite.png",
  bitrixKwork: "/cases/bitrix24-kwork-crm.jpg",
  wildberriesChannel: "/cases/wildberries-independent-sales-channel.jpg",
  aiSalesLoop: "/stock/offers/ai-sales-loop.jpg",
  erpMoysklad: "/portfolio/erp-moysklad-chatgpt-ux.webp",
  financeOpsAirtable: "/portfolio/finance-ops-airtable-automations.png",
} as const;
export const SITE_NAME = "Bober AI Systems";
export const SITE_TAGLINE_RU = "Автоматизация КП, документов и CRM с ИИ";
export const SITE_TAGLINE_EN = "AI automation of proposals, documents and CRM";
export const SITE_DESCRIPTION =
  "Внедрение ИИ в продажи и операции в Москве: КП, документы, Bitrix24/amoCRM и 1С. Пилот от 300 000 ₽, фиксированная смета, NDA, облако или on-premise.";
/** Регион для Вебмастера / schema (город важнее страны для локальной выдачи). */
export const SITE_REGION = "Москва";
export const SITE_COUNTRY = "Россия";
/** Координаты офиса (Перервинский б-р, 3) — сигнал региональности для Яндекса. */
export const SITE_GEO = { latitude: 55.6665, longitude: 37.7448 } as const;

/** Read PUBLIC_* — runtime process.env wins over Vite-baked import.meta.env. */
function readPublicEnv(publicKey: string, fallback = ""): string {
  if (typeof process !== "undefined") {
    const fromProcess = process.env?.[publicKey]?.trim();
    if (fromProcess) return fromProcess;
    const nextKey = publicKey.replace(/^PUBLIC_/, "NEXT_PUBLIC_");
    if (process.env?.[nextKey]?.trim()) return process.env[nextKey]!.trim();
  }

  try {
    const fromImport = import.meta.env?.[publicKey];
    if (typeof fromImport === "string" && fromImport.trim()) return fromImport.trim();
  } catch {
    /* import.meta unavailable in some Node/tsx contexts */
  }

  return fallback;
}

/** Публичный email на сайте. Меняется через PUBLIC_CONTACT_EMAIL / NEXT_PUBLIC_CONTACT_EMAIL. */
export const CONTACT_EMAIL = readPublicEnv("PUBLIC_CONTACT_EMAIL", "contact@bober-systems.ru");
/** Получатели заявок, если CONTACT_TO_EMAIL не задан. */
export const CONTACT_NOTIFICATION_EMAILS = [CONTACT_EMAIL];
export const CONTACT_PHONE = "+79950998170";
export const WHATSAPP_URL = "https://wa.me/79950998170";
export const TELEGRAM_URL = "https://t.me/pstasinski";
/** MAX messenger profile — empty until PUBLIC_MAX_URL is set (channel shown only when set). */
export const MAX_URL = readPublicEnv("PUBLIC_MAX_URL");
export const LINKEDIN_URL = "https://www.linkedin.com/in/fuwiak";
export const GITHUB_URL = "https://github.com/fuwiak";
/** Booking / calendar for A/B CTA → direct schedule. Empty → calendar variant falls back to form. */
export const CALENDAR_URL = readPublicEnv("PUBLIC_CALENDAR_URL");
/** Unified primary conversion goal across header, hero, packages, FAB. */
export const PRIMARY_CTA_GOAL = "primary_cta_click";
export const YANDEX_USLUGI_URL = "https://uslugi.yandex.ru/profile/PawelStasinski-254144";
/** Карточка на Картах — региональность и представление в поиске. */
export const YANDEX_MAPS_URL = readPublicEnv(
  "PUBLIC_YANDEX_MAPS_URL",
  "https://yandex.ru/maps/?text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%9F%D0%B5%D1%80%D0%B5%D1%80%D0%B2%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9%20%D0%B1-%D1%80%2C%203",
);
/** Яндекс Бизнес / Справочник — карточка организации. */
export const YANDEX_BUSINESS_URL = readPublicEnv(
  "PUBLIC_YANDEX_BUSINESS_URL",
  "https://yandex.ru/sprav/113092981562/",
);
export const YANDEX_CLOUD_PARTNERS_URL = "https://yandex.cloud/ru/partners/catalogue";
/** Direct Bitrix partner card (program ID). */
export const BITRIX_PARTNER_URL = "https://www.1c-bitrix.ru/partners/28909898.php";
/** Own Kaspersky certificates hub — proof of Registered Partner status. */
export const KASPERSKY_PARTNER_URL = "/certificates";
export const SELECTEL_PARTNER_PROGRAM_URL = "https://selectel.ru/about/partners-programm/";
export const CLOUD_RU_PARTNERS_URL = "https://cloud.ru/partners/find-partner";

export const HOMEPAGE_PRESENCE_LINKS = [
  { id: "linkedin", url: LINKEDIN_URL },
  { id: "github", url: GITHUB_URL },
  { id: "yandexReviews", url: YANDEX_USLUGI_URL },
  { id: "yandexMaps", url: YANDEX_MAPS_URL },
  { id: "yandexCloud", url: YANDEX_CLOUD_PARTNERS_URL },
  { id: "bitrixPartner", url: BITRIX_PARTNER_URL },
  { id: "kasperskyPartner", url: KASPERSKY_PARTNER_URL },
  ...(YANDEX_BUSINESS_URL ? [{ id: "yandexBusiness" as const, url: YANDEX_BUSINESS_URL }] : []),
] as const;
export const YOUTUBE_SHORTS_URL = "https://www.youtube.com/shorts/5DQzO5aPS5A";
export const ORGANIZATION_NAME = "ИП Стасиньски Павел Кшиштоф";
/** Canonical public origin — default from `config/domains.mjs` (override via PUBLIC_SITE_URL). */
export const SITE_URL = readPublicEnv("PUBLIC_SITE_URL", CANONICAL_ORIGIN);
/** Отдельный white-label лендинг на subdomain (Caddy host rewrite → /white-label.html). */
export const PARTNERS_SITE_URL = readPublicEnv("PUBLIC_PARTNERS_SITE_URL", PARTNERS_ORIGIN);
/** CRM landing: Bitrix24 + amoCRM (Caddy host rewrite → /bitrix.html). */
export const BITRIX_SITE_URL = readPublicEnv("PUBLIC_BITRIX_SITE_URL", BITRIX_ORIGIN);
/** amoCRM microsite (Caddy host rewrite → /amocrm). */
export const AMOCRM_SITE_URL = readPublicEnv("PUBLIC_AMOCRM_SITE_URL", AMOCRM_ORIGIN);
export const DEFAULT_KEYWORDS = [
  "интеграция битрикс24",
  "интегратор битрикс24",
  "внедрение битрикс24",
  "внедрение crm битрикс24",
  "распознавание первичных документов",
  "распознавание документов в 1с",
  "интеграция 1с битрикс24",
  "внедрение ии в бизнес",
  "речевая аналитика",
  "ии для отдела продаж",
  "автоматизация бизнес процессов",
  "внедрение битрикс24 цена",
  "интеграция 1С",
  "bitrix24 интеграция",
  "заказать интеграцию битрикс24",
  "ИИ Москва",
  "Yandex Cloud",
  "Selectel",
];

export function absoluteUrl(path = "/"): string {
  const base = SITE_URL.replace(/\/$/, "");
  if (!path || path === "/") return base;
  const normalized = (path.startsWith("/") ? path : `/${path}`).replace(/\/+$/, "");
  return `${base}${normalized}`;
}

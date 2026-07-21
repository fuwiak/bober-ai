export const FOUNDER_IMAGE = "/hero/pavel-main.png";
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
  kaspersky: "/yandex/kaspersky 2.png",
  leads: "/portfolio/gtm-flow-leads.png",
  kpLlm: "/portfolio/offer-kp-llm.png",
  elia: "/portfolio/elia-suite.png",
} as const;
export const SITE_NAME = "Bober AI Systems";
export const SITE_TAGLINE_RU = "Автоматизация бизнес-процессов для компаний";
export const SITE_TAGLINE_EN = "Business process automation for companies";
export const SITE_DESCRIPTION =
  "Проектируем и внедряем системы автоматизации бизнеса. CRM, документы, продажи, поддержка. AI только там, где приносит ROI.";
/** Регион для Вебмастера / schema (город важнее страны для локальной выдачи). */
export const SITE_REGION = "Москва";
export const SITE_COUNTRY = "Россия";
/** Координаты офиса (Перервинский б-р, 3) — сигнал региональности для Яндекса. */
export const SITE_GEO = { latitude: 55.6665, longitude: 37.7448 } as const;
/** Публичный email на сайте. Меняется через NEXT_PUBLIC_CONTACT_EMAIL в Railway. */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "stasinskipawel@yandex.ru";
/** Получатели заявок, если CONTACT_TO_EMAIL не задан. */
export const CONTACT_NOTIFICATION_EMAILS = [CONTACT_EMAIL];
export const CONTACT_PHONE = "+79950998170";
export const WHATSAPP_URL = "https://wa.me/79950998170";
export const TELEGRAM_URL = "https://t.me/pstasinski";
export const LINKEDIN_URL = "https://www.linkedin.com/in/fuwiak";
export const GITHUB_URL = "https://github.com/fuwiak";
export const YANDEX_USLUGI_URL = "https://uslugi.yandex.ru/profile/PawelStasinski-254144";
/** Карточка на Картах — региональность и представление в поиске. */
export const YANDEX_MAPS_URL =
  process.env.NEXT_PUBLIC_YANDEX_MAPS_URL?.trim() ||
  "https://yandex.ru/maps/?text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%9F%D0%B5%D1%80%D0%B5%D1%80%D0%B2%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9%20%D0%B1-%D1%80%2C%203";
/** Яндекс Бизнес / Справочник — задайте после создания карточки организации. */
export const YANDEX_BUSINESS_URL = process.env.NEXT_PUBLIC_YANDEX_BUSINESS_URL?.trim() || "";
export const YANDEX_CLOUD_PARTNERS_URL = "https://yandex.cloud/ru/partners/catalogue";
export const SELECTEL_PARTNER_PROGRAM_URL = "https://selectel.ru/about/partners-programm/";
export const CLOUD_RU_PARTNERS_URL = "https://cloud.ru/partners/find-partner";

export const HOMEPAGE_PRESENCE_LINKS = [
  { id: "linkedin", url: LINKEDIN_URL },
  { id: "github", url: GITHUB_URL },
  { id: "yandexReviews", url: YANDEX_USLUGI_URL },
  { id: "yandexMaps", url: YANDEX_MAPS_URL },
  { id: "yandexCloud", url: YANDEX_CLOUD_PARTNERS_URL },
  ...(YANDEX_BUSINESS_URL ? [{ id: "yandexBusiness" as const, url: YANDEX_BUSINESS_URL }] : []),
] as const;
export const YOUTUBE_SHORTS_URL = "https://www.youtube.com/shorts/5DQzO5aPS5A";
export const ORGANIZATION_NAME = "ИП Стасиньски Павел Кшиштоф";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bober-ai.dev";
/** Отдельный white-label лендинг на subdomain (Caddy host rewrite → /white-label.html). */
export const PARTNERS_SITE_URL =
  process.env.NEXT_PUBLIC_PARTNERS_SITE_URL?.trim() || "https://partners.bober-ai.dev";
/** CRM landing: Bitrix24 + amoCRM (Caddy host rewrite → /bitrix.html). */
export const BITRIX_SITE_URL =
  process.env.NEXT_PUBLIC_BITRIX_SITE_URL?.trim() || "https://bitrix.bober-ai.dev";

export const DEFAULT_KEYWORDS = [
  "автоматизация бизнес процессов",
  "автоматизация документооборота",
  "внедрение crm",
  "crm автоматизация",
  "автоматизация продаж",
  "создание базы знаний",
  "внедрение ии в бизнес",
  "amocrm интеграция",
  "bitrix24 интеграция",
  "автоматизация коммерческих предложений",
  "чат бот для бизнеса",
  "Yandex Cloud",
  "Selectel",
];

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

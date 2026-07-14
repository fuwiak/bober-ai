export const HERO_STOCK_IMAGE = "/stock/automation-code.jpg";
export const ABOUT_STOCK_IMAGE = "/stock/roadmap-sticky-notes.jpg";
export const STOCK_IMAGES = {
  automation: "/stock/automation-code.jpg",
  team: "/stock/team-collab.jpg",
  sales: "/stock/sales-proposal.jpg",
  security: "/stock/cyber-padlock.jpg",
  roadmap: "/stock/roadmap-sticky-notes.jpg",
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
export const SITE_REGION = "Россия";
export const CONTACT_EMAIL = "hello@bober-ai.ru";
export const CONTACT_NOTIFICATION_EMAILS = [CONTACT_EMAIL, "stasinskipawel@yandex.ru"] as const;
export const CONTACT_PHONE = "+79950998170";
export const TELEGRAM_URL = "https://t.me/pstasinski";
export const LINKEDIN_URL = "https://www.linkedin.com/in/fuwiak";
export const GITHUB_URL = "https://github.com/fuwiak";
export const YANDEX_USLUGI_URL = "https://uslugi.yandex.ru/profile/PawelStasinski-254144";
export const YANDEX_CLOUD_PARTNERS_URL = "https://yandex.cloud/ru/partners/catalogue";
export const SELECTEL_PARTNER_PROGRAM_URL = "https://selectel.ru/about/partners-programm/";
export const CLOUD_RU_PARTNERS_URL = "https://cloud.ru/partners/find-partner";

export const HOMEPAGE_PRESENCE_LINKS = [
  { id: "linkedin", url: LINKEDIN_URL },
  { id: "github", url: GITHUB_URL },
  { id: "yandexReviews", url: YANDEX_USLUGI_URL },
  { id: "yandexCloud", url: YANDEX_CLOUD_PARTNERS_URL },
] as const;
export const YOUTUBE_SHORTS_URL = "https://www.youtube.com/shorts/5DQzO5aPS5A";
export const ORGANIZATION_NAME = "ИП Стасиньски Павел Кшиштоф";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bober-ai.dev";

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

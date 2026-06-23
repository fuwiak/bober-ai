export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kinetic-ai.ru";
export const SITE_NAME = "Kinetic AI";
export const SITE_DESCRIPTION =
  "Павел Стасиньский — Claude, автоматизация бизнеса и AI-агенты под ключ. Готовые пакеты и индивидуальные проекты под ваш запрос.";
export const SITE_REGION = "Россия";
export const CONTACT_EMAIL = "hello@kinetic-ai.ru";
export const CONTACT_PHONE = "+79950998170";
export const TELEGRAM_URL = "https://t.me/pstasinski";
export const FREELANCE_URL = "https://freelance.ru/fuwiak";
export const FL_RU_URL = "https://www.fl.ru/user/stasinskipawel/";
export const AVITO_URL =
  "https://www.avito.ru/moskva/predlozheniya_uslug?q=%D0%B8%D0%B8-%D0%B0%D0%B3%D0%B5%D0%BD%D1%82%D1%8B+%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F+n8n";
export const AVITO_REVIEWS_COUNT = 39;
export const KWORK_URL = "https://kwork.ru/user/pasha_stasinski";
export const FIVERR_URL = "https://www.fiverr.com/pawelstasinski";
export const YANDEX_USLUGI_URL = "https://uslugi.yandex.ru/profile/PawelStasinski-254144";

export const MARKETPLACES = [
  { name: "Fiverr", url: FIVERR_URL },
  { name: "Kwork", url: KWORK_URL },
  { name: "FL.ru", url: FL_RU_URL },
  { name: "Авито", url: AVITO_URL },
  { name: "Freelance.ru", url: FREELANCE_URL },
  { name: "Яндекс Услуги", url: YANDEX_USLUGI_URL },
] as const;
export const YOUTUBE_SHORTS_URL = "https://www.youtube.com/shorts/5DQzO5aPS5A";
export const ORGANIZATION_NAME = "ИП Стасиньски Павел Кшиштоф";
export const DEFAULT_KEYWORDS = [
  "Kinetic AI",
  "корпоративный ИИ",
  "AI-инфраструктура",
  "облачные LLM",
  "Yandex Cloud",
  "Selectel",
  "автоматизация бизнеса",
  "чат-боты",
  "DevOps",
  "приватные модели",
];

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bober-ai.dev";
export const SITE_NAME = "Bober AI Systems";
export const SITE_TAGLINE_RU = "Внедрение AI и автоматизация для бизнеса";
export const SITE_TAGLINE_EN = "Enterprise AI implementation partner";
export const SITE_DESCRIPTION =
  "Внедрение AI и автоматизация для бизнеса. Внешний AI-отдел для software house и компаний с бюджетом от 500 000 ₽. RAG, агенты, MLOps.";
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
export const DEFAULT_KEYWORDS = [
  "внедрение AI",
  "разработка AI под ключ",
  "корпоративный ИИ",
  "AI-агенты для бизнеса",
  "RAG системы",
  "интеграция LLM",
  "MLOps",
  "автоматизация бизнеса",
  "GigaChat внедрение",
  "Yandex Cloud",
  "Selectel",
  "AI для enterprise",
  "разработка чат-ботов",
  "AI консалтинг Москва",
];

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

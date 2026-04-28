export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kinetic-ai.ru";
export const SITE_NAME = "Kinetic AI";
export const SITE_DESCRIPTION =
  "Kinetic AI: AI-инфраструктура, корпоративный ИИ, облачные LLM, автоматизация, DevOps и внедрение решений на базе Yandex Cloud и Selectel.";
export const CONTACT_EMAIL = "hello@kinetic-ai.ru";
export const TELEGRAM_URL = "https://t.me/sizovmaksim";
export const YOUTUBE_SHORTS_URL = "https://www.youtube.com/shorts/5DQzO5aPS5A";
export const ORGANIZATION_NAME = "ИП Стасиньски Павел Кшиштоф";

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

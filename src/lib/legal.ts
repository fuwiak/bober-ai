import { CONTACT_EMAIL, CONTACT_PHONE, ORGANIZATION_NAME, SITE_NAME, SITE_URL } from "@/lib/site";

export const LEGAL_ENTITY = {
  name: ORGANIZATION_NAME,
  inn: "772356334324",
  ogrnip: "325774600389226",
  address: "г. Москва, Российская Федерация",
  email: CONTACT_EMAIL,
  phone: CONTACT_PHONE,
  site: SITE_URL,
} as const;

export const LEGAL_ROUTES = {
  privacyPolicy: "/privacy-policy",
  consent: "/consent",
  terms: "/terms",
} as const;

export const COOKIE_CONSENT_KEY = "cookie-consent";

export const YANDEX_METRIKA_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || "110635302";

export const POLICY_UPDATED_AT = "21.06.2026";

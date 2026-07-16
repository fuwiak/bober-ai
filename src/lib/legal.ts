import { CONTACT_EMAIL, CONTACT_PHONE, ORGANIZATION_NAME, SITE_NAME, SITE_URL } from "@/lib/site";

export const LEGAL_ENTITY = {
  name: ORGANIZATION_NAME,
  inn: "772356334324",
  ogrnip: "325774600389226",
  /** Полный адрес места нахождения / регистрации ИП */
  address: "109451, Россия, г. Москва, Перервинский б-р, д. 3, кв. 57",
  email: CONTACT_EMAIL,
  phone: CONTACT_PHONE,
  site: SITE_URL,
  bank: {
    name: 'ООО "Банк Точка"',
    account: "40802810920000699458",
    bik: "044525104",
    corrAccount: "30101810745374525104",
  },
} as const;

export const LEGAL_ROUTES = {
  privacyPolicy: "/privacy-policy",
  consent: "/consent",
  terms: "/terms",
} as const;

export const COOKIE_CONSENT_KEY = "cookie-consent";

export const YANDEX_METRIKA_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || "110635302";

export const POLICY_UPDATED_AT = "16.07.2026";

/** Строка реквизитов для футера и кратких блоков */
export function formatLegalRequisitesLine(): string {
  return `ИНН ${LEGAL_ENTITY.inn} · ОГРНИП ${LEGAL_ENTITY.ogrnip}`;
}

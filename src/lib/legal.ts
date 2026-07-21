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
} as const;

export const LEGAL_ROUTES = {
  privacyPolicy: "/privacy-policy",
  consent: "/consent",
  terms: "/terms",
} as const;

export const COOKIE_CONSENT_KEY = "cookie-consent";

export const YANDEX_METRIKA_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || "110635302";
export const PARTNERS_YANDEX_METRIKA_ID =
  process.env.NEXT_PUBLIC_PARTNERS_YANDEX_METRIKA_ID || "110926696";
export const BITRIX_YANDEX_METRIKA_ID =
  process.env.NEXT_PUBLIC_BITRIX_YANDEX_METRIKA_ID || "110926887";

/** Select the dedicated counter for each standalone landing domain. */
export function yandexMetrikaIdForLocation(hostname?: string, pathname?: string): string {
  const normalizedHostname = hostname?.toLowerCase();
  const isPartnersLanding =
    normalizedHostname === "partners.bober-ai.dev" || pathname?.startsWith("/white-label");
  if (isPartnersLanding) return PARTNERS_YANDEX_METRIKA_ID;

  const isBitrixLanding =
    normalizedHostname === "bitrix.bober-ai.dev" || pathname?.startsWith("/bitrix");
  if (isBitrixLanding) return BITRIX_YANDEX_METRIKA_ID;

  return YANDEX_METRIKA_ID;
}

export const POLICY_UPDATED_AT = "22.07.2026";

/** Строка реквизитов для футера и кратких блоков */
export function formatLegalRequisitesLine(): string {
  return `ИНН ${LEGAL_ENTITY.inn} · ОГРНИП ${LEGAL_ENTITY.ogrnip}`;
}

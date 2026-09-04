import {
  AMOCRM_HOST,
  BITRIX_HOST,
  CANONICAL_APEX,
  isCanonicalFamilyHost,
  PARTNERS_HOST,
} from "../../config/domains.mjs";
import { CONTACT_PHONE, ORGANIZATION_NAME, SITE_NAME, SITE_URL } from "@/lib/site";
export const LEGAL_ENTITY = {
  name: ORGANIZATION_NAME,
  inn: "772356334324",
  ogrnip: "325774600389226",
  /** Полный адрес регистрации ИП — на оферте, политике ПДн и согласии. */
  address: "109451, Россия, г. Москва, Перервинский б-р, д. 3, кв. 57",
  /**
   * Публичный адрес для футера и витрин: достаточно для идентификации
   * исполнителя (ФЗ), без номера квартиры на каждой странице.
   */
  addressPublic: "109451, Россия, г. Москва",
  /** International footer: city/country only */
  addressEn: "Moscow, Russia",
  /** Structured fields for Schema.org / Yandex microdata validator. */
  streetAddress: "Перервинский б-р, д. 3",
  streetAddressEn: "3 Perervinsky Boulevard",
  postalCode: "109451",
  addressLocality: "Москва",
  addressLocalityEn: "Moscow",
  addressCountry: "RU",
  /**
   * Публичный email в политике, согласии и футере legal-страниц.
   * Зафиксирован явно — не зависит от NEXT_PUBLIC_CONTACT_EMAIL,
   * чтобы документы не разъезжались при смене env.
   */
  email: "contact@bober-systems.ru" as const,
  phone: CONTACT_PHONE,
  site: SITE_URL,
} as const;

export const LEGAL_ROUTES = {
  privacyPolicy: "/privacy-policy",
  consent: "/consent",
  terms: "/terms",
} as const;

/** Public aliases (Telegram / marketing). Canonical bodies live at LEGAL_ROUTES. */
export const LEGAL_ALIAS_ROUTES = {
  terms: "/legal/terms",
  privacy: "/legal/privacy",
  consent: "/legal/consent",
} as const;

export const COOKIE_CONSENT_KEY = "cookie-consent";

export const YANDEX_METRIKA_ID =
  process.env.PUBLIC_YANDEX_METRIKA_ID ||
  process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID ||
  "110635302";
export const PARTNERS_YANDEX_METRIKA_ID =
  process.env.PUBLIC_PARTNERS_YANDEX_METRIKA_ID ||
  process.env.NEXT_PUBLIC_PARTNERS_YANDEX_METRIKA_ID ||
  "110926696";
export const BITRIX_YANDEX_METRIKA_ID =
  process.env.PUBLIC_BITRIX_YANDEX_METRIKA_ID ||
  process.env.NEXT_PUBLIC_BITRIX_YANDEX_METRIKA_ID ||
  "110926887";
/**
 * amoCRM microsite counter. No dedicated counter yet — falls back to the main
 * one, so traffic is never dropped; set PUBLIC_AMOCRM_YANDEX_METRIKA_ID once
 * the counter exists in Metrika.
 */
export const AMOCRM_YANDEX_METRIKA_ID =
  process.env.PUBLIC_AMOCRM_YANDEX_METRIKA_ID ||
  process.env.NEXT_PUBLIC_AMOCRM_YANDEX_METRIKA_ID ||
  YANDEX_METRIKA_ID;

/** True for public canonical hosts (analytics surface from `config/domains.mjs`). */
export function isBoberSystemsHost(hostname?: string): boolean {
  return isCanonicalFamilyHost(hostname);
}

/**
 * Counter for the current host, or null when Metrika must stay off
 * (only canonical *.bober-systems.ru family).
 */
export function yandexMetrikaIdForLocation(hostname?: string, pathname?: string): string | null {
  const host = hostname?.toLowerCase() || "";
  const path = pathname || "";

  if (!isBoberSystemsHost(host)) return null;

  if (host === PARTNERS_HOST || path.startsWith("/white-label")) {
    return PARTNERS_YANDEX_METRIKA_ID;
  }

  if (host === BITRIX_HOST || path.startsWith("/bitrix")) {
    return BITRIX_YANDEX_METRIKA_ID;
  }

  if (host === AMOCRM_HOST) {
    return AMOCRM_YANDEX_METRIKA_ID;
  }

  return YANDEX_METRIKA_ID;
}

/** Re-export apex for docs / callers that need the registrable domain string. */
export { CANONICAL_APEX };
export const POLICY_UPDATED_AT = "27.07.2026";

/** Строка реквизитов для футера и кратких блоков */
export function formatLegalRequisitesLine(locale: string = "ru"): string {
  if (locale === "uz") {
    return `INN ${LEGAL_ENTITY.inn} · OGRNIP ${LEGAL_ENTITY.ogrnip}`;
  }
  return `ИНН ${LEGAL_ENTITY.inn} · ОГРНИП ${LEGAL_ENTITY.ogrnip}`;
}

export function legalAddressForLocale(locale: string = "ru"): string {
  return locale === "uz" ? LEGAL_ENTITY.addressEn : LEGAL_ENTITY.addressPublic;
}

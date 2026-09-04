#!/usr/bin/env node
/**
 * Prints `export KEY=...` lines for Docker build.
 * Empty PUBLIC_* → defaults from config/domains.mjs.
 */
import {
  AMOCRM_ORIGIN,
  BITRIX_ORIGIN,
  CANONICAL_ORIGIN,
  CONTACT_EMAIL_DEFAULT,
  PARTNERS_ORIGIN,
} from "../config/domains.mjs";

const pick = (key, fallback) => {
  const fromEnv = process.env[key]?.trim();
  return fromEnv || fallback;
};

const site = pick("PUBLIC_SITE_URL", CANONICAL_ORIGIN);
const partners = pick("PUBLIC_PARTNERS_SITE_URL", PARTNERS_ORIGIN);
const bitrix = pick("PUBLIC_BITRIX_SITE_URL", BITRIX_ORIGIN);
const amocrm = pick("PUBLIC_AMOCRM_SITE_URL", AMOCRM_ORIGIN);
const contact = pick("PUBLIC_CONTACT_EMAIL", CONTACT_EMAIL_DEFAULT);
const metrika = pick("PUBLIC_YANDEX_METRIKA_ID", "110635302");
const partnersMetrika = pick("PUBLIC_PARTNERS_YANDEX_METRIKA_ID", "110926696");
const bitrixMetrika = pick("PUBLIC_BITRIX_YANDEX_METRIKA_ID", "110926887");
// No dedicated amoCRM counter yet — default to the main one (see src/lib/legal.ts).
const amocrmMetrika = pick("PUBLIC_AMOCRM_YANDEX_METRIKA_ID", metrika);

const pairs = {
  PUBLIC_SITE_URL: site,
  PUBLIC_PARTNERS_SITE_URL: partners,
  PUBLIC_BITRIX_SITE_URL: bitrix,
  PUBLIC_AMOCRM_SITE_URL: amocrm,
  PUBLIC_CONTACT_EMAIL: contact,
  PUBLIC_YANDEX_METRIKA_ID: metrika,
  PUBLIC_PARTNERS_YANDEX_METRIKA_ID: partnersMetrika,
  PUBLIC_BITRIX_YANDEX_METRIKA_ID: bitrixMetrika,
  PUBLIC_AMOCRM_YANDEX_METRIKA_ID: amocrmMetrika,
  NEXT_PUBLIC_SITE_URL: site,
  NEXT_PUBLIC_PARTNERS_SITE_URL: partners,
  NEXT_PUBLIC_BITRIX_SITE_URL: bitrix,
  NEXT_PUBLIC_AMOCRM_SITE_URL: amocrm,
  NEXT_PUBLIC_YANDEX_METRIKA_ID: metrika,
  NEXT_PUBLIC_CONTACT_EMAIL: contact,
};

for (const [key, value] of Object.entries(pairs)) {
  process.stdout.write(`export ${key}=${JSON.stringify(value)}\n`);
}

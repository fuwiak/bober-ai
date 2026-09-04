/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_CONTACT_EMAIL: string;
  readonly PUBLIC_CALENDAR_URL: string;
  readonly PUBLIC_YANDEX_MAPS_URL: string;
  readonly PUBLIC_YANDEX_BUSINESS_URL: string;
  readonly PUBLIC_PARTNERS_SITE_URL: string;
  readonly PUBLIC_BITRIX_SITE_URL: string;
  readonly PUBLIC_AMOCRM_SITE_URL: string;
  readonly PUBLIC_YANDEX_METRIKA_ID: string;
  readonly PUBLIC_PARTNERS_YANDEX_METRIKA_ID: string;
  readonly PUBLIC_BITRIX_YANDEX_METRIKA_ID: string;
  readonly PUBLIC_GOOGLE_SITE_VERIFICATION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

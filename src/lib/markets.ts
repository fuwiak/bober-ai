export type Locale = "ru" | "kz" | "uz";

/** Market / locale presentation — geo, currency, hreflang, HTML lang. */
export type MarketMeta = {
  /** Path prefix without trailing slash; empty for default RU. */
  prefix: string;
  /** HTML lang + content language. */
  htmlLang: string;
  /** Open Graph locale. */
  ogLocale: string;
  /** hreflang value(s) for this market. */
  hreflang: string;
  /** ISO 4217 for JSON-LD Offers. */
  currency: string;
  /** Human price range hint for LocalBusiness. */
  priceRange: string;
  /** Schema / meta geo. */
  region: string;
  country: string;
  countryCode: string;
  geoRegion: string;
  placename: string;
  placenameEn: string;
  geo: { latitude: number; longitude: number };
  /** Schema areaServed label. */
  areaServed: string;
  areaServedCode: string;
  /** UI language for hardcoded bilingual branches (kz shares Russian). */
  contentLang: "ru" | "uz";
};

export const MARKETS: Record<Locale, MarketMeta> = {
  ru: {
    prefix: "",
    htmlLang: "ru",
    ogLocale: "ru_RU",
    hreflang: "ru-RU",
    currency: "RUB",
    priceRange: "₽₽₽",
    region: "Москва",
    country: "Россия",
    countryCode: "RU",
    geoRegion: "RU-MOW",
    placename: "Москва",
    placenameEn: "Moscow",
    geo: { latitude: 55.6665, longitude: 37.7448 },
    areaServed: "Russia",
    areaServedCode: "RU",
    contentLang: "ru",
  },
  kz: {
    prefix: "/kz",
    htmlLang: "ru-KZ",
    ogLocale: "ru_KZ",
    hreflang: "ru-KZ",
    currency: "KZT",
    priceRange: "₸₸₸",
    region: "Алматы",
    country: "Казахстан",
    countryCode: "KZ",
    geoRegion: "KZ-75",
    placename: "Алматы",
    placenameEn: "Almaty",
    geo: { latitude: 43.2389, longitude: 76.8897 },
    areaServed: "Kazakhstan",
    areaServedCode: "KZ",
    contentLang: "ru",
  },
  /** Legacy — all /uz/* permanently redirect to RU (seo-redirects). Not in locale switcher. */
  uz: {
    prefix: "/uz",
    htmlLang: "uz",
    ogLocale: "uz_UZ",
    hreflang: "uz",
    currency: "UZS",
    priceRange: "сумсумсум",
    region: "Toshkent",
    country: "Oʻzbekiston",
    countryCode: "UZ",
    geoRegion: "UZ-TK",
    placename: "Toshkent",
    placenameEn: "Tashkent",
    geo: { latitude: 41.2995, longitude: 69.2401 },
    areaServed: "Uzbekistan",
    areaServedCode: "UZ",
    contentLang: "uz",
  },
};

/** Active build locales. UZ parked in src/_parked/uz — edge 301 to RU. */
export const LOCALES: Locale[] = ["ru", "kz"];
/** Locale switcher + hreflang UI — UZ removed (301 to RU). */
export const SWITCHER_LOCALES: Locale[] = ["ru", "kz"];

export function marketOf(locale: Locale): MarketMeta {
  return MARKETS[locale] ?? MARKETS.ru;
}

export function isPrefixedLocale(locale: Locale): locale is Exclude<Locale, "ru"> {
  return locale === "kz" || locale === "uz";
}

export function contentLang(locale: Locale): "ru" | "uz" {
  return marketOf(locale).contentLang;
}

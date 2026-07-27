/**
 * YML always emits `Рейтинг` / `Число отзывов` (Webmaster moderation requires both).
 * UI + JSON-LD hide the claim while values are 0 — do not show "rating 0" on pages.
 * When real public ratings exist, set both > 0 so feed and visible text stay in sync.
 */
export const FEED_RATING = "0";
export const FEED_REVIEWS_COUNT = "0";

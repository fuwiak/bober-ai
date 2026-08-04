import { PROFILE } from "@/lib/profile";

/**
 * YML always emits `Рейтинг` / `Число отзывов` (required by Webmaster).
 * No public reviews yet → both are `0` (Yandex docs: new performer / no rating → 0).
 * UI + JSON-LD only show AggregateRating when both > 0.
 */
export const FEED_RATING =
  PROFILE.rating > 0 ? PROFILE.rating.toFixed(1) : "0";
export const FEED_REVIEWS_COUNT = String(Math.max(0, PROFILE.reviewsCount));

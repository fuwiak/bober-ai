import { PROFILE } from "@/lib/profile";

/**
 * YML always emits `Рейтинг` / `Число отзывов` (Webmaster moderation requires both).
 * Values must match public claims on site + Яндекс Услуги (PawelStasinski-254144).
 * UI + JSON-LD only show AggregateRating when both > 0.
 */
export const FEED_RATING = PROFILE.rating.toFixed(1);
export const FEED_REVIEWS_COUNT = String(PROFILE.reviewsCount);

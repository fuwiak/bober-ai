import { FEED_RATING, FEED_REVIEWS_COUNT } from "@/lib/feed-rating";
import { PROFILE } from "@/lib/profile";
import { SITE_REGION, YANDEX_USLUGI_URL } from "@/lib/site";

type PerformerRatingProps = {
  locale?: string;
  className?: string;
  /** Matches YML `Конверсия` for this offer when known. */
  conversion?: number;
};

/**
 * Text on /services/* must mirror required YML params (Webmaster scrapes the offer URL).
 * Labels stay Russian — same strings as in performers-feed.yml.
 * Rating 0 stays out of the visible line (buyers); crawler still gets exact param text.
 */
export function PerformerRating({
  locale = "ru",
  className = "",
  conversion,
}: PerformerRatingProps) {
  const isEn = locale === "en";
  const hasRating = Number(FEED_RATING) > 0 && Number(FEED_REVIEWS_COUNT) > 0;
  const ratingLine = `Рейтинг ${FEED_RATING} · Число отзывов ${FEED_REVIEWS_COUNT}`;
  const metaLine = [
    `Годы опыта ${PROFILE.experienceYears}`,
    `Регион ${SITE_REGION}`,
    conversion != null ? `Конверсия ${conversion}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className={`performer-rating ${className}`.trim()}>
      {/* Exact YML labels for Webmaster page↔feed check. */}
      <p className="sr-only">{`${ratingLine} · ${metaLine}`}</p>
      {hasRating && (
        <p className="text-sm text-ink">
          <span itemScope itemType="https://schema.org/AggregateRating">
            <meta itemProp="bestRating" content="5" />
            <meta itemProp="worstRating" content="1" />
            <meta itemProp="ratingValue" content={FEED_RATING} />
            <meta itemProp="reviewCount" content={FEED_REVIEWS_COUNT} />
            {isEn ? `Rating ${FEED_RATING} · Reviews ${FEED_REVIEWS_COUNT}` : ratingLine}
          </span>
        </p>
      )}
      <p className="text-sm text-muted">{metaLine}</p>
      <a
        href={YANDEX_USLUGI_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-1 inline-block text-sm text-muted underline-offset-2 hover:text-ink hover:underline"
      >
        {isEn ? "Yandex reviews" : "Отзывы на Яндексе"}
      </a>
    </div>
  );
}

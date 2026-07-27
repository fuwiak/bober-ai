import { FEED_RATING, FEED_REVIEWS_COUNT } from "@/lib/feed-rating";
import { YANDEX_USLUGI_URL } from "@/lib/site";

type PerformerRatingProps = {
  locale?: string;
  className?: string;
};

/** Plain text must match YML exactly — avoid React whitespace holes that break Yandex scrapers. */
export function PerformerRating({ locale = "ru", className = "" }: PerformerRatingProps) {
  const isEn = locale === "en";
  const hasRating = Number(FEED_RATING) > 0 && Number(FEED_REVIEWS_COUNT) > 0;
  const line = isEn
    ? `Rating ${FEED_RATING} · Reviews ${FEED_REVIEWS_COUNT}`
    : `Рейтинг ${FEED_RATING} · Число отзывов ${FEED_REVIEWS_COUNT}`;

  return (
    <div className={`performer-rating ${className}`.trim()}>
      {/* Don't claim "0 rating / 0 reviews" — omit the line entirely, same reasoning
          as suppressing AggregateRating microdata at 0 (Yandex treats it as spam,
          and a visible zero reads worse to buyers than no rating claim at all). */}
      {hasRating && (
        <p className="text-sm text-ink">
          <span itemScope itemType="https://schema.org/AggregateRating">
            <meta itemProp="bestRating" content="5" />
            <meta itemProp="worstRating" content="1" />
            <meta itemProp="ratingValue" content={FEED_RATING} />
            <meta itemProp="reviewCount" content={FEED_REVIEWS_COUNT} />
            {line}
          </span>
        </p>
      )}
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

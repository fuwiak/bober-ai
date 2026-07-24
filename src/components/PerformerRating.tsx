import { FEED_RATING, FEED_REVIEWS_COUNT } from "@/lib/feed-rating";
import { YANDEX_USLUGI_URL } from "@/lib/site";

type PerformerRatingProps = {
  locale?: string;
  className?: string;
};

/** Plain text must match YML exactly — avoid React whitespace holes that break Yandex scrapers. */
export function PerformerRating({ locale = "ru", className = "" }: PerformerRatingProps) {
  const isEn = locale === "en";
  const line = isEn
    ? `Rating ${FEED_RATING} · Reviews ${FEED_REVIEWS_COUNT}`
    : `Рейтинг ${FEED_RATING} · Число отзывов ${FEED_REVIEWS_COUNT}`;

  return (
    <div className={`performer-rating ${className}`.trim()}>
      <p className="text-sm text-ink">
        <span itemScope itemType="https://schema.org/AggregateRating">
          <meta itemProp="bestRating" content="5" />
          <meta itemProp="worstRating" content="1" />
          <meta itemProp="ratingValue" content={FEED_RATING} />
          <meta itemProp="reviewCount" content={FEED_REVIEWS_COUNT} />
          {line}
        </span>
      </p>
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

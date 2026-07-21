import { PROFILE } from "@/lib/profile";
import { YANDEX_USLUGI_URL } from "@/lib/site";

type PerformerRatingProps = {
  locale?: string;
  className?: string;
};

/** Visible rating that must match performers-feed.yml (Yandex moderation). */
export function PerformerRating({ locale = "ru", className = "" }: PerformerRatingProps) {
  const isEn = locale === "en";
  const rating = PROFILE.rating;
  const reviews = PROFILE.reviewsCount;

  return (
    <div
      className={`performer-rating ${className}`.trim()}
      itemScope
      itemType="https://schema.org/AggregateRating"
    >
      <meta itemProp="bestRating" content="5" />
      <meta itemProp="worstRating" content="1" />
      <p className="text-sm text-ink">
        {isEn ? "Rating" : "Рейтинг"}{" "}
        <span itemProp="ratingValue" className="font-medium tabular-nums">
          {rating}
        </span>
        {" · "}
        <span itemProp="reviewCount" className="font-medium tabular-nums">
          {reviews}
        </span>{" "}
        {isEn ? "reviews" : "отзывов"}
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

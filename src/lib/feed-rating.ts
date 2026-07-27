/**
 * YML `Рейтинг` / `Число отзывов` — must match visible text on /services/*.
 * Keep 0 until the rating is verifiable the same way Yandex scrapes the page
 * (docs: new performer / no rating → omit claim entirely; do not publish "0").
 */
export const FEED_RATING = "0";
export const FEED_REVIEWS_COUNT = "0";

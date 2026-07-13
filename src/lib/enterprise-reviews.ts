import { REVIEWS, type Review } from "@/lib/profile";

export type CuratedReview = {
  id: string;
  author: string;
  text: string;
  date?: string;
  source: "Yandex";
};

const YANDEX_IDS = ["evgenia", "olga", "alexey", "nikolay"] as const;

export function getEnterpriseReviews(): CuratedReview[] {
  return YANDEX_IDS.map((id) => REVIEWS.find((r) => r.id === id))
    .filter((r): r is Review => Boolean(r))
    .map((review) => ({
      id: review.id,
      author: review.author,
      text: review.text,
      date: review.date,
      source: "Yandex" as const,
    }));
}

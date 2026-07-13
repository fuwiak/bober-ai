import { AVITO_REVIEWS, REVIEWS, type AvitoReview, type Review } from "@/lib/profile";

export type CuratedReview = {
  id: string;
  author: string;
  text: string;
  date?: string;
  source: "Yandex" | "Avito";
  project?: string;
};

const YANDEX_IDS = ["evgenia", "olga", "alexey", "nikolay"] as const;
const AVITO_IDS = ["avito-denis", "avito-olga"] as const;

export function getEnterpriseReviews(): CuratedReview[] {
  const yandex = YANDEX_IDS.map((id) => REVIEWS.find((r) => r.id === id)).filter((r): r is Review => Boolean(r));
  const avito = AVITO_IDS.map((id) => AVITO_REVIEWS.find((r) => r.id === id)).filter((r): r is AvitoReview => Boolean(r));

  return [
    ...yandex.map((review) => ({
      id: review.id,
      author: review.author,
      text: review.text,
      date: review.date,
      source: "Yandex" as const,
    })),
    ...avito.map((review) => ({
      id: review.id,
      author: review.author,
      text: review.text,
      date: review.date,
      source: "Avito" as const,
    })),
  ].slice(0, 6);
}

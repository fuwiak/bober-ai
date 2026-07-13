import { AVITO_REVIEWS, KWORK_REVIEWS, REVIEWS, type AvitoReview, type KworkReview, type Review } from "@/lib/profile";

export type CuratedReview = {
  id: string;
  author: string;
  text: string;
  date?: string;
  source: "Yandex" | "Avito" | "Kwork";
  project?: string;
};

const YANDEX_IDS = ["evgenia", "olga", "alexey", "nikolay"] as const;
const AVITO_IDS = ["avito-denis", "avito-olga"] as const;
const KWORK_IDS = ["kwork-bashop", "kwork-rodionova", "kwork-martavi"] as const;

export function getEnterpriseReviews(): CuratedReview[] {
  const yandex = YANDEX_IDS.map((id) => REVIEWS.find((r) => r.id === id)).filter((r): r is Review => Boolean(r));
  const avito = AVITO_IDS.map((id) => AVITO_REVIEWS.find((r) => r.id === id)).filter((r): r is AvitoReview => Boolean(r));
  const kwork = KWORK_IDS.map((id) => KWORK_REVIEWS.find((r) => r.id === id)).filter((r): r is KworkReview => Boolean(r));

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
    ...kwork.map((review) => ({
      id: review.id,
      author: review.author,
      text: review.text,
      source: "Kwork" as const,
      project: review.project,
    })),
  ].slice(0, 6);
}

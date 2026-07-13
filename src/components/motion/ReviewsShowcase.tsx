"use client";

import { Reveal } from "@/components/motion/Reveal";
import { ReviewCard } from "@/components/motion/ReviewCard";
import { Stagger } from "@/components/motion/Stagger";
import type { CuratedReview } from "@/lib/enterprise-reviews";

type ReviewsShowcaseProps = {
  title: string;
  subtitle: string;
  reviews: CuratedReview[];
};

export function ReviewsShowcase({ title, subtitle, reviews }: ReviewsShowcaseProps) {
  return (
    <section id="reviews" className="section-band section--deep scroll-mt-16 border-b border-hairline-soft">
      <div className="container-editorial">
        <Reveal>
          <span className="section-label">Verified</span>
          <h2 className="display-sm mt-3">{title}</h2>
          <p className="mt-3 max-w-2xl text-sm text-body">{subtitle}</p>
        </Reveal>
        <Stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={0.09}>
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              author={review.author}
              text={review.text}
              date={review.date}
              source={review.source}
              project={review.project}
            />
          ))}
        </Stagger>
      </div>
    </section>
  );
}

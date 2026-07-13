"use client";

import { Reveal } from "@/components/motion/Reveal";
import { ReviewCard } from "@/components/motion/ReviewCard";
import { Stagger } from "@/components/motion/Stagger";
import type { CuratedReview } from "@/lib/enterprise-reviews";

type ReviewsShowcaseProps = {
  title: string;
  subtitle: string;
  reviews: CuratedReview[];
  sectionLabel: string;
};

export function ReviewsShowcase({ title, subtitle, reviews, sectionLabel }: ReviewsShowcaseProps) {
  const featured = reviews.slice(0, 2);

  return (
    <section id="reviews" className="section-band section--deep scroll-mt-16 border-b border-hairline">
      <div className="container-editorial">
        <Reveal>
          <span className="section-label">{sectionLabel}</span>
          <h2 className="section-title mt-4">{title}</h2>
          <p className="body-copy mt-4 max-w-2xl text-base">{subtitle}</p>
        </Reveal>
        <Stagger className="mt-12 divide-y divide-hairline" stagger={0.05}>
          {featured.map((review) => (
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

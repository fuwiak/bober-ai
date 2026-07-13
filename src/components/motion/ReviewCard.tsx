"use client";

import { StaggerItem } from "@/components/motion/Stagger";

type ReviewCardProps = {
  author: string;
  text: string;
  date?: string;
  source?: string;
  project?: string;
};

export function ReviewCard({ author, text, date, source, project }: ReviewCardProps) {
  return (
    <StaggerItem>
      <article className="review-card">
        {project ? <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">{project}</p> : null}
        <blockquote className="review-card__quote">&ldquo;{text}&rdquo;</blockquote>
        <div className="review-card__meta">
          <div>
            <p className="font-medium text-ink">{author}</p>
            {date ? <p className="mt-1 text-muted">{date}</p> : null}
          </div>
          {source ? <span className="review-card__verified">{source}</span> : null}
        </div>
      </article>
    </StaggerItem>
  );
}

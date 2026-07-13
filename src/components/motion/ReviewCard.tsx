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
      <article className="review-card h-full">
        {project ? <p className="text-xs text-link">{project}</p> : null}
        {source ? <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">{source}</p> : null}
        <p className="mt-2 font-display text-lg tracking-tight text-ink">{author}</p>
        <p className="review-card__rating mt-1" aria-label="5 из 5">
          ★★★★★
        </p>
        {date ? <p className="mt-1 text-xs text-muted">{date}</p> : null}
        <p className="mt-3 text-sm leading-relaxed text-body">{text}</p>
      </article>
    </StaggerItem>
  );
}

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
      <article className="py-12">
        <blockquote className="review-quote">&ldquo;{text}&rdquo;</blockquote>
        <div className="review-meta">
          <p>{author}</p>
          {source ? <p>{source}</p> : null}
          {project ? <p>{project}</p> : null}
          {date ? <p>{date}</p> : null}
        </div>
      </article>
    </StaggerItem>
  );
}

"use client";

import { StaggerItem } from "@/components/motion/Stagger";

export type ImplementationArea = {
  badge: string;
  title: string;
  description: string;
  items: string[];
  layout?: string;
  featured?: boolean;
  slug?: string;
};

type ImplementationCardProps = ImplementationArea & {
  index: number;
  ctaLabel: string;
};

export function ImplementationCard({
  index,
  badge,
  title,
  description,
  items,
  ctaLabel,
}: ImplementationCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <StaggerItem>
      <article className="solution-row">
        <span className="solution-row__index">{number}</span>

        <div>
          <span className="solution-row__badge">{badge}</span>
          <h3 className="card-title mt-3">{title}</h3>
          <p className="body-copy mt-4 max-w-2xl text-base">{description}</p>
          <ul className="mt-4 space-y-1 text-base text-body">
            {items.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </div>

        <a href="#contact" className="solution-row__cta text-link self-start whitespace-nowrap text-[11px] uppercase tracking-[0.16em]">
          {ctaLabel} →
        </a>
      </article>
    </StaggerItem>
  );
}

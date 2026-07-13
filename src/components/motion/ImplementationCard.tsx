"use client";

import { ArrowRight } from "lucide-react";
import { StaggerItem } from "@/components/motion/Stagger";
import type { CardAccent } from "@/lib/motion";

export type ImplementationArea = {
  badge: string;
  title: string;
  description: string;
  items: string[];
  accent: CardAccent;
  featured?: boolean;
  wide?: boolean;
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
  accent,
  featured = false,
  wide = false,
  ctaLabel,
}: ImplementationCardProps) {
  const number = String(index + 1).padStart(2, "0");
  const classes = [
    "implementation-card",
    `implementation-card--${accent}`,
    featured ? "implementation-card--featured" : "",
    wide ? "implementation-card--wide" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <StaggerItem className={wide ? "xl:col-span-8" : "xl:col-span-4"}>
      <article className={classes}>
        <div className="implementation-card__top flex items-center justify-between gap-3">
          <span className="implementation-card__number font-mono text-xs tracking-widest">{number}</span>
          <span className="implementation-card__badge font-mono text-[11px] uppercase tracking-[0.08em]">{badge}</span>
        </div>

        <h3 className="mt-5 font-display text-xl leading-snug tracking-tight md:text-2xl">{title}</h3>

        <p className="mt-3 text-sm leading-relaxed">{description}</p>

        <ul className="mt-4 space-y-1.5 text-sm">
          {items.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-muted">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <a href="#contact" className="card-link">
          {ctaLabel}
          <ArrowRight className="button-arrow h-4 w-4" aria-hidden />
        </a>
      </article>
    </StaggerItem>
  );
}

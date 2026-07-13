"use client";

import { ArrowRight } from "lucide-react";
import { StaggerItem } from "@/components/motion/Stagger";
import type { SolutionLayout } from "@/lib/motion";

export type ImplementationArea = {
  badge: string;
  title: string;
  description: string;
  items: string[];
  layout?: SolutionLayout;
  featured?: boolean;
  slug?: string;
};

type ImplementationCardProps = ImplementationArea & {
  index: number;
  ctaLabel: string;
};

const layoutClass: Record<SolutionLayout, string> = {
  default: "",
  wide: "solution-card--wide",
  large: "solution-card--large light-sweep",
  compact: "solution-card--compact",
};

const spanClass: Record<SolutionLayout, string> = {
  default: "xl:col-span-4",
  wide: "xl:col-span-8",
  large: "xl:col-span-7",
  compact: "xl:col-span-5",
};

export function ImplementationCard({
  index,
  badge,
  title,
  description,
  items,
  layout = "default",
  ctaLabel,
}: ImplementationCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <StaggerItem className={spanClass[layout]}>
      <article className={`solution-card ${layoutClass[layout]}`}>
        <div className="flex items-center justify-between gap-3">
          <span className="solution-card__number">{number}</span>
          <span className="solution-card__badge">{badge}</span>
        </div>

        <h3 className="mt-5 font-display text-xl leading-snug tracking-tight md:text-2xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-body">{description}</p>

        <ul className="mt-4 space-y-1.5 text-sm text-body">
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

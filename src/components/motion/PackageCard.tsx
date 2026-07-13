"use client";

import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { StaggerItem } from "@/components/motion/Stagger";

export type PackageItem = {
  name: string;
  price: string;
  duration: string;
  forWhom: string;
  result?: string;
  includes: string[];
  featured?: boolean;
  detailsHref?: string;
};

type PackageCardProps = PackageItem & {
  ctaLabel: string;
  featuredLabel: string;
  detailsLabel: string;
};

export function PackageCard({
  name,
  price,
  duration,
  forWhom,
  result,
  includes,
  featured = false,
  detailsHref,
  ctaLabel,
  featuredLabel,
  detailsLabel,
}: PackageCardProps) {
  return (
    <StaggerItem>
      <article className={`package-card ${featured ? "package-card--featured" : ""}`}>
        {featured ? (
          <span className="mb-3 inline-flex w-fit rounded-full border border-accent-green/30 bg-accent-green/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-accent-green">
            {featuredLabel}
          </span>
        ) : null}

        <h3 className="font-display text-xl tracking-tight text-ink md:text-2xl">{name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-body">{forWhom}</p>
        {result ? <p className="mt-2 text-sm font-medium text-ink">{result}</p> : null}

        <ul className="mt-5 flex-1 space-y-2 text-sm text-body">
          {includes.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-accent-green">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="package-card__price mt-8">{price}</p>
        <p className="package-card__duration mt-1">{duration}</p>

        <a href="#contact" className="btn-primary mt-6 w-full text-center text-sm">
          {ctaLabel}
          <ArrowRight className="button-arrow h-4 w-4" aria-hidden />
        </a>

        {detailsHref ? (
          <Link href={detailsHref as "/"} className="card-link mt-3 justify-center text-muted">
            {detailsLabel}
            <ArrowRight className="button-arrow h-3.5 w-3.5" aria-hidden />
          </Link>
        ) : null}
      </article>
    </StaggerItem>
  );
}

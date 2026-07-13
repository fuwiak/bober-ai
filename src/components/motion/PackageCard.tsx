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
  tier?: "discovery" | "implementation" | "retainer";
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
  tier = "discovery",
  detailsHref,
  ctaLabel,
  featuredLabel,
  detailsLabel,
}: PackageCardProps) {
  const tierClass =
    tier === "implementation" || featured
      ? "package-card--featured light-sweep"
      : tier === "retainer"
        ? "package-card--retainer"
        : "package-card--discovery";

  return (
    <StaggerItem>
      <article className={`package-card ${tierClass}`}>
        {featured ? <span className="badge-accent mb-4">{featuredLabel}</span> : null}

        <h3 className="font-display text-xl tracking-tight text-ink md:text-2xl">{name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-body">{forWhom}</p>
        {result ? <p className="mt-2 text-sm text-body-strong">{result}</p> : null}

        <ul className="mt-5 flex-1 space-y-2 text-sm text-body">
          {includes.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-accent-primary-light">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className={`package-card__price mt-8 ${featured ? "package-card__price--warm" : ""}`}>{price}</p>
        <p className="package-card__duration mt-1">{duration}</p>

        <a href="#contact" className="btn-primary mt-6 w-full text-center text-sm">
          {ctaLabel}
          <ArrowRight className="button-arrow h-4 w-4" aria-hidden />
        </a>

        {detailsHref ? (
          <Link href={detailsHref as "/"} className="card-link mt-3 justify-center">
            {detailsLabel}
            <ArrowRight className="button-arrow h-3.5 w-3.5" aria-hidden />
          </Link>
        ) : null}
      </article>
    </StaggerItem>
  );
}

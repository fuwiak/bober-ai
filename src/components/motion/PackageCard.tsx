"use client";

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
  index: number;
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
  detailsLabel,
  index,
}: PackageCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <StaggerItem>
      <article className={`engagement-row ${featured ? "engagement-row--featured" : ""}`}>
        <span className="engagement-row__index">{number}</span>

        <div className="engagement-row__main">
          <h3 className="card-title">{name}</h3>
          <p className="body-copy mt-4 max-w-2xl text-base">{forWhom}</p>
          {result ? <p className="mt-3 text-base text-body-strong">{result}</p> : null}
          <ul className="mt-6 space-y-2 text-base text-body">
            {includes.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </div>

        <div className="engagement-row__meta">
          <span className="engagement-row__price">{price}</span>
          <span>{duration}</span>
        </div>

        <div className="engagement-row__cta flex flex-col gap-3">
          <a href="#contact" className="btn-primary whitespace-nowrap">
            {ctaLabel}
          </a>
          {detailsHref ? (
            <Link href={detailsHref as "/"} className="text-link text-center text-[11px] uppercase tracking-[0.16em]">
              {detailsLabel}
            </Link>
          ) : null}
        </div>
      </article>
    </StaggerItem>
  );
}

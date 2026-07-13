"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "@/i18n/navigation";
import type { PortfolioItem } from "@/lib/profile";
import { hoverTransition } from "@/lib/motion";

type PortfolioCardProps = {
  item: PortfolioItem;
  detailsLabel: string;
};

export function PortfolioCard({ item, detailsLabel }: PortfolioCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      layout
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
      transition={hoverTransition}
      className="group"
    >
      <Link
        href={`/portfolio/${item.slug}`}
        className="card-kts block overflow-hidden rounded-2xl border border-hairline bg-canvas"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-card">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.215,0.61,0.355,1)] group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 ease-[cubic-bezier(0.215,0.61,0.355,1)] group-hover:bg-ink/10" />
        </div>

        <div className="card-kts-body flex flex-col gap-3 p-5 md:p-6">
          <div className="flex flex-wrap gap-2">
            <span className="badge-pill text-[11px] uppercase tracking-wider">{item.category}</span>
            {item.skills?.slice(0, 2).map((skill) => (
              <span key={skill} className="badge-pill text-[11px] text-muted">
                {skill}
              </span>
            ))}
          </div>

          <h3 className="font-display text-lg leading-snug tracking-tight text-ink transition-colors duration-500 group-hover:text-primary md:text-xl">
            {item.title}
          </h3>

          {item.description ? (
            <p className="line-clamp-2 text-sm leading-relaxed text-body transition-colors duration-500 group-hover:text-body-strong">
              {item.description}
            </p>
          ) : null}

          <div className="mt-auto flex items-center justify-between gap-3 pt-2">
            {item.priceLabel ? (
              <p className="font-display text-lg tracking-tight text-primary">{item.priceLabel}</p>
            ) : (
              <span />
            )}
            <span className="btn-kts-pill">
              {detailsLabel}
              <span className="btn-kts-arrow" aria-hidden>
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

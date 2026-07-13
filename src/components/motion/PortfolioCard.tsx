"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { PortfolioItem } from "@/lib/profile";

type PortfolioCardProps = {
  item: PortfolioItem;
  detailsLabel: string;
};

export function PortfolioCard({ item, detailsLabel }: PortfolioCardProps) {
  return (
    <article className="case-study">
      <Link href={`/portfolio/${item.slug}`} className="group block">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-soft">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="case-study__image"
          />
        </div>

        <div className="case-study__meta">
          <span>
            {item.category}
            {item.skills?.length ? ` · ${item.skills.slice(0, 2).join(" · ")}` : ""}
          </span>
          {item.priceLabel ? <span>{item.priceLabel}</span> : null}
        </div>

        <h3 className="case-study__title">{item.title}</h3>

        {item.description ? <p className="case-study__desc">{item.description}</p> : null}

        <span className="mt-6 inline-block text-link text-[11px] uppercase tracking-[0.16em]">
          {detailsLabel} →
        </span>
      </Link>
    </article>
  );
}

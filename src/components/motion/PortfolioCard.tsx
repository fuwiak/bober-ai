"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { EditorialImageFrame } from "@/components/EditorialImageFrame";
import type { PortfolioItem } from "@/lib/profile";

type PortfolioCardProps = {
  item: PortfolioItem;
  detailsLabel: string;
};

export function PortfolioCard({ item, detailsLabel }: PortfolioCardProps) {
  return (
    <article className="case-study">
      <Link href={`/portfolio/${item.slug}`} className="group block">
        <EditorialImageFrame variant="card" className="aspect-[16/10] w-full bg-surface-soft">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="case-study__image"
          />
        </EditorialImageFrame>

        <div className="case-study__meta">
          <span>
            {item.category}
            {item.skills?.length ? ` · ${item.skills.slice(0, 2).join(" · ")}` : ""}
          </span>
          {item.priceLabel ? <span>{item.priceLabel}</span> : null}
        </div>

        <h3 className="case-study__title">{item.title}</h3>

        {item.description ? <p className="case-study__desc">{item.description}</p> : null}

        <span className="link-more mt-6">
          {detailsLabel}
        </span>
      </Link>
    </article>
  );
}

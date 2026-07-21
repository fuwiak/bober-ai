"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { reachGoal } from "@/lib/analytics";
import type { PortfolioItem } from "@/lib/profile";

type CaseStudyCardProps = {
  item: PortfolioItem;
  viewLabel: string;
};

export function CaseStudyCard({ item, viewLabel }: CaseStudyCardProps) {
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="feature-card-bordered block transition-opacity hover:opacity-90"
      onClick={() => reachGoal("case_study_view", { slug: item.slug })}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-surface-soft">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 420px"
          unoptimized={item.image.endsWith(".png")}
        />
      </div>
      <h3 className="mt-5 font-display text-2xl tracking-tight">{item.title}</h3>
      {item.metric ? <p className="case-study__metric mt-3">{item.metric}</p> : null}
      {item.metricMethod ? <p className="body-copy mt-2 text-sm text-muted">{item.metricMethod}</p> : null}
      {item.stack ? <p className="meta-label mt-3">{item.stack}</p> : null}
      {item.result ? <p className="body-copy mt-3 text-base">{item.result}</p> : null}
      {item.priceLabel ? <p className="meta-label mt-4">{item.priceLabel}</p> : null}
      <span className="link-more mt-4">{viewLabel}</span>
    </Link>
  );
}

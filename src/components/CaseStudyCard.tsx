"use client";

import Image from "next/image";
import { ContactCta } from "@/components/ContactCta";
import { PortfolioImageBadge } from "@/components/PortfolioImageBadge";
import { Link } from "@/i18n/navigation";
import { reachGoal } from "@/lib/analytics";
import type { PortfolioItem } from "@/lib/profile";

type CaseStudyCardProps = {
  item: PortfolioItem;
  viewLabel: string;
  beforeLabel?: string;
  afterLabel?: string;
  discussLabel?: string;
  /** МСБ / Корпорации — если передан, показывается над заголовком. */
  segmentLabel?: string;
};

export function CaseStudyCard({
  item,
  viewLabel,
  beforeLabel,
  afterLabel,
  discussLabel,
  segmentLabel,
}: CaseStudyCardProps) {
  return (
    <article className="feature-card-bordered">
      <Link
        href={`/portfolio/${item.slug}`}
        className="block transition-opacity hover:opacity-90"
        onClick={() => reachGoal("case_study_view", { slug: item.slug })}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-surface-soft">
          <Image
            src={item.image}
            alt={item.imageAlt ?? item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 420px"
            unoptimized={item.image.endsWith(".png")}
          />
          {item.imageBadge ? <PortfolioImageBadge label={item.imageBadge} /> : null}
        </div>
        {item.imageCaption ? (
          <p className="mt-2 text-sm text-muted">{item.imageCaption}</p>
        ) : null}
        {segmentLabel ? <p className="meta-label mt-5">{segmentLabel}</p> : null}
        <h3 className={`font-display text-2xl tracking-tight ${segmentLabel ? "mt-2" : "mt-5"}`}>
          {item.title}
        </h3>
        {item.metric ? <p className="case-study__metric mt-3">{item.metric}</p> : null}
        {item.metricMethod ? <p className="body-copy mt-2 text-sm text-muted">{item.metricMethod}</p> : null}
      </Link>

      {item.description || item.result ? (
        <div className="case-study__before-after mt-4 space-y-3">
          {item.description && beforeLabel ? (
            <div>
              <p className="meta-label">{beforeLabel}</p>
              <p className="body-copy mt-1 text-sm">{item.description}</p>
            </div>
          ) : null}
          {item.result && afterLabel ? (
            <div>
              <p className="meta-label">{afterLabel}</p>
              <p className="body-copy mt-1 text-sm text-ink">{item.result}</p>
            </div>
          ) : item.result ? (
            <p className="body-copy mt-3 text-base">{item.result}</p>
          ) : null}
        </div>
      ) : null}

      {item.stack ? <p className="meta-label mt-3">{item.stack}</p> : null}
      {item.priceLabel ? (
        <div className="mt-4">
          <p className="meta-label">{item.priceLabel}</p>
          {item.imageBadge ? <p className="mt-1 text-sm text-muted">{item.imageBadge}</p> : null}
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <Link
          href={`/portfolio/${item.slug}`}
          className="link-more"
          onClick={() => reachGoal("case_study_view", { slug: item.slug })}
        >
          {viewLabel}
        </Link>
        {discussLabel ? (
          <ContactCta
            variant="link"
            goal="case_study_discuss_click"
            defaultService={item.title}
            abTestDestination={false}
          >
            {discussLabel}
          </ContactCta>
        ) : null}
      </div>
    </article>
  );
}

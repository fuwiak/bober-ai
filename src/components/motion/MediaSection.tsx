"use client";

import { ArrowRight } from "lucide-react";
import { MediaCard } from "@/components/motion/MediaCard";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import type { MediaItem } from "@/lib/media";

type MediaSectionProps = {
  items: MediaItem[];
  locale: string;
  label: string;
  title: string;
  subtitle: string;
  videoCta: string;
  articleCta: string;
  videoAriaLabel: string;
  articleAriaLabel: string;
  footerNote: string;
  footerLinkLabel: string;
  footerLinkHref: string;
};

export function MediaSection({
  items,
  locale,
  label,
  title,
  subtitle,
  videoCta,
  articleCta,
  videoAriaLabel,
  articleAriaLabel,
  footerNote,
  footerLinkLabel,
  footerLinkHref,
}: MediaSectionProps) {
  const ordered = [...items].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <section id="media" className="media-section section-band scroll-mt-16 border-b border-hairline-soft bg-surface-soft">
      <div className="container-editorial">
        <Reveal>
          <span className="section-label">{label}</span>
          <h2 className="display-sm mt-3">{title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-body">{subtitle}</p>
        </Reveal>

        <Stagger className="media-grid mt-10" stagger={0.07}>
          {ordered.map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              locale={locale}
              videoCta={videoCta}
              articleCta={articleCta}
              videoAriaLabel={videoAriaLabel}
              articleAriaLabel={articleAriaLabel}
            />
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm text-muted">{footerNote}</p>
          <a href={footerLinkHref} className="inline-flex items-center gap-2 text-sm font-medium text-link">
            {footerLinkLabel}
            <ArrowRight className="button-arrow h-4 w-4" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

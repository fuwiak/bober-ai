"use client";

import { Reveal } from "@/components/motion/Reveal";
import { MediaCard } from "@/components/motion/MediaCard";
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
    <section id="media" className="media-section section-band scroll-mt-16">
      <div className="container-editorial">
        <Reveal>
          <span className="section-label">{label}</span>
          <h2 className="section-title mt-4">{title}</h2>
          <p className="body-copy mt-4 max-w-3xl text-base">{subtitle}</p>
        </Reveal>

        <Stagger className="media-grid mt-12" stagger={0.05}>
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

        <Reveal delay={0.15} className="mt-12 flex flex-col gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-base text-muted">{footerNote}</p>
          <a href={footerLinkHref} className="text-link text-[11px] uppercase tracking-[0.16em]">
            {footerLinkLabel}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

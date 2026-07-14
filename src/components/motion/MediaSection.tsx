"use client";

import { ContactCta } from "@/components/ContactCta";
import { Reveal } from "@/components/motion/Reveal";
import { MediaCard } from "@/components/motion/MediaCard";
import { Stagger } from "@/components/motion/Stagger";
import { MEDIA_PUBLISHERS, type MediaItem } from "@/lib/media";

type MediaSectionProps = {
  items: MediaItem[];
  locale: string;
  label: string;
  title: string;
  subtitle: string;
  asSeenIn: string;
  videoCta: string;
  articleCta: string;
  videoAriaLabel: string;
  articleAriaLabel: string;
  footerNote: string;
  footerLinkLabel: string;
};

export function MediaSection({
  items,
  locale,
  label,
  title,
  subtitle,
  asSeenIn,
  videoCta,
  articleCta,
  videoAriaLabel,
  articleAriaLabel,
  footerNote,
  footerLinkLabel,
}: MediaSectionProps) {
  const ordered = [...items].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <section id="media" className="media-section section-band scroll-mt-16">
      <div className="container-editorial">
        <Reveal>
          <span className="section-label">{label}</span>
          <h2 className="section-title mt-4">{title}</h2>
          <p className="body-copy mt-4 max-w-3xl text-base">{subtitle}</p>
          <div className="media-publishers mt-8">
            <p className="meta-label">{asSeenIn}</p>
            <div className="media-publishers__logos mt-4 flex flex-wrap gap-3">
              {MEDIA_PUBLISHERS.map((publisher) => (
                <span key={publisher.id} className="media-publisher-logo" title={publisher.name}>
                  {publisher.logoLabel}
                </span>
              ))}
            </div>
          </div>
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
          <ContactCta variant="link">{footerLinkLabel}</ContactCta>
        </Reveal>
      </div>
    </section>
  );
}

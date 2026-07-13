"use client";

import { ExternalLink, Play } from "lucide-react";
import { StaggerItem } from "@/components/motion/Stagger";
import { formatMediaDate, getYoutubeThumbnail, type MediaItem } from "@/lib/media";

type MediaCardProps = {
  item: MediaItem;
  locale: string;
  videoCta: string;
  articleCta: string;
  videoAriaLabel: string;
  articleAriaLabel: string;
};

export function MediaCard({ item, locale, videoCta, articleCta, videoAriaLabel, articleAriaLabel }: MediaCardProps) {
  const isVideo = item.type === "video";
  const cta = isVideo ? videoCta : articleCta;
  const ariaLabel = isVideo
    ? videoAriaLabel.replace("{publisher}", item.publisher)
    : articleAriaLabel.replace("{publisher}", item.publisher).replace("{title}", item.title);

  const cardClass = ["media-card", isVideo ? "media-card--video light-sweep" : "media-card--article"].join(" ");

  return (
    <StaggerItem className={item.featured ? "media-card__slot--featured" : "media-card__slot"}>
      <a href={item.url} target="_blank" rel="noopener noreferrer" className={cardClass} aria-label={ariaLabel}>
        {isVideo && item.youtubeId ? (
          <div className="media-card__visual">
            <img
              src={getYoutubeThumbnail(item.youtubeId)}
              alt=""
              loading="lazy"
              decoding="async"
              className="media-card__thumbnail"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070a]/70 via-transparent to-transparent" />
            <span className="media-card__play" aria-hidden="true">
              <Play className="h-5 w-5 fill-current" />
            </span>
          </div>
        ) : (
          <div className="media-card__visual media-card__visual--editorial" aria-hidden="true">
            <span className="font-display text-lg tracking-tight text-ink md:text-xl">{item.publisher}</span>
          </div>
        )}

        <div className="media-card__content">
          <div className="media-card__meta">
            <span className="media-card__publisher">{item.publisher}</span>
            <span className="media-card__category">{item.category}</span>
          </div>
          <h3 className="media-card__title">{item.title}</h3>
          <p className="media-card__description">{item.description}</p>
          {item.publishedAt ? (
            <time className="media-card__date" dateTime={item.publishedAt}>
              {formatMediaDate(item.publishedAt, locale)}
            </time>
          ) : null}
          <span className="media-card__link">
            {cta}
            <ExternalLink className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </a>
    </StaggerItem>
  );
}

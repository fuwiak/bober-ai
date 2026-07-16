"use client";

import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import type { CredibilityItem, CredibilityMarket } from "@/lib/media";

type FounderCredibilitySectionProps = {
  locale: string;
  label: string;
  title: string;
  subtitle: string;
  body: string;
  proofItems: string[];
  tabRussian: string;
  tabInternational: string;
  russianItems: CredibilityItem[];
  internationalItems: CredibilityItem[];
  dossierCta: string;
  closing: string;
};

function CredibilityCard({ item }: { item: CredibilityItem }) {
  return (
    <article className="credibility-card">
      <div className="credibility-card__top">
        <span className="credibility-card__source" aria-hidden="true">
          {item.sourceShort}
        </span>
        <span className="credibility-card__type">{item.type}</span>
      </div>
      <h3 className="credibility-card__title">{item.title}</h3>
      <p className="credibility-card__description">{item.description}</p>
      <p className="credibility-card__meta">{item.meta}</p>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="credibility-card__cta"
        aria-label={`${item.cta}: ${item.title}`}
      >
        <span>{item.cta}</span>
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
      {item.secondaryLinks?.length ? (
        <div className="credibility-card__secondary">
          {item.secondaryLinks.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="text-link text-xs">
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function Panel({
  id,
  labelledBy,
  active,
  items,
}: {
  id: string;
  labelledBy: string;
  active: boolean;
  items: CredibilityItem[];
}) {
  return (
    <div
      id={id}
      role="tabpanel"
      aria-labelledby={labelledBy}
      hidden={!active}
      className="credibility-panel"
    >
      <div className="credibility-grid">
        {items.map((item) => (
          <CredibilityCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export function FounderCredibilitySection({
  locale,
  label,
  title,
  subtitle,
  body,
  proofItems,
  tabRussian,
  tabInternational,
  russianItems,
  internationalItems,
  dossierCta,
  closing,
}: FounderCredibilitySectionProps) {
  const baseId = useId();
  const defaultTab: CredibilityMarket = locale === "en" ? "international" : "russian";
  const [tab, setTab] = useState<CredibilityMarket>(defaultTab);

  const russianTabId = `${baseId}-tab-russian`;
  const internationalTabId = `${baseId}-tab-international`;
  const russianPanelId = `${baseId}-panel-russian`;
  const internationalPanelId = `${baseId}-panel-international`;

  return (
    <section id="media" className="credibility-section section-band section--deep scroll-mt-16 border-t border-hairline">
      <div className="container-editorial">
        <Reveal>
          <span className="section-label">{label}</span>
          <h2 className="section-title mt-4 max-w-4xl">{title}</h2>
          <p className="body-copy mt-4 max-w-3xl text-base text-muted">{subtitle}</p>
          <p className="body-copy mt-4 max-w-3xl text-base">{body}</p>
        </Reveal>

        <ul className="credibility-proof mt-10" aria-label={locale === "en" ? "Key proof points" : "Ключевые подтверждения"}>
          {proofItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="credibility-tabs mt-10" role="tablist" aria-label={locale === "en" ? "Market focus" : "Фокус рынка"}>
          <button
            type="button"
            role="tab"
            id={russianTabId}
            aria-selected={tab === "russian"}
            aria-controls={russianPanelId}
            className={`credibility-tab${tab === "russian" ? " credibility-tab--active" : ""}`}
            onClick={() => setTab("russian")}
          >
            {tabRussian}
          </button>
          <button
            type="button"
            role="tab"
            id={internationalTabId}
            aria-selected={tab === "international"}
            aria-controls={internationalPanelId}
            className={`credibility-tab${tab === "international" ? " credibility-tab--active" : ""}`}
            onClick={() => setTab("international")}
          >
            {tabInternational}
          </button>
        </div>

        {/* Both panels remain in the HTML document for crawlers. */}
        <div className="mt-8">
          <div
            id={russianPanelId}
            role="tabpanel"
            aria-labelledby={russianTabId}
            data-active={tab === "russian" ? "true" : "false"}
            className={`credibility-panel${tab === "russian" ? "" : " credibility-panel--inactive"}`}
          >
            <div className="credibility-grid">
              {russianItems.map((item) => (
                <CredibilityCard key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div
            id={internationalPanelId}
            role="tabpanel"
            aria-labelledby={internationalTabId}
            data-active={tab === "international" ? "true" : "false"}
            className={`credibility-panel${tab === "international" ? "" : " credibility-panel--inactive"}`}
          >
            <div className="credibility-grid">
              {internationalItems.map((item) => (
                <CredibilityCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Noscript fallback: always show both markets */}
        <noscript>
          <div className="credibility-grid mt-8">
            {[...russianItems, ...internationalItems].map((item) => (
              <CredibilityCard key={`ns-${item.id}`} item={item} />
            ))}
          </div>
        </noscript>

        <Reveal delay={0.1} className="mt-12 border-t border-hairline pt-8">
          <p className="body-copy max-w-3xl text-base text-muted">{closing}</p>
          <Link href="/media" className="text-link mt-4 inline-flex items-center gap-2 text-sm">
            {dossierCta}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

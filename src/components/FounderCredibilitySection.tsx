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
  showDossierLink?: boolean;
  /** When false, render intro only (no tabbed cards) — used on /media to avoid DOM duplicates with dossier sections. */
  showCards?: boolean;
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
  showDossierLink = true,
  showCards = true,
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
          {showDossierLink ? (
            <h2 className="section-title mt-4 max-w-4xl">{title}</h2>
          ) : (
            <h1 className="section-title mt-4 max-w-4xl">{title}</h1>
          )}
          <p className="body-copy mt-4 max-w-3xl text-base text-muted">{subtitle}</p>
          <p className="body-copy mt-4 max-w-3xl text-base">{body}</p>
        </Reveal>

        <ul className="credibility-proof mt-10" aria-label={locale === "en" ? "Key proof points" : "Ключевые подтверждения"}>
          {proofItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {showCards ? (
          <>
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

            {/* Only the active panel stays in the accessibility tree — avoids duplicate card DOM. */}
            <div className="mt-8">
              {tab === "russian" ? (
                <div
                  id={russianPanelId}
                  role="tabpanel"
                  aria-labelledby={russianTabId}
                  className="credibility-panel"
                >
                  <div className="credibility-grid">
                    {russianItems.map((item) => (
                      <CredibilityCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  id={internationalPanelId}
                  role="tabpanel"
                  aria-labelledby={internationalTabId}
                  className="credibility-panel"
                >
                  <div className="credibility-grid">
                    {internationalItems.map((item) => (
                      <CredibilityCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : null}

        <Reveal delay={0.1} className={`border-t border-hairline pt-8 ${showCards ? "mt-12" : "mt-10"}`}>
          <p className="body-copy max-w-3xl text-base text-muted">{closing}</p>
          {showDossierLink ? (
            <Link href="/media" className="text-link mt-4 inline-flex items-center gap-2 text-sm">
              {dossierCta}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}

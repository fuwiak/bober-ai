"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";

type TrustStat = {
  value: string;
  label: string;
};

type TrustBenefit = {
  title: string;
  text: string;
};

type TrustStripProps = {
  stats: TrustStat[];
  benefits?: TrustBenefit[];
};

export function TrustStrip({ stats, benefits }: TrustStripProps) {
  const t = useTranslations("trust");
  const benefitItems =
    benefits ??
    ((t.raw("benefits") as TrustBenefit[] | undefined) ?? []);

  return (
    <div className="trust-strip">
      <Reveal>
        <div className="trust-specs">
          {stats.map((stat) => (
            <div key={stat.label} className="spec-cell">
              <span className="spec-value">{stat.value}</span>
              <span className="spec-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
      {benefitItems.length > 0 ? (
        <Reveal delay={0.1}>
          <div className="trust-benefits" aria-label={t("partnersAriaLabel")}>
            {benefitItems.map((item) => (
              <div key={item.title} className="trust-benefit">
                <p className="trust-benefit__title">{item.title}</p>
                <p className="trust-benefit__text">{item.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      ) : null}
    </div>
  );
}

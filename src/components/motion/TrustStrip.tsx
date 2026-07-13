"use client";

import { Reveal } from "@/components/motion/Reveal";

type TrustStat = {
  value: string;
  label: string;
};

type TrustStripProps = {
  stats: TrustStat[];
  logos: string[];
};

export function TrustStrip({ stats, logos }: TrustStripProps) {
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
      <Reveal delay={0.1}>
        <div className="trust-logos">
          {logos.map((logo) => (
            <span key={logo}>{logo}</span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { TRUST_PARTNERS } from "@/lib/trust-partners";

type TrustStat = {
  value: string;
  label: string;
};

type TrustStripProps = {
  stats: TrustStat[];
};

export function TrustStrip({ stats }: TrustStripProps) {
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
        <div className="trust-logos" aria-label="Technology partners">
          {TRUST_PARTNERS.map((partner) => (
            <div key={partner.id} className="trust-logo">
              <div className="trust-logo__mark">
                <Image
                  src={partner.logoSrc}
                  alt=""
                  width={28}
                  height={28}
                  className="trust-logo__icon"
                  aria-hidden
                />
              </div>
              <span className="trust-logo__name">{partner.name}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

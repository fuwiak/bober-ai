"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("trust");

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
        <div className="trust-logos" aria-label={t("partnersAriaLabel")}>
          {TRUST_PARTNERS.map((partner) => {
            const program = partner.href ? t(`partnerPrograms.${partner.id}`) : null;
            const logo = (
              <>
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
                {program ? <span className="trust-logo__program">{program}</span> : null}
              </>
            );

            if (partner.href) {
              return (
                <a
                  key={partner.id}
                  href={partner.href}
                  target="_blank"
                  rel="noreferrer"
                  className="trust-logo trust-logo--linked"
                  aria-label={`${partner.name} — ${program}`}
                >
                  {logo}
                </a>
              );
            }

            return (
              <div key={partner.id} className="trust-logo">
                {logo}
              </div>
            );
          })}
        </div>
      </Reveal>
    </div>
  );
}

"use client";

import { Reveal } from "@/components/motion/Reveal";

type TrustStripProps = {
  items: string[];
  logos: string[];
};

export function TrustStrip({ items, logos }: TrustStripProps) {
  return (
    <div className="trust-strip">
      <Reveal>
        <div className="trust-strip__metrics">
          {items.map((item) => (
            <span key={item} className="trust-strip__metric">
              {item}
            </span>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="trust-strip__divider" aria-hidden />
        <div className="trust-strip__logos">
          {logos.map((logo) => (
            <span key={logo} className="trust-strip__logo">
              {logo}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

"use client";

import { ContactCta } from "@/components/ContactCta";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";

export type LeadMagnetItem = {
  id: string;
  title: string;
  description: string;
  cta: string;
  href?: string;
  service?: string;
};

type LeadMagnetsSectionProps = {
  label: string;
  title: string;
  subtitle: string;
  items: LeadMagnetItem[];
};

export function LeadMagnetsSection({ label, title, subtitle, items }: LeadMagnetsSectionProps) {
  return (
    <section id="resources" className="section-band section--deep scroll-mt-16 border-b border-hairline">
      <div className="container-editorial">
        <Reveal>
          <span className="section-label">{label}</span>
          <h2 className="section-title mt-4">{title}</h2>
          <p className="body-copy mt-4 max-w-2xl text-base">{subtitle}</p>
        </Reveal>
        <div className="lead-magnets mt-10">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={0.04 * index} className="lead-magnet">
              <h3 className="lead-magnet__title">{item.title}</h3>
              <p className="body-copy mt-3 text-base">{item.description}</p>
              <div className="mt-6">
                {item.href ? (
                  <Link href={item.href as "/"} className="btn-secondary">
                    {item.cta}
                  </Link>
                ) : (
                  <ContactCta
                    goal="lead_magnet_cta_click"
                    defaultService={item.service || item.title}
                  >
                    {item.cta}
                  </ContactCta>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ContactCta } from "@/components/ContactCta";
import { Reveal } from "@/components/motion/Reveal";

type SectionCtaBandProps = {
  title: string;
  duration: string;
  commitment: string;
  format: string;
  cta: string;
  urgency?: string;
  className?: string;
};

export function SectionCtaBand({
  title,
  duration,
  commitment,
  format,
  cta,
  urgency,
  className = "",
}: SectionCtaBandProps) {
  return (
    <section className={`section-cta-band border-b border-hairline ${className}`.trim()}>
      <div className="container-editorial">
        <Reveal>
          <div className="section-cta-band__inner">
            <div>
              <h2 className="section-cta-band__title">{title}</h2>
              <ul className="section-cta-band__meta">
                <li>{duration}</li>
                <li>{commitment}</li>
                <li>{format}</li>
              </ul>
              {urgency ? <p className="body-copy mt-4 max-w-xl text-sm">{urgency}</p> : null}
            </div>
            <ContactCta goal="audit_cta_click">{cta}</ContactCta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

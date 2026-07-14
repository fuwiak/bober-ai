import { ContactCta } from "@/components/ContactCta";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

type MicroConversionItem = {
  title: string;
  description: string;
  cta: string;
  service: string;
};

type MicroConversionsSectionProps = {
  label: string;
  title: string;
  subtitle: string;
  items: MicroConversionItem[];
};

export function MicroConversionsSection({ label, title, subtitle, items }: MicroConversionsSectionProps) {
  return (
    <section className="section-band section--panel border-b border-hairline">
      <div className="container-editorial">
        <Reveal>
          <span className="section-label">{label}</span>
          <h2 className="section-title mt-4">{title}</h2>
          <p className="body-copy mt-4 max-w-2xl text-base">{subtitle}</p>
        </Reveal>
        <Stagger className="micro-conversions-grid mt-10">
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <article className="micro-conversion-card">
                <h3 className="card-title text-xl">{item.title}</h3>
                <p className="body-copy mt-3 text-base">{item.description}</p>
                <ContactCta className="mt-6" defaultService={item.service} goal="micro_conversion_click">
                  {item.cta}
                </ContactCta>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

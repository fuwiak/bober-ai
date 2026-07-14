import { Reveal } from "@/components/motion/Reveal";
import { faqJsonLd } from "@/lib/seo";

type FaqItem = {
  q: string;
  a: string;
};

type FaqSectionProps = {
  id?: string;
  label?: string;
  title: string;
  subtitle?: string;
  items: FaqItem[];
  className?: string;
};

export function FaqSection({ id, label, title, subtitle, items, className = "" }: FaqSectionProps) {
  const faqSchema = faqJsonLd(items);

  return (
    <section id={id} className={`section-band section--panel scroll-mt-16 border-b border-hairline ${className}`.trim()}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="container-editorial max-w-3xl">
        <Reveal>
          {label ? <span className="section-label">{label}</span> : null}
          <h2 className="section-title mt-4">{title}</h2>
          {subtitle ? <p className="body-copy mt-4 text-base">{subtitle}</p> : null}
        </Reveal>
        <dl className="mt-10 space-y-8">
          {items.map((item, index) => (
            <Reveal key={item.q} delay={index * 0.02}>
              <div>
                <dt className="font-display text-xl tracking-tight">{item.q}</dt>
                <dd className="body-copy mt-3 text-base">{item.a}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

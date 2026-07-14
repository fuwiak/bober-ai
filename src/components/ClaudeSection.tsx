import { ContactCta } from "@/components/ContactCta";
import { Reveal } from "@/components/motion/Reveal";
import { faqJsonLd } from "@/lib/seo";

type ClaudeFaqItem = {
  q: string;
  a: string;
};

type ClaudeSectionProps = {
  id?: string;
  label: string;
  title: string;
  subtitle: string;
  popularLabel: string;
  terms: string[];
  items: ClaudeFaqItem[];
  cta: string;
};

export function ClaudeSection({
  id = "claude",
  label,
  title,
  subtitle,
  popularLabel,
  terms,
  items,
  cta,
}: ClaudeSectionProps) {
  const faqSchema = faqJsonLd(items);

  return (
    <section id={id} className="section-band section--deep scroll-mt-16 border-b border-hairline">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="container-editorial max-w-3xl">
        <Reveal>
          <span className="section-label">{label}</span>
          <h2 className="section-title mt-4">{title}</h2>
          <p className="body-copy mt-4 text-base">{subtitle}</p>
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          <p className="meta-label">{popularLabel}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {terms.map((term) => (
              <li key={term}>
                <span className="skill-chip">{term}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <dl className="mt-12 space-y-8">
          {items.map((item, index) => (
            <Reveal key={item.q} delay={index * 0.02}>
              <div>
                <dt className="font-display text-xl tracking-tight">{item.q}</dt>
                <dd className="body-copy mt-3 text-base">{item.a}</dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={0.1} className="mt-10">
          <ContactCta>{cta}</ContactCta>
        </Reveal>
      </div>
    </section>
  );
}

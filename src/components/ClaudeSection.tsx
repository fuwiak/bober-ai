import { ContactCta } from "@/components/ContactCta";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";

type ClaudeSectionProps = {
  id?: string;
  label: string;
  title: string;
  subtitle: string;
  popularLabel: string;
  terms: string[];
  glossaryLink: string;
  cta: string;
};

export function ClaudeSection({
  id = "claude",
  label,
  title,
  subtitle,
  popularLabel,
  terms,
  glossaryLink,
  cta,
}: ClaudeSectionProps) {
  return (
    <section id={id} className="section-band section--deep scroll-mt-16 border-b border-hairline">
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

        <Reveal delay={0.08} className="mt-10">
          <Link href="/guides/ai-glossary" className="text-link text-[11px] uppercase tracking-[0.16em]">
            {glossaryLink} →
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <ContactCta>{cta}</ContactCta>
        </Reveal>
      </div>
    </section>
  );
}

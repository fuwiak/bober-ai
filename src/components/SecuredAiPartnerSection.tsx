import { ContactCta } from "@/components/ContactCta";
import { ArchitectureStepsCarousel } from "@/components/motion/ArchitectureStepsCarousel";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";

type SecuredAiPartnerSectionProps = {
  architectureLabel: string;
  architectureTitle: string;
  architectureSteps: string[];
  architectureText: string;
  noteLabel: string;
  noteTitle: string;
  noteBody: string;
  certificatesLink: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

/** AI architecture + slim secured-contour note (Kaspersky is secondary, not the brand). */
export function SecuredAiPartnerSection({
  architectureLabel,
  architectureTitle,
  architectureSteps,
  architectureText,
  noteLabel,
  noteTitle,
  noteBody,
  certificatesLink,
  ctaPrimary,
  ctaSecondary,
}: SecuredAiPartnerSectionProps) {
  return (
    <>
      <section id="architecture" className="section-band section--deep scroll-mt-16 border-b border-hairline">
        <div className="container-editorial">
          <Reveal>
            <span className="section-label">{architectureLabel}</span>
            <h2 className="section-title mt-4 max-w-3xl">{architectureTitle}</h2>
            <p className="body-copy mt-4 max-w-3xl text-base">{architectureText}</p>
          </Reveal>
          <ArchitectureStepsCarousel
            className="mt-10"
            steps={architectureSteps}
            label={architectureTitle}
          />
          <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-4">
            <ContactCta goal="architecture_cta_click" defaultService={ctaPrimary}>
              {ctaPrimary}
            </ContactCta>
            <ContactCta
              variant="secondary"
              goal="architecture_estimate_click"
              defaultService={ctaSecondary}
            >
              {ctaSecondary}
            </ContactCta>
          </Reveal>
        </div>
      </section>

      <section id="secured-contour" className="section-band section--panel scroll-mt-16 border-b border-hairline">
        <div className="container-editorial max-w-3xl">
          <Reveal>
            <span className="section-label">{noteLabel}</span>
            <h2 className="section-title mt-4">{noteTitle}</h2>
            <p className="body-copy mt-4 text-base">{noteBody}</p>
            <p className="mt-5">
              <Link href="/about#certificates" className="text-link text-sm">
                {certificatesLink}
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

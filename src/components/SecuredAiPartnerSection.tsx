import Image from "next/image";
import { ContactCta } from "@/components/ContactCta";
import { ArchitectureStepsCarousel } from "@/components/motion/ArchitectureStepsCarousel";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Link } from "@/i18n/navigation";
import { KASPERSKY_PARTNER_BADGES, KASPERSKY_PRODUCT_UI } from "@/lib/trust-partners";

type CardItem = {
  title: string;
  text: string;
};

type SecuredAiPartnerSectionProps = {
  locale: string;
  label: string;
  title: string;
  body: string[];
  certificatesLink: string;
  servicesLabel: string;
  serviceCards: CardItem[];
  architectureLabel: string;
  architectureTitle: string;
  architectureSteps: string[];
  architectureText: string;
  offeringsLabel: string;
  offeringsTitle: string;
  offeringsIntro: string;
  offerings: string[];
  projectsLabel: string;
  projectsTitle: string;
  projects: string[];
  ctaPrimary: string;
  ctaSecondary: string;
};

export function SecuredAiPartnerSection({
  locale,
  label,
  title,
  body,
  certificatesLink,
  servicesLabel,
  serviceCards,
  architectureLabel,
  architectureTitle,
  architectureSteps,
  architectureText,
  offeringsLabel,
  offeringsTitle,
  offeringsIntro,
  offerings,
  projectsLabel,
  projectsTitle,
  projects,
  ctaPrimary,
  ctaSecondary,
}: SecuredAiPartnerSectionProps) {
  const isEn = locale === "en";

  return (
    <>
      <section id="kaspersky" className="section-band section--panel scroll-mt-16 border-b border-hairline">
        <div className="container-editorial">
          <Reveal>
            <span className="section-label">{label}</span>
            <h2 className="section-title mt-4 max-w-3xl">{title}</h2>
            {body.map((paragraph) => (
              <p key={paragraph} className="body-copy mt-4 max-w-3xl text-base">
                {paragraph}
              </p>
            ))}
            <p className="mt-5">
              <Link href="/certificates" className="text-link text-sm">
                {certificatesLink}
              </Link>
            </p>
          </Reveal>

          <Reveal delay={0.04} className="partner-product-ui mt-10">
            <Image
              src={KASPERSKY_PRODUCT_UI.src}
              alt={isEn ? KASPERSKY_PRODUCT_UI.altEn : KASPERSKY_PRODUCT_UI.altRu}
              width={KASPERSKY_PRODUCT_UI.width}
              height={KASPERSKY_PRODUCT_UI.height}
              className="partner-product-ui__image"
              sizes="(max-width: 768px) 100vw, 52rem"
              unoptimized
            />
          </Reveal>

          <Reveal delay={0.06} className="partner-badge-row mt-10">
            {KASPERSKY_PARTNER_BADGES.map((badge) => (
              <div key={badge.id} className="partner-badge-frame">
                <Image
                  src={badge.src}
                  alt={isEn ? badge.altEn : badge.altRu}
                  width={badge.width}
                  height={badge.height}
                  className="partner-badge-image"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
              </div>
            ))}
          </Reveal>

          <p className="meta-label mt-10">{servicesLabel}</p>
          <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map((card) => (
              <StaggerItem key={card.title}>
                <article className="home-hub-card h-full">
                  <h3 className="card-title text-lg">{card.title}</h3>
                  <p className="body-copy mt-3 text-base">{card.text}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-band section--deep border-b border-hairline">
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
        </div>
      </section>

      <section className="section-band section--panel border-b border-hairline">
        <div className="container-editorial">
          <Reveal>
            <span className="section-label">{offeringsLabel}</span>
            <h2 className="section-title mt-4 max-w-3xl">{offeringsTitle}</h2>
            <p className="body-copy mt-4 max-w-3xl text-base">{offeringsIntro}</p>
          </Reveal>
          <ul className="mt-8 max-w-3xl space-y-3">
            {offerings.map((item) => (
              <Reveal key={item} delay={0.04}>
                <li className="body-copy flex gap-4 text-base">
                  <span className="meta-label shrink-0">—</span>
                  <span>{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-band section--deep border-b border-hairline">
        <div className="container-editorial">
          <Reveal>
            <span className="section-label">{projectsLabel}</span>
            <h2 className="section-title mt-4 max-w-3xl">{projectsTitle}</h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <StaggerItem key={project}>
                <article className="home-hub-card h-full">
                  <h3 className="card-title text-lg">{project}</h3>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-4">
            <ContactCta goal="secured_ai_cta_click" defaultService={ctaPrimary}>
              {ctaPrimary}
            </ContactCta>
            <ContactCta
              variant="secondary"
              goal="secured_ai_licenses_click"
              defaultService={ctaSecondary}
            >
              {ctaSecondary}
            </ContactCta>
          </Reveal>
        </div>
      </section>
    </>
  );
}

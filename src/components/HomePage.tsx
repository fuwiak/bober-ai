import { getTranslations } from "next-intl/server";
import { ContactCta } from "@/components/ContactCta";
import { ContactForm } from "@/components/ContactForm";
import { HomeHubSection } from "@/components/HomeHubSection";
import { SectionCtaBand } from "@/components/SectionCtaBand";
import { PartnerProgramBanner } from "@/components/PartnerProgramBanner";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { HeroSection } from "@/components/motion/HeroSection";
import { TrustStrip } from "@/components/motion/TrustStrip";
import { Reveal } from "@/components/motion/Reveal";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  FOUNDER_IMAGE,
  TELEGRAM_URL,
  WHATSAPP_URL,
} from "@/lib/site";

export default async function HomePage() {
  const t = await getTranslations();
  const trustStats = t.raw("trust.stats") as { value: string; label: string }[];

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <PartnerProgramBanner />
      <main>
        <HeroSection
          eyebrow={t("hero.eyebrow")}
          titleLine1={t("hero.titleLine1")}
          titleLine2={t("hero.titleLine2") || undefined}
          titleStyle={t("hero.titleLine2") ? "headline" : "sentence"}
          valueProposition={t("hero.valueProposition")}
          differentiator={t("hero.differentiator")}
          specialization={t("hero.specialization")}
          ctaPrimary={t("hero.ctaPrimary")}
          ctaSecondary={t("hero.ctaSecondary")}
          ctaSecondaryHref="/portfolio"
          trustItems={t.raw("hero.trustItems") as string[]}
          heroImage={FOUNDER_IMAGE}
          heroImageAlt={t("hero.heroImageAlt")}
        />

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <TrustStrip stats={trustStats} />
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{t("sections.whyUs")}</span>
              <h2 className="section-title mt-4">{t("whyUs.title")}</h2>
              <p className="body-copy mt-4 max-w-3xl text-base">{t("whyUs.text")}</p>
            </Reveal>
            <ul className="mt-8 max-w-3xl space-y-3">
              {(t.raw("whyUs.benefits") as string[]).map((item) => (
                <Reveal key={item} delay={0.05}>
                  <li className="body-copy flex gap-4 text-base">
                    <span className="meta-label shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <HomeHubSection
          label={t("homeHub.label")}
          title={t("homeHub.title")}
          linkLabel={t("common.readMore")}
          items={t.raw("homeHub.items") as { href: string; title: string; description: string }[]}
        />

        <SectionCtaBand
          title={t("sectionCta.title")}
          duration={t("sectionCta.duration")}
          commitment={t("sectionCta.commitment")}
          format={t("sectionCta.format")}
          cta={t("sectionCta.cta")}
          urgency={t("sectionCta.urgency")}
        />

        <section id="contact" className="section-band section--panel scroll-mt-16 border-t border-hairline pb-24 md:pb-16">
          <div className="container-editorial max-w-2xl">
            <Reveal>
              <div className="text-center">
                <span className="section-label">{t("sections.contact")}</span>
                <h2 className="section-title mt-4">{t("contact.title")}</h2>
                <p className="body-copy mt-4 text-base">{t("contact.subtitle")}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <ContactCta>{t("nav.consultCta")}</ContactCta>
                  <TrackedAnchor href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-secondary" goal="telegram_click">
                    Telegram
                  </TrackedAnchor>
                  <TrackedAnchor href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-secondary" goal="modal_whatsapp_click">
                    WhatsApp
                  </TrackedAnchor>
                  <TrackedAnchor href={`mailto:${CONTACT_EMAIL}`} className="btn-secondary" goal="email_click">
                    Email
                  </TrackedAnchor>
                  <TrackedAnchor href={`tel:${CONTACT_PHONE}`} className="btn-secondary" goal="phone_click">
                    {CONTACT_PHONE}
                  </TrackedAnchor>
                </div>
              </div>
              <div className="mt-10 text-left">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

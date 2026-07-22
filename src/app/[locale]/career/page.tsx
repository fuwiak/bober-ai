import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, SITE_NAME, TELEGRAM_URL, absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

type CareerRole = {
  id: string;
  title: string;
  department: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  applySubject: string;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "career" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/career",
    locale,
  });
}

export default async function CareerPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("career");
  const isEn = locale === "en";
  const roles = t.raw("roles") as CareerRole[];
  const perks = t.raw("perks") as { title: string; description: string }[];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl(isEn ? "/en" : "/") },
      {
        "@type": "ListItem",
        position: 2,
        name: t("navLabel"),
        item: absoluteUrl(isEn ? "/en/career" : "/career"),
      },
    ],
  };

  const jobPostings = roles.map((role) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.summary,
    datePosted: "2026-07-01",
    validThrough: "2026-12-31",
    hiringOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: absoluteUrl("/"),
      logo: absoluteUrl("/favicon-120x120.png"),
    },
    employmentType: "CONTRACTOR",
    industry: "Artificial Intelligence",
    jobLocationType: "TELECOMMUTE",
    directApply: true,
    url: absoluteUrl(isEn ? "/en/career" : "/career"),
    applicationContact: {
      "@type": "ContactPoint",
      email: CONTACT_EMAIL,
      url: TELEGRAM_URL,
    },
  }));

  return (
    <div className="page-shell min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {jobPostings.map((posting) => (
        <script
          key={posting.title}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(posting) }}
        />
      ))}
      <SiteHeader />
      <main>
        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <Breadcrumbs
                locale={locale}
                items={[{ name: t("navLabel"), path: "/career" }]}
              />
              <span className="section-label mt-8 inline-block">{t("label")}</span>
              <h1 className="section-title mt-4 max-w-3xl">{t("title")}</h1>
              <p className="body-copy mt-5 max-w-2xl text-base">{t("lead")}</p>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial">
            <Stagger className="career-roles">
              {roles.map((role) => (
                <StaggerItem key={role.id}>
                  <article className="career-role">
                    <div className="career-role__meta">
                      <span className="meta-label">{role.department}</span>
                      <span className="career-role__type">{role.type}</span>
                    </div>
                    <h2 className="career-role__title">{role.title}</h2>
                    <p className="body-copy mt-4 text-base">{role.summary}</p>
                    <div className="career-role__columns mt-8">
                      <div>
                        <p className="meta-label">{t("responsibilitiesLabel")}</p>
                        <ul className="mt-3 space-y-2">
                          {role.responsibilities.map((item) => (
                            <li key={item} className="body-copy flex gap-3 text-sm">
                              <span className="meta-label shrink-0">—</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="meta-label">{t("requirementsLabel")}</p>
                        <ul className="mt-3 space-y-2">
                          {role.requirements.map((item) => (
                            <li key={item} className="body-copy flex gap-3 text-sm">
                              <span className="meta-label shrink-0">—</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <TrackedAnchor
                        href={TELEGRAM_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary"
                        goal="career_telegram_click"
                      >
                        {t("applyTelegram")}
                      </TrackedAnchor>
                      <TrackedAnchor
                        href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(role.applySubject)}`}
                        className="btn-secondary"
                        goal="career_email_click"
                      >
                        {t("applyEmail")}
                      </TrackedAnchor>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{t("perksLabel")}</span>
              <h2 className="section-title mt-4">{t("perksTitle")}</h2>
            </Reveal>
            <div className="career-perks mt-10">
              {perks.map((perk) => (
                <Reveal key={perk.title}>
                  <div className="career-perk">
                    <h3 className="card-title text-xl">{perk.title}</h3>
                    <p className="body-copy mt-3 text-base">{perk.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

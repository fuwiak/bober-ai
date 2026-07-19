import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { LEGAL_ENTITY, LEGAL_ROUTES, POLICY_UPDATED_AT, YANDEX_METRIKA_ID } from "@/lib/legal";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") return {};

  return buildPageMetadata({
    title: "Personal Data Processing Policy",
    description: `Personal data processing policy of the ${SITE_NAME} website operator under Russian Federal Law No. 152-FZ.`,
    path: `/en${LEGAL_ROUTES.privacyPolicy}`,
    locale,
  });
}

export default async function PrivacyPolicyPageEn({ params }: Props) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  setRequestLocale(locale);

  return (
    <LegalPageLayout locale={locale} title="Personal Data Processing Policy" updatedAt={POLICY_UPDATED_AT}>
      <section>
        <p className="text-sm text-ink-variant">
          This is a courtesy translation. In case of any discrepancy, the{" "}
          <a href={absoluteUrl(LEGAL_ROUTES.privacyPolicy)} className="text-link hover:opacity-75">
            Russian version
          </a>{" "}
          prevails.
        </p>
      </section>

      <section>
        <h2 className="card-title text-lg">1. General provisions</h2>
        <p className="mt-3">
          This Personal Data Processing Policy (the &ldquo;Policy&rdquo;) defines how personal data of users of the
          website{" "}
          <a href={LEGAL_ENTITY.site} className="text-link hover:opacity-75">
            {LEGAL_ENTITY.site}
          </a>{" "}
          (the &ldquo;Website&rdquo;), owned by {LEGAL_ENTITY.name} (the &ldquo;Operator&rdquo;), is processed and
          protected.
        </p>
        <p className="mt-3">
          The Policy is drawn up in accordance with Russian Federal Law No. 152-FZ of 27 July 2006 &ldquo;On Personal
          Data&rdquo; and other applicable personal data regulations of the Russian Federation.
        </p>
        <p className="mt-3">
          By using the Website and submitting personal data, the user confirms that they have read this Policy.
        </p>
      </section>

      <section>
        <h2 className="card-title text-lg">2. Operator details</h2>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>Name: {LEGAL_ENTITY.name}</li>
          <li>INN (taxpayer ID): {LEGAL_ENTITY.inn}</li>
          <li>OGRNIP (sole proprietor registration No.): {LEGAL_ENTITY.ogrnip}</li>
          <li>Address: {LEGAL_ENTITY.address}</li>
          <li>Email: {LEGAL_ENTITY.email}</li>
          <li>Phone: {LEGAL_ENTITY.phone}</li>
        </ul>
      </section>

      <section>
        <h2 className="card-title text-lg">3. Purposes of processing</h2>
        <p className="mt-3">The Operator processes personal data for the following purposes:</p>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>handling enquiries and requests submitted through the contact form;</li>
          <li>contacting the user for consultations, preparing a commercial proposal, and concluding a contract;</li>
          <li>performing contractual obligations to clients;</li>
          <li>analysing Website traffic and improving the Website (including via Yandex Metrica);</li>
          <li>complying with the legislation of the Russian Federation.</li>
        </ul>
      </section>

      <section>
        <h2 className="card-title text-lg">4. Legal grounds for processing</h2>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>consent of the personal data subject (Articles 6 and 9 of Law 152-FZ);</li>
          <li>performance of a contract to which the personal data subject is a party (Art. 6(1)(5) of Law 152-FZ);</li>
          <li>
            processing of personal data made publicly available by the data subject (Art. 6(1)(11) of Law 152-FZ) —
            with respect to information published on the Website by the Operator in the &ldquo;About me&rdquo; section;
          </li>
          <li>exercise of the Operator&rsquo;s rights and legitimate interests (Art. 6(1)(7) of Law 152-FZ).</li>
        </ul>
      </section>

      <section>
        <h2 className="card-title text-lg">5. Categories of data subjects and scope of data</h2>
        <p className="mt-3">
          <strong className="text-ink">Website visitors</strong> — name, phone number, email address, message text,
          and the service of interest (when submitting the contact form).
        </p>
        <p className="mt-3">
          <strong className="text-ink">Clients and counterparties</strong> — data required to conclude and perform a
          contract: full name, contact details, and requisites where necessary.
        </p>
        <p className="mt-3">
          <strong className="text-ink">Visitors when analytics is enabled</strong> — IP address, browser type and
          version, operating system, screen resolution, browser language, pages visited, time on page, referral
          source, cookie identifiers (_ym_uid, _ym_d, etc.), and click/scroll data collected by Yandex Metrica.
        </p>
        <p className="mt-3">
          <strong className="text-ink">Employees and persons whose data is published on the Website</strong> — full
          name, photo, position, city of residence (the &ldquo;About me&rdquo; section). The Operator&rsquo;s personal
          data as a sole proprietor is published on the Website with the Operator&rsquo;s own consent as a data
          subject; the written consent to processing and dissemination is kept by the Operator. Copying and use of
          this data by third parties without the Operator&rsquo;s written consent is prohibited.
        </p>
        <p className="mt-3">
          The Operator does not process special categories of personal data (race, health, biometrics, etc.) or
          biometric personal data through the Website.
        </p>
      </section>

      <section>
        <h2 className="card-title text-lg">6. Processing procedure and conditions</h2>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>
            processing is carried out with and without automation tools, within the purposes stated in this Policy;
          </li>
          <li>
            contact form data is delivered to the Operator&rsquo;s email via mail infrastructure (SMTP) and is used
            solely to handle the enquiry; the transfer is based on the user&rsquo;s consent;
          </li>
          <li>
            traffic analytics is performed with Yandex Metrica (Yandex LLC, Russian Federation); the counter loads on
            each visit. A/B testing via Varioqub is enabled only after the user consents in the cookie notification;
          </li>
          <li>no cross-border transfer of personal data to unfriendly states is performed through the Website;</li>
          <li>Google Analytics and other foreign web analytics systems are not used on the Website;</li>
          <li>
            contact form data is retained for up to 3 years from the last interaction or until consent is withdrawn;
          </li>
          <li>
            data collected by Yandex Metrica is retained under the terms of the Yandex LLC service, but no longer than
            24 months from the user&rsquo;s last visit;
          </li>
          <li>
            data required for contract performance is retained for the duration of the contract and 5 years after its
            termination (as required by accounting and tax regulations).
          </li>
        </ul>
      </section>

      <section>
        <h2 className="card-title text-lg">7. Cookies, Yandex Metrica and Varioqub</h2>
        <p className="mt-3">
          The Website uses cookies, the Yandex Metrica service, and the Varioqub experiments service to collect visit
          statistics, analyse user behaviour, run A/B tests, and improve the Website. Cookies are small text files
          stored in the user&rsquo;s browser.
        </p>

        <h3 className="mt-4 font-normal text-ink">7.1. Yandex Metrica service details</h3>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>service operator: Yandex LLC, Russian Federation;</li>
          <li>counter ID on the Website: {YANDEX_METRIKA_ID};</li>
          <li>
            legal basis: the Operator&rsquo;s legitimate interests (Art. 6(1)(7) of Law 152-FZ) — traffic accounting
            and Website improvement;
          </li>
          <li>
            purposes: traffic accounting, traffic source analysis, page performance evaluation, click maps, session
            replay (recording of user actions on pages), accurate bounce rate, and link click tracking;
          </li>
          <li>
            data categories collected: IP address (anonymised), User-Agent, screen resolution, browser language, URLs
            of visited pages, time on page, referrer, cookie identifiers, click and scroll data;
          </li>
          <li>
            retention period in Yandex Metrica: under the terms of the service, but no longer than 24 months from the
            user&rsquo;s last visit;
          </li>
          <li>
            opting out: delete cookies in your browser or follow{" "}
            <a
              href="https://yandex.ru/support/metrica/general/opt-out.html"
              className="text-link hover:opacity-75"
              target="_blank"
              rel="noreferrer"
            >
              Yandex&rsquo;s instructions for disabling Metrica
            </a>
            .
          </li>
        </ul>

        <h3 className="mt-4 font-normal text-ink">7.2. Varioqub service details</h3>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>service operator: Yandex LLC, Russian Federation;</li>
          <li>legal basis: the user&rsquo;s consent given through the cookie banner;</li>
          <li>purposes: running experiments and A/B tests of the Website interface;</li>
          <li>
            the Varioqub script loads only after &ldquo;Accept&rdquo; and is not activated on &ldquo;Decline&rdquo;.
          </li>
        </ul>

        <h3 className="mt-4 font-normal text-ink">7.3. How cookie consent is obtained</h3>
        <p className="mt-3">
          On the first visit the Website always asks for consent via a notification banner (&ldquo;Accept&rdquo; or
          &ldquo;Decline&rdquo;). The Yandex Metrica script loads on each visit and continues to work regardless of the
          chosen answer. &ldquo;Accept&rdquo; additionally enables Varioqub experiments; &ldquo;Decline&rdquo; leaves
          Varioqub inactive.
        </p>
        <p className="mt-3">
          Technically necessary data (for example, the theme preference) is stored in the browser&rsquo;s localStorage
          and is not shared with third parties.
        </p>
        <p className="mt-3">
          Google Analytics and other foreign web analytics systems are not used on the Website. No cross-border
          transfer of personal data to unfriendly states is performed via analytics systems.
        </p>
      </section>

      <section>
        <h2 className="card-title text-lg">8. Rights of the personal data subject</h2>
        <p className="mt-3">The personal data subject has the right to:</p>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>receive information about the processing of their personal data;</li>
          <li>request rectification, blocking, or destruction of personal data;</li>
          <li>withdraw consent to the processing of personal data;</li>
          <li>appeal against the Operator&rsquo;s actions to Roskomnadzor or a court.</li>
        </ul>
        <p className="mt-3">
          To exercise these rights, send a request to{" "}
          <a href={`mailto:${LEGAL_ENTITY.email}`} className="text-link hover:opacity-75">
            {LEGAL_ENTITY.email}
          </a>{" "}
          with the subject &ldquo;Personal data request&rdquo;. The Operator will respond within 30 days.
        </p>
      </section>

      <section>
        <h2 className="card-title text-lg">9. Updating, rectifying, deleting and destroying data</h2>
        <p className="mt-3">
          The Operator takes the necessary organisational and technical measures to protect personal data against
          unlawful access, destruction, alteration, blocking, copying, and dissemination.
        </p>
        <p className="mt-3">
          Upon a data subject&rsquo;s request, the Operator updates, rectifies, or destroys personal data within the
          statutory period. Upon withdrawal of consent, processing stops unless it may lawfully continue on another
          legal basis.
        </p>
      </section>

      <section>
        <h2 className="card-title text-lg">10. Notification of Roskomnadzor</h2>
        <p className="mt-3">
          The Operator processes personal data in compliance with the requirement to notify Roskomnadzor (the Federal
          Service for Supervision of Communications, Information Technology and Mass Media) under Article 22 of Law
          152-FZ.
        </p>
      </section>

      <section>
        <h2 className="card-title text-lg">11. Changes to the Policy</h2>
        <p className="mt-3">
          The Operator may amend this Policy. The current version is available at{" "}
          <a href={absoluteUrl(LEGAL_ROUTES.privacyPolicy)} className="text-link hover:opacity-75">
            {absoluteUrl(LEGAL_ROUTES.privacyPolicy)}
          </a>
          . Continued use of the Website after changes are published constitutes acceptance of the updated Policy.
        </p>
      </section>

      <section>
        <h2 className="card-title text-lg">12. Contacts</h2>
        <p className="mt-3">
          For personal data questions, contact: {LEGAL_ENTITY.email}, phone {LEGAL_ENTITY.phone}.
        </p>
        <p className="mt-3 text-xs text-ink-variant">
          © {new Date().getFullYear()} {SITE_NAME}. {LEGAL_ENTITY.name}.
        </p>
      </section>
    </LegalPageLayout>
  );
}

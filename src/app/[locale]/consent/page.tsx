import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { LEGAL_ENTITY, LEGAL_ROUTES, POLICY_UPDATED_AT } from "@/lib/legal";
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
    title: "Consent to Personal Data Processing",
    description: `Text of the consent to personal data processing given when submitting the contact form on the ${SITE_NAME} website.`,
    path: `/en${LEGAL_ROUTES.consent}`,
    locale,
  });
}

export default async function ConsentPageEn({ params }: Props) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  setRequestLocale(locale);

  return (
    <LegalPageLayout title="Consent to Personal Data Processing" updatedAt={POLICY_UPDATED_AT}>
      <section>
        <p className="text-sm text-ink-variant">
          This is a courtesy translation. In case of any discrepancy, the{" "}
          <a href={absoluteUrl(LEGAL_ROUTES.consent)} className="text-link hover:opacity-75">
            Russian version
          </a>{" "}
          prevails.
        </p>
      </section>

      <section>
        <p>
          This document contains the text of the consent that the user gives when submitting the contact form on the
          website{" "}
          <a href={LEGAL_ENTITY.site} className="text-link hover:opacity-75">
            {LEGAL_ENTITY.site}
          </a>
          .
        </p>
      </section>

      <section className="rounded-xl border border-outline-variant/20 bg-surface-container-low p-5">
        <h2 className="card-title text-base">Text of the consent</h2>
        <p className="mt-4">
          I, the personal data subject, acting freely, of my own will, and in my own interest, confirm that I give my
          consent to {LEGAL_ENTITY.name} (INN {LEGAL_ENTITY.inn}, OGRNIP {LEGAL_ENTITY.ogrnip}), located at{" "}
          {LEGAL_ENTITY.address}, to process my personal data on the following terms:
        </p>
        <ol className="mt-4 list-inside list-decimal space-y-2">
          <li>
            <strong className="text-ink">Scope of personal data:</strong> name, phone number and/or email address,
            message text, and the service of interest.
          </li>
          <li>
            <strong className="text-ink">Purposes of processing:</strong> handling the enquiry, contacting me for a
            consultation, preparing a commercial proposal, and concluding and performing a contract.
          </li>
          <li>
            <strong className="text-ink">Processing operations:</strong> collection, recording, systematisation,
            accumulation, storage, clarification (updating, modification), use, transfer (provision, access),
            deletion, and destruction — with and without automation tools.
          </li>
          <li>
            <strong className="text-ink">Transfer to third parties:</strong> data may be transferred to the email
            operator / SMTP provider (delivery of the notification to the Operator) solely for the purpose of
            handling the enquiry.
          </li>
          <li>
            <strong className="text-ink">Term of consent:</strong> until the purposes of processing are achieved, but
            no longer than 3 years from submission of the form, or until the consent is withdrawn.
          </li>
          <li>
            <strong className="text-ink">Withdrawal of consent:</strong> the consent may be withdrawn by sending a
            written notice to{" "}
            <a href={`mailto:${LEGAL_ENTITY.email}`} className="text-link hover:opacity-75">
              {LEGAL_ENTITY.email}
            </a>{" "}
            marked &ldquo;Withdrawal of consent to personal data processing&rdquo;.
          </li>
        </ol>
        <p className="mt-4">
          I confirm that I have read the{" "}
          <Link href={`/en${LEGAL_ROUTES.privacyPolicy}`} className="text-link hover:opacity-75">
            Personal Data Processing Policy
          </Link>{" "}
          and understand my rights under Russian Federal Law No. 152-FZ of 27 July 2006 &ldquo;On Personal
          Data&rdquo;.
        </p>
      </section>

      <section>
        <h2 className="card-title text-lg">How consent is given on the Website</h2>
        <p className="mt-3">
          Consent is given by ticking <strong className="text-ink">a single checkbox</strong> in the contact form. By
          ticking it, the user confirms that they have read the Personal Data Processing Policy and simultaneously
          consents to the processing of personal data on the terms of this document. The checkbox is not pre-ticked.
          The form cannot be submitted without ticking it.
        </p>
      </section>

      <section>
        <h2 className="card-title text-lg">Withdrawal of consent</h2>
        <p className="mt-3">
          To withdraw your consent, send an email to{" "}
          <a href={`mailto:${LEGAL_ENTITY.email}`} className="text-link hover:opacity-75">
            {LEGAL_ENTITY.email}
          </a>{" "}
          stating your full name and the contact details provided in your enquiry. The Operator will stop the
          processing within 30 days, unless the processing may lawfully continue on another legal basis.
        </p>
      </section>
    </LegalPageLayout>
  );
}

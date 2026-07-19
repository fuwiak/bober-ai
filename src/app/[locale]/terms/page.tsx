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
    title: "Terms of Service",
    description: `Terms of ordering and providing ${SITE_NAME} services: scope, contract, estimate, payment, timelines, and contacts.`,
    path: `/en${LEGAL_ROUTES.terms}`,
    locale,
  });
}

export default async function TermsPageEn({ params }: Props) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  setRequestLocale(locale);

  return (
    <LegalPageLayout title="Terms of Service" updatedAt={POLICY_UPDATED_AT}>
      <section>
        <p className="text-sm text-ink-variant">
          This is a courtesy translation. In case of any discrepancy, the{" "}
          <a href={absoluteUrl(LEGAL_ROUTES.terms)} className="text-link hover:opacity-75">
            Russian version
          </a>{" "}
          prevails.
        </p>
      </section>

      <section>
        <h2 className="card-title text-lg">1. Service provider</h2>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>Name: {LEGAL_ENTITY.name}</li>
          <li>INN (taxpayer ID): {LEGAL_ENTITY.inn}</li>
          <li>OGRNIP (sole proprietor registration No.): {LEGAL_ENTITY.ogrnip}</li>
          <li>Address: {LEGAL_ENTITY.address}</li>
          <li>
            Email:{" "}
            <a href={`mailto:${LEGAL_ENTITY.email}`} className="text-link">
              {LEGAL_ENTITY.email}
            </a>
          </li>
          <li>
            Phone:{" "}
            <a href={`tel:${LEGAL_ENTITY.phone}`} className="text-link">
              {LEGAL_ENTITY.phone}
            </a>
          </li>
          <li>
            Website:{" "}
            <a href={LEGAL_ENTITY.site} className="text-link">
              {LEGAL_ENTITY.site}
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="card-title text-lg">2. Scope of services</h2>
        <p className="mt-3">
          The Provider renders commercial services for auditing, designing, implementing, and maintaining business
          automation and artificial intelligence systems (including integrations with CRM, documents, sales, and
          support).
        </p>
        <p className="mt-3">
          Service descriptions and the current price list are available on the{" "}
          <Link href="/en/services" className="text-link">
            Services
          </Link>{" "}
          and{" "}
          <Link href="/en/pricing" className="text-link">
            Pricing
          </Link>{" "}
          pages.
        </p>
      </section>

      <section>
        <h2 className="card-title text-lg">3. How to order a service</h2>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>request form on the website (including the &ldquo;Contact&rdquo; block on the home page);</li>
          <li>phone, Telegram, WhatsApp, or email listed on the website;</li>
          <li>response to a request — during business hours, typically within 4 hours;</li>
          <li>preliminary estimate — typically within 24 hours after clarifying the task.</li>
        </ul>
      </section>

      <section>
        <h2 className="card-title text-lg">4. Contract, NDA and estimate</h2>
        <p className="mt-3">
          This page describes the general terms of service and{" "}
          <strong className="text-ink">does not constitute a public offer</strong> within the meaning of Article 437
          of the Civil Code of the Russian Federation. A contractual relationship arises after the estimate is agreed
          and a contract is concluded (or an invoice-offer issued by the Provider is accepted).
        </p>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>work is performed under a contract (or invoice-offer) with a fixed estimate before the start;</li>
          <li>an NDA can be signed before any confidential data is exchanged;</li>
          <li>scope, timeline, and cost are fixed in the estimate / annex to the contract;</li>
          <li>changes of scope are documented in a supplementary agreement.</li>
        </ul>
      </section>

      <section>
        <h2 className="card-title text-lg">5. Payment</h2>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>cashless bank transfer to the sole proprietor&rsquo;s account;</li>
          <li>payment by milestones or 100% prepayment — as agreed in the contract;</li>
          <li>prices on the website are &ldquo;from&rdquo; and are refined in the estimate for the client&rsquo;s task.</li>
        </ul>
      </section>

      <section>
        <h2 className="card-title text-lg">6. Timeline and deliverables</h2>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>the service timeline is specified in the estimate (reference timelines — on the pricing page);</li>
          <li>deliverables are handed over to the client with documentation and access to project artifacts;</li>
          <li>acceptance — by a signed act or written confirmation of milestone completion.</li>
        </ul>
      </section>

      <section>
        <h2 className="card-title text-lg">7. Contacts for orders</h2>
        <p className="mt-3">
          You can leave a request on the{" "}
          <Link href="/en#contact" className="text-link">
            contact page
          </Link>
          , by phone {LEGAL_ENTITY.phone}, or by email {LEGAL_ENTITY.email}.
        </p>
      </section>
    </LegalPageLayout>
  );
}

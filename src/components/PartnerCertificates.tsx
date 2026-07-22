import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { KASPERSKY_PARTNER_CERTIFICATES } from "@/lib/trust-partners";

type PartnerCertificatesProps = {
  locale: string;
  intro?: string;
  titles: { b2b: string; b2c: string };
  openLabel: string;
};

export function PartnerCertificates({
  locale,
  intro,
  titles,
  openLabel,
}: PartnerCertificatesProps) {
  const isEn = locale === "en";

  return (
    <Reveal>
      {intro ? <p className="body-copy max-w-2xl text-base">{intro}</p> : null}
      <div className={`partner-cert-row${intro ? " mt-10" : ""}`}>
        {KASPERSKY_PARTNER_CERTIFICATES.map((cert) => (
          <a
            key={cert.id}
            href={cert.pdfSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="partner-cert-card"
          >
            <div className="partner-cert-card__preview">
              <Image
                src={cert.previewSrc}
                alt={isEn ? cert.altEn : cert.altRu}
                width={cert.width}
                height={cert.height}
                className="partner-cert-card__image"
                sizes="(max-width: 768px) 100vw, 560px"
                priority
              />
            </div>
            <div className="partner-cert-card__meta">
              <span className="partner-cert-card__badge">{titles[cert.id]}</span>
              <span className="partner-cert-card__title">{isEn ? cert.altEn : cert.altRu}</span>
              <span className="partner-cert-card__action">{openLabel}</span>
            </div>
          </a>
        ))}
      </div>
    </Reveal>
  );
}

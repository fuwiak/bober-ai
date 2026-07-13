"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ContactCta } from "@/components/ContactCta";
import { EditorialImageFrame } from "@/components/EditorialImageFrame";
import { StaggerItem } from "@/components/motion/Stagger";

type AnimatedServiceCardProps = {
  title: string;
  description: string;
  salesNotes: string;
  deliveryDays: number;
  slug: string;
  image?: string;
  detailsLabel: string;
  quoteLabel: string;
  daysLabel: string;
};

export function AnimatedServiceCard({
  title,
  description,
  salesNotes,
  deliveryDays,
  slug,
  image,
  detailsLabel,
  quoteLabel,
  daysLabel,
}: AnimatedServiceCardProps) {
  return (
    <StaggerItem>
      <article className="card-kts group overflow-hidden rounded-2xl border border-hairline bg-canvas">
        {image ? (
          <EditorialImageFrame variant="card" className="aspect-[4/3] bg-surface-card">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 360px"
              className="object-cover"
              unoptimized={image.endsWith(".svg")}
            />
          </EditorialImageFrame>
        ) : null}
        <div className="card-kts-body flex flex-col p-6">
          <h3 className="font-display text-lg tracking-tight text-ink transition-colors duration-500 group-hover:text-primary">
            {title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{description}</p>
          <div className="mt-6 flex items-end justify-between gap-3 border-t border-hairline pt-5">
            <div>
              <p className="font-display text-xl tracking-tight text-ink">{salesNotes}</p>
              <p className="mt-0.5 text-xs text-muted">
                {deliveryDays} {daysLabel}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link href={`/services/${slug}`} className="btn-secondary text-xs">
                {detailsLabel}
              </Link>
              <ContactCta className="btn-primary text-xs" defaultService={title}>
                {quoteLabel}
              </ContactCta>
            </div>
          </div>
        </div>
      </article>
    </StaggerItem>
  );
}

import { ContactCta } from "@/components/ContactCta";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Link } from "@/i18n/navigation";

type PackageItem = {
  name: string;
  price: string;
  duration: string;
  forWhom: string;
  result: string;
  featured?: boolean;
  detailsHref?: string;
};

type PackagesShowcaseProps = {
  label: string;
  title: string;
  subtitle: string;
  items: PackageItem[];
  featuredLabel: string;
  detailsLabel: string;
  cta: string;
  urgency?: string;
};

export function PackagesShowcase({
  label,
  title,
  subtitle,
  items,
  featuredLabel,
  detailsLabel,
  cta,
  urgency,
}: PackagesShowcaseProps) {
  return (
    <section id="packages" className="section-band section--deep scroll-mt-16 border-b border-hairline">
      <div className="container-editorial">
        <Reveal>
          <span className="section-label">{label}</span>
          <h2 className="section-title mt-4">{title}</h2>
          <p className="body-copy mt-4 max-w-2xl text-base">{subtitle}</p>
          {urgency ? <p className="meta-label mt-4 max-w-2xl">{urgency}</p> : null}
        </Reveal>
        <Stagger className="packages-grid mt-10">
          {items.map((item) => (
            <StaggerItem key={item.name}>
              <article className={`package-card${item.featured ? " package-card--featured" : ""}`}>
                {item.featured ? <span className="package-card__badge">{featuredLabel}</span> : null}
                <h3 className="card-title text-xl">{item.name}</h3>
                <p className="package-card__price mt-3">{item.price}</p>
                <p className="meta-label mt-2">{item.duration}</p>
                <p className="body-copy mt-4 text-base">{item.forWhom}</p>
                <p className="body-copy mt-3 text-base text-ink">{item.result}</p>
                {item.detailsHref ? (
                  <Link href={item.detailsHref as "/"} className="link-more mt-6">
                    {detailsLabel}
                  </Link>
                ) : null}
              </article>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={0.1} className="mt-10">
          <ContactCta goal="packages_cta_click">{cta}</ContactCta>
        </Reveal>
      </div>
    </section>
  );
}

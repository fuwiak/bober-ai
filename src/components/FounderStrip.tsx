import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { FOUNDER_IMAGE } from "@/lib/site";

type FounderStripProps = {
  badge: string;
  name: string;
  role: string;
  text: string;
  aboutCta: string;
  aboutHref?: string;
};

export function FounderStrip({
  badge,
  name,
  role,
  text,
  aboutCta,
  aboutHref = "/about",
}: FounderStripProps) {
  return (
    <section className="section-band section--panel border-b border-hairline" aria-labelledby="founder-strip-heading">
      <div className="container-editorial">
        <Reveal>
          <div className="founder-strip">
            <div className="founder-strip__portrait">
              <Image
                src={FOUNDER_IMAGE}
                alt={name}
                fill
                sizes="(max-width: 768px) 96px, 120px"
                className="founder-strip__image"
                unoptimized={FOUNDER_IMAGE.endsWith(".svg")}
              />
            </div>
            <div className="founder-strip__copy">
              <span className="section-label">{badge}</span>
              <h2 id="founder-strip-heading" className="founder-strip__name">
                {name}
              </h2>
              <p className="founder-strip__role">{role}</p>
              <p className="body-copy mt-4 max-w-2xl text-base">{text}</p>
              <Link href={aboutHref as "/"} className="link-more mt-5 inline-flex">
                {aboutCta}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

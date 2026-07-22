import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { FOUNDER_IMAGE } from "@/lib/site";

type Stat = { value: string; label: string };

type Props = {
  label: string;
  name: string;
  role: string;
  quote: string;
  goal: string;
  imageAlt: string;
  stats?: Stat[];
};

export function FounderManifesto({
  label,
  name,
  role,
  quote,
  goal,
  imageAlt,
  stats = [],
}: Props) {
  return (
    <section
      id="founder"
      className="section-band section--panel scroll-mt-16 border-b border-hairline"
      aria-labelledby="founder-manifesto-name"
    >
      <div className="container-editorial">
        <div className="founder-manifesto">
          <Reveal className="founder-manifesto__media">
            <div className="founder-manifesto__frame">
              <Image
                src={FOUNDER_IMAGE}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 22rem"
                className="founder-manifesto__image"
                unoptimized={FOUNDER_IMAGE.endsWith(".svg")}
              />
            </div>
          </Reveal>

          <div className="founder-manifesto__copy">
            <Reveal>
              <span className="section-label">{label}</span>
              <h2 id="founder-manifesto-name" className="founder-manifesto__name">
                {name}
              </h2>
              <p className="founder-manifesto__role">{role}</p>
              <blockquote className="founder-manifesto__quote">
                <p>{quote}</p>
              </blockquote>
              <p className="founder-manifesto__goal">{goal}</p>
            </Reveal>

            {stats.length > 0 ? (
              <Reveal delay={0.08} className="founder-manifesto__stats">
                {stats.map((stat) => (
                  <div key={stat.label} className="founder-manifesto__stat">
                    <span className="founder-manifesto__stat-value">{stat.value}</span>
                    <span className="founder-manifesto__stat-label">{stat.label}</span>
                  </div>
                ))}
              </Reveal>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

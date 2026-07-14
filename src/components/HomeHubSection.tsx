import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Link } from "@/i18n/navigation";

type HomeHubItem = {
  href: string;
  title: string;
  description: string;
};

type HomeHubSectionProps = {
  label: string;
  title: string;
  linkLabel: string;
  items: HomeHubItem[];
};

export function HomeHubSection({ label, title, linkLabel, items }: HomeHubSectionProps) {
  return (
    <section className="section-band section--panel border-b border-hairline">
      <div className="container-editorial">
        <Reveal>
          <span className="section-label">{label}</span>
          <h2 className="section-title mt-4">{title}</h2>
        </Reveal>
        <Stagger className="home-hub-grid mt-10">
          {items.map((item) => (
            <StaggerItem key={item.href}>
              <Link href={item.href as "/"} className="home-hub-card group">
                <h3 className="card-title text-xl">{item.title}</h3>
                <p className="body-copy mt-3 text-base">{item.description}</p>
                <span className="text-link mt-6 inline-block text-[11px] uppercase tracking-[0.16em]">{linkLabel} →</span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

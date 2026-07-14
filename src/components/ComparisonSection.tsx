import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

type ComparisonItem = {
  title: string;
  problem: string;
  solution: string;
};

type ComparisonSectionProps = {
  label: string;
  title: string;
  subtitle: string;
  items: ComparisonItem[];
};

export function ComparisonSection({ label, title, subtitle, items }: ComparisonSectionProps) {
  return (
    <section className="section-band section--deep border-b border-hairline">
      <div className="container-editorial">
        <Reveal>
          <span className="section-label">{label}</span>
          <h2 className="section-title mt-4">{title}</h2>
          <p className="body-copy mt-4 max-w-2xl text-base">{subtitle}</p>
        </Reveal>
        <Stagger className="comparison-grid mt-10">
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <article className="comparison-card">
                <h3 className="card-title text-xl">{item.title}</h3>
                <p className="body-copy mt-4 text-base">{item.problem}</p>
                <p className="body-copy mt-4 text-base text-ink">{item.solution}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

type DeliverablesProps = {
  label: string;
  title: string;
  subtitle: string;
  beforeTitle: string;
  afterTitle: string;
  before: string[];
  after: string[];
};

export function DeliverablesSection({
  label,
  title,
  subtitle,
  beforeTitle,
  afterTitle,
  before,
  after,
}: DeliverablesProps) {
  return (
    <section className="section-band section--panel border-b border-hairline">
      <div className="container-editorial">
        <Reveal>
          <span className="section-label">{label}</span>
          <h2 className="section-title mt-4">{title}</h2>
          <p className="body-copy mt-4 max-w-2xl text-base">{subtitle}</p>
        </Reveal>
        <div className="deliverables-grid mt-10">
          <Reveal>
            <article className="deliverables-col">
              <h3 className="card-title text-xl">{beforeTitle}</h3>
              <ul className="mt-6 space-y-3">
                {before.map((item) => (
                  <li key={item} className="body-copy flex gap-3 text-base">
                    <span className="meta-label shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delay={0.06}>
            <article className="deliverables-col">
              <h3 className="card-title text-xl">{afterTitle}</h3>
              <ul className="mt-6 space-y-3">
                {after.map((item) => (
                  <li key={item} className="body-copy flex gap-3 text-base">
                    <span className="meta-label shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

type ProcessStep = { label: string; status: string };

type BeforeAfterDemoProps = {
  label: string;
  title: string;
  subtitle: string;
  demoNote: string;
  beforeLabel: string;
  afterLabel: string;
  beforeMetric: string;
  afterMetric: string;
  beforeSteps: ProcessStep[];
  afterSteps: ProcessStep[];
  flow: string[];
};

export function BeforeAfterDemoSection({
  label,
  title,
  subtitle,
  demoNote,
  beforeLabel,
  afterLabel,
  beforeMetric,
  afterMetric,
  beforeSteps,
  afterSteps,
  flow,
}: BeforeAfterDemoProps) {
  return (
    <section className="section-band section--deep border-b border-hairline">
      <div className="container-editorial">
        <Reveal>
          <span className="section-label">{label}</span>
          <h2 className="section-title mt-4">{title}</h2>
          <p className="body-copy mt-4 max-w-2xl text-base">{subtitle}</p>
          <p className="meta-label mt-4">{demoNote}</p>
        </Reveal>

        <Reveal delay={0.05} className="mt-8">
          <ol className="demo-flow" aria-label={title}>
            {flow.map((step, index) => (
              <li key={step} className="demo-flow__item">
                <span className="demo-flow__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="demo-flow__label">{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="before-after-grid mt-10">
          <Reveal>
            <article className="before-after-panel">
              <div className="before-after-panel__head">
                <h3 className="card-title text-xl">{beforeLabel}</h3>
                <span className="status-chip status-chip--warn">{beforeMetric}</span>
              </div>
              <ol className="mt-6 space-y-3">
                {beforeSteps.map((step, index) => (
                  <li key={step.label} className="demo-step">
                    <span className="demo-step__num">{String(index + 1).padStart(2, "0")}</span>
                    <span className="body-copy text-base">{step.label}</span>
                    <span className="status-chip status-chip--muted">{step.status}</span>
                  </li>
                ))}
              </ol>
            </article>
          </Reveal>
          <Reveal delay={0.06}>
            <article className="before-after-panel before-after-panel--after">
              <div className="before-after-panel__head">
                <h3 className="card-title text-xl">{afterLabel}</h3>
                <span className="status-chip status-chip--ok">{afterMetric}</span>
              </div>
              <ol className="mt-6 space-y-3">
                {afterSteps.map((step, index) => (
                  <li key={step.label} className="demo-step">
                    <span className="demo-step__num">{String(index + 1).padStart(2, "0")}</span>
                    <span className="body-copy text-base">{step.label}</span>
                    <span className="status-chip status-chip--ok">{step.status}</span>
                  </li>
                ))}
              </ol>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

type AuditSampleProps = {
  label: string;
  title: string;
  subtitle: string;
  demoNote: string;
  cards: { title: string; text: string }[];
  tableTitle: string;
  tableHeaders: string[];
  tableRows: string[][];
};

export function AuditSampleSection({
  label,
  title,
  subtitle,
  demoNote,
  cards,
  tableTitle,
  tableHeaders,
  tableRows,
}: AuditSampleProps) {
  return (
    <section className="section-band section--panel border-b border-hairline">
      <div className="container-editorial">
        <Reveal>
          <span className="section-label">{label}</span>
          <h2 className="section-title mt-4">{title}</h2>
          <p className="body-copy mt-4 max-w-2xl text-base">{subtitle}</p>
          <p className="meta-label mt-4">{demoNote}</p>
        </Reveal>

        <Stagger className="audit-cards mt-10">
          {cards.map((card) => (
            <StaggerItem key={card.title}>
              <article className="audit-card">
                <h3 className="card-title text-lg">{card.title}</h3>
                <p className="body-copy mt-3 text-sm">{card.text}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.08} className="mt-10">
          <div className="audit-table-wrap">
            <h3 className="card-title text-lg">{tableTitle}</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="audit-table">
                <thead>
                  <tr>
                    {tableHeaders.map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row) => (
                    <tr key={row.join("-")}>
                      {row.map((cell) => (
                        <td key={cell}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

type PreLaunchProps = {
  label: string;
  title: string;
  subtitle: string;
  acceptanceNote: string;
  items: string[];
};

export function PreLaunchChecklistSection({
  label,
  title,
  subtitle,
  acceptanceNote,
  items,
}: PreLaunchProps) {
  return (
    <section className="section-band section--deep border-b border-hairline">
      <div className="container-editorial">
        <Reveal>
          <span className="section-label">{label}</span>
          <h2 className="section-title mt-4">{title}</h2>
          <p className="body-copy mt-4 max-w-2xl text-base">{subtitle}</p>
        </Reveal>
        <ul className="prelaunch-list mt-10">
          {items.map((item) => (
            <Reveal key={item} delay={0.04}>
              <li className="prelaunch-item">
                <span className="prelaunch-check" aria-hidden>
                  ✓
                </span>
                <span className="body-copy text-base">{item}</span>
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.1} className="mt-8">
          <p className="body-copy max-w-2xl text-sm text-muted">{acceptanceNote}</p>
        </Reveal>
      </div>
    </section>
  );
}

type ArchitectureProps = {
  label: string;
  title: string;
  subtitle: string;
  note: string;
  steps: string[];
};

export function ArchitecturePlainSection({ label, title, subtitle, note, steps }: ArchitectureProps) {
  return (
    <section className="section-band section--panel border-b border-hairline">
      <div className="container-editorial">
        <Reveal>
          <span className="section-label">{label}</span>
          <h2 className="section-title mt-4">{title}</h2>
          <p className="body-copy mt-4 max-w-2xl text-base">{subtitle}</p>
        </Reveal>
        <Reveal delay={0.05} className="mt-10">
          <ol className="arch-flow">
            {steps.map((step, index) => (
              <li key={step} className="arch-flow__step">
                <span className="arch-flow__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="body-copy text-base">{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={0.1} className="mt-6">
          <p className="body-copy max-w-2xl text-sm text-muted">{note}</p>
        </Reveal>
      </div>
    </section>
  );
}

type SimpleListSectionProps = {
  label: string;
  title: string;
  subtitle?: string;
  items: string[];
  tone?: "panel" | "deep";
};

export function SimpleListSection({
  label,
  title,
  subtitle,
  items,
  tone = "deep",
}: SimpleListSectionProps) {
  return (
    <section className={`section-band section--${tone} border-b border-hairline`}>
      <div className="container-editorial">
        <Reveal>
          <span className="section-label">{label}</span>
          <h2 className="section-title mt-4">{title}</h2>
          {subtitle ? <p className="body-copy mt-4 max-w-2xl text-base">{subtitle}</p> : null}
        </Reveal>
        <ul className="mt-8 max-w-3xl space-y-3">
          {items.map((item) => (
            <Reveal key={item} delay={0.04}>
              <li className="body-copy flex gap-4 text-base">
                <span className="meta-label shrink-0">—</span>
                <span>{item}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

type PartnerStep = {
  title: string;
  text: string;
};

type PartnerStepsProps = {
  steps: PartnerStep[];
};

export function PartnerSteps({ steps }: PartnerStepsProps) {
  return (
    <Stagger className="mt-10">
      {steps.map((step, index) => (
        <StaggerItem key={step.title}>
          <article className="process-row">
            <span className="editorial-row__index">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="card-title">{step.title}</h3>
              <p className="body-copy mt-4 max-w-2xl text-base">{step.text}</p>
            </div>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function PartnerSectionHeader({
  badge,
  title,
  subtitle,
  description,
}: {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
}) {
  return (
    <Reveal>
      <span className="section-label">{badge}</span>
      <h2 className="section-title mt-4">{title}</h2>
      <p className="body-copy mt-3 text-lg text-body-strong">{subtitle}</p>
      <p className="body-copy mt-4 max-w-2xl text-base">{description}</p>
    </Reveal>
  );
}

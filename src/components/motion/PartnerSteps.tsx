"use client";

import { useEffect, useRef, useState } from "react";
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
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "-48px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`partner-steps mt-8 ${visible ? "is-visible" : ""}`}>
      <div className="partner-line" aria-hidden />
      <Stagger className="contents">
        {steps.map((step, index) => (
          <StaggerItem key={step.title}>
            <article className="feature-card relative z-[1] h-full">
              <span className="font-mono text-xs tracking-widest text-accent-green">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-medium text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-body">{step.text}</p>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
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
      <h2 className="display-sm mt-3">{title}</h2>
      <p className="mt-2 text-base font-medium text-ink">{subtitle}</p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-body">{description}</p>
    </Reveal>
  );
}

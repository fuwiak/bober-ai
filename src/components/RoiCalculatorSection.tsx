"use client";

import { useLocale } from "next-intl";
import { RoiCalculator } from "@/components/RoiCalculator";
import { useContactModal } from "@/components/ContactModalProvider";
import { reachGoal } from "@/lib/analytics";

type RoiCalculatorSectionProps = {
  label: string;
  title: string;
  subtitle: string;
  employeesLabel: string;
  hoursLabel: string;
  salaryLabel: string;
  savingsLabel: string;
  resultLabel: string;
  resultNote: string;
  cta: string;
};

export function RoiCalculatorSection(props: RoiCalculatorSectionProps) {
  const modal = useContactModal();
  const locale = useLocale();

  return (
    <section id="roi" className="section-band section--panel scroll-mt-16 border-b border-hairline">
      <div className="container-editorial max-w-3xl">
        <span className="section-label">{props.label}</span>
        <RoiCalculator
          locale={locale}
          title={props.title}
          subtitle={props.subtitle}
          employeesLabel={props.employeesLabel}
          hoursLabel={props.hoursLabel}
          salaryLabel={props.salaryLabel}
          savingsLabel={props.savingsLabel}
          resultLabel={props.resultLabel}
          resultNote={props.resultNote}
          cta={props.cta}
          onCta={() => {
            reachGoal("roi_calculator_cta_click");
            modal?.open("ROI-калькулятор");
          }}
        />
      </div>
    </section>
  );
}

"use client";

import { useLocale, useTranslations } from "next-intl";
import { RoiCalculator } from "@/components/RoiCalculator";

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
  cta?: string;
};

export function RoiCalculatorSection(props: RoiCalculatorSectionProps) {
  const locale = useLocale();
  const t = useTranslations("roiCalculator");
  const tForm = useTranslations("form");

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
          paybackLabel={t("paybackLabel")}
          paybackSuffix={t("paybackSuffix")}
          auditDataTitle={t("auditDataTitle")}
          auditDataItems={t.raw("auditDataItems") as string[]}
          captureCta={t("captureCta")}
          gateTitle={t("gateTitle")}
          gateSubtitle={t("gateSubtitle")}
          emailLabel={t("emailLabel")}
          emailPlaceholder={t("emailPlaceholder")}
          telegramLabel={t("telegramLabel")}
          telegramPlaceholder={t("telegramPlaceholder")}
          telegramOptional={tForm("optional")}
          gateSubmit={t("gateSubmit")}
          gateSubmitting={t("gateSubmitting")}
          gateSuccessTitle={t("gateSuccessTitle")}
          gateSuccess={t("gateSuccess")}
          consentCombined={tForm("consentCombined")}
          policyLink={tForm("policyLink")}
          consentAnd={tForm("consentAnd")}
          consentLink={tForm("consentLink")}
          errorConsent={tForm("errorConsent")}
          nextCtaPrimary={t("nextCtaPrimary")}
          nextCtaSecondary={t("nextCtaSecondary")}
          currency={t("currency")}
          implementationFloor={Number(t("implementationFloor"))}
        />
      </div>
    </section>
  );
}

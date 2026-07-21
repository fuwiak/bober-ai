"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/ContactForm";
import { reachGoal } from "@/lib/analytics";

type DiagnosticStep = {
  question: string;
  options: string[];
};

export function DiagnosticForm() {
  const t = useTranslations("diagnosticForm");
  const steps = t.raw("steps") as DiagnosticStep[];
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const totalSteps = steps.length + 1;
  const isContactStep = stepIndex >= steps.length;
  const currentStep = steps[stepIndex] as DiagnosticStep | undefined;

  function selectOption(option: string) {
    setAnswers((prev) => {
      const next = [...prev];
      next[stepIndex] = option;
      return next;
    });
    reachGoal("diagnostic_step", { step: stepIndex + 1, answer: option });
    window.setTimeout(() => setStepIndex((i) => i + 1), 150);
  }

  function goBack() {
    setStepIndex((i) => Math.max(0, i - 1));
  }

  const defaultService = answers[0] || "";
  const defaultMessage = steps
    .map((step, i) => (answers[i] ? `${step.question} ${answers[i]}` : null))
    .filter(Boolean)
    .join("\n");

  return (
    <div className="diagnostic-form">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex gap-1.5" aria-hidden="true">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span key={i} className={`diagnostic-dot${i <= stepIndex ? " diagnostic-dot--active" : ""}`} />
          ))}
        </div>
        <span className="meta-label">
          {t("progressLabel", { current: Math.min(stepIndex + 1, totalSteps), total: totalSteps })}
        </span>
      </div>

      {isContactStep || !currentStep ? (
        <div>
          <p className="card-title text-xl">{t("title")}</p>
          <div className="mt-6">
            <ContactForm defaultService={defaultService} defaultMessage={defaultMessage} />
          </div>
          {answers.length > 0 ? (
            <button type="button" onClick={goBack} className="link-more mt-6">
              {t("back")}
            </button>
          ) : null}
        </div>
      ) : (
        <div>
          <span className="section-label">{t("eyebrow")}</span>
          <h3 className="card-title mt-4 text-xl">{currentStep.question}</h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {currentStep.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => selectOption(option)}
                className={`diagnostic-option${answers[stepIndex] === option ? " diagnostic-option--active" : ""}`}
              >
                {option}
              </button>
            ))}
          </div>
          {stepIndex > 0 ? (
            <button type="button" onClick={goBack} className="link-more mt-6">
              {t("back")}
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}

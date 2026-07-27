"use client";

import { useMemo, useState } from "react";
import { LeadCaptureGate } from "@/components/LeadCaptureGate";
import { reachGoal } from "@/lib/analytics";
import {
  BUDGET_OPTIONS,
  computeProcessAudit,
  findOption,
  PROCESS_TYPE_OPTIONS,
  SYSTEMS_OPTIONS,
  type BudgetTier,
  type ProcessType,
} from "@/lib/process-audit";

type Props = { locale: string };

export function ProcessAuditQuiz({ locale }: Props) {
  const ru = locale !== "en";
  const [processType, setProcessType] = useState<ProcessType>(PROCESS_TYPE_OPTIONS[0].value);
  const [peopleCount, setPeopleCount] = useState(3);
  const [monthlyOps, setMonthlyOps] = useState(200);
  const [minutesPerOp, setMinutesPerOp] = useState(15);
  const [systems, setSystems] = useState(SYSTEMS_OPTIONS[0].value);
  const [confidential, setConfidential] = useState(false);
  const [budget, setBudget] = useState<BudgetTier>(BUDGET_OPTIONS[0].value);
  const [computed, setComputed] = useState(false);

  const result = useMemo(
    () => computeProcessAudit({ processType, peopleCount, monthlyOps, minutesPerOp, confidential, budget }, locale),
    [processType, peopleCount, monthlyOps, minutesPerOp, confidential, budget, locale],
  );

  function handleCalculate() {
    setComputed(true);
    reachGoal("process_audit_calculate", { processType, peopleCount, monthlyOps, minutesPerOp, budget });
  }

  function resetOnChange() {
    setComputed(false);
  }

  const processLabel = findOption(PROCESS_TYPE_OPTIONS, processType);
  const systemsLabel = findOption(SYSTEMS_OPTIONS, systems);
  const budgetLabel = findOption(BUDGET_OPTIONS, budget);

  const getMessage = () =>
    [
      ru ? "AI-аудит процесса — ответы:" : "AI process audit — answers:",
      `${ru ? "Процесс" : "Process"}: ${ru ? processLabel?.ru : processLabel?.en}`,
      `${ru ? "Участников" : "People involved"}: ${peopleCount}`,
      `${ru ? "Операций в месяц" : "Operations / month"}: ${monthlyOps}`,
      `${ru ? "Минут на операцию" : "Minutes per operation"}: ${minutesPerOp}`,
      `${ru ? "Системы" : "Systems"}: ${ru ? systemsLabel?.ru : systemsLabel?.en}`,
      `${ru ? "Конфиденциальные данные" : "Confidential data"}: ${confidential ? (ru ? "Да" : "Yes") : ru ? "Нет" : "No"}`,
      `${ru ? "Бюджет" : "Budget"}: ${ru ? budgetLabel?.ru : budgetLabel?.en}`,
      "",
      ru ? "Предварительная карта автоматизации:" : "Preliminary automation map:",
      `${ru ? "Текущие затраты" : "Current cost"}: ~${result.totalHours} ${ru ? "ч/мес" : "h/mo"}`,
      `${ru ? "Потенциал экономии" : "Savings potential"}: ${result.savingsLow}–${result.savingsHigh} ${ru ? "ч/мес" : "h/mo"}`,
      `${ru ? "Сценарий" : "Scenario"}: ${result.scenario}`,
      `${ru ? "Формат" : "Format"}: ${result.format}`,
      `${ru ? "Ориентировочный бюджет" : "Estimated budget"}: ${result.budgetHint}`,
    ].join("\n");

  return (
    <div className="roi-calculator">
      <div className="roi-calculator__grid mt-2 sm:grid-cols-2">
        <label className="roi-calculator__field">
          <span className="form-label">{ru ? "Какой процесс улучшаем" : "Which process to improve"}</span>
          <select
            value={processType}
            onChange={(e) => {
              setProcessType(e.target.value as ProcessType);
              resetOnChange();
            }}
            className="form-input mt-2"
          >
            {PROCESS_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {ru ? option.ru : option.en}
              </option>
            ))}
          </select>
        </label>
        <label className="roi-calculator__field">
          <span className="form-label">{ru ? "Какие системы задействованы" : "Which systems are involved"}</span>
          <select
            value={systems}
            onChange={(e) => {
              setSystems(e.target.value);
              resetOnChange();
            }}
            className="form-input mt-2"
          >
            {SYSTEMS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {ru ? option.ru : option.en}
              </option>
            ))}
          </select>
        </label>
        <label className="roi-calculator__field">
          <span className="form-label">{ru ? "Сколько человек участвует" : "How many people are involved"}</span>
          <input
            type="number"
            min={1}
            max={500}
            value={peopleCount}
            onChange={(e) => {
              setPeopleCount(Number(e.target.value) || 1);
              resetOnChange();
            }}
            className="form-input mt-2"
          />
        </label>
        <label className="roi-calculator__field">
          <span className="form-label">{ru ? "Операций в месяц" : "Operations per month"}</span>
          <input
            type="number"
            min={1}
            max={100000}
            value={monthlyOps}
            onChange={(e) => {
              setMonthlyOps(Number(e.target.value) || 1);
              resetOnChange();
            }}
            className="form-input mt-2"
          />
        </label>
        <label className="roi-calculator__field">
          <span className="form-label">{ru ? "Минут на одну операцию" : "Minutes per operation"}</span>
          <input
            type="number"
            min={1}
            max={480}
            value={minutesPerOp}
            onChange={(e) => {
              setMinutesPerOp(Number(e.target.value) || 1);
              resetOnChange();
            }}
            className="form-input mt-2"
          />
        </label>
        <label className="roi-calculator__field">
          <span className="form-label">{ru ? "Ориентировочный бюджет" : "Approximate budget"}</span>
          <select
            value={budget}
            onChange={(e) => {
              setBudget(e.target.value as BudgetTier);
              resetOnChange();
            }}
            className="form-input mt-2"
          >
            {BUDGET_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {ru ? option.ru : option.en}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label htmlFor="audit-confidential" className="mt-6 flex cursor-pointer items-start gap-3">
        <input
          id="audit-confidential"
          type="checkbox"
          checked={confidential}
          onChange={(e) => {
            setConfidential(e.target.checked);
            resetOnChange();
          }}
          className="mt-1 h-4 w-4 shrink-0 border-hairline-strong accent-ink"
        />
        <span className="text-sm leading-relaxed text-muted">
          {ru
            ? "В процессе есть конфиденциальные данные (персональные данные, коммерческая тайна)"
            : "The process involves confidential data (personal data, trade secrets)"}
        </span>
      </label>

      {!computed ? (
        <button type="button" className="btn-primary mt-8" onClick={handleCalculate}>
          {ru ? "Рассчитать потенциал автоматизации" : "Calculate automation potential"}
        </button>
      ) : (
        <>
          <div className="roi-calculator__result mt-8">
            <p className="meta-label">{ru ? "Предварительная карта автоматизации" : "Preliminary automation map"}</p>
            <ul className="mt-4 space-y-3">
              <li className="body-copy text-sm">
                <strong className="text-ink">{ru ? "Текущие затраты:" : "Current cost:"}</strong> ~{result.totalHours}{" "}
                {ru ? "ч/мес" : "h/mo"}
              </li>
              <li className="body-copy text-sm">
                <strong className="text-ink">{ru ? "Потенциал экономии:" : "Savings potential:"}</strong>{" "}
                {result.savingsLow}–{result.savingsHigh} {ru ? "ч/мес" : "h/mo"}
              </li>
              <li className="body-copy text-sm">
                <strong className="text-ink">{ru ? "Рекомендуемый сценарий:" : "Recommended scenario:"}</strong>{" "}
                {result.scenario}
              </li>
              <li className="body-copy text-sm">
                <strong className="text-ink">{ru ? "Рекомендуемый формат:" : "Recommended format:"}</strong>{" "}
                {result.format}
              </li>
              <li className="body-copy text-sm">
                <strong className="text-ink">{ru ? "Ориентировочный бюджет:" : "Estimated budget:"}</strong>{" "}
                {result.budgetHint}
              </li>
            </ul>
            {confidential ? (
              <p className="body-copy mt-4 text-sm text-muted">
                {ru
                  ? "Данные конфиденциальны — рекомендуем закрытый контур (on-prem) и NDA до старта."
                  : "Data is confidential — we recommend a closed on-prem contour and an NDA before kickoff."}
              </p>
            ) : null}
            <p className="body-copy mt-3 text-sm text-muted">
              {ru
                ? "Расчёт ориентировочный. Точные цифры — после короткого созвона."
                : "Indicative only. Exact numbers after a short call."}
            </p>
          </div>

          <LeadCaptureGate
            locale={locale}
            source="process-audit-quiz"
            getMessage={getMessage}
            successText={
              ru
                ? "Мы получили ваши ответы и пришлём полный разбор с планом внедрения в течение 24 часов."
                : "We received your answers and will send the full breakdown with an implementation plan within 24 hours."
            }
            serviceLabel={ru ? "AI-аудит процесса" : "AI process audit"}
            goalParams={{ processType, budget }}
          />
        </>
      )}
    </div>
  );
}

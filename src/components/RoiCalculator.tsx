"use client";

import { useMemo, useState } from "react";

type RoiCalculatorProps = {
  locale: string;
  title: string;
  subtitle: string;
  employeesLabel: string;
  hoursLabel: string;
  salaryLabel: string;
  savingsLabel: string;
  resultLabel: string;
  resultNote: string;
  cta: string;
  onCta: () => void;
};

export function RoiCalculator({
  locale,
  title,
  subtitle,
  employeesLabel,
  hoursLabel,
  salaryLabel,
  savingsLabel,
  resultLabel,
  resultNote,
  cta,
  onCta,
}: RoiCalculatorProps) {
  const [employees, setEmployees] = useState(5);
  const [hours, setHours] = useState(12);
  const [salary, setSalary] = useState(120000);

  const monthlySavings = useMemo(() => {
    const hourlyRate = salary / 168;
    const automatableShare = 0.55;
    return Math.round(employees * hours * 4.33 * hourlyRate * automatableShare);
  }, [employees, hours, salary]);

  return (
    <div className="roi-calculator">
      <h3 className="card-title">{title}</h3>
      <p className="body-copy mt-4 max-w-2xl text-base">{subtitle}</p>
      <div className="roi-calculator__grid mt-8">
        <label className="roi-calculator__field">
          <span className="form-label">{employeesLabel}</span>
          <input
            type="number"
            min={1}
            max={500}
            value={employees}
            onChange={(e) => setEmployees(Number(e.target.value) || 1)}
            className="form-input mt-2"
          />
        </label>
        <label className="roi-calculator__field">
          <span className="form-label">{hoursLabel}</span>
          <input
            type="number"
            min={1}
            max={80}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value) || 1)}
            className="form-input mt-2"
          />
        </label>
        <label className="roi-calculator__field">
          <span className="form-label">{salaryLabel}</span>
          <input
            type="number"
            min={30000}
            step={5000}
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value) || 30000)}
            className="form-input mt-2"
          />
        </label>
      </div>
      <div className="roi-calculator__result mt-8">
        <p className="meta-label">{resultLabel}</p>
        <p className="roi-calculator__value mt-2">
          {monthlySavings.toLocaleString(locale === "en" ? "en-US" : "ru-RU")} {locale === "en" ? "€" : "₽"}
          <span className="roi-calculator__period"> / {savingsLabel}</span>
        </p>
        <p className="body-copy mt-3 text-sm">{resultNote}</p>
      </div>
      <button type="button" className="btn-primary mt-8" onClick={onCta}>
        {cta}
      </button>
    </div>
  );
}

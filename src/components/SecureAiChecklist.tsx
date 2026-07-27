"use client";

import { useMemo, useState } from "react";
import { LeadCaptureGate } from "@/components/LeadCaptureGate";
import { reachGoal } from "@/lib/analytics";
import { SECURE_AI_CHECKLIST } from "@/lib/secure-ai-page";

type Props = { locale: string };

const TOTAL_ITEMS = SECURE_AI_CHECKLIST.reduce((sum, section) => sum + section.itemsRu.length, 0);

function scoreBand(score: number, total: number, ru: boolean) {
  const ratio = total > 0 ? score / total : 0;
  if (ratio < 0.4) {
    return ru
      ? "Есть значительные пробелы в безопасности AI-контура"
      : "There are significant gaps in your AI perimeter's security";
  }
  if (ratio < 0.76) {
    return ru ? "Базовый уровень готов, но есть точки риска" : "Basic level is in place, but there are risk points";
  }
  return ru ? "Хороший уровень готовности — стоит проверить детали" : "Good readiness level — worth verifying the details";
}

export function SecureAiChecklist({ locale }: Props) {
  const ru = locale !== "en";
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [revealed, setRevealed] = useState(false);

  const score = useMemo(() => Object.values(checked).filter(Boolean).length, [checked]);

  function toggle(key: string) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
    if (!revealed) setRevealed(true);
  }

  const unchecked: string[] = [];
  SECURE_AI_CHECKLIST.forEach((section, sectionIndex) => {
    section.itemsRu.forEach((_, itemIndex) => {
      const key = `${sectionIndex}-${itemIndex}`;
      if (!checked[key]) {
        unchecked.push(ru ? section.itemsRu[itemIndex] : section.itemsEn[itemIndex]);
      }
    });
  });

  const getMessage = () =>
    [
      ru ? "Чек-лист безопасности корпоративного AI — результат:" : "Corporate AI security checklist — result:",
      `${ru ? "Готово" : "Ready"}: ${score} / ${TOTAL_ITEMS}`,
      "",
      ru ? "Не закрыто:" : "Not covered:",
      ...unchecked.map((item) => `— ${item}`),
    ].join("\n");

  return (
    <div className="roi-calculator">
      <div className="space-y-8">
        {SECURE_AI_CHECKLIST.map((section, sectionIndex) => (
          <div key={section.titleRu}>
            <p className="meta-label">{ru ? section.titleRu : section.titleEn}</p>
            <ul className="mt-3 space-y-2">
              {(ru ? section.itemsRu : section.itemsEn).map((item, itemIndex) => {
                const key = `${sectionIndex}-${itemIndex}`;
                return (
                  <li key={key}>
                    <label htmlFor={`checklist-${key}`} className="flex cursor-pointer items-start gap-3">
                      <input
                        id={`checklist-${key}`}
                        type="checkbox"
                        checked={Boolean(checked[key])}
                        onChange={() => toggle(key)}
                        className="mt-1 h-4 w-4 shrink-0 border-hairline-strong accent-ink"
                      />
                      <span className="text-sm leading-relaxed text-body">{item}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="roi-calculator__result mt-8">
        <p className="meta-label">{ru ? "Готовность" : "Readiness"}</p>
        <p className="roi-calculator__value mt-2">
          {score} / {TOTAL_ITEMS}
        </p>
        <p className="body-copy mt-3 text-base">{scoreBand(score, TOTAL_ITEMS, ru)}</p>
      </div>

      {revealed ? (
        <LeadCaptureGate
          locale={locale}
          source="secure-ai-checklist"
          getMessage={getMessage}
          successText={
            ru
              ? "Мы получили результат чек-листа и пришлём экспресс-разбор архитектуры в течение 24 часов."
              : "We received your checklist result and will send an express architecture review within 24 hours."
          }
          serviceLabel={ru ? "Secure AI — чек-лист" : "Secure AI checklist"}
          gateSubtitle={
            ru
              ? "Пришлём разбор непокрытых пунктов и рекомендации по архитектуре."
              : "We'll send a breakdown of uncovered items and architecture recommendations."
          }
          goalParams={{ score, total: TOTAL_ITEMS }}
        />
      ) : null}
    </div>
  );
}

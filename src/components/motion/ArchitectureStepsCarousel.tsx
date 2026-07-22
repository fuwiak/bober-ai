"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { motion, useReducedMotion } from "motion/react";

const FADE_DURATION = 0.4;
const AUTO_ADVANCE_MS = 4800;

type ArchitectureStepsCarouselProps = {
  steps: string[];
  className?: string;
  /** Accessible name for the carousel region */
  label?: string;
};

export function ArchitectureStepsCarousel({
  steps,
  className,
  label = "Architecture steps",
}: ArchitectureStepsCarouselProps) {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  const goTo = useCallback(
    (next: number) => {
      const len = steps.length;
      if (len === 0) return;
      setIndex(((next % len) + len) % len);
    },
    [steps.length],
  );

  useEffect(() => {
    if (prefersReducedMotion || paused || steps.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % steps.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion, paused, steps.length]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (steps.length <= 1) return;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        goTo(index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        goTo(index - 1);
        break;
      case "Home":
        event.preventDefault();
        goTo(0);
        break;
      case "End":
        event.preventDefault();
        goTo(steps.length - 1);
        break;
      default:
        break;
    }
  };

  if (steps.length === 0) return null;

  if (prefersReducedMotion) {
    return (
      <ol className={`architecture-flow ${className ?? ""}`.trim()}>
        {steps.map((step, stepIndex) => (
          <li key={step} className="architecture-flow__item">
            <span className="architecture-flow__index">
              {String(stepIndex + 1).padStart(2, "0")}
            </span>
            <span className="architecture-flow__text">{step}</span>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div
      ref={regionRef}
      className={`architecture-slider ${className ?? ""}`.trim()}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!regionRef.current?.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="architecture-slider__viewport">
        {steps.map((step, stepIndex) => {
          const active = stepIndex === index;
          const slideId = `${baseId}-slide-${stepIndex}`;
          return (
            <motion.div
              key={step}
              id={slideId}
              className="architecture-slider__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${stepIndex + 1} / ${steps.length}`}
              aria-hidden={!active}
              initial={false}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: FADE_DURATION, ease: "easeInOut" }}
              style={{ pointerEvents: active ? "auto" : "none" }}
            >
              <span className="architecture-slider__index">
                {String(stepIndex + 1).padStart(2, "0")}
              </span>
              <p className="architecture-slider__title">{step}</p>
              <span className="architecture-slider__count" aria-hidden="true">
                {String(stepIndex + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="architecture-slider__dots" role="tablist" aria-label={label}>
        {steps.map((step, stepIndex) => {
          const active = stepIndex === index;
          return (
            <button
              key={step}
              type="button"
              role="tab"
              className={`architecture-slider__dot${active ? " is-active" : ""}`}
              aria-selected={active}
              aria-controls={`${baseId}-slide-${stepIndex}`}
              aria-label={`${stepIndex + 1}. ${step}`}
              tabIndex={active ? 0 : -1}
              onClick={() => goTo(stepIndex)}
            />
          );
        })}
      </div>
    </div>
  );
}

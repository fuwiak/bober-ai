/**
 * Site kinematics — single source of truth.
 * CSS mirrors these curves/durations in globals.css (--ease-*, --dur-*).
 * Reference: chux / BRIIIDG house settle (long decelerating tail).
 */

export const EASE = {
  out: "cubic-bezier(0.16, 0.84, 0.24, 1)",
  outSoft: "cubic-bezier(0.22, 0.68, 0.12, 1)",
  inOut: "cubic-bezier(0.62, 0, 0.14, 1)",
  swell: "cubic-bezier(0.34, 1.02, 0.2, 1)",
} as const;

/** Premium ease — alias kept for existing imports. */
export const EASE_OUT = [0.16, 0.84, 0.24, 1] as const;

export const DURATION = {
  micro: 0.18,
  fast: 0.32,
  /** Pillar / card hover reference — 620ms */
  base: 0.62,
  medium: 0.72,
  slow: 0.95,
  curtain: 1.15,
  epic: 1.45,
} as const;

export const BLUR = {
  hard: 16,
  soft: 9,
  /** Entrance resolve — keep ≤4px on text for cheap GPUs */
  trace: 4,
} as const;

export const REVEAL_OFFSET = {
  desktop: 34,
  mobile: 24,
} as const;

export const STAGGER_DELAY = 0.09;

export const revealTransition = {
  duration: DURATION.slow,
  ease: EASE_OUT,
} as const;

export const heroTitleTransition = {
  duration: DURATION.slow,
  ease: EASE_OUT,
} as const;

export type SolutionLayout = "default" | "wide" | "large" | "compact";

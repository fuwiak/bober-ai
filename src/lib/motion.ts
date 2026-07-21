/** Premium ease — близко к architectural / Alcon-style reveals. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  fast: 0.22,
  medium: 0.72,
  slow: 0.95,
} as const;

export const REVEAL_OFFSET = {
  desktop: 36,
  mobile: 28,
} as const;

export const STAGGER_DELAY = 0.08;

export const revealTransition = {
  duration: DURATION.medium,
  ease: EASE_OUT,
} as const;

export const heroTitleTransition = {
  duration: DURATION.slow,
  ease: EASE_OUT,
} as const;

export type SolutionLayout = "default" | "wide" | "large" | "compact";

export const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

export const DURATION = {
  fast: 0.18,
  medium: 0.5,
  slow: 0.5,
} as const;

export const REVEAL_OFFSET = {
  desktop: 12,
  mobile: 12,
} as const;

export const STAGGER_DELAY = 0.05;

export const revealTransition = {
  duration: DURATION.medium,
  ease: EASE_OUT,
} as const;

export type SolutionLayout = "default" | "wide" | "large" | "compact";

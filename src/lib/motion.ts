/** Luxury enterprise easing */
export const EASE_LUXURY = [0.2, 0.8, 0.2, 1] as const;
export const EASE_OUT = EASE_LUXURY;

export const DURATION = {
  fast: 0.24,
  medium: 0.45,
  slow: 0.75,
  slower: 0.9,
} as const;

export const REVEAL_OFFSET = {
  desktop: 28,
  mobile: 16,
} as const;

export const STAGGER_DELAY = 0.09;

export const revealTransition = {
  duration: DURATION.slow,
  ease: EASE_LUXURY,
} as const;

export const hoverTransition = {
  duration: DURATION.medium,
  ease: EASE_LUXURY,
} as const;

export const cardHoverTransition = {
  duration: 0.32,
  ease: EASE_LUXURY,
} as const;

export type SolutionLayout = "default" | "wide" | "large" | "compact";

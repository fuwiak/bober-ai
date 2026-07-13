/** KTS-style easing: cubic-bezier(0.215, 0.61, 0.355, 1) */
export const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

export const DURATION = {
  fast: 0.2,
  medium: 0.35,
  slow: 0.5,
  slower: 0.8,
} as const;

export const REVEAL_OFFSET = {
  desktop: 28,
  mobile: 16,
} as const;

export const STAGGER_DELAY = 0.07;

export const revealTransition = {
  duration: DURATION.slow,
  ease: EASE_OUT,
} as const;

export const hoverTransition = {
  duration: DURATION.slow,
  ease: EASE_OUT,
} as const;

export const cardHoverTransition = {
  duration: 0.28,
  ease: EASE_OUT,
} as const;

export type CardAccent = "green" | "blue" | "violet" | "cyan" | "orange";

/** KTS-style easing: cubic-bezier(0.215, 0.61, 0.355, 1) */
export const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

export const DURATION = {
  fast: 0.2,
  medium: 0.35,
  slow: 0.55,
} as const;

export const revealTransition = {
  duration: DURATION.slow,
  ease: EASE_OUT,
} as const;

export const hoverTransition = {
  duration: DURATION.slow,
  ease: EASE_OUT,
} as const;

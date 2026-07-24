"use client";

/**
 * Contact modal opens only from explicit CTA (header / FAB / forms).
 * Auto popups (timer / exit-intent / scroll) hurt UX signals Яндекс учитывает
 * («без всплывающих окон») — therefore disabled.
 */
export function ContactIntentTrigger() {
  return null;
}

"use client";

import { useEffect, useState } from "react";
import {
  AB_FORM_LENGTH,
  getAbVariant,
  getCtaDestinationVariant,
  type AbCtaDestination,
  type AbFormLength,
} from "@/lib/ab-tests";

/**
 * Client-only sticky A/B variant. SSR and first paint use the control (index 0)
 * to avoid hydration mismatch; assignment runs after mount.
 */
export function useAbVariant<T extends string>(experiment: string, variants: readonly T[]): T {
  const [variant, setVariant] = useState<T>(variants[0]);

  useEffect(() => {
    setVariant(getAbVariant(experiment, variants));
  }, [experiment, variants]);

  return variant;
}

export function useFormLengthVariant(): AbFormLength {
  return useAbVariant("form_length", AB_FORM_LENGTH);
}

export function useCtaDestinationVariant(): AbCtaDestination {
  const [variant, setVariant] = useState<AbCtaDestination>("form");

  useEffect(() => {
    setVariant(getCtaDestinationVariant());
  }, []);

  return variant;
}

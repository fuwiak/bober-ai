/** Types for config/domains.mjs (single source of truth for public hosts). */

export const CANONICAL_APEX: string;
export const CANONICAL_HOST: string;
export const PARTNERS_HOST: string;
export const BITRIX_HOST: string;
export const LEGACY_APEX: string;
export const LEGACY_HOST: string;
export const LEGACY_PARTNERS_HOST: string;
export const LEGACY_BITRIX_HOST: string;
export const CANONICAL_ORIGIN: string;
export const APEX_ORIGIN: string;
export const PARTNERS_ORIGIN: string;
export const BITRIX_ORIGIN: string;
export const LEGACY_ORIGIN: string;
export const LEGACY_APEX_ORIGIN: string;
export const LEGACY_PARTNERS_ORIGIN: string;
export const LEGACY_BITRIX_ORIGIN: string;
export const ALLOWED_HTTPS_HOSTS: string[];
export function isCanonicalFamilyHost(hostname?: string): boolean;

declare const domains: {
  CANONICAL_APEX: string;
  CANONICAL_HOST: string;
  PARTNERS_HOST: string;
  BITRIX_HOST: string;
  LEGACY_APEX: string;
  LEGACY_HOST: string;
  LEGACY_PARTNERS_HOST: string;
  LEGACY_BITRIX_HOST: string;
  CANONICAL_ORIGIN: string;
  APEX_ORIGIN: string;
  PARTNERS_ORIGIN: string;
  BITRIX_ORIGIN: string;
  LEGACY_ORIGIN: string;
  LEGACY_APEX_ORIGIN: string;
  LEGACY_PARTNERS_ORIGIN: string;
  LEGACY_BITRIX_ORIGIN: string;
  ALLOWED_HTTPS_HOSTS: string[];
  isCanonicalFamilyHost: (hostname?: string) => boolean;
};

export default domains;

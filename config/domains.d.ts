/** Types for config/domains.mjs (single source of truth for public hosts). */

export const CANONICAL_APEX: string;
export const CANONICAL_HOST: string;
export const PARTNERS_HOST: string;
export const BITRIX_HOST: string;
export const CANONICAL_ORIGIN: string;
export const APEX_ORIGIN: string;
export const PARTNERS_ORIGIN: string;
export const BITRIX_ORIGIN: string;
export const CONTACT_EMAIL_DEFAULT: string;
export const ALLOWED_HTTPS_HOSTS: string[];
export function isCanonicalFamilyHost(hostname?: string): boolean;

declare const domains: {
  CANONICAL_APEX: string;
  CANONICAL_HOST: string;
  PARTNERS_HOST: string;
  BITRIX_HOST: string;
  CANONICAL_ORIGIN: string;
  APEX_ORIGIN: string;
  PARTNERS_ORIGIN: string;
  BITRIX_ORIGIN: string;
  CONTACT_EMAIL_DEFAULT: string;
  ALLOWED_HTTPS_HOSTS: string[];
  isCanonicalFamilyHost: (hostname?: string) => boolean;
};

export default domains;

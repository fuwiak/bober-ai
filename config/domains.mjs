/**
 * Single source of truth for public site domains.
 * Change hosts here — app defaults, Astro `site`, scripts, and Docker build
 * pick these up. Override at runtime with PUBLIC_SITE_URL / PUBLIC_*_SITE_URL.
 *
 * Caddy TLS host lists still need matching hostnames in deploy/Caddyfile
 * (ACME cannot import JS).
 */

/** Registrable apex of the canonical brand site (no www). */
export const CANONICAL_APEX = "bober-systems.ru";

/** Preferred public host (www). */
export const CANONICAL_HOST = `www.${CANONICAL_APEX}`;

/** Partners microsite host. */
export const PARTNERS_HOST = `partners.${CANONICAL_APEX}`;

/** Bitrix/CRM microsite host. */
export const BITRIX_HOST = `bitrix.${CANONICAL_APEX}`;

/** Legacy apex still used for dual-SAN TLS + redirects. */
export const LEGACY_APEX = "bober-ai.dev";

export const LEGACY_HOST = `www.${LEGACY_APEX}`;
export const LEGACY_PARTNERS_HOST = `partners.${LEGACY_APEX}`;
export const LEGACY_BITRIX_HOST = `bitrix.${LEGACY_APEX}`;

function httpsOrigin(host) {
  return `https://${host}`;
}

/** Canonical site origin — https://www.bober-systems.ru */
export const CANONICAL_ORIGIN = httpsOrigin(CANONICAL_HOST);

export const APEX_ORIGIN = httpsOrigin(CANONICAL_APEX);
export const PARTNERS_ORIGIN = httpsOrigin(PARTNERS_HOST);
export const BITRIX_ORIGIN = httpsOrigin(BITRIX_HOST);

export const LEGACY_ORIGIN = httpsOrigin(LEGACY_HOST);
export const LEGACY_APEX_ORIGIN = httpsOrigin(LEGACY_APEX);
export const LEGACY_PARTNERS_ORIGIN = httpsOrigin(LEGACY_PARTNERS_HOST);
export const LEGACY_BITRIX_ORIGIN = httpsOrigin(LEGACY_BITRIX_HOST);

/** Hosts allowed for Astro CSRF / Origin checks (canonical + legacy). */
export const ALLOWED_HTTPS_HOSTS = [
  CANONICAL_HOST,
  CANONICAL_APEX,
  PARTNERS_HOST,
  BITRIX_HOST,
  LEGACY_HOST,
  LEGACY_APEX,
  LEGACY_PARTNERS_HOST,
  LEGACY_BITRIX_HOST,
];

/** True when hostname is under the canonical apex (incl. www / partners / bitrix). */
export function isCanonicalFamilyHost(hostname = "") {
  const host = String(hostname).toLowerCase();
  return (
    host === CANONICAL_HOST ||
    host === CANONICAL_APEX ||
    host === PARTNERS_HOST ||
    host === BITRIX_HOST ||
    host.endsWith(`.${CANONICAL_APEX}`)
  );
}

export default {
  CANONICAL_APEX,
  CANONICAL_HOST,
  PARTNERS_HOST,
  BITRIX_HOST,
  LEGACY_APEX,
  LEGACY_HOST,
  LEGACY_PARTNERS_HOST,
  LEGACY_BITRIX_HOST,
  CANONICAL_ORIGIN,
  APEX_ORIGIN,
  PARTNERS_ORIGIN,
  BITRIX_ORIGIN,
  LEGACY_ORIGIN,
  LEGACY_APEX_ORIGIN,
  LEGACY_PARTNERS_ORIGIN,
  LEGACY_BITRIX_ORIGIN,
  ALLOWED_HTTPS_HOSTS,
  isCanonicalFamilyHost,
};

import { CLOUD_RU_PARTNERS_URL, SELECTEL_PARTNER_PROGRAM_URL, YANDEX_CLOUD_PARTNERS_URL } from "@/lib/site";

export type TrustPartner = {
  id: string;
  name: string;
  logoSrc: string;
  /** Intrinsic aspect for next/image sizing */
  logoWidth: number;
  logoHeight: number;
  /** Cloud.ru lockup ships on black — use dark plate */
  markTone?: "light" | "dark";
  href?: string;
};

export const TRUST_PARTNERS: TrustPartner[] = [
  {
    id: "yandex-cloud",
    name: "Yandex Cloud",
    logoSrc: "/partners/trust/yandex-cloud.svg",
    logoWidth: 160,
    logoHeight: 24,
    href: YANDEX_CLOUD_PARTNERS_URL,
  },
  {
    id: "selectel",
    name: "Selectel",
    logoSrc: "/partners/trust/selectel.svg",
    logoWidth: 160,
    logoHeight: 32,
    href: SELECTEL_PARTNER_PROGRAM_URL,
  },
  {
    id: "cloudru",
    name: "Cloud.ru",
    logoSrc: "/partners/trust/cloudru.png",
    logoWidth: 160,
    logoHeight: 30,
    markTone: "dark",
    href: CLOUD_RU_PARTNERS_URL,
  },
];

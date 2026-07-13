import { CLOUD_RU_PARTNERS_URL, SELECTEL_PARTNER_PROGRAM_URL, YANDEX_CLOUD_PARTNERS_URL } from "@/lib/site";

export type TrustPartner = {
  id: string;
  name: string;
  logoSrc: string;
  href?: string;
};

export const TRUST_PARTNERS: TrustPartner[] = [
  {
    id: "kaspersky",
    name: "Kaspersky",
    logoSrc: "/partners/trust/kaspersky.svg",
  },
  {
    id: "yandex-cloud",
    name: "Yandex Cloud",
    logoSrc: "/partners/trust/yandex-cloud.svg",
    href: YANDEX_CLOUD_PARTNERS_URL,
  },
  {
    id: "selectel",
    name: "Selectel",
    logoSrc: "/partners/trust/selectel.svg",
    href: SELECTEL_PARTNER_PROGRAM_URL,
  },
  {
    id: "cloudru",
    name: "Cloud.ru",
    logoSrc: "/partners/trust/cloudru.svg",
    href: CLOUD_RU_PARTNERS_URL,
  },
];

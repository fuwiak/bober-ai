export type TrustPartner = {
  id: string;
  name: string;
  logoSrc: string;
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
  },
  {
    id: "selectel",
    name: "Selectel",
    logoSrc: "/partners/trust/selectel.svg",
  },
  {
    id: "cloudru",
    name: "Cloud.ru",
    logoSrc: "/partners/trust/cloudru.svg",
  },
];

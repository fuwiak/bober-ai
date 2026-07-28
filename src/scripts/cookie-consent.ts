import { COOKIE_CONSENT_KEY } from "@/lib/legal";

type CookieConsentValue = "accepted" | "rejected";
const EXIT_MS = 240;

function getConsent(): CookieConsentValue | null {
  const value = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (value === "accepted" || value === "rejected") return value;
  return null;
}

function setConsent(value: CookieConsentValue) {
  localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: value }));
}

function initCookieConsent() {
  const root = document.querySelector<HTMLElement>("[data-cookie-consent]");
  if (!root || getConsent() !== null) return;

  root.hidden = false;
  requestAnimationFrame(() => root.classList.add("cookie-consent--open"));

  const hide = () => {
    root.classList.remove("cookie-consent--open");
    window.setTimeout(() => {
      root.hidden = true;
    }, EXIT_MS);
  };

  root.querySelectorAll<HTMLButtonElement>("[data-cookie-accept]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setConsent("accepted");
      hide();
    });
  });
  root.querySelectorAll<HTMLButtonElement>("[data-cookie-reject]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setConsent("rejected");
      hide();
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCookieConsent, { once: true });
} else {
  initCookieConsent();
}

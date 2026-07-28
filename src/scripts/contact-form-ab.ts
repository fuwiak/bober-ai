import { getFormLengthVariant } from "@/lib/ab-tests";
import { reachGoal } from "@/lib/analytics";

function initContactFormAb() {
  const forms = document.querySelectorAll<HTMLFormElement>("form.contact-form[data-ab-length]");
  forms.forEach((form) => {
    const variant = getFormLengthVariant();
    form.dataset.formLength = variant;
    if (variant === "short") {
      form.querySelectorAll<HTMLElement>("[data-contact-qualify], [data-contact-extended]").forEach((el) => {
        el.hidden = true;
        el.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea").forEach(
          (field) => {
            field.disabled = true;
          },
        );
      });
      const intro = form.querySelector<HTMLElement>("[data-contact-intro]");
      const introShort = form.dataset.introShort;
      if (intro && introShort) intro.textContent = introShort;
    }

    let started = false;
    const markStart = () => {
      if (started) return;
      started = true;
      const prefix = form.dataset.trackingPrefix || "";
      reachGoal(prefix ? `${prefix}_form_start` : "form_start", { form_length: variant });
    };
    form.addEventListener("focusin", markStart);
    form.addEventListener("input", markStart);
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContactFormAb, { once: true });
  } else {
    initContactFormAb();
  }
}

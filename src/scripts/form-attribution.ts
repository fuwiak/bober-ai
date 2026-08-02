import { getAttribution, reachGoal } from "@/lib/analytics";

function fillAttributionFields(form: HTMLFormElement) {
  const attr = getAttribution();
  const set = (name: string, value: string | undefined) => {
    const input = form.querySelector<HTMLInputElement>(`input[name="${name}"]`);
    if (input && value) input.value = value;
  };
  set("utm_source", attr.utm_source);
  set("utm_medium", attr.utm_medium);
  set("utm_campaign", attr.utm_campaign);
  set("utm_content", attr.utm_content);
  set("utm_term", attr.utm_term);
  set("yclid", attr.yclid);
  set("landing_page", attr.landing_page || window.location.pathname);
}

function initFormAttribution() {
  document.body.addEventListener("htmx:configRequest", ((event: CustomEvent) => {
    const form = (event.target as HTMLElement | null)?.closest?.("form.contact-form") as
      | HTMLFormElement
      | null;
    if (!form) return;
    fillAttributionFields(form);
  }) as EventListener);

  document.body.addEventListener("htmx:afterRequest", ((event: CustomEvent) => {
    const detail = event.detail as { successful?: boolean; xhr?: XMLHttpRequest };
    const form = (event.target as HTMLElement | null)?.closest?.(
      "form.contact-form",
    ) as HTMLFormElement | null;
    if (!form || !detail?.successful) return;
    const status = detail.xhr?.status ?? 200;
    const intent = form.dataset.formIntent || form.querySelector<HTMLInputElement>('input[name="intent"]')?.value;
    const source = form.querySelector<HTMLInputElement>('input[name="source"]')?.value;
    const params = getAttribution();
    reachGoal("form_submit", { status, intent, source, ...params });
    // Lead delivered = API accepted the form (optimize Direct on this, not bare form_submit alone).
    reachGoal("lead_delivered", { status, intent, source, landing_page: params.landing_page });
    if (intent === "estimate" || intent === "order" || form.closest("[data-contact-modal]")) {
      reachGoal("consultation_request", { intent: intent || "estimate", source });
    }
    if (form.closest("[data-contact-modal]")) {
      closeFromModal();
    }
  }) as EventListener);
}

function closeFromModal() {
  const closer = document.querySelector<HTMLElement>("[data-contact-modal] [data-contact-close]");
  closer?.click();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFormAttribution, { once: true });
} else {
  initFormAttribution();
}

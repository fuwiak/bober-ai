import { demandRadarParams, getAttribution, reachGoal } from "@/lib/analytics";
import { DEMAND_RADAR_EVENTS } from "@/lib/demand-radar/tracking-contract";

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

function formRadarFields(form: HTMLFormElement) {
  const service = form.querySelector<HTMLInputElement>('input[name="service"]')?.value || "";
  const source = form.querySelector<HTMLInputElement>('input[name="source"]')?.value || "";
  return demandRadarParams({ service, source, landing_path: window.location.pathname });
}

function wireFormStart(form: HTMLFormElement) {
  if (form.dataset.radarStartWired === "1") return;
  form.dataset.radarStartWired = "1";
  let started = false;
  const markStart = () => {
    if (started) return;
    started = true;
    const prefix = form.dataset.trackingPrefix || "";
    const goal = prefix
      ? `${prefix}_${DEMAND_RADAR_EVENTS.form_start}`
      : DEMAND_RADAR_EVENTS.form_start;
    const variant = form.dataset.formLength;
    reachGoal(goal, {
      ...formRadarFields(form),
      ...(variant ? { form_length: variant } : {}),
    });
  };
  form.addEventListener("focusin", markStart);
  form.addEventListener("input", markStart);
}

function initFormAttribution() {
  document.querySelectorAll<HTMLFormElement>("form.contact-form").forEach(wireFormStart);

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
    const intent =
      form.dataset.formIntent ||
      form.querySelector<HTMLInputElement>('input[name="intent"]')?.value;
    const radar = formRadarFields(form);
    reachGoal(DEMAND_RADAR_EVENTS.form_submit, { status, intent, ...radar });
    // Lead delivered = API accepted the form (optimize Direct on this, not bare form_submit alone).
    reachGoal(DEMAND_RADAR_EVENTS.lead_delivered, { status, intent, ...radar });
    if (intent === "estimate" || intent === "order" || form.closest("[data-contact-modal]")) {
      reachGoal("consultation_request", { intent: intent || "estimate", ...radar });
    }
    if (form.closest("[data-contact-modal]")) {
      closeFromModal();
    }
  }) as EventListener);

  document.body.addEventListener("htmx:afterSwap", () => {
    document.querySelectorAll<HTMLFormElement>("form.contact-form").forEach(wireFormStart);
  });
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

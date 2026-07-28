import { getAttribution, reachGoal } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/site";

function initProcessReview(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("[data-pr-form]");
  const success = root.querySelector<HTMLElement>("[data-pr-success]");
  const errorEl = root.querySelector<HTMLElement>("[data-pr-error]");
  const submitBtn = root.querySelector<HTMLButtonElement>("[data-pr-submit]");
  const locale = root.dataset.locale || "ru";

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const description = root.querySelector<HTMLTextAreaElement>("[data-pr-description]")?.value.trim() || "";
    const systems = root.querySelector<HTMLInputElement>("[data-pr-systems]")?.value.trim() || "";
    const reference = root.querySelector<HTMLInputElement>("[data-pr-reference]")?.value.trim() || "";
    const email = root.querySelector<HTMLInputElement>("[data-pr-email]")?.value.trim() || "";
    const telegram = root.querySelector<HTMLInputElement>("[data-pr-telegram]")?.value.trim() || "";
    const consent = root.querySelector<HTMLInputElement>("[data-pr-consent]")?.checked;

    const showError = (msg: string) => {
      if (!errorEl) return;
      errorEl.hidden = false;
      errorEl.textContent = msg;
    };

    if (!consent) {
      showError(root.dataset.errorConsent || "");
      return;
    }
    if (!description) {
      showError(root.dataset.errorDescription || "");
      return;
    }
    if (!email) {
      showError(root.dataset.errorEmail || "");
      return;
    }

    if (errorEl) errorEl.hidden = true;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = root.dataset.sending || "…";
    }

    const message = [
      root.dataset.msgPrefix || "",
      "",
      description,
      systems ? `\n${root.dataset.systemsLabel}: ${systems}` : "",
      reference ? `${root.dataset.refLabel}: ${reference}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const contactValue = [email && `Email: ${email}`, telegram && `Telegram: ${telegram}`]
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: email,
          contact: contactValue,
          email,
          message,
          source: "process-review-intake",
          policyAccepted: true,
          consent: true,
          attribution: getAttribution(),
          website: "",
          locale,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        message?: string;
        ok?: boolean;
        leadId?: string;
        dryRun?: boolean;
      };
      if (!response.ok) {
        throw new Error(data.message || root.dataset.errorSend || "Error");
      }
      reachGoal("process_review_lead_submit", { leadId: data.leadId });
      if (data.ok && data.leadId && !data.dryRun) {
        reachGoal("lead_delivered", { source: "process-review-intake" });
      }
      form.hidden = true;
      if (success) {
        const title = success.querySelector("[data-pr-ok-title]");
        const body = success.querySelector("[data-pr-ok-body]");
        if (title) title.textContent = root.dataset.okTitle || "";
        if (body) body.textContent = root.dataset.okBody || "";
        success.hidden = false;
      }
    } catch (error) {
      const subject = encodeURIComponent(root.dataset.mailSubject || "Process review");
      const body = encodeURIComponent(
        [`Email: ${email}`, telegram ? `Telegram: ${telegram}` : "", "", message].filter(Boolean).join("\n"),
      );
      showError(error instanceof Error ? error.message : root.dataset.errorSend || "Error");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = root.dataset.submit || "Submit";
      }
      window.setTimeout(() => {
        window.location.href = `mailto:${root.dataset.contactEmail || CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      }, 600);
    }
  });
}

export function initProcessReviewForms() {
  document.querySelectorAll<HTMLElement>("[data-process-review]").forEach(initProcessReview);
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProcessReviewForms);
  } else {
    initProcessReviewForms();
  }
}

import { getAttribution, reachGoal } from "@/lib/analytics";

function num(el: HTMLInputElement | null, fallback: number) {
  const v = Number(el?.value);
  return Number.isFinite(v) && v > 0 ? v : fallback;
}

function format(n: number, locale: string) {
  return n.toLocaleString(locale === "en" ? "en-US" : "ru-RU");
}

function initRoi(root: HTMLElement) {
  const locale = root.dataset.locale || "ru";
  const currency = root.dataset.currency || "₽";
  const floor = Number(root.dataset.floor) || 500000;
  const employeesEl = root.querySelector<HTMLInputElement>("[data-roi-employees]");
  const hoursEl = root.querySelector<HTMLInputElement>("[data-roi-hours]");
  const salaryEl = root.querySelector<HTMLInputElement>("[data-roi-salary]");
  const savingsEl = root.querySelector<HTMLElement>("[data-roi-savings]");
  const paybackEl = root.querySelector<HTMLElement>("[data-roi-payback]");
  const openGateBtn = root.querySelector<HTMLButtonElement>("[data-roi-open-gate]");
  const gate = root.querySelector<HTMLFormElement>("[data-roi-gate]");
  const success = root.querySelector<HTMLElement>("[data-roi-success]");
  const errorEl = root.querySelector<HTMLElement>("[data-roi-error]");
  const submitBtn = root.querySelector<HTMLButtonElement>("[data-roi-submit]");
  const submitLabel = root.querySelector<HTMLElement>("[data-roi-submit-label]");
  const submittingLabel = root.querySelector<HTMLElement>("[data-roi-submitting]");

  let monthlySavings = 0;
  let paybackMonths: number | null = null;

  function recalc() {
    const employees = num(employeesEl, 5);
    const hours = num(hoursEl, 12);
    const salary = num(salaryEl, locale === "en" ? 3500 : 120000);
    const hourlyRate = salary / 168;
    const automatableShare = 0.55;
    monthlySavings = Math.round(employees * hours * 4.33 * hourlyRate * automatableShare);
    paybackMonths = monthlySavings <= 0 ? null : Math.max(1, Math.ceil(floor / monthlySavings));
    if (savingsEl) savingsEl.textContent = format(monthlySavings, locale);
    if (paybackEl) {
      paybackEl.textContent = paybackMonths
        ? `${root.dataset.paybackLabel}: ~${paybackMonths} ${root.dataset.paybackSuffix}`
        : "";
    }
  }

  [employeesEl, hoursEl, salaryEl].forEach((el) => {
    el?.addEventListener("input", () => {
      recalc();
      if (gate) gate.hidden = true;
      if (success) success.hidden = true;
      openGateBtn?.removeAttribute("hidden");
    });
  });
  recalc();

  openGateBtn?.addEventListener("click", () => {
    if (gate) gate.hidden = false;
    openGateBtn.hidden = true;
    reachGoal("roi_calculator_gate_open", {
      employees: num(employeesEl, 5),
      hours: num(hoursEl, 12),
      savings: monthlySavings,
    });
  });

  gate?.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = root.querySelector<HTMLInputElement>("[data-roi-email]")?.value.trim() || "";
    const telegram = root.querySelector<HTMLInputElement>("[data-roi-telegram]")?.value.trim() || "";
    const consent = root.querySelector<HTMLInputElement>("[data-roi-consent]")?.checked;

    const showError = (msg: string) => {
      if (!errorEl) return;
      errorEl.hidden = false;
      errorEl.textContent = msg;
    };

    if (!consent) {
      showError(root.dataset.errorConsent || "");
      return;
    }
    if (!email) {
      showError(root.dataset.errorEmail || "");
      return;
    }

    if (errorEl) errorEl.hidden = true;
    if (submitBtn) submitBtn.disabled = true;
    submitLabel?.setAttribute("hidden", "");
    submittingLabel?.removeAttribute("hidden");

    const employees = num(employeesEl, 5);
    const hours = num(hoursEl, 12);
    const salary = num(salaryEl, locale === "en" ? 3500 : 120000);
    const auditItems = JSON.parse(root.dataset.auditItems || "[]") as string[];
    const message = [
      locale === "en" ? "ROI calculator inputs:" : "Ввод калькулятора ROI:",
      `${root.dataset.employeesLabel}: ${employees}`,
      `${root.dataset.hoursLabel}: ${hours}`,
      `${root.dataset.salaryLabel}: ${format(salary, locale)} ${currency}`,
      "",
      `${root.dataset.resultLabel}: ${format(monthlySavings, locale)} ${currency} / ${root.dataset.savingsLabel}`,
      paybackMonths ? `${root.dataset.paybackLabel}: ~${paybackMonths} ${root.dataset.paybackSuffix}` : "",
      "",
      root.dataset.auditTitle,
      ...auditItems.map((item) => `— ${item}`),
    ]
      .filter(Boolean)
      .join("\n");

    const contactValue = [
      email && `Email: ${email}`,
      telegram && `Telegram: ${telegram}`,
    ]
      .filter(Boolean)
      .join("\n");

    void (async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: email,
            contact: contactValue,
            email,
            message,
            source: "roi-calculator",
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
          throw new Error(data.message || root.dataset.errorSend || "error");
        }
        const goalParams = {
          employees,
          hours,
          savings: monthlySavings,
          payback: paybackMonths ?? undefined,
          leadId: data.leadId,
        };
        reachGoal("roi_calculator_lead_submit", goalParams);
        if (data.ok && data.leadId && !data.dryRun) {
          reachGoal("lead_delivered", { ...goalParams, source: "roi-calculator" });
        }
        gate.hidden = true;
        if (success) success.hidden = false;
      } catch (error) {
        showError(error instanceof Error ? error.message : root.dataset.errorSend || "error");
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        submitLabel?.removeAttribute("hidden");
        submittingLabel?.setAttribute("hidden", "");
      }
    })();
  });
}

function boot() {
  document.querySelectorAll<HTMLElement>("[data-roi-calculator]").forEach(initRoi);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}

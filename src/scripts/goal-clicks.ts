import { demandRadarParams, reachGoal } from "@/lib/analytics";

/** Wire [data-goal] clicks → Metrika reachGoal (phone / TG / WA / MAX / CTA). */
function onGoalClick(event: MouseEvent) {
  const el = (event.target as Element | null)?.closest?.<HTMLElement>("[data-goal]");
  if (!el) return;
  const goal = el.getAttribute("data-goal")?.trim();
  if (!goal) return;

  const slug = el.getAttribute("data-goal-slug")?.trim();
  const href = el.getAttribute("href") || undefined;
  const service =
    el.getAttribute("data-goal-service")?.trim() ||
    el.getAttribute("data-contact-service")?.trim() ||
    "";
  const source = el.getAttribute("data-goal-source")?.trim() || "goal-click";
  reachGoal(
    goal,
    demandRadarParams({
      service,
      source,
      landing_path: window.location.pathname,
      ...(slug ? { slug } : {}),
      ...(href ? { href } : {}),
    }),
  );
}

function initGoalClicks() {
  document.addEventListener("click", onGoalClick, true);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGoalClicks, { once: true });
} else {
  initGoalClicks();
}

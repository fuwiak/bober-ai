/**
 * Reminder schedule helpers.
 * Timezone: Europe/Moscow (UTC+3, no DST) — Russian market default.
 * Cadence: every 3 days, random wall-clock in [20:00, 22:00).
 */

export const REMINDER_TZ = "Europe/Moscow";
export const REMINDER_INTERVAL_DAYS = 3;
/** Inclusive start hour (Moscow). */
export const REMINDER_HOUR_START = 20;
/** Exclusive end hour (Moscow). */
export const REMINDER_HOUR_END = 22;

function moscowYmd(date: Date): { y: string; m: string; d: string } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: REMINDER_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "01";
  return { y: get("year"), m: get("month"), d: get("day") };
}

/** Random Date in [20:00, 22:00) Europe/Moscow, REMINDER_INTERVAL_DAYS after `from`. */
export function computeNextReminderAt(from: Date = new Date()): Date {
  const target = new Date(
    from.getTime() + REMINDER_INTERVAL_DAYS * 24 * 60 * 60 * 1000,
  );
  const { y, m, d } = moscowYmd(target);
  const windowMinutes =
    (REMINDER_HOUR_END - REMINDER_HOUR_START) * 60; /* 120 */
  const minuteOfWindow = Math.floor(Math.random() * windowMinutes);
  const hour = REMINDER_HOUR_START + Math.floor(minuteOfWindow / 60);
  const minute = minuteOfWindow % 60;
  const second = Math.floor(Math.random() * 60);
  const iso = `${y}-${m}-${d}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}+03:00`;
  return new Date(iso);
}

/** Heuristic language from client text: ru | pl | en. */
export function detectLangFromText(text: string, fallback = "ru"): string {
  const t = text || "";
  const cyr = (t.match(/[\u0400-\u04FF]/g) || []).join("").length;
  const lat = (t.match(/[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]/g) || []).join("").length;
  const plMarks = (t.match(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g) || []).length;
  if (cyr >= lat && cyr > 0) return "ru";
  if (plMarks >= 2 || /\b(nie|tak|proszę|dzień|dobry|ile|koszt)\b/i.test(t)) {
    return "pl";
  }
  if (lat > cyr && lat > 8) return "en";
  return fallback;
}

export function reminderButtonLabels(lang: string): {
  like: string;
  stop: string;
} {
  switch (lang) {
    case "pl":
      return {
        like: "Lubię to",
        stop: "Przestań wysyłać powiadomienia",
      };
    case "en":
      return {
        like: "Like",
        stop: "Stop reminders",
      };
    case "ru":
    default:
      return {
        like: "Нравится",
        stop: "Отключить уведомления",
      };
  }
}

/** callback_data must stay ≤64 bytes. */
export function reminderCallbackData(
  action: "like" | "stop",
  customerId: number,
): string {
  return `tgrem:${action}:${customerId}`;
}

export function parseReminderCallback(
  data: string,
): { action: "like" | "stop"; customerId: number } | null {
  const m = /^tgrem:(like|stop):(\d+)$/.exec(data);
  if (!m) return null;
  return { action: m[1] as "like" | "stop", customerId: Number(m[2]) };
}

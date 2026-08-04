/**
 * Meeting / call booking intent — keyword + LLM flag hybrid.
 */

/** Prefer explicit scheduling phrases; avoid bare “meeting” (product page). */
const BOOKING_KEYWORDS =
  /давайте\s+созвон|созвонимся|хочу\s+(созвон|встреч|звонок|консультац)|запис(ать|аться|ываемся)\s+(на\s+)?(созвон|встреч|консульт|звон)|назнач(ить|ьте)\s+(созвон|встреч|звонок)|консультац(ия|ию|ии)|umów|spotkani[ae]|umowic|schedule\s+(a\s+)?(call|meeting)|book\s+(a\s+)?(call|meeting)|когда\s+(можн|удобн).{0,40}(созвон|звон|встреч)|предложите?\s+(время|слот)|давайте\s+обсудим\s+(на\s+)?(созвон|звон)|давайте\s+созвонимся|провести\s+(коротк(ий|ую)\s+)?(созвон|встреч)|30[- ]?мин(утн(ый|ую))?\s+(созвон|звон)|brief\b|бриф|call\s+me|let'?s\s+(talk|call|meet)|хочу\s+поговорить|свяжитесь\s+(со\s+мной|с\s+нами)/i;

/** Soft preferred-time hints from client text (not a calendar parser). */
const PREFERRED_TIME =
  /(?:завтра|послезавтра|сегодня|в\s+понедельник|во\s+вторник|в\s+среду|в\s+четверг|в\s+пятницу|в\s+субботу|в\s+воскресенье|утром|днём|вечером|на\s+следующей\s+неделе|jutro|dziś|poniedziałek|wtorek|środ[ae]|czwartek|piątek|\d{1,2}[:.]\d{2}|\d{1,2}\s*(?:час|h|am|pm)|next\s+week|tomorrow|monday|tuesday|wednesday|thursday|friday)/gi;

export function detectBookingIntent(
  text: string,
  llmBooking = false,
): boolean {
  if (llmBooking) return true;
  const t = text.trim();
  if (!t) return false;
  // Product questions about Meeting-to-CRM alone ≠ booking request
  if (
    /meeting[- ]?to[- ]?crm|meeting.to.crm|встреч[аи]\s*→\s*crm|протоколы?\s+встреч/i.test(
      t,
    ) &&
    !BOOKING_KEYWORDS.test(t)
  ) {
    return false;
  }
  return BOOKING_KEYWORDS.test(t);
}

export function extractPreferredTime(text: string): string | null {
  const matches = text.match(PREFERRED_TIME);
  if (!matches?.length) return null;
  return [...new Set(matches.map((m) => m.trim()))].join(", ").slice(0, 200);
}

export function bookingConfirmText(lang: string): string {
  if (lang === "pl") {
    return "Zapisaliśmy prośbę o rozmowę — Paweł lub zespół odezwie się wkrótce.";
  }
  if (lang === "en") {
    return "We recorded your meeting request — Pavel or the team will follow up shortly.";
  }
  return "Заявку на созвон зафиксировали — Павел или команда свяжутся в ближайшее время.";
}

export function ensureBookingConfirmInReply(
  reply: string,
  lang: string,
): string {
  const confirm = bookingConfirmText(lang);
  const already =
    /зафиксировали|заявк[уа].*(созвон|встреч)|свяжутся|zapisaliśmy|follow up shortly|recorded your meeting/i.test(
      reply,
    );
  if (already) return reply;
  return `${reply.trim()}\n\n${confirm}`.slice(0, 4000);
}

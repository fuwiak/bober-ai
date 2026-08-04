/**
 * CRM bridge stub for Telegram Business conversations.
 *
 * TODO(Bitrix24): push handoff / qualified leads via existing
 * `src/lib/bitrix-leads.ts` or webhook → Bitrix CRM deal/lead.
 * Keep this module as the single outbound hook so engine stays CRM-agnostic.
 */

import type { StoredConversation, StoredCustomer, StoredMessage } from "@/lib/telegram-business/db/schema";

export type ConversationEventType =
  | "message_in"
  | "message_out"
  | "handoff"
  | "booking_requested"
  | "start"
  | "business_connection";

export type ConversationEvent = {
  type: ConversationEventType;
  conversation?: StoredConversation | null;
  message?: StoredMessage | null;
  customer?: StoredCustomer | null;
  meta?: Record<string, unknown>;
};

export async function onConversationEvent(event: ConversationEvent): Promise<void> {
  try {
    if (event.type === "handoff" || event.type === "booking_requested") {
      console.info(`[telegram-crm] ${event.type}`, {
        conversationId: event.conversation?.id,
        customerId: event.customer?.telegramUserId,
        mode: event.conversation?.mode,
        meta: event.meta,
      });
      // TODO: Bitrix24 lead create / update from telegram peer + last messages
      return;
    }

    if (process.env.TELEGRAM_CRM_DEBUG === "1") {
      console.info("[telegram-crm]", event.type, {
        conversationId: event.conversation?.id,
        role: event.message?.role,
      });
    }
  } catch (err) {
    console.error("[telegram-crm] onConversationEvent", err);
  }
}

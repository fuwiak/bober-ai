import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/** SQLite schema (default). Postgres uses equivalent DDL in client.ts. */

export const customers = sqliteTable(
  "tg_customers",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    telegramUserId: integer("telegram_user_id").notNull().unique(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    username: text("username"),
    lastSeenAt: integer("last_seen_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`),
  },
  (t) => [index("tg_customers_tg_uid_idx").on(t.telegramUserId)],
);

export const conversations = sqliteTable(
  "tg_conversations",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    chatId: integer("chat_id").notNull(),
    businessConnectionId: text("business_connection_id"),
    peerUserId: integer("peer_user_id"),
    mode: text("mode", { enum: ["direct", "business"] }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`),
  },
  (t) => [
    index("tg_conversations_chat_mode_idx").on(t.chatId, t.mode, t.businessConnectionId),
  ],
);

export const messages = sqliteTable(
  "tg_messages",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    conversationId: integer("conversation_id")
      .notNull()
      .references(() => conversations.id),
    role: text("role", { enum: ["user", "assistant", "system"] }).notNull(),
    text: text("text").notNull(),
    telegramMessageId: integer("telegram_message_id"),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`),
  },
  (t) => [index("tg_messages_conv_created_idx").on(t.conversationId, t.createdAt)],
);

export type ConversationMode = "direct" | "business";
export type MessageRole = "user" | "assistant" | "system";

export type StoredMessage = {
  id: number;
  conversationId: number;
  role: MessageRole;
  text: string;
  telegramMessageId: number | null;
  createdAt: Date;
};

export type StoredConversation = {
  id: number;
  chatId: number;
  businessConnectionId: string | null;
  peerUserId: number | null;
  mode: ConversationMode;
  updatedAt: Date;
};

export type StoredCustomer = {
  id: number;
  telegramUserId: number;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  lastSeenAt: Date;
};

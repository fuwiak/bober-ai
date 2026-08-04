import { and, desc, eq, isNull } from "drizzle-orm";
import {
  conversations,
  customers,
  messages,
  type ConversationMode,
  type MessageRole,
  type StoredConversation,
  type StoredCustomer,
  type StoredMessage,
} from "@/lib/telegram-business/db/schema";
import { ensureSchema, getDbBackend } from "@/lib/telegram-business/db/client";

export const HISTORY_LIMIT = (() => {
  const n = Number(process.env.TELEGRAM_HISTORY_LIMIT || "16");
  return Number.isFinite(n) && n > 0 ? Math.min(40, Math.floor(n)) : 16;
})();

let schemaReady: Promise<void> | null = null;

async function ready() {
  if (!schemaReady) schemaReady = ensureSchema();
  await schemaReady;
}

function mapCustomer(row: typeof customers.$inferSelect): StoredCustomer {
  return {
    id: row.id,
    telegramUserId: row.telegramUserId,
    firstName: row.firstName ?? null,
    lastName: row.lastName ?? null,
    username: row.username ?? null,
    lastSeenAt:
      row.lastSeenAt instanceof Date
        ? row.lastSeenAt
        : new Date(Number(row.lastSeenAt)),
  };
}

function mapConversation(row: typeof conversations.$inferSelect): StoredConversation {
  return {
    id: row.id,
    chatId: row.chatId,
    businessConnectionId: row.businessConnectionId ?? null,
    peerUserId: row.peerUserId ?? null,
    mode: row.mode as ConversationMode,
    updatedAt:
      row.updatedAt instanceof Date
        ? row.updatedAt
        : new Date(Number(row.updatedAt)),
  };
}

function mapMessage(row: typeof messages.$inferSelect): StoredMessage {
  return {
    id: row.id,
    conversationId: row.conversationId,
    role: row.role as MessageRole,
    text: row.text,
    telegramMessageId: row.telegramMessageId ?? null,
    createdAt:
      row.createdAt instanceof Date
        ? row.createdAt
        : new Date(Number(row.createdAt)),
  };
}

export async function upsertCustomer(params: {
  telegramUserId: number;
  firstName?: string;
  lastName?: string;
  username?: string;
}): Promise<StoredCustomer> {
  await ready();
  const backend = getDbBackend();
  const now = new Date();

  if (backend.kind === "sqlite") {
    const db = backend.db;
    db.insert(customers)
      .values({
        telegramUserId: params.telegramUserId,
        firstName: params.firstName ?? null,
        lastName: params.lastName ?? null,
        username: params.username ?? null,
        lastSeenAt: now,
      })
      .onConflictDoUpdate({
        target: customers.telegramUserId,
        set: {
          firstName: params.firstName ?? null,
          lastName: params.lastName ?? null,
          username: params.username ?? null,
          lastSeenAt: now,
        },
      })
      .run();
    const row = db
      .select()
      .from(customers)
      .where(eq(customers.telegramUserId, params.telegramUserId))
      .get();
    if (!row) throw new Error("upsertCustomer: missing row");
    return mapCustomer(row);
  }

  await backend.pool.query(
    `INSERT INTO tg_customers (telegram_user_id, first_name, last_name, username, last_seen_at)
     VALUES ($1, $2, $3, $4, NOW())
     ON CONFLICT (telegram_user_id) DO UPDATE SET
       first_name = EXCLUDED.first_name,
       last_name = EXCLUDED.last_name,
       username = EXCLUDED.username,
       last_seen_at = NOW()
     RETURNING id`,
    [
      params.telegramUserId,
      params.firstName ?? null,
      params.lastName ?? null,
      params.username ?? null,
    ],
  );
  const res = await backend.pool.query(
    `SELECT id, telegram_user_id, first_name, last_name, username, last_seen_at
     FROM tg_customers WHERE telegram_user_id = $1`,
    [params.telegramUserId],
  );
  const r = res.rows[0];
  return {
    id: Number(r.id),
    telegramUserId: Number(r.telegram_user_id),
    firstName: r.first_name,
    lastName: r.last_name,
    username: r.username,
    lastSeenAt: new Date(r.last_seen_at),
  };
}

export async function getOrCreateConversation(params: {
  chatId: number;
  mode: ConversationMode;
  businessConnectionId?: string | null;
  peerUserId?: number | null;
}): Promise<StoredConversation> {
  await ready();
  const backend = getDbBackend();
  const bizId = params.businessConnectionId ?? null;
  const now = new Date();

  if (backend.kind === "sqlite") {
    const db = backend.db;
    const existing = bizId
      ? db
          .select()
          .from(conversations)
          .where(
            and(
              eq(conversations.chatId, params.chatId),
              eq(conversations.mode, params.mode),
              eq(conversations.businessConnectionId, bizId),
            ),
          )
          .get()
      : db
          .select()
          .from(conversations)
          .where(
            and(
              eq(conversations.chatId, params.chatId),
              eq(conversations.mode, params.mode),
              isNull(conversations.businessConnectionId),
            ),
          )
          .get();

    if (existing) {
      db.update(conversations)
        .set({
          updatedAt: now,
          peerUserId: params.peerUserId ?? existing.peerUserId,
        })
        .where(eq(conversations.id, existing.id))
        .run();
      return mapConversation({
        ...existing,
        updatedAt: now,
        peerUserId: params.peerUserId ?? existing.peerUserId,
      });
    }

    const inserted = db
      .insert(conversations)
      .values({
        chatId: params.chatId,
        businessConnectionId: bizId,
        peerUserId: params.peerUserId ?? null,
        mode: params.mode,
        updatedAt: now,
      })
      .returning()
      .get();
    return mapConversation(inserted);
  }

  const find = await backend.pool.query(
    bizId
      ? `SELECT id, chat_id, business_connection_id, peer_user_id, mode, updated_at
         FROM tg_conversations
         WHERE chat_id = $1 AND mode = $2 AND business_connection_id = $3
         LIMIT 1`
      : `SELECT id, chat_id, business_connection_id, peer_user_id, mode, updated_at
         FROM tg_conversations
         WHERE chat_id = $1 AND mode = $2 AND business_connection_id IS NULL
         LIMIT 1`,
    bizId ? [params.chatId, params.mode, bizId] : [params.chatId, params.mode],
  );

  if (find.rows[0]) {
    const r = find.rows[0];
    await backend.pool.query(
      `UPDATE tg_conversations SET updated_at = NOW(), peer_user_id = COALESCE($2, peer_user_id) WHERE id = $1`,
      [r.id, params.peerUserId ?? null],
    );
    return {
      id: Number(r.id),
      chatId: Number(r.chat_id),
      businessConnectionId: r.business_connection_id,
      peerUserId: params.peerUserId ?? (r.peer_user_id != null ? Number(r.peer_user_id) : null),
      mode: r.mode as ConversationMode,
      updatedAt: now,
    };
  }

  const ins = await backend.pool.query(
    `INSERT INTO tg_conversations (chat_id, business_connection_id, peer_user_id, mode, updated_at)
     VALUES ($1, $2, $3, $4, NOW())
     RETURNING id, chat_id, business_connection_id, peer_user_id, mode, updated_at`,
    [params.chatId, bizId, params.peerUserId ?? null, params.mode],
  );
  const r = ins.rows[0];
  return {
    id: Number(r.id),
    chatId: Number(r.chat_id),
    businessConnectionId: r.business_connection_id,
    peerUserId: r.peer_user_id != null ? Number(r.peer_user_id) : null,
    mode: r.mode as ConversationMode,
    updatedAt: new Date(r.updated_at),
  };
}

export async function appendMessage(params: {
  conversationId: number;
  role: MessageRole;
  text: string;
  telegramMessageId?: number | null;
}): Promise<StoredMessage> {
  await ready();
  const backend = getDbBackend();
  const now = new Date();

  if (backend.kind === "sqlite") {
    const db = backend.db;
    const row = db
      .insert(messages)
      .values({
        conversationId: params.conversationId,
        role: params.role,
        text: params.text,
        telegramMessageId: params.telegramMessageId ?? null,
        createdAt: now,
      })
      .returning()
      .get();
    db.update(conversations)
      .set({ updatedAt: now })
      .where(eq(conversations.id, params.conversationId))
      .run();
    return mapMessage(row);
  }

  const ins = await backend.pool.query(
    `INSERT INTO tg_messages (conversation_id, role, text, telegram_message_id, created_at)
     VALUES ($1, $2, $3, $4, NOW())
     RETURNING id, conversation_id, role, text, telegram_message_id, created_at`,
    [
      params.conversationId,
      params.role,
      params.text,
      params.telegramMessageId ?? null,
    ],
  );
  await backend.pool.query(
    `UPDATE tg_conversations SET updated_at = NOW() WHERE id = $1`,
    [params.conversationId],
  );
  const r = ins.rows[0];
  return {
    id: Number(r.id),
    conversationId: Number(r.conversation_id),
    role: r.role as MessageRole,
    text: r.text,
    telegramMessageId: r.telegram_message_id != null ? Number(r.telegram_message_id) : null,
    createdAt: new Date(r.created_at),
  };
}

/** Oldest → newest, last N turns for LLM context. */
export async function getRecentMessages(
  conversationId: number,
  limit = HISTORY_LIMIT,
): Promise<StoredMessage[]> {
  await ready();
  const backend = getDbBackend();

  if (backend.kind === "sqlite") {
    const rows = backend.db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(desc(messages.createdAt), desc(messages.id))
      .limit(limit)
      .all();
    return rows.map(mapMessage).reverse();
  }

  const res = await backend.pool.query(
    `SELECT id, conversation_id, role, text, telegram_message_id, created_at
     FROM (
       SELECT id, conversation_id, role, text, telegram_message_id, created_at
       FROM tg_messages
       WHERE conversation_id = $1
       ORDER BY created_at DESC, id DESC
       LIMIT $2
     ) recent
     ORDER BY created_at ASC, id ASC`,
    [conversationId, limit],
  );
  return res.rows.map((r) => ({
    id: Number(r.id),
    conversationId: Number(r.conversation_id),
    role: r.role as MessageRole,
    text: r.text,
    telegramMessageId: r.telegram_message_id != null ? Number(r.telegram_message_id) : null,
    createdAt: new Date(r.created_at),
  }));
}

/** Light anti-repeat: true if candidate ≈ last assistant reply. */
export function isNearDuplicate(candidate: string, lastAssistant?: string | null): boolean {
  if (!lastAssistant) return false;
  const a = normalizeForCompare(candidate);
  const b = normalizeForCompare(lastAssistant);
  if (!a || !b) return false;
  if (a === b) return true;
  if (a.length < 40 || b.length < 40) return a === b;
  const shorter = a.length <= b.length ? a : b;
  const longer = a.length <= b.length ? b : a;
  return longer.includes(shorter) && shorter.length / longer.length > 0.85;
}

function normalizeForCompare(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[«»"""']/g, "")
    .trim();
}

/** Health / diagnostics helper. */
export async function dbHealth(): Promise<{ backend: string; ok: boolean }> {
  try {
    await ready();
    const backend = getDbBackend();
    if (backend.kind === "sqlite") {
      backend.sqlite.prepare("SELECT 1").get();
      return { backend: "sqlite", ok: true };
    }
    await backend.pool.query("SELECT 1");
    return { backend: "postgres", ok: true };
  } catch (err) {
    console.error("[telegram-business] db health", err);
    return { backend: dbBackendLabelSafe(), ok: false };
  }
}

function dbBackendLabelSafe(): string {
  return process.env.DATABASE_URL?.trim() ? "postgres" : "sqlite";
}

import { and, asc, desc, eq, isNull, lte, sql } from "drizzle-orm";
import {
  conversations,
  customers,
  messages,
  type ConversationMode,
  type MessageRole,
  type ReminderDueRow,
  type StoredConversation,
  type StoredCustomer,
  type StoredMessage,
} from "@/lib/telegram-business/db/schema";
import { ensureSchema, getDbBackend } from "@/lib/telegram-business/db/client";
import { computeNextReminderAt } from "@/lib/telegram-business/reminders/schedule";

export const HISTORY_LIMIT = (() => {
  const n = Number(process.env.TELEGRAM_HISTORY_LIMIT || "16");
  return Number.isFinite(n) && n > 0 ? Math.min(40, Math.floor(n)) : 16;
})();

let schemaReady: Promise<void> | null = null;

async function ready() {
  if (!schemaReady) schemaReady = ensureSchema();
  await schemaReady;
}

function asDate(v: unknown): Date | null {
  if (v == null) return null;
  if (v instanceof Date) return v;
  const n = Number(v);
  if (Number.isFinite(n)) return new Date(n);
  const d = new Date(String(v));
  return Number.isNaN(d.getTime()) ? null : d;
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
    remindersEnabled: Boolean(row.remindersEnabled ?? true),
    lastReminderAt: asDate(row.lastReminderAt),
    nextReminderAt: asDate(row.nextReminderAt),
    reminderLikedCount: Number(row.reminderLikedCount ?? 0),
    reminderOptedOutAt: asDate(row.reminderOptedOutAt),
    preferredLang: row.preferredLang ?? null,
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

function mapPgCustomer(r: Record<string, unknown>): StoredCustomer {
  return {
    id: Number(r.id),
    telegramUserId: Number(r.telegram_user_id),
    firstName: (r.first_name as string) ?? null,
    lastName: (r.last_name as string) ?? null,
    username: (r.username as string) ?? null,
    lastSeenAt: new Date(r.last_seen_at as string | Date),
    remindersEnabled: r.reminders_enabled !== false && r.reminders_enabled !== 0,
    lastReminderAt: asDate(r.last_reminder_at),
    nextReminderAt: asDate(r.next_reminder_at),
    reminderLikedCount: Number(r.reminder_liked_count ?? 0),
    reminderOptedOutAt: asDate(r.reminder_opted_out_at),
    preferredLang: (r.preferred_lang as string) ?? null,
  };
}

function mapPgConversation(r: Record<string, unknown>): StoredConversation {
  return {
    id: Number(r.id),
    chatId: Number(r.chat_id),
    businessConnectionId: (r.business_connection_id as string) ?? null,
    peerUserId: r.peer_user_id != null ? Number(r.peer_user_id) : null,
    mode: r.mode as ConversationMode,
    updatedAt: new Date(r.updated_at as string | Date),
  };
}

export async function upsertCustomer(params: {
  telegramUserId: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  preferredLang?: string | null;
}): Promise<StoredCustomer> {
  await ready();
  const backend = getDbBackend();
  const now = new Date();
  const nextReminder = computeNextReminderAt(now);

  if (backend.kind === "sqlite") {
    const db = backend.db;
    const existing = db
      .select()
      .from(customers)
      .where(eq(customers.telegramUserId, params.telegramUserId))
      .get();

    if (existing) {
      db.update(customers)
        .set({
          firstName: params.firstName ?? existing.firstName,
          lastName: params.lastName ?? existing.lastName,
          username: params.username ?? existing.username,
          lastSeenAt: now,
          preferredLang:
            params.preferredLang ?? existing.preferredLang ?? null,
          nextReminderAt:
            existing.nextReminderAt ??
            (existing.remindersEnabled !== false ? nextReminder : null),
        })
        .where(eq(customers.id, existing.id))
        .run();
      const row = db
        .select()
        .from(customers)
        .where(eq(customers.id, existing.id))
        .get();
      if (!row) throw new Error("upsertCustomer: missing row");
      return mapCustomer(row);
    }

    db.insert(customers)
      .values({
        telegramUserId: params.telegramUserId,
        firstName: params.firstName ?? null,
        lastName: params.lastName ?? null,
        username: params.username ?? null,
        lastSeenAt: now,
        remindersEnabled: true,
        nextReminderAt: nextReminder,
        reminderLikedCount: 0,
        preferredLang: params.preferredLang ?? null,
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
    `INSERT INTO tg_customers (
       telegram_user_id, first_name, last_name, username, last_seen_at,
       reminders_enabled, next_reminder_at, reminder_liked_count, preferred_lang
     )
     VALUES ($1, $2, $3, $4, NOW(), TRUE, $5, 0, $6)
     ON CONFLICT (telegram_user_id) DO UPDATE SET
       first_name = COALESCE(EXCLUDED.first_name, tg_customers.first_name),
       last_name = COALESCE(EXCLUDED.last_name, tg_customers.last_name),
       username = COALESCE(EXCLUDED.username, tg_customers.username),
       last_seen_at = NOW(),
       preferred_lang = COALESCE(EXCLUDED.preferred_lang, tg_customers.preferred_lang),
       next_reminder_at = COALESCE(
         tg_customers.next_reminder_at,
         CASE WHEN tg_customers.reminders_enabled THEN EXCLUDED.next_reminder_at ELSE NULL END
       )`,
    [
      params.telegramUserId,
      params.firstName ?? null,
      params.lastName ?? null,
      params.username ?? null,
      nextReminder.toISOString(),
      params.preferredLang ?? null,
    ],
  );
  const res = await backend.pool.query(
    `SELECT id, telegram_user_id, first_name, last_name, username, last_seen_at,
            reminders_enabled, last_reminder_at, next_reminder_at,
            reminder_liked_count, reminder_opted_out_at, preferred_lang
     FROM tg_customers WHERE telegram_user_id = $1`,
    [params.telegramUserId],
  );
  return mapPgCustomer(res.rows[0]);
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

/** Customers due for a reminder + their latest conversation. */
export async function listDueReminders(limit = 20): Promise<ReminderDueRow[]> {
  await ready();
  const backend = getDbBackend();
  const now = new Date();

  if (backend.kind === "sqlite") {
    const due = backend.db
      .select()
      .from(customers)
      .where(
        and(
          eq(customers.remindersEnabled, true),
          lte(customers.nextReminderAt, now),
        ),
      )
      .orderBy(asc(customers.nextReminderAt))
      .limit(limit)
      .all();

    const out: ReminderDueRow[] = [];
    for (const c of due) {
      const conv = backend.db
        .select()
        .from(conversations)
        .where(eq(conversations.peerUserId, c.telegramUserId))
        .orderBy(desc(conversations.updatedAt))
        .limit(1)
        .get();
      if (!conv) continue;
      out.push({ customer: mapCustomer(c), conversation: mapConversation(conv) });
    }
    return out;
  }

  const res = await backend.pool.query(
    `SELECT
       cu.id AS cu_id, cu.telegram_user_id, cu.first_name, cu.last_name, cu.username,
       cu.last_seen_at, cu.reminders_enabled, cu.last_reminder_at, cu.next_reminder_at,
       cu.reminder_liked_count, cu.reminder_opted_out_at, cu.preferred_lang,
       co.id AS co_id, co.chat_id, co.business_connection_id, co.peer_user_id,
       co.mode, co.updated_at
     FROM tg_customers cu
     INNER JOIN LATERAL (
       SELECT id, chat_id, business_connection_id, peer_user_id, mode, updated_at
       FROM tg_conversations
       WHERE peer_user_id = cu.telegram_user_id
       ORDER BY updated_at DESC
       LIMIT 1
     ) co ON TRUE
     WHERE cu.reminders_enabled = TRUE
       AND cu.next_reminder_at IS NOT NULL
       AND cu.next_reminder_at <= NOW()
     ORDER BY cu.next_reminder_at ASC
     LIMIT $1`,
    [limit],
  );

  return res.rows.map((r) => ({
    customer: mapPgCustomer({
      id: r.cu_id,
      telegram_user_id: r.telegram_user_id,
      first_name: r.first_name,
      last_name: r.last_name,
      username: r.username,
      last_seen_at: r.last_seen_at,
      reminders_enabled: r.reminders_enabled,
      last_reminder_at: r.last_reminder_at,
      next_reminder_at: r.next_reminder_at,
      reminder_liked_count: r.reminder_liked_count,
      reminder_opted_out_at: r.reminder_opted_out_at,
      preferred_lang: r.preferred_lang,
    }),
    conversation: mapPgConversation({
      id: r.co_id,
      chat_id: r.chat_id,
      business_connection_id: r.business_connection_id,
      peer_user_id: r.peer_user_id,
      mode: r.mode,
      updated_at: r.updated_at,
    }),
  }));
}

export async function markReminderSent(customerId: number): Promise<void> {
  await ready();
  const backend = getDbBackend();
  const next = computeNextReminderAt(new Date());
  const now = new Date();

  if (backend.kind === "sqlite") {
    backend.db
      .update(customers)
      .set({ lastReminderAt: now, nextReminderAt: next })
      .where(eq(customers.id, customerId))
      .run();
    return;
  }

  await backend.pool.query(
    `UPDATE tg_customers
     SET last_reminder_at = NOW(), next_reminder_at = $2
     WHERE id = $1`,
    [customerId, next.toISOString()],
  );
}

export async function likeReminder(customerId: number): Promise<StoredCustomer | null> {
  await ready();
  const backend = getDbBackend();

  if (backend.kind === "sqlite") {
    backend.db
      .update(customers)
      .set({
        reminderLikedCount: sql`${customers.reminderLikedCount} + 1`,
      })
      .where(eq(customers.id, customerId))
      .run();
    const row = backend.db
      .select()
      .from(customers)
      .where(eq(customers.id, customerId))
      .get();
    return row ? mapCustomer(row) : null;
  }

  const res = await backend.pool.query(
    `UPDATE tg_customers
     SET reminder_liked_count = reminder_liked_count + 1
     WHERE id = $1
     RETURNING id, telegram_user_id, first_name, last_name, username, last_seen_at,
               reminders_enabled, last_reminder_at, next_reminder_at,
               reminder_liked_count, reminder_opted_out_at, preferred_lang`,
    [customerId],
  );
  return res.rows[0] ? mapPgCustomer(res.rows[0]) : null;
}

export async function optOutReminders(customerId: number): Promise<StoredCustomer | null> {
  await ready();
  const backend = getDbBackend();
  const now = new Date();

  if (backend.kind === "sqlite") {
    backend.db
      .update(customers)
      .set({
        remindersEnabled: false,
        reminderOptedOutAt: now,
        nextReminderAt: null,
      })
      .where(eq(customers.id, customerId))
      .run();
    const row = backend.db
      .select()
      .from(customers)
      .where(eq(customers.id, customerId))
      .get();
    return row ? mapCustomer(row) : null;
  }

  const res = await backend.pool.query(
    `UPDATE tg_customers
     SET reminders_enabled = FALSE,
         reminder_opted_out_at = NOW(),
         next_reminder_at = NULL
     WHERE id = $1
     RETURNING id, telegram_user_id, first_name, last_name, username, last_seen_at,
               reminders_enabled, last_reminder_at, next_reminder_at,
               reminder_liked_count, reminder_opted_out_at, preferred_lang`,
    [customerId],
  );
  return res.rows[0] ? mapPgCustomer(res.rows[0]) : null;
}

export async function getCustomerById(id: number): Promise<StoredCustomer | null> {
  await ready();
  const backend = getDbBackend();

  if (backend.kind === "sqlite") {
    const row = backend.db
      .select()
      .from(customers)
      .where(eq(customers.id, id))
      .get();
    return row ? mapCustomer(row) : null;
  }

  const res = await backend.pool.query(
    `SELECT id, telegram_user_id, first_name, last_name, username, last_seen_at,
            reminders_enabled, last_reminder_at, next_reminder_at,
            reminder_liked_count, reminder_opted_out_at, preferred_lang
     FROM tg_customers WHERE id = $1`,
    [id],
  );
  return res.rows[0] ? mapPgCustomer(res.rows[0]) : null;
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

import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import Database from "better-sqlite3";
import pg from "pg";
import * as schema from "@/lib/telegram-business/db/schema";

export type SqliteDb = ReturnType<typeof drizzleSqlite<typeof schema>>;
export type PgDb = ReturnType<typeof drizzlePg>;

export type DbBackend =
  | { kind: "sqlite"; db: SqliteDb; sqlite: Database.Database }
  | { kind: "postgres"; db: PgDb; pool: pg.Pool };

let cached: DbBackend | null = null;

const SQLITE_DDL = `
CREATE TABLE IF NOT EXISTS tg_customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  telegram_user_id INTEGER NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  username TEXT,
  last_seen_at INTEGER NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)),
  reminders_enabled INTEGER NOT NULL DEFAULT 1,
  last_reminder_at INTEGER,
  next_reminder_at INTEGER,
  reminder_liked_count INTEGER NOT NULL DEFAULT 0,
  reminder_opted_out_at INTEGER,
  preferred_lang TEXT
);
CREATE INDEX IF NOT EXISTS tg_customers_tg_uid_idx ON tg_customers(telegram_user_id);
-- next_reminder index created in SQLITE_MIGRATE after ADD COLUMN (old DBs lack the col)

CREATE TABLE IF NOT EXISTS tg_conversations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chat_id INTEGER NOT NULL,
  business_connection_id TEXT,
  peer_user_id INTEGER,
  mode TEXT NOT NULL,
  updated_at INTEGER NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer))
);
CREATE INDEX IF NOT EXISTS tg_conversations_chat_mode_idx
  ON tg_conversations(chat_id, mode, business_connection_id);

CREATE TABLE IF NOT EXISTS tg_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id INTEGER NOT NULL REFERENCES tg_conversations(id),
  role TEXT NOT NULL,
  text TEXT NOT NULL,
  telegram_message_id INTEGER,
  created_at INTEGER NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer))
);
CREATE INDEX IF NOT EXISTS tg_messages_conv_created_idx
  ON tg_messages(conversation_id, created_at);

CREATE TABLE IF NOT EXISTS tg_bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER REFERENCES tg_customers(id),
  conversation_id INTEGER REFERENCES tg_conversations(id),
  telegram_user_id INTEGER,
  raw_text TEXT NOT NULL,
  preferred_time TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at INTEGER NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer))
);
CREATE INDEX IF NOT EXISTS tg_bookings_status_created_idx ON tg_bookings(status, created_at);
CREATE INDEX IF NOT EXISTS tg_bookings_customer_idx ON tg_bookings(customer_id);

CREATE TABLE IF NOT EXISTS tg_news_sent (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER NOT NULL REFERENCES tg_customers(id),
  article_url TEXT NOT NULL,
  article_title TEXT,
  sent_at INTEGER NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer))
);
CREATE INDEX IF NOT EXISTS tg_news_sent_customer_url_idx ON tg_news_sent(customer_id, article_url);
CREATE INDEX IF NOT EXISTS tg_news_sent_customer_sent_idx ON tg_news_sent(customer_id, sent_at);
CREATE UNIQUE INDEX IF NOT EXISTS tg_news_sent_customer_url_uidx ON tg_news_sent(customer_id, article_url);
`;

const SQLITE_MIGRATE = `
ALTER TABLE tg_customers ADD COLUMN reminders_enabled INTEGER NOT NULL DEFAULT 1;
ALTER TABLE tg_customers ADD COLUMN last_reminder_at INTEGER;
ALTER TABLE tg_customers ADD COLUMN next_reminder_at INTEGER;
ALTER TABLE tg_customers ADD COLUMN reminder_liked_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE tg_customers ADD COLUMN reminder_opted_out_at INTEGER;
ALTER TABLE tg_customers ADD COLUMN preferred_lang TEXT;
CREATE INDEX IF NOT EXISTS tg_customers_next_reminder_idx ON tg_customers(next_reminder_at);
CREATE TABLE IF NOT EXISTS tg_bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER REFERENCES tg_customers(id),
  conversation_id INTEGER REFERENCES tg_conversations(id),
  telegram_user_id INTEGER,
  raw_text TEXT NOT NULL,
  preferred_time TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at INTEGER NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer))
);
CREATE INDEX IF NOT EXISTS tg_bookings_status_created_idx ON tg_bookings(status, created_at);
CREATE INDEX IF NOT EXISTS tg_bookings_customer_idx ON tg_bookings(customer_id);
CREATE TABLE IF NOT EXISTS tg_news_sent (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER NOT NULL REFERENCES tg_customers(id),
  article_url TEXT NOT NULL,
  article_title TEXT,
  sent_at INTEGER NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer))
);
CREATE INDEX IF NOT EXISTS tg_news_sent_customer_url_idx ON tg_news_sent(customer_id, article_url);
CREATE INDEX IF NOT EXISTS tg_news_sent_customer_sent_idx ON tg_news_sent(customer_id, sent_at);
CREATE UNIQUE INDEX IF NOT EXISTS tg_news_sent_customer_url_uidx ON tg_news_sent(customer_id, article_url);
`;

const PG_DDL = `
CREATE TABLE IF NOT EXISTS tg_customers (
  id SERIAL PRIMARY KEY,
  telegram_user_id BIGINT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  username TEXT,
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reminders_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  last_reminder_at TIMESTAMPTZ,
  next_reminder_at TIMESTAMPTZ,
  reminder_liked_count INTEGER NOT NULL DEFAULT 0,
  reminder_opted_out_at TIMESTAMPTZ,
  preferred_lang TEXT
);
CREATE INDEX IF NOT EXISTS tg_customers_tg_uid_idx ON tg_customers(telegram_user_id);

CREATE TABLE IF NOT EXISTS tg_conversations (
  id SERIAL PRIMARY KEY,
  chat_id BIGINT NOT NULL,
  business_connection_id TEXT,
  peer_user_id BIGINT,
  mode TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS tg_conversations_chat_mode_idx
  ON tg_conversations(chat_id, mode, business_connection_id);

CREATE TABLE IF NOT EXISTS tg_messages (
  id SERIAL PRIMARY KEY,
  conversation_id INTEGER NOT NULL REFERENCES tg_conversations(id),
  role TEXT NOT NULL,
  text TEXT NOT NULL,
  telegram_message_id BIGINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS tg_messages_conv_created_idx
  ON tg_messages(conversation_id, created_at);

CREATE TABLE IF NOT EXISTS tg_bookings (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES tg_customers(id),
  conversation_id INTEGER REFERENCES tg_conversations(id),
  telegram_user_id BIGINT,
  raw_text TEXT NOT NULL,
  preferred_time TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS tg_bookings_status_created_idx ON tg_bookings(status, created_at);
CREATE INDEX IF NOT EXISTS tg_bookings_customer_idx ON tg_bookings(customer_id);

CREATE TABLE IF NOT EXISTS tg_news_sent (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES tg_customers(id),
  article_url TEXT NOT NULL,
  article_title TEXT,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS tg_news_sent_customer_url_idx ON tg_news_sent(customer_id, article_url);
CREATE INDEX IF NOT EXISTS tg_news_sent_customer_sent_idx ON tg_news_sent(customer_id, sent_at);
CREATE UNIQUE INDEX IF NOT EXISTS tg_news_sent_customer_url_uidx ON tg_news_sent(customer_id, article_url);
`;

const PG_MIGRATE = `
ALTER TABLE tg_customers ADD COLUMN IF NOT EXISTS reminders_enabled BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE tg_customers ADD COLUMN IF NOT EXISTS last_reminder_at TIMESTAMPTZ;
ALTER TABLE tg_customers ADD COLUMN IF NOT EXISTS next_reminder_at TIMESTAMPTZ;
ALTER TABLE tg_customers ADD COLUMN IF NOT EXISTS reminder_liked_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE tg_customers ADD COLUMN IF NOT EXISTS reminder_opted_out_at TIMESTAMPTZ;
ALTER TABLE tg_customers ADD COLUMN IF NOT EXISTS preferred_lang TEXT;
CREATE INDEX IF NOT EXISTS tg_customers_next_reminder_idx ON tg_customers(next_reminder_at);
CREATE TABLE IF NOT EXISTS tg_bookings (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES tg_customers(id),
  conversation_id INTEGER REFERENCES tg_conversations(id),
  telegram_user_id BIGINT,
  raw_text TEXT NOT NULL,
  preferred_time TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS tg_bookings_status_created_idx ON tg_bookings(status, created_at);
CREATE INDEX IF NOT EXISTS tg_bookings_customer_idx ON tg_bookings(customer_id);
CREATE TABLE IF NOT EXISTS tg_news_sent (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES tg_customers(id),
  article_url TEXT NOT NULL,
  article_title TEXT,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS tg_news_sent_customer_url_idx ON tg_news_sent(customer_id, article_url);
CREATE INDEX IF NOT EXISTS tg_news_sent_customer_sent_idx ON tg_news_sent(customer_id, sent_at);
CREATE UNIQUE INDEX IF NOT EXISTS tg_news_sent_customer_url_uidx ON tg_news_sent(customer_id, article_url);
`;

function sqlitePath(): string {
  const raw =
    process.env.TELEGRAM_DB_PATH?.trim() ||
    resolve(process.cwd(), "data/telegram-bot.sqlite");
  return resolve(raw);
}

export function dbBackendLabel(): string {
  return process.env.DATABASE_URL?.trim() ? "postgres" : "sqlite";
}

export function getDbBackend(): DbBackend {
  if (cached) return cached;

  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (databaseUrl) {
    const pool = new pg.Pool({ connectionString: databaseUrl });
    const db = drizzlePg(pool);
    cached = { kind: "postgres", db, pool };
    return cached;
  }

  const path = sqlitePath();
  mkdirSync(dirname(path), { recursive: true });
  const sqlite = new Database(path);
  sqlite.pragma("journal_mode = WAL");
  sqlite.exec(SQLITE_DDL);
  for (const stmt of SQLITE_MIGRATE.trim().split(";").map((s) => s.trim()).filter(Boolean)) {
    try {
      sqlite.exec(stmt);
    } catch {
      /* column already exists */
    }
  }
  const db = drizzleSqlite(sqlite, { schema });
  cached = { kind: "sqlite", db, sqlite };
  return cached;
}

/** Ensure tables exist (Postgres). SQLite migrates on open. */
export async function ensureSchema(): Promise<void> {
  const backend = getDbBackend();
  if (backend.kind === "postgres") {
    await backend.pool.query(PG_DDL);
    await backend.pool.query(PG_MIGRATE);
  }
}

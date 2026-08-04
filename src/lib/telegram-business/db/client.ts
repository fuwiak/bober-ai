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
  last_seen_at INTEGER NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer))
);
CREATE INDEX IF NOT EXISTS tg_customers_tg_uid_idx ON tg_customers(telegram_user_id);

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
`;

const PG_DDL = `
CREATE TABLE IF NOT EXISTS tg_customers (
  id SERIAL PRIMARY KEY,
  telegram_user_id BIGINT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  username TEXT,
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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
  const db = drizzleSqlite(sqlite, { schema });
  cached = { kind: "sqlite", db, sqlite };
  return cached;
}

/** Ensure tables exist (Postgres). SQLite migrates on open. */
export async function ensureSchema(): Promise<void> {
  const backend = getDbBackend();
  if (backend.kind === "postgres") {
    await backend.pool.query(PG_DDL);
  }
}

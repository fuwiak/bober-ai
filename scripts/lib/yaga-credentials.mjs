import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export function credentialsPath() {
  const custom = process.env.YAGA_CREDENTIALS?.trim();
  if (custom) return custom;
  return path.join(os.homedir(), ".config", "yaga", "credentials.env");
}

export function loadYagaCredentials() {
  const out = {};
  const file = credentialsPath();
  let text = "";
  try {
    text = fs.readFileSync(file, "utf8");
  } catch {
    return out;
  }
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1).replace(/\\(["'\\$])/g, "$1");
    }
    if (key) out[key] = value;
  }
  return out;
}

function shellQuote(value) {
  if (/[\s#"'\\$]/.test(value)) {
    return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return value;
}

export function saveYagaCredentials(vals) {
  const file = credentialsPath();
  fs.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 });
  const lines = [
    "# yaga credentials — do not commit",
    "# UI links: see yaga TUI → Credentials tab",
    "",
  ];
  for (const [key, value] of Object.entries(vals)) {
    if (!key || value == null || String(value).trim() === "") continue;
    lines.push(`${key}=${shellQuote(String(value).trim())}`);
  }
  lines.push("");
  fs.writeFileSync(file, lines.join("\n"), { mode: 0o600 });
  return file;
}

/** Merge keys into credentials.env and process.env. */
export function upsertYagaCredentials(pairs) {
  const current = loadYagaCredentials();
  for (const [key, value] of Object.entries(pairs)) {
    if (value == null || String(value).trim() === "") {
      delete current[key];
      delete process.env[key];
      continue;
    }
    const trimmed = String(value).trim();
    current[key] = trimmed;
    process.env[key] = trimmed;
  }
  return saveYagaCredentials(current);
}

/** File values fill empty process.env (same as yaga applyCredentials). */
export function applyYagaCredentials() {
  const vals = loadYagaCredentials();
  for (const [key, value] of Object.entries(vals)) {
    if (!String(process.env[key] || "").trim() && value) {
      process.env[key] = value;
    }
  }
  return vals;
}

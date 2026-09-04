#!/usr/bin/env node

import fetch from "./lib/fetch.mjs";

/**
 * Записи DNS-зоны в Selectel (публичный DNS для bober-systems.ru).
 *
 * Зачем: новые микросайты (bitrix / partners / amocrm) требуют A-записи
 * до того, как Caddy сможет получить сертификат.
 *
 * Документация: https://docs.selectel.ru/api/dns-actual/
 */

const DNS_API = "https://api.selectel.ru/domains/v2";
const DEFAULT_ORIGIN_IP = "45.80.131.136";

const config = {
  token: process.env.SELECTEL_IAM_TOKEN?.trim(),
  domain: process.env.SELECTEL_DOMAIN?.trim() || "bober-systems.ru",
  serviceUser: process.env.SELECTEL_SERVICE_USER?.trim(),
  servicePassword: process.env.SELECTEL_SERVICE_PASSWORD?.trim(),
  accountId: process.env.SELECTEL_ACCOUNT_ID?.trim(),
  projectName: process.env.SELECTEL_PROJECT_NAME?.trim(),
};

function fail(message) {
  console.error(`\nОшибка: ${message}`);
  process.exit(1);
}

function fqdn(name) {
  return `${name.replace(/\.$/, "")}.`;
}

/** `amocrm` / `amocrm.bober-systems.ru` / `@` → полное имя записи. */
function recordName(input) {
  const raw = String(input || "").trim().replace(/\.$/, "");
  if (!raw || raw === "@") return config.domain;
  if (raw === config.domain || raw.endsWith(`.${config.domain}`)) return raw;
  return `${raw}.${config.domain}`;
}

async function apiRequest(path, options = {}) {
  const headers = {
    "X-Auth-Token": config.token,
    Accept: "application/json",
    ...(options.json ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
  };
  const response = await fetch(`${DNS_API}${path}`, { ...options, headers });
  const text = await response.text();
  let body = null;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }
  if (!response.ok) {
    const details = typeof body === "string" ? body : JSON.stringify(body, null, 2);
    throw new Error(`HTTP ${response.status} ${response.statusText}\n${details}`);
  }
  return body;
}

async function ensureToken() {
  if (config.token) return config.token;

  if (!config.serviceUser || !config.servicePassword || !config.accountId || !config.projectName) {
    fail(
      "Задайте SELECTEL_IAM_TOKEN или SELECTEL_SERVICE_USER/SELECTEL_SERVICE_PASSWORD/SELECTEL_ACCOUNT_ID/SELECTEL_PROJECT_NAME",
    );
  }

  const response = await fetch("https://cloud.api.selcloud.ru/identity/v3/auth/tokens", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      auth: {
        identity: {
          methods: ["password"],
          password: {
            user: {
              name: config.serviceUser,
              domain: { name: config.accountId },
              password: config.servicePassword,
            },
          },
        },
        scope: {
          project: { name: config.projectName, domain: { name: config.accountId } },
        },
      },
    }),
  });

  const token = response.headers.get("x-subject-token");
  if (!response.ok || !token) {
    const details = await response.text().catch(() => "");
    fail(`Не удалось получить IAM-токен Selectel\n${details}`);
  }
  config.token = token;
  return token;
}

async function getZone() {
  const data = await apiRequest(`/zones?filter=${encodeURIComponent(config.domain)}`);
  const zone = (data.result || []).find((item) => item.name === fqdn(config.domain));
  if (!zone) fail(`Зона ${config.domain} не найдена в Selectel DNS`);
  return zone;
}

async function listRrsets(zoneId) {
  const data = await apiRequest(`/zones/${zoneId}/rrset?limit=1000`);
  return data.result || [];
}

async function cmdList() {
  await ensureToken();
  const zone = await getZone();
  const rrsets = await listRrsets(zone.id);
  console.log(`Зона ${zone.name} (${zone.id})\n`);
  for (const rr of rrsets.filter((r) => ["A", "AAAA", "CNAME"].includes(r.type))) {
    const values = (rr.records || []).map((r) => r.content).join(", ");
    console.log(`  ${rr.type.padEnd(5)} ${rr.name.padEnd(36)} ${values}  ttl=${rr.ttl}`);
  }
}

/** Идемпотентно: создаёт A-запись или сообщает, что она уже верна. */
async function cmdEnsureA(nameArg, ipArg, { dryRun }) {
  if (!nameArg) fail("Укажите имя: npm run selectel:dns -- ensure-a amocrm");
  const name = recordName(nameArg);
  const ip = (ipArg || DEFAULT_ORIGIN_IP).trim();

  await ensureToken();
  const zone = await getZone();
  const rrsets = await listRrsets(zone.id);
  const existing = rrsets.find((rr) => rr.name === fqdn(name) && rr.type === "A");
  const current = existing ? (existing.records || []).map((r) => r.content) : [];

  if (existing && current.length === 1 && current[0] === ip) {
    console.log(`  ✓ A ${name} → ${ip} — уже настроено`);
    return;
  }

  const action = existing ? `изменить (сейчас ${current.join(", ") || "пусто"})` : "создать";
  console.log(`  → ${action}: A ${name} → ${ip} (зона ${zone.name})`);

  if (dryRun) {
    console.log("  ! --dry-run: запись не изменена");
    return;
  }

  if (existing) {
    await apiRequest(`/zones/${zone.id}/rrset/${existing.id}`, {
      method: "PATCH",
      json: true,
      body: JSON.stringify({ ttl: 300, records: [{ content: ip, disabled: false }] }),
    });
  } else {
    await apiRequest(`/zones/${zone.id}/rrset`, {
      method: "POST",
      json: true,
      body: JSON.stringify({
        name: fqdn(name),
        type: "A",
        ttl: 300,
        records: [{ content: ip, disabled: false }],
      }),
    });
  }
  console.log(`  ✓ A ${name} → ${ip}`);
  console.log("  Дальше: Caddy получит сертификат при следующем запросе (порты 80/443 открыты).");
}

function printHelp() {
  console.log(`
Selectel DNS — записи зоны ${config.domain}

Команды:
  list                        A / AAAA / CNAME записи зоны
  ensure-a <имя> [ip]         Создать или поправить A-запись (по умолчанию ${DEFAULT_ORIGIN_IP})

Флаги:
  --dry-run                   Показать план без изменения зоны

Переменные:
  SELECTEL_IAM_TOKEN          IAM-токен проекта (X-Auth-Token), 24ч
  SELECTEL_SERVICE_USER       Сервисный пользователь (иначе токен берётся по логину)
  SELECTEL_SERVICE_PASSWORD
  SELECTEL_ACCOUNT_ID
  SELECTEL_PROJECT_NAME
  SELECTEL_DOMAIN             По умолчанию bober-systems.ru

Примеры:
  npm run selectel:dns -- list
  npm run selectel:dns -- ensure-a amocrm --dry-run
  npm run selectel:dns -- ensure-a amocrm
`);
}

async function main() {
  const args = process.argv.slice(2);
  const flags = new Set(args.filter((a) => a.startsWith("--")));
  const positional = args.filter((a) => !a.startsWith("--"));
  const command = positional[0];
  const options = { dryRun: flags.has("--dry-run") };

  try {
    if (!command || command === "help") return printHelp();
    if (command === "list") return await cmdList();
    if (command === "ensure-a") return await cmdEnsureA(positional[1], positional[2], options);
    fail(`Неизвестная команда: ${command}`);
  } catch (error) {
    fail(error.message || String(error));
  }
}

main();

#!/usr/bin/env node

import fetch from "./lib/fetch.mjs";

/**
 * Настройка почтового сервиса Selectel (SMTP relay) для домена.
 *
 * Важно: Selectel не предоставляет полноценные почтовые ящики (IMAP/POP3).
 * После настройки можно отправлять письма с любого адреса на домене,
 * например hello@tony-ai.ru, через smtp.mail.selcloud.ru.
 *
 * Документация:
 * - https://docs.selectel.ru/email-service/connect-email-service/
 * - https://docs.selectel.ru/api/email-service/
 * - https://docs.selectel.ru/api/dns-actual/
 */

const SES_API = "https://api.selectel.ru/ses/v1";
const DNS_API = "https://api.selectel.ru/domains/v2";

const config = {
  token: process.env.SELECTEL_IAM_TOKEN?.trim(),
  domain: process.env.SELECTEL_DOMAIN?.trim() || "tony-ai.ru",
  sender: process.env.SELECTEL_MAIL_FROM?.trim() || "hello@tony-ai.ru",
  resourceName: process.env.SELECTEL_SES_RESOURCE_NAME?.trim() || "tony-ai-mail",
  dkimValue: process.env.SELECTEL_DKIM_VALUE?.trim(),
  serviceUser: process.env.SELECTEL_SERVICE_USER?.trim(),
  servicePassword: process.env.SELECTEL_SERVICE_PASSWORD?.trim(),
  accountId: process.env.SELECTEL_ACCOUNT_ID?.trim(),
  projectName: process.env.SELECTEL_PROJECT_NAME?.trim(),
};

function fail(message) {
  console.error(`\nОшибка: ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`  ✓ ${message}`);
}

function warn(message) {
  console.log(`  ! ${message}`);
}

function fqdn(name) {
  const trimmed = name.replace(/\.$/, "");
  return `${trimmed}.`;
}

function authHeaders(json = false) {
  const headers = {
    "X-Auth-Token": config.token,
    Accept: "application/json",
  };
  if (json) headers["Content-Type"] = "application/json";
  return headers;
}

async function apiRequest(base, path, options = {}) {
  const response = await fetch(`${base}${path}`, {
    ...options,
    headers: {
      ...authHeaders(options.json),
      ...(options.headers || {}),
    },
    body: options.body,
  });

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
    fail("Задайте SELECTEL_IAM_TOKEN или пару SELECTEL_SERVICE_USER/SELECTEL_SERVICE_PASSWORD/SELECTEL_ACCOUNT_ID/SELECTEL_PROJECT_NAME");
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
          project: {
            name: config.projectName,
            domain: { name: config.accountId },
          },
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

function printHelp() {
  console.log(`
Selectel — почтовый сервис (SMTP relay)

Команды:
  status   Ресурсы SES, домены, DNS-зона, статус верификации
  setup    Создать ресурс, привязать домен, настроить DNS
  token    Получить IAM-токен из сервисного пользователя

Переменные:
  SELECTEL_IAM_TOKEN              IAM-токен проекта (X-Auth-Token), 24ч
  SELECTEL_SERVICE_USER           Сервисный пользователь (для token)
  SELECTEL_SERVICE_PASSWORD
  SELECTEL_ACCOUNT_ID
  SELECTEL_PROJECT_NAME
  SELECTEL_DOMAIN                   По умолчанию tony-ai.ru
  SELECTEL_MAIL_FROM                По умолчанию hello@tony-ai.ru
  SELECTEL_SES_RESOURCE_NAME        По умолчанию tony-ai-mail
  SELECTEL_DKIM_VALUE               Значение DKIM из панели (если API не отдаёт)

Примеры:
  export SELECTEL_IAM_TOKEN="..."
  npm run selectel:mail -- status
  npm run selectel:mail -- setup

Ограничение:
  Selectel Email Service — только отправка (SMTP relay), без входящей почты.
  Для inbox используйте Yandex 360 / другой почтовый хостинг.
`);
}

async function listResources() {
  const data = await apiRequest(SES_API, "/resources");
  return data.resources || [];
}

async function getOrCreateResource() {
  const resources = await listResources();
  const existing = resources.find((item) => item.name === config.resourceName);
  if (existing) return existing;

  const created = await apiRequest(SES_API, "/resources", {
    method: "POST",
    json: true,
    body: JSON.stringify({ name: config.resourceName }),
  });
  ok(`Создан SES-ресурс: ${created.name} (${created.id})`);
  return created;
}

async function listDomains(resourceId) {
  const data = await apiRequest(SES_API, `/resources/${resourceId}/domains`);
  return data.domains || [];
}

async function linkDomain(resourceId) {
  const domains = await listDomains(resourceId);
  if (domains.includes(config.domain)) {
    ok(`Домен уже привязан: ${config.domain}`);
    return;
  }

  await apiRequest(SES_API, `/resources/${resourceId}/domains`, {
    method: "POST",
    json: true,
    body: JSON.stringify({ name: config.domain }),
  });
  ok(`Домен привязан: ${config.domain}`);
}

async function checkVerification(resourceId) {
  const data = await apiRequest(
    SES_API,
    `/resources/${resourceId}/domains/check?name=${encodeURIComponent(config.domain)}`,
  );
  return data.verification || {};
}

async function findZone() {
  const data = await apiRequest(DNS_API, `/zones?filter=${encodeURIComponent(config.domain)}`);
  const zones = data.result || [];
  const zone = zones.find((item) => item.name === fqdn(config.domain));
  if (!zone) fail(`DNS-зона ${config.domain} не найдена в Selectel DNS hosting`);
  return zone;
}

async function listRrsets(zoneId) {
  const data = await apiRequest(DNS_API, `/zones/${zoneId}/rrset`);
  return data.result || [];
}

function findRrset(rrsets, name, type) {
  return rrsets.find((item) => item.name === fqdn(name) && item.type === type);
}

async function upsertTxt(zoneId, name, content, ttl = 3600) {
  const rrsets = await listRrsets(zoneId);
  const existing = findRrset(rrsets, name, "TXT");
  const quoted = content.startsWith('"') ? content : `"${content}"`;

  if (existing) {
    const hasValue = (existing.records || []).some((record) => record.content === quoted || record.content === content);
    if (hasValue) {
      ok(`TXT уже есть: ${name}`);
      return;
    }

    await apiRequest(DNS_API, `/zones/${zoneId}/rrset/${existing.id}`, {
      method: "PATCH",
      json: true,
      body: JSON.stringify({
        records: [...(existing.records || []).map((record) => ({ content: record.content })), { content: quoted }],
      }),
    });
    ok(`TXT обновлён: ${name}`);
    return;
  }

  await apiRequest(DNS_API, `/zones/${zoneId}/rrset`, {
    method: "POST",
    json: true,
    body: JSON.stringify({
      name: fqdn(name),
      type: "TXT",
      ttl,
      records: [{ content: quoted }],
    }),
  });
  ok(`TXT создан: ${name}`);
}

async function ensureSpf(zoneId, rrsets) {
  const root = findRrset(rrsets, config.domain, "TXT");
  const spfNeedle = "include:spf.mail.selcloud.ru";
  const rootRecords = root?.records || [];
  const spfRecord = rootRecords.find((record) => /v=spf1/i.test(record.content));

  if (spfRecord?.content.includes(spfNeedle)) {
    ok("SPF уже содержит include:spf.mail.selcloud.ru");
    return;
  }

  if (spfRecord) {
    const updated = spfRecord.content.replace(/"$/, "").replace(/^"/, "");
    const merged = updated.includes("v=spf1")
      ? updated.replace(/([?~+-]all)\s*$/, "").trim() + ` include:spf.mail.selcloud.ru ?all`
      : `v=spf1 include:spf.mail.selcloud.ru ?all`;
    await apiRequest(DNS_API, `/zones/${zoneId}/rrset/${root.id}`, {
      method: "PATCH",
      json: true,
      body: JSON.stringify({
        records: rootRecords.map((record) =>
          record.content === spfRecord.content ? { content: `"${merged}"` } : { content: record.content },
        ),
      }),
    });
    ok("SPF обновлён");
    return;
  }

  await upsertTxt(zoneId, config.domain, "v=spf1 include:spf.mail.selcloud.ru ?all");
}

async function configureDns(resource) {
  const zone = await findZone();
  const rrsets = await listRrsets(zone.id);

  await upsertTxt(zone.id, config.domain, resource.dns_key);
  await ensureSpf(zone.id, rrsets);
  await upsertTxt(zone.id, `_dmarc.${config.domain}`, "v=DMARC1; p=quarantine;");

  if (config.dkimValue) {
    await upsertTxt(zone.id, `selcloud._domainkey.${config.domain}`, config.dkimValue);
  } else {
    warn("DKIM не задан. Скопируйте значение из панели Selectel и задайте SELECTEL_DKIM_VALUE, затем повторите setup");
    warn(`Имя записи: selcloud._domainkey.${config.domain}`);
  }
}

function printSmtp(resource) {
  console.log("\nSMTP для отправки:");
  console.log(`  host: smtp.mail.selcloud.ru`);
  console.log(`  ports: 1127 (TLS), 1126 (STARTTLS)`);
  console.log(`  login: ${resource.login}`);
  console.log(`  password: ${resource.password}`);
  console.log(`  from: ${config.sender}`);
  console.log("\nПримечание: отправка работает только с серверов в инфраструктуре Selectel.");
}

async function cmdStatus() {
  const resources = await listResources();
  console.log(`\nSES-ресурсы: ${resources.length}`);
  for (const resource of resources) {
    console.log(`  ${resource.id}  ${resource.name}  domains=${(resource.domains || []).join(", ") || "—"}`);
  }

  const resource = resources.find((item) => item.name === config.resourceName) || resources[0];
  if (!resource) {
    warn("SES-ресурсы не найдены");
    return;
  }

  const verification = await checkVerification(resource.id);
  console.log(`\nВерификация ${config.domain}:`);
  console.log(`  dns: ${verification.dns_status}`);
  console.log(`  spf: ${verification.spf_status}`);
  console.log(`  dkim: ${verification.dkim_status}`);
  console.log(`  dmarc: ${verification.dmarc_status}`);
  console.log(`  verified: ${verification.verification_status}`);

  try {
    const zone = await findZone();
    ok(`DNS-зона найдена: ${zone.name} (${zone.id})`);
  } catch (error) {
    warn(error.message);
  }

  printSmtp(resource);
}

async function cmdSetup() {
  const resource = await getOrCreateResource();
  await configureDns(resource);
  await linkDomain(resource.id);

  const verification = await checkVerification(resource.id);
  console.log(`\nСтатус верификации ${config.domain}:`);
  console.log(`  dns=${verification.dns_status} spf=${verification.spf_status} dkim=${verification.dkim_status} dmarc=${verification.dmarc_status}`);
  if (!verification.verification_status) {
    warn("Домен ещё не verified — DNS может обновляться до 72 часов");
  } else {
    ok("Домен verified");
  }

  printSmtp(resource);
}

async function cmdToken() {
  const token = await ensureToken();
  console.log("\nIAM-токен (24ч):");
  console.log(token);
  console.log('\nexport SELECTEL_IAM_TOKEN="' + token + '"');
}

async function main() {
  const command = process.argv[2] || "status";
  if (command === "help" || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  if (command === "token") {
    return cmdToken();
  }

  await ensureToken();

  if (command === "status") return cmdStatus();
  if (command === "setup") return cmdSetup();

  fail(`Неизвестная команда: ${command}`);
}

main().catch((error) => fail(error.message));

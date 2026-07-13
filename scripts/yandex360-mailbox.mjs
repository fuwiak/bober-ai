#!/usr/bin/env node

import crypto from "node:crypto";
import fetch from "./lib/fetch.mjs";

/**
 * Управление почтовыми ящиками Яндекс 360 для бизнеса.
 *
 * Документация:
 * - https://yandex.ru/dev/api360/doc/ru/access
 * - https://yandex.ru/dev/api360/doc/ru/ref/UserService/UserService_Create
 * - https://yandex.ru/dev/api360/doc/ru/ref/UserService/UserService_CreateUserAlias
 */

const API_BASE = "https://api360.yandex.net";

const config = {
  token: process.env.YANDEX_360_OAUTH_TOKEN?.trim() || process.env.YANDEX_OAUTH_TOKEN?.trim(),
  orgId: process.env.YANDEX_360_ORG_ID?.trim(),
  domain: process.env.YANDEX_360_DOMAIN?.trim() || "bober-ai.ru",
  nickname: process.env.YANDEX_360_MAILBOX_NICKNAME?.trim() || "hello",
  password: process.env.YANDEX_360_MAILBOX_PASSWORD?.trim(),
  aliasUserId: process.env.YANDEX_360_ALIAS_USER_ID?.trim(),
};

function fail(message) {
  console.error(`\nОшибка: ${message}`);
  process.exit(1);
}

function authHeaders(json = false) {
  const headers = {
    Authorization: `OAuth ${config.token}`,
    Accept: "application/json",
  };
  if (json) headers["Content-Type"] = "application/json; charset=utf-8";
  return headers;
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
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

function printHelp() {
  console.log(`
Яндекс 360 — почтовые ящики

Команды:
  status   Список организаций, доменов и ящиков
  create   Создать сотрудника (почтовый ящик nickname@domain)
  alias    Добавить алиас существующему сотруднику

Переменные окружения:
  YANDEX_360_OAUTH_TOKEN      OAuth-токен (directory:read/write_*)
  YANDEX_360_ORG_ID           ID организации (если одна — определяется автоматически)
  YANDEX_360_DOMAIN           Домен (по умолчанию bober-ai.ru)
  YANDEX_360_MAILBOX_NICKNAME Логин ящика (по умолчанию hello)
  YANDEX_360_MAILBOX_PASSWORD Пароль (если не задан — генерируется)
  YANDEX_360_ALIAS_USER_ID    ID сотрудника для команды alias

OAuth:
  1. Создайте приложение: https://oauth.yandex.ru/client/new
  2. Права: directory:read_organization, directory:read_domains,
     directory:read_users, directory:write_users
  3. Получите токен:
     https://oauth.yandex.ru/authorize?response_type=token&client_id=<CLIENT_ID>
  4. export YANDEX_360_OAUTH_TOKEN="y0_..."

Примеры:
  npm run yandex360:mailbox -- status
  npm run yandex360:mailbox -- create
  npm run yandex360:mailbox -- alias
`);
}

function generatePassword() {
  return crypto.randomBytes(18).toString("base64url");
}

async function listOrganizations() {
  const data = await apiRequest("/directory/v1/org");
  return data.organizations || [];
}

async function resolveOrgId() {
  if (config.orgId) return Number(config.orgId);
  const orgs = await listOrganizations();
  if (orgs.length === 0) fail("У аккаунта нет организаций Яндекс 360");
  if (orgs.length > 1) {
    console.log("Найдено несколько организаций — укажите YANDEX_360_ORG_ID:");
    for (const org of orgs) console.log(`  ${org.id}  ${org.name}  ${org.email || ""}`);
    fail("Задайте YANDEX_360_ORG_ID");
  }
  return orgs[0].id;
}

async function listDomains(orgId) {
  const data = await apiRequest(`/directory/v1/org/${orgId}/domains`);
  return data.domains || [];
}

async function listUsers(orgId) {
  const users = [];
  let pageToken = "";

  do {
    const query = pageToken ? `?pageToken=${encodeURIComponent(pageToken)}` : "";
    const data = await apiRequest(`/directory/v1/org/${orgId}/users${query}`);
    users.push(...(data.users || []));
    pageToken = data.nextPageToken || "";
  } while (pageToken);

  return users;
}

function findUserByEmail(users, email) {
  const target = email.toLowerCase();
  return users.find((user) => {
    const emails = [user.email, ...(user.aliases || [])].filter(Boolean).map((value) => value.toLowerCase());
    return emails.includes(target) || user.nickname?.toLowerCase() === config.nickname.toLowerCase();
  });
}

async function cmdStatus() {
  const orgs = await listOrganizations();
  console.log("\nОрганизации:");
  for (const org of orgs) {
    console.log(`  ${org.id}  ${org.name}  ${org.subscriptionPlan || ""}`);
  }

  const orgId = await resolveOrgId();
  const domains = await listDomains(orgId);
  console.log(`\nДомены (org ${orgId}):`);
  for (const domain of domains) {
    console.log(`  ${domain.name}  verified=${domain.verified ?? domain.isVerified ?? "?"}`);
  }

  const users = await listUsers(orgId);
  const targetEmail = `${config.nickname}@${config.domain}`;
  const existing = findUserByEmail(users, targetEmail);

  console.log(`\nСотрудники: ${users.length}`);
  for (const user of users) {
    const aliases = user.aliases?.length ? `  aliases: ${user.aliases.join(", ")}` : "";
    console.log(`  ${user.id}  ${user.email}  ${user.displayName || user.nickname || ""}${aliases}`);
  }

  console.log(`\nЦелевой ящик: ${targetEmail}`);
  if (existing) {
    console.log(`  ✓ уже существует (${existing.id})`);
  } else {
    console.log("  ✗ не найден — можно создать: npm run yandex360:mailbox -- create");
  }
}

async function ensureDomain(orgId) {
  const domains = await listDomains(orgId);
  const domain = domains.find((item) => item.name?.toLowerCase() === config.domain.toLowerCase());
  if (!domain) {
    console.log("Подключённые домены:");
    for (const item of domains) console.log(`  ${item.name}`);
    fail(`Домен ${config.domain} не подключён к организации ${orgId}`);
  }
  const verified = domain.verified ?? domain.isVerified;
  if (verified === false) fail(`Домен ${config.domain} ещё не подтверждён в Яндекс 360`);
  return domain;
}

async function cmdCreate() {
  const orgId = await resolveOrgId();
  await ensureDomain(orgId);

  const users = await listUsers(orgId);
  const targetEmail = `${config.nickname}@${config.domain}`;
  const existing = findUserByEmail(users, targetEmail);
  if (existing) {
    console.log(`\n✓ Ящик уже существует: ${existing.email}`);
    if (existing.aliases?.length) console.log(`  Алиасы: ${existing.aliases.join(", ")}`);
    return;
  }

  const password = config.password || generatePassword();
  const payload = {
    nickname: config.nickname,
    departmentId: 1,
    name: {
      first: "Hello",
      last: "Bober AI",
    },
    displayName: "Bober AI",
    position: "Контактный ящик",
    password,
    passwordChangeRequired: false,
    language: "ru",
    timezone: "Europe/Moscow",
  };

  const user = await apiRequest(`/directory/v1/org/${orgId}/users`, {
    method: "POST",
    json: true,
    body: JSON.stringify(payload),
  });

  console.log(`\n✓ Создан почтовый ящик: ${user.email}`);
  console.log(`  ID: ${user.id}`);
  if (!config.password) {
    console.log(`  Пароль (сохраните сейчас): ${password}`);
  }
}

async function cmdAlias() {
  if (!config.aliasUserId) {
    fail("Для alias укажите YANDEX_360_ALIAS_USER_ID (ID сотрудника, которому добавить алиас)");
  }

  const orgId = await resolveOrgId();
  await ensureDomain(orgId);

  const users = await listUsers(orgId);
  const targetEmail = `${config.nickname}@${config.domain}`;
  const existing = findUserByEmail(users, targetEmail);
  if (existing) {
    console.log(`\n✓ Адрес уже существует: ${existing.email}`);
    return;
  }

  const user = await apiRequest(`/directory/v1/org/${orgId}/users/${config.aliasUserId}/aliases`, {
    method: "POST",
    json: true,
    body: JSON.stringify({ alias: config.nickname }),
  });

  console.log(`\n✓ Алиас добавлен сотруднику ${user.email}`);
  console.log(`  Алиасы: ${(user.aliases || []).join(", ")}`);
}

async function main() {
  const command = process.argv[2] || "status";

  if (command === "help" || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  if (!config.token) {
    printHelp();
    fail("Не задан YANDEX_360_OAUTH_TOKEN");
  }

  if (command === "status") return cmdStatus();
  if (command === "create") return cmdCreate();
  if (command === "alias") return cmdAlias();

  fail(`Неизвестная команда: ${command}`);
}

main().catch((error) => fail(error.message));

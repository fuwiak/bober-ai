#!/usr/bin/env node

import crypto from "node:crypto";
import { writeFileSync } from "node:fs";
import fetch from "./lib/fetch.mjs";

/**
 * Управление почтовыми ящиками Яндекс 360 для бизнеса.
 *
 * Документация:
 * - https://yandex.ru/dev/api360/doc/ru/access
 * - https://yandex.ru/dev/api360/doc/ru/ref/UserService/UserService_Create
 * - https://yandex.ru/dev/api360/doc/ru/ref/MailboxService/
 * - https://yandex.ru/dev/api360/doc/ru/ref/MailboxService/MailboxService_CreateShared
 * - https://yandex.ru/dev/api360/doc/ru/ref/MailboxService/MailboxService_Set
 */

const API_BASE = "https://api360.yandex.net";

const SHARED_SCOPES = [
  "directory:read_organization",
  "directory:read_domains",
  "directory:read_users",
  "directory:write_users",
  "ya360_admin:mail_read_shared_mailbox_inventory",
  "ya360_admin:mail_write_shared_mailbox_inventory",
];

const config = {
  token: process.env.YANDEX_360_OAUTH_TOKEN?.trim() || process.env.YANDEX_OAUTH_TOKEN?.trim(),
  clientId: process.env.YANDEX_360_CLIENT_ID?.trim(),
  orgId: process.env.YANDEX_360_ORG_ID?.trim(),
  domain: process.env.YANDEX_360_DOMAIN?.trim() || "bober-ai.dev",
  nickname: process.env.YANDEX_360_MAILBOX_NICKNAME?.trim() || "contact",
  password: process.env.YANDEX_360_MAILBOX_PASSWORD?.trim(),
  aliasUserId: process.env.YANDEX_360_ALIAS_USER_ID?.trim(),
  grantEmail:
    process.env.YANDEX_360_GRANT_EMAIL?.trim() || "stasinskipawel@yandex.ru",
  grantUserId: process.env.YANDEX_360_GRANT_USER_ID?.trim(),
  sharedFallbackNickname:
    process.env.YANDEX_360_SHARED_FALLBACK_NICKNAME?.trim() || "info",
  sharedName: process.env.YANDEX_360_SHARED_NAME?.trim() || "Contact",
  sharedDescription:
    process.env.YANDEX_360_SHARED_DESCRIPTION?.trim() ||
    "Общий контактный ящик Bober AI",
  sharedRoles: (
    process.env.YANDEX_360_SHARED_ROLES?.trim() || "shared_mailbox_owner"
  )
    .split(/[\s,]+/)
    .filter(Boolean),
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
    const err = new Error(
      `HTTP ${response.status} ${response.statusText}\n${
        typeof body === "string" ? body : JSON.stringify(body, null, 2)
      }`,
    );
    err.status = response.status;
    err.body = body;
    if (options.throwHttp === false) {
      return { ok: false, status: response.status, body };
    }
    throw err;
  }

  if (options.throwHttp === false) {
    return { ok: true, status: response.status, body };
  }
  return body;
}

function printHelp() {
  console.log(`
Яндекс 360 — почтовые ящики

Команды:
  status          Список организаций, доменов и сотрудников
  create          Создать сотрудника (почтовый ящик nickname@domain)
  alias           Добавить алиас существующему сотруднику
  shared-status   Список общих ящиков + ACL целевого
  shared-create   Создать общий ящик (contact → fallback info) + ACL
  shared-grant    Выдать ACL к уже существующему общему ящику
  oauth-url       URL для перевыпуска токена со scope shared mailbox

Переменные окружения:
  YANDEX_360_OAUTH_TOKEN      OAuth-токен
  YANDEX_360_CLIENT_ID        ClientID приложения (для oauth-url)
  YANDEX_360_ORG_ID           ID организации
  YANDEX_360_DOMAIN           Домен (по умолчанию bober-ai.dev)
  YANDEX_360_MAILBOX_NICKNAME Логин ящика (по умолчанию contact)
  YANDEX_360_MAILBOX_PASSWORD Пароль для create (если не задан — генерируется)
  YANDEX_360_ALIAS_USER_ID    ID сотрудника для команды alias
  YANDEX_360_GRANT_EMAIL      Кому выдать доступ (по умолчанию stasinskipawel@yandex.ru)
  YANDEX_360_GRANT_USER_ID    ID сотрудника для ACL (если известен)
  YANDEX_360_SHARED_FALLBACK_NICKNAME  Fallback nickname (info)

OAuth scopes для общих ящиков:
  ${SHARED_SCOPES.join("\n  ")}

Примеры:
  npm run yandex360:mailbox -- status
  npm run yandex360:mailbox -- oauth-url
  npm run yandex360:mailbox -- shared-create
  npm run yandex360:mailbox -- shared-status
  npm run yandex360:mailbox -- shared-grant
`);
}

function generatePassword() {
  return crypto.randomBytes(18).toString("base64url");
}

function buildOauthUrl() {
  if (!config.clientId) {
    fail("Для oauth-url задайте YANDEX_360_CLIENT_ID");
  }
  const params = new URLSearchParams({
    response_type: "token",
    client_id: config.clientId,
    scope: SHARED_SCOPES.join(" "),
  });
  return `https://oauth.yandex.ru/authorize?${params.toString()}`;
}

function isScopeError(error) {
  const message = String(error?.message || error || "");
  const bodyMessage =
    typeof error?.body === "object" && error.body ? String(error.body.message || "") : "";
  return (
    error?.status === 403 &&
    (/No required scope/i.test(message) || /No required scope/i.test(bodyMessage))
  );
}

function printScopeHint() {
  console.error(`
Нужны OAuth-права shared mailbox:
  ya360_admin:mail_read_shared_mailbox_inventory
  ya360_admin:mail_write_shared_mailbox_inventory

1. oauth.yandex.ru → приложение → включите эти права (Яндекс 360 для бизнеса).
2. Получите новый токен:
   npm run yandex360:mailbox -- oauth-url
3. Обновите YANDEX_360_OAUTH_TOKEN в .env / Railway.
`);
  if (config.clientId) {
    console.error(`URL:\n  ${buildOauthUrl()}\n`);
  }
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
    const emails = [user.email, ...(user.aliases || [])]
      .filter(Boolean)
      .map((value) => value.toLowerCase());
    const contacts = (user.contacts || [])
      .filter((c) => c.type === "email" && c.value)
      .map((c) => c.value.toLowerCase());
    return (
      emails.includes(target) ||
      contacts.includes(target) ||
      user.nickname?.toLowerCase() === target.split("@")[0]
    );
  });
}

function findUserByNickname(users, nickname) {
  const target = nickname.toLowerCase();
  return users.find((user) => user.nickname?.toLowerCase() === target);
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

async function listSharedMailboxes(orgId) {
  const resources = [];
  let page = 1;
  let total = Infinity;

  while (resources.length < total) {
    const data = await apiRequest(
      `/admin/v1/org/${orgId}/mailboxes/shared?page=${page}&perPage=50`,
    );
    const batch = data.resources || [];
    resources.push(...batch);
    total = data.total ?? resources.length;
    if (batch.length === 0) break;
    page += 1;
  }

  return resources;
}

async function getSharedMailbox(orgId, resourceId) {
  return apiRequest(`/admin/v1/org/${orgId}/mailboxes/shared/${resourceId}`);
}

async function findSharedByEmail(orgId, email) {
  const list = await listSharedMailboxes(orgId);
  const target = email.toLowerCase();
  for (const item of list) {
    const info = await getSharedMailbox(orgId, item.resourceId);
    if (String(info.email || "").toLowerCase() === target) {
      return { ...info, resourceId: info.id || item.resourceId, actorsCount: item.count };
    }
  }
  return null;
}

async function resolveGrantActorId(users) {
  if (config.grantUserId) return String(config.grantUserId);
  const user = findUserByEmail(users, config.grantEmail);
  if (!user) {
    fail(
      `Не найден сотрудник для ACL: ${config.grantEmail}. ` +
        `Укажите YANDEX_360_GRANT_USER_ID или добавьте сотрудника на домене организации.`,
    );
  }
  return String(user.id);
}

async function grantSharedAccess(orgId, resourceId, actorId, roles = config.sharedRoles) {
  const query = new URLSearchParams({
    actorId: String(actorId),
    notify: "delegates",
  });
  const result = await apiRequest(
    `/admin/v1/org/${orgId}/mailboxes/set/${resourceId}?${query.toString()}`,
    {
      method: "POST",
      json: true,
      body: JSON.stringify({ roles }),
    },
  );

  if (result?.taskId) {
    const status = await apiRequest(
      `/admin/v1/org/${orgId}/mailboxes/tasks/${result.taskId}`,
      { throwHttp: false },
    );
    return { taskId: result.taskId, status: status.ok ? status.body : status };
  }
  return result;
}

async function listActors(orgId, resourceId) {
  return apiRequest(`/admin/v1/org/${orgId}/mailboxes/actors/${resourceId}`);
}

function saveSharedMeta({ email, resourceId, orgId, actorId, actorEmail, taskId }) {
  const nick = email.split("@")[0];
  const credPath = `.yandex360-${nick}-shared`;
  writeFileSync(
    credPath,
    [
      `# Yandex 360 shared mailbox — do not commit`,
      `# У общего ящика нет отдельного пароля: вход через ACL сотрудника.`,
      `EMAIL=${email}`,
      `RESOURCE_ID=${resourceId}`,
      `ORG_ID=${orgId}`,
      `GRANTED_ACTOR_ID=${actorId || ""}`,
      `GRANTED_ACTOR_EMAIL=${actorEmail || ""}`,
      `GRANT_TASK_ID=${taskId || ""}`,
      `ROLES=${config.sharedRoles.join(",")}`,
      `OPEN_URL=https://mail.yandex.ru`,
      `ADMIN_URL=https://admin360.yandex.ru`,
      "",
    ].join("\n"),
    { mode: 0o600 },
  );
  return credPath;
}

async function createSharedMailbox(orgId, nickname) {
  const email = `${nickname}@${config.domain}`;
  const existing = await findSharedByEmail(orgId, email);
  if (existing) {
    return { created: false, email, resourceId: existing.resourceId || existing.id, info: existing };
  }

  const result = await apiRequest(`/admin/v1/org/${orgId}/mailboxes/shared`, {
    method: "PUT",
    json: true,
    body: JSON.stringify({
      email,
      name: config.sharedName,
      description: config.sharedDescription,
    }),
    throwHttp: false,
  });

  if (!result.ok) {
    const err = new Error(
      `HTTP ${result.status}\n${
        typeof result.body === "string" ? result.body : JSON.stringify(result.body, null, 2)
      }`,
    );
    err.status = result.status;
    err.body = result.body;
    throw err;
  }

  return {
    created: true,
    email,
    resourceId: result.body.resourceId,
    info: result.body,
  };
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
    const admin = user.isAdmin ? " [admin]" : "";
    console.log(
      `  ${user.id}  ${user.email}  ${user.displayName || user.nickname || ""}${admin}${aliases}`,
    );
  }

  console.log(`\nЦелевой ящик (сотрудник): ${targetEmail}`);
  if (existing) {
    console.log(`  ✓ уже существует (${existing.id})`);
  } else {
    console.log("  ✗ не найден — можно создать: npm run yandex360:mailbox -- create");
  }

  try {
    const shared = await listSharedMailboxes(orgId);
    console.log(`\nОбщие ящики: ${shared.length}`);
    for (const item of shared) {
      const info = await getSharedMailbox(orgId, item.resourceId);
      console.log(
        `  ${item.resourceId}  ${info.email || "?"}  ${info.name || ""}  actors=${item.count ?? "?"}`,
      );
    }
  } catch (error) {
    console.log("\nОбщие ящики: недоступны (нужны shared mailbox scopes)");
    if (isScopeError(error)) printScopeHint();
    else console.log(`  ${error.message.split("\n")[0]}`);
  }
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
      first: "Contact",
      last: "Bober AI",
    },
    displayName: "Contact Bober AI",
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

  const credPath = `.yandex360-${config.nickname}-credentials`;
  writeFileSync(
    credPath,
    [
      `# Yandex 360 mailbox credentials — do not commit`,
      `EMAIL=${user.email}`,
      `USER_ID=${user.id}`,
      `ORG_ID=${orgId}`,
      `PASSWORD=${password}`,
      `LOGIN_URL=https://mail.yandex.ru`,
      "",
    ].join("\n"),
    { mode: 0o600 },
  );
  console.log(`  Учётные данные сохранены в: ${credPath}`);
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

async function cmdOauthUrl() {
  const url = buildOauthUrl();
  console.log(`\n1. В oauth.yandex.ru у приложения включите scopes:\n`);
  for (const scope of SHARED_SCOPES) console.log(`   - ${scope}`);
  console.log(`\n2. Откройте URL под админом org и подтвердите доступ:\n\n${url}\n`);
  console.log(
    "3. Скопируйте access_token из fragment (#access_token=...) в YANDEX_360_OAUTH_TOKEN",
  );
}

async function cmdSharedStatus() {
  const orgId = await resolveOrgId();
  await ensureDomain(orgId);
  const users = await listUsers(orgId);

  let shared;
  try {
    shared = await listSharedMailboxes(orgId);
  } catch (error) {
    if (isScopeError(error)) {
      printScopeHint();
      fail("Нет OAuth scope для общих ящиков");
    }
    throw error;
  }

  console.log(`\nОбщие ящики (org ${orgId}): ${shared.length}`);
  for (const item of shared) {
    const info = await getSharedMailbox(orgId, item.resourceId);
    console.log(`\n  ${info.email || "?"}  resourceId=${item.resourceId}`);
    console.log(`    name: ${info.name || ""}`);
    console.log(`    description: ${info.description || ""}`);
    console.log(`    actorsCount: ${item.count ?? "?"}`);
    try {
      const actors = await listActors(orgId, item.resourceId);
      for (const actor of actors.actors || []) {
        const user = users.find((u) => String(u.id) === String(actor.actorId));
        console.log(
          `    - ${actor.actorId}  ${user?.email || "?"}  roles=${(actor.roles || []).join(",")}`,
        );
      }
    } catch (error) {
      console.log(`    actors: ${error.message.split("\n")[0]}`);
    }
  }

  for (const nick of [config.nickname, config.sharedFallbackNickname]) {
    const email = `${nick}@${config.domain}`;
    const employee = findUserByNickname(users, nick);
    if (employee) {
      console.log(
        `\n⚠ ${email} занят как сотрудник (id=${employee.id}) — shared create с этим ником может конфликтовать`,
      );
    }
  }
}

async function cmdSharedGrant(resourceIdArg) {
  const orgId = await resolveOrgId();
  const users = await listUsers(orgId);
  const actorId = await resolveGrantActorId(users);
  const actor = users.find((u) => String(u.id) === String(actorId));

  let resourceId = resourceIdArg || process.env.YANDEX_360_SHARED_RESOURCE_ID?.trim();
  let email = `${config.nickname}@${config.domain}`;

  if (!resourceId) {
    const existing = await findSharedByEmail(orgId, email);
    if (!existing) {
      fail(`Не найден общий ящик ${email}. Укажите resourceId: shared-grant <resourceId>`);
    }
    resourceId = existing.resourceId || existing.id;
    email = existing.email || email;
  }

  const grant = await grantSharedAccess(orgId, resourceId, actorId);
  console.log(`\n✓ ACL выдан`);
  console.log(`  mailbox: ${email}`);
  console.log(`  resourceId: ${resourceId}`);
  console.log(`  actor: ${actor?.email || config.grantEmail} (${actorId})`);
  console.log(`  roles: ${config.sharedRoles.join(", ")}`);
  if (grant?.taskId) console.log(`  taskId: ${grant.taskId}`);

  const credPath = saveSharedMeta({
    email,
    resourceId,
    orgId,
    actorId,
    actorEmail: actor?.email || config.grantEmail,
    taskId: grant?.taskId,
  });
  console.log(`  Метаданные: ${credPath}`);
}

async function cmdSharedCreate() {
  const orgId = await resolveOrgId();
  await ensureDomain(orgId);
  const users = await listUsers(orgId);
  const actorId = await resolveGrantActorId(users);
  const actor = users.find((u) => String(u.id) === String(actorId));

  const nicknames = [config.nickname];
  if (
    config.sharedFallbackNickname &&
    config.sharedFallbackNickname.toLowerCase() !== config.nickname.toLowerCase()
  ) {
    nicknames.push(config.sharedFallbackNickname);
  }

  let created = null;
  let lastError = null;

  for (const nickname of nicknames) {
    const email = `${nickname}@${config.domain}`;
    const employee = findUserByNickname(users, nickname);
    if (employee) {
      console.log(
        `\n⚠ ${email} уже занят сотрудником id=${employee.id} — пробуем следующий nickname`,
      );
      lastError = new Error(`Nickname ${nickname} занят сотрудником ${employee.id}`);
      lastError.status = 409;
      continue;
    }

    console.log(`\n→ Создание общего ящика ${email}…`);
    try {
      created = await createSharedMailbox(orgId, nickname);
      console.log(
        created.created
          ? `✓ Создан: ${created.email} (resourceId=${created.resourceId})`
          : `✓ Уже существует: ${created.email} (resourceId=${created.resourceId})`,
      );
      break;
    } catch (error) {
      lastError = error;
      if (isScopeError(error)) {
        printScopeHint();
        fail("Нет OAuth scope для создания общих ящиков");
      }
      const status = error.status;
      console.log(`  ✗ ${email}: HTTP ${status || "?"} — ${String(error.message).split("\n")[0]}`);
      if (status === 409 || status === 400 || status === 422) {
        console.log("  Пробуем fallback…");
        continue;
      }
      throw error;
    }
  }

  if (!created) {
    fail(
      lastError?.message ||
        `Не удалось создать общий ящик (${nicknames.map((n) => `${n}@${config.domain}`).join(", ")})`,
    );
  }

  console.log(
    `\n→ Выдача доступа ${actor?.email || config.grantEmail} (${actorId}) roles=${config.sharedRoles.join(",")}`,
  );
  const grant = await grantSharedAccess(orgId, created.resourceId, actorId);
  console.log(`✓ ACL задача создана${grant?.taskId ? `: ${grant.taskId}` : ""}`);

  try {
    const actors = await listActors(orgId, created.resourceId);
    for (const item of actors.actors || []) {
      const user = users.find((u) => String(u.id) === String(item.actorId));
      console.log(
        `  actor ${item.actorId} ${user?.email || ""} → ${(item.roles || []).join(",")}`,
      );
    }
  } catch {
    // ACL может быть ещё в очереди
  }

  const credPath = saveSharedMeta({
    email: created.email,
    resourceId: created.resourceId,
    orgId,
    actorId,
    actorEmail: actor?.email || config.grantEmail,
    taskId: grant?.taskId,
  });

  console.log(`\nИтог:`);
  console.log(`  Адрес: ${created.email}`);
  console.log(`  resourceId: ${created.resourceId}`);
  console.log(`  Доступ: ${actor?.email || config.grantEmail}`);
  console.log(`  Метаданные: ${credPath}`);
  console.log(`  Открыть: https://mail.yandex.ru (под ${actor?.email || config.grantEmail})`);
  console.log(
    `  Если ящик не виден: Настройки → Интерфейс → «показывать делегированные и общие ящики»`,
  );
  console.log(
    `\nОбновите .env / Railway: YANDEX_360_MAILBOX_NICKNAME=${created.email.split("@")[0]}`,
  );
}

async function main() {
  const command = process.argv[2] || "status";
  const arg = process.argv[3];

  if (command === "help" || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  if (command === "oauth-url") {
    return cmdOauthUrl();
  }

  if (!config.token) {
    printHelp();
    fail("Не задан YANDEX_360_OAUTH_TOKEN");
  }

  if (command === "status") return cmdStatus();
  if (command === "create") return cmdCreate();
  if (command === "alias") return cmdAlias();
  if (command === "shared-status") return cmdSharedStatus();
  if (command === "shared-create") return cmdSharedCreate();
  if (command === "shared-grant") return cmdSharedGrant(arg);

  fail(`Неизвестная команда: ${command}`);
}

main().catch((error) => {
  if (isScopeError(error)) printScopeHint();
  fail(error.message);
});

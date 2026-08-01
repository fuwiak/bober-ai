#!/usr/bin/env node
/**
 * Yandex Business (Sprav) price list — YML + XLSX.
 * Docs: https://yandex.ru/support/business-priority/ru/manage/price-list
 *
 * Usage:
 *   node scripts/generate-yandex-business-price.mjs
 *   npm run yandex:business:price
 *
 * Upload UI: https://yandex.ru/sprav/<id>/p/edit/price-lists/
 * Or set YML feed URL to the public feed after deploy.
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC = resolve(ROOT, "data/yandex-business-price-list.json");

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function stamp() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function buildYml(data) {
  const cats = (data.categories || [])
    .map((c) => `      <category id="${esc(c.id)}">${esc(c.name)}</category>`)
    .join("\n");

  const offers = (data.services || [])
    .map((s) => {
      const lines = [
        `      <offer id="${esc(s.id)}" available="true">`,
        `        <name>${esc(s.name)}</name>`,
        `        <vendor>${esc(data.vendor)}</vendor>`,
        `        <price>${esc(s.price)}</price>`,
        `        <currencyId>${esc(data.currencyId || "RUB")}</currencyId>`,
        `        <categoryId>${esc(s.categoryId)}</categoryId>`,
        `        <picture>${esc(s.picture)}</picture>`,
        `        <url>${esc(s.url)}</url>`,
        `        <description>${esc(s.description)}</description>`,
        `        <shortDescription>${esc(s.shortDescription)}</shortDescription>`,
        `      </offer>`,
      ];
      return lines.join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${stamp()}">
  <shop>
    <name>${esc(data.shopName)}</name>
    <company>${esc(data.company)}</company>
    <url>${esc(data.site)}</url>
    <currencies>
      <currency id="${esc(data.currencyId || "RUB")}" rate="1"/>
    </currencies>
    <categories>
${cats}
    </categories>
    <offers>
${offers}
    </offers>
  </shop>
</yml_catalog>
`;
}

function buildXlsx(data, outPath) {
  const py = `
import json
from openpyxl import Workbook
from openpyxl.styles import Font

data = json.loads(open(${JSON.stringify(SRC)}, encoding="utf-8").read())
wb = Workbook()
ws = wb.active
ws.title = "Прайс"
headers = [
    "Категория",
    "Название",
    "Идентификатор",
    "Описание",
    "Короткое описание",
    "Цена",
    "Ссылка",
    "Фотография",
    "Популярный товар",
    "В наличии",
    "Количество",
    "Единицы измерения",
]
ws.append(headers)
for cell in ws[1]:
    cell.font = Font(bold=True)

cats = {c["id"]: c["name"] for c in data.get("categories", [])}
for s in data.get("services", []):
    ws.append([
        cats.get(s["categoryId"], ""),
        s["name"],
        s["id"],
        s.get("description", ""),
        s.get("shortDescription", ""),
        s["price"],
        s.get("url", ""),
        s.get("picture", ""),
        "Да" if s.get("popular") else "",
        "",
        "1",
        "штука",
    ])

for col in ws.columns:
    width = min(60, max(12, max(len(str(c.value or "")) for c in col) + 2))
    ws.column_dimensions[col[0].column_letter].width = width

wb.save(${JSON.stringify(outPath)})
print(${JSON.stringify(outPath)})
`;
  const r = spawnSync("python3", ["-c", py], { encoding: "utf8" });
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout || "xlsx failed");
    process.exit(1);
  }
  console.log(`XLSX: ${r.stdout.trim()}`);
}

function main() {
  const data = JSON.parse(readFileSync(SRC, "utf8"));
  const ymlRel = data.outputs?.yml || "public/feeds/yandex-business-price.yml";
  const xlsxRel = data.outputs?.xlsx || "data/yandex-business-price-list.xlsx";
  const ymlPath = resolve(ROOT, ymlRel);
  const xlsxPath = resolve(ROOT, xlsxRel);

  mkdirSync(dirname(ymlPath), { recursive: true });
  mkdirSync(dirname(xlsxPath), { recursive: true });

  writeFileSync(ymlPath, buildYml(data), "utf8");
  console.log(`YML:  ${ymlPath}`);
  console.log(`URL:  ${data.site}/feeds/yandex-business-price.yml`);
  console.log(`UI:   ${data.uploadUi}`);
  console.log(`Items: ${(data.services || []).length}`);

  buildXlsx(data, xlsxPath);
}

main();

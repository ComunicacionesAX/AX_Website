#!/usr/bin/env node
/**
 * Export inventory of all UI content strings from src/i18n/dictionary.ts
 *
 * Genera:
 *   - content-inventory.json — payload completo con estructura anidada.
 *   - content-inventory.csv  — filas con Ruta / Contexto / ES / EN /
 *                              Notas / Estado. Compatible con Google Sheets.
 *   - content-inventory.xlsx — mismo contenido en formato Excel.
 *
 * Uso:
 *   node scripts/export-content.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");

// ─── 1. Cargar el módulo dictionary.ts como si fuera JS. ───
// Estrategia: compilarlo con esbuild in-memory. Si esbuild no está,
// caemos a un parser regex más frágil.
const src = readFileSync(join(ROOT, "src/i18n/dictionary.ts"), "utf8");

// Sanitizamos el TS: quitamos anotaciones de tipo, `export type`, y
// convertimos `export const` a `const`. Deja `const es`, `const en`,
// y `const dictionary`.
const jsSrc = src
  .replace(/^export type [^;]+;\s*$/gm, "")
  .replace(/^export /gm, "")
  .replace(/: typeof es\b/g, "");

// Ejecutamos el JS con Function() en un scope aislado para extraer es/en.
const runner = new Function(`
  ${jsSrc}
  return { es, en };
`);
const { es, en } = runner();

// ─── 2. Flatten a un array de filas. ───
/**
 * Recorre recursivamente el objeto y produce filas con:
 *   key    — path completo separado por "." (ej. "hero.title1")
 *   ctx    — sección top-level (nav, hero, cotizar…)
 *   esText — valor en español
 *   enText — valor en inglés (o "" si no existe)
 *
 * Arrays de objetos se expanden con índice: `productItems[0].name`.
 * Strings sueltos se registran tal cual. Números y booleanos se omiten
 * (por ejemplo `accuracy: 97` no es UX writing).
 */
function flatten(esNode, enNode, path = []) {
  const out = [];
  if (esNode === null || esNode === undefined) return out;

  if (typeof esNode === "string") {
    out.push({
      key: path.join("."),
      ctx: path[0] ?? "",
      esText: esNode,
      enText: typeof enNode === "string" ? enNode : "",
    });
    return out;
  }

  if (typeof esNode === "number" || typeof esNode === "boolean") {
    // Skip non-textual values.
    return out;
  }

  if (Array.isArray(esNode)) {
    esNode.forEach((item, i) => {
      const enItem = Array.isArray(enNode) ? enNode[i] : undefined;
      out.push(...flatten(item, enItem, [...path, `[${i}]`]));
    });
    return out;
  }

  // Object.
  for (const key of Object.keys(esNode)) {
    const enChild = enNode && typeof enNode === "object" ? enNode[key] : undefined;
    out.push(...flatten(esNode[key], enChild, [...path, key]));
  }
  return out;
}

const rows = flatten(es, en);

// ─── 3. Contexto humano por sección. ───
// Añade una descripción corta al lado del ctx técnico para que un
// UX writer entienda sin leer código.
const CTX_LABELS = {
  nav: "Navegación / header",
  hero: "Home · Hero",
  problems: "Home · 'Lo que pasa cuando decides sin datos'",
  solutions: "Home · 'Así lo solucionamos'",
  audience: "Home · '¿Para quién es Asimetrix?'",
  ecosystem: "Home · Iluma Alliance",
  research: "Home · Research Triangle",
  cta: "Home · CTA final",
  midCta: "Home · Mid CTA",
  videoSection: "Home · Video section",
  footer: "Footer",
  common: "Comunes (CTAs y labels reutilizados)",
  onix: "Widget Onix",
  saber: "El poder del saber (/poder-del-saber)",
  pigvision: "Producto PigVision (/pigvision)",
  insylo: "Producto Insylo (/insylo)",
  nodos: "Producto Sensores Ambientales (/nodos)",
  cotizar: "Formulario Cotizar (/cotizar)",
  cookies: "CookieBanner",
};

// ─── 4. CSV. ───
const csvEscape = (s) => {
  if (s === null || s === undefined) return "";
  const str = String(s);
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
};
const csvHeader = ["Ruta", "Sección", "Contexto", "Texto ES", "Texto EN", "Notas", "Estado"];
const csvLines = [csvHeader.map(csvEscape).join(",")];
for (const r of rows) {
  csvLines.push(
    [
      r.key,
      r.ctx,
      CTX_LABELS[r.ctx] ?? "",
      r.esText,
      r.enText,
      "",
      "Pendiente",
    ]
      .map(csvEscape)
      .join(","),
  );
}
const csv = csvLines.join("\n");

// ─── 5. Excel — usar xlsx (SheetJS) si está instalado, si no, escribir
//     un .xlsx mínimo a mano (spreadsheet ML). ───
async function writeXlsx() {
  try {
    const XLSX = await import("xlsx");
    const wb = XLSX.utils.book_new();
    const aoa = [
      csvHeader,
      ...rows.map((r) => [
        r.key,
        r.ctx,
        CTX_LABELS[r.ctx] ?? "",
        r.esText,
        r.enText,
        "",
        "Pendiente",
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    // Ancho de columnas
    ws["!cols"] = [
      { wch: 42 }, // Ruta
      { wch: 12 }, // Sección
      { wch: 38 }, // Contexto
      { wch: 60 }, // Texto ES
      { wch: 60 }, // Texto EN
      { wch: 30 }, // Notas
      { wch: 12 }, // Estado
    ];
    // Freeze header
    ws["!freeze"] = { xSplit: 0, ySplit: 1, topLeftCell: "A2" };
    XLSX.utils.book_append_sheet(wb, ws, "UI Content");
    XLSX.writeFile(wb, join(ROOT, "content-exports", "content-inventory.xlsx"));
    return true;
  } catch (err) {
    console.warn(
      "[warn] xlsx no disponible. Instala con: npm i --save-dev xlsx",
    );
    return false;
  }
}

// ─── 6. Escribir outputs. ───
try {
  mkdirSync(join(ROOT, "content-exports"), { recursive: true });
} catch {}
const outDir = join(ROOT, "content-exports");

writeFileSync(
  join(outDir, "content-inventory.json"),
  JSON.stringify({ es, en }, null, 2),
  "utf8",
);
writeFileSync(join(outDir, "content-inventory.csv"), csv, "utf8");

const xlsxOk = await writeXlsx();

// Summary.
console.log("");
console.log("Content export ready:");
console.log(`  ${rows.length} strings extracted (ES + EN paired)`);
console.log("");
console.log(`  content-exports/content-inventory.json`);
console.log(`  content-exports/content-inventory.csv`);
if (xlsxOk) console.log(`  content-exports/content-inventory.xlsx`);
console.log("");

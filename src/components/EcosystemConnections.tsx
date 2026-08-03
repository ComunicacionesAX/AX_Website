"use client";

import { ArrowRight, Target, Workflow, Database } from "lucide-react";

type Column = {
  title: string;
  cells: string[];
};

type Props = {
  /** Nombre del producto actual (izquierda de la conexión) — e.g. "PigVision". */
  productName: string;
  /** Rows describe las tres dimensiones — orden fijo. Se usan como labels. */
  rows: string[];
  /** Cada column = un producto compañero + sus 3 celdas (una por row). */
  columns: Column[];
};

/**
 * Reemplazo de la tabla de comparación de ecosistema.
 *
 * En lugar de una matriz densa, muestra cada conexión como una card:
 *   [Producto A] → [Producto B]
 *   ─────────────────────────────
 *   🎯 Función principal
 *      texto…
 *   ⚙️ Cómo usa los datos
 *      texto…
 *   📊 Tipo de dato utilizado
 *      texto…
 *
 * Ventajas:
 * - Scan-friendly: cada card se lee de arriba a abajo, sin cruzar columnas.
 * - Responsive natural: apila en mobile, 2 columnas en tablet+, sin overflow.
 * - Sin palabras huérfanas: los textos usan `text-pretty` (evita líneas de
 *   una palabra en el final del párrafo) y `text-wrap: balance` en títulos.
 */
export function EcosystemConnections({ productName, rows, columns }: Props) {
  const rowIcons = [Target, Workflow, Database];
  const single = columns.length === 1;

  return (
    <div
      className={
        single
          ? "mx-auto max-w-xl"
          : "grid gap-6 md:grid-cols-2"
      }
    >
      {columns.map((col) => (
        <article
          key={col.title}
          className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/15 p-8 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-cyan/30"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
            backdropFilter: "blur(12px) saturate(140%)",
            WebkitBackdropFilter: "blur(12px) saturate(140%)",
            boxShadow:
              "inset 0 1px 0 0 rgba(255,255,255,0.10)",
          }}
        >
          {/* Header: conexión producto-a-producto. Cyan chip para
              productName + arrow + nombre del compañero en blanco. */}
          <header className="flex flex-wrap items-center gap-x-3 gap-y-2 pb-5">
            <span className="inline-flex items-center rounded-full border border-cyan/30 bg-cyan/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan">
              {productName}
            </span>
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-cyan/70 transition-transform duration-500 group-hover:translate-x-1"
            />
            <span className="text-pretty text-sm font-bold uppercase tracking-wider text-white">
              {col.title}
            </span>
          </header>

          {/* Divider con acento cyan */}
          <div className="h-px w-full bg-gradient-to-r from-cyan/60 via-white/10 to-transparent" />

          {/* Rows como grupos labeled */}
          <dl className="mt-7 flex flex-col gap-7">
            {col.cells.map((cell, i) => {
              const Icon = rowIcons[i] ?? Target;
              return (
                <div key={i} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan/20 bg-cyan/10 text-cyan transition-colors group-hover:border-cyan/40 group-hover:bg-cyan/15"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan/70">
                      {rows[i]}
                    </dt>
                    <dd className="mt-2 text-pretty text-base leading-relaxed text-white/90">
                      {cell}
                    </dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </article>
      ))}
    </div>
  );
}

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Card tech-glass midnight — patrón visual reutilizable para highlights.
 * Compone: navy sólido + grid cyan animado + spot light + hairline + scan.
 * NO usa gradientes de fondo; la textura es puramente geométrica.
 *
 * Animaciones (todas respetan prefers-reduced-motion vía las keyframes en
 * globals.css:@layer base):
 * - Grid: pulsa opacidad muy sutil (10s ease-in-out).
 * - Spot: drifta lentamente cambiando de ángulo (14s).
 * - Scan: barra horizontal cyan que barre de arriba a abajo (6s).
 * - Nodos brillantes: 3 puntos cyan que pulsan en intersecciones del grid.
 *
 * El wrapper aplica `.on-dark`, así los `.btn-primary` dentro activan
 * automáticamente su variante cyan+navy del DS.
 */
export function TechGlassCard({ children, className = "" }: Props) {
  return (
    <div
      className={`on-dark relative isolate overflow-hidden rounded-3xl bg-navy shadow-2xl shadow-navy/30 ring-1 ring-white/10 ${className}`}
    >
      {/* Grid animado — pulsa opacidad para dar sensación de "vivo".
          background-size responsive: 40px en mobile (celdas más chicas
          para no sentirse grueso en un canvas pequeño) → 56px en sm+. */}
      <div
        aria-hidden="true"
        className="tech-grid pointer-events-none absolute inset-0 -z-10 [background-size:40px_40px] sm:[background-size:56px_56px]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(151,244,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(151,244,255,0.08) 1px, transparent 1px)
          `,
          maskImage:
            "radial-gradient(ellipse 90% 70% at center, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at center, black 20%, transparent 100%)",
        }}
      />
      {/* Spot cyan que drifta suavemente cambiando su origen. */}
      <div
        aria-hidden="true"
        className="tech-spot pointer-events-none absolute inset-0 -z-10"
      />
      {/* Scan-line: barrido cyan tenue de arriba a abajo. */}
      <div
        aria-hidden="true"
        className="tech-scan pointer-events-none absolute inset-x-0 -z-10 h-[3px] bg-gradient-to-r from-transparent via-cyan/50 to-transparent blur-[1px]"
      />
      {/* Nodos brillantes — 3 puntos cyan en intersecciones del grid. */}
      <span
        aria-hidden="true"
        className="tech-node pointer-events-none absolute left-[14%] top-[22%] h-1.5 w-1.5 rounded-full bg-cyan/60 shadow-[0_0_10px_2px_rgba(151,244,255,0.5)]"
      />
      <span
        aria-hidden="true"
        className="tech-node tech-node--delay1 pointer-events-none absolute left-[68%] top-[38%] h-1.5 w-1.5 rounded-full bg-cyan/60 shadow-[0_0_10px_2px_rgba(151,244,255,0.5)]"
      />
      <span
        aria-hidden="true"
        className="tech-node tech-node--delay2 pointer-events-none absolute left-[42%] top-[76%] h-1.5 w-1.5 rounded-full bg-cyan/60 shadow-[0_0_10px_2px_rgba(151,244,255,0.5)]"
      />
      {/* Hairline superior cyan. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent"
      />
      {children}
    </div>
  );
}

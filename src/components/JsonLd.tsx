/**
 * Inyecta un bloque JSON-LD (Schema.org) en el HTML.
 *
 * Server component sin `"use client"`: el marcado viaja en el HTML inicial,
 * que es lo que leen los crawlers. No renderiza nada visible.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escapamos "<" para que un valor no pueda cerrar el <script>.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

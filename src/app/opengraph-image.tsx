import { ImageResponse } from "next/og";
import { DEFAULT_DESCRIPTION } from "@/lib/site";

/**
 * Imagen de Open Graph / Twitter Card, generada en build.
 *
 * Al vivir en la raíz de `app/`, Next la hereda automáticamente en todas las
 * rutas hijas, así que una sola imagen cubre el sitio completo. Cuando haya
 * presupuesto de diseño para artes por producto, se agrega un
 * `opengraph-image.tsx` dentro de la carpeta de esa ruta y ésta queda como
 * fallback.
 *
 * Sin fuentes externas a propósito: cargar Inter implicaría un fetch en build
 * que puede fallar en CI. Los colores son los tokens del DS (globals.css).
 */
export const alt = "Asimetrix — Monitoreo inteligente para granjas porcinas y avícolas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#040939";
const TEAL = "#005980";
const CYAN = "#97f4ff";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundImage: `linear-gradient(135deg, ${NAVY} 0%, ${TEAL} 100%)`,
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 14,
              height: 64,
              backgroundColor: CYAN,
              borderRadius: 7,
              marginRight: 28,
            }}
          />
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Asimetrix
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Nunca más decidas sin datos
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.85)",
              maxWidth: 940,
            }}
          >
            {DEFAULT_DESCRIPTION}
          </div>
        </div>
      </div>
    ),
    size
  );
}

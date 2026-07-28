import { NextResponse } from "next/server";

// URL del Web App de Google Apps Script (se configura en .env.local como
// GOOGLE_SCRIPT_URL). Ver el script en scripts/google-apps-script.gs.
const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Cuerpo inválido." },
      { status: 400 }
    );
  }

  // Validación mínima: nombre y correo son obligatorios.
  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  if (!name || !email) {
    return NextResponse.json(
      { ok: false, error: "Faltan campos obligatorios." },
      { status: 422 }
    );
  }

  if (!SCRIPT_URL) {
    return NextResponse.json(
      { ok: false, error: "GOOGLE_SCRIPT_URL no está configurada." },
      { status: 500 }
    );
  }

  const payload = {
    ...data,
    submittedAt: new Date().toISOString(),
  };

  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // Apps Script responde con redirección 302 a googleusercontent; fetch
      // la sigue por defecto.
      redirect: "follow",
    });

    // Apps Script puede devolver 200 con una página HTML (login/error) sin
    // ejecutar el código, o un JSON {ok:false} si el script lanzó excepción.
    // Verificamos el cuerpo real, no solo el status.
    const text = await res.text();
    let parsed: { ok?: boolean; error?: string } | null = null;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = null;
    }

    if (!res.ok || !parsed || parsed.ok !== true) {
      return NextResponse.json(
        {
          ok: false,
          error: parsed?.error ?? `Respuesta inesperada del script (${res.status}).`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "No se pudo contactar al script." },
      { status: 502 }
    );
  }
}

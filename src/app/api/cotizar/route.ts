import { NextResponse } from "next/server";
import { createHash } from "crypto";

// Integración con Mailchimp Marketing API v3.
// Config en .env.local:
//   MAILCHIMP_API_KEY   → API key (termina en "-usXX"; el sufijo es el datacenter)
//   MAILCHIMP_LIST_ID   → Audience ID (Settings → Audience name and defaults)
//   MAILCHIMP_TAGS      → (opcional) tags fijos separados por coma, p.ej. "cotizacion,web"
const API_KEY = process.env.MAILCHIMP_API_KEY;
const LIST_ID = process.env.MAILCHIMP_LIST_ID;
const STATIC_TAGS = (process.env.MAILCHIMP_TAGS ?? "")
  .split(",")
  .map((t) => t.trim())
  .filter(Boolean);

// El datacenter es el sufijo del API key ("abc123...-us21" → "us21").
function datacenterFromKey(key: string): string | null {
  const idx = key.lastIndexOf("-");
  return idx === -1 ? null : key.slice(idx + 1);
}

// Mailchimp identifica al miembro por el MD5 del email en minúsculas.
function subscriberHash(email: string): string {
  return createHash("md5").update(email.toLowerCase()).digest("hex");
}

// Divide "Juan Pérez García" en nombre / apellidos para FNAME / LNAME.
function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { first: parts[0], last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

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

  if (!API_KEY || !LIST_ID) {
    return NextResponse.json(
      { ok: false, error: "Mailchimp no está configurado (falta MAILCHIMP_API_KEY o MAILCHIMP_LIST_ID)." },
      { status: 500 }
    );
  }

  const dc = datacenterFromKey(API_KEY);
  if (!dc) {
    return NextResponse.json(
      { ok: false, error: "MAILCHIMP_API_KEY no tiene el sufijo de datacenter (-usXX)." },
      { status: 500 }
    );
  }

  const { first, last } = splitName(name);

  // Merge fields personalizados. Deben existir en la audiencia de Mailchimp
  // (Settings → Audience fields and *|MERGE|* tags) con estos tags.
  const mergeFields: Record<string, string> = {
    FNAME: first,
    LNAME: last,
    PHONE: String(data.phone ?? ""),
    COMPANY: String(data.company ?? ""),
    LOCATION: String(data.location ?? ""),
    PRODTYPE: String(data.prodType ?? ""),
    ANIMALS: String(data.animalCount ?? ""),
    SOLUTIONS: String(data.solution ?? ""),
    DIGLEVEL: String(data.digLevel ?? ""),
    MESSAGE: String(data.message ?? ""),
  };

  // Tags: los fijos del .env + tipo de producción + cada solución elegida.
  const solutions = Array.isArray(data.solutions)
    ? (data.solutions as unknown[]).map((s) => String(s)).filter(Boolean)
    : [];
  const tagNames = [
    ...STATIC_TAGS,
    ...(data.prodType ? [String(data.prodType)] : []),
    ...solutions,
  ];

  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/${subscriberHash(email)}`;
  const auth = "Basic " + Buffer.from(`anystring:${API_KEY}`).toString("base64");

  try {
    // PUT = upsert: crea el contacto o actualiza si el email ya existe.
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: auth },
      body: JSON.stringify({
        email_address: email,
        status_if_new: "subscribed",
        // No degradamos a alguien que ya se dio de baja: solo forzamos
        // "subscribed" para contactos nuevos (status_if_new).
        merge_fields: mergeFields,
      }),
    });

    const body = (await res.json().catch(() => null)) as
      | { title?: string; detail?: string; status?: number }
      | null;

    if (!res.ok) {
      // 400 "Member In Compliance State" o similar: el email no se puede
      // resuscribir por API. Lo tratamos como error de cliente.
      return NextResponse.json(
        {
          ok: false,
          error: body?.detail ?? `Mailchimp devolvió ${res.status}.`,
        },
        { status: res.status >= 500 ? 502 : 422 }
      );
    }

    // Aplica los tags en una llamada aparte (endpoint dedicado de Mailchimp).
    if (tagNames.length) {
      await fetch(`${url}/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: auth },
        body: JSON.stringify({
          tags: tagNames.map((nameTag) => ({ name: nameTag, status: "active" })),
        }),
      }).catch(() => {
        // Los tags son best-effort: si fallan, el contacto ya quedó guardado.
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "No se pudo contactar a Mailchimp." },
      { status: 502 }
    );
  }
}

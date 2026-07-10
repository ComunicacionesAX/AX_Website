import Image from "next/image";

function Instagram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function Linkedin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 22 10.6 22 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9V9Z" />
    </svg>
  );
}

const columns = [
  { title: "Productos", links: ["PigVision", "Insylo", "Sensores Ambientales"] },
  { title: "El poder del saber", links: ["Temática 1", "Temática 2", "Temática 3"] },
  {
    title: "Centro de soporte",
    links: ["Preguntas frecuentes por producto", "Guías por producto"],
  },
];

export function Footer() {
  return (
    <footer className="bg-white px-4 pb-4 sm:px-6">
      <div className="mx-auto max-w-[84rem]">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-teal to-navy px-8 py-16 text-white sm:px-14">
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
            {/* Logo + tagline */}
            <div>
              <Image
                src="/images/logo_ax_completo.svg"
                alt="Asimetrix — Unlocking the power of data"
                width={240}
                height={44}
                className="h-10 w-auto"
              />
              <div className="mt-6 flex gap-3">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-cyan transition hover:bg-white/10"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-cyan transition hover:bg-white/10"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-lg font-medium text-white">{col.title}</h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-white/70 transition hover:text-cyan"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Cotizar */}
            <div>
              <h4 className="text-lg font-medium text-white">Cotizar</h4>
              <p className="mt-4 text-sm text-white/70">
                Escríbenos y te contactaremos.
              </p>
              <a
                href="#login"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-navy transition hover:bg-white/90"
              >
                Login
              </a>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-white/80">
                <button className="font-medium underline underline-offset-2">ES</button>
                <span className="opacity-40">|</span>
                <button className="opacity-60 transition hover:opacity-100">EN</button>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-8 text-sm text-white/50">
            <p className="text-pretty">
              Designing nutrition, enhancing lives. 1307 Person St, Durham, North
              Carolina. +57 6041500. © 2026 Iluma Alliance
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

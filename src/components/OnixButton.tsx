import Image from "next/image";

export function OnixButton() {
  return (
    <a
      href="https://onix.asimetrix.co/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Habla con Onix"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-navy/90 py-2 pl-2 pr-5 shadow-xl shadow-navy/30 ring-1 ring-white/15 backdrop-blur-sm transition hover:bg-navy"
    >
      <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-navy">
        <Image
          src="/images/logo_onix.svg"
          alt="Onix"
          width={48}
          height={48}
          className="h-11 w-11 object-contain transition group-hover:scale-105"
        />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-bold text-cyan">¡Soy Onix!</span>
        <span className="text-xs text-white/80">Hablemos</span>
      </span>
    </a>
  );
}

const MARK = "/images/logo_ax_isotipo.svg";

type Variant = "dark" | "cyan";

export function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  // En "cyan" (uso sobre header navy): isologo blanco, wordmark cyan.
  // En "dark" (uso sobre fondo claro): ambos en navy.
  const markColor = variant === "cyan" ? "text-white" : "text-navy";
  const textColor = variant === "cyan" ? "text-cyan" : "text-navy";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden
        className={`block h-9 w-9 ${markColor}`}
        style={{
          backgroundColor: "currentColor",
          WebkitMaskImage: `url(${MARK})`,
          maskImage: `url(${MARK})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
      <span className={`whitespace-nowrap text-lg font-bold tracking-tight ${textColor}`}>
        Asimetrix
        <span className="hidden font-normal opacity-80 sm:inline"> | Farm Data Analytics</span>
      </span>
    </span>
  );
}

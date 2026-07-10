const MARK = "/images/logo_ax_isotipo.svg";

type Variant = "dark" | "cyan";

export function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const color = variant === "cyan" ? "text-cyan" : "text-navy";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden
        className={`block h-9 w-9 ${color}`}
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
      <span className={`text-lg font-bold tracking-tight ${color}`}>
        Asimetrix
        <span className="font-normal opacity-80"> | Farm Data Analytics</span>
      </span>
    </span>
  );
}

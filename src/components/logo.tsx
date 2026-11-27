import { cn, scrollToHash, withBase } from "@/lib/utils";
import { clinic } from "@/lib/clinic";

export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src={withBase("/images/logo-128.webp")}
      alt=""
      width={128}
      height={128}
      className={cn(
        "size-8 rounded-xl object-cover shadow-card outline outline-1 -outline-offset-1 outline-ink/10 min-[380px]:size-11 lg:size-12",
        className,
      )}
    />
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <a
      href={withBase("/#topo")}
      onClick={scrollToHash}
      aria-label="Espaço Incluir — início"
      className={cn(
        "group flex min-h-11 min-w-0 items-center gap-1.5 rounded-md pr-1 outline-none focus-visible:ring-2 focus-visible:ring-accent/40 min-[380px]:gap-2.5",
        className,
      )}
    >
      <LogoMark />
      <span className="flex min-w-0 flex-col">
        <span className="whitespace-nowrap font-display text-[0.92rem] leading-none tracking-tight text-ink min-[380px]:text-base min-[380px]:leading-tight min-[380px]:tracking-display lg:text-lg">
          {clinic.name}
        </span>
        <span className="hidden truncate text-[0.8125rem] font-medium tracking-[0.06em] text-ink-soft uppercase min-[380px]:block">
          <span className="lg:hidden">{clinic.initials} · Aimorés · MG</span>
          <span className="hidden lg:inline">
            {clinic.initials} · {clinic.cityLine}
          </span>
        </span>
      </span>
    </a>
  );
}

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { MapPin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { mapsHref, whatsappHref } from "@/lib/clinic";
import { cn, scrollToHash, withBase } from "@/lib/utils";

const NAV = [
  { href: "/#especialidades", label: "Especialidades" },
  { href: "/#cuidado", label: "Cuidado" },
  { href: "/#equipe", label: "Equipe" },
  { href: "/#duvidas", label: "Dúvidas" },
  { href: "/#visita", label: "Visite" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function closeAndScroll(event: MouseEvent<HTMLAnchorElement>) {
    const id = (event.currentTarget.getAttribute("href") ?? "").split("#")[1];
    const onThisPage = Boolean(id && document.getElementById(id));
    if (!onThisPage) {
      setOpen(false);
      return;
    }
    event.preventDefault();
    setOpen(false);
    window.setTimeout(() => {
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }, 280);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/95">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-1.5 px-3 min-[380px]:gap-3 min-[380px]:px-4 lg:h-20 lg:gap-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Seções">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={withBase(item.href)}
              onClick={scrollToHash}
              className="text-sm font-medium text-ink-soft transition-colors duration-quick ease-out hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="md" className="max-[379px]:px-3">
            <a href={withBase("/#agendar")} onClick={scrollToHash}>
              Agendar
            </a>
          </Button>
          <Button asChild variant="outline" size="md" className="hidden lg:inline-flex">
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </a>
          </Button>
          <a
            href={mapsHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center gap-2 rounded-md px-2 text-sm font-medium text-ink lg:inline-flex"
          >
            <MapPin className="size-4" />
            Como chegar
          </a>
          <Button
            ref={menuButtonRef}
            type="button"
            variant="outline"
            size="icon"
            className="xl:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>
      <div
        id="menu-mobile"
        className={cn(
          "grid overflow-hidden border-t border-line/70 bg-bg xl:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Menu">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={withBase(item.href)}
                onClick={closeAndScroll}
                className="flex min-h-11 items-center rounded-md px-3 text-base font-medium text-ink hover:bg-surface"
              >
                {item.label}
              </a>
            ))}
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-2 rounded-md px-3 text-base font-medium text-ink"
            >
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </a>
            <a
              href={mapsHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-2 rounded-md px-3 text-base font-medium text-ink"
            >
              <MapPin className="size-4" />
              Como chegar
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

import { useEffect, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { mapsHref, whatsappHref } from "@/lib/clinic";
import { scrollToHash, withBase } from "@/lib/utils";

export function MobileActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("h1");
    if (!hero) return;
    const onScroll = () => {
      const bottom = hero.getBoundingClientRect().bottom;
      setVisible(bottom < 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <nav
      aria-label="Ações rápidas"
      className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-4 rounded-2xl border border-line bg-bg/95 px-1 py-1 shadow-lift lg:hidden"
    >
      <a
        href={withBase("/#agendar")}
        onClick={scrollToHash}
        className="flex min-h-11 flex-col items-center justify-center gap-0.5 text-center text-[0.75rem] leading-tight font-medium text-ink"
      >
        <Calendar className="size-4" />
        Agendar
      </a>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-11 flex-col items-center justify-center gap-0.5 text-center text-[0.75rem] leading-tight font-medium text-ink"
      >
        <WhatsAppIcon className="size-4" />
        WhatsApp
      </a>
      <a
        href={mapsHref()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-11 flex-col items-center justify-center gap-0.5 text-center text-[0.75rem] leading-tight font-medium text-ink"
      >
        <MapPin className="size-4" />
        Como chegar
      </a>
      <button
        type="button"
        className="flex min-h-11 flex-col items-center justify-center gap-0.5 text-center text-[0.75rem] leading-tight font-medium text-ink"
        onClick={() => window.dispatchEvent(new Event("ei-a11y-open"))}
      >
        <span className="text-sm leading-none font-semibold" aria-hidden="true">
          Aa
        </span>
        Acessibilidade
      </button>
    </nav>
  );
}
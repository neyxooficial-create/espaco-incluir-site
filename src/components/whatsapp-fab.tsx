import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { whatsappHref } from "@/lib/clinic";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-5 bottom-5 z-40 hidden size-14 transform-gpu items-center justify-center rounded-full bg-accent text-accent-fg shadow-lift transition-[scale,background-color] duration-quick ease-out hover:bg-accent-hover active:scale-press lg:flex"
      aria-label="Falar no WhatsApp"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}

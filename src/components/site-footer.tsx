import { withBase } from "@/lib/utils";
import { LogoMark } from "@/components/logo";
import { clinic, mapsHref, whatsappHref } from "@/lib/clinic";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink text-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[1.15fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-start gap-5">
            <LogoMark className="size-16 shrink-0 rounded-2xl outline-line/40 lg:size-20" />
            <div className="pt-1">
              <p className="font-display text-xl tracking-display">{clinic.name}</p>
              <p className="mt-1 text-sm font-medium tracking-[0.06em] text-line uppercase">
                {clinic.initials} · {clinic.cityLine}
              </p>
              <p className="mt-4 max-w-sm text-base leading-normal text-line">
                Clínica multidisciplinar de neurodesenvolvimento e aprendizagem,
                com comunicação inclusiva em Libras e Braille.
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-[0.08em] text-line uppercase">Visite</p>
          <a
            href={mapsHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-base leading-normal text-surface/90 underline-offset-4 hover:text-surface hover:underline"
          >
            {clinic.address.street}
            <br />
            {clinic.address.neighborhood}
            <br />
            {clinic.address.city}, {clinic.address.state}
          </a>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-[0.08em] text-line uppercase">
            Atendimento
          </p>
          <p className="mt-3 text-base leading-normal text-surface/90">
            {clinic.hours.days}
            <br />
            {clinic.hours.time}
          </p>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center text-base font-medium text-surface underline decoration-line underline-offset-4 hover:decoration-surface"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-surface/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-sm text-line lg:px-8">
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Informações">
            <a href={withBase("/privacidade")} className="inline-flex min-h-11 items-center underline underline-offset-4">
              Política de Privacidade
            </a>
            <a href={withBase("/acessibilidade")} className="inline-flex min-h-11 items-center underline underline-offset-4">
              Acessibilidade
            </a>
          </nav>
          <p>As informações deste site são educativas e não substituem avaliação profissional.</p>
          <p>© 2026 {clinic.name}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

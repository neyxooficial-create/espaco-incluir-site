import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { clinic } from "@/lib/clinic";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Espaço Incluir" },
      {
        name: "description",
        content:
          "Como o Espaço Incluir trata dados no site, em conformidade com a LGPD.",
      },
    ],
    links: [{ rel: "canonical", href: "https://oespacoincluir.com.br/privacidade" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg pb-24 text-ink lg:pb-0">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-surface"
      >
        Ir para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo" className="mx-auto max-w-[65ch] px-5 py-14 lg:py-24">
        <h1 className="font-display text-4xl tracking-display">Política de Privacidade</h1>
        <p className="mt-6 text-base leading-normal text-ink-soft">
          O Espaço Incluir respeita a sua privacidade, conforme a Lei Geral de
          Proteção de Dados (Lei 13.709/2018). Este site não possui cadastro nem
          armazena dados pessoais. O formulário de agendamento apenas monta, no
          seu próprio navegador, uma mensagem que é aberta no WhatsApp; o envio
          só acontece se você confirmar no aplicativo, e a conversa segue as
          políticas do WhatsApp. Pedimos que não informe diagnósticos ou dados de
          saúde no formulário. O mapa é fornecido pelo Google Maps e o tradutor
          de Libras pelo VLibras (Governo Federal), serviços de terceiros com
          políticas próprias. Este site não usa cookies de publicidade. Dúvidas
          sobre seus dados podem ser tratadas pelo WhatsApp {clinic.whatsapp.display}{" "}
          ou presencialmente na {clinic.address.street}, {clinic.address.neighborhood},{" "}
          {clinic.address.city}, {clinic.address.state}.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}

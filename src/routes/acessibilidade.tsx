import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/acessibilidade")({
  head: () => ({
    meta: [
      { title: "Acessibilidade | Espaço Incluir" },
      {
        name: "description",
        content:
          "Recursos de acessibilidade do site do Espaço Incluir: VLibras, leitura em voz alta, fonte, contraste e teclado.",
      },
    ],
    links: [{ rel: "canonical", href: "https://oespacoincluir.com.br/acessibilidade" }],
  }),
  component: AccessPage,
});

function AccessPage() {
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
        <h1 className="font-display text-4xl tracking-display">Acessibilidade</h1>
        <div className="mt-6 space-y-4 text-base leading-normal text-ink-soft">
          <p>Este site pode ser usado com teclado, leitor de tela e os recursos abaixo.</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>VLibras, do Governo Federal, traduz o conteúdo para Libras.</li>
            <li>O botão Aa, no canto inferior esquerdo, lê a página em voz alta (voz pt-BR), com Ouvir, Pausar e Parar.</li>
            <li>No mesmo painel dá para aumentar ou diminuir a fonte, de 100% a 150%.</li>
            <li>Alto contraste, sublinhado dos links e pausa das animações ficam salvos neste navegador.</li>
            <li>A navegação por teclado tem foco visível e o link “Ir para o conteúdo”.</li>
          </ul>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

import { A11yPanel } from "@/components/a11y-panel";
import { VLibras } from "@/components/vlibras";
import { withBase } from "@/lib/utils";
import appCss from "../styles.css?url";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";

const DESCRIPTION =
  "Clínica multidisciplinar em Aimorés-MG: psicopedagogia, psicologia, fonoaudiologia e psicanálise, com atenção a TEA, TDAH e aprendizagem. Libras e Braille. Unimed, Cassi e particulares. Segunda a sexta, 13h às 18h.";

const CRITICAL_CSS = `
@font-face{font-family:Manrope;font-style:normal;font-weight:400 700;font-display:swap;src:url("${withBase("/fonts/manrope-latin.woff2")}") format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:Fraunces;font-style:normal;font-weight:500 600;font-display:swap;src:url("${withBase("/fonts/fraunces-latin.woff2")}") format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
html{background:#eaf4f9}
body{margin:0;background:#eaf4f9;color:#12283a;font-family:Manrope,ui-sans-serif,system-ui,sans-serif}
h1,h2,h3{font-family:Fraunces,"Times New Roman",serif;font-weight:500}
header{position:sticky;top:0;z-index:40;background:#eaf4f9}
`.trim();

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Espaço Incluir | Clínica multidisciplinar em Aimorés-MG" },
      { name: "description", content: DESCRIPTION },
      { name: "theme-color", content: "#eaf4f9" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:title", content: "Espaço Incluir | Clínica multidisciplinar em Aimorés-MG" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: "https://oespacoincluir.com.br/og.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: withBase("/images/logo-mark.png") },
      { rel: "icon", type: "image/svg+xml", href: withBase("/favicon.svg") },
      {
        rel: "preload",
        href: withBase("/fonts/manrope-latin.woff2"),
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: withBase("/fonts/fraunces-latin.woff2"),
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "apple-touch-icon", href: withBase("/images/logo-mark.png") },
    ],
  }),
  component: () => (
    <html lang="pt-BR" className="antialiased" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <A11yPanel />
        <VLibras />
        <Scripts />
      </body>
    </html>
  ),
});

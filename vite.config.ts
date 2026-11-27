import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Site 100% estático (GitHub Pages). Cada rota vira um index.html pré-renderizado.
 * BASE_PATH: "/" no domínio próprio; "/espaco-incluir-site/" no endereço temporário
 * do GitHub Pages.
 */
function normalizeBase(raw: string | undefined): string {
  const trimmed = (raw ?? "/").trim().replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}/` : "/";
}

const base = normalizeBase(process.env.BASE_PATH);

export default defineConfig({
  base,
  server: { host: "0.0.0.0", port: 8080 },
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      router: { basepath: base },
      prerender: { enabled: true, crawlLinks: true, failOnError: true },
      pages: [{ path: "/" }, { path: "/privacidade" }, { path: "/acessibilidade" }],
    }),
    viteReact(),
  ],
});

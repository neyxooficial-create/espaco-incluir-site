# Espaço Incluir — site

Site estático (React + TanStack Start com pré-renderização) publicado no GitHub Pages.

- `npm run dev` — ambiente local
- `npm run build` — gera `dist/client` (uma página HTML por rota + `404.html` + `.nojekyll`)
- `BASE_PATH=/espaco-incluir-site/ npm run build && BASE_PATH=/espaco-incluir-site/ npm run preview` — confere o build como no Pages

Publicação: `.github/workflows/pages.yml` a cada push na `main`.
O prefixo do site vem de `BASE_PATH` no workflow: `/espaco-incluir-site/` no endereço temporário,
`/` quando o domínio oespacoincluir.com.br estiver apontado (junto com o domínio personalizado nas configurações do Pages).

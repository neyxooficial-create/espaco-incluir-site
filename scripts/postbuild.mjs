// Depois do build: 404.html (fallback do GitHub Pages) e .nojekyll.
import { copyFileSync, existsSync, writeFileSync } from "node:fs";

const out = "dist/client";
for (const page of ["index.html", "privacidade/index.html", "acessibilidade/index.html"]) {
  if (!existsSync(`${out}/${page}`)) throw new Error(`Página não gerada: ${page}`);
}
copyFileSync(`${out}/index.html`, `${out}/404.html`);
writeFileSync(`${out}/.nojekyll`, "");
console.log("postbuild: 404.html + .nojekyll prontos em", out);

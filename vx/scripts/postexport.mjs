// Ajustes pós-exportação para hospedagem estática (GitHub Pages):
// - .nojekyll: sem isso o Pages ignora a pasta _next/
// - 404.html na raiz: página de erro da própria VX
// - remove /lab (ferramentas de desenvolvimento)
import { copyFileSync, existsSync, rmSync, writeFileSync } from "node:fs";

writeFileSync("out/.nojekyll", "");
if (existsSync("out/404/index.html") && !existsSync("out/404.html")) {
  copyFileSync("out/404/index.html", "out/404.html");
}
// laboratório de pôster/OG só existe em desenvolvimento
rmSync("out/lab", { recursive: true, force: true });
console.log("postexport: ok");

/**
 * Prefixo de hospedagem em subpasta (ex.: GitHub Pages em /sklyra).
 * Vazio no deploy normal. Links do next/link já recebem o prefixo sozinhos;
 * use `asset()` em caminhos de /public e em <a href> comuns.
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

export const asset = (path: string) =>
  path.startsWith("/") && !path.startsWith("//") ? `${BASE_PATH}${path}` : path;

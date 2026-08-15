// Copies the PHP backend (api/, database/) and .env into dist/ after each
// `vite build`, since the production vhost's DocumentRoot is dist/ — files
// living only in the project root are never reachable by Apache/PHP there.
import fs from "fs";
import path from "path";

const root = process.cwd();
const dist = path.join(root, "dist");

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

copyDir(path.join(root, "api"), path.join(dist, "api"));
copyDir(path.join(root, "database"), path.join(dist, "database"));

const envSrc = path.join(root, ".env");
if (fs.existsSync(envSrc)) {
  fs.copyFileSync(envSrc, path.join(dist, ".env"));
}

// Root-level images embedded (via cid) into transactional emails by send_email() —
// not part of the Vite asset pipeline, so they must be copied explicitly.
for (const file of fs.readdirSync(root)) {
  if (/^(icon-|sklyra-).*\.png$/.test(file)) {
    fs.copyFileSync(path.join(root, file), path.join(dist, file));
  }
}

// Keep web.config in dist (IIS PHP handler — do not overwrite if already there)
const webConfigSrc = path.join(root, "web.config");
const webConfigDst = path.join(dist, "web.config");
if (fs.existsSync(webConfigSrc) && !fs.existsSync(webConfigDst)) {
  fs.copyFileSync(webConfigSrc, webConfigDst);
}

console.log("postbuild: copied api/, database/, .env and email icons into dist/");

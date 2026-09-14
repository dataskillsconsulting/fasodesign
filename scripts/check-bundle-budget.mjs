import { readdir, readFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";

const assetDirectory = new URL("../dist-site/assets/", import.meta.url);
const budgets = {
  css: 30 * 1024,
  javascript: 130 * 1024,
};

const assets = await readdir(assetDirectory);
const sizes = { css: 0, javascript: 0 };

for (const asset of assets) {
  const kind = asset.endsWith(".css") ? "css" : asset.endsWith(".js") ? "javascript" : undefined;
  if (!kind) continue;
  const contents = await readFile(new URL(asset, assetDirectory));
  sizes[kind] += gzipSync(contents).byteLength;
}

let exceeded = false;
for (const [kind, budget] of Object.entries(budgets)) {
  const size = sizes[kind];
  const label = kind === "javascript" ? "JavaScript" : "CSS";
  console.log(`${label} gzip : ${(size / 1024).toFixed(1)} kB / ${(budget / 1024).toFixed(0)} kB`);
  if (size > budget) {
    exceeded = true;
    console.error(`Budget ${label} dépassé de ${((size - budget) / 1024).toFixed(1)} kB.`);
  }
}

if (exceeded) process.exit(1);

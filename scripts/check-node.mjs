import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { engines } = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const required = engines.node;
const current = process.versions.node;

function satisfies(version, range) {
  const match = range.match(/^>=(\d+)\.(\d+)\.(\d+)$/);
  if (!match) return true;
  const [maj, min, patch] = version.split(".").map(Number);
  const [rMaj, rMin, rPatch] = match.slice(1).map(Number);
  return maj > rMaj || (maj === rMaj && (min > rMin || (min === rMin && patch >= rPatch)));
}

if (!satisfies(current, required)) {
  console.error(`\n✖ Node ${current} détecté, mais ce projet exige ${required} (voir .nvmrc).`);
  console.error("  Passez sur la bonne version : nvm use\n");
  process.exit(1);
}

console.log(`✔ Node ${current} (requis : ${required})`);

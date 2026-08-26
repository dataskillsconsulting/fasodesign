import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../src/design-system/tokens.css", import.meta.url), "utf8");
const requiredTokens = [
  "--background", "--foreground", "--primary", "--primary-foreground",
  "--border", "--ring", "--radius", "--space-4", "--shadow-soft",
  "--duration-base", "--focus-ring-width", "--target-min",
];

for (const token of requiredTokens) {
  if (!source.includes(`${token}:`)) throw new Error(`Token requis manquant : ${token}`);
}

if (!source.includes(".dark")) throw new Error("Le mode sombre doit définir des tokens sémantiques.");
console.log(`Contrat de design valide : ${requiredTokens.length} tokens fondamentaux et le mode sombre sont présents.`);

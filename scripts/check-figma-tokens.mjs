import { readFile } from "node:fs/promises";

const source = new URL("../figma/tokens.json", import.meta.url);
const tokens = JSON.parse(await readFile(source, "utf8"));
const requiredPaths = [
  ["color", "primitive", "brand", "700"],
  ["color", "semantic", "background"],
  ["color", "semantic", "primary"],
  ["spacing", "4"],
  ["radius", "default"],
  ["typography", "body"],
];

for (const path of requiredPaths) {
  const value = path.reduce((current, segment) => current?.[segment], tokens);
  if (!value?.$type || value.$value === undefined) throw new Error(`Token manquant ou invalide : ${path.join(".")}`);
}

const modes = tokens.color.semantic.$extensions?.modeOrder;
if (!Array.isArray(modes) || modes.join(",") !== "Light,Dark") throw new Error("Les modes Figma Light et Dark sont requis.");

console.log("Tokens Figma valides : collections primitives, sémantiques, espacements, rayons et typographie.");

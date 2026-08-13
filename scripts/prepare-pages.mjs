import { copyFile, mkdir, writeFile } from "node:fs/promises";

const outputDirectory = new URL("../dist-site/", import.meta.url);
const routes = ["exemple-casier", "exemple-campusfaso", "exemple-certificat-nationalite"];

await Promise.all(routes.map(async (route) => {
  const routeDirectory = new URL(`${route}/`, outputDirectory);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(new URL("index.html", outputDirectory), new URL("index.html", routeDirectory));
}));

await writeFile(new URL(".nojekyll", outputDirectory), "");

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import postcss from "postcss";
import { defineConfig, type Plugin } from "vite";

const siteOnlySelector = /\.(?:docs|doc|catalog|ecasier|campus|nationality)-/;

function excludeSiteStyles(): Plugin {
  return {
    name: "exclude-site-styles",
    enforce: "post",
    generateBundle(_options, bundle) {
      for (const asset of Object.values(bundle)) {
        if (asset.type !== "asset" || !asset.fileName.endsWith(".css")) continue;
        const root = postcss.parse(String(asset.source));
        root.walkRules((rule) => {
          const selectors = rule.selectors;
          if (selectors.length && selectors.every((selector) => siteOnlySelector.test(selector))) rule.remove();
        });
        asset.source = root.toString();
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), excludeSiteStyles()],
  resolve: { alias: { "@": resolve(import.meta.dirname, "src") } },
  build: {
    emptyOutDir: true,
    lib: { entry: resolve(import.meta.dirname, "src/index.ts"), formats: ["es"], fileName: "index" },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: { preserveModules: true, preserveModulesRoot: "src", assetFileNames: (asset) => asset.name?.endsWith(".css") ? "faso-ui.css" : "assets/[name][extname]" },
    },
  },
});

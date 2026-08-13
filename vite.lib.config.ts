import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
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

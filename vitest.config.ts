import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({ plugins: [react()], resolve: { alias: { "@": resolve(import.meta.dirname, "src") } }, test: { environment: "jsdom", include: ["src/test/**/*.test.{ts,tsx}"], setupFiles: ["./src/test/setup.ts"], css: true, coverage: { reporter: ["text", "html"], include: ["src/components/**/*.{ts,tsx}"] } } });

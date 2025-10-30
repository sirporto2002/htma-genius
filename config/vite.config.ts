// /vite.config.ts  (ROOT) — replace ENTIRE file with this
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Leave `base` undefined for local dev
});

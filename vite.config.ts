import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// @vitejs/plugin-react is a common pairing; if unavailable at install time,
// swap for a plain esbuild JSX transform.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});

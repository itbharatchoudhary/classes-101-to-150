import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/* Vite configuration with Tailwind plugin */
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
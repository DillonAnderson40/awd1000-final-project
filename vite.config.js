import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/awd1000-final-project/",   // IMPORTANT for GitHub Pages
});



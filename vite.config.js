import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/awd1000-final-project/",   // 🔥 REQUIRED FOR GITHUB PAGES

  plugins: [react()],

  server: {
    proxy: {
      "/spark": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/news": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/gainers": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/losers": {
        target: "http://localhost:5000",
        changeOrigin: true,
      }
    }
  }
});


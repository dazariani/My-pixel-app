import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/unsplash-api": {
        // Existing proxy for Unsplash (if you kept it)
        target: "https://api.unsplash.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/unsplash-api/, ""),
        secure: true,
      },
      "/pexels-api": {
        // *** NEW PROXY FOR PEXELS ***
        target: "https://api.pexels.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pexels-api/, ""),
        secure: true,
      },
    },
  },
});

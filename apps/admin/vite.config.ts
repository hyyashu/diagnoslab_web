import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  /* Local dev against the live API: run with VITE_API_URL=/live-api and the
     dev server forwards those calls to api.diagnoslab.in, so the browser
     never makes a cross-site request (the live API only allows the
     diagnoslab.in sites). */
  server: {
    proxy: {
      "/live-api": {
        target: "https://api.diagnoslab.in",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/live-api/, ""),
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      /* sw.ts only handles push notifications; it does not precache files. */
      injectManifest: { injectionPoint: undefined },
      manifest: {
        name: "Diagnos Lab Admin",
        short_name: "Diagnos Admin",
        description: "Leads, follow-ups and bookings for the Diagnos Lab team.",
        id: "/",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
          { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512.png", sizes: "512x512", type: "image/png" },
          { src: "/pwa-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@diagno/api-client": path.resolve(
        __dirname,
        "../../packages/api-client/src/index.ts",
      ),
      "@diagno/schemas": path.resolve(
        __dirname,
        "../../packages/schemas/src/index.ts",
      ),
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
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
        name: "Diagnos Lab App",
        short_name: "Diagnos Lab",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",

        icons: [
          {
            src: "/favicon.ico",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicon.ico",
            sizes: "512x512",
            type: "image/png",
          },
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

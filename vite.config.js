import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/terraignota-map/",
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          maplibre: ["maplibre-gl"], // Separate MapLibre into its own chunk
        },
      },
    },
    assetsDir: "assets",
    chunkFileNames: "assets/[name]-[hash].js", // Ensure chunks have hashes
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackStartVite } from "@tanstack/start-vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),
    TanStackStartVite({
      server: { entry: "src/server.ts" },
    }),
    tsconfigPaths(),
  ],
  server: {
    port: 8080,
    strictPort: true,
  },
});

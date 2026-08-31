import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    hmr: {
      host: "c928e87e-5173-3-base.preview.verdent.ai",
      protocol: "wss",
      clientPort: 443,
    },
  },
});

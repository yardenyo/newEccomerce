import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});

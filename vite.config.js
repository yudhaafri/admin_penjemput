import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Default to 3000 if not set
  },
  resolve: {
    alias: {
      src: "/src",
    },
  },
});

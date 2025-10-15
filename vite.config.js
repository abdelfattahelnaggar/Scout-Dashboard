import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor_react: ["react", "react-dom", "react-router-dom"],
          vendor_ui: ["@radix-ui/react-avatar", "@radix-ui/react-checkbox", "@radix-ui/react-label", "@radix-ui/react-separator"],
          vendor_motion: ["framer-motion"],
          vendor_query: ["@tanstack/react-query"],
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    open: true,
    proxy: {
      '/api': {
        target: 'https://socialist-ammamaria-scout-api-43c6c249.koyeb.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})

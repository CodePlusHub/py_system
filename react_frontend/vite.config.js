import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true, // ← هذا المطلوب
    outDir: '../static/react', // ← علشان يبني في مجلد static
    rollupOptions: {
      input: '/src/main.jsx'
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    fs: {
      // Allow serving files from the parent directory (for images)
      allow: [path.resolve(__dirname, '..')],
    },
  },
})

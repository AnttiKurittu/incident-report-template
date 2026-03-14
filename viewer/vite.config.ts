import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import path from 'path'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
  server: {
    fs: {
      // Allow serving files from the parent directory (for images)
      allow: [path.resolve(__dirname, '..')],
    },
  },
})

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^@assets(?=\/|$)/,
        replacement: fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
      {
        find: /^@features(?=\/|$)/,
        replacement: fileURLToPath(new URL('./src/features', import.meta.url)),
      },
      {
        find: /^@shared(?=\/|$)/,
        replacement: fileURLToPath(new URL('./src/shared', import.meta.url)),
      },
      {
        find: /^@routes(?=\/|$)/,
        replacement: fileURLToPath(new URL('./src/routes', import.meta.url)),
      },
    ],
  },
})

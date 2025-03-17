import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    assetsDir: 'static',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test-setup.js'],
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') }
    ]
  }
})

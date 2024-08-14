import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.join(__dirname, './src')
    },
    extensions: ['.mjs', '.js', '.ts', '.d.ts', '.jsx', '.tsx', '.json', '.vue']
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000
  },
  preview: {
    // ESTO ES LO QUE SOLUCIONA TU ERROR:
    allowedHosts: true, 
    host: true,
    port: 3000
  }
})

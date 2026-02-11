import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['indexical-melva-drearily.ngrok-free.dev'],

    host: true,

    hmr: {
      clientPort: 443
    }
  }
})
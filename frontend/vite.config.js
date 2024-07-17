import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      "/api": {
        target: "/", 
        secure: false
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 5000
  },
  plugins: [react()],
})

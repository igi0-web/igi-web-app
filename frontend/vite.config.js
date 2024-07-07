import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      "/api": {
        target: "https://igi-web-app.onrender.com/", 
        secure: false
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 5000
  },
  plugins: [react()],
})

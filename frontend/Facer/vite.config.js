import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.REACT_APP_AUTH0_DOMAIN': JSON.stringify('dev-zteqhri2btzuf6hl.us.auth0.com'),
    'process.env.REACT_APP_AUTH0_CLIENT_ID': JSON.stringify('Cz3lKocVPMzFieF7xFxlrHhCKcnQjxM2')
  }
})


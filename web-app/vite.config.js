import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // CRITICAL: Change 'global-tecs-v2' to the EXACT name of your GitHub repository
  // If your repo is just named 'Global-Tecs', change this to '/Global-Tecs/'
  base: '/Global-Tecs/',
})
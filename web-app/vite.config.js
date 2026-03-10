import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub repository name, do not change unless the remote repo
  // changes names or the project is ported elsewhere.
})
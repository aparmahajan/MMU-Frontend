import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
 server: {
  open: true,
  proxy: {
    '/api': {
      target: 'https://otv612v6t5.execute-api.us-west-1.amazonaws.com/Stage',
      rewrite: path => path.replace(/^\/api/, ''),
      changeOrigin: true, // optional but recommended
    },
  }
},
 plugins: [react()],
})

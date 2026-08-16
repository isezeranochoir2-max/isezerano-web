import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/youtube-feed': {
        target: 'https://www.youtube.com',
        changeOrigin: true,
        secure: true,
        rewrite: () => '/feeds/videos.xml?channel_id=UCK24-0xtBHn6DMPCvuvoZ6w',
      },
    },
  },
})

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/crab-go-grab/', // Add this for GitHub Pages
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target:
          'http://crab-go-grab-environment.eba-mxet7rx6.ap-southeast-2.elasticbeanstalk.com/', // Replace with your EC2 public DNS or IP
        changeOrigin: true,
      },
      '/ws': {
        target:
          'ws://crab-go-grab-environment.eba-mxet7rx6.ap-southeast-2.elasticbeanstalk.com/', // Replace with your EC2 public DNS or IP
        ws: true,
      },
    },
  },
});

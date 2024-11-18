import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Divida bibliotecas grandes como React
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Aumenta o limite do aviso para 1 MB
  },
});

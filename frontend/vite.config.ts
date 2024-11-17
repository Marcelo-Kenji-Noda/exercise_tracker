import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip', // Compressão gzip (padrão)
      ext: '.gz',        // Extensão para arquivos gerados
      deleteOriginFile: false, // Mantenha o arquivo original
    }),
    visualizer({ open: true,
      filename: 'stats.html', // Nome do arquivo gerado
      template: 'treemap', // Formato de visualização
    }), // Abre a análise no navegador após o build
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

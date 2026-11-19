import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        preview: resolve(import.meta.dirname, 'preview.html'),
      },
      output: {
        codeSplitting: {
          groups: [
            {
              name: "three-vendor",
              test: /node_modules[\\/]three[\\/]/,
              priority: 30,
              maxSize: 480 * 1024,
            },
            {
              name: "gsap-vendor",
              test: /node_modules[\\/]gsap[\\/]/,
              priority: 20,
              maxSize: 320 * 1024,
            },
            {
              name: "jspdf-vendor",
              test: /node_modules[\\/]jspdf[\\/]/,
              priority: 20,
              maxSize: 420 * 1024,
            },
          ],
        },
      },
    },
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
    proxy: {
      '/api': `http://127.0.0.1:${process.env.API_PORT || '3001'}`,
    },
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true,
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],
  },
});

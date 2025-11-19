import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [react()],
    server: {
      port: 5173,
      hmr: isDev, // Enable Hot Module Reloading
      open: false,
    },
    build: {
      outDir: 'build',
      watch: isDev ? {} : undefined, // Enable watch mode in dev
      rollupOptions: {
        input: {
          popup: path.resolve(__dirname, 'index.html'),
          sidepanel: path.resolve(__dirname, 'src/sidepanel.html'),
          background: path.resolve(__dirname, 'src/background.ts')
        },
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: '[name].[hash].js',
          assetFileNames: '[name].[ext]'
        }
      }
    }
  };
});

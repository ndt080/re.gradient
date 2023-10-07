import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'darkvi-hls',
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['@darkvi/core', 'hls.js'],
      output: {
        globals: {
          '@darkvi/core': 'Darkvi',
          'hls.js': 'Hls',
        },
      },
    },
    minify: true,
    target: 'esnext',
  },
  resolve: {
    alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
});

import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';

const getPath = (path: string) => {
  return fileURLToPath(new URL(path, import.meta.url));
};

export default defineConfig({
  build: {
    target: 'esnext',
    lib: {
      entry: getPath('./src/index.ts'),
      name: 'darkvi-ui',
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['@darkvi/core'],
      output: {
        globals: {
          '@darkvi/core': 'Darkvi',
        },
      },
    }
  },
  resolve: {
    alias: [
      { find: '@', replacement: getPath('./src') },
    ],
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
});

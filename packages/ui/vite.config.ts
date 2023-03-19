import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import typescript from '@rollup/plugin-typescript';

const getPath = (path: string) => {
  return fileURLToPath(new URL(path, import.meta.url));
};

export default defineConfig({
  plugins: [
    typescript({
      declaration: true,
      rootDir: fileURLToPath(new URL("./src", import.meta.url)),

      compilerOptions: {
        'plugins': [
          { 'transform': 'typescript-transform-paths', 'useRootDirs': true },
          { 'transform': 'typescript-transform-paths', 'useRootDirs': true, 'afterDeclarations': true },
        ],
      },
    }),
  ],
  build: {
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

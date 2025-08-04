import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: '/', // Netlify serves from root
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'assets/**/*', // Copies all files in assets folder
          dest: 'assets',
        },
      ],
    }),
  ],
});
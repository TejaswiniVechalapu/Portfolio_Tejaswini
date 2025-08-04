import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: '/', // Netlify serves from root
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'assets/file/Vechalapu_Tejaswini_Resume.pdf',
          dest: 'assets/file',
        },
        {
          src: 'assets/images/photo.jpg',
          dest: 'assets/images',
        },
      ],
    }),
  ],
});
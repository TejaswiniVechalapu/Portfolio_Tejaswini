import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    assetsInclude: ['**/*.pdf'] // Include all PDF files in the build
  }
});
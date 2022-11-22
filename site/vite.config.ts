import { fileURLToPath, URL } from 'node:url'
import prismjs from 'vite-plugin-prismjs'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    prismjs({
      languages: ['html', 'typescript'],
      plugins: ['line-numbers'],
      theme: 'solarizedlight',
      css: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/show-or-hide',
  build: {
    outDir: '../docs/',
  },
})

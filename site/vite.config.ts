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
      languages: ['html'],
      plugins: ['line-numbers'], //配置显示行号插件
      theme: 'solarizedlight', //主题名称
      css: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

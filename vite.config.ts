import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  base: '/vue-blog/', // GitHub Pages 部署时的基础路径，需要替换为你的仓库名
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          ui: ['@fortawesome/fontawesome-svg-core', '@fortawesome/vue-fontawesome']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
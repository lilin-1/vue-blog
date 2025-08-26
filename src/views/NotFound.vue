<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div class="text-center px-4">
      <!-- 404图标 -->
      <div class="mb-8">
        <div class="text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4">
          404
        </div>
        <div class="text-6xl mb-6">
          🔍
        </div>
      </div>
      
      <!-- 错误信息 -->
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        页面未找到
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        抱歉，您访问的页面不存在。可能是链接错误或页面已被移动。
      </p>
      
      <!-- 操作按钮 -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          to="/"
          class="btn btn-primary"
        >
          <font-awesome-icon icon="home" class="mr-2" />
          返回首页
        </router-link>
        <router-link
          to="/articles"
          class="btn btn-secondary"
        >
          <font-awesome-icon icon="envelope" class="mr-2" />
          浏览文章
        </router-link>
      </div>
      
      <!-- 搜索建议 -->
      <div class="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          您可能在寻找
        </h3>
        <div class="space-y-2">
          <router-link
            to="/articles"
            class="block text-left px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
          >
            📝 最新文章
          </router-link>
          <router-link
            to="/about"
            class="block text-left px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
          >
            👨‍💻 关于我
          </router-link>
          <router-link
            to="/category/frontend"
            class="block text-left px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
          >
            🎨 前端开发
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// 设置页面标题
onMounted(() => {
  document.title = '页面未找到 - 个人技术博客'
})
</script>
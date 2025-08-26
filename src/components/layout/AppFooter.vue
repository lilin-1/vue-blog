<template>
  <footer class="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- 博客信息 -->
        <div class="md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <font-awesome-icon icon="home" class="text-white text-sm" />
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">个人博客</span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
            记录生活中的美好时光，分享个人感悟和兴趣爱好。用文字记录成长足迹，用心感受生活的点点滴滴。
          </p>
          <div class="flex space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              :title="social.name"
            >
              <font-awesome-icon :icon="social.icon" class="text-xl" />
            </a>
          </div>
        </div>

        <!-- 快速链接 -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            快速链接
          </h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.name">
              <router-link
                :to="link.path"
                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 分类 -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            文章分类
          </h3>
          <ul class="space-y-2">
            <li v-for="category in categories.slice(0, 5)" :key="category.id">
              <router-link
                :to="`/category/${category.id}`"
                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center justify-between"
              >
                <span>{{ category.name }}</span>
                <span class="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                  {{ category.count }}
                </span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- 底部版权信息 -->
      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-gray-500 dark:text-gray-400 text-sm">
            <p>&copy; {{ currentYear }} 个人博客. 保留所有权利.</p>
          </div>
          <div class="flex items-center space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              class="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
            >
              隐私政策
            </a>
            <a
              href="#"
              class="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
            >
              使用条款
            </a>
            <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Powered by</span>
              <a
                href="https://vuejs.org"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary-600 dark:text-primary-400 hover:underline"
              >
                Vue.js
              </a>
              <span>&</span>
              <a
                href="https://vitejs.dev"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary-600 dark:text-primary-400 hover:underline"
              >
                Vite
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBlogStore } from '@/stores/blog'
import type { NavItem } from '@/types'

// 获取分类数据
const blogStore = useBlogStore()
const categories = computed(() => blogStore.categories)

// 当前年份
const currentYear = new Date().getFullYear()

// 社交链接
const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: ['fab', 'github']
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: ['fab', 'twitter']
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: ['fab', 'linkedin']
  },
  {
    name: '微博',
    url: 'https://weibo.com/yourusername',
    icon: ['fab', 'weibo']
  }
]

// 快速链接
const quickLinks: NavItem[] = [
  { name: '首页', path: '/' },
  { name: '文章列表', path: '/articles' },
  { name: '关于我', path: '/about' },
  { name: 'RSS订阅', path: '/rss.xml' }
]
</script>
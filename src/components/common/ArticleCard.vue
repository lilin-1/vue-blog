<template>
  <article class="card overflow-hidden group">
    <!-- 文章封面图片 -->
    <div class="relative overflow-hidden">
      <img
        :src="article.coverImage || defaultCoverImage"
        :alt="article.title"
        class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        @error="handleImageError"
      />
      <!-- 精选标签 -->
      <div v-if="article.featured" class="absolute top-4 left-4">
        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-600 text-white">
          <font-awesome-icon icon="star" class="mr-1" />
          精选
        </span>
      </div>
      <!-- 分类标签 -->
      <div class="absolute top-4 right-4">
        <router-link
          :to="`/category/${article.category}`"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700 hover:bg-white transition-colors"
        >
          {{ getCategoryName(article.category) }}
        </router-link>
      </div>
    </div>

    <!-- 文章内容 -->
    <div class="p-6">
      <!-- 文章元信息 -->
      <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
        <div class="flex items-center mr-4">
          <font-awesome-icon icon="calendar" class="mr-1" />
          <time :datetime="article.date">
            {{ formatDate(article.date, 'short') }}
          </time>
        </div>
        <div class="flex items-center">
          <font-awesome-icon icon="clock" class="mr-1" />
          {{ article.readTime }} 分钟阅读
        </div>
      </div>

      <!-- 文章标题 -->
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
        <router-link :to="`/articles/${article.id}`">
          {{ article.title }}
        </router-link>
      </h3>

      <!-- 文章摘要 -->
      <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
        {{ article.excerpt }}
      </p>

      <!-- 标签 -->
      <div class="flex flex-wrap gap-2 mb-4">
        <router-link
          v-for="tag in article.tags.slice(0, 3)"
          :key="tag"
          :to="`/tag/${tag}`"
          class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
        >
          <font-awesome-icon icon="tag" class="mr-1" />
          {{ tag }}
        </router-link>
        <span v-if="article.tags.length > 3" class="text-xs text-gray-500 dark:text-gray-400">
          +{{ article.tags.length - 3 }} 更多
        </span>
      </div>

      <!-- 阅读更多按钮 -->
      <div class="flex items-center justify-between">
        <router-link
          :to="`/articles/${article.id}`"
          class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
        >
          阅读更多
          <font-awesome-icon icon="arrow-right" class="ml-2 group-hover:translate-x-1 transition-transform" />
        </router-link>
        
        <!-- 作者信息 -->
        <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <img
            src="/avatar.jpg"
            :alt="article.author"
            class="w-6 h-6 rounded-full mr-2"
            @error="handleAvatarError"
          />
          <span>{{ article.author }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBlogStore } from '@/stores/blog'
import { formatDate } from '@/utils'
import type { Article } from '@/types'

// 定义Props
interface Props {
  article: Article
}

const props = defineProps<Props>()

// 状态管理
const blogStore = useBlogStore()

// 默认封面图片
const defaultCoverImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgNzVIMjI1VjEyNUgxNzVWNzVaIiBmaWxsPSIjOUI5QkEzIi8+CjxwYXRoIGQ9Ik0xNTAgMTAwSDI1MFYxMTBIMTUwVjEwMFoiIGZpbGw9IiM5QjlCQTMiLz4KPHBhdGggZD0iTTE2MCAxMjBIMjQwVjEzMEgxNjBWMTIwWiIgZmlsbD0iIzlCOUJBMyIvPgo8L3N2Zz4='

// 获取分类名称
const getCategoryName = (categoryId: string): string => {
  const category = blogStore.categories.find(cat => cat.id === categoryId)
  return category?.name || categoryId
}

// 处理图片加载错误
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = defaultCoverImage
}

// 处理头像加载错误
const handleAvatarError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iMTAiIHI9IjMiIGZpbGw9IiM5QjlCQTMiLz4KPHBhdGggZD0iTTYgMThDOCAxNiAxMCAxNiAxMiAxNkMxNCAxNiAxNiAxNiAxOCAxOEg2WiIgZmlsbD0iIzlCOUJBMyIvPgo8L3N2Zz4='
}
</script>

<style scoped>
/* 文本截断样式 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
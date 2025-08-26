<template>
  <div v-if="article" class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 文章头部 -->
    <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="container-custom py-12">
        <!-- 返回按钮 -->
        <div class="mb-6">
          <button
            @click="goBack"
            class="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <font-awesome-icon icon="arrow-left" class="mr-2" />
            返回文章列表
          </button>
        </div>
        
        <!-- 文章标题和元信息 -->
        <div class="max-w-4xl mx-auto text-center">
          <div class="mb-6">
            <!-- 分类标签 -->
            <router-link
              :to="`/category/${article.category}`"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200 hover:bg-primary-200 dark:hover:bg-primary-900/30 transition-colors"
            >
              {{ getCategoryName(article.category) }}
            </router-link>
          </div>
          
          <h1 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {{ article.title }}
          </h1>
          
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
            {{ article.excerpt }}
          </p>
          
          <!-- 文章元信息 -->
          <div class="flex flex-wrap items-center justify-center gap-6 text-gray-500 dark:text-gray-400">
            <div class="flex items-center">
              <img
                src="/avatar.jpg"
                :alt="article.author"
                class="w-8 h-8 rounded-full mr-3"
                @error="handleAvatarError"
              />
              <span>{{ article.author }}</span>
            </div>
            <div class="flex items-center">
              <font-awesome-icon icon="calendar" class="mr-2" />
              <time :datetime="article.date">
                {{ formatDate(article.date, 'full') }}
              </time>
            </div>
            <div class="flex items-center">
              <font-awesome-icon icon="clock" class="mr-2" />
              {{ article.readTime }} 分钟阅读
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container-custom py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 主要内容 -->
        <main class="flex-1">
          <article class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <!-- 封面图片 -->
            <div v-if="article.coverImage" class="aspect-video overflow-hidden">
              <img
                :src="article.coverImage"
                :alt="article.title"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
            </div>
            
            <!-- 文章内容 -->
            <div class="p-8">
              <div 
                class="article-content prose prose-lg dark:prose-invert max-w-none"
                v-html="renderedContent"
              ></div>
              
              <!-- 文章标签 -->
              <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  文章标签
                </h3>
                <div class="flex flex-wrap gap-2">
                  <router-link
                    v-for="tag in article.tags"
                    :key="tag"
                    :to="`/tag/${tag}`"
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  >
                    <font-awesome-icon icon="tag" class="mr-1" />
                    {{ tag }}
                  </router-link>
                </div>
              </div>
              
              <!-- 分享按钮 -->
              <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  分享文章
                </h3>
                <div class="flex space-x-4">
                  <button
                    @click="shareToTwitter"
                    class="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <font-awesome-icon :icon="['fab', 'twitter']" class="mr-2" />
                    Twitter
                  </button>
                  <button
                    @click="shareToWeibo"
                    class="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <font-awesome-icon :icon="['fab', 'weibo']" class="mr-2" />
                    微博
                  </button>
                  <button
                    @click="copyLink"
                    class="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <font-awesome-icon icon="link" class="mr-2" />
                    复制链接
                  </button>
                </div>
              </div>
            </div>
          </article>
        </main>

        <!-- 侧边栏 -->
        <aside class="lg:w-80">
          <!-- 目录 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6 sticky top-24">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              文章目录
            </h3>
            <TableOfContents :content="article.content" />
          </div>
          
          <!-- 相关文章 -->
          <div v-if="relatedArticles.length > 0" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              相关文章
            </h3>
            <div class="space-y-4">
              <router-link
                v-for="relatedArticle in relatedArticles"
                :key="relatedArticle.id"
                :to="`/articles/${relatedArticle.id}`"
                class="block group"
              >
                <div class="flex space-x-3">
                  <img
                    :src="relatedArticle.coverImage || defaultCoverImage"
                    :alt="relatedArticle.title"
                    class="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    @error="handleImageError"
                  />
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                      {{ relatedArticle.title }}
                    </h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {{ formatDate(relatedArticle.date, 'short') }}
                    </p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <!-- 导航到上一篇/下一篇 -->
    <nav v-if="prevArticle || nextArticle" class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div class="container-custom py-8">
        <div class="flex justify-between">
          <div class="flex-1">
            <router-link
              v-if="prevArticle"
              :to="`/articles/${prevArticle.id}`"
              class="group flex items-center text-left"
            >
              <div class="flex items-center">
                <font-awesome-icon icon="arrow-left" class="mr-3 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">上一篇</p>
                  <p class="text-lg font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {{ prevArticle.title }}
                  </p>
                </div>
              </div>
            </router-link>
          </div>
          
          <div class="flex-1 text-right">
            <router-link
              v-if="nextArticle"
              :to="`/articles/${nextArticle.id}`"
              class="group flex items-center justify-end text-right"
            >
              <div class="flex items-center">
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">下一篇</p>
                  <p class="text-lg font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {{ nextArticle.title }}
                  </p>
                </div>
                <font-awesome-icon icon="arrow-right" class="ml-3 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
  
  <!-- 文章未找到 -->
  <div v-else class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div class="text-center">
      <font-awesome-icon icon="search" class="text-6xl text-gray-300 dark:text-gray-600 mb-6" />
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        文章未找到
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        抱歉，您访问的文章不存在或已被删除。
      </p>
      <router-link
        to="/articles"
        class="btn btn-primary"
      >
        返回文章列表
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import { markdownToHtml, formatDate, copyToClipboard } from '@/utils'
import TableOfContents from '@/components/common/TableOfContents.vue'
import type { Article } from '@/types'

// 路由和状态
const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

// 计算属性
const article = computed(() => {
  const id = route.params.id as string
  return blogStore.getArticleById(id)
})

const renderedContent = computed(() => {
  return article.value ? markdownToHtml(article.value.content) : ''
})

const relatedArticles = computed(() => {
  if (!article.value) return []
  return blogStore.getRelatedArticles(article.value.id, 3)
})

// 获取上一篇和下一篇文章
const prevArticle = computed(() => {
  if (!article.value) return null
  const articles = blogStore.articles
  const currentIndex = articles.findIndex(a => a.id === article.value!.id)
  return currentIndex > 0 ? articles[currentIndex - 1] : null
})

const nextArticle = computed(() => {
  if (!article.value) return null
  const articles = blogStore.articles
  const currentIndex = articles.findIndex(a => a.id === article.value!.id)
  return currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null
})

// 默认图片
const defaultCoverImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgNzVIMjI1VjEyNUgxNzVWNzVaIiBmaWxsPSIjOUI5QkEzIi8+CjxwYXRoIGQ9Ik0xNTAgMTAwSDI1MFYxMTBIMTUwVjEwMFoiIGZpbGw9IiM5QjlCQTMiLz4KPHBhdGggZD0iTTE2MCAxMjBIMjQwVjEzMEgxNjBWMTIwWiIgZmlsbD0iIzlCOUJBMyIvPgo8L3N2Zz4='

// 方法
const getCategoryName = (categoryId: string): string => {
  const category = blogStore.categories.find(cat => cat.id === categoryId)
  return category?.name || categoryId
}

const goBack = () => {
  router.back()
}

const shareToTwitter = () => {
  if (!article.value) return
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(`${article.value.title} - ${article.value.excerpt}`)
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
}

const shareToWeibo = () => {
  if (!article.value) return
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(article.value.title)
  window.open(`https://service.weibo.com/share/share.php?url=${url}&title=${title}`, '_blank')
}

const copyLink = async () => {
  const success = await copyToClipboard(window.location.href)
  if (success) {
    // 这里可以添加一个提示消息
    alert('链接已复制到剪贴板')
  }
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = defaultCoverImage
}

const handleAvatarError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjE2IiBjeT0iMTIiIHI9IjQiIGZpbGw9IiM5QjlCQTMiLz4KPHBhdGggZD0iTTggMjRDMTAgMjIgMTMgMjIgMTYgMjJDMTkgMjIgMjIgMjIgMjQgMjRIOFoiIGZpbGw9IiM5QjlCQTMiLz4KPC9zdmc+'
}

// 监听路由变化，更新页面标题
watch(
  article,
  (newArticle) => {
    if (newArticle) {
      document.title = `${newArticle.title} - 个人技术博客`
      
      // 更新meta描述
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', newArticle.excerpt)
      }
    }
  },
  { immediate: true }
)

// 组件挂载时滚动到顶部
onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style>
/* 代码高亮样式 */
@import 'highlight.js/styles/github.css';
@import 'highlight.js/styles/github-dark.css' (prefers-color-scheme: dark);

/* 文章内容样式增强 */
.article-content {
  line-height: 1.8;
}

.article-content h1,
.article-content h2,
.article-content h3,
.article-content h4,
.article-content h5,
.article-content h6 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.article-content h1:first-child,
.article-content h2:first-child,
.article-content h3:first-child {
  margin-top: 0;
}

.article-content p {
  margin-bottom: 1.5rem;
}

.article-content pre {
  margin: 1.5rem 0;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
}

.article-content code {
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
}

.article-content blockquote {
  margin: 1.5rem 0;
  padding-left: 1rem;
  border-left: 4px solid #3b82f6;
  font-style: italic;
  color: #6b7280;
}

.dark .article-content blockquote {
  color: #9ca3af;
}

.article-content img {
  margin: 1.5rem auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.article-content table {
  width: 100%;
  margin: 1.5rem 0;
  border-collapse: collapse;
}

.article-content th,
.article-content td {
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  text-align: left;
}

.dark .article-content th,
.dark .article-content td {
  border-color: #374151;
}

.article-content th {
  background-color: #f9fafb;
  font-weight: 600;
}

.dark .article-content th {
  background-color: #1f2937;
}
</style>
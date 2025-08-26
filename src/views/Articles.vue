<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 页面头部 -->
    <section class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="container-custom py-12">
        <div class="text-center">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ pageTitle }}
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            {{ pageDescription }}
          </p>
        </div>
      </div>
    </section>

    <div class="container-custom py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 主内容区域 -->
        <main class="flex-1">
          <!-- 筛选和搜索栏 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
            <div class="flex flex-col md:flex-row gap-4">
              <!-- 搜索框 -->
              <div class="flex-1">
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <font-awesome-icon icon="search" class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="搜索文章..."
                    class="input pl-10"
                  />
                </div>
              </div>
              
              <!-- 分类筛选 -->
              <div class="md:w-48">
                <select
                  v-model="selectedCategory"
                  class="input"
                >
                  <option value="">所有分类</option>
                  <option
                    v-for="category in blogStore.categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }} ({{ category.count }})
                  </option>
                </select>
              </div>
              
              <!-- 清除筛选 -->
              <button
                v-if="hasActiveFilters"
                @click="clearFilters"
                class="btn btn-secondary whitespace-nowrap"
              >
                <font-awesome-icon icon="times" class="mr-2" />
                清除筛选
              </button>
            </div>
            
            <!-- 活跃的标签筛选 -->
            <div v-if="selectedTag" class="mt-4 flex items-center">
              <span class="text-sm text-gray-600 dark:text-gray-400 mr-2">当前标签:</span>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200">
                <font-awesome-icon icon="tag" class="mr-1" />
                {{ selectedTag }}
                <button
                  @click="clearTagFilter"
                  class="ml-2 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200"
                >
                  <font-awesome-icon icon="times" class="text-xs" />
                </button>
              </span>
            </div>
          </div>

          <!-- 文章列表 -->
          <div v-if="blogStore.paginatedArticles.length > 0">
            <!-- 结果统计 -->
            <div class="mb-6">
              <p class="text-gray-600 dark:text-gray-400">
                找到 <span class="font-semibold text-gray-900 dark:text-white">{{ blogStore.filteredArticles.length }}</span> 篇文章
                <span v-if="hasActiveFilters" class="text-sm">
                  (已筛选)
                </span>
              </p>
            </div>
            
            <!-- 文章网格 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <ArticleCard
                v-for="article in blogStore.paginatedArticles"
                :key="article.id"
                :article="article"
                class="animate-fade-in"
              />
            </div>
            
            <!-- 分页组件 -->
            <Pagination
              v-if="blogStore.totalPages > 1"
              :current-page="blogStore.currentPage"
              :total-pages="blogStore.totalPages"
              @page-change="handlePageChange"
            />
          </div>
          
          <!-- 空状态 -->
          <div v-else class="text-center py-16">
            <div class="max-w-md mx-auto">
              <font-awesome-icon icon="search" class="text-6xl text-gray-300 dark:text-gray-600 mb-6" />
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {{ hasActiveFilters ? '未找到匹配的文章' : '暂无文章' }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                {{ hasActiveFilters ? '尝试调整搜索条件或清除筛选' : '还没有发布任何文章' }}
              </p>
              <button
                v-if="hasActiveFilters"
                @click="clearFilters"
                class="btn btn-primary"
              >
                清除所有筛选
              </button>
            </div>
          </div>
        </main>

        <!-- 侧边栏 -->
        <aside class="lg:w-80">
          <!-- 分类列表 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              文章分类
            </h3>
            <div class="space-y-2">
              <button
                @click="setCategory(null)"
                :class="[
                  'w-full text-left px-3 py-2 rounded-lg transition-colors',
                  !selectedCategory
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                ]"
              >
                <div class="flex items-center justify-between">
                  <span>所有分类</span>
                  <span class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {{ blogStore.articles.length }}
                  </span>
                </div>
              </button>
              <button
                v-for="category in blogStore.categories"
                :key="category.id"
                @click="setCategory(category.id)"
                :class="[
                  'w-full text-left px-3 py-2 rounded-lg transition-colors',
                  selectedCategory === category.id
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                ]"
              >
                <div class="flex items-center justify-between">
                  <span>{{ category.name }}</span>
                  <span class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {{ category.count }}
                  </span>
                </div>
              </button>
            </div>
          </div>

          <!-- 热门标签 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              热门标签
            </h3>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tag in blogStore.popularTags"
                :key="tag"
                @click="setTag(tag)"
                :class="[
                  'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors',
                  selectedTag === tag
                    ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                <font-awesome-icon icon="tag" class="mr-1" />
                {{ tag }}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import ArticleCard from '@/components/common/ArticleCard.vue'
import Pagination from '@/components/common/Pagination.vue'

// 路由和状态
const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

// 计算属性
const searchQuery = computed({
  get: () => blogStore.searchQuery,
  set: (value: string) => blogStore.setSearchQuery(value)
})

const selectedCategory = computed({
  get: () => blogStore.selectedCategory,
  set: (value: string | null) => blogStore.setCategory(value)
})

const selectedTag = computed({
  get: () => blogStore.selectedTag,
  set: (value: string | null) => blogStore.setTag(value)
})

const hasActiveFilters = computed(() => {
  return !!(searchQuery.value || selectedCategory.value || selectedTag.value)
})

const pageTitle = computed(() => {
  if (route.params.category) {
    const category = blogStore.categories.find(cat => cat.id === route.params.category)
    return category ? `${category.name} - 分类文章` : '分类文章'
  }
  if (route.params.tag) {
    return `${route.params.tag} - 标签文章`
  }
  return '所有文章'
})

const pageDescription = computed(() => {
  if (route.params.category) {
    const category = blogStore.categories.find(cat => cat.id === route.params.category)
    return category?.description || '浏览该分类下的所有文章'
  }
  if (route.params.tag) {
    return `浏览标签为 "${route.params.tag}" 的所有文章`
  }
  return '浏览所有技术文章和分享'
})

// 方法
const setCategory = (categoryId: string | null) => {
  blogStore.setCategory(categoryId)
  updateUrl()
}

const setTag = (tag: string | null) => {
  blogStore.setTag(tag)
  updateUrl()
}

const clearFilters = () => {
  blogStore.clearFilters()
  router.push('/articles')
}

const clearTagFilter = () => {
  blogStore.setTag(null)
  updateUrl()
}

const handlePageChange = (page: number) => {
  blogStore.setPage(page)
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const updateUrl = () => {
  if (selectedCategory.value) {
    router.push(`/category/${selectedCategory.value}`)
  } else if (selectedTag.value) {
    router.push(`/tag/${selectedTag.value}`)
  } else {
    router.push('/articles')
  }
}

// 监听路由变化
watch(
  () => route.params,
  (newParams) => {
    if (newParams.category) {
      blogStore.setCategory(newParams.category as string)
    } else if (newParams.tag) {
      blogStore.setTag(newParams.tag as string)
    } else {
      blogStore.clearFilters()
    }
  },
  { immediate: true }
)

// 组件挂载时初始化
onMounted(() => {
  // 根据路由参数设置初始筛选条件
  if (route.params.category) {
    blogStore.setCategory(route.params.category as string)
  } else if (route.params.tag) {
    blogStore.setTag(route.params.tag as string)
  }
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
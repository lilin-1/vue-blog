<template>
  <teleport to="body">
    <div class="fixed inset-0 z-50 overflow-y-auto">
      <!-- 背景遮罩 -->
      <div 
        class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        @click="$emit('close')"
      ></div>
      
      <!-- 搜索框容器 -->
      <div class="flex min-h-full items-start justify-center p-4 pt-16">
        <div class="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-xl transition-all">
          <!-- 搜索输入框 -->
          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <font-awesome-icon icon="search" class="h-5 w-5 text-gray-400" />
            </div>
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              placeholder="搜索文章、分类或标签..."
              class="w-full border-0 bg-transparent py-4 pl-12 pr-4 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-0 text-lg"
              @keydown.escape="$emit('close')"
              @keydown.enter="handleEnter"
              @keydown.up="navigateUp"
              @keydown.down="navigateDown"
            />
          </div>
          
          <!-- 搜索结果 -->
          <div v-if="searchQuery" class="border-t border-gray-200 dark:border-gray-700">
            <!-- 加载状态 -->
            <div v-if="isLoading" class="p-4 text-center text-gray-500 dark:text-gray-400">
              <font-awesome-icon icon="search" class="animate-spin mr-2" />
              搜索中...
            </div>
            
            <!-- 搜索结果列表 -->
            <div v-else-if="searchResults.length > 0" class="max-h-96 overflow-y-auto">
              <div
                v-for="(result, index) in searchResults"
                :key="result.id"
                :class="[
                  'flex items-center px-4 py-3 cursor-pointer transition-colors',
                  index === selectedIndex 
                    ? 'bg-primary-50 dark:bg-primary-900/20' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                ]"
                @click="selectResult(result)"
                @mouseenter="selectedIndex = index"
              >
                <div class="flex-shrink-0 mr-3">
                  <div class="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <font-awesome-icon 
                      :icon="getResultIcon(result.type)" 
                      class="text-primary-600 dark:text-primary-400 text-sm"
                    />
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {{ result.title }}
                  </p>
                  <p v-if="result.excerpt" class="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {{ result.excerpt }}
                  </p>
                </div>
                <div class="flex-shrink-0 ml-2">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    {{ getResultTypeLabel(result.type) }}
                  </span>
                </div>
              </div>
            </div>
            
            <!-- 无结果 -->
            <div v-else class="p-8 text-center text-gray-500 dark:text-gray-400">
              <font-awesome-icon icon="search" class="text-4xl mb-4 opacity-50" />
              <p class="text-lg font-medium mb-2">未找到相关内容</p>
              <p class="text-sm">尝试使用不同的关键词搜索</p>
            </div>
          </div>
          
          <!-- 搜索提示 -->
          <div v-else class="p-8 text-center text-gray-500 dark:text-gray-400">
            <font-awesome-icon icon="search" class="text-4xl mb-4 opacity-50" />
            <p class="text-lg font-medium mb-2">搜索文章内容</p>
            <p class="text-sm">输入关键词搜索文章、分类或标签</p>
            <div class="mt-4 flex items-center justify-center space-x-4 text-xs">
              <div class="flex items-center space-x-1">
                <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded border">↑</kbd>
                <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded border">↓</kbd>
                <span>导航</span>
              </div>
              <div class="flex items-center space-x-1">
                <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded border">Enter</kbd>
                <span>选择</span>
              </div>
              <div class="flex items-center space-x-1">
                <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded border">Esc</kbd>
                <span>关闭</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import { debounce } from '@/utils'
import type { SearchResult } from '@/types'

// 定义事件
defineEmits<{
  close: []
}>()

// 路由和状态
const router = useRouter()
const blogStore = useBlogStore()
const searchInput = ref<HTMLInputElement>()
const searchQuery = ref('')
const isLoading = ref(false)
const selectedIndex = ref(0)

// 搜索结果
const searchResults = computed((): SearchResult[] => {
  if (!searchQuery.value.trim()) return []
  
  const query = searchQuery.value.toLowerCase()
  const results: SearchResult[] = []
  
  // 搜索文章
  blogStore.articles.forEach(article => {
    if (
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.content.toLowerCase().includes(query) ||
      article.tags.some(tag => tag.toLowerCase().includes(query))
    ) {
      results.push({
        type: 'article',
        id: article.id,
        title: article.title,
        excerpt: article.excerpt,
        url: `/articles/${article.id}`
      })
    }
  })
  
  // 搜索分类
  blogStore.categories.forEach(category => {
    if (
      category.name.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query)
    ) {
      results.push({
        type: 'category',
        id: category.id,
        title: category.name,
        excerpt: category.description,
        url: `/category/${category.id}`
      })
    }
  })
  
  // 搜索标签
  blogStore.allTags.forEach(tag => {
    if (tag.toLowerCase().includes(query)) {
      results.push({
        type: 'tag',
        id: tag,
        title: tag,
        url: `/tag/${tag}`
      })
    }
  })
  
  return results.slice(0, 10) // 限制结果数量
})

// 防抖搜索
const debouncedSearch = debounce(() => {
  isLoading.value = false
}, 300)

// 监听搜索查询变化
watch(searchQuery, () => {
  if (searchQuery.value.trim()) {
    isLoading.value = true
    selectedIndex.value = 0
    debouncedSearch()
  } else {
    isLoading.value = false
  }
})

// 获取结果图标
const getResultIcon = (type: string) => {
  switch (type) {
    case 'article':
      return 'envelope'
    case 'category':
      return 'home'
    case 'tag':
      return 'tag'
    default:
      return 'envelope'
  }
}

// 获取结果类型标签
const getResultTypeLabel = (type: string) => {
  switch (type) {
    case 'article':
      return '文章'
    case 'category':
      return '分类'
    case 'tag':
      return '标签'
    default:
      return '其他'
  }
}

// 键盘导航
const navigateUp = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--
  }
}

const navigateDown = () => {
  if (selectedIndex.value < searchResults.value.length - 1) {
    selectedIndex.value++
  }
}

// 处理回车键
const handleEnter = () => {
  if (searchResults.value.length > 0) {
    selectResult(searchResults.value[selectedIndex.value])
  }
}

// 选择搜索结果
const selectResult = (result: SearchResult) => {
  router.push(result.url)
  // 发出关闭事件
  emit('close')
}

// 组件挂载后聚焦输入框
onMounted(() => {
  nextTick(() => {
    searchInput.value?.focus()
  })
})
</script>
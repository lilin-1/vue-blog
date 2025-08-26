<template>
  <nav class="flex items-center justify-between" aria-label="分页导航">
    <!-- 移动端简化版分页 -->
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        :disabled="currentPage <= 1"
        @click="goToPage(currentPage - 1)"
        :class="[
          'relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md',
          currentPage <= 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
        ]"
      >
        <font-awesome-icon icon="arrow-left" class="mr-2" />
        上一页
      </button>
      <button
        :disabled="currentPage >= totalPages"
        @click="goToPage(currentPage + 1)"
        :class="[
          'relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md',
          currentPage >= totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
        ]"
      >
        下一页
        <font-awesome-icon icon="arrow-right" class="ml-2" />
      </button>
    </div>

    <!-- 桌面端完整版分页 -->
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <!-- 分页信息 -->
      <div>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          显示第
          <span class="font-medium">{{ startItem }}</span>
          到
          <span class="font-medium">{{ endItem }}</span>
          项，共
          <span class="font-medium">{{ totalItems }}</span>
          项
        </p>
      </div>

      <!-- 分页按钮 -->
      <div>
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="分页">
          <!-- 上一页按钮 -->
          <button
            :disabled="currentPage <= 1"
            @click="goToPage(currentPage - 1)"
            :class="[
              'relative inline-flex items-center px-2 py-2 rounded-l-md border text-sm font-medium',
              currentPage <= 1
                ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-500'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700'
            ]"
          >
            <span class="sr-only">上一页</span>
            <font-awesome-icon icon="arrow-left" class="h-4 w-4" />
          </button>

          <!-- 页码按钮 -->
          <template v-for="page in visiblePages" :key="page">
            <!-- 省略号 -->
            <span
              v-if="page === '...'"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
            >
              ...
            </span>
            <!-- 页码 -->
            <button
              v-else
              @click="goToPage(page as number)"
              :class="[
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                page === currentPage
                  ? 'z-10 bg-primary-50 border-primary-500 text-primary-600 dark:bg-primary-900/20 dark:border-primary-400 dark:text-primary-400'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700'
              ]"
            >
              {{ page }}
            </button>
          </template>

          <!-- 下一页按钮 -->
          <button
            :disabled="currentPage >= totalPages"
            @click="goToPage(currentPage + 1)"
            :class="[
              'relative inline-flex items-center px-2 py-2 rounded-r-md border text-sm font-medium',
              currentPage >= totalPages
                ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-500'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700'
            ]"
          >
            <span class="sr-only">下一页</span>
            <font-awesome-icon icon="arrow-right" class="h-4 w-4" />
          </button>
        </nav>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 定义Props
interface Props {
  currentPage: number
  totalPages: number
  totalItems?: number
  pageSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  totalItems: 0,
  pageSize: 10
})

// 定义事件
const emit = defineEmits<{
  pageChange: [page: number]
}>()

// 计算属性
const startItem = computed(() => {
  return (props.currentPage - 1) * props.pageSize + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.pageSize, props.totalItems)
})

// 生成可见的页码数组
const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const { currentPage, totalPages } = props
  
  // 如果总页数小于等于7，显示所有页码
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return pages
  }
  
  // 总是显示第一页
  pages.push(1)
  
  // 计算当前页周围的页码范围
  let start = Math.max(2, currentPage - 1)
  let end = Math.min(totalPages - 1, currentPage + 1)
  
  // 如果当前页靠近开始，显示更多前面的页码
  if (currentPage <= 3) {
    end = Math.min(totalPages - 1, 5)
  }
  
  // 如果当前页靠近结束，显示更多后面的页码
  if (currentPage >= totalPages - 2) {
    start = Math.max(2, totalPages - 4)
  }
  
  // 如果start不是2，添加省略号
  if (start > 2) {
    pages.push('...')
  }
  
  // 添加中间的页码
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  // 如果end不是倒数第二页，添加省略号
  if (end < totalPages - 1) {
    pages.push('...')
  }
  
  // 总是显示最后一页
  if (totalPages > 1) {
    pages.push(totalPages)
  }
  
  return pages
})

// 方法
const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('pageChange', page)
  }
}
</script>
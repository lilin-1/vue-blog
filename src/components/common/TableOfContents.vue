<template>
  <div v-if="headings.length > 0">
    <nav class="space-y-1">
      <a
        v-for="heading in headings"
        :key="heading.id"
        :href="`#${heading.id}`"
        :class="[
          'block py-1 text-sm transition-colors duration-200',
          heading.level === 1 ? 'font-semibold text-gray-900 dark:text-white' :
          heading.level === 2 ? 'pl-3 font-medium text-gray-700 dark:text-gray-300' :
          'pl-6 text-gray-600 dark:text-gray-400',
          activeHeading === heading.id
            ? 'text-primary-600 dark:text-primary-400'
            : 'hover:text-primary-600 dark:hover:text-primary-400'
        ]"
        @click="scrollToHeading(heading.id)"
      >
        {{ heading.text }}
      </a>
    </nav>
  </div>
  <div v-else class="text-sm text-gray-500 dark:text-gray-400">
    此文章暂无目录
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { throttle } from '@/utils'

// 定义Props
interface Props {
  content: string
}

const props = defineProps<Props>()

// 标题接口
interface Heading {
  id: string
  text: string
  level: number
}

// 状态
const activeHeading = ref('')

// 从Markdown内容中提取标题
const headings = computed((): Heading[] => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: Heading[] = []
  let match
  
  while ((match = headingRegex.exec(props.content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = generateId(text)
    
    headings.push({
      id,
      text,
      level
    })
  }
  
  return headings
})

// 生成标题ID
const generateId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, '') // 保留中文、英文、数字、空格和连字符
    .replace(/\s+/g, '-') // 将空格替换为连字符
    .replace(/-+/g, '-') // 合并多个连字符
    .replace(/^-|-$/g, '') // 移除开头和结尾的连字符
}

// 滚动到指定标题
const scrollToHeading = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const offset = 100 // 偏移量，避免被固定导航栏遮挡
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
    
    // 更新URL hash
    history.replaceState(null, '', `#${id}`)
  }
}

// 检查当前激活的标题
const checkActiveHeading = () => {
  const scrollPosition = window.scrollY + 150 // 偏移量
  
  // 找到当前可见的标题
  let currentHeading = ''
  
  for (const heading of headings.value) {
    const element = document.getElementById(heading.id)
    if (element) {
      const elementTop = element.offsetTop
      if (scrollPosition >= elementTop) {
        currentHeading = heading.id
      } else {
        break
      }
    }
  }
  
  activeHeading.value = currentHeading
}

// 节流处理滚动事件
const throttledCheckActiveHeading = throttle(checkActiveHeading, 100)

// 生命周期
onMounted(() => {
  // 为文章内容中的标题添加ID
  setTimeout(() => {
    const articleContent = document.querySelector('.article-content')
    if (articleContent) {
      const headingElements = articleContent.querySelectorAll('h1, h2, h3, h4, h5, h6')
      
      headingElements.forEach((element, index) => {
        const heading = headings.value[index]
        if (heading) {
          element.id = heading.id
          
          // 添加锚点链接
          element.classList.add('group', 'relative')
          
          const anchor = document.createElement('a')
          anchor.href = `#${heading.id}`
          anchor.className = 'absolute -left-6 top-0 opacity-0 group-hover:opacity-100 text-primary-500 hover:text-primary-600 transition-opacity'
          anchor.innerHTML = '#'
          anchor.setAttribute('aria-label', `链接到 ${heading.text}`)
          
          element.appendChild(anchor)
        }
      })
    }
    
    // 初始检查激活的标题
    checkActiveHeading()
    
    // 监听滚动事件
    window.addEventListener('scroll', throttledCheckActiveHeading)
    
    // 如果URL中有hash，滚动到对应位置
    if (window.location.hash) {
      const id = window.location.hash.slice(1)
      setTimeout(() => scrollToHeading(id), 100)
    }
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', throttledCheckActiveHeading)
})
</script>

<style scoped>
/* 目录样式 */
a {
  display: block;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  text-decoration: none;
}

a:hover {
  background-color: rgba(59, 130, 246, 0.1);
}

.dark a:hover {
  background-color: rgba(59, 130, 246, 0.2);
}
</style>
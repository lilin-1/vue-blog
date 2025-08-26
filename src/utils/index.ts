import { marked } from 'marked'
import hljs from 'highlight.js'

// 配置marked
marked.setOptions({
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  },
  langPrefix: 'hljs language-',
  breaks: true
})

/**
 * 将Markdown转换为HTML
 * @param markdown Markdown字符串
 * @returns HTML字符串
 */
export function markdownToHtml(markdown: string): string {
  return marked(markdown)
}

/**
 * 格式化日期
 * @param date 日期字符串或Date对象
 * @param format 格式类型
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: string | Date, format: 'full' | 'short' | 'relative' = 'full'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  switch (format) {
    case 'full':
      return dateObj.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    case 'short':
      return dateObj.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    case 'relative':
      return getRelativeTime(dateObj)
    default:
      return dateObj.toLocaleDateString('zh-CN')
  }
}

/**
 * 获取相对时间
 * @param date 日期对象
 * @returns 相对时间字符串
 */
function getRelativeTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)
  
  if (years > 0) {
    return `${years}年前`
  } else if (months > 0) {
    return `${months}个月前`
  } else if (days > 0) {
    return `${days}天前`
  } else if (hours > 0) {
    return `${hours}小时前`
  } else if (minutes > 0) {
    return `${minutes}分钟前`
  } else {
    return '刚刚'
  }
}

/**
 * 计算阅读时间
 * @param content 文章内容
 * @param wordsPerMinute 每分钟阅读字数，默认200
 * @returns 预计阅读时间（分钟）
 */
export function calculateReadTime(content: string, wordsPerMinute: number = 200): number {
  // 移除HTML标签和Markdown语法
  const plainText = content
    .replace(/<[^>]*>/g, '') // 移除HTML标签
    .replace(/[#*`_~\[\]()]/g, '') // 移除Markdown语法字符
    .replace(/\s+/g, ' ') // 合并多个空格
    .trim()
  
  // 中文字符按2个字符计算，英文单词按空格分割
  const chineseChars = (plainText.match(/[\u4e00-\u9fa5]/g) || []).length
  const englishWords = plainText.replace(/[\u4e00-\u9fa5]/g, '').split(/\s+/).filter(word => word.length > 0).length
  
  const totalWords = chineseChars + englishWords
  const readTime = Math.ceil(totalWords / wordsPerMinute)
  
  return Math.max(1, readTime) // 至少1分钟
}

/**
 * 截取文本
 * @param text 原始文本
 * @param length 截取长度
 * @param suffix 后缀，默认为'...'
 * @returns 截取后的文本
 */
export function truncateText(text: string, length: number, suffix: string = '...'): string {
  if (text.length <= length) {
    return text
  }
  return text.slice(0, length) + suffix
}

/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param wait 等待时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function(this: any, ...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func.apply(this, args)
    }
    
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * 节流函数
 * @param func 要节流的函数
 * @param limit 时间间隔（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * 生成随机ID
 * @param length ID长度，默认8
 * @returns 随机ID字符串
 */
export function generateId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * 滚动到指定元素
 * @param element 目标元素或选择器
 * @param offset 偏移量，默认0
 * @param behavior 滚动行为，默认'smooth'
 */
export function scrollToElement(
  element: Element | string,
  offset: number = 0,
  behavior: ScrollBehavior = 'smooth'
): void {
  const targetElement = typeof element === 'string' 
    ? document.querySelector(element)
    : element
  
  if (targetElement) {
    const elementPosition = targetElement.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
    
    window.scrollTo({
      top: offsetPosition,
      behavior
    })
  }
}

/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 * @returns Promise<boolean> 是否复制成功
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // 降级方案
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      const success = document.execCommand('copy')
      document.body.removeChild(textArea)
      return success
    }
  } catch (error) {
    console.error('复制失败:', error)
    return false
  }
}

/**
 * 获取URL参数
 * @param name 参数名
 * @param url URL字符串，默认为当前页面URL
 * @returns 参数值或null
 */
export function getUrlParam(name: string, url?: string): string | null {
  const targetUrl = url || window.location.href
  const urlObj = new URL(targetUrl)
  return urlObj.searchParams.get(name)
}

/**
 * 设置URL参数
 * @param params 参数对象
 * @param replace 是否替换当前历史记录，默认false
 */
export function setUrlParams(params: Record<string, string>, replace: boolean = false): void {
  const url = new URL(window.location.href)
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value)
    } else {
      url.searchParams.delete(key)
    }
  })
  
  const method = replace ? 'replaceState' : 'pushState'
  window.history[method]({}, '', url.toString())
}

/**
 * 检查是否为移动设备
 * @returns boolean
 */
export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

/**
 * 检查是否支持WebP格式
 * @returns Promise<boolean>
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image()
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2)
    }
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  })
}
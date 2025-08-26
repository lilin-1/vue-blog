import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // 状态
  const isDark = ref(false)
  
  // 计算属性
  const theme = computed(() => isDark.value ? 'dark' : 'light')
  const themeIcon = computed(() => isDark.value ? 'sun' : 'moon')
  
  // 初始化主题
  const initTheme = () => {
    // 从localStorage读取保存的主题设置
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      // 如果没有保存的设置，使用系统偏好
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    
    applyTheme()
  }
  
  // 应用主题到DOM
  const applyTheme = () => {
    const html = document.documentElement
    
    if (isDark.value) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }
  
  // 切换主题
  const toggleTheme = () => {
    isDark.value = !isDark.value
    applyTheme()
    
    // 保存到localStorage
    localStorage.setItem('theme', theme.value)
  }
  
  // 设置特定主题
  const setTheme = (newTheme: 'light' | 'dark') => {
    isDark.value = newTheme === 'dark'
    applyTheme()
    localStorage.setItem('theme', newTheme)
  }
  
  return {
    isDark,
    theme,
    themeIcon,
    initTheme,
    toggleTheme,
    setTheme
  }
})
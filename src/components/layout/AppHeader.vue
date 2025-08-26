<template>
  <header class="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
    <nav class="container-custom">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link 
          to="/" 
          class="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="home" class="text-white text-sm" />
          </div>
          <span>个人博客</span>
        </router-link>

        <!-- 桌面端导航菜单 -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="nav-link"
            active-class="active"
          >
            <font-awesome-icon 
              v-if="item.icon" 
              :icon="item.icon" 
              class="mr-2"
            />
            {{ item.name }}
          </router-link>
        </div>

        <!-- 右侧工具栏 -->
        <div class="flex items-center space-x-4">
          <!-- 搜索按钮 -->
          <button
            @click="toggleSearch"
            class="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            title="搜索"
          >
            <font-awesome-icon icon="search" />
          </button>

          <!-- 主题切换按钮 -->
          <button
            @click="themeStore.toggleTheme"
            class="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            :title="themeStore.isDark ? '切换到浅色模式' : '切换到深色模式'"
          >
            <font-awesome-icon :icon="themeStore.themeIcon" />
          </button>

          <!-- 移动端菜单按钮 -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            title="菜单"
          >
            <font-awesome-icon :icon="isMobileMenuOpen ? 'times' : 'bars'" />
          </button>
        </div>
      </div>

      <!-- 移动端导航菜单 -->
      <transition name="mobile-menu">
        <div 
          v-if="isMobileMenuOpen" 
          class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
        >
          <div class="flex flex-col space-y-2">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              @click="closeMobileMenu"
              class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
              active-class="text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
            >
              <font-awesome-icon 
                v-if="item.icon" 
                :icon="item.icon" 
                class="mr-3 w-4"
              />
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </transition>
    </nav>

    <!-- 搜索模态框 -->
    <SearchModal v-if="isSearchOpen" @close="closeSearch" />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useThemeStore } from '@/stores/theme'
import SearchModal from '@/components/common/SearchModal.vue'
import type { NavItem } from '@/types'

// 导航菜单项
const navItems: NavItem[] = [
  { name: '首页', path: '/', icon: 'home' },
  { name: '文章', path: '/articles', icon: 'envelope' },
  { name: '关于', path: '/about', icon: 'user' }
]

// 状态管理
const themeStore = useThemeStore()
const isMobileMenuOpen = ref(false)
const isSearchOpen = ref(false)

// 移动端菜单控制
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// 搜索控制
const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
}

const closeSearch = () => {
  isSearchOpen.value = false
}
</script>

<style scoped>
/* 移动端菜单动画 */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
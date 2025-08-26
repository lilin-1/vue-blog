<template>
  <div id="app" class="min-h-screen flex flex-col">
    <!-- 导航栏 -->
    <AppHeader />
    
    <!-- 主要内容区域 -->
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <!-- 页脚 -->
    <AppFooter />
    
    <!-- 回到顶部按钮 -->
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import BackToTop from '@/components/common/BackToTop.vue'

// 初始化主题
const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<style>
/* 页面过渡动画 */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
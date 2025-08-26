<template>
  <transition name="fade">
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 z-40 w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      title="回到顶部"
    >
      <font-awesome-icon 
        icon="chevron-up" 
        class="text-lg group-hover:transform group-hover:-translate-y-0.5 transition-transform duration-200"
      />
    </button>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { throttle } from '@/utils'

const isVisible = ref(false)
const scrollThreshold = 300 // 滚动超过300px时显示按钮

// 检查滚动位置
const checkScrollPosition = () => {
  isVisible.value = window.pageYOffset > scrollThreshold
}

// 节流处理滚动事件
const throttledCheckScroll = throttle(checkScrollPosition, 100)

// 滚动到顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 生命周期
onMounted(() => {
  window.addEventListener('scroll', throttledCheckScroll)
  checkScrollPosition() // 初始检查
})

onUnmounted(() => {
  window.removeEventListener('scroll', throttledCheckScroll)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
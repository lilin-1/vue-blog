<template>
  <div class="min-h-screen flex items-center justify-center">
    <!-- 个人信息卡片 -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 max-w-md w-full mx-4">
      <div class="text-center">
        <!-- 头像 -->
        <div class="mb-8">
          <img
            :src="authorInfo.avatar"
            :alt="authorInfo.name"
            class="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary-200 dark:border-primary-800 shadow-lg animate-fade-in"
            @error="handleAvatarError"
          />
        </div>
        
        <!-- 姓名 -->
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-slide-up">
          {{ authorInfo.name }}
        </h1>
        
        <!-- 个人签名/简介 -->
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-slide-up">
          {{ authorInfo.bio }}
        </p>
        
        <!-- 社交链接 -->
        <div class="flex justify-center space-x-6 mb-8 animate-slide-up">
          <a
            v-for="(url, platform) in authorInfo.social"
            :key="platform"
            :href="url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors transform hover:scale-110"
            :title="getSocialPlatformName(platform)"
          >
            <font-awesome-icon 
              :icon="['fab', platform === 'github' ? 'github' : platform === 'twitter' ? 'twitter' : platform === 'linkedin' ? 'linkedin' : 'weibo']"
              class="text-2xl"
            />
          </a>
        </div>
        
        <!-- 导航按钮 -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <router-link
            to="/articles"
            class="btn btn-primary px-6 py-3"
          >
            <font-awesome-icon icon="envelope" class="mr-2" />
            我的文章
          </router-link>
          <router-link
            to="/about"
            class="btn btn-secondary px-6 py-3"
          >
            <font-awesome-icon icon="user" class="mr-2" />
            关于我
          </router-link>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import { authorInfo } from '@/data/blog'

// 获取社交平台名称
const getSocialPlatformName = (platform: string): string => {
  const names: Record<string, string> = {
    github: 'GitHub',
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
    weibo: '微博'
  }
  return names[platform] || platform
}

// 头像加载错误处理
const handleAvatarError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjM0I4MkY2Ii8+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNDgiIHI9IjE2IiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMzIgOTZDNDAgODAgNTIgODAgNjQgODBDNzYgODAgODggODAgOTYgOTZIMzJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4='
}
</script>

<style scoped>
/* 自定义动画 */
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

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
}

.animate-slide-up:nth-child(2) {
  animation-delay: 0.4s;
}

.animate-slide-up:nth-child(3) {
  animation-delay: 0.6s;
}
</style>
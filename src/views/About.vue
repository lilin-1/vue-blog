<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <!-- 简洁个人信息卡片 -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4">
      <div class="text-center">
        <!-- 头像 -->
        <div class="mb-6">
          <img
            :src="authorInfo.avatar"
            :alt="authorInfo.name"
            class="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary-200 dark:border-primary-800 shadow-lg"
            @error="handleAvatarError"
          />
        </div>
        
        <!-- 姓名 -->
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {{ authorInfo.name }}
        </h1>
        
        <!-- 身份 -->
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          学生
        </p>
        
        <!-- 社交链接 -->
        <div class="flex justify-center space-x-4">
          <a
            v-for="(url, platform) in authorInfo.social"
            :key="platform"
            :href="url"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors transform hover:scale-110"
            :title="getSocialPlatformName(platform)"
          >
            <font-awesome-icon 
              :icon="['fab', platform === 'github' ? 'github' : platform === 'twitter' ? 'twitter' : platform === 'linkedin' ? 'linkedin' : 'weibo']"
              class="text-lg"
            />
          </a>
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
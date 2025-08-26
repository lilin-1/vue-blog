<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 页面头部 -->
    <section class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="container-custom py-16">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            关于我
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            了解更多关于我的技术背景、工作经历和个人兴趣
          </p>
        </div>
      </div>
    </section>

    <div class="container-custom py-16">
      <!-- 个人简介 -->
      <section class="mb-20">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="md:flex">
              <!-- 头像部分 -->
              <div class="md:w-1/3 bg-gradient-to-br from-primary-500 to-blue-600 p-8 flex items-center justify-center">
                <div class="text-center">
                  <img
                    :src="authorInfo.avatar"
                    :alt="authorInfo.name"
                    class="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                    @error="handleAvatarError"
                  />
                  <h2 class="text-2xl font-bold text-white mb-2">
                    {{ authorInfo.name }}
                  </h2>
                  <p class="text-blue-100">
                    请填写您的职业或身份
                  </p>
                </div>
              </div>
              
              <!-- 信息部分 -->
              <div class="md:w-2/3 p-8">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  个人简介
                </h3>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {{ authorInfo.bio }}
                </p>
                
                <!-- 联系信息 -->
                <div class="space-y-3">
                  <div class="flex items-center text-gray-600 dark:text-gray-400">
                    <font-awesome-icon icon="envelope" class="w-5 h-5 mr-3 text-primary-600 dark:text-primary-400" />
                    <a :href="`mailto:${authorInfo.email}`" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      {{ authorInfo.email }}
                    </a>
                  </div>
                  <div v-if="authorInfo.website" class="flex items-center text-gray-600 dark:text-gray-400">
                    <font-awesome-icon icon="home" class="w-5 h-5 mr-3 text-primary-600 dark:text-primary-400" />
                    <a :href="authorInfo.website" target="_blank" rel="noopener noreferrer" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      {{ authorInfo.website }}
                    </a>
                  </div>
                </div>
                
                <!-- 社交链接 -->
                <div class="mt-6">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    社交媒体
                  </h4>
                  <div class="flex space-x-4">
                    <a
                      v-for="(url, platform) in authorInfo.social"
                      :key="platform"
                      :href="url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      :title="getSocialPlatformName(platform)"
                    >
                      <font-awesome-icon :icon="['fab', platform]" class="text-lg" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 技能展示 -->
      <section class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            技能专长
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            我在以下技术领域有丰富的经验和深入的理解
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="category in skillCategories"
            :key="category.name"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {{ category.name }}
            </h3>
            <div class="space-y-3">
              <div
                v-for="skill in category.skills"
                :key="skill.name"
                class=""
              >
                <div class="flex items-center justify-between mb-1">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {{ skill.name }}
                  </span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    {{ skill.level }}/5
                  </span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    class="bg-primary-600 h-2 rounded-full transition-all duration-500"
                    :style="{ width: `${(skill.level / 5) * 100}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 项目展示 -->
      <section class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            精选项目
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            以下是我参与开发的一些代表性项目
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="project in projects"
            :key="project.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden group hover:shadow-lg transition-shadow duration-300"
          >
            <!-- 项目图片 -->
            <div class="aspect-video overflow-hidden">
              <img
                :src="project.image"
                :alt="project.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                @error="handleProjectImageError"
              />
            </div>
            
            <!-- 项目信息 -->
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {{ project.name }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                {{ project.description }}
              </p>
              
              <!-- 技术栈 -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {{ tech }}
                </span>
              </div>
              
              <!-- 项目链接 -->
              <div class="flex space-x-4">
                <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <font-awesome-icon :icon="['fab', 'github']" class="mr-2" />
                  源码
                </a>
                <a
                  v-if="project.liveUrl"
                  :href="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <font-awesome-icon icon="arrow-right" class="mr-2" />
                  预览
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>



      <!-- 联系我 -->
      <section class="text-center">
        <div class="bg-gradient-to-r from-primary-500 to-blue-600 rounded-2xl p-12 text-white">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            让我们一起合作
          </h2>
          <p class="text-xl mb-8 opacity-90">
            如果您有有趣的项目或想法，欢迎与我联系
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              :href="`mailto:${authorInfo.email}`"
              class="inline-flex items-center px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              <font-awesome-icon icon="envelope" class="mr-2" />
              发送邮件
            </a>
            <a
              :href="authorInfo.social.github"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors"
            >
              <font-awesome-icon :icon="['fab', 'github']" class="mr-2" />
              查看GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { authorInfo, skills, projects } from '@/data/blog'
import type { Skill } from '@/types'

// 按分类组织技能
const skillCategories = computed(() => {
  const categories = {
    frontend: { name: '前端技术', skills: [] as Skill[] },
    backend: { name: '后端技术', skills: [] as Skill[] },
    tools: { name: '开发工具', skills: [] as Skill[] },
    other: { name: '其他技能', skills: [] as Skill[] }
  }
  
  skills.forEach(skill => {
    categories[skill.category].skills.push(skill)
  })
  
  return Object.values(categories).filter(category => category.skills.length > 0)
})



// 方法
const getSocialPlatformName = (platform: string): string => {
  const names: Record<string, string> = {
    github: 'GitHub',
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
    weibo: '微博'
  }
  return names[platform] || platform
}

const handleAvatarError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNDgiIHI9IjE2IiBmaWxsPSIjOUI5QkEzIi8+CjxwYXRoIGQ9Ik0zMiA5NkM0MCA4MCA1MiA4MCA2NCA4MEM3NiA4MCA4OCA4MCA5NiA5NkgzMloiIGZpbGw9IiM5QjlCQTMiLz4KPC9zdmc+'
}

const handleProjectImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgdmlld0JveD0iMCAwIDQwMCAyMjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1IiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjE1MCIgeT0iNzUiIHdpZHRoPSIxMDAiIGhlaWdodD0iNzUiIGZpbGw9IiM5QjlCQTMiLz4KPHRleHQgeD0iMjAwIiB5PSIxMjAiIGZpbGw9IiM2QjdCODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UHJvamVjdDwvdGV4dD4KPC9zdmc+'
}
</script>
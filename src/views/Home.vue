<template>
  <div class="min-h-screen">
    <!-- 英雄区域 -->
    <section class="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20">
      <div class="container-custom">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            欢迎来到我的
            <span class="text-primary-600 dark:text-primary-400">个人博客</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 animate-slide-up">
            记录生活点滴，分享个人感悟和兴趣爱好
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <router-link
              to="/articles"
              class="btn btn-primary text-lg px-8 py-3"
            >
              <font-awesome-icon icon="envelope" class="mr-2" />
              浏览文章
            </router-link>
            <router-link
              to="/about"
              class="btn btn-secondary text-lg px-8 py-3"
            >
              <font-awesome-icon icon="user" class="mr-2" />
              了解我
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 统计数据 -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="container-custom">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {{ blogStore.articles.length }}
            </div>
            <div class="text-gray-600 dark:text-gray-400">篇文章</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {{ blogStore.categories.length }}
            </div>
            <div class="text-gray-600 dark:text-gray-400">个分类</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {{ blogStore.allTags.length }}
            </div>
            <div class="text-gray-600 dark:text-gray-400">个标签</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {{ totalReadTime }}
            </div>
            <div class="text-gray-600 dark:text-gray-400">分钟阅读</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 最新文章 -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            最新文章
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            分享最新的生活感悟和个人思考
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <ArticleCard
            v-for="article in blogStore.latestArticles"
            :key="article.id"
            :article="article"
            class="animate-slide-up"
          />
        </div>
        
        <div class="text-center">
          <router-link
            to="/articles"
            class="btn btn-primary"
          >
            查看所有文章
            <font-awesome-icon icon="arrow-right" class="ml-2" />
          </router-link>
        </div>
      </div>
    </section>

    <!-- 文章分类 -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            文章分类
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            按主题浏览不同类型的个人文章
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link
            v-for="category in blogStore.categories"
            :key="category.id"
            :to="`/category/${category.id}`"
            class="card p-6 hover:scale-105 transition-transform duration-300 group"
          >
            <div class="flex items-center justify-between mb-4">
              <div 
                class="w-12 h-12 rounded-lg flex items-center justify-center"
                :style="{ backgroundColor: category.color + '20', color: category.color }"
              >
                <font-awesome-icon icon="tag" class="text-xl" />
              </div>
              <span class="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                {{ category.count }} 篇
              </span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {{ category.name }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              {{ category.description }}
            </p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- 热门标签 -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            热门标签
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            快速找到感兴趣的话题内容
          </p>
        </div>
        
        <div class="flex flex-wrap justify-center gap-3">
          <router-link
            v-for="tag in blogStore.popularTags"
            :key="tag"
            :to="`/tag/${tag}`"
            class="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors shadow-sm hover:shadow-md"
          >
            <font-awesome-icon icon="tag" class="mr-2 text-sm" />
            {{ tag }}
          </router-link>
        </div>
      </div>
    </section>

    <!-- 关于我预览 -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto text-center">
          <div class="mb-8">
            <img
              src="/avatar.jpg"
              alt="头像"
              class="w-24 h-24 rounded-full mx-auto mb-6 shadow-lg"
              onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSIjOUI5QkEzIi8+CjxwYXRoIGQ9Ik0yMCA4MEM0MCA2MCA2MCA2MCA4MCA4MEgyMFoiIGZpbGw9IiM5QjlCQTMiLz4KPC9zdmc+'"
            />
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {{ authorInfo.name }}
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {{ authorInfo.bio }}
            </p>
          </div>
          
          <div class="flex justify-center space-x-6 mb-8">
            <a
              v-for="(url, platform) in authorInfo.social"
              :key="platform"
              :href="url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <font-awesome-icon :icon="['fab', platform]" class="text-2xl" />
            </a>
          </div>
          
          <router-link
            to="/about"
            class="btn btn-primary"
          >
            了解更多
            <font-awesome-icon icon="arrow-right" class="ml-2" />
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBlogStore } from '@/stores/blog'
import { authorInfo } from '@/data/blog'
import ArticleCard from '@/components/common/ArticleCard.vue'

// 状态管理
const blogStore = useBlogStore()

// 计算总阅读时间
const totalReadTime = computed(() => {
  return blogStore.articles.reduce((total, article) => total + article.readTime, 0)
})
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
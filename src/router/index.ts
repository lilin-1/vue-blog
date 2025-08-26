import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 路由组件懒加载
const Home = () => import('@/views/Home.vue')
const Articles = () => import('@/views/Articles.vue')
const ArticleDetail = () => import('@/views/ArticleDetail.vue')
const About = () => import('@/views/About.vue')
const NotFound = () => import('@/views/NotFound.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页 - 个人博客',
      description: '欢迎来到我的个人博客，记录生活点滴、分享个人感悟和兴趣爱好'
    }
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles,
    meta: {
      title: '文章列表 - 个人博客',
      description: '浏览所有文章，包含生活随笔、旅行游记、读书笔记等个人分享'
    }
  },
  {
    path: '/articles/:id',
    name: 'ArticleDetail',
    component: ArticleDetail,
    meta: {
      title: '文章详情 - 个人博客'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '关于我 - 个人博客',
      description: '了解更多关于我的信息，包括个人经历、兴趣爱好和联系方式'
    }
  },
  {
    path: '/category/:category',
    name: 'Category',
    component: Articles,
    meta: {
      title: '分类文章 - 个人博客'
    }
  },
  {
    path: '/tag/:tag',
    name: 'Tag',
    component: Articles,
    meta: {
      title: '标签文章 - 个人博客'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '页面未找到 - 个人博客'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置，返回到该位置
    if (savedPosition) {
      return savedPosition
    }
    // 如果有锚点，滚动到锚点
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    // 否则滚动到顶部
    return { top: 0, behavior: 'smooth' }
  }
})

// 路由守卫 - 设置页面标题和meta信息
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  
  // 设置meta描述
  if (to.meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', to.meta.description as string)
    }
  }
  
  next()
})

export default router
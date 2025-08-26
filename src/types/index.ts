// 文章类型定义
export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  tags: string[]
  author: string
  readTime: number // 预计阅读时间（分钟）
  coverImage?: string
  featured?: boolean // 是否为精选文章
}

// 分类类型定义
export interface Category {
  id: string
  name: string
  description: string
  count: number
  color?: string
}

// 作者信息类型定义
export interface Author {
  name: string
  bio: string
  avatar: string
  email: string
  website?: string
  social: {
    github?: string
    twitter?: string
    linkedin?: string
    weibo?: string
  }
}

// 技能类型定义
export interface Skill {
  name: string
  level: number // 1-5 级别
  category: 'frontend' | 'backend' | 'tools' | 'other'
  icon?: string
}

// 项目类型定义
export interface Project {
  id: string
  name: string
  description: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
}

// 导航菜单类型定义
export interface NavItem {
  name: string
  path: string
  icon?: string
  external?: boolean
}

// 搜索结果类型定义
export interface SearchResult {
  type: 'article' | 'category' | 'tag'
  id: string
  title: string
  excerpt?: string
  url: string
}

// 分页信息类型定义
export interface PaginationInfo {
  currentPage: number
  totalPages: number
  pageSize: number
  total: number
}

// 主题类型定义
export type Theme = 'light' | 'dark'

// 路由meta类型扩展
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
    keywords?: string
    requiresAuth?: boolean
  }
}
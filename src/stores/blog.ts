import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Article, Category } from '@/types'
import { blogData } from '@/data/blog'

export const useBlogStore = defineStore('blog', () => {
  // 状态
  const articles = ref<Article[]>(blogData.articles)
  const categories = ref<Category[]>(blogData.categories)
  const searchQuery = ref('')
  const selectedCategory = ref<string | null>(null)
  const selectedTag = ref<string | null>(null)
  const currentPage = ref(1)
  const pageSize = ref(6)
  
  // 计算属性
  const filteredArticles = computed(() => {
    let filtered = articles.value
    
    // 搜索过滤
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }
    
    // 分类过滤
    if (selectedCategory.value) {
      filtered = filtered.filter(article => article.category === selectedCategory.value)
    }
    
    // 标签过滤
    if (selectedTag.value) {
      filtered = filtered.filter(article => article.tags.includes(selectedTag.value!))
    }
    
    // 按日期排序（最新的在前）
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  })
  
  const paginatedArticles = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return filteredArticles.value.slice(start, end)
  })
  
  const totalPages = computed(() => {
    return Math.ceil(filteredArticles.value.length / pageSize.value)
  })
  
  const latestArticles = computed(() => {
    return articles.value
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3)
  })
  
  const allTags = computed(() => {
    const tags = new Set<string>()
    articles.value.forEach(article => {
      article.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  })
  
  const popularTags = computed(() => {
    const tagCount = new Map<string, number>()
    articles.value.forEach(article => {
      article.tags.forEach(tag => {
        tagCount.set(tag, (tagCount.get(tag) || 0) + 1)
      })
    })
    
    return Array.from(tagCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag)
  })
  
  // 方法
  const getArticleById = (id: string): Article | undefined => {
    return articles.value.find(article => article.id === id)
  }
  
  const getArticlesByCategory = (category: string): Article[] => {
    return articles.value.filter(article => article.category === category)
  }
  
  const getArticlesByTag = (tag: string): Article[] => {
    return articles.value.filter(article => article.tags.includes(tag))
  }
  
  const setSearchQuery = (query: string) => {
    searchQuery.value = query
    currentPage.value = 1 // 重置到第一页
  }
  
  const setCategory = (category: string | null) => {
    selectedCategory.value = category
    selectedTag.value = null // 清除标签过滤
    currentPage.value = 1
  }
  
  const setTag = (tag: string | null) => {
    selectedTag.value = tag
    selectedCategory.value = null // 清除分类过滤
    currentPage.value = 1
  }
  
  const setPage = (page: number) => {
    currentPage.value = page
  }
  
  const clearFilters = () => {
    searchQuery.value = ''
    selectedCategory.value = null
    selectedTag.value = null
    currentPage.value = 1
  }
  
  const getRelatedArticles = (articleId: string, limit: number = 3): Article[] => {
    const currentArticle = getArticleById(articleId)
    if (!currentArticle) return []
    
    // 基于相同分类和标签推荐相关文章
    const related = articles.value
      .filter(article => article.id !== articleId)
      .map(article => {
        let score = 0
        
        // 相同分类加分
        if (article.category === currentArticle.category) {
          score += 3
        }
        
        // 相同标签加分
        const commonTags = article.tags.filter(tag => currentArticle.tags.includes(tag))
        score += commonTags.length * 2
        
        return { article, score }
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.article)
    
    return related
  }
  
  return {
    // 状态
    articles,
    categories,
    searchQuery,
    selectedCategory,
    selectedTag,
    currentPage,
    pageSize,
    
    // 计算属性
    filteredArticles,
    paginatedArticles,
    totalPages,
    latestArticles,
    allTags,
    popularTags,
    
    // 方法
    getArticleById,
    getArticlesByCategory,
    getArticlesByTag,
    setSearchQuery,
    setCategory,
    setTag,
    setPage,
    clearFilters,
    getRelatedArticles
  }
})
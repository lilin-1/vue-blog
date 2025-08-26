import type { Article, Category, Author, Skill, Project } from '@/types'

// 作者信息
export const authorInfo: Author = {
  name: 'lilin',
  bio: '对水之星充满爱。',
  avatar: '',
  email: '256404019@qq.com',
  website: '',
  social: {
    github: 'https://github.com/lilin-1',
  }
}

// 技能列表 - 请根据您的实际情况填写
export const skills: Skill[] = [
  // 示例：{ name: '技能名称', level: 1-5, category: 'frontend'|'backend'|'tools'|'other', icon: '图标类名' },
  // { name: 'Vue.js', level: 5, category: 'frontend', icon: 'fab fa-vuejs' },
  // { name: 'React', level: 4, category: 'frontend', icon: 'fab fa-react' },
  // 请在此处添加您的技能
]

// 项目列表 - 请根据您的实际情况填写
export const projects: Project[] = [
  // 示例项目格式：
  // {
  //   id: '1',
  //   name: '项目名称',
  //   description: '项目描述',
  //   image: '/project-image.jpg',
  //   technologies: ['技术1', '技术2'],
  //   githubUrl: 'https://github.com/yourusername/project',
  //   liveUrl: 'https://project-demo.com',
  //   featured: true
  // },
  // 请在此处添加您的项目
]

// 分类列表 - 请根据您的博客内容分类填写
export const categories: Category[] = [
  {
    id: 'life',
    name: '生活随笔',
    description: '记录生活中的点点滴滴',
    count: 0,
    color: '#3B82F6'
  },
  {
    id: 'travel',
    name: '旅行游记',
    description: '分享旅行中的美好时光',
    count: 0,
    color: '#10B981'
  },
  {
    id: 'reading',
    name: '读书笔记',
    description: '记录阅读心得和感悟',
    count: 0,
    color: '#F59E0B'
  },
  {
    id: 'thinking',
    name: '思考感悟',
    description: '对生活和人生的思考',
    count: 0,
    color: '#8B5CF6'
  },
  {
    id: 'hobby',
    name: '兴趣爱好',
    description: '分享个人兴趣和爱好',
    count: 0,
    color: '#EF4444'
  }
]

// 文章列表 - 请在此处添加您的文章
// 文章格式示例：
// {
//   id: 'unique-article-id',
//   title: '文章标题',
//   excerpt: '文章摘要，简要描述文章内容',
//   content: `# 文章标题

// 这里是文章的 Markdown 内容...
// `,
//   date: '2024-01-15',
//   category: 'life', // 对应上面分类的 id
//   tags: ['标签1', '标签2'],
//   author: '作者名称',
//   readTime: 5, // 预计阅读时间（分钟）
//   coverImage: '/article-cover.jpg', // 可选
//   featured: false // 是否为精选文章，可选
// },

export const articles: Article[] = [
  // 请在此处添加您的文章
]

// 导出博客数据
export const blogData = {
  articles,
  categories,
  author: authorInfo,
  skills,
  projects
}
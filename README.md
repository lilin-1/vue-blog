# Vue 3 个人技术博客

一个基于 Vue 3 + TypeScript + Vite 构建的现代化个人技术博客，支持 Markdown 渲染、主题切换、响应式设计等功能。

## ✨ 特性

- 🚀 **现代技术栈**: Vue 3 + TypeScript + Vite
- 🎨 **美观界面**: Tailwind CSS + 响应式设计
- 📝 **Markdown 支持**: 文章内容支持 Markdown 渲染和代码高亮
- 🌙 **主题切换**: 支持深色/浅色主题切换
- 🔍 **搜索功能**: 全文搜索文章、分类和标签
- 📱 **移动端适配**: 完美支持移动端浏览
- 🏷️ **分类标签**: 支持文章分类和标签管理
- 📄 **分页功能**: 文章列表分页显示
- 🔗 **SEO 优化**: 完善的 meta 标签和语义化 HTML
- 📊 **GitHub Pages**: 支持一键部署到 GitHub Pages

## 🛠️ 技术栈

- **前端框架**: Vue 3 (Composition API)
- **开发语言**: TypeScript
- **构建工具**: Vite
- **路由管理**: Vue Router 4
- **状态管理**: Pinia
- **样式框架**: Tailwind CSS
- **图标库**: Font Awesome
- **Markdown 渲染**: marked + highlight.js
- **部署平台**: GitHub Pages

## 📦 安装和运行

### 环境要求

- Node.js >= 16
- npm >= 8

### 克隆项目

```bash
git clone https://github.com/yourusername/vue-blog.git
cd vue-blog
```

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000 查看效果。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📝 添加新文章

### 1. 编辑文章数据

在 `src/data/blog.ts` 文件中的 `articles` 数组中添加新文章：

```typescript
{
  id: 'unique-article-id',
  title: '文章标题',
  excerpt: '文章摘要',
  content: `# 文章标题

这里是文章的 Markdown 内容...
`,
  date: '2024-01-15',
  category: 'frontend', // 对应分类 ID
  tags: ['Vue.js', 'TypeScript'],
  author: '作者名称',
  readTime: 5, // 预计阅读时间（分钟）
  coverImage: '/article-cover.jpg', // 可选
  featured: true // 是否为精选文章，可选
}
```

### 2. 更新分类信息

如果使用了新的分类，需要在 `categories` 数组中添加对应的分类信息：

```typescript
{
  id: 'new-category',
  name: '新分类',
  description: '分类描述',
  count: 1, // 该分类下的文章数量
  color: '#3B82F6' // 分类颜色
}
```

### 3. 添加图片资源

将文章相关的图片放在 `public` 目录下，然后在文章中使用相对路径引用：

```markdown
![图片描述](/images/article-image.jpg)
```

## 🚀 部署到 GitHub Pages

### 1. 配置仓库

1. 在 GitHub 上创建一个新仓库
2. 将代码推送到仓库的 `main` 分支

### 2. 配置 Vite

在 `vite.config.ts` 中修改 `base` 配置：

```typescript
export default defineConfig({
  // ...
  base: '/your-repo-name/', // 替换为你的仓库名
  // ...
})
```

### 3. 启用 GitHub Pages

1. 进入仓库的 Settings 页面
2. 找到 Pages 设置
3. Source 选择 "GitHub Actions"
4. 推送代码到 `main` 分支，GitHub Actions 会自动构建和部署

### 4. 自定义域名（可选）

如果有自定义域名，在 `.github/workflows/deploy.yml` 中修改 `cname` 配置：

```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    # ...
    cname: your-domain.com  # 替换为你的域名
```

## 🎨 自定义配置

### 修改个人信息

在 `src/data/blog.ts` 中修改 `authorInfo` 对象：

```typescript
export const authorInfo: Author = {
  name: '你的名字',
  bio: '个人简介',
  avatar: '/avatar.jpg',
  email: 'your.email@example.com',
  website: 'https://yourdomain.com',
  social: {
    github: 'https://github.com/yourusername',
    twitter: 'https://twitter.com/yourusername',
    // ...
  }
}
```

### 修改网站信息

在 `index.html` 中修改网站标题和描述：

```html
<title>你的博客标题</title>
<meta name="description" content="你的博客描述" />
```

### 自定义主题色

在 `tailwind.config.js` 中修改主题色配置：

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // 修改这里的颜色值
        500: '#your-color',
        600: '#your-color',
        // ...
      }
    }
  }
}
```

## 📁 项目结构

```
vue-blog/
├── public/                 # 静态资源
│   ├── avatar.jpg         # 头像图片
│   └── ...
├── src/
│   ├── components/        # 组件
│   │   ├── common/       # 通用组件
│   │   └── layout/       # 布局组件
│   ├── data/             # 数据文件
│   │   └── blog.ts       # 博客数据
│   ├── stores/           # 状态管理
│   │   ├── blog.ts       # 博客状态
│   │   └── theme.ts      # 主题状态
│   ├── types/            # 类型定义
│   ├── utils/            # 工具函数
│   ├── views/            # 页面组件
│   ├── router/           # 路由配置
│   ├── style.css         # 全局样式
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions 配置
├── index.html            # HTML 模板
├── vite.config.ts        # Vite 配置
├── tailwind.config.js    # Tailwind 配置
└── package.json          # 项目配置
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Font Awesome](https://fontawesome.com/) - 图标库
- [marked](https://marked.js.org/) - Markdown 解析器
- [highlight.js](https://highlightjs.org/) - 代码高亮库

---

如果这个项目对你有帮助，请给个 ⭐️ 支持一下！
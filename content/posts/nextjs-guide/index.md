---
title: "用 Next.js 16 构建现代博客"
date: "2026-05-20"
summary: "一份全面指南，教你用 Next.js 16 App Router、Markdown 和 Tailwind CSS 构建高性能、功能丰富的博客。"
tags: ["nextjs", "react", "教程", "web-development"]
published: true
featured: true
---

## 前言

Next.js 已经成为构建 React 应用最受欢迎的框架之一。随着版本 16 的发布，App Router 已经成熟为构建内容驱动型网站的强大工具。在这篇文章中，我会详细介绍构建现代博客的架构决策。

## 为什么用 Next.js 做博客？

你可能会想——当有那么多静态站点生成器时，为什么还要用 React 框架做博客？以下是我的理由：

1. **App Router** — 基于文件的路由让页面组织非常直观
2. **React Server Components** — 在服务端渲染内容，性能更好
3. **Markdown 支持** — 用普通 Markdown 写内容
4. **静态生成** — 构建时预渲染所有页面，加载飞快
5. **生态系统** — 可以使用整个 React 生态系统

## 核心架构决策

### 用 Markdown 管理内容

我选择了 Markdown 文件而不是 CMS，因为：

- 文章和代码在一起，版本管理方便
- 不需要数据库
- 写作体验流畅，任何编辑器都能写
- 构建时直接读取文件系统，零运行时开销

### 数据层设计

核心数据层是一个简单的模块，直接读取文件系统：

```typescript
function getAllPosts(): Post[] {
  const contentDir = path.join(process.cwd(), 'content/posts');
  const slugs = fs.readdirSync(contentDir);

  return slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
```

### 搜索实现

搜索使用了 Fuse.js 做客户端模糊匹配。对于几百篇文章以内的博客来说，这个方案非常合适。搜索索引在服务端构建，序列化后传给客户端。

## 性能优化

- **静态生成**：所有博客页面在构建时预渲染
- **字体优化**：使用 next/font 自动优化字体加载
- **最小化 JavaScript**：只有交互组件才会包含客户端 JS
- **图片懒加载**：所有图片默认 lazy loading

## 总结

用 Next.js 16 构建博客是极好的开发体验。静态生成、Markdown 内容和现代 React 模式的结合，创造了一个快速、可维护、令人愉悦的博客平台。

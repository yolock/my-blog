---
title: "Web 性能优化完全指南"
date: "2026-05-10"
summary: "让你的网站飞起来的实用策略。从 Core Web Vitals 到高级加载模式，全方位覆盖。"
tags: ["performance", "web-development", "best-practices"]
published: true
featured: false
---

## 为什么性能很重要

页面加载时间每延迟 100 毫秒，转化率就可能下降 7%。Google 将 Core Web Vitals 作为排名信号。但除了指标之外，快速的网站能为真实用户创造更好的体验。

## Core Web Vitals

有三个关键指标需要优化：

| 指标 | 目标 | 含义 |
|------|------|------|
| **LCP** | < 2.5s | 最大内容绘制 — 主要内容加载速度 |
| **INP** | < 200ms | 交互到下一次绘制 — 页面响应有多快 |
| **CLS** | < 0.1 | 累计布局偏移 — 视觉稳定性 |

## 实用优化策略

### 1. 优化图片

图片通常是页面上最大的资源：

- 使用现代格式（WebP、AVIF）
- 使用 `srcset` 提供响应式尺寸
- 延迟加载首屏以外的图片
- 使用模糊占位符技术

### 2. 减少 JavaScript

JavaScript 是最昂贵的资源：

- 在路由级别进行代码分割
- 延迟加载非关键组件
- 使用 `React.lazy` 和 `Suspense` 进行代码分割
- 对于大部分静态页面，考虑 Islands 架构

### 3. 字体加载策略

字体可能阻塞渲染。以下是最佳策略：

```css
/* 使用 font-display: swap 允许文本先显示再替换字体 */
@font-face {
  font-family: 'Inter';
  font-display: swap;
  src: url('/fonts/inter.woff2') format('woff2');
}
```

### 4. 缓存策略

合理的缓存可以显著提升重复访问速度：

```
Cache-Control: public, max-age=31536000, immutable
```

对于文件名包含内容哈希的静态资源，使用积极的缓存策略。

## 性能测量工具

使用以下工具跟踪性能：

- **Lighthouse** — Chrome DevTools 中的实验室数据
- **PageSpeed Insights** — 结合实验室和真实用户数据
- **Web Vitals 扩展** — 开发过程中实时查看指标

## 总结

性能优化是一个持续的过程，不是一次性任务。从最大的收益开始——图片优化、代码分割和合理的缓存——然后不断迭代改进。你的用户（以及你的 SEO）会感谢你的。

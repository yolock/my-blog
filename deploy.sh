#!/bin/bash
# Blog management script
# Usage:
#   ./deploy.sh new "文章标题"         创建新文章模板
#   ./deploy.sh push "提交信息"        提交并推送部署
#   ./deploy.sh deploy "提交信息"      创建+提交+推送（一键部署）

set -e

BLOG_DIR="D:/workspace2/code/my_blog"
CONTENT_DIR="$BLOG_DIR/content/posts"

today=$(date +%F)

# ---- helpers ----
slugify() {
  echo "$1" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/-\+/-/g' | sed 's/^-//;s/-$//'
}

# ---- new post ----
new_post() {
  local title="$1"
  if [ -z "$title" ]; then
    read -p "文章标题: " title
  fi
  local slug=$(slugify "$title")
  local dir="$CONTENT_DIR/$slug"

  if [ -d "$dir" ]; then
    echo "错误: 文章目录已存在: $dir"
    exit 1
  fi

  mkdir -p "$dir"

  cat > "$dir/index.md" << MDEOF
---
title: "$title"
date: "$today"
summary: ""
tags: [""]
published: true
featured: false
---

##

MDEOF

  echo "✓ 文章创建成功: content/posts/$slug/index.md"
  echo "  用编辑器打开并编辑内容，然后运行:"
  echo "  ./deploy.sh deploy \"新增文章: $title\""
}

# ---- commit & push ----
push_changes() {
  local msg="$1"
  if [ -z "$msg" ]; then
    msg="更新博客 - $today"
  fi

  cd "$BLOG_DIR"

  if [ -z "$(git status --porcelain)" ]; then
    echo "没有需要提交的变更。"
    exit 0
  fi

  echo "→ 暂存文件..."
  git add -A

  echo "→ 提交: $msg"
  git commit -m "$msg" || true

  echo "→ 推送到 GitHub..."
  git push origin main

  echo "✓ 已推送。Vercel 将自动部署。"
  echo "  https://myblog-cyan-one.vercel.app"
}

# ---- deploy = new + push ----
deploy_all() {
  local msg="$1"
  new_post "$2"
  echo ""
  push_changes "$msg"
}

# ---- main ----
case "${1:-}" in
  new)
    new_post "$2"
    ;;
  push)
    push_changes "$2"
    ;;
  deploy)
    deploy_all "$2" "$3"
    ;;
  *)
    echo "博客管理脚本"
    echo ""
    echo "用法:"
    echo "  ./deploy.sh new \"文章标题\"         创建新文章"
    echo "  ./deploy.sh push \"提交信息\"        提交并推送"
    echo "  ./deploy.sh deploy \"信息\" \"标题\"  创建+推送"
    echo ""
    echo "示例:"
    echo "  ./deploy.sh new \"我的新文章\""
    echo "  ./deploy.sh push \"修复标签问题\""
    echo "  ./deploy.sh deploy \"新文章\" \"Docker 入门指南\""
    ;;
esac

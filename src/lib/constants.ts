export const SITE_NAME = "yolo";
export const SITE_DESCRIPTION = "关于代码、设计和生活的思考。";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://myblog-cyan-one.vercel.app";
export const AUTHOR_NAME = "yolo";
export const AUTHOR_EMAIL = "hello@myblog.com";
export const AUTHOR_BIO = "全栈开发者。写写技术文章，聊聊系统设计，分享构建产品的思考。";

export const SOCIAL_LINKS = {
  github: "https://github.com",
  twitter: "https://twitter.com",
  linkedin: "https://linkedin.com",
  rss: "/feed.xml",
} as const;

export const POSTS_PER_PAGE = 9;
export const CONTENT_DIR = "content/posts";

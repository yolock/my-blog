export const SITE_NAME = "My Blog";
export const SITE_DESCRIPTION = "Thoughts on software, design, and life.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://myblog-cyan-one.vercel.app";
export const AUTHOR_NAME = "Alex";
export const AUTHOR_EMAIL = "hello@myblog.com";
export const AUTHOR_BIO = "Full-stack developer. I write about web technologies, system design, and building great products.";

export const SOCIAL_LINKS = {
  github: "https://github.com",
  twitter: "https://twitter.com",
  linkedin: "https://linkedin.com",
  rss: "/feed.xml",
} as const;

export const POSTS_PER_PAGE = 9;
export const CONTENT_DIR = "content/posts";

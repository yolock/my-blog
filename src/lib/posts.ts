import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import type { Post, PostSummary, PostFrontmatter, Heading, Tag } from "@/types/blog";
import { getReadingTimeText } from "./utils";
import { CONTENT_DIR } from "./constants";

const postsCache = new Map<string, Post>();
let allPostsCache: Post[] | null = null;

function getContentDir(): string {
  return path.resolve(process.cwd(), CONTENT_DIR);
}

function normalizeSlug(dirName: string): string {
  return dirName.replace(/\\/g, "/");
}

function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  try {
    const tree = remark().parse(content);
    visit(tree, "heading", (node: any) => {
      if (node.depth <= 3) {
        const text = toString(node);
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_]+/g, "-")
          .replace(/^-+|-+$/g, "");
        headings.push({
          level: node.depth as 1 | 2 | 3,
          text,
          id,
        });
      }
    });
  } catch {
    // Silently fail on parse errors — headings are optional
  }
  return headings;
}

function loadPost(slug: string): Post | null {
  if (postsCache.has(slug)) return postsCache.get(slug)!;

  const contentDir = getContentDir();
  const postDir = path.join(contentDir, slug);

  if (!fs.existsSync(postDir)) return null;

  const mdPath = path.join(postDir, "index.md");
  if (!fs.existsSync(mdPath)) return null;

  try {
    const raw = fs.readFileSync(mdPath, "utf-8");
    const { data, content } = matter(raw);

    const frontmatter: PostFrontmatter = {
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString().split("T")[0],
      summary: data.summary || "",
      tags: data.tags || [],
      published: data.published !== false,
      featured: data.featured || false,
      coverImage: data.coverImage,
      coverAlt: data.coverAlt,
      canonical: data.canonical,
      series: data.series,
      seriesOrder: data.seriesOrder,
    };

    const post: Post = {
      slug,
      frontmatter,
      content,
      readingTime: getReadingTimeText(content),
      headings: extractHeadings(content),
    };

    postsCache.set(slug, post);
    return post;
  } catch {
    return null;
  }
}

export function getAllPosts(): PostSummary[] {
  if (allPostsCache) return allPostsCache;

  const contentDir = getContentDir();
  if (!fs.existsSync(contentDir)) return [];

  const entries = fs.readdirSync(contentDir, { withFileTypes: true });
  const posts: Post[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const post = loadPost(normalizeSlug(entry.name));
    if (post && post.frontmatter.published) {
      posts.push(post);
    }
  }

  posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );

  allPostsCache = posts;
  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const all = getAllPosts();
  return all.find((p) => p.slug === slug && p.frontmatter.published) as Post | null;
}

export function getPostsByTag(tag: string): PostSummary[] {
  const all = getAllPosts();
  return all.filter((p) =>
    p.frontmatter.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getRelatedPosts(
  slug: string,
  tags: string[],
  count = 3
): PostSummary[] {
  const all = getAllPosts();
  return all
    .filter(
      (p) =>
        p.slug !== slug &&
        p.frontmatter.tags.some((t) => tags.includes(t))
    )
    .slice(0, count);
}

export function getAllTags(): Tag[] {
  const all = getAllPosts();
  const tagMap = new Map<string, number>();

  for (const post of all) {
    for (const tag of post.frontmatter.tags) {
      const lower = tag.toLowerCase();
      tagMap.set(lower, (tagMap.get(lower) || 0) + 1);
    }
  }

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPaginatedPosts(
  page: number,
  perPage: number
): { posts: PostSummary[]; total: number } {
  const all = getAllPosts();
  const total = all.length;
  const start = (page - 1) * perPage;
  const posts = all.slice(start, start + perPage);
  return { posts, total };
}

export function getAdjacentPosts(slug: string): {
  prev: PostSummary | null;
  next: PostSummary | null;
} {
  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx < all.length - 1 ? all[idx + 1] : null,
    next: idx > 0 ? all[idx - 1] : null,
  };
}

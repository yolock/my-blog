import Fuse from "fuse.js";
import { getAllPosts } from "./posts";

interface SearchDocument {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  content: string;
}

let searchIndex: Fuse<SearchDocument> | null = null;

function buildDocuments(): SearchDocument[] {
  const posts = getAllPosts();
  return posts.map((post) => {
    const content = "content" in post ? (post as any).content : "";
    return {
      slug: post.slug,
      title: post.frontmatter.title,
      summary: post.frontmatter.summary,
      tags: post.frontmatter.tags,
      content: stripMarkdown(content).slice(0, 1000),
    };
  });
}

function stripMarkdown(md: string): string {
  return md
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
    .replace(/>\s+/gm, "")
    .replace(/[-*+]\s+/g, "")
    .replace(/\n{2,}/g, " ")
    .replace(/\n/g, " ")
    .trim();
}

function getSearchIndex(): Fuse<SearchDocument> {
  if (searchIndex) return searchIndex;

  searchIndex = new Fuse(buildDocuments(), {
    keys: [
      { name: "title", weight: 0.4 },
      { name: "summary", weight: 0.3 },
      { name: "tags", weight: 0.2 },
      { name: "content", weight: 0.1 },
    ],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2,
  });

  return searchIndex;
}

export function searchPosts(query: string, limit = 20) {
  if (!query.trim()) return [];
  const fuse = getSearchIndex();
  return fuse.search(query, { limit }).map((r) => ({
    slug: r.item.slug,
    score: r.score,
  }));
}

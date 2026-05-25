import { Suspense } from "react";
import { getAllPosts } from "@/lib/posts";
import { SearchContent } from "./search-content";

export const dynamic = "force-static";

export default function SearchPage() {
  const posts = getAllPosts();

  const serializedPosts = posts.map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    summary: p.frontmatter.summary,
    tags: p.frontmatter.tags,
    date: p.frontmatter.date,
    readingTime: p.readingTime,
  }));

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground">
            搜索
          </h1>
          <div className="h-12 rounded-2xl bg-muted animate-pulse" />
        </div>
      }
    >
      <SearchContent posts={serializedPosts} />
    </Suspense>
  );
}

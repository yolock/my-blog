"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";
import { useDebounce } from "@/hooks/use-debounce";
import { SearchInput } from "@/components/ui/search-input";
import { PostCard } from "@/components/blog/post-card";
import type { PostSummary, PostFrontmatter } from "@/types/blog";

interface SerializedPost {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  date: string;
  readingTime: string;
}

interface SearchContentProps {
  posts: SerializedPost[];
}

export function SearchContent({ posts }: SearchContentProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 300);

  const fuseInstance = useMemo(() => {
    const docs = posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      tags: p.tags.join(" "),
    }));

    return new Fuse(docs, {
      keys: [
        { name: "title", weight: 0.4 },
        { name: "summary", weight: 0.3 },
        { name: "tags", weight: 0.2 },
        { name: "slug", weight: 0.1 },
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }, [posts]);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return posts;

    const fuseResults = fuseInstance.search(debouncedQuery, { limit: 30 });
    const resultSlugs = new Set(fuseResults.map((r) => r.item.slug));
    return posts.filter((p) => resultSlugs.has(p.slug));
  }, [debouncedQuery, fuseInstance, posts]);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="mb-10">
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground">
          Search
        </h1>
        <SearchInput value={query} onChange={setQuery} />
        {debouncedQuery && (
          <p className="mt-3 text-sm text-muted-foreground">
            {results.length} {results.length === 1 ? "result" : "results"} for &quot;{debouncedQuery}&quot;
          </p>
        )}
      </div>

      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((post) => (
            <PostCard
              key={post.slug}
              post={{
                slug: post.slug,
                frontmatter: {
                  title: post.title,
                  date: post.date,
                  summary: post.summary,
                  tags: post.tags,
                  published: true,
                },
                readingTime: post.readingTime,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">No posts found.</p>
          {debouncedQuery && (
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different search term.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

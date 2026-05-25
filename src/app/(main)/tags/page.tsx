import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse posts by topic.",
};

export const dynamic = "force-static";

export default function TagsPage() {
  const tags = getAllTags();

  if (tags.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20 text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground">
          Tags
        </h1>
        <p className="text-muted-foreground">No tags yet.</p>
      </div>
    );
  }

  const maxCount = tags[0]?.count || 1;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Tags
        </h1>
        <p className="mt-2 text-muted-foreground">
          {tags.length} {tags.length === 1 ? "topic" : "topics"} to explore
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => {
          const size = 0.75 + (tag.count / maxCount) * 1.25;
          return (
            <Link
              key={tag.name}
              href={`/tags/${tag.name}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 transition-all hover:border-accent hover:bg-accent/10 hover:-translate-y-0.5"
              style={{ fontSize: `${size}rem` }}
            >
              <span className="font-medium text-foreground">{tag.name}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {tag.count}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

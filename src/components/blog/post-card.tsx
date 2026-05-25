import Link from "next/link";
import type { PostSummary } from "@/types/blog";
import { formatDate } from "@/lib/utils";
import { TagBadge } from "./tag-badge";

interface PostCardProps {
  post: PostSummary;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const { slug, frontmatter, readingTime } = post;

  return (
    <Link
      href={`/blog/${slug}`}
      className="group block rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      {featured && frontmatter.coverImage && (
        <div className="-mx-6 -mt-6 mb-5 overflow-hidden rounded-t-2xl">
          <img
            src={frontmatter.coverImage}
            alt={frontmatter.coverAlt || frontmatter.title}
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="mb-3 flex flex-wrap gap-1.5">
        {frontmatter.tags.slice(0, 3).map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>

      <h3 className="mb-2 text-lg font-semibold leading-snug text-card-foreground group-hover:text-accent transition-colors line-clamp-2">
        {frontmatter.title}
      </h3>

      <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
        {frontmatter.summary}
      </p>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
        <span aria-hidden="true">&middot;</span>
        <span>{readingTime}</span>
      </div>
    </Link>
  );
}

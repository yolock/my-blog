"use client";

import { cn } from "@/lib/utils";
import { useIntersection } from "@/hooks/use-intersection";
import type { Heading } from "@/types/blog";

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const activeId = useIntersection("h2[id], h3[id]");

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-1" aria-label="Table of contents">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        目录
      </p>
      <ul className="space-y-0.5 border-l border-border">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "block py-1 text-sm transition-colors hover:text-foreground",
                heading.level === 3 ? "pl-6" : "pl-3",
                activeId === heading.id
                  ? "border-l-2 -ml-px border-accent text-accent font-medium"
                  : "text-muted-foreground"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

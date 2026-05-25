"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [1];

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) pages.push("...");

  if (total > 1) pages.push(total);

  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath = "/blog",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav
      aria-label="Blog pagination"
      className="flex items-center justify-center gap-1.5 pt-10"
    >
      <Link
        href={currentPage > 1 ? `${basePath}?page=${currentPage - 1}` : "#"}
        className={cn(
          "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          currentPage <= 1
            ? "pointer-events-none text-muted-foreground/50"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
        aria-disabled={currentPage <= 1}
        tabIndex={currentPage <= 1 ? -1 : 0}
      >
        Prev
      </Link>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-2 text-sm text-muted-foreground"
          >
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={`${basePath}?page=${page}`}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
              page === currentPage
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </Link>
        )
      )}

      <Link
        href={
          currentPage < totalPages
            ? `${basePath}?page=${currentPage + 1}`
            : "#"
        }
        className={cn(
          "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          currentPage >= totalPages
            ? "pointer-events-none text-muted-foreground/50"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
        aria-disabled={currentPage >= totalPages}
        tabIndex={currentPage >= totalPages ? -1 : 0}
      >
        Next
      </Link>
    </nav>
  );
}

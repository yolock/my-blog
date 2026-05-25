"use client";

import Link from "next/link";
import { createTagSlug } from "@/lib/utils";

interface TagBadgeProps {
  tag: string;
  active?: boolean;
}

export function TagBadge({ tag, active = false }: TagBadgeProps) {
  return (
    <Link
      href={`/tags/${createTagSlug(tag)}`}
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
        active
          ? "bg-accent text-accent-foreground"
          : "bg-muted text-muted-foreground hover:bg-accent/20 hover:text-foreground"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {tag}
    </Link>
  );
}

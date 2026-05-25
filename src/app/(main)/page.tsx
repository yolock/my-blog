import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { AUTHOR_NAME, AUTHOR_BIO } from "@/lib/constants";
import { PostGrid } from "@/components/blog/post-grid";

export const dynamic = "force-static";

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((p) => p.frontmatter.featured);
  const latestPosts = allPosts.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-20 sm:py-28">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Hi, I&apos;m {AUTHOR_NAME}
          </h1>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {AUTHOR_BIO}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90 active:scale-[0.97]"
            >
              Read the blog
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted"
            >
              About me
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Featured
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Hand-picked posts worth your time
              </p>
            </div>
          </div>
          <PostGrid posts={featuredPosts} featured />
        </section>
      )}

      {/* Latest Posts */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Latest
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              What I&apos;ve been writing lately
            </p>
          </div>
          {allPosts.length > 6 && (
            <Link
              href="/blog"
              className="text-sm font-medium text-accent hover:underline"
            >
              View all posts &rarr;
            </Link>
          )}
        </div>
        <PostGrid posts={latestPosts} />
        {allPosts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">
              No posts yet. Check back soon!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

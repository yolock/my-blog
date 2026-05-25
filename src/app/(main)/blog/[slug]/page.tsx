import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllPosts, getRelatedPosts, getAdjacentPosts } from "@/lib/posts";
import { MarkdownBody } from "@/components/blog/markdown-body";
import { generatePostMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";
import { AUTHOR_NAME, SITE_URL } from "@/lib/constants";
import { TagBadge } from "@/components/blog/tag-badge";
import { PostCard } from "@/components/blog/post-card";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return generatePostMetadata(post);
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, post.frontmatter.tags, 3);
  const { prev, next } = getAdjacentPosts(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.summary,
    datePublished: post.frontmatter.date,
    author: { "@type": "Person", name: AUTHOR_NAME },
    url: `${SITE_URL}/blog/${slug}`,
  };

  return (
    <>
      <ScrollProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        {/* Post header */}
        <header className="border-b border-border bg-muted/30 px-4 sm:px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex flex-wrap gap-1.5">
              {post.frontmatter.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {post.frontmatter.title}
            </h1>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              {post.frontmatter.summary}
            </p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <time dateTime={post.frontmatter.date}>
                {formatDate(post.frontmatter.date)}
              </time>
              <span aria-hidden="true">&middot;</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime}
              </span>
            </div>
          </div>
        </header>

        {/* Post content with TOC sidebar */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 lg:py-14">
          <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-12">
            <div className="min-w-0">
              <MarkdownBody content={post.content} />
            </div>
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents headings={post.headings} />
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Tags */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-10">
        <div className="flex flex-wrap gap-2 border-t border-border pt-8">
          <span className="text-sm font-medium text-muted-foreground mr-2">标签：</span>
          {post.frontmatter.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} active />
          ))}
        </div>
      </div>

      {/* Prev / Next navigation */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-10">
        <div className="grid grid-cols-2 gap-4 border-t border-border pt-8">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="group rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/50"
            >
              <span className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                <ArrowLeft className="h-3 w-3" /> 上一篇
              </span>
              <span className="text-sm font-medium text-foreground group-hover:text-accent line-clamp-1">
                {prev.frontmatter.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="group rounded-xl border border-border bg-card p-4 text-right transition-colors hover:bg-muted/50"
            >
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground mb-1">
                下一篇 <ArrowRight className="h-3 w-3" />
              </span>
              <span className="text-sm font-medium text-foreground group-hover:text-accent line-clamp-1">
                {next.frontmatter.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-muted/30 border-t border-border px-4 sm:px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
              相关文章
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((rp) => (
                <PostCard key={rp.slug} post={rp} />
              ))}
            </div>
          </div>
        </section>
      )}

      <BackToTop />
    </>
  );
}

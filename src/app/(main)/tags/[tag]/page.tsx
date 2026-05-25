import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostsByTag, getAllTags, resolveTagName } from "@/lib/posts";
import { PostGrid } from "@/components/blog/post-grid";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const tagName = resolveTagName(tag) || tag;
  return {
    title: `#${tagName}`,
    description: `标签 "${tagName}" 下的所有文章。`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const tagName = resolveTagName(tag);
  if (!tagName) notFound();

  const posts = getPostsByTag(tag);

  if (posts.length === 0) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          <span className="text-accent">#</span> {tagName}
        </h1>
        <p className="mt-2 text-muted-foreground">
          共 {posts.length} 篇文章
        </p>
      </div>
      <PostGrid posts={posts} />
    </div>
  );
}

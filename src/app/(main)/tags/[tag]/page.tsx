import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostsByTag, getAllTags } from "@/lib/posts";
import { PostGrid } from "@/components/blog/post-grid";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((t) => ({ tag: t.name }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag}`,
    description: `Posts tagged with "${tag}".`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          <span className="text-accent">#</span> {tag}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {posts.length} {posts.length === 1 ? "post" : "posts"} tagged
        </p>
      </div>
      <PostGrid posts={posts} />
    </div>
  );
}

import type { Metadata } from "next";
import { POSTS_PER_PAGE } from "@/lib/constants";
import { getPaginatedPosts } from "@/lib/posts";
import { PostGrid } from "@/components/blog/post-grid";
import { Pagination } from "@/components/blog/pagination";

export const metadata: Metadata = {
  title: "文章",
  description: "所有文章列表。",
};

export const dynamic = "force-static";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam || "1", 10) || 1);
  const { posts, total } = getPaginatedPosts(page, POSTS_PER_PAGE);
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

  const safePage = Math.min(page, totalPages);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          文章
        </h1>
        <p className="mt-2 text-muted-foreground">
          共 {total} 篇文章
        </p>
      </div>

      {posts.length > 0 ? (
        <>
          <PostGrid posts={posts} />
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
          />
        </>
      ) : (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">暂无文章。</p>
        </div>
      )}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import type { PostSummary } from "@/types/blog";
import { PostCard } from "./post-card";

interface PostGridProps {
  posts: PostSummary[];
  featured?: boolean;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function PostGrid({ posts, featured = false }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">No posts yet.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {posts.map((post) => (
        <motion.div key={post.slug} variants={cardVariants}>
          <PostCard post={post} featured={featured} />
        </motion.div>
      ))}
    </motion.div>
  );
}

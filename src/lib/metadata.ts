import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, AUTHOR_NAME } from "./constants";
import type { Post } from "@/types/blog";

export function generateBaseMetadata(override?: Partial<Metadata>): Metadata {
  return {
    title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
    description: SITE_DESCRIPTION,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
    },
    ...override,
  };
}

export function generatePostMetadata(post: Post): Metadata {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = post.frontmatter.coverImage
    ? `${SITE_URL}/blog/${post.slug}/${post.frontmatter.coverImage}`
    : `${SITE_URL}/og-default.png`;

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.summary,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      type: "article",
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
      url,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      images: [ogImage],
    },
    alternates: {
      canonical: post.frontmatter.canonical ?? url,
    },
  };
}

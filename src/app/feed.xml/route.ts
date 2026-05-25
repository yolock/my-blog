import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, AUTHOR_NAME, AUTHOR_EMAIL } from "@/lib/constants";

export async function GET() {
  const posts = getAllPosts();
  const now = new Date();

  const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${SITE_NAME}</title>
  <subtitle>${SITE_DESCRIPTION}</subtitle>
  <link href="${SITE_URL}/feed.xml" rel="self"/>
  <link href="${SITE_URL}"/>
  <updated>${posts[0]?.frontmatter.date || now.toISOString()}</updated>
  <id>${SITE_URL}</id>
  <author>
    <name>${AUTHOR_NAME}</name>
    <email>${AUTHOR_EMAIL}</email>
  </author>
${posts
  .map(
    (post) => {
      const fullPost = getPostBySlug(post.slug);
      const content = fullPost?.content || post.frontmatter.summary;
      const url = `${SITE_URL}/blog/${post.slug}`;
      return `  <entry>
    <title>${escapeXml(post.frontmatter.title)}</title>
    <link href="${url}"/>
    <id>${url}</id>
    <published>${post.frontmatter.date}</published>
    <updated>${post.frontmatter.date}</updated>
    <summary>${escapeXml(post.frontmatter.summary)}</summary>
    <content type="html">${escapeXml(content)}</content>
${post.frontmatter.tags.map((tag) => `    <category term="${escapeXml(tag)}"/>`).join("\n")}
  </entry>`;
    }
  )
  .join("\n")}
</feed>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

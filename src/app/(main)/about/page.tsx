import type { Metadata } from "next";
import { AUTHOR_NAME, AUTHOR_BIO } from "@/lib/constants";
import { Mail, Globe } from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "@/components/ui/social-icons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: `About ${AUTHOR_NAME}.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="mb-12">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground">
          About Me
        </h1>
        <div className="prose">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {AUTHOR_BIO}
          </p>
          <p className="text-muted-foreground">
            Welcome to my blog! Here I write about web development, software
            architecture, and the craft of building great products. I believe in
            clean code, thoughtful design, and continuous learning.
          </p>
          <p className="text-muted-foreground">
            When I&apos;m not coding, you can find me reading, hiking, or
            experimenting with new technologies. I&apos;m passionate about
            open-source software and enjoy contributing to the community.
          </p>
          <h2>What You&apos;ll Find Here</h2>
          <ul>
            <li>In-depth tutorials on modern web technologies</li>
            <li>Thoughts on software design and architecture</li>
            <li>Tips and tricks from real-world projects</li>
            <li>Reflections on the craft of programming</li>
          </ul>
          <h2>Get in Touch</h2>
          <p>
            I&apos;m always happy to connect with fellow developers. Feel free
            to reach out through any of the channels below.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted"
        >
          <GithubIcon className="h-4 w-4" />
          GitHub
        </Link>
        <Link
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted"
        >
          <TwitterIcon className="h-4 w-4" />
          Twitter
        </Link>
        <Link
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted"
        >
          <LinkedinIcon className="h-4 w-4" />
          LinkedIn
        </Link>
        <a
          href="mailto:hello@myblog.com"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted"
        >
          <Mail className="h-4 w-4" />
          Email
        </a>
      </div>
    </div>
  );
}

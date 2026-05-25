import Link from "next/link";
import { Rss } from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "@/components/ui/social-icons";
import { SOCIAL_LINKS, AUTHOR_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-4">
            <Link
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <GithubIcon className="h-5 w-5" />
            </Link>
            <Link
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Twitter"
            >
              <TwitterIcon className="h-5 w-5" />
            </Link>
            <Link
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-5 w-5" />
            </Link>
            <Link
              href={SOCIAL_LINKS.rss}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="RSS Feed"
            >
              <Rss className="h-5 w-5" />
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {AUTHOR_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

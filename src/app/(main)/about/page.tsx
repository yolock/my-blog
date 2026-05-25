import type { Metadata } from "next";
import { AUTHOR_NAME, AUTHOR_BIO } from "@/lib/constants";
import { Mail } from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "@/components/ui/social-icons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "关于",
  description: `关于 ${AUTHOR_NAME}。`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="mb-12">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground">
          关于我
        </h1>
        <div className="space-y-5">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {AUTHOR_BIO}
          </p>
          <p className="text-muted-foreground">
            欢迎来到我的博客！在这里我会分享关于 Web 开发、软件架构以及构建优秀产品的思考。我相信简洁的代码、贴心的设计和持续学习的力量。
          </p>
          <p className="text-muted-foreground">
            不写代码的时候，我喜欢阅读、徒步、尝试新技术。我热爱开源软件，享受为社区做贡献。
          </p>
          <h2 className="text-xl font-semibold text-foreground mt-10">关于本站</h2>
          <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
            <li>现代 Web 技术的深度教程</li>
            <li>软件设计和架构的思考</li>
            <li>实际项目中的技巧与经验</li>
            <li>编程技艺的反思与感悟</li>
          </ul>
          <h2 className="text-xl font-semibold text-foreground mt-10">联系方式</h2>
          <p className="text-muted-foreground">
            很高兴与各位开发者交流。欢迎通过以下渠道联系我。
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
          邮箱
        </a>
      </div>
    </div>
  );
}

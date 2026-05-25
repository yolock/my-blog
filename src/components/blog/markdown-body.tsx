import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

interface MarkdownBodyProps {
  content: string;
}

const components: Components = {
  h1: ({ children, id, ...props }) => (
    <h1
      id={id}
      className="mt-10 mb-6 text-3xl font-bold tracking-tight text-foreground scroll-mt-20"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, id, ...props }) => (
    <h2
      id={id}
      className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-foreground scroll-mt-20"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, id, ...props }) => (
    <h3
      id={id}
      className="mt-8 mb-3 text-xl font-semibold text-foreground scroll-mt-20"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="my-5 leading-relaxed text-foreground" {...props}>
      {children}
    </p>
  ),
  a: ({ href = "", children, ...props }) => {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="font-medium text-accent underline underline-offset-4 hover:no-underline"
        {...props}
      >
        {children}
      </a>
    );
  },
  ul: ({ children, ...props }) => (
    <ul className="my-5 ml-6 list-disc space-y-2 text-foreground" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="my-5 ml-6 list-decimal space-y-2 text-foreground" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="pl-1" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-6 border-l-4 border-accent pl-5 italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
  img: ({ src, alt, ...props }: any) => (
    <img
      src={src}
      alt={alt || ""}
      className="my-8 w-full rounded-xl border border-border"
      loading="lazy"
      {...props}
    />
  ),
  pre: ({ children, ...props }: any) => (
    <pre
      className="overflow-x-auto rounded-xl border border-border bg-muted/50 p-4 text-sm leading-relaxed my-6"
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ children, className, ...props }: any) => {
    const isInline = !className?.includes("language-");
    if (isInline) {
      return (
        <code
          className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border border-border px-4 py-2 text-left font-semibold bg-muted"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border border-border px-4 py-2" {...props}>
      {children}
    </td>
  ),
  hr: (props) => <hr className="my-10 border-border" {...props} />,
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
};

export function MarkdownBody({ content }: MarkdownBodyProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}

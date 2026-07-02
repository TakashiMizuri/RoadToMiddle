import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import githubLight from "highlight.js/styles/github.css?url";
import githubDark from "highlight.js/styles/github-dark.css?url";

type MermaidModule = typeof import("mermaid");

function useIsDark() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

function useHighlightTheme(isDark: boolean) {
  useEffect(() => {
    const id = "hljs-theme";
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = isDark ? githubDark : githubLight;
  }, [isDark]);
}

function MermaidBlock({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const isDark = useIsDark();

  useEffect(() => {
    if (!ref.current) return;
    let cancelled = false;

    void (async () => {
      try {
        const mermaid = (await import("mermaid")).default as MermaidModule["default"];
        if (cancelled || !ref.current) return;

        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "neutral",
          securityLevel: "loose",
        });
        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      } catch (e) {
        if (!cancelled) setError(String(e));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, isDark]);

  if (error) {
    return (
      <pre className="overflow-x-auto rounded-xl border border-red-200 bg-red-50 p-4 text-xs dark:border-red-900 dark:bg-red-950/30">
        {chart}
      </pre>
    );
  }

  return <div ref={ref} className="my-6 flex justify-center overflow-x-auto rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950" />;
}

interface MarkdownViewProps {
  content: string;
  compact?: boolean;
}

export function MarkdownView({ content, compact = false }: MarkdownViewProps) {
  const isDark = useIsDark();
  useHighlightTheme(isDark);

  return (
    <article className={compact ? "lesson-markdown prose-sm" : "lesson-markdown"}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          a({ href, children, ...props }) {
            const external = href?.startsWith("http");
            return (
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer noopener" : undefined}
                {...props}
              >
                {children}
              </a>
            );
          },
          table({ children, ...props }) {
            return (
              <div className="my-6 overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
                <table {...props}>{children}</table>
              </div>
            );
          },
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className ?? "");
            const lang = match?.[1];
            const text = String(children).replace(/\n$/, "");
            if (lang === "mermaid") {
              return <MermaidBlock chart={text} />;
            }
            const inline = !className;
            if (inline) {
              return <code {...props}>{children}</code>;
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const DEFAULT_WIDTH = 288;
const MIN_WIDTH = 200;
const MAX_WIDTH = 560;
const STORAGE_KEY = "rtfm_lesson_sidebar_width";

function readStoredWidth(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_WIDTH;
    const value = Number.parseInt(raw, 10);
    if (Number.isFinite(value) && value >= MIN_WIDTH && value <= MAX_WIDTH) {
      return value;
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_WIDTH;
}

interface ResizableSidebarPanelProps {
  children: ReactNode;
  className?: string;
}

export function ResizableSidebarPanel({ children, className }: ResizableSidebarPanelProps) {
  const [width, setWidth] = useState(readStoredWidth);
  const [isResizing, setIsResizing] = useState(false);
  const widthRef = useRef(width);
  widthRef.current = width;

  const startResize = useCallback((clientX: number) => {
    setIsResizing(true);
    const startX = clientX;
    const startWidth = widthRef.current;

    const onMove = (e: MouseEvent) => {
      const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth + e.clientX - startX));
      setWidth(next);
    };

    const onUp = () => {
      setIsResizing(false);
      try {
        localStorage.setItem(STORAGE_KEY, String(widthRef.current));
      } catch {
        /* ignore */
      }
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, []);

  useEffect(() => {
    if (!isResizing) return;
    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing]);

  return (
    <div className={cn("flex h-full shrink-0", className)}>
      <div
        className={cn(
          "flex min-w-0 flex-col overflow-hidden bg-white dark:bg-neutral-950",
          !isResizing && "transition-[width] duration-200 ease-in-out",
        )}
        style={{ width }}
      >
        {children}
      </div>

      {/* Dedicated column so main content never covers the hit target. */}
      <div
        role="separator"
        aria-orientation="vertical"
        aria-valuenow={width}
        aria-valuemin={MIN_WIDTH}
        aria-valuemax={MAX_WIDTH}
        title="Drag to resize"
        onMouseDown={(e) => {
          e.preventDefault();
          startResize(e.clientX);
        }}
        onDoubleClick={() => {
          setWidth(DEFAULT_WIDTH);
          try {
            localStorage.setItem(STORAGE_KEY, String(DEFAULT_WIDTH));
          } catch {
            /* ignore */
          }
        }}
        className={cn(
          "w-1 shrink-0 cursor-col-resize touch-none border-r border-neutral-200/80 dark:border-neutral-800",
          "hover:bg-sky-500/15 active:bg-sky-500/25",
          isResizing && "bg-sky-500/25",
        )}
      />
    </div>
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "ghost" | "outline" | "destructive";
  size?: "default" | "sm" | "icon";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        variant === "default" &&
          "bg-neutral-900 text-neutral-50 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200",
        variant === "secondary" &&
          "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700",
        variant === "ghost" &&
          "hover:bg-neutral-100 dark:hover:bg-neutral-800",
        variant === "outline" &&
          "border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900",
        variant === "destructive" &&
          "bg-red-600 text-white hover:bg-red-700",
        "focus-visible:ring-offset-2",
        size === "default" && "h-9 px-4 py-2",
        size === "sm" && "h-8 px-3 text-xs",
        size === "icon" && "h-9 w-9",
        className,
      )}
      {...props}
    />
  );
}

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950",
        className,
      )}
      {...props}
    />
  );
}

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "success" | "warning" | "muted";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        variant === "default" && "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200",
        variant === "success" && "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
        variant === "warning" && "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
        variant === "muted" && "bg-neutral-50 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400",
        className,
      )}
      {...props}
    />
  );
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-9 w-full rounded-lg border border-neutral-200 bg-white px-3 py-1 text-sm transition-colors dark:border-neutral-700 dark:bg-neutral-950",
        "focus-visible:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500/20",
        className,
      )}
      {...props}
    />
  );
}

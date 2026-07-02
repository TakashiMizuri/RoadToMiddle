import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavTabItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface NavTabsProps {
  items: NavTabItem[];
  active: string;
  onChange: (id: string) => void;
}

export function NavTabs({ items, active, onChange }: NavTabsProps) {
  return (
    <nav
      className="flex items-center gap-0.5 rounded-lg bg-neutral-100 p-0.5 dark:bg-neutral-900"
      aria-label="Main navigation"
    >
      {items.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
            active === id
              ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-neutral-100"
              : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100",
          )}
        >
          <Icon className="h-3.5 w-3.5 shrink-0" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </nav>
  );
}

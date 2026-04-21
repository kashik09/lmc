import Link from "next/link";
import { sidebarCategories } from "@/content/news";

interface CategoriesWidgetProps {
  counts?: Record<string, number>;
}

export function CategoriesWidget({ counts = {} }: CategoriesWidgetProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-4 font-heading text-lg font-semibold text-card-foreground">
        {sidebarCategories.heading}
      </h3>
      <ul className="space-y-2">
        {sidebarCategories.categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/news?category=${category.slug}`}
              className="flex items-center justify-between text-sm text-foreground transition-colors hover:text-primary"
            >
              <span>{category.label}</span>
              {counts[category.slug] !== undefined && (
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {counts[category.slug]}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

/**
 * CategoriesWidget — Category links for blog sidebar
 *
 * Links to /news?category=<slug>. Highlights active category.
 * Honest counts — shows (0) until real posts exist.
 */

const categories = [
  { slug: "wellness", label: "Wellness", count: 0 },
  { slug: "community-health", label: "Community Health", count: 0 },
  { slug: "updates", label: "Centre Updates", count: 0 },
];

export default function CategoriesWidget() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  return (
    <div className="border border-lmc-borderLight bg-white p-6">
      <h4 className="mb-4 border-b-2 border-lmc-green pb-3 font-heading text-[13px] font-bold uppercase tracking-[0.14em] text-lmc-grayDark">
        Categories
      </h4>

      <ul className="space-y-0 divide-y divide-lmc-borderLight">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug;
          return (
            <li key={cat.slug}>
              <Link
                href={`/news?category=${cat.slug}`}
                className={`flex items-center justify-between py-3 text-[13px] transition-colors ${
                  isActive
                    ? "font-semibold text-lmc-green"
                    : "text-lmc-grayDark hover:text-lmc-green"
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-lmc-grayMedium">({cat.count})</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

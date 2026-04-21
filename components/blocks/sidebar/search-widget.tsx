"use client";
// CLIENT: Form input state and submission

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sidebarSearch } from "@/content/news";

export function SearchWidget() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/news?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={sidebarSearch.placeholder}
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            {sidebarSearch.buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";
// CLIENT: Form input state and submission

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sidebarSearch } from "@/content/news";
import { Button } from "@/components/ui/Button";

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
          <Button type="submit" size="sm">
            {sidebarSearch.buttonText}
          </Button>
        </div>
      </form>
    </div>
  );
}

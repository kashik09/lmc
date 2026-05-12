"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

/**
 * SearchWidget — Client component for news search
 *
 * Routes to /news?q=<query> on submit.
 * Actual filtering on /news page is a follow-up ticket.
 */

export default function SearchWidget() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) return;
    router.push(`/news?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div className="border border-lmc-grayLight bg-white p-5">
      <h3 className="mb-3 font-heading text-base font-semibold uppercase tracking-wide text-lmc-grayDark">
        Search
      </h3>
      <form onSubmit={handleSubmit} className="flex gap-0">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search articles..."
          className="flex-1 rounded-l-btn border border-lmc-grayLight px-3 py-2 font-body text-sm focus:border-lmc-green focus:outline-none"
          aria-label="Search articles"
        />
        <button
          type="submit"
          className="rounded-r-btn bg-lmc-green px-3 text-white transition-colors hover:bg-lmc-greenDark"
          aria-label="Submit search"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

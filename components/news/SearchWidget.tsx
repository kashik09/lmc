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
    <div className="border border-lmc-borderLight bg-white p-6">
      <h4 className="mb-4 border-b-2 border-lmc-green pb-3 font-heading text-[13px] font-bold uppercase tracking-[0.14em] text-lmc-grayDark">
        Search
      </h4>
      <form onSubmit={handleSubmit} className="flex gap-0">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search articles..."
          className="flex-1 border border-lmc-borderLight px-4 py-2.5 text-[14px] focus:border-lmc-green focus:outline-none"
          aria-label="Search articles"
        />
        <button
          type="submit"
          className="bg-lmc-green px-4 text-white transition-colors hover:bg-lmc-greenDark"
          aria-label="Submit search"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

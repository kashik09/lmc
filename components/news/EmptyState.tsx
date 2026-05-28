import Link from "next/link";
import { Newspaper, ArrowRight } from "lucide-react";

/**
 * EmptyState — Clean empty state for /news when no posts exist
 *
 * Honest messaging — no fake content.
 */

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* Icon */}
      <Newspaper className="mb-6 h-16 w-16 text-lmc-grayMedium" strokeWidth={1.5} />

      {/* Heading */}
      <h2 className="mb-3 font-heading text-[22px] font-bold uppercase tracking-[0.02em] text-lmc-grayDark">
        Articles coming soon
      </h2>

      {/* Subtext */}
      <p className="mb-6 max-w-md text-[15px] leading-[1.7] text-lmc-grayMedium">
        We're working on bringing you medical articles, community updates, and
        wellness tips. Check back soon — or follow us for updates.
      </p>

      {/* CTA */}
      <Link
        href="/contacts"
        className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-lmc-green transition-all hover:gap-3"
      >
        Contact Us
        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
      </Link>
    </div>
  );
}

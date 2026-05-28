import { Suspense } from "react";
import SearchWidget from "./SearchWidget";
import RecentPosts from "./RecentPosts";
import WidgetCard from "./widgets/WidgetCard";
import CategoriesWidget from "./widgets/CategoriesWidget";
import TextWidget from "./widgets/TextWidget";

/**
 * NewsSidebar — Assembled sidebar for /news page
 *
 * Widgets (per mockup, pruned for honesty):
 * 1. Promo card: Patient & Visitor Guide
 * 2. Search widget
 * 3. Recent Posts (from Supabase)
 * 4. Categories widget
 * 5. Text widget (About the Blog)
 * 6. Promo card: Book Appointment
 *
 * Skipped: Archives (no real data), Calendar (decoration only)
 */

export default function NewsSidebar() {
  return (
    <aside className="flex flex-col gap-6">
      {/* Promo: Patient & Visitor Guide */}
      <WidgetCard
        variant="blue"
        eyebrow="For Patients"
        heading="Patient & Visitor Guide"
        href="/visitors"
        buttonText="View Guide"
      />

      {/* Search */}
      <SearchWidget />

      {/* Recent Posts */}
      <Suspense
        fallback={
          <div className="border border-lmc-borderLight bg-white p-6">
            <div className="h-4 w-24 animate-pulse rounded bg-lmc-borderLight" />
          </div>
        }
      >
        <RecentPosts limit={4} />
      </Suspense>

      {/* Categories */}
      <Suspense fallback={null}>
        <CategoriesWidget />
      </Suspense>

      {/* About the Blog */}
      <TextWidget />

      {/* Promo: Book Appointment */}
      <WidgetCard
        variant="green"
        eyebrow="Need Care?"
        heading="Book an Appointment"
        href="/appointments"
        buttonText="Request Now"
      />
    </aside>
  );
}

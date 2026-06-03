import { Suspense } from "react";
import PageBanner from "@/components/layout/PageBanner";
import PostCard, { type Post } from "@/components/news/PostCard";
import NewsSidebar from "@/components/news/NewsSidebar";
import { createClient } from "@/lib/supabase/server";

/**
 * News Listing Page — Mockup-style layout
 *
 * Structure:
 * 1. Blue PageBanner (navy) with breadcrumbs
 * 2. 2-col grid: posts/empty-state (left) + sidebar widgets (right)
 *
 * Refs: docs/visual-rebuild/mockup-reference/news.html
 */

// Static fallback posts when Supabase has no data
const fallbackPosts: Post[] = [
  {
    id: "fallback-1",
    title: "New paediatric ward opens with expanded capacity",
    slug: "new-paediatric-ward-opens",
    excerpt:
      "Our new dedicated children's wing more than doubles inpatient capacity, with family-friendly rooms, a play area, and round-the-clock paediatric nursing — bringing specialist care closer to families across Gayaza.",
    featured_image: "/images/lmc/services/inpatient/hospital-ward.png",
    published_at: "2026-05-12",
    created_at: "2026-05-12",
    category: "Announcements",
  },
  {
    id: "fallback-2",
    title: "Free community health screening this Saturday",
    slug: "free-community-health-screening",
    excerpt:
      "Join us for free blood pressure, blood sugar and BMI checks — no appointment needed. Our team will be on-site all morning to answer your questions.",
    featured_image: "/images/lmc/about/community-outreach.jpg",
    published_at: "2026-04-28",
    created_at: "2026-04-28",
    category: "Community",
  },
  {
    id: "fallback-3",
    title: "Three new specialists join our cardiology team",
    slug: "new-specialists-join-team",
    excerpt:
      "We're growing our heart-care capabilities with three experienced cardiologists, expanding access to diagnostics and follow-up care for the region.",
    featured_image: "/images/lmc/services/general-medicine/doctors-team.jpg",
    published_at: "2026-04-14",
    created_at: "2026-04-14",
    category: "Our Team",
  },
  {
    id: "fallback-4",
    title: "Why you shouldn't wait until you're sick to see a doctor",
    slug: "preventive-checkups-importance",
    excerpt:
      "Preventive checkups catch issues early, when they're easiest to treat. Here's how regular visits keep you and your family healthier all year round.",
    featured_image: "/images/lmc/services/outpatient/consultation.jpg",
    published_at: "2026-04-02",
    created_at: "2026-04-02",
    category: "Health Tips",
  },
];

export const metadata = {
  title: "The Blog | Lifeline Medical Centre",
  description:
    "News, health tips, and updates from Lifeline Medical Centre in Gayaza.",
};

async function getPosts(): Promise<Post[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select(
        "id, title, slug, excerpt, featured_image, published_at, created_at"
      )
      .not("published_at", "is", null)
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
      return [];
    }

    return data ?? [];
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    return [];
  }
}

export default async function NewsPage() {
  const dbPosts = await getPosts();

  // Use fallback posts if database is empty
  const posts = dbPosts.length > 0 ? dbPosts : fallbackPosts;

  return (
    <>
      {/* Blue (navy) PageBanner */}
      <PageBanner
        variant="blue"
        title="The Blog"
        subtitle="Medical Articles & News"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "News" },
        ]}
      />

      {/* Page Body — 2-col grid */}
      <section className="bg-lmc-pageBg py-16 md:py-20">
        <div className="mx-auto max-w-container px-7">
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,1fr)_320px]">
            {/* LEFT — Posts */}
            <main>
              <div className="flex flex-col gap-10">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </main>

            {/* RIGHT — Sidebar */}
            <Suspense fallback={<div className="h-96 animate-pulse bg-lmc-borderLight" />}>
              <NewsSidebar />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}

import { Suspense } from "react";
import PageBanner from "@/components/layout/PageBanner";
import PostCard, { type Post } from "@/components/news/PostCard";
import EmptyState from "@/components/news/EmptyState";
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
  const posts = await getPosts();

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
            {/* LEFT — Posts or Empty State */}
            <main>
              {posts.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="flex flex-col gap-10">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
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

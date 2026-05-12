import { PageHeader } from "@/components/layout/PageHeader";
import {
  SearchWidget,
  RecentPostsWidget,
  CategoriesWidget,
  VisitorGuideWidget,
} from "@/components/blocks/sidebar";
import { newsEmptyState } from "@/content/news";

// TODO: Wire to Supabase posts table in Phase 5
async function getPosts() {
  return [];
}

async function getRecentPosts() {
  return [];
}

export default async function NewsPage() {
  const posts = await getPosts();
  const recentPosts = await getRecentPosts();

  return (
    <>
      <PageHeader title="The Blog" subtitle="Medical Articles & News" />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {posts.length === 0 ? (
                <div className="rounded-lg border border-border bg-card p-8 text-center">
                  <h2 className="mb-2 font-heading text-xl font-semibold text-card-foreground">
                    {newsEmptyState.heading}
                  </h2>
                  <p className="text-muted-foreground">
                    {newsEmptyState.message}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* TODO: Map over posts and render PostCard components */}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <SearchWidget />
              <RecentPostsWidget posts={recentPosts} />
              <CategoriesWidget />
              <VisitorGuideWidget />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { sanitizeHtml } from "@/lib/utils/sanitize";
import {
  SearchWidget,
  RecentPostsWidget,
  CategoriesWidget,
  VisitorGuideWidget,
} from "@/components/blocks/sidebar";
import { postDetailPage } from "@/content/news";

interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  category: string;
  published_at: string;
}

interface PostDetailPageProps {
  params: Promise<{ slug: string }>;
}

// TODO: Wire to Supabase posts table in Phase 5
async function getPost(slug: string): Promise<Post | null> {
  // Placeholder: return null until database is connected
  void slug;
  return null;
}

async function getRecentPosts() {
  return [];
}

export async function generateStaticParams() {
  // Return empty array until database is connected
  // Posts will be rendered on-demand via ISR
  return [];
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  const recentPosts = await getRecentPosts();

  if (!post) {
    notFound();
  }

  return (
    <>
      <PageHeader title={post.title} subtitle="Medical Articles & News" />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <article className="lg:col-span-2">
              <Link
                href={postDetailPage.backLink.href}
                className="mb-6 inline-block text-sm text-primary hover:underline"
              >
                {postDetailPage.backLink.text}
              </Link>

              {/* Post Meta */}
              <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
                <time>
                  {new Date(post.published_at).toLocaleDateString("en-UG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className="rounded-full bg-muted px-3 py-1 text-xs">
                  {post.category.replace("-", " ")}
                </span>
              </div>

              {/* Post Content */}
              <div className="prose prose-neutral max-w-none">
                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }} />
              </div>
            </article>

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

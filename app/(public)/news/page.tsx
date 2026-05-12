import Image from "next/image";
import Link from "next/link";
import { Calendar, Newspaper } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { createClient } from "@/lib/supabase/server";

/**
 * News Listing Page — Full grid of all published posts
 *
 * Fetches from Supabase posts table, renders card grid.
 * Empty state shown when no posts exist.
 */

export const metadata = {
  title: "News & Articles | Lifeline Medical Centre",
  description:
    "News, health tips, and updates from Lifeline Medical Centre in Kampala.",
};

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
  created_at: string;
};

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

function NewsCard({ post }: { post: Post }) {
  const displayDate = post.published_at ?? post.created_at;

  return (
    <Link
      href={`/news/${post.slug}`}
      className="group block border border-lmc-grayLight bg-white transition-shadow hover:shadow-cardHover"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-lmc-offWhite">
        {post.featured_image ? (
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lmc-grayMedium">
            <Newspaper className="h-12 w-12" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2 text-xs text-lmc-grayMedium">
          <Calendar className="h-3.5 w-3.5" />
          <time>{formatDate(displayDate)}</time>
        </div>
        <h3 className="mb-2 line-clamp-2 font-heading text-lg font-semibold text-lmc-grayDark transition-colors group-hover:text-lmc-green">
          {post.title}
        </h3>
        <p className="line-clamp-3 font-body text-sm text-lmc-grayMedium">
          {post.excerpt ?? ""}
        </p>
      </div>
    </Link>
  );
}

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
      <PageHeader title="The Blog" subtitle="Medical Articles & News" />

      <section className="bg-lmc-offWhite py-16 md:py-20">
        <div className="mx-auto max-w-container px-4">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-lmc-green">
              From Our Team
            </p>
            <h2 className="mb-4 font-heading text-3xl font-bold text-lmc-grayDark md:text-4xl">
              Articles & Updates
            </h2>
            <p className="mx-auto max-w-2xl font-body text-lmc-grayMedium">
              News, health tips, and updates from Lifeline Medical Centre.
            </p>
          </div>

          {/* Posts Grid or Empty State */}
          {posts.length === 0 ? (
            <div className="py-12 text-center">
              <Newspaper className="mx-auto mb-4 h-16 w-16 text-lmc-grayLight" />
              <p className="font-body text-lmc-grayMedium">
                No articles published yet. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {posts.map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

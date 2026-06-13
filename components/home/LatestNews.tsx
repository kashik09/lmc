import Image from "next/image";
import Link from "next/link";
import { Calendar, Newspaper } from "lucide-react";
import { createPublicClient } from "@/lib/supabase/public";
import { Button } from "@/components/ui/Button";

/**
 * LatestNews — Server component fetching 3 most recent posts from Supabase
 *
 * Graceful degradation: returns null if 0 posts, renders whatever we got if < 3
 */

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
      className="group block overflow-hidden rounded-card border border-lmc-grayLight bg-white shadow-soft transition-shadow hover:shadow-cardHover"
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

async function getLatestPosts(): Promise<Post[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, slug, excerpt, featured_image, published_at, created_at")
      .not("published_at", "is", null)
      .order("published_at", { ascending: false })
      .limit(3);

    if (error) {
      console.error("Error fetching latest posts:", error);
      return [];
    }

    return data ?? [];
  } catch (err) {
    console.error("Failed to fetch latest posts:", err);
    return [];
  }
}

export async function LatestNews() {
  const posts = await getLatestPosts();

  // Graceful degradation: render nothing if no posts
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-container px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-lmc-green">
            From the Blog
          </p>
          <h2 className="mb-4 font-heading text-3xl font-bold text-lmc-grayDark md:text-4xl">
            Latest News & Articles
          </h2>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10 text-center">
          <Button asChild href="/news" variant="secondary">
            View All News
          </Button>
        </div>
      </div>
    </section>
  );
}

export default LatestNews;

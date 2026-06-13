import Image from "next/image";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { createPublicClient } from "@/lib/supabase/public";

/**
 * RecentPosts — Server component for sidebar widget
 *
 * Fetches most recent published posts, optionally excluding current article.
 * Graceful empty/error handling.
 */

type RecentPostsProps = {
  excludeSlug?: string;
  limit?: number;
};

type Post = {
  id: string;
  slug: string;
  title: string;
  featured_image: string | null;
  published_at: string | null;
  created_at: string;
};

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateString));
}

async function getRecentPosts(
  excludeSlug?: string,
  limit: number = 5
): Promise<Post[]> {
  try {
    const supabase = createPublicClient();
    let query = supabase
      .from("posts")
      .select("id, slug, title, featured_image, published_at, created_at")
      .not("published_at", "is", null)
      .order("published_at", { ascending: false })
      .limit(limit + 1); // Fetch one extra in case we need to exclude

    if (excludeSlug) {
      query = query.neq("slug", excludeSlug);
    }

    const { data, error } = await query.limit(limit);

    if (error) {
      console.error("Error fetching recent posts:", error);
      return [];
    }

    return data ?? [];
  } catch (err) {
    console.error("Failed to fetch recent posts:", err);
    return [];
  }
}

export default async function RecentPosts({
  excludeSlug,
  limit = 5,
}: RecentPostsProps) {
  const posts = await getRecentPosts(excludeSlug, limit);

  return (
    <div className="border border-lmc-borderLight bg-white p-6">
      <h4 className="mb-4 border-b-2 border-lmc-green pb-3 font-heading text-[13px] font-bold uppercase tracking-[0.14em] text-lmc-grayDark">
        Recent Posts
      </h4>

      {posts.length === 0 ? (
        <p className="text-sm italic text-lmc-grayMedium">No recent posts.</p>
      ) : (
        <div>
          {posts.map((post) => {
            const displayDate = post.published_at ?? post.created_at;
            return (
              <Link
                key={post.id}
                href={`/news/${post.slug}`}
                className="group flex gap-3 border-b border-lmc-grayLight/50 py-3 last:border-b-0"
              >
                {post.featured_image ? (
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-lmc-offWhite">
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-lmc-offWhite">
                    <Newspaper className="h-6 w-6 text-lmc-grayLight" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="line-clamp-2 font-heading text-sm font-semibold leading-tight text-lmc-grayDark group-hover:text-lmc-green">
                    {post.title}
                  </h4>
                  <p className="mt-1 font-body text-xs text-lmc-grayMedium">
                    {formatDate(displayDate)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

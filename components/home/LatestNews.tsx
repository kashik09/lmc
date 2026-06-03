import Image from "next/image";
import Link from "next/link";
import { Calendar, Newspaper } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
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

// Static fallback articles when Supabase has no posts
const fallbackPosts: Post[] = [
  {
    id: "fallback-1",
    title: "New paediatric ward opens with expanded capacity",
    slug: "new-paediatric-ward-opens",
    excerpt:
      "Our new dedicated children's wing more than doubles inpatient capacity, with family-friendly rooms, a play area, and round-the-clock paediatric nursing.",
    featured_image: "/images/lmc/services/inpatient/hospital-ward.png",
    published_at: "2026-05-12",
    created_at: "2026-05-12",
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
  },
];

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

async function getLatestPosts(): Promise<Post[]> {
  try {
    const supabase = await createClient();
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
  const dbPosts = await getLatestPosts();

  // Use fallback posts if database is empty
  const posts = dbPosts.length > 0 ? dbPosts : fallbackPosts;

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

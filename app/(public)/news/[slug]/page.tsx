import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Tag } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import SearchWidget from "@/components/news/SearchWidget";
import RecentPosts from "@/components/news/RecentPosts";
import { createPublicClient } from "@/lib/supabase/public";
import { sanitizeHtml } from "@/lib/utils/sanitize";

/**
 * News Article Detail Page — 2-col layout with sticky sidebar
 *
 * Fetches single post from Supabase by slug.
 * Body rendered via sanitizeHtml (existing renderer).
 */

interface Post {
  id: string;
  slug: string;
  title: string;
  content: string | null;
  excerpt: string | null;
  featured_image: string | null;
  category: string | null;
  published_at: string | null;
  created_at: string;
}

interface PostDetailPageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("posts")
      .select(
        "id, slug, title, content, excerpt, featured_image, category, published_at, created_at"
      )
      .eq("slug", slug)
      .not("published_at", "is", null)
      .single();

    if (error) {
      console.error("Error fetching post:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Failed to fetch post:", err);
    return null;
  }
}

async function getAllPostSlugs(): Promise<string[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("posts")
      .select("slug")
      .not("published_at", "is", null);

    if (error) {
      console.error("Error fetching post slugs:", error);
      return [];
    }

    return data?.map((p) => p.slug) ?? [];
  } catch (err) {
    console.error("Failed to fetch post slugs:", err);
    return [];
  }
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const displayDate = post.published_at ?? post.created_at;

  return (
    <>
      <PageHeader title={post.title} subtitle="Medical Articles & News" />

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-container px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {/* Main Article — spans 2 cols */}
            <article className="lg:col-span-2">
              {/* Meta Row */}
              <div className="mb-6 flex flex-wrap items-center gap-4 border-b border-lmc-grayLight pb-6 text-sm text-lmc-grayMedium">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-lmc-green" />
                  <time>{formatDate(displayDate)}</time>
                </div>
                {post.category && (
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-lmc-green" />
                    <span>{post.category.replace("-", " ")}</span>
                  </div>
                )}
              </div>

              {/* Featured Image */}
              {post.featured_image && (
                <div className="relative mb-8 aspect-[16/9] overflow-hidden bg-lmc-offWhite">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Article Body */}
              {post.content && (
                <div
                  className="prose prose-lg max-w-none font-body text-lmc-grayDark prose-headings:font-heading prose-headings:text-lmc-grayDark prose-a:text-lmc-green prose-a:no-underline hover:prose-a:underline prose-strong:text-lmc-grayDark prose-img:my-6"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
                />
              )}

              {/* Bottom CTA */}
              <div className="mt-12 flex flex-col items-start justify-between gap-4 border-l-4 border-lmc-green bg-lmc-offWhite p-6 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-lmc-grayDark">
                    Have a question?
                  </h3>
                  <p className="font-body text-sm text-lmc-grayMedium">
                    Get in touch with our team for personalized advice.
                  </p>
                </div>
                <Button variant="primary" asChild href="/contacts">
                  Contact Us
                </Button>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="flex flex-col gap-6 lg:sticky lg:top-24">
                <SearchWidget />
                <RecentPosts excludeSlug={post.slug} limit={5} />

                {/* Appointment Teaser */}
                <div className="bg-lmc-green p-6 text-white">
                  <Calendar className="mb-3 h-10 w-10 text-white/90" />
                  <h3 className="mb-2 font-heading text-xl font-semibold">
                    Book an Appointment
                  </h3>
                  <p className="mb-4 font-body text-sm text-white/90">
                    Quick online booking — pick your date and time.
                  </p>
                  <Button
                    variant="primary"
                    asChild
                    href="/appointments"
                    className="w-full bg-white !text-lmc-green hover:bg-lmc-offWhite"
                  >
                    Request Appointment
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

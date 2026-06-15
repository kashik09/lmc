import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";

/**
 * PostCard — Mockup-style blog post card
 *
 * - 16/9 media area with gradient placeholder or image
 * - Meta row: date · category · read time
 * - Uppercase title (Raleway) with hover green
 * - Excerpt + read more link
 *
 * Refs: docs/visual-rebuild/mockup-reference/news.html .post
 */

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
  created_at: string | null;
  category?: string;
};

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

function estimateReadTime(excerpt: string | null): number {
  if (!excerpt) return 2;
  const words = excerpt.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function PostCard({ post }: { post: Post }) {
  const displayDate = post.published_at ?? post.created_at;
  const readTime = estimateReadTime(post.excerpt);

  return (
    <article className="group border border-lmc-borderLight bg-white">
      {/* Media area */}
      <Link href={`/news/${post.slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-lmc-green/20 to-lmc-blue/20">
          {post.featured_image ? (
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Newspaper className="h-16 w-16 text-lmc-grayMedium/50" />
            </div>
          )}
        </div>
      </Link>

      {/* Body */}
      <div className="p-7">
        {/* Meta row */}
        <div className="mb-3 flex flex-wrap items-center gap-x-2 text-[11px] uppercase tracking-[0.12em]">
          <span className="text-lmc-green">{formatDate(displayDate)}</span>
          {post.category && (
            <>
              <span className="text-lmc-grayMedium">·</span>
              <span className="text-lmc-grayMedium">In {post.category}</span>
            </>
          )}
          <span className="text-lmc-grayMedium">·</span>
          <span className="text-lmc-grayMedium">{readTime} min read</span>
        </div>

        {/* Title */}
        <Link href={`/news/${post.slug}`}>
          <h2 className="mb-3 font-heading text-[22px] font-bold uppercase leading-tight tracking-[0.01em] text-lmc-grayDark transition-colors group-hover:text-lmc-green">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="mb-5 line-clamp-3 text-[15px] leading-[1.7] text-[#555]">
            {post.excerpt}
          </p>
        )}

        {/* Read more */}
        <Link
          href={`/news/${post.slug}`}
          className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-lmc-green transition-all hover:gap-3"
          aria-label={`Read more about ${post.title}`}
        >
          Read More
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </Link>
      </div>
    </article>
  );
}

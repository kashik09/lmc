import Link from "next/link";
import { sidebarRecentPosts } from "@/content/news";

interface Post {
  id: string;
  slug: string;
  title: string;
  published_at: string;
}

interface RecentPostsWidgetProps {
  posts: Post[];
}

export function RecentPostsWidget({ posts }: RecentPostsWidgetProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-4 font-heading text-lg font-semibold text-card-foreground">
        {sidebarRecentPosts.heading}
      </h3>
      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {sidebarRecentPosts.emptyMessage}
        </p>
      ) : (
        <ul className="space-y-3">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/news/${post.slug}`}
                className="block text-sm text-foreground transition-colors hover:text-primary"
              >
                {post.title}
              </Link>
              <time className="text-xs text-muted-foreground">
                {new Date(post.published_at).toLocaleDateString("en-UG", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

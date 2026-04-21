import Link from "next/link";
import { PageHeader } from "@/components/blocks/page-header";
import { postDetailPage } from "@/content/news";

export default function PostNotFound() {
  return (
    <>
      <PageHeader title={postDetailPage.notFound.heading} />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="mb-6 text-muted-foreground">
            {postDetailPage.notFound.message}
          </p>
          <Link
            href="/news"
            className="inline-block rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            Back to News
          </Link>
        </div>
      </section>
    </>
  );
}

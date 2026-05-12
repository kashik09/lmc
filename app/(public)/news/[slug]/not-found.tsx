import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
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
          <Button asChild href="/news" size="lg">
            Back to News
          </Button>
        </div>
      </section>
    </>
  );
}

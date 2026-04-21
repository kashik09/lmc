import Link from "next/link";
import { sidebarVisitorGuide } from "@/content/news";

export function VisitorGuideWidget() {
  return (
    <div className="rounded-lg border border-border bg-primary p-4">
      <h3 className="mb-2 font-heading text-lg font-semibold text-primary-foreground">
        {sidebarVisitorGuide.heading}
      </h3>
      <p className="mb-4 text-sm text-primary-foreground/90">
        {sidebarVisitorGuide.description}
      </p>
      <Link
        href={sidebarVisitorGuide.buttonHref}
        className="inline-block rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        {sidebarVisitorGuide.buttonText}
      </Link>
    </div>
  );
}

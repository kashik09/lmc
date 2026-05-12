import { CircleCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import {
  thankYouContent,
  thankYouFallback,
  referenceNumberSection,
  type ThankYouType,
} from "@/content/thank-you";

type SearchParams = Promise<{ ref?: string; type?: string }>;

function isValidType(value: string | undefined): value is ThankYouType {
  return value === "appointment" || value === "inquiry";
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const ref = params.ref?.trim() || null;
  const content = isValidType(params.type)
    ? thankYouContent[params.type]
    : thankYouFallback;

  return (
    <>
      <PageHeader title={content.pageTitle} subtitle={content.pageSubtitle} />

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <div className="rounded-2xl border border-border bg-card p-8 text-center md:p-12">
            {/* Check icon */}
            <div className="mb-6 flex justify-center">
              <CircleCheck
                className="h-16 w-16 text-primary"
                strokeWidth={1.5}
                aria-hidden
              />
            </div>

            {/* Heading */}
            <h2 className="mb-3 font-heading text-3xl font-bold text-foreground md:text-4xl">
              {content.heading}
            </h2>

            {/* Body text */}
            <p className="mb-8 text-base text-muted-foreground md:text-lg">
              {content.body}
            </p>

            {/* Reference number panel - only if ref present */}
            {ref && (
              <div className="mb-8 rounded-lg border border-border bg-muted/50 p-6">
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  {referenceNumberSection.heading}
                </p>
                <p className="mb-3 font-mono text-2xl font-bold text-primary md:text-3xl">
                  {ref}
                </p>
                <p className="text-xs text-muted-foreground">
                  {referenceNumberSection.note}
                </p>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild href={content.primaryCta.href}>
                {content.primaryCta.label}
              </Button>
              <Button asChild href={content.secondaryCta.href} variant="secondary">
                {content.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

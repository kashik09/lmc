import Link from "next/link";
import {
  Cross,
  Radiation,
  FlaskConical,
  ScanLine,
  type LucideIcon,
} from "lucide-react";
import { featuredServiceSlugs } from "@/content/home";
import { servicesList } from "@/content/services";
import { Button } from "@/components/ui/Button";

const iconMap: Record<string, LucideIcon> = {
  dental: Cross,
  "x-ray": Radiation,
  laboratory: FlaskConical,
  "diagnostic-imaging": ScanLine,
};

// Inlined content (was in content/home.ts)
const sectionContent = {
  eyebrow: "WHAT WE OFFER",
  heading: "Our Featured Services",
  subheading: "Comprehensive care from a team you can trust.",
  ctaLabel: "View All Services",
  ctaHref: "/services",
};

export function FeaturedServices() {
  const featuredServices = featuredServiceSlugs
    .map((slug) => servicesList.find((s) => s.slug === slug))
    .filter(Boolean) as typeof servicesList;

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-primary">
            {sectionContent.eyebrow}
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">
            {sectionContent.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {sectionContent.subheading}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((service) => {
            const Icon = iconMap[service.slug];
            return (
              <div
                key={service.id}
                className="flex flex-col gap-3 rounded-lg border border-border bg-card p-6 transition-shadow hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex justify-center">
                  {Icon && (
                    <Icon className="h-12 w-12 text-primary" strokeWidth={1.5} />
                  )}
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {service.shortDescription}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-auto text-sm text-primary hover:underline"
                  aria-label={`Learn more about ${service.title}`}
                >
                  Learn more →
                </Link>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button asChild href={sectionContent.ctaHref} size="lg">
            {sectionContent.ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

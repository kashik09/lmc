import Link from "next/link";
import {
  MapPin,
  HelpCircle,
  FileText,
  ShieldCheck,
  Clock,
  Phone,
  Car,
  Navigation,
  Accessibility,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  infoCards,
  gettingHere,
  visitorsCta,
} from "@/content/visitors";

const iconMap = {
  MapPin,
  HelpCircle,
  FileText,
  ShieldCheck,
  Clock,
  Phone,
};

const gettingHereIcons = {
  parking: Car,
  location: Navigation,
  accessibility: Accessibility,
};

export default function VisitorsPage() {
  return (
    <>
      <PageHeader title="Visitors" subtitle="Information for visitors" />

      {/* Section 1 - Info Cards Grid */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {infoCards.map((card) => {
              const Icon = iconMap[card.icon as keyof typeof iconMap];
              const isExternal = card.href.startsWith("tel:");

              return (
                <Link
                  key={card.id}
                  href={card.href}
                  {...(isExternal ? {} : {})}
                  className="group rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-1 font-heading text-lg font-semibold text-card-foreground">
                    {card.heading}
                  </h3>
                  <p className="mb-3 text-sm text-muted-foreground">
                    {card.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {card.href === "#" ? "Coming soon" : "More"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2 - Getting Here */}
      <section className="bg-muted py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-foreground md:text-3xl">
            Getting Here
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {gettingHere.map((item) => {
              const Icon =
                gettingHereIcons[item.id as keyof typeof gettingHereIcons];
              return (
                <div
                  key={item.id}
                  className="rounded-lg border border-border bg-card p-6 text-center shadow-sm"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-semibold text-card-foreground">
                    {item.heading}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3 - CTA Band */}
      <section className="bg-primary py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 font-heading text-2xl font-bold text-primary-foreground md:text-3xl">
            {visitorsCta.heading}
          </h2>
          <p className="mb-6 text-primary-foreground/90">
            {visitorsCta.description}
          </p>
          <Link
            href={visitorsCta.buttonHref}
            className="inline-block rounded-md bg-background px-6 py-3 font-medium text-foreground transition-colors hover:bg-muted"
          >
            {visitorsCta.buttonText}
          </Link>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * ServicesSidebar — Reusable sidebar with services menu + appointment teaser
 *
 * Used on /services/[slug] detail pages, can be dropped onto /visitors, /pharmacy etc.
 * Sticky on lg+, stacks on mobile.
 */

type ServicesSidebarProps = {
  services: Array<{ slug: string; title: string }>;
  currentSlug?: string;
  menuTitle?: string;
  showAppointmentTeaser?: boolean;
};

export function ServicesSidebar({
  services,
  currentSlug,
  menuTitle,
  showAppointmentTeaser = true,
}: ServicesSidebarProps) {
  // Filter out current service if slug provided
  const displayServices = currentSlug
    ? services.filter((s) => s.slug !== currentSlug)
    : services;

  // Default title logic
  const title = menuTitle ?? (currentSlug ? "Other Services" : "All Services");

  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-24">
      {/* Services Menu */}
      <div className="border border-lmc-grayLight bg-white">
        <div className="bg-lmc-green px-5 py-3 text-white">
          <h3 className="font-heading text-base font-semibold uppercase tracking-wide">
            {title}
          </h3>
        </div>
        <nav className="p-2">
          {displayServices.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="flex items-center justify-between border-b border-lmc-grayLight/50 px-3 py-2.5 font-body text-sm text-lmc-grayDark transition-colors last:border-b-0 hover:bg-lmc-offWhite hover:text-lmc-green"
            >
              <span>{s.title}</span>
              <ChevronRight className="h-4 w-4 text-lmc-grayLight" />
            </Link>
          ))}
        </nav>
      </div>

      {/* Appointment Teaser */}
      {showAppointmentTeaser && (
        <div className="bg-lmc-green p-6 text-white">
          <Calendar className="mb-3 h-10 w-10 text-white/90" />
          <h3 className="mb-2 font-heading text-xl font-semibold">
            Book an Appointment
          </h3>
          <p className="mb-4 font-body text-sm text-white/90">
            Quick online booking — pick your date and time, we'll handle the
            rest.
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
      )}
    </div>
  );
}

export default ServicesSidebar;

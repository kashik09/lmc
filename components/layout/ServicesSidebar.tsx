import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

/**
 * ServicesSidebar — Lamogi-style sidebar for service detail pages
 *
 * Two cards stacked:
 * 1. All Services nav with partial green bar heading (Lamogi pattern)
 * 2. Navy form-card appointment CTA linking to /appointments
 *
 * Refs: Lamogi image 1 "ALL MODALITIES" sidebar
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
  menuTitle = "All Services",
  showAppointmentTeaser = true,
}: ServicesSidebarProps) {
  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-24">
      {/* Side Card — All Services nav (Lamogi pattern) */}
      <nav aria-label="All services" className="border border-lmc-borderLight bg-white p-6">
        {/* Heading with partial green bar */}
        <h3 className="mb-3 text-base font-bold uppercase tracking-wide text-lmc-grayDark">
          {menuTitle}
        </h3>
        <div className="mb-4 h-[2px] w-full bg-lmc-green/20">
          <div className="h-full w-[60px] bg-lmc-green" aria-hidden="true" />
        </div>

        {/* Services list — current one highlighted green, ChevronRight arrows */}
        <ul className="divide-y divide-lmc-borderMedium">
          {services.map((s) => {
            const isActive = s.slug === currentSlug;
            return (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className={[
                    "flex items-center justify-between py-3 text-sm font-bold uppercase tracking-wide transition-colors",
                    isActive
                      ? "text-lmc-green"
                      : "text-lmc-grayDark hover:text-lmc-green",
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{s.title}</span>
                  <ChevronRight
                    className={[
                      "h-4 w-4",
                      isActive ? "text-lmc-green" : "text-lmc-grayMedium",
                    ].join(" ")}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Form Card — Navy appointment CTA */}
      {showAppointmentTeaser && (
        <div className="bg-lmc-blue p-9 text-white">
          <h3 className="mb-1 font-heading text-[22px] font-bold uppercase tracking-[0.02em]">
            Request an Appointment
          </h3>
          <p className="mb-6 text-[12px] uppercase tracking-[0.14em] opacity-70">
            Fill in the form — we&apos;ll confirm by phone
          </p>

          <p className="mb-6 text-[14.5px] leading-[1.7] opacity-85">
            Book your visit online and our patient services team will confirm
            your slot within the hour during operating times.
          </p>

          <Link
            href="/appointments"
            className="inline-flex w-full items-center justify-center gap-2.5 bg-lmc-green px-6 py-3.5 text-[12.5px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-lmc-greenDark"
          >
            Request Now
            <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
          </Link>
        </div>
      )}
    </div>
  );
}

export default ServicesSidebar;

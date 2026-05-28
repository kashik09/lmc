import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * ServicesSidebar — Mockup-style sidebar for service detail pages
 *
 * Two cards stacked:
 * 1. All Services nav with green underline h4 (not filled bar)
 * 2. Navy form-card appointment CTA linking to /appointments
 *
 * Refs: docs/visual-rebuild/00-mockup-spec.md, mockup-reference/service-detail.html
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
      {/* Side Card — All Services nav */}
      <div className="border border-lmc-borderLight bg-white p-6">
        {/* h4 with green underline (not filled bar) */}
        <h4 className="mb-4 border-b-2 border-lmc-green pb-3 font-heading text-[20px] font-bold uppercase tracking-[0.04em] text-lmc-grayDark">
          {menuTitle}
        </h4>

        {/* Services list — current one highlighted green */}
        <nav>
          <ul className="divide-y divide-lmc-borderLight">
            {services.map((s) => {
              const isActive = s.slug === currentSlug;
              return (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className={`flex items-center justify-between py-3 text-[13px] font-semibold uppercase tracking-[0.06em] transition-colors ${
                      isActive
                        ? "text-lmc-green"
                        : "text-[#444] hover:text-lmc-green"
                    }`}
                  >
                    <span>{s.title}</span>
                    <span className="font-bold text-lmc-green">›</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Form Card — Navy appointment CTA */}
      {showAppointmentTeaser && (
        <div className="bg-lmc-blue p-9 text-white">
          <h3 className="mb-1 font-heading text-[22px] font-bold uppercase tracking-[0.02em]">
            Request an Appointment
          </h3>
          <p className="mb-6 text-[12px] uppercase tracking-[0.14em] opacity-70">
            Fill in the form — we'll confirm by phone
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

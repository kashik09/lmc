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
  Users,
} from "lucide-react";
import PageBanner from "@/components/layout/PageBanner";
import { ServicesSidebar } from "@/components/layout/ServicesSidebar";
import { Button } from "@/components/ui/Button";
import { servicesList } from "@/content/services";
import { infoCards, gettingHere, visitorsCta } from "@/content/visitors";

/**
 * Visitors Page — 2-col layout with ServicesSidebar
 *
 * Preserves existing content from content/visitors.ts
 */

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

// Info strip items for quick visitor reference
// Note: visitor count (2 per patient) confirmed from backup.lmc.co.ug
// TODO 7.2: confirm opening hours with client (backup did not specify)
const infoStrip = [
  { icon: Clock, label: "Opening Hours", value: "24 hours, 7 days a week" },
  { icon: Users, label: "Per Patient", value: "Max 2 visitors at a time" },
  {
    icon: ShieldCheck,
    label: "Health & Safety",
    value: "Follow posted guidelines",
  },
];

export default function VisitorsPage() {
  return (
    <>
      <PageBanner
        title="Visitors"
        subtitle="Information for patients and visitors"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Patients" },
          { label: "Visitors" },
        ]}
      />

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-container px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {/* Main Content — spans 2 cols */}
            <article className="lg:col-span-2">
              {/* Intro */}
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-lmc-green">
                For Our Visitors
              </p>
              <h2 className="mb-6 font-heading text-3xl font-bold text-lmc-grayDark md:text-4xl">
                Information for Visitors
              </h2>

              {/* Content */}
              <div className="space-y-4 text-base leading-relaxed text-lmc-grayMedium">
                <p>
                  We welcome visitors and care givers. However, we are required
                  to observe certain restrictions for the comfort of our patients,
                  <br />
                  infection control and to allow the medical team to carry out
                  their rounds and procedures.
                </p>

                <h3 className="font-heading text-xl font-bold text-lmc-grayDark">
                  Visitor Guidelines
                </h3>
                <p>
                  For the comfort and safety of our patients, we ask all
                  visitors to observe these guidelines:
                </p>
                <ul className="list-disc space-y-1.5 pl-6 marker:text-lmc-green">
                  <li>The ward allows only 2 visitors at a time per patient.</li>
                  <li>
                    To reduce the risk of infection, children under the age of
                    16 years are not allowed in the wards.
                    <br />
                    We also encourage all visitors to apply hand gel/alcohol rub
                    prior to and on leaving the ward.
                    <br />
                    These are located at the entrance to the ward.
                  </li>
                  <li>
                    Smoking, use of illicit drugs and alcohol are not permitted
                    in the Hospital premises.
                  </li>
                  <li>Filming and photography are not permitted on the ward.</li>
                  <li>
                    The Hospital will not tolerate any form of verbal or
                    physical abuse to staff or damage to hospital property.
                  </li>
                </ul>
              </div>

              {/* Info Strip */}
              <div className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {infoStrip.map((item) => (
                  <div
                    key={item.label}
                    className="border-l-4 border-lmc-green bg-lmc-offWhite p-5"
                  >
                    <item.icon className="mb-2 h-7 w-7 text-lmc-green" />
                    <p className="font-heading text-sm font-semibold uppercase tracking-wide text-lmc-grayDark">
                      {item.label}
                    </p>
                    <p className="mt-1 font-body text-sm text-lmc-grayMedium">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Info Cards Grid */}
              <div className="mb-10 grid gap-4 sm:grid-cols-2">
                {infoCards.map((card) => {
                  const Icon = iconMap[card.icon as keyof typeof iconMap];
                  const isDisabled = card.href === "#";

                  return (
                    <Link
                      key={card.id}
                      href={card.href}
                      className={`group flex items-start gap-4 border border-lmc-grayLight bg-white p-5 transition-all hover:shadow-cardHover ${isDisabled ? "pointer-events-none opacity-60" : ""}`}
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-lmc-green/10 text-lmc-green transition-colors group-hover:bg-lmc-green group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-semibold text-lmc-grayDark group-hover:text-lmc-green">
                          {card.heading}
                        </h3>
                        <p className="mt-1 font-body text-sm text-lmc-grayMedium">
                          {card.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Getting Here Section */}
              <div className="mb-10">
                <h3 className="mb-6 font-heading text-2xl font-bold text-lmc-grayDark">
                  Getting Here
                </h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  {gettingHere.map((item) => {
                    const Icon =
                      gettingHereIcons[item.id as keyof typeof gettingHereIcons];
                    return (
                      <div
                        key={item.id}
                        className="border border-lmc-grayLight bg-lmc-offWhite p-5 text-center"
                      >
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center bg-lmc-green/10 text-lmc-green">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h4 className="font-heading text-base font-semibold text-lmc-grayDark">
                          {item.heading}
                        </h4>
                        <p className="mt-1 font-body text-sm text-lmc-grayMedium">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-10 flex flex-col items-start justify-between gap-4 border-l-4 border-lmc-green bg-lmc-offWhite p-6 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-lmc-grayDark">
                    {visitorsCta.heading}
                  </h3>
                  <p className="font-body text-sm text-lmc-grayMedium">
                    {visitorsCta.description}
                  </p>
                </div>
                <Button variant="primary" asChild href={visitorsCta.buttonHref}>
                  {visitorsCta.buttonText}
                </Button>
              </div>
            </article>

            {/* Sidebar — "All Services" mode (no currentSlug) */}
            <aside className="lg:col-span-1">
              <ServicesSidebar services={servicesList} />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

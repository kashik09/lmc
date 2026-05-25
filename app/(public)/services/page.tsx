import Link from "next/link";
import {
  Smile,
  ScanLine,
  FlaskConical,
  Stethoscope,
  Syringe,
  BedDouble,
  Activity,
  Radiation,
  Ambulance,
  Pill,
  Baby,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/content/services";

/**
 * Services Listing Page — 12-card grid with light card style
 *
 * Uses typed services from content/services/index.ts
 * Light cards (white bg) to avoid visual overload
 */

interface ServiceCardData {
  slug: string;
  title: string;
  shortDescription: string;
}

const iconMap: Record<string, LucideIcon> = {
  dental: Smile,
  "x-ray": ScanLine,
  laboratory: FlaskConical,
  theatre: Activity,
  radiology: Radiation,
  antenatal: Baby,
  inpatient: BedDouble,
  outpatient: Stethoscope,
  "general-medicine": Stethoscope,
  immunisation: Syringe,
  ambulance: Ambulance,
  pharmacy: Pill,
};

function ServiceCard({ service }: { service: ServiceCardData }) {
  const Icon = iconMap[service.slug] ?? Stethoscope;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col gap-4 border border-lmc-grayLight bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-cardHover"
    >
      {/* Icon Tile */}
      <div className="flex h-14 w-14 items-center justify-center bg-lmc-green/10">
        <Icon className="h-7 w-7 text-lmc-green" />
      </div>

      {/* Title */}
      <h3 className="font-heading text-xl font-semibold text-lmc-grayDark transition-colors group-hover:text-lmc-green">
        {service.title}
      </h3>

      {/* Description */}
      <p className="line-clamp-3 flex-1 font-body text-sm text-lmc-grayMedium">
        {service.shortDescription}
      </p>

      {/* Learn More Link */}
      <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-lmc-green transition-all group-hover:gap-3">
        Learn More <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

export default function ServicesPage() {
  // Map ServicePage to card display shape
  const serviceCards: ServiceCardData[] = Object.values(services).map((s) => ({
    slug: s.slug,
    title: s.title,
    shortDescription: s.lede ?? "Quality healthcare services.",
  }));

  return (
    <>
      <PageHeader title="Our Services" subtitle="Comprehensive medical care" />

      <Reveal as="section" className="bg-lmc-offWhite py-16 md:py-20">
        <div className="mx-auto max-w-container px-4">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-lmc-green">
              What We Offer
            </p>
            <h2 className="mb-4 font-heading text-3xl font-bold text-lmc-grayDark md:text-4xl">
              Our Medical Specialties
            </h2>
            <p className="mx-auto max-w-2xl font-body text-lmc-grayMedium">
              From routine check-ups to specialist consultations, Lifeline
              Medical Centre offers a full range of services to support your
              health journey.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {serviceCards.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </Reveal>
    </>
  );
}

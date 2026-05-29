import Link from "next/link";
import { ArrowRight, Scan, Smile, FlaskConical } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";

/**
 * MedicalDepartments — 3 featured split-cards + sidebar (B3 Lamogi redesign)
 *
 * Dark navy section with:
 * - Centered section heading (eyebrow + title + accent bar)
 * - 3 featured split-cards on left (icon top / info bottom)
 * - "Why Lifeline" sidebar text block on right
 *
 * Refs: Lamogi image 4, adapted to LMC brand colors
 */

type FeaturedService = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const FEATURED: FeaturedService[] = [
  {
    slug: "x-ray",
    title: "X-Ray",
    description: "Digital imaging with rapid turnaround.",
    icon: Scan,
  },
  {
    slug: "dental",
    title: "Dental",
    description: "Routine cleanings, fillings, extractions.",
    icon: Smile,
  },
  {
    slug: "laboratory",
    title: "Laboratory",
    description: "Haematology, biochem, microbiology.",
    icon: FlaskConical,
  },
];

export default function MedicalDepartments() {
  return (
    <section className="bg-lmc-blue py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading — centered, dark theme */}
        <SectionHeading
          theme="dark"
          align="center"
          eyebrow="Medical Departments"
          title="Our Services"
        />

        <div className="mt-12 grid gap-10 md:gap-12 lg:grid-cols-[2fr_1fr] lg:items-start">
          {/* LEFT: 3 featured split-cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {FEATURED.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group block overflow-hidden bg-[#233a58] transition-transform hover:-translate-y-1"
                >
                  {/* TOP: green block with centered icon */}
                  <div className="flex items-center justify-center bg-lmc-green py-12">
                    <Icon className="h-12 w-12 text-white" strokeWidth={1.5} />
                  </div>
                  {/* BOTTOM: navy block with title + description + read more */}
                  <div className="px-5 py-6">
                    <h3 className="text-base font-bold uppercase tracking-wide text-white">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/75">
                      {service.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#75d69c] transition-all group-hover:gap-2">
                      Read More
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* RIGHT: Why Lifeline sidebar text block */}
          <div className="lg:pl-4">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#75d69c]">
              Why Lifeline
            </p>
            <h3 className="text-2xl font-bold text-white md:text-3xl">
              Quality care for every family.
            </h3>
            <div
              className="mb-4 mt-4 h-[3px] w-[60px] bg-[#75d69c]"
              aria-hidden="true"
            />
            <p className="text-base leading-relaxed text-white/85">
              Comprehensive primary care, diagnostics, and specialist services
              in Gayaza — delivered with warmth and clinical rigour for every
              patient who walks through our doors.
            </p>
            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 bg-lmc-green px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-lmc-greenDark"
            >
              All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

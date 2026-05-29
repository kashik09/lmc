import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";
import { heroImages } from "@/content/lmc-images";

/**
 * MedicalDepartments — Department cards row on dark navy background
 *
 * 3 featured services with real LMC photos + title + description + link.
 * Per mockup: X-Ray, Dental, Laboratory on left (2fr) with sidebar on right (1fr).
 * Simplified: just header + 3 cards for now.
 *
 * Refs: docs/visual-rebuild/mockup-reference/{index.html,styles.css}
 */

const FEATURED_DEPT_SLUGS = ["x-ray", "dental", "laboratory"] as const;

// Use heroImages starting at index 3 to avoid reusing home hero images
const cardImages: Record<string, { src: string; width: number; height: number }> = {
  "x-ray": heroImages[3] ?? { src: "/images/lmc/13.jpg", width: 868, height: 664 },
  dental: heroImages[4] ?? { src: "/images/lmc/14.jpg", width: 1007, height: 658 },
  laboratory: heroImages[5] ?? { src: "/images/lmc/15.jpg", width: 1462, height: 541 },
};

export default function MedicalDepartments() {
  return (
    <section className="bg-lmc-blue py-20 md:py-24 text-white">
      <div className="mx-auto max-w-container px-7">
        {/* Section Header — centered, on-dark styling */}
        <div className="mb-12 text-center">
          <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-lmc-greenLight">
            Medical Departments
          </div>
          <h2 className="font-heading text-[32px] font-bold leading-tight tracking-tight md:text-[36px]">
            Our Services
          </h2>
          {/* Decorative dot */}
          <div className="mx-auto mt-4 flex items-center justify-center gap-2">
            <div className="h-[2px] w-8 bg-white/30" />
            <div className="h-2 w-2 rounded-full bg-lmc-green" />
            <div className="h-[2px] w-8 bg-white/30" />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {FEATURED_DEPT_SLUGS.map((slug) => {
            const service = services[slug];
            const image = cardImages[slug];

            return (
              <article
                key={slug}
                className="group overflow-hidden border border-white/[0.08] bg-white/[0.04] transition-all duration-200 hover:-translate-y-1 hover:border-lmc-green"
              >
                {/* Photo with dark gradient overlay */}
                <div className="relative h-[150px] overflow-hidden bg-lmc-blue">
                  {image && (
                    <Image
                      src={image.src}
                      alt={`${service.title} at Lifeline Medical Centre`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  {/* Dark gradient overlay for text contrast on card body */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Card body */}
                <div className="p-6">
                  <h3 className="mb-3 font-heading text-[22px] font-bold uppercase tracking-[0.04em]">
                    {service.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 text-[13px] leading-[1.65] text-white/75">
                    {service.lede ?? "Quality healthcare services."}
                  </p>
                  <Link
                    href={`/services/${slug}`}
                    className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.16em] text-lmc-greenLight transition-all hover:text-white group-hover:gap-3"
                  >
                    Read More
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* All Services CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-lmc-green px-6 py-3 text-[13px] font-bold uppercase tracking-[0.08em] text-white transition-all hover:gap-3 hover:bg-lmc-greenDark"
          >
            All Our Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

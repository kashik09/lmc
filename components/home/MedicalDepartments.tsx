import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { serviceImages } from "@/content/lmc-images";

/**
 * MedicalDepartments — 3 featured service cards + sidebar
 *
 * Dark navy section with:
 * - Centered section heading (eyebrow + title + accent bar)
 * - 3 featured cards with real service images
 * - "Quality Healthcare" sidebar text block on right
 */

type FeaturedService = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

const FEATURED: FeaturedService[] = [
  {
    slug: "x-ray",
    title: "X-Ray",
    description: "Our radiologists use X-rays in low doses to produce images that help to diagnose and detect bone fractures and breaks, lung problems, tumours and other medical conditions.",
    image: serviceImages["x-ray"][0].src,
  },
  {
    slug: "dental",
    title: "Dental",
    description: "At LMC, we provide comprehensive and fine dental services to our dear clients. Our team is comprised of highly skilled dental specialists who are committed in their practice.",
    image: serviceImages.dental[0].src,
  },
  {
    slug: "laboratory",
    title: "Lab",
    description: "LMC over the years has provided high quality service delivery with a wide range of laboratory investigations for our patients. We perform tests for diagnostic and therapeutic evaluations.",
    image: serviceImages.laboratory[0].src,
  },
];

export default function MedicalDepartments() {
  return (
    <section className="bg-lmc-blue py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <SectionHeading
          theme="dark"
          align="left"
          eyebrow="The Backbone of our Clinic"
          title="Our Services"
        />

        <div className="mt-12 grid gap-10 md:gap-12 lg:grid-cols-[2fr_1fr] lg:items-start">
          {/* LEFT: 3 featured cards with images */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {FEATURED.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block overflow-hidden rounded-card bg-[#233a58] transition-transform hover:-translate-y-1"
              >
                {/* TOP: Service image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 640px) 33vw, 100vw"
                  />
                </div>
                {/* BOTTOM: navy block with title + description */}
                <div className="px-5 py-6 text-center">
                  <h3 className="text-base font-bold uppercase tracking-wide text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    {service.description}
                  </p>
                  {/* Accent bar */}
                  <div className="mx-auto mt-4 h-[3px] w-12 bg-lmc-green" />
                </div>
              </Link>
            ))}
          </div>

          {/* RIGHT: Quality Healthcare sidebar */}
          <div className="lg:pl-4">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              Quality Healthcare
            </p>
            <div
              className="mb-4 h-[2px] w-[60px] bg-white/40"
              aria-hidden="true"
            />
            <p className="text-base leading-relaxed text-white/85">
              LMC is built on respect and powered by empathy to give back to the community. We value the fact that we were born and raise in a community and the initiative to establish the medical center is not only to give back to the community but to offer the best services including exceptional care to our community in Gayaza and the surrounding. LMC offers both inpatient and outpatient services.
            </p>
            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 rounded-btn bg-lmc-green px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-lmc-greenDark"
            >
              <Users className="h-4 w-4" />
              All Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

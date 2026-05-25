import Link from "next/link";
import { Activity, Radiation, Baby, ArrowRight, type LucideIcon } from "lucide-react";
import { services } from "@/content/services";

/**
 * FeaturedServices — 3-column teaser row for home page
 *
 * Alternating colored backgrounds: green / greenDark / blue
 * Hover effect: lift + shadow
 * Derives data from typed content/services system
 */

const FEATURED_SLUGS = ["theatre", "radiology", "antenatal"] as const;

const iconMap: Record<string, LucideIcon> = {
  theatre: Activity,
  radiology: Radiation,
  antenatal: Baby,
};

const bgClasses: Record<string, string> = {
  theatre: "bg-lmc-green",
  radiology: "bg-lmc-greenDark",
  antenatal: "bg-lmc-blue",
};

interface TeaserCardProps {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  bgClass: string;
}

function TeaserCard({ slug, title, description, icon: Icon, bgClass }: TeaserCardProps) {
  return (
    <div
      className={`group flex flex-col items-start gap-4 p-8 text-white transition-transform hover:-translate-y-1 hover:shadow-cardHover ${bgClass}`}
    >
      <Icon className="h-12 w-12 text-white/90" />
      <h3 className="font-heading text-2xl font-semibold">{title}</h3>
      <p className="flex-1 font-body text-sm leading-relaxed text-white/90">
        {description}
      </p>
      <Link
        href={`/services/${slug}`}
        className="mt-2 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide transition-all group-hover:gap-3"
      >
        Learn More <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export function FeaturedServices() {
  return (
    <section className="bg-lmc-offWhite py-16 md:py-20">
      <div className="mx-auto max-w-container px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-lmc-green">
            What We Do
          </p>
          <h2 className="mb-4 font-heading text-3xl font-bold text-lmc-grayDark md:text-4xl">
            Featured Services
          </h2>
          <p className="mx-auto max-w-2xl font-body text-lmc-grayMedium">
            A snapshot of the medical specialties at Lifeline. Explore our full
            range of services to find the right care for you.
          </p>
        </div>

        {/* Teaser Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {FEATURED_SLUGS.map((slug) => {
            const service = services[slug];
            return (
              <TeaserCard
                key={slug}
                slug={slug}
                title={service.title}
                description={service.lede ?? "Quality healthcare services."}
                icon={iconMap[slug]}
                bgClass={bgClasses[slug]}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturedServices;

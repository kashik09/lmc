import Link from "next/link";
import { HeartPulse, ScanLine, Baby, ArrowRight, type LucideIcon } from "lucide-react";

/**
 * FeaturedServices — 3-column teaser row for home page
 *
 * Alternating colored backgrounds: green / greenDark / blue
 * Hover effect: lift + shadow
 * Hardcoded service data (Supabase wiring is a follow-up)
 */

type ServiceItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  bgClass: string;
};

const featured: ServiceItem[] = [
  {
    title: "Cardiology",
    description:
      "Expert heart care with modern diagnostic tools and experienced specialists.",
    icon: HeartPulse,
    href: "/services/cardiology",
    bgClass: "bg-lmc-green",
  },
  {
    title: "Diagnostic Imaging",
    description:
      "X-Ray, ultrasound and advanced imaging services with rapid turnaround.",
    icon: ScanLine,
    href: "/services/diagnostic-imaging",
    bgClass: "bg-lmc-greenDark",
  },
  {
    title: "Pediatrics",
    description:
      "Compassionate care for infants, children and adolescents from our specialist team.",
    icon: Baby,
    href: "/services/pediatrics",
    bgClass: "bg-lmc-blue",
  },
];

function TeaserCard({ title, description, icon: Icon, href, bgClass }: ServiceItem) {
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
        href={href}
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
          {featured.map((service) => (
            <TeaserCard key={service.href} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedServices;

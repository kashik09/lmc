import Link from "next/link";
import Image from "next/image";
import PageBanner from "@/components/layout/PageBanner";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/content/services";

/**
 * Services Listing Page — clean image grid matching backup.lmc.co.ug
 */

interface ServiceCardData {
  slug: string;
  title: string;
  image: string;
}

const imageMap: Record<string, string> = {
  theatre: "/images/lmc/services/backup/theatre.jpg",
  laboratory: "/images/lmc/services/backup/laboratory.jpg",
  dental: "/images/lmc/services/backup/dental.jpg",
  "x-ray": "/images/lmc/services/backup/x-ray.jpg",
  radiology: "/images/lmc/services/backup/radiology.jpg",
  antenatal: "/images/lmc/services/backup/general-medicine.jpg",
  inpatient: "/images/lmc/services/inpatient/hospital-ward.png",
  outpatient: "/images/lmc/services/outpatient/consultation.jpg",
  "general-medicine": "/images/lmc/services/backup/general-medicine.jpg",
  immunisation: "/images/lmc/services/backup/immunisation.jpg",
  ambulance: "/images/lmc/services/backup/ambulance.jpg",
  pharmacy: "/images/lmc/services/backup/pharmacy.jpg",
};

function ServiceCard({ service }: { service: ServiceCardData }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col overflow-hidden bg-white transition-all hover:-translate-y-1 hover:shadow-cardHover"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-lmc-offWhite">
        <Image
          src={service.image}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Title + Green Bar */}
      <div className="flex flex-col items-center py-5">
        <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-lmc-grayDark">
          {service.title}
        </h3>
        <div className="h-[3px] w-12 bg-lmc-green" />
      </div>
    </Link>
  );
}

export default function ServicesPage() {
  const serviceCards: ServiceCardData[] = Object.values(services).map((s) => ({
    slug: s.slug,
    title: s.title,
    image: imageMap[s.slug] ?? "/images/lmc/services/general-medicine/doctor-with-clipboard.png",
  }));

  return (
    <>
      <PageBanner
        title="Our Services"
        subtitle="Comprehensive medical care"
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <Reveal as="section" className="bg-lmc-offWhite py-20 md:py-28">
        <div className="mx-auto max-w-container px-6 md:px-12 lg:px-20">
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

          {/* Service Cards Grid — 4 columns */}
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {serviceCards.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </Reveal>
    </>
  );
}

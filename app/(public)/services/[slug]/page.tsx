import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { ServiceDetailBody } from "@/components/blocks/service-detail-body";
import { serviceDetails, servicesList } from "@/content/services";

export function generateStaticParams() {
  return servicesList.map((s) => ({ slug: s.slug }));
}

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = serviceDetails[slug];

  if (!service) {
    notFound();
  }

  // Filter out current service from sidebar list
  const otherServices = servicesList.filter((s) => s.slug !== slug);

  return (
    <>
      <PageHeader title={service.title} subtitle="Our Services" />

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-container px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {/* Main Content — spans 2 cols */}
            <article className="lg:col-span-2">
              {/* Featured Image */}
              {service.image && (
                <div className="relative mb-8 aspect-[16/9] overflow-hidden bg-lmc-offWhite">
                  <Image
                    src={service.image}
                    alt={`${service.title} services at Lifeline Medical Centre`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Body Content */}
              <ServiceDetailBody slug={slug} />

              {/* Bottom CTA */}
              <div className="mt-10 flex flex-col items-start justify-between gap-4 border-l-4 border-lmc-green bg-lmc-offWhite p-6 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-lmc-grayDark">
                    Ready to book this service?
                  </h3>
                  <p className="font-body text-sm text-lmc-grayMedium">
                    Reserve your appointment in a few clicks.
                  </p>
                </div>
                <Button variant="primary" asChild href="/appointments">
                  Book Appointment
                </Button>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="flex flex-col gap-6 lg:sticky lg:top-24">
                {/* Other Services Menu */}
                <div className="border border-lmc-grayLight bg-white">
                  <div className="bg-lmc-green px-5 py-3 text-white">
                    <h3 className="font-heading text-base font-semibold uppercase tracking-wide">
                      Other Services
                    </h3>
                  </div>
                  <nav className="p-2">
                    {otherServices.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="flex items-center justify-between border-b border-lmc-grayLight/50 px-3 py-2.5 font-body text-sm text-lmc-grayDark transition-colors last:border-b-0 hover:bg-lmc-offWhite hover:text-lmc-green"
                      >
                        <span>{s.title}</span>
                        <ChevronRight className="h-4 w-4 text-lmc-grayLight" />
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Appointment Teaser */}
                <div className="bg-lmc-green p-6 text-white">
                  <Calendar className="mb-3 h-10 w-10 text-white/90" />
                  <h3 className="mb-2 font-heading text-xl font-semibold">
                    Book an Appointment
                  </h3>
                  <p className="mb-4 font-body text-sm text-white/90">
                    Quick online booking — pick your date and time, we'll handle
                    the rest.
                  </p>
                  <Button
                    variant="primary"
                    asChild
                    href="/appointments"
                    className="w-full bg-white !text-lmc-green hover:bg-lmc-offWhite"
                  >
                    Request Appointment
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

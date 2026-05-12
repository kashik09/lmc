import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServiceDetailBody } from "@/components/blocks/service-detail-body";
import {
  serviceDetails,
  servicesList,
  serviceSidebar,
} from "@/content/services";

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

  return (
    <>
      <PageHeader title={service.title} subtitle="Our Services" />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Main Content - 8/12 */}
            <div className="lg:col-span-8">
              {/* Hero Image */}
              <div className="relative mb-8 aspect-video overflow-hidden rounded-lg bg-muted">
                <Image
                  src={service.image}
                  alt={`${service.title} services at Lifeline Medical Centre`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <ServiceDetailBody slug={slug} />
            </div>

            {/* Sidebar - 4/12 */}
            <aside className="lg:col-span-4">
              <div className="space-y-6">
                {/* All Services Menu */}
                <div className="rounded-lg border border-border bg-card p-4">
                  <h3 className="mb-4 font-heading font-semibold text-card-foreground">
                    {serviceSidebar.allServicesHeading}
                  </h3>
                  <ul className="space-y-2">
                    {servicesList.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                            s.slug === slug
                              ? "bg-primary font-medium text-primary-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Appointment Box */}
                <div className="rounded-lg border border-border bg-card p-4">
                  <h3 className="mb-2 font-heading font-semibold text-card-foreground">
                    {serviceSidebar.appointmentBox.heading}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {serviceSidebar.appointmentBox.text}
                  </p>
                  <Link
                    href={serviceSidebar.appointmentBox.buttonLink}
                    className="inline-block w-full rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-dark"
                  >
                    {serviceSidebar.appointmentBox.buttonText}
                  </Link>
                </div>

                {/* Emergency Box */}
                <div className="rounded-lg border-2 border-destructive bg-destructive/5 p-4">
                  <h3 className="mb-2 font-heading font-semibold text-destructive">
                    {serviceSidebar.emergencyBox.heading}
                  </h3>
                  <p className="mb-3 text-sm text-muted-foreground">
                    {serviceSidebar.emergencyBox.text}
                  </p>
                  <p className="mb-3 font-heading text-lg font-bold text-foreground">
                    {serviceSidebar.emergencyBox.phone}
                  </p>
                  <a
                    href={`tel:${serviceSidebar.emergencyBox.phone.replace(/\D/g, "")}`}
                    className="inline-block w-full rounded-md bg-destructive px-4 py-2 text-center text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90"
                  >
                    {serviceSidebar.emergencyBox.buttonText}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

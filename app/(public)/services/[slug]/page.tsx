import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServicesSidebar } from "@/components/layout/ServicesSidebar";
import { Button } from "@/components/ui/Button";
import { ServiceDetailBody } from "@/components/blocks/service-detail-body";
import { services, serviceSlugs } from "@/content/services";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const page = services[slug];

  if (!page) {
    notFound();
  }

  // Derive sidebar list from services Record
  const sidebarList = Object.values(services).map((s) => ({
    slug: s.slug,
    title: s.title,
  }));

  return (
    <>
      <PageHeader title={page.title} subtitle="Our Services" />

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-container px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {/* Main Content — spans 2 cols */}
            <article className="lg:col-span-2">
              {/* Featured Image */}
              {page.heroImage && (
                <div className="relative mb-8 aspect-[16/9] overflow-hidden bg-lmc-offWhite">
                  <Image
                    src={page.heroImage.src}
                    alt={page.heroImage.alt}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Body Content */}
              <ServiceDetailBody page={page} />

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
              <ServicesSidebar services={sidebarList} currentSlug={slug} />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

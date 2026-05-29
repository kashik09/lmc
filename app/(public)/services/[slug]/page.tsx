import Image from "next/image";
import { notFound } from "next/navigation";
import PageBanner from "@/components/layout/PageBanner";
import { ServicesSidebar } from "@/components/layout/ServicesSidebar";
import { ServiceDetailBody } from "@/components/blocks/service-detail-body";
import { services, serviceSlugs } from "@/content/services";
import { pickImageBySlug } from "@/content/lmc-images";

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

  // Truncate lede for subtitle if too long
  const subtitle = page.lede
    ? page.lede.length > 60
      ? page.lede.slice(0, 57) + "..."
      : page.lede
    : undefined;

  return (
    <>
      <PageBanner
        title={page.title}
        subtitle={subtitle}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: page.title },
        ]}
      />

      <section className="bg-lmc-pageBg py-16 md:py-20">
        <div className="mx-auto max-w-container px-7">
          {/* Two-col layout: 2fr content / 1fr sidebar, 56px gap */}
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[2fr_1fr]">
            {/* Main Content */}
            <article>
              {/* Featured Image — uses service heroImage or fallback from LMC images */}
              {(() => {
                const heroSrc = page.heroImage?.src;
                const heroAlt = page.heroImage?.alt ?? `${page.title} at Lifeline Medical Centre`;
                const fallback = pickImageBySlug("landscape", slug);
                const imageSrc = heroSrc ?? fallback?.src;

                return imageSrc ? (
                  <div className="relative mb-8 aspect-[16/9] overflow-hidden bg-lmc-offWhite">
                    <Image
                      src={imageSrc}
                      alt={heroAlt}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : null;
              })()}

              {/* Body Content */}
              <ServiceDetailBody page={page} />
            </article>

            {/* Sidebar */}
            <aside>
              <ServicesSidebar services={sidebarList} currentSlug={slug} />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

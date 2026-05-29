import Image from "next/image";
import PageBanner from "@/components/layout/PageBanner";
import { ServicesSidebar } from "@/components/layout/ServicesSidebar";
import { servicesList } from '@/content/services';
import { insurancePartners } from '@/content/info/insurance-partners';

/**
 * Insurance Partners Page — displays accepted insurance providers
 */
export default function InsurancePage() {
  return (
    <>
      <PageBanner
        title="Insurance Partners"
        subtitle="Accepted insurance providers at Lifeline Medical Centre"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Patients" },
          { label: "Insurance" },
        ]}
      />

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-container px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {/* Main Content */}
            <article className="lg:col-span-2">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-lmc-green">
                Accepted Insurance
              </p>
              <h2 className="mb-6 font-heading text-3xl font-bold text-lmc-grayDark md:text-4xl">
                {insurancePartners.title}
              </h2>

              {insurancePartners.lede && (
                <p className="mb-8 font-body text-lg leading-relaxed text-lmc-grayMedium">
                  {insurancePartners.lede}
                </p>
              )}

              {/* Partners List */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {insurancePartners.partners.map((partner) => (
                  <div
                    key={partner.name}
                    className="flex flex-col items-center justify-center border border-lmc-grayLight bg-lmc-offWhite p-6"
                  >
                    {partner.logo ? (
                      <div className="relative mb-2 h-16 w-full">
                        <Image
                          src={partner.logo.src}
                          alt={partner.logo.alt}
                          fill
                          className="object-contain"
                          sizes="120px"
                        />
                      </div>
                    ) : (
                      <div className="mb-2 flex h-16 w-16 items-center justify-center bg-lmc-green/10 text-lmc-green">
                        <span className="text-2xl font-bold">
                          {partner.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <p className="text-center font-body text-sm font-medium text-lmc-grayDark">
                      {partner.name}
                    </p>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="mt-10 border-l-4 border-lmc-green bg-lmc-offWhite p-6">
                <h3 className="font-heading text-lg font-semibold text-lmc-grayDark">
                  Have questions about coverage?
                </h3>
                <p className="mt-2 font-body text-sm text-lmc-grayMedium">
                  Please contact our billing department to verify your insurance
                  coverage before your visit. Call{' '}
                  <a
                    href="tel:+256774202747"
                    className="font-semibold text-lmc-green"
                  >
                    (+256) 774-202-747
                  </a>{' '}
                  for assistance.
                </p>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <ServicesSidebar services={servicesList} />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

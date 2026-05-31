import Image from "next/image";
import PageBanner from "@/components/layout/PageBanner";
import { insurancePartners } from "@/content/info/insurance-partners";

/**
 * Insurance Partners Page — displays accepted insurance providers
 * Clean, centered layout matching backup.lmc.co.ug style
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

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-7 text-center">
          {/* Section Header */}
          <h2 className="mb-4 font-heading text-3xl font-bold text-lmc-grayDark md:text-4xl">
            {insurancePartners.title}
          </h2>
          {insurancePartners.lede && (
            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-lmc-grayMedium">
              {insurancePartners.lede}
            </p>
          )}

          {/* Partners Logo Grid — larger cards */}
          <div className="mb-16 flex flex-wrap items-center justify-center gap-8">
            {insurancePartners.partners.map((partner) => (
              <div
                key={partner.name}
                className="flex h-28 w-48 items-center justify-center rounded-lg border border-lmc-borderLight bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                {partner.logo ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={partner.logo.src}
                      alt={partner.logo.alt}
                      fill
                      className="object-contain"
                      sizes="180px"
                    />
                  </div>
                ) : (
                  <span className="text-xl font-bold text-lmc-grayDark">
                    {partner.name}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mx-auto max-w-2xl rounded-lg border-l-4 border-lmc-green bg-lmc-pageBg p-8 text-left">
            <h3 className="mb-2 font-heading text-xl font-bold text-lmc-grayDark">
              Have questions about coverage?
            </h3>
            <p className="text-lmc-grayMedium">
              Please contact our billing department to verify your insurance
              coverage before your visit. Call{" "}
              <a
                href="tel:+256774202747"
                className="font-semibold text-lmc-green hover:underline"
              >
                (+256) 774-202-747
              </a>{" "}
              for assistance.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

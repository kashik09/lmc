import { Pill, Stethoscope, ShieldCheck, Clock, Phone } from "lucide-react";
import PageBanner from "@/components/layout/PageBanner";
import { ServicesSidebar } from "@/components/layout/ServicesSidebar";
import { Button } from "@/components/ui/Button";
import { servicesList } from "@/content/services";
import { contactInfo } from "@/content/contacts";

/**
 * Pharmacy Page — 2-col layout with ServicesSidebar
 *
 * Preserves existing intro content, adds feature cards and contact block.
 */

export const metadata = {
  title: "Pharmacy | Lifeline Medical Centre",
  description:
    "In-house pharmacy at Lifeline Medical Centre, Gayaza. Strict scrutiny to ensure efficacious but affordable drugs.",
};

// Pharmacy feature cards
// TODO 7.3: confirm pharmacy feature copy with client
const pharmacyFeatures = [
  {
    icon: Pill,
    title: "Prescription Filling",
    body: "Accurate, fast dispensing for prescriptions issued in-clinic or from outside providers.",
  },
  {
    icon: Stethoscope,
    title: "Pharmacist Consultation",
    body: "Talk to a qualified pharmacist about medication, dosage, and side effects.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    body: "All stock sourced from licensed suppliers, stored to recommended standards.",
  },
  {
    icon: Clock,
    title: "Convenient Hours",
    body: "Open during clinic hours — available when you need us.",
  },
];

export default function PharmacyPage() {
  return (
    <>
      <PageBanner
        title="Pharmacy"
        subtitle="In-house dispensary with quality-assured medications"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
          { label: "Pharmacy" },
        ]}
      />

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-container px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {/* Main Content — spans 2 cols */}
            <article className="lg:col-span-2">
              {/* Intro */}
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-lmc-green">
                Lifeline Pharmacy
              </p>
              <h2 className="mb-6 font-heading text-3xl font-bold text-lmc-grayDark md:text-4xl">
                Trusted medication, dispensed with care
              </h2>

              {/* Body — preserved existing content */}
              <div className="prose prose-lg max-w-none font-body text-lmc-grayDark prose-headings:font-heading prose-headings:text-lmc-grayDark prose-a:text-lmc-green prose-strong:text-lmc-grayDark prose-ul:my-4 prose-li:my-1">
                <p>
                  Lifeline Medical Centre operates an in-house pharmacy serving
                  our patients during clinic hours. Visit our reception to fill
                  prescriptions or speak with our team about your medication
                  needs.
                </p>
                <p>
                  We maintain strict scrutiny to ensure all medications are
                  efficacious yet affordable, sourced only from licensed and
                  trusted suppliers.
                </p>
              </div>

              {/* Feature Cards Grid */}
              <div className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {pharmacyFeatures.map((item) => (
                  <div
                    key={item.title}
                    className="border-l-4 border-lmc-green bg-lmc-offWhite p-5"
                  >
                    <item.icon className="mb-3 h-7 w-7 text-lmc-green" />
                    <h3 className="mb-1 font-heading text-base font-semibold text-lmc-grayDark">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-lmc-grayMedium">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Contact / Phone Block */}
              <div className="my-10 bg-lmc-green p-6 text-white">
                <div className="flex items-start gap-4">
                  <Phone className="h-8 w-8 shrink-0 text-white/90" />
                  <div>
                    <h3 className="mb-2 font-heading text-xl font-semibold">
                      Need a refill or have a question?
                    </h3>
                    <p className="mb-4 font-body text-sm text-white/90">
                      Call us during pharmacy hours and our team will be happy
                      to help.
                    </p>
                    <div className="space-y-1">
                      {contactInfo.phones.map((phone) => (
                        <p key={phone} className="font-body text-base font-semibold">
                          <a
                            href={`tel:${phone.replace(/\D/g, "")}`}
                            className="hover:underline"
                          >
                            {phone}
                          </a>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-10 flex flex-col items-start justify-between gap-4 border-l-4 border-lmc-green bg-lmc-offWhite p-6 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-lmc-grayDark">
                    Need a consultation first?
                  </h3>
                  <p className="font-body text-sm text-lmc-grayMedium">
                    Book an appointment with one of our doctors before your
                    pharmacy visit.
                  </p>
                </div>
                <Button variant="primary" asChild href="/appointments">
                  Book Appointment
                </Button>
              </div>
            </article>

            {/* Sidebar — "All Services" mode (no currentSlug) */}
            <aside className="lg:col-span-1">
              <ServicesSidebar services={servicesList} />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

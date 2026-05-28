import Link from "next/link";
import { ArrowRight, Clock, Phone, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/blocks/contact-form";
import { contactInfo } from "@/content/contacts";

/**
 * Contacts page — Mockup-style layout
 *
 * Structure:
 * 1. Map block (full-width iframe)
 * 2. Contacts section (navy clip-path + form-card + info card)
 * 3. Appointment banner (navy)
 *
 * Refs: docs/visual-rebuild/00-mockup-spec.md, mockup-reference/contacts.html
 */

// TODO: Kashi to replace with real LMC Google Maps embed URL
const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7336!2d32.5833!3d0.4833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGayaza%2C%20Uganda!5e0!3m2!1sen!2sug!4v1234567890";

export default function ContactsPage() {
  return (
    <>
      {/* Section 1 — Map Block */}
      <section aria-label="Location map">
        <div className="relative h-[280px] w-full bg-lmc-borderLight md:h-[380px]">
          <iframe
            src={GOOGLE_MAPS_EMBED_URL}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lifeline Medical Centre location"
            allowFullScreen
          />
        </div>
      </section>

      {/* Section 2 — Contacts Section (form + info) */}
      <section className="relative bg-lmc-pageBg py-20">
        {/* Navy clip-path banner */}
        <div
          className="absolute inset-x-0 top-0 z-0 h-[220px] bg-lmc-blue"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-container px-7">
          {/* Contacts Head */}
          <div className="mb-10 pt-3">
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#75d69c]">
              Get in touch
            </p>
            <h1 className="font-heading text-[42px] font-bold uppercase tracking-[0.01em] text-white">
              Contacts
            </h1>
          </div>

          {/* Contacts Grid */}
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
            {/* LEFT — Form Card (navy) */}
            <div className="bg-lmc-blue p-9 text-white">
              <h2 className="mb-1 font-heading text-[22px] font-bold uppercase tracking-[0.02em]">
                Send us a Message
              </h2>
              <p className="mb-6 text-[12px] uppercase tracking-[0.14em] text-white/85">
                We respond within 24 hours
              </p>

              {/* Existing ContactForm — wiring untouched */}
              <ContactForm />
            </div>

            {/* RIGHT — Contact Info Card (light) */}
            <div className="border border-lmc-borderLight bg-white p-9">
              <h2 className="mb-1 font-heading text-[22px] font-bold uppercase tracking-[0.02em] text-lmc-grayDark">
                Contact Information
              </h2>
              <p className="mb-6 text-[12px] uppercase tracking-[0.14em] text-lmc-grayMedium">
                Open 24 hours · 7 days a week
              </p>

              {/* Icon Rows */}
              <div className="space-y-0 divide-y divide-lmc-borderLight">
                {/* Opening Hours */}
                <div className="flex items-start gap-4 py-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#eaf6f1] text-lmc-green">
                    <Clock className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-lmc-grayMedium">
                      Opening Hours
                    </p>
                    <h4 className="font-heading text-[18px] font-bold text-lmc-grayDark">
                      {contactInfo.openHours}
                    </h4>
                    <p className="text-[14.5px] text-lmc-grayDark">
                      Including weekends and public holidays.
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 py-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#eaf6f1] text-lmc-green">
                    <Phone className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-lmc-grayMedium">
                      Phone
                    </p>
                    <h4 className="font-heading text-[18px] font-bold text-lmc-grayDark">
                      {contactInfo.phones[0]}
                    </h4>
                    <p className="text-[14.5px] text-lmc-grayDark">
                      Reception · {contactInfo.phones[1]}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 py-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#eaf6f1] text-lmc-green">
                    <Mail className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-lmc-grayMedium">
                      Email
                    </p>
                    <h4 className="font-heading text-[18px] font-bold">
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-lmc-green transition-colors hover:underline"
                      >
                        {contactInfo.email}
                      </a>
                    </h4>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 py-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#eaf6f1] text-lmc-green">
                    <MapPin className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-lmc-grayMedium">
                      Address
                    </p>
                    <h4 className="font-heading text-[18px] font-bold text-lmc-grayDark">
                      {contactInfo.address}
                    </h4>
                    <p className="text-[14.5px] text-lmc-grayDark">
                      Gayaza, Wakiso District, Uganda ·{" "}
                      <a
                        href={contactInfo.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-lmc-green transition-colors hover:underline"
                      >
                        Get directions →
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Appointment Banner */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-container px-7">
          <div className="flex flex-col items-start justify-between gap-8 bg-lmc-blue p-10 text-white md:flex-row md:items-center md:gap-12 md:px-12">
            {/* Text side */}
            <div>
              <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#75d69c]">
                Appointment Request
              </p>
              <h3 className="mb-1 font-heading text-[30px] font-bold uppercase tracking-[0.02em]">
                Want to book ahead?
              </h3>
              <p className="text-[14.5px] leading-[1.7] opacity-85">
                Skip the queue and request a specific date, doctor and
                department through the booking page.
              </p>
            </div>

            {/* Button */}
            <Link
              href="/appointments"
              className="inline-flex flex-shrink-0 items-center gap-2.5 bg-lmc-green px-6 py-3.5 text-[12.5px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-lmc-greenDark"
            >
              Request Now
              <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import type { ReactNode } from "react";
import {
  HeartPulse,
  Phone,
  Mail,
  MapPin,
  Clock,
  Wallet,
  BadgeCheck,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppointmentForm } from "@/components/blocks/appointment-form";
import { DoctorTimeTable } from "@/components/blocks/doctor-time-table";
import {
  appointmentInfoPanel,
  appointmentsWhyChooseUs,
  doctorAvailabilitySection,
} from "@/content/appointments";

const iconMap: Record<string, ReactNode> = {
  wallet: <Wallet className="h-8 w-8" />,
  "badge-check": <BadgeCheck className="h-8 w-8" />,
  clock: <Clock className="h-8 w-8" />,
};

export default function AppointmentsPage() {
  return (
    <>
      <PageHeader title="Appointments" subtitle="Book your visit" />

      {/* Why Choose Us */}
      <section className="bg-lmc-offWhite py-10">
        <div className="mx-auto max-w-container px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {appointmentsWhyChooseUs.map((item) => (
              <div key={item.id} className="flex items-start gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-lmc-green text-white">
                  {iconMap[item.icon]}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-lmc-grayDark">
                    {item.title}
                  </h3>
                  <p className="text-sm text-lmc-grayMedium">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-container gap-8 px-4 lg:grid-cols-12">
          {/* Left Column - Form (5/12) */}
          <div className="lg:col-span-5">
            <AppointmentForm />
          </div>

          {/* Right Column - Info Panel (6/12 with offset) */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-lg border border-lmc-grayLight bg-white p-6 shadow-sm md:p-8">
              {/* Icon */}
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-lmc-green/10 text-lmc-green">
                <HeartPulse className="h-7 w-7" />
              </div>

              {/* Description */}
              <p className="mb-6 text-lmc-grayMedium leading-relaxed">
                {appointmentInfoPanel.description}
              </p>

              {/* Contact Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-lmc-green" />
                  <a
                    href={`tel:${appointmentInfoPanel.phone.replace(/\D/g, "")}`}
                    className="font-semibold text-lmc-grayDark hover:text-lmc-green"
                  >
                    {appointmentInfoPanel.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-lmc-green" />
                  <a
                    href={`mailto:${appointmentInfoPanel.email}`}
                    className="font-semibold text-lmc-grayDark hover:text-lmc-green"
                  >
                    {appointmentInfoPanel.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-lmc-green" />
                  <a
                    href={appointmentInfoPanel.addressMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-lmc-grayDark hover:text-lmc-green"
                  >
                    {appointmentInfoPanel.address}
                  </a>
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-lmc-grayLight" />
                <span className="text-sm font-medium text-lmc-grayMedium">
                  Opening Hours
                </span>
                <div className="h-px flex-1 bg-lmc-grayLight" />
              </div>

              {/* Opening Hours */}
              <div className="flex items-center gap-3 text-lmc-grayMedium">
                <Clock className="h-5 w-5 text-lmc-green" />
                <span>{appointmentInfoPanel.openingHours}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Availability */}
      <section className="bg-lmc-offWhite py-12 md:py-16">
        <div className="mx-auto max-w-container px-4">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-lmc-grayDark md:text-3xl">
              {doctorAvailabilitySection.heading}
            </h2>
            <p className="mt-2 text-lmc-grayMedium">
              {doctorAvailabilitySection.subtitle}
            </p>
          </div>
          <DoctorTimeTable />
        </div>
      </section>
    </>
  );
}

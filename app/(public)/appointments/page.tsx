import type { ReactNode } from "react";
import {
  Wallet,
  BadgeCheck,
  Clock,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { AppointmentForm } from "@/components/blocks/appointment-form";
import { DoctorTimeTable } from "@/components/blocks/doctor-time-table";
import {
  appointmentInfoPanel,
  appointmentsWhyChooseUs,
  doctorAvailabilitySection,
} from "@/content/appointments";

const iconMap: Record<string, ReactNode> = {
  wallet: <Wallet className="h-6 w-6" />,
  "badge-check": <BadgeCheck className="h-6 w-6" />,
  clock: <Clock className="h-6 w-6" />,
};

export default function AppointmentsPage() {
  return (
    <>
      {/* Hero */}
      <header className="bg-lmc-green relative overflow-hidden">
        <div className="absolute -right-20 -top-16 h-[420px] w-[420px] rounded-full bg-white/5" />
        <div className="relative z-[1] mx-auto max-w-7xl px-8 pb-14 pt-14">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#cdebd2]">
            Appointment Request
          </p>
          <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
            Appointments
          </h1>
          <p className="mt-3 max-w-xl text-base text-white/85">
            Book your visit — takes under a minute, and our reception team confirms by phone.
          </p>
        </div>
      </header>

      {/* Perks Row */}
      <section className="border-b border-lmc-grayLight bg-lmc-offWhite">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-7 px-8 py-9 text-center sm:grid-cols-3">
          {appointmentsWhyChooseUs.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-lmc-green text-white">
                {iconMap[item.icon]}
              </div>
              <h2 className="font-heading text-lg font-bold text-lmc-grayDark">
                {item.title}
              </h2>
              <p className="mt-1 text-sm text-lmc-grayMedium">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form — centered single column */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[824px] px-8">
          {/* Form Header */}
          <div className="mb-9 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-lmc-green">
              Appointment Request
            </p>
            <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-lmc-grayDark md:text-4xl">
              Book your visit
            </h2>
            <p className="mt-2 text-sm text-lmc-grayMedium">
              Fields marked <span className="text-red-500">*</span> are required.
            </p>
          </div>

          <AppointmentForm />

          {/* Contact Strip */}
          <div className="mt-12 flex flex-wrap justify-center gap-12 border-t border-lmc-grayLight pt-7">
            <div className="flex items-center gap-3 text-sm font-bold text-lmc-grayDark">
              <Phone className="h-4 w-4 stroke-lmc-green" />
              <a href={`tel:${appointmentInfoPanel.phone.replace(/\D/g, "")}`} className="hover:text-lmc-green">
                {appointmentInfoPanel.phone}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-lmc-grayDark">
              <Mail className="h-4 w-4 stroke-lmc-green" />
              <a href={`mailto:${appointmentInfoPanel.email}`} className="hover:text-lmc-green">
                {appointmentInfoPanel.email}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-lmc-grayDark">
              <MapPin className="h-4 w-4 stroke-lmc-green" />
              <a href={appointmentInfoPanel.addressMapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-lmc-green">
                {appointmentInfoPanel.address}
              </a>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-lmc-grayMedium">
            {appointmentInfoPanel.openingHours}
          </p>
        </div>
      </section>

      {/* Doctor Availability */}
      <section className="border-t border-lmc-grayLight bg-lmc-offWhite py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-8">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-lmc-green">
              Weekly Schedule
            </p>
            <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-lmc-grayDark md:text-4xl">
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

import { HeartPulse, Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/blocks/page-header";
import { AppointmentForm } from "@/components/blocks/appointment-form";
import { appointmentsPage, appointmentInfoPanel } from "@/content/appointments";

export default function AppointmentsPage() {
  return (
    <>
      <PageHeader
        title={appointmentsPage.title}
        subtitle={appointmentsPage.subtitle}
      />

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-12">
          {/* Left Column - Form (5/12) */}
          <div className="lg:col-span-5">
            <AppointmentForm />
          </div>

          {/* Right Column - Info Panel (6/12 with offset) */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm md:p-8">
              {/* Icon */}
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <HeartPulse className="h-7 w-7" />
              </div>

              {/* Description */}
              <p className="mb-6 text-muted-foreground leading-relaxed">
                {appointmentInfoPanel.description}
              </p>

              {/* Contact Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <a
                    href={`tel:${appointmentInfoPanel.phone.replace(/\D/g, "")}`}
                    className="font-semibold text-foreground hover:text-primary"
                  >
                    {appointmentInfoPanel.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a
                    href={`mailto:${appointmentInfoPanel.email}`}
                    className="font-semibold text-foreground hover:text-primary"
                  >
                    {appointmentInfoPanel.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <a
                    href={appointmentInfoPanel.addressMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground hover:text-primary"
                  >
                    {appointmentInfoPanel.address}
                  </a>
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-sm font-medium text-muted-foreground">
                  Opening Hours
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Opening Hours */}
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span>{appointmentInfoPanel.openingHours}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

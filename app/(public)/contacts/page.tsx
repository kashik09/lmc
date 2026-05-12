import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/blocks/contact-form";
import { contactInfo } from "@/content/contacts";

export default function ContactsPage() {
  return (
    <>
      <PageHeader title="Contact Us" subtitle="Get in touch with Lifeline" />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left - Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Right - Contact Info Panel */}
            <div className="rounded-lg border border-border bg-muted p-6 md:p-8">
              <h2 className="mb-4 font-heading text-xl font-bold text-foreground">
                {contactInfo.heading}
              </h2>
              <p className="mb-6 text-muted-foreground">
                {contactInfo.description}
              </p>

              <ul className="mb-6 space-y-4">
                {/* Phones */}
                {contactInfo.phones.map((phone) => (
                  <li key={phone} className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <a
                      href={`tel:${phone.replace(/\D/g, "")}`}
                      className="text-foreground hover:text-primary"
                    >
                      {phone}
                    </a>
                  </li>
                ))}

                {/* Email */}
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-foreground hover:text-primary"
                  >
                    {contactInfo.email}
                  </a>
                </li>

                {/* Address */}
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <a
                    href={contactInfo.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary"
                  >
                    {contactInfo.address}
                  </a>
                </li>
              </ul>

              {/* Open Hours */}
              <div className="mb-6 rounded-md bg-primary/10 px-4 py-3">
                <p className="flex items-center gap-2 font-medium text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {contactInfo.openHours}
                </p>
              </div>

              <hr className="mb-6 border-border" />

              {/* Appointment Section */}
              <h3 className="mb-2 font-heading font-semibold text-foreground">
                {contactInfo.appointmentSection.heading}
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {contactInfo.appointmentSection.text}
              </p>
              <Link
                href={contactInfo.appointmentSection.buttonLink}
                className="inline-block rounded-md bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary-dark"
              >
                {contactInfo.appointmentSection.buttonText}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * HomeCTABanner — Full-width green CTA banner with phone icon and dual CTAs
 *
 * "Need to see a doctor?" messaging with Book Appointment + Contact Us buttons
 */

export function HomeCTABanner() {
  return (
    <section className="bg-lmc-green py-12 text-white md:py-16">
      <div className="mx-auto flex max-w-container flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
        {/* Left: Icon + Text */}
        <div className="flex items-start gap-4 md:gap-6">
          <PhoneCall className="h-10 w-10 shrink-0 md:h-12 md:w-12" />
          <div>
            <h2 className="mb-2 font-heading text-2xl font-bold md:text-3xl">
              Need to see a doctor?
            </h2>
            <p className="font-body text-base text-white/90 md:text-lg">
              Book an appointment online or call us directly — our team is ready
              to help.
            </p>
          </div>
        </div>

        {/* Right: CTAs */}
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Button
            asChild
            href="/appointments"
            size="lg"
            className="bg-white !text-lmc-green hover:bg-lmc-offWhite"
          >
            Book Appointment
          </Button>
          <Button
            asChild
            href="/contacts"
            size="lg"
            variant="secondary"
            className="border-white text-white hover:bg-white hover:!text-lmc-green"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HomeCTABanner;

/**
 * Thank-you page content
 */

export type ThankYouType = "appointment" | "inquiry";

export const thankYouContent: Record<
  ThankYouType,
  {
    pageTitle: string;
    pageSubtitle: string;
    heading: string;
    body: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  }
> = {
  appointment: {
    pageTitle: "Thank You",
    pageSubtitle: "Your appointment request has been received",
    heading: "We got it!",
    body: "We'll be in touch shortly to confirm your appointment time. If you need to reach us in the meantime, call (+256) 774-202-747.",
    primaryCta: { label: "Back to Home", href: "/" },
    secondaryCta: { label: "Book another", href: "/appointments" },
  },
  inquiry: {
    pageTitle: "Thank You",
    pageSubtitle: "Your message has been received",
    heading: "We got it!",
    body: "We read every message. We'll respond as soon as we can — usually within one business day.",
    primaryCta: { label: "Back to Home", href: "/" },
    secondaryCta: { label: "Send another", href: "/contacts" },
  },
};

export const thankYouFallback = {
  pageTitle: "Thank You",
  pageSubtitle: "Submission received",
  heading: "We got it!",
  body: "Your submission has been received. If you need to reach us, call (+256) 774-202-747.",
  primaryCta: { label: "Back to Home", href: "/" },
  secondaryCta: { label: "Contact us", href: "/contacts" },
};

export const referenceNumberSection = {
  heading: "Your Reference Number",
  note: "Please save this number. It helps us find your request faster if you call or email.",
};

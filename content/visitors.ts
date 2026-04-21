/**
 * Visitors page content
 */

export const visitorsPage = {
  title: "Patient & Visitor Guide",
  subtitle: "Useful information regarding your visit to our clinic",
};

export const infoCards = [
  {
    id: "map",
    icon: "MapPin",
    heading: "Find us on the Map",
    description: "Plus useful contact info",
    href: "/contacts",
  },
  {
    id: "faq",
    icon: "HelpCircle",
    heading: "FAQ",
    description: "Frequently asked questions",
    href: "#", // TODO: /faq in future phase
  },
  {
    id: "forms",
    icon: "FileText",
    heading: "Patient Forms",
    description: "Forms to complete prior to your appointment",
    href: "#", // TODO: link to downloadable forms
  },
  {
    id: "insurance",
    icon: "ShieldCheck",
    heading: "Insurance Info",
    description: "Our team is available to answer your insurance questions",
    href: "#", // TODO: insurance info page
  },
  {
    id: "hours",
    icon: "Clock",
    heading: "Opening Hours",
    description: "We operate 24 hours a day, every day",
    href: "#",
  },
  {
    id: "emergency",
    icon: "Phone",
    heading: "Emergency Line",
    description: "Call (+256) 774-202-747 for urgent needs",
    href: "tel:+256774202747",
  },
];

export const gettingHere = [
  {
    id: "parking",
    heading: "Parking",
    description: "Free parking available on-site",
  },
  {
    id: "location",
    heading: "Location",
    description: "Namavundu Rd, Gayaza — 13.7 km from Kampala",
  },
  {
    id: "accessibility",
    heading: "Accessibility",
    description: "Ramps and ground-floor access throughout the facility",
  },
];

export const visitorsCta = {
  heading: "Want to schedule an appointment?",
  description:
    "Call us at (+256) 774-202-747 or fill in the appointment form",
  buttonText: "Appointment Form",
  buttonHref: "/appointments",
};

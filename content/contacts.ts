/**
 * Contacts page content
 */

export const contactsPage = {
  title: "Contact Us",
  subtitle: "We would love to hear from you",
};

export const contactForm = {
  heading: "Send us a Message",
  fields: {
    fullName: {
      label: "Full Name",
      placeholder: "John Doe",
      required: true,
    },
    phone: {
      label: "Phone",
      placeholder: "+256 7XX XXX XXX",
      required: true,
    },
    email: {
      label: "Email",
      placeholder: "you@example.com",
      required: true,
    },
    subject: {
      label: "Subject",
      placeholder: "How can we help?",
      required: false,
    },
    message: {
      label: "Message",
      placeholder: "Your message...",
      required: true,
    },
  },
  submitButton: "Send Message",
  successMessage: "Thank you! Your message has been sent successfully.",
};

export const contactInfo = {
  heading: "Contact Info & Details",
  description:
    "We would love to hear from you. Please send us a message using the form or use the contact information below.",
  phones: ["(+256) 774 202 747"],
  email: "info@lmc.co.ug",
  address: "Namavundu Rd, Gayaza",
  mapsUrl: "https://www.google.com/maps/place/Lifeline+Medical+Centre+Gayaza/@0.4473008,32.6100015,17z",
  openHours: "Open 24/7",
  appointmentSection: {
    heading: "Appointment Request",
    text: "Need to schedule a visit? Book an appointment online.",
    buttonText: "Book Appointment",
    buttonLink: "/appointments",
  },
};

/**
 * Home page content
 * All copy is centralized here for easy editing.
 */

export const heroSlides = [
  {
    id: "laboratory",
    title: "LABORATORY",
    description:
      "We have over the years has provided high quality service delivery with a wide range of medical laboratory investigations for our patients.",
    image: "/images/hero/lab.jpg",
    link: "/services/laboratory",
    linkText: "Learn More",
  },
  {
    id: "theatre",
    title: "THEATRE",
    description:
      "We have a team of skilled and experienced Doctors and Nurses who are ready to perform common surgical procedures.",
    image: "/images/hero/theatre.jpg",
    link: "/services",
    linkText: "Learn More",
  },
  {
    id: "quality-care",
    title: "QUALITY CARE",
    subtitle: "Your Health is our priority",
    description:
      "From preventive care and checkups, to immunizations and exams, our primary care physicians and providers work to keep you and your whole family healthy and strong each and every day.",
    image: "/images/hero/quality-care.jpg",
    link: "/services",
    linkText: "Learn More",
  },
];

export const teaserBoxes = [
  {
    id: "medical-services",
    title: "Medical Services",
    description: "View our range of healthcare services",
    link: "/services",
    colorClass: "bg-primary", // #1b7a12
  },
  {
    id: "find-doctor",
    title: "Find a Doctor",
    description: "Connect with our specialists",
    link: "/contacts",
    colorClass: "bg-secondary", // #45aaff
  },
  {
    id: "appointment",
    title: "Request an Appointment",
    description: "Book your visit today",
    link: "/appointments",
    colorClass: "bg-primary-dark", // #107a02
  },
];

export const welcomeSection = {
  heading: "Welcome to Lifeline",
  tagline: "Quality Healthcare for You and Your Family",
  paragraph: `Thank you for allocating time to know more about us. We are certain you will find us of relevance to your healthcare needs. Lifeline Medical Centre is here to serve you and your family.

Our mission is to provide quality health care services more accessible to the general public. We offer a wide range of services including Laboratory, Radiology, Dental, Pharmacy, Theatre, Ambulance, General Medicine, Immunisation, and Antenatal care.

We are committed to providing compassionate, patient-centered care in a welcoming environment. Our team of dedicated healthcare professionals is here to support your health journey.`,
  sidebarTitle: "Quality Healthcare",
  sidebarText:
    "LMC is built on respect and powered by empathy to give back to the community. We believe everyone deserves access to quality healthcare, and we work every day to make that a reality for the families of Gayaza and beyond.",
  sidebarLink: "/visitors",
  sidebarLinkText: "Patient & Visitor Guide",
};

export const serviceCards = [
  {
    id: "x-ray",
    title: "X-ray",
    slug: "x-ray",
    description:
      "Our radiologists use X-rays in low doses to produce images that help to diagnose and detect bone fractures and breaks, lung problems, tumours and other medical conditions.",
    image: "/images/services/x-ray.jpg",
  },
  {
    id: "dental",
    title: "Dental",
    slug: "dental",
    description:
      "At LMC, we provide comprehensive and fine dental services to our dear clients. Our team is comprised of highly skilled dental specialists who are committed in their practice.",
    image: "/images/services/dental.jpg",
  },
  {
    id: "laboratory",
    title: "Laboratory",
    slug: "laboratory",
    description:
      "LMC over the years has provided high quality service delivery with a wide range of laboratory investigations for our patients. We perform tests for diagnostic and therapeutic evaluations.",
    image: "/images/services/laboratory.jpg",
  },
];

export const ctaSection = {
  heading: "Need an appointment?",
  description:
    "Call Now (+256) 774-202747 and receive Top Quality Healthcare for you and your Family",
  buttonText: "Request Appointment",
  buttonLink: "/appointments",
  backgroundImage: "/images/hero/quality-care.jpg",
};

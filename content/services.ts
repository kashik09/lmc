/**
 * Services page content
 */

export const servicesPage = {
  title: "Services",
  subtitle: "Quality healthcare services for you and your family",
};

export const servicesIntro = {
  paragraph:
    "At Lifeline Medical Centre, we offer a comprehensive range of clinical services designed to meet your healthcare needs. Our team of dedicated professionals is committed to providing quality care with respect and empathy, 24 hours a day.",
};

export const servicesList = [
  {
    id: "x-ray",
    slug: "x-ray",
    title: "X-ray",
    shortDescription:
      "Our radiologists use X-rays in low doses to produce images that help diagnose bone fractures, lung problems, and other conditions.",
    image: "/images/services/x-ray.jpg",
  },
  {
    id: "dental",
    slug: "dental",
    title: "Dental",
    shortDescription:
      "Comprehensive dental services provided by highly skilled specialists committed to your oral health.",
    image: "/images/services/dental.jpg",
  },
  {
    id: "laboratory",
    slug: "laboratory",
    title: "Laboratory",
    shortDescription:
      "High quality laboratory investigations for diagnostic and therapeutic evaluations of our patients.",
    image: "/images/services/laboratory.jpg",
  },
];

export const servicesApproach = {
  heading: "Our Approach",
  items: [
    {
      id: "respect",
      icon: "heart",
      title: "Respect",
      description: "Every patient is treated with dignity and care",
    },
    {
      id: "expertise",
      icon: "graduation-cap",
      title: "Expertise",
      description: "Qualified staff with years of experience",
    },
    {
      id: "accessibility",
      icon: "clock",
      title: "Accessibility",
      description: "Open 24 hours for when you need us most",
    },
  ],
};

export const servicesCta = {
  heading: "Need to book?",
  description:
    "Call (+256) 774-202-747 or request an appointment online",
  buttonText: "Request Appointment",
  buttonLink: "/appointments",
};

// Service detail pages content keyed by slug
export const serviceDetails: Record<
  string,
  {
    title: string;
    tagline: string;
    image: string;
    intro: string;
    sections: {
      title: string;
      items: string[];
    }[];
  }
> = {
  "x-ray": {
    title: "X-ray",
    tagline: "Advanced diagnostic imaging services",
    image: "/images/services/x-ray.jpg",
    intro:
      "Our radiologists use X-rays in low doses to produce pictures/images that help to diagnose and detect bone fractures and breaks, lung problems, tumours and other medical conditions. We provide the following investigations:",
    sections: [
      {
        title: "Upper extremities",
        items: [
          "AP/Lateral views of the arm",
          "AP/Lateral views of the forearm",
          "AP/Lateral views of the elbow",
          "AP/Lateral views of the wrist",
          "AP/Lateral views of the hand",
          "AP/Lateral views of the fingers",
          "AP view of the shoulder",
          "AP view of the clavicle",
        ],
      },
      {
        title: "Lower extremities",
        items: [
          "AP/Lateral views of the thigh",
          "AP/Lateral views of the leg",
          "AP/Lateral views of the knee",
          "AP/Lateral views of the ankle",
          "AP/Lateral views of the foot",
          "AP/Lateral views of the toes",
          "AP view of the pelvis",
          "AP view of the hip",
        ],
      },
      {
        title: "Head",
        items: [
          "PA/Lateral views of the skull",
          "Occipitomental view (OM view) of the sinuses",
          "Lateral view of the facial bones",
          "AP/Lateral views of the mandible",
        ],
      },
      {
        title: "Thorax (Chest) x-ray",
        items: [
          "PA view of the chest",
          "Lateral view of the chest",
          "AP view of the chest (for bedridden patients)",
        ],
      },
      {
        title: "Abdominal x-ray",
        items: [
          "Supine view of the abdomen",
          "Erect view of the abdomen",
          "Decubitus view of the abdomen",
        ],
      },
      {
        title: "Spine x-rays",
        items: [
          "AP/Lateral views of the cervical spine",
          "AP/Lateral views of the thoracic spine",
          "AP/Lateral views of the lumbar spine",
          "AP/Lateral views of the sacrum",
          "AP view of the sacroiliac joints",
        ],
      },
    ],
  },
  dental: {
    title: "Dental",
    tagline: "Comprehensive dental care for the whole family",
    image: "/images/services/dental.jpg",
    intro:
      "At LMC, we provide comprehensive and fine dental services to our dear clients. Our team is comprised of highly skilled dental specialists who are committed in their practice and are ready to leave you with a warm smile. We offer the following dental services:",
    sections: [
      {
        title: "Services Offered",
        items: [
          "Cementing/fillings",
          "Tooth extractions and other surgeries",
          "Root canal treatment",
          "Scaling & polishing",
          "Orthodontics/aligning teeth",
          "Crowning & bridging",
        ],
      },
    ],
  },
  laboratory: {
    title: "Laboratory",
    tagline: "Accurate diagnostics for better treatment",
    image: "/images/services/laboratory.jpg",
    intro:
      "LMC over the years has provided high quality service delivery with a wide range of medical laboratory investigations for our patients. We perform investigations for diagnostic, therapeutic evaluation of patients to contribute to clinical decision-making. Our laboratory offers services in the following areas:",
    sections: [
      {
        title: "Haematology",
        items: [
          "Complete blood count (CBC)",
          "Blood grouping and cross-matching",
          "Coagulation studies",
          "Erythrocyte sedimentation rate (ESR)",
          "Peripheral blood smear",
        ],
      },
      {
        title: "Microbiology",
        items: [
          "Urine culture and sensitivity",
          "Stool culture and sensitivity",
          "Blood culture and sensitivity",
          "Wound swab culture",
          "Sputum culture and sensitivity",
        ],
      },
      {
        title: "Immunology",
        items: [
          "HIV testing and counseling",
          "Hepatitis B and C screening",
          "Widal test (typhoid)",
          "Brucella test",
          "Pregnancy tests",
        ],
      },
    ],
  },
};

export const serviceSidebar = {
  allServicesHeading: "All Services",
  appointmentBox: {
    heading: "Request an Appointment",
    text: "Book your visit with our specialists today.",
    buttonText: "Book Now",
    buttonLink: "/appointments",
  },
  emergencyBox: {
    heading: "Emergency?",
    text: "For urgent medical needs, call us immediately.",
    phone: "(+256) 774-202-747",
    buttonText: "Call Now",
  },
};

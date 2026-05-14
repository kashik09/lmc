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
  {
    id: "pharmacy",
    slug: "pharmacy",
    title: "Pharmacy",
    shortDescription:
      "A full range of medicines in all forms provided through strict scrutiny to ensure efficacious but affordable drugs.",
    image: "/images/services/placeholder.svg",
    // TODO: Request real service image from client
  },
  {
    id: "cardiology",
    slug: "cardiology",
    title: "Cardiology",
    // TODO: Replace with real LMC description
    shortDescription:
      "[Placeholder] Comprehensive cardiology services. Full description coming soon — to be provided by LMC.",
    image: "/images/services/placeholder.svg",
  },
  {
    id: "neurology",
    slug: "neurology",
    title: "Neurology",
    // TODO: Replace with real LMC description
    shortDescription:
      "[Placeholder] Comprehensive neurology services. Full description coming soon — to be provided by LMC.",
    image: "/images/services/placeholder.svg",
  },
  {
    id: "orthopedic",
    slug: "orthopedic",
    title: "Orthopedic",
    // TODO: Replace with real LMC description
    shortDescription:
      "[Placeholder] Comprehensive orthopedic services. Full description coming soon — to be provided by LMC.",
    image: "/images/services/placeholder.svg",
  },
  {
    id: "pediatrics",
    slug: "pediatrics",
    title: "Pediatrics",
    // TODO: Replace with real LMC description
    shortDescription:
      "[Placeholder] Comprehensive pediatrics services. Full description coming soon — to be provided by LMC.",
    image: "/images/services/placeholder.svg",
  },
  {
    id: "diagnostic-imaging",
    slug: "diagnostic-imaging",
    title: "Diagnostic Imaging",
    // TODO: Replace with real LMC description
    shortDescription:
      "[Placeholder] Comprehensive diagnostic imaging services. Full description coming soon — to be provided by LMC.",
    image: "/images/services/placeholder.svg",
  },
  {
    id: "microbiology-lab",
    slug: "microbiology-lab",
    title: "Microbiology Lab",
    // TODO: Replace with real LMC description
    shortDescription:
      "[Placeholder] Comprehensive microbiology lab services. Full description coming soon — to be provided by LMC.",
    image: "/images/services/placeholder.svg",
  },
  {
    id: "gynaecology",
    slug: "gynaecology",
    title: "Gynaecology & Antenatal Care",
    shortDescription:
      "Our maternity and gynaecological services help prepare and support mothers throughout delivery, while providing the highest level of care.",
    image: "/images/services/placeholder.svg",
    // TODO: Request real service image from client
  },
  {
    id: "radiology",
    slug: "radiology",
    title: "Radiology",
    shortDescription:
      "High quality ultrasound and x-ray services using state-of-the-art radiologic equipment with Evidence-Based Practice.",
    image: "/images/services/placeholder.svg",
    // TODO: Request real service image from client
  },
  {
    id: "theatre",
    slug: "theatre",
    title: "Theatre",
    shortDescription:
      "Skilled surgical team performing minor and major operations with comprehensive patient care and a human touch.",
    image: "/images/services/placeholder.svg",
    // TODO: Request real service image from client
  },
  {
    id: "ambulance",
    slug: "ambulance",
    title: "Ambulance",
    shortDescription:
      "Critical care ambulance fully fitted to safely transport critically ill patients to and from hospitals or accident scenes.",
    image: "/images/services/placeholder.svg",
    // TODO: Request real service image from client
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
  pharmacy: {
    title: "Pharmacy",
    tagline: "Quality medications for your health needs",
    image: "/images/services/placeholder.svg",
    // TODO: Request real service image from client
    intro:
      "The Pharmacy Department is responsible for the dispensing of drugs and advice on their use, procurement, supply, storage and conforming to the standards of pharmacy practice by Pharmaceutical Society of Uganda. A full range of medicines in all forms is provided through strict scrutiny to ensure efficacious but affordable drugs.",
    sections: [],
  },
  cardiology: {
    title: "Cardiology",
    tagline: "Heart health and cardiovascular care",
    image: "/images/services/placeholder.svg",
    // TODO: Replace with real LMC description
    intro:
      "[Placeholder] Comprehensive cardiology services. Full description coming soon — to be provided by LMC.",
    // TODO: Replace with real LMC content for this department
    sections: [],
  },
  neurology: {
    title: "Neurology",
    tagline: "Brain and nervous system care",
    image: "/images/services/placeholder.svg",
    // TODO: Replace with real LMC description
    intro:
      "[Placeholder] Comprehensive neurology services. Full description coming soon — to be provided by LMC.",
    // TODO: Replace with real LMC content for this department
    sections: [],
  },
  orthopedic: {
    title: "Orthopedic",
    tagline: "Bone, joint, and muscle care",
    image: "/images/services/placeholder.svg",
    // TODO: Replace with real LMC description
    intro:
      "[Placeholder] Comprehensive orthopedic services. Full description coming soon — to be provided by LMC.",
    // TODO: Replace with real LMC content for this department
    sections: [],
  },
  pediatrics: {
    title: "Pediatrics",
    tagline: "Specialized care for children",
    image: "/images/services/placeholder.svg",
    // TODO: Replace with real LMC description
    intro:
      "[Placeholder] Comprehensive pediatrics services. Full description coming soon — to be provided by LMC.",
    // TODO: Replace with real LMC content for this department
    sections: [],
  },
  "diagnostic-imaging": {
    title: "Diagnostic Imaging",
    tagline: "Advanced medical imaging services",
    image: "/images/services/placeholder.svg",
    // TODO: Replace with real LMC description
    intro:
      "[Placeholder] Comprehensive diagnostic imaging services. Full description coming soon — to be provided by LMC.",
    // TODO: Replace with real LMC content for this department
    sections: [],
  },
  "microbiology-lab": {
    title: "Microbiology Lab",
    tagline: "Specialized microbial testing and analysis",
    image: "/images/services/placeholder.svg",
    // TODO: Replace with real LMC description
    intro:
      "[Placeholder] Comprehensive microbiology lab services. Full description coming soon — to be provided by LMC.",
    // TODO: Replace with real LMC content for this department
    sections: [],
  },
  gynaecology: {
    title: "Gynaecology & Antenatal Care",
    tagline: "Women's health and maternity care",
    image: "/images/services/placeholder.svg",
    // TODO: Request real service image from client
    intro:
      "Whether this is your first child or the latest in your growing family, we're here to ensure that his or her arrival is as special and comfortable as possible. Our maternity and pediatric suite of services helps prepare and support you throughout your exciting journey, while providing the highest level of care. We have a wide range of Gynaecological Procedures including Laparoscopic Procedures also known as Keyhole Surgery which allows for faster recovery and shorter Hospital stay.",
    sections: [
      {
        title: "Areas of Care",
        items: [
          "Urinary tract infections",
          "Adolescent gynaecological issues",
          "Cancer (including cervical cancer, uterine cancer and ovarian cancer)",
          "Cervical polyps and abnormalities",
          "Endometriosis",
          "Polycystic ovarian syndrome (PCOS)",
        ],
      },
    ],
  },
  radiology: {
    title: "Radiology",
    tagline: "Advanced diagnostic imaging services",
    image: "/images/services/placeholder.svg",
    // TODO: Request real service image from client
    intro:
      "Radiology is a branch of medicine that uses imaging technology to diagnose and treat disease. Radiology may be divided into two different areas, diagnostic radiology and interventional radiology. Doctors who specialize in radiology are called radiologists. LMC uses state-of-the-art radiologic equipment, and we are committed to Evidence-Based Practice. We provide high quality ultrasound and x-ray services that assist in making accurate diagnoses.",
    sections: [
      {
        title: "Ultrasound Services",
        items: [
          "Abdominal Scan (Upper & Lower Abdomen)",
          "Pelvic Scan (Trans Abdominal & Trans Vaginal)",
          "Obstetric Scan (Pregnancy Dating & Fetal Anomaly)",
          "Doppler Ultrasound (Arterial & Venous)",
          "Renal Doppler",
          "Carotid Doppler",
          "Thyroid Ultrasound",
          "Breast Ultrasound",
          "Scrotal Ultrasound",
          "Musculoskeletal Ultrasound",
        ],
      },
      {
        title: "X-ray Services — Plain X-rays",
        items: [
          "Skull X-ray",
          "Spine X-ray (Cervical, Thoracic, Lumbar, Sacral)",
          "Chest X-ray",
          "Abdominal X-ray",
          "Pelvic X-ray",
          "Extremity X-rays (Upper & Lower Limbs)",
        ],
      },
      {
        title: "X-ray Services — Special Investigations",
        items: [
          "Barium Swallow",
          "Barium Meal",
          "Barium Enema",
          "Hysterosalpingography (HSG)",
          "Intravenous Pyelography (IVP)",
        ],
      },
    ],
  },
  theatre: {
    title: "Theatre",
    tagline: "Skilled surgical care with a human touch",
    image: "/images/services/placeholder.svg",
    // TODO: Request real service image from client
    intro:
      "We have a team of skilled and experienced Doctors and Nurses who perform minor and major operations in a well-equipped theatre. Our team is committed to providing comprehensive patient care before, during and after surgery, with a human touch that ensures your comfort and well-being.",
    sections: [
      {
        title: "Minor Operations",
        items: [
          "Circumcision",
          "Minor excisions (lumps, cysts, lipomas)",
          "Dilatation & Curettage (D&C)",
          "Manual Vacuum Aspiration (MVA)",
        ],
      },
      {
        title: "Major Operations",
        items: [
          "Herniorrhaphy (Inguinal, Umbilical, Incisional)",
          "Appendicectomy",
          "Caesarean Section (C/S)",
          "Myomectomy",
          "Total Abdominal Hysterectomy (TAH)",
          "Vaginal Hysterectomy",
          "Ovarian Cystectomy",
          "Oophorectomy",
          "Salpingectomy",
          "Bilateral Tubal Ligation (BTL)",
          "Cholecystectomy",
          "Exploratory Laparotomy",
          "Intestinal Resection & Anastomosis",
          "Prostatectomy",
          "Hydrocelectomy",
          "Thyroidectomy",
        ],
      },
    ],
  },
  ambulance: {
    title: "Ambulance",
    tagline: "Critical care transport when you need it most",
    image: "/images/services/placeholder.svg",
    // TODO: Request real service image from client
    intro:
      "Lifeline Medical Centre operates a critical care ambulance that is fully fitted to safely transport critically ill patients to and from hospitals or accident scenes. Our ambulance team is trained to provide emergency medical care during transport, ensuring patient stability and safety.",
    sections: [
      {
        title: "Services Offered",
        items: [
          "Hospital to Home transfers",
          "Home to Hospital emergency transport",
          "Hospital to Hospital inter-facility transfers",
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

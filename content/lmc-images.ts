// content/lmc-images.ts
// Image manifest organized by page context.
// Photo files live under public/images/lmc/<category>/<slug>/

export type LmcImage = {
  src: string;
  alt: string;
};

// Legacy type with dimensions for backward compatibility
export type LegacyImage = {
  src: string;
  width: number;
  height: number;
};

// ==== ABOUT / TEAM / BUILDING ====
// Photos for /about, home Welcome section, leadership cards.
export const aboutImages = {
  // Building / facility
  buildingExterior: { src: "/images/lmc/about/building-exterior.png", alt: "Lifeline Medical Centre building exterior" },
  buildingFacade: { src: "/images/lmc/about/building-facade.jpg", alt: "Lifeline Medical Centre entrance" },
  buildingTeamPhoto: { src: "/images/lmc/about/building-team-photo.png", alt: "LMC team in front of the centre" },
  imagingCenter: { src: "/images/lmc/about/imaging-center.jpg", alt: "Imaging centre at LMC" },
  companyVehicle: { src: "/images/lmc/about/company-vehicle.png", alt: "LMC company vehicle" },
  // Staff / team
  staffGroup: { src: "/images/lmc/about/staff-group.jpg", alt: "LMC staff group photo" },
  staffLabcoat: { src: "/images/lmc/about/staff-labcoat.png", alt: "Medical staff in lab coats at LMC" },
  staffPortrait: { src: "/images/lmc/about/staff-portrait.jpg", alt: "LMC staff portrait" },
  teamLunch: { src: "/images/lmc/about/team-lunch.jpg", alt: "LMC team during lunch break" },
  teamMeeting: { src: "/images/lmc/about/team-meeting.jpg", alt: "LMC team meeting" },
  teamOutdoor: { src: "/images/lmc/about/team-outdoor.jpg", alt: "LMC team outdoors" },
  communityRun: { src: "/images/lmc/about/community-run.jpg", alt: "LMC at a community run event" },
  // Admin
  adminStaff: { src: "/images/lmc/about/admin-staff.jpg", alt: "LMC administrative staff" },
  adminLaptop: { src: "/images/lmc/about/admin-laptop.jpg", alt: "LMC admin staff at work" },
  adminRecords: { src: "/images/lmc/about/admin-records.jpg", alt: "LMC records administration" },
  // Portrait-oriented (good for tall cards / sidebar slots)
  executiveFemale: { src: "/images/lmc/about/executive-female.png", alt: "LMC senior team member" },
  executiveFemaleBlazer: { src: "/images/lmc/about/executive-female-blazer.png", alt: "LMC senior team member" },
  executiveMale: { src: "/images/lmc/about/executive-male.png", alt: "LMC senior team member" },
  executiveGreySuit: { src: "/images/lmc/about/executive-grey-suit.png", alt: "LMC senior team member" },
  boardMember: { src: "/images/lmc/about/board-member.png", alt: "LMC board member" },
} satisfies Record<string, LmcImage>;

// ==== SERVICES ====
// Photos for service detail pages and home MedicalDepartments cards.
// Each service has an array — first entry is the hero/primary, rest are gallery.
export const serviceImages: Record<string, LmcImage[]> = {
  "x-ray": [
    { src: "/images/lmc/services/x-ray/xray-technician.jpg", alt: "X-ray technician at LMC" },
    { src: "/images/lmc/services/x-ray/xray-patient-exam.jpg", alt: "Patient X-ray examination" },
  ],
  dental: [
    { src: "/images/lmc/services/dental/dental-procedure.jpg", alt: "Dental procedure at LMC" },
  ],
  laboratory: [
    { src: "/images/lmc/services/laboratory/lab-technician-microscope.jpg", alt: "LMC laboratory technician with microscope" },
    { src: "/images/lmc/services/laboratory/lab-technician-supplies.jpg", alt: "LMC laboratory technician with supplies" },
  ],
  outpatient: [
    { src: "/images/lmc/services/outpatient/reception-desk.jpg", alt: "LMC outpatient reception desk" },
    { src: "/images/lmc/services/outpatient/reception-staff.jpg", alt: "LMC reception staff" },
    { src: "/images/lmc/services/outpatient/consultation-room.jpg", alt: "LMC consultation room" },
  ],
  pharmacy: [
    { src: "/images/lmc/services/pharmacy/pharmacist-female.jpg", alt: "LMC female pharmacist" },
    { src: "/images/lmc/services/pharmacy/pharmacist-male.jpg", alt: "LMC male pharmacist" },
    { src: "/images/lmc/services/pharmacy/pharmacy-staff-supplies.jpg", alt: "LMC pharmacy staff with supplies" },
  ],
  theatre: [
    { src: "/images/lmc/services/theatre/operating-room.jpg", alt: "LMC operating theatre" },
    { src: "/images/lmc/services/theatre/surgical-table.png", alt: "LMC surgical equipment" },
  ],
  radiology: [
    { src: "/images/lmc/services/radiology/ultrasound-technician.jpg", alt: "LMC radiology ultrasound technician" },
  ],
  ambulance: [
    { src: "/images/lmc/services/ambulance/ambulance-vehicle.jpg", alt: "LMC ambulance vehicle" },
  ],
  inpatient: [
    { src: "/images/lmc/services/inpatient/ward-beds.png", alt: "LMC inpatient ward beds" },
  ],
  "general-medicine": [
    { src: "/images/lmc/services/general-medicine/doctor-female.png", alt: "LMC general medicine doctor" },
    { src: "/images/lmc/services/general-medicine/doctor-male-clipboard.png", alt: "LMC doctor with clipboard" },
    { src: "/images/lmc/services/general-medicine/doctor-male-portrait.png", alt: "LMC doctor portrait" },
    { src: "/images/lmc/services/general-medicine/doctors-trio.jpg", alt: "LMC medical team" },
  ],
  antenatal: [
    { src: "/images/lmc/services/outpatient/consultation-room.jpg", alt: "LMC antenatal consultation" },
  ],
  immunisation: [
    { src: "/images/lmc/services/general-medicine/doctor-female.png", alt: "LMC immunisation services" },
  ],
};

// ==== INSURANCE PARTNERS ====
// Partner logos for /insurance page and footer trust strip.
export const insuranceLogos: LmcImage[] = [
  { src: "/images/lmc/insurance/apa.png", alt: "APA Insurance" },
  { src: "/images/lmc/insurance/apa-alt.png", alt: "APA Insurance alternate logo" },
  { src: "/images/lmc/insurance/britam.jpg", alt: "Britam Insurance" },
  { src: "/images/lmc/insurance/cic.png", alt: "CIC Insurance" },
  { src: "/images/lmc/insurance/jubilee.png", alt: "Jubilee Insurance" },
  { src: "/images/lmc/insurance/jubilee-alt.png", alt: "Jubilee Insurance alternate logo" },
  { src: "/images/lmc/insurance/liberty.png", alt: "Liberty Insurance" },
  { src: "/images/lmc/insurance/liberty-mutual.png", alt: "Liberty Mutual Insurance" },
  { src: "/images/lmc/insurance/prudential.png", alt: "Prudential Insurance" },
  { src: "/images/lmc/insurance/prudential-alt.png", alt: "Prudential Insurance alternate logo" },
];

// ==== GENERAL / DECORATIVE ====
export const generalImages = {
  stethoscope: { src: "/images/lmc/general/stethoscope.png", alt: "Stethoscope" },
  backupGenerator: { src: "/images/lmc/general/backup-generator.jpg", alt: "LMC backup generator" },
} satisfies Record<string, LmcImage>;

// ==== HELPERS ====

/** Get the primary (first) photo for a service slug. Falls back to a generic outpatient photo. */
export function getServiceHero(slug: string): LmcImage {
  const photos = serviceImages[slug];
  if (photos && photos.length > 0) return photos[0];
  return serviceImages.outpatient?.[0] ?? generalImages.stethoscope;
}

/** Get all photos for a service slug. */
export function getServicePhotos(slug: string): LmcImage[] {
  return serviceImages[slug] ?? [];
}

/** A flat pool of building/team photos suitable for hero carousels and welcome sections. */
export const heroPool: LmcImage[] = [
  aboutImages.buildingExterior,
  aboutImages.buildingFacade,
  aboutImages.imagingCenter,
  aboutImages.staffGroup,
  aboutImages.teamMeeting,
  aboutImages.buildingTeamPhoto,
  aboutImages.staffLabcoat,
  aboutImages.teamOutdoor,
];

/** Portrait-oriented photos for tall card slots (Welcome section right card, sidebar). */
export const portraitPool: LmcImage[] = [
  aboutImages.executiveFemale,
  aboutImages.executiveFemaleBlazer,
  aboutImages.executiveMale,
  aboutImages.executiveGreySuit,
  aboutImages.boardMember,
];

// ==== BACKWARD-COMPATIBLE ALIASES ====
// Legacy exports with width/height for components that expect dimensions.
// Width/height values are placeholders — Next.js Image with fill ignores them.

/** @deprecated Use heroPool instead. */
export const heroImages: LegacyImage[] = [
  { src: "/images/lmc/about/building-exterior.png", width: 2490, height: 1763 },
  { src: "/images/lmc/about/building-facade.jpg", width: 3037, height: 1646 },
  { src: "/images/lmc/about/imaging-center.jpg", width: 2701, height: 1566 },
  { src: "/images/lmc/about/staff-group.jpg", width: 868, height: 664 },
  { src: "/images/lmc/about/team-meeting.jpg", width: 1007, height: 658 },
  { src: "/images/lmc/about/building-team-photo.png", width: 1462, height: 541 },
  { src: "/images/lmc/about/staff-labcoat.png", width: 1951, height: 1113 },
  { src: "/images/lmc/about/team-outdoor.jpg", width: 1124, height: 617 },
];

/** @deprecated Use portraitPool instead. */
export const portraitImages: LegacyImage[] = [
  { src: "/images/lmc/about/executive-female.png", width: 1246, height: 2820 },
  { src: "/images/lmc/about/executive-female-blazer.png", width: 1338, height: 2577 },
  { src: "/images/lmc/about/executive-male.png", width: 1532, height: 2102 },
  { src: "/images/lmc/about/executive-grey-suit.png", width: 1097, height: 1455 },
  { src: "/images/lmc/about/board-member.png", width: 733, height: 1013 },
];

/** @deprecated Use heroPool or context-specific pools. */
export const squareImages: LegacyImage[] = [
  { src: "/images/lmc/about/building-exterior.png", width: 1178, height: 1033 },
  { src: "/images/lmc/about/staff-group.jpg", width: 3187, height: 3316 },
  { src: "/images/lmc/about/team-meeting.jpg", width: 589, height: 480 },
];

/** @deprecated Use getServiceHero(slug) instead. */
export function pickImageBySlug(
  _classification: string,
  slug: string
): LegacyImage {
  const hero = getServiceHero(slug);
  return { src: hero.src, width: 1200, height: 800 };
}

/** @deprecated Use heroPool[0] or context-specific image. */
export function pickImageBy(): LegacyImage {
  return heroImages[0];
}

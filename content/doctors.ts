/**
 * Doctor data for appointment booking
 * TODO: Replace placeholder data with real LMC doctor information
 */

export type Doctor = {
  slug: string;
  name: string;
  department: string; // must match a value in appointmentDepartments
  hours: string; // e.g. "8:00am - 5:00pm"
  daysAvailable: Array<"Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun">;
};

export const doctors: Doctor[] = [
  // TODO: Replace with real LMC doctors
  {
    slug: "dr-mukasa",
    name: "Dr. Mukasa James",
    department: "dental",
    hours: "8:00am - 5:00pm",
    daysAvailable: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  },
  {
    slug: "dr-nakato",
    name: "Dr. Nakato Sarah",
    department: "xray",
    hours: "8:00am - 4:00pm",
    daysAvailable: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
  {
    slug: "dr-ochieng",
    name: "Dr. Ochieng Peter",
    department: "laboratory",
    hours: "7:00am - 6:00pm",
    daysAvailable: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  },
  {
    slug: "dr-namukasa",
    name: "Dr. Namukasa Grace",
    department: "general",
    hours: "8:00am - 5:00pm",
    daysAvailable: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
  {
    slug: "dr-kato",
    name: "Dr. Kato Emmanuel",
    department: "general",
    hours: "9:00am - 6:00pm",
    daysAvailable: ["Mon", "Wed", "Fri", "Sat", "Sun"],
  },
];

/**
 * Get doctors filtered by department
 */
export function getDoctorsByDepartment(department: string): Doctor[] {
  if (!department) return doctors;
  return doctors.filter((doc) => doc.department === department);
}

/**
 * Get doctors available on a specific day
 */
export function getDoctorsByDay(
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"
): Doctor[] {
  return doctors.filter((doc) => doc.daysAvailable.includes(day));
}

/**
 * Doctor data for appointment booking
 * TODO: Replace placeholder data with real LMC doctor information
 */

export type DayOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type Shift = "morning" | "afternoon" | "evening";
// morning   = 8:00 – 11:00
// afternoon = 11:00 – 14:00
// evening   = 14:00 – 17:00

export type Doctor = {
  slug: string;
  name: string;
  department: string; // must match a value in appointmentDepartments
  schedule: Partial<Record<DayOfWeek, Shift[]>>;
};

export const doctors: Doctor[] = [
  // TODO: replace with real LMC doctor schedules from client
  {
    slug: "placeholder-dr-a",
    name: "[Placeholder] Dr. A — Dental",
    department: "dental",
    schedule: {
      Mon: ["morning", "afternoon"],
      Tue: ["morning"],
      Wed: ["morning", "afternoon"],
      Thu: ["afternoon"],
      Fri: ["morning", "afternoon"],
    },
  },
  {
    slug: "placeholder-dr-b",
    name: "[Placeholder] Dr. B — X-Ray",
    department: "x-ray",
    schedule: {
      Mon: ["morning"],
      Tue: ["morning", "afternoon"],
      Wed: ["afternoon"],
      Thu: ["morning", "afternoon"],
      Fri: ["morning"],
      Sat: ["morning"],
    },
  },
  {
    slug: "placeholder-dr-c",
    name: "[Placeholder] Dr. C — Laboratory",
    department: "laboratory",
    schedule: {
      Mon: ["morning", "afternoon", "evening"],
      Tue: ["morning", "evening"],
      Wed: ["morning", "afternoon"],
      Thu: ["morning", "afternoon", "evening"],
      Fri: ["morning", "evening"],
    },
  },
  {
    slug: "placeholder-dr-d",
    name: "[Placeholder] Dr. D — General",
    department: "general",
    schedule: {
      Mon: ["evening"],
      Tue: ["afternoon", "evening"],
      Wed: ["evening"],
      Thu: ["afternoon"],
      Fri: ["afternoon", "evening"],
      Sat: ["morning", "afternoon"],
    },
  },
  {
    slug: "placeholder-dr-e",
    name: "[Placeholder] Dr. E — General",
    department: "general",
    schedule: {
      Mon: ["afternoon"],
      Wed: ["morning"],
      Thu: ["morning"],
      Fri: ["afternoon"],
      Sat: ["afternoon"],
      Sun: ["morning"],
    },
  },
  {
    slug: "placeholder-dr-cardiology",
    name: "[Placeholder] Cardiology Lead",
    department: "cardiology",
    schedule: { Mon: ["morning"], Wed: ["afternoon"], Fri: ["morning"] },
  },
  {
    slug: "placeholder-dr-neurology",
    name: "[Placeholder] Neurology Lead",
    department: "neurology",
    schedule: { Tue: ["morning"], Thu: ["afternoon"] },
  },
  {
    slug: "placeholder-dr-orthopedic",
    name: "[Placeholder] Orthopedic Lead",
    department: "orthopedic",
    schedule: { Mon: ["afternoon"], Thu: ["morning"] },
  },
  {
    slug: "placeholder-dr-pediatrics",
    name: "[Placeholder] Pediatrics Lead",
    department: "pediatrics",
    schedule: { Tue: ["morning", "afternoon"], Fri: ["morning"] },
  },
  {
    slug: "placeholder-dr-diagnostic",
    name: "[Placeholder] Diagnostic Imaging Lead",
    department: "diagnostic-imaging",
    schedule: { Wed: ["morning"], Sat: ["morning"] },
  },
  {
    slug: "placeholder-dr-microbiology",
    name: "[Placeholder] Microbiology Lab Lead",
    department: "microbiology-lab",
    schedule: { Mon: ["morning"], Tue: ["evening"], Thu: ["morning"] },
  },
  {
    slug: "placeholder-dr-gynaecology",
    name: "[Placeholder] Gynaecology Lead",
    department: "gynaecology",
    schedule: { Wed: ["morning", "afternoon"], Fri: ["afternoon"] },
  },
];

/**
 * Get doctors filtered by department
 */
export function getDoctorsByDepartment(department: string): Doctor[] {
  if (!department) return doctors;
  return doctors.filter((doc) => doc.department === department);
}

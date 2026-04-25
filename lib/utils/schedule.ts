import type { Doctor, DayOfWeek, Shift } from "@/content/doctors";

export function getDoctorsForSlot(
  doctors: Doctor[],
  day: DayOfWeek,
  shift: Shift
): Doctor[] {
  return doctors.filter((d) => d.schedule[day]?.includes(shift));
}

import { doctors, type DayOfWeek, type Shift } from "@/content/doctors";
import { appointmentDepartments } from "@/content/appointments";
import { getDoctorsForSlot } from "@/lib/utils/schedule";

const DAYS: DayOfWeek[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SHIFTS: { key: Shift; label: string }[] = [
  { key: "morning", label: "8:00 – 11:00" },
  { key: "afternoon", label: "11:00 – 14:00" },
  { key: "evening", label: "14:00 – 17:00" },
];

const DAY_LABELS: Record<DayOfWeek, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

function getDepartmentLabel(value: string): string {
  const dept = appointmentDepartments.find((d) => d.value === value);
  return dept?.label ?? value;
}

function hasDoctorsOnDay(day: DayOfWeek): boolean {
  return SHIFTS.some(
    (shift) => getDoctorsForSlot(doctors, day, shift.key).length > 0
  );
}

export function DoctorTimeTable() {
  return (
    <>
      {/* Desktop Table (md+) */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[800px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-32 border border-border bg-primary px-3 py-2 text-left font-medium text-primary-foreground">
                Time
              </th>
              {DAYS.map((day) => (
                <th
                  key={day}
                  className="border border-border bg-primary px-3 py-2 text-center font-medium text-primary-foreground"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SHIFTS.map((shift) => (
              <tr key={shift.key}>
                <td className="border border-border bg-muted px-3 py-3 align-top font-mono text-sm text-muted-foreground">
                  {shift.label}
                </td>
                {DAYS.map((day) => {
                  const slotDoctors = getDoctorsForSlot(
                    doctors,
                    day,
                    shift.key
                  );
                  return (
                    <td
                      key={`${day}-${shift.key}`}
                      className="border border-border bg-card px-3 py-3 align-top"
                    >
                      {slotDoctors.length > 0 ? (
                        <ul className="space-y-2">
                          {slotDoctors.map((doc) => (
                            <li key={doc.slug}>
                              <span className="block text-xs font-medium text-foreground">
                                {doc.name}
                              </span>
                              <span className="inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">
                                {getDepartmentLabel(doc.department)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards (< md) */}
      <div className="grid gap-4 md:hidden">
        {DAYS.map((day) => {
          const dayHasDoctors = hasDoctorsOnDay(day);

          return (
            <div
              key={day}
              className="rounded-lg border border-border bg-card overflow-hidden"
            >
              <div className="bg-primary px-4 py-2">
                <h4 className="font-heading font-semibold text-primary-foreground">
                  {DAY_LABELS[day]}
                </h4>
              </div>

              <div className="p-4">
                {dayHasDoctors ? (
                  <div className="space-y-4">
                    {SHIFTS.map((shift) => {
                      const slotDoctors = getDoctorsForSlot(
                        doctors,
                        day,
                        shift.key
                      );

                      return (
                        <div key={shift.key}>
                          <p className="mb-1 text-xs font-medium text-muted-foreground">
                            {shift.label}
                          </p>
                          {slotDoctors.length > 0 ? (
                            <ul className="space-y-1">
                              {slotDoctors.map((doc) => (
                                <li
                                  key={doc.slug}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <span className="text-muted-foreground">
                                    •
                                  </span>
                                  <span className="text-foreground">
                                    {doc.name}
                                  </span>
                                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">
                                    {getDepartmentLabel(doc.department)}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-muted-foreground">—</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Closed</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

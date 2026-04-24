import { doctors, getDoctorsByDay } from "@/content/doctors";
import { appointmentDepartments } from "@/content/appointments";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

function getDepartmentLabel(value: string): string {
  const dept = appointmentDepartments.find((d) => d.value === value);
  return dept?.label ?? value;
}

export function DoctorTimeTable() {
  return (
    <>
      {/* Desktop Table (md+) */}
      <div className="hidden overflow-x-auto md:block">
        <div className="grid min-w-[700px] grid-cols-8 text-sm">
          {/* Header Row */}
          <div className="border border-border bg-primary px-3 py-2 text-left font-medium text-primary-foreground">
            Time
          </div>
          {days.map((day) => (
            <div
              key={`header-${day}`}
              className="border border-border bg-primary px-3 py-2 text-center font-medium text-primary-foreground"
            >
              {day}
            </div>
          ))}

          {/* Content Row - self-start prevents vertical stretching */}
          <div className="self-start border border-border bg-card px-3 py-2 font-medium text-foreground">
            8:00am - 5:00pm
          </div>
          {days.map((day) => {
            const dayDoctors = getDoctorsByDay(day);
            return (
              <div
                key={`content-${day}`}
                className="self-start border border-border bg-card px-2 py-2"
              >
                {dayDoctors.length > 0 ? (
                  <ul className="space-y-2">
                    {dayDoctors.map((doc) => (
                      <li key={doc.slug} className="text-xs">
                        <span className="block font-medium text-foreground">
                          {doc.name}
                        </span>
                        <span className="inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">
                          {getDepartmentLabel(doc.department)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Closed
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Cards (< md) */}
      <div className="grid gap-4 md:hidden">
        {days.map((day) => {
          const dayDoctors = getDoctorsByDay(day);
          return (
            <div
              key={day}
              className="rounded-lg border border-border bg-card p-4"
            >
              <h4 className="mb-3 font-heading font-semibold text-foreground">
                {day}
              </h4>
              {dayDoctors.length > 0 ? (
                <ul className="space-y-3">
                  {dayDoctors.map((doc) => (
                    <li
                      key={doc.slug}
                      className="flex items-start justify-between"
                    >
                      <div>
                        <span className="block text-sm font-medium text-foreground">
                          {doc.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {doc.hours}
                        </span>
                      </div>
                      <span className="rounded bg-primary/10 px-2 py-0.5 text-xs text-primary">
                        {getDepartmentLabel(doc.department)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Closed</p>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

import { createClient } from "@/lib/supabase/server";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
type DayOfWeek = (typeof DAYS)[number];

const DAY_LABELS: Record<DayOfWeek, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

type TimeBlock = {
  id: string;
  start_time: string;
  end_time: string;
};

type Doctor = {
  id: string;
  name: string;
  department_name: string;
  department_color_bg: string;
  department_color_fg: string;
};

type ScheduleData = {
  timeBlocks: TimeBlock[];
  schedule: Record<string, Doctor[]>; // "blockId|day" -> doctors
};

// Row types from Supabase
type DeptRow = { id: string; name: string; short_name?: string; color_bg?: string; color_fg?: string };
type DoctorRow = { id: string; name: string; department_id: string; active: boolean };
type AssignRow = { time_block_id: string; day: string; doctor_id: string };

async function getScheduleData(): Promise<ScheduleData> {
  const supabase = await createClient();

  // Fetch all data in parallel
  const [blocksRes, doctorsRes, deptsRes, assignRes] = await Promise.all([
    supabase.from("roster_time_blocks").select("*").order("sort_order"),
    supabase.from("roster_doctors").select("*").eq("active", true),
    supabase.from("roster_departments").select("*"),
    supabase.from("roster_assignments").select("*"),
  ]);

  const timeBlocks = (blocksRes.data ?? []) as TimeBlock[];
  const doctorRows = (doctorsRes.data ?? []) as DoctorRow[];
  const departments = (deptsRes.data ?? []) as DeptRow[];
  const assignments = (assignRes.data ?? []) as AssignRow[];

  // Build department lookup
  const deptById: Record<string, DeptRow> = {};
  for (const d of departments) {
    deptById[d.id] = d;
  }

  // Build doctor lookup with department info
  const doctorById: Record<string, Doctor> = {};
  for (const d of doctorRows) {
    const dept = deptById[d.department_id];
    doctorById[d.id] = {
      id: d.id,
      name: d.name,
      department_name: dept?.short_name || dept?.name || "",
      department_color_bg: dept?.color_bg || "#e5efe6",
      department_color_fg: dept?.color_fg || "#2e7d45",
    };
  }

  // Build schedule: "blockId|day" -> [doctors]
  const schedule: Record<string, Doctor[]> = {};

  // Initialize all slots as empty
  timeBlocks.forEach((block) => {
    DAYS.forEach((day) => {
      schedule[`${block.id}|${day}`] = [];
    });
  });

  // Fill in assignments
  assignments.forEach((a) => {
    const key = `${a.time_block_id}|${a.day}`;
    const doctor = doctorById[a.doctor_id];
    if (doctor && schedule[key]) {
      schedule[key].push(doctor);
    }
  });

  return { timeBlocks, schedule };
}

function formatTime(time: string): string {
  // "08:00" -> "8:00"
  const match = /^(\d{1,2}):(\d{2})$/.exec(time);
  if (!match) return time;
  return `${parseInt(match[1], 10)}:${match[2]}`;
}

export async function DoctorTimeTable() {
  const { timeBlocks, schedule } = await getScheduleData();

  // Check if there's any data
  const hasAnyDoctors = Object.values(schedule).some((docs) => docs.length > 0);

  if (timeBlocks.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-muted/50 p-8 text-center">
        <p className="text-muted-foreground">
          Schedule not yet configured.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table (md+) */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[800px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-28 border border-border bg-primary px-3 py-2 text-left font-medium text-primary-foreground">
                Shift
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
            {timeBlocks.map((block) => (
              <tr key={block.id}>
                <td className="border border-border bg-muted px-3 py-3 align-top">
                  <div className="font-mono text-sm font-semibold text-primary">
                    {formatTime(block.start_time)}
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">
                    ↓ {formatTime(block.end_time)}
                  </div>
                </td>
                {DAYS.map((day) => {
                  const slotDoctors = schedule[`${block.id}|${day}`] || [];
                  return (
                    <td
                      key={`${day}-${block.id}`}
                      className="border border-border bg-card px-3 py-3 align-top"
                    >
                      {slotDoctors.length > 0 ? (
                        <ul className="space-y-2">
                          {slotDoctors.map((doc) => (
                            <li key={doc.id}>
                              <span className="block text-xs font-medium text-foreground">
                                {doc.name}
                              </span>
                              <span
                                className="inline-block rounded px-1.5 py-0.5 text-[10px] font-medium"
                                style={{
                                  backgroundColor: doc.department_color_bg,
                                  color: doc.department_color_fg,
                                }}
                              >
                                {doc.department_name}
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
          const dayHasDoctors = timeBlocks.some(
            (block) => (schedule[`${block.id}|${day}`] || []).length > 0
          );

          return (
            <div
              key={day}
              className="overflow-hidden rounded-lg border border-border bg-card"
            >
              <div className="bg-primary px-4 py-2">
                <h3 className="font-heading font-semibold text-primary-foreground">
                  {DAY_LABELS[day]}
                </h3>
              </div>

              <div className="p-4">
                {dayHasDoctors ? (
                  <div className="space-y-4">
                    {timeBlocks.map((block) => {
                      const slotDoctors =
                        schedule[`${block.id}|${day}`] || [];

                      return (
                        <div key={block.id}>
                          <p className="mb-1 font-mono text-xs font-medium text-muted-foreground">
                            {formatTime(block.start_time)} –{" "}
                            {formatTime(block.end_time)}
                          </p>
                          {slotDoctors.length > 0 ? (
                            <ul className="space-y-1">
                              {slotDoctors.map((doc) => (
                                <li
                                  key={doc.id}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <span className="text-muted-foreground">
                                    •
                                  </span>
                                  <span className="text-foreground">
                                    {doc.name}
                                  </span>
                                  <span
                                    className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                                    style={{
                                      backgroundColor: doc.department_color_bg,
                                      color: doc.department_color_fg,
                                    }}
                                  >
                                    {doc.department_name}
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
                  <p className="text-sm text-muted-foreground">No doctors scheduled</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!hasAnyDoctors && (
        <div className="mt-4 rounded-lg border border-border bg-muted/50 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            No doctors are currently scheduled. Check back later.
          </p>
        </div>
      )}
    </>
  );
}

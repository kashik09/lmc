import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/roster/doctors
 * Returns active doctors with their departments for appointment booking
 */
export async function GET() {
  const supabase = await createClient();

  const [doctorsRes, deptsRes] = await Promise.all([
    supabase.from("roster_doctors").select("*").eq("active", true).order("name"),
    supabase.from("roster_departments").select("*"),
  ]);

  if (doctorsRes.error) {
    return NextResponse.json({ doctors: [] });
  }

  type Dept = { id: string; name: string; short_name?: string };
  type Doctor = { id: string; name: string; department_id: string; active: boolean };

  const departments = (deptsRes.data ?? []) as Dept[];
  const deptById: Record<string, Dept> = {};
  for (const d of departments) {
    deptById[d.id] = d;
  }

  const doctorRows = (doctorsRes.data ?? []) as Doctor[];
  const doctors = doctorRows.map((doc) => {
    const dept = deptById[doc.department_id];
    return {
      id: doc.id,
      name: doc.name,
      department: doc.department_id,
      departmentName: dept?.name || "",
    };
  });

  return NextResponse.json({ doctors });
}

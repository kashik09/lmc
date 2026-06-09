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

  const departments = deptsRes.data || [];
  const deptById: Record<string, typeof departments[0]> = {};
  departments.forEach((d) => {
    deptById[d.id] = d;
  });

  const doctors = (doctorsRes.data || []).map((doc) => {
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

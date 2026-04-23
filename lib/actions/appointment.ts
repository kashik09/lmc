"use server";

import { appointmentSchema } from "@/lib/validators";

export type AppointmentResult =
  | { success: true }
  | { success: false; errors: Record<string, string[]> };

export async function submitAppointment(
  formData: unknown
): Promise<AppointmentResult> {
  const result = appointmentSchema.safeParse(formData);

  if (!result.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const path = issue.path[0]?.toString() ?? "form";
      if (!errors[path]) {
        errors[path] = [];
      }
      errors[path].push(issue.message);
    }
    return { success: false, errors };
  }

  // TODO: Insert into Supabase appointments table in Phase 5
  console.log("Validated appointment data:", result.data);

  return { success: true };
}

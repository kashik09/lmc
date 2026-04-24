"use server";

import { appointmentSchema } from "@/lib/validators";
import { createClient } from "@/lib/supabase/server";
import { generateReferenceNumber } from "@/lib/utils/reference";

export type AppointmentResult =
  | { success: true; referenceNumber: string }
  | { success: false; error: "validation"; errors: Record<string, string[]> }
  | { success: false; error: "rate_limit"; message: string }
  | { success: false; error: "database"; message: string };

function toIsoDate(value: Date | string): string {
  if (value instanceof Date) {
    return value.toISOString().split("T")[0]; // YYYY-MM-DD
  }
  // If Zod already gave us a string, trust it's ISO-shaped
  return value.split("T")[0];
}

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
    return { success: false, error: "validation", errors };
  }

  const supabase = await createClient();
  const { data } = result;

  // Rate limit check: max 3 submissions per email in 10 minutes
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { count, error: countError } = await supabase
    .from("appointments")
    .select("*", { count: "exact", head: true })
    .eq("email", data.email)
    .gte("created_at", tenMinutesAgo);

  if (countError) {
    // Fail-open: if the abuse-check query errors (e.g., transient DB issue),
    // we allow the submission to proceed rather than block legitimate users.
    // Accepted tradeoff — revisit in Phase 6 hardening if threat model changes.
    console.error("[appointment] abuse-check query failed:", countError);
  } else if (count !== null && count >= 3) {
    return {
      success: false,
      error: "rate_limit",
      message:
        "You've submitted too many appointment requests recently. Please wait a few minutes and try again.",
    };
  }

  // Generate reference number
  const referenceNumber = generateReferenceNumber("APT");

  // Insert into database with explicit field mapping (camelCase -> snake_case)
  const { error: insertError } = await supabase.from("appointments").insert({
    reference_number: referenceNumber,
    department: data.department,
    doctor_slug: data.doctorSlug || null,
    full_name: data.fullName,
    patient_type: data.patientType,
    date_of_birth: toIsoDate(data.dateOfBirth),
    sex: data.sex,
    phone: data.phone,
    email: data.email,
    appointment_date: toIsoDate(data.appointmentDate),
    message: data.message || null,
    // status defaults to 'pending' in the DB schema, don't set it here
  });

  if (insertError) {
    console.error("[appointment] appointment insert failed:", insertError);
    return {
      success: false,
      error: "database",
      message:
        "We couldn't save your appointment request. Please try again or call us directly.",
    };
  }

  return { success: true, referenceNumber };
}

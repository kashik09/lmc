"use server";

import * as Sentry from "@sentry/nextjs";
import { appointmentSchema } from "@/lib/validators";
import { createClient } from "@/lib/supabase/server";
import { generateReferenceNumber } from "@/lib/utils/reference";
import { checkRateLimit, appointmentLimiter } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/utils/turnstile";
import { getClientIp, getUserAgent } from "@/lib/utils/ip-security";

export type AppointmentResult =
  | { success: true; referenceNumber: string }
  | { success: false; error: "validation"; errors: Record<string, string[]> }
  | { success: false; error: "captcha_failed" }
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

  // Captcha verification (fail-closed: reject if verification fails)
  const captchaValid = await verifyTurnstileToken(data.turnstileToken);
  if (!captchaValid) {
    return { success: false, error: "captcha_failed" };
  }

  // Rate limit check: max 3 submissions per phone in 10 minutes (Upstash Redis)
  const rl = await checkRateLimit(appointmentLimiter, data.phone, "[appointment]");
  if (!rl.allowed) {
    return {
      success: false,
      error: "rate_limit",
      message:
        "You've submitted too many appointment requests recently. Please wait a few minutes and try again.",
    };
  }

  // Generate reference number
  const referenceNumber = generateReferenceNumber("APT");

  // Get IP for security tracking
  const ipAddress = await getClientIp();
  const userAgent = await getUserAgent();

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
    email: data.email || "",
    appointment_date: toIsoDate(data.appointmentDate),
    message: data.message || null,
    ip_address: ipAddress,
    user_agent: userAgent,
    // status defaults to 'pending' in the DB schema, don't set it here
  });

  if (insertError) {
    console.error("[appointment] appointment insert failed:", insertError);
    Sentry.captureException(insertError, {
      tags: { action: "appointment_submit" },
      // DO NOT include user PII (email, phone, name) — DPPA 2019 compliance
    });
    return {
      success: false,
      error: "database",
      message:
        "We couldn't save your appointment request. Please try again or call us directly.",
    };
  }

  return { success: true, referenceNumber };
}

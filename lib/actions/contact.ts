"use server";

import * as Sentry from "@sentry/nextjs";
import { contactSchema } from "@/lib/validators";
import { createClient } from "@/lib/supabase/server";
import { generateReferenceNumber } from "@/lib/utils/reference";
import { checkRateLimit, contactLimiter } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/utils/turnstile";

export type ContactResult =
  | { success: true; referenceNumber: string }
  | { success: false; error: "validation"; errors: Record<string, string[]> }
  | { success: false; error: "captcha_failed" }
  | { success: false; error: "rate_limit"; message: string }
  | { success: false; error: "database"; message: string };

export async function submitContact(formData: unknown): Promise<ContactResult> {
  const result = contactSchema.safeParse(formData);

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
  const { email, fullName, phone, subject, message, turnstileToken } =
    result.data;

  // Captcha verification (fail-closed: reject if verification fails)
  const captchaValid = await verifyTurnstileToken(turnstileToken);
  if (!captchaValid) {
    return { success: false, error: "captcha_failed" };
  }

  // Rate limit check: max 3 submissions per phone in 10 minutes (Upstash Redis)
  const rl = await checkRateLimit(contactLimiter, phone, "[contact]");
  if (!rl.allowed) {
    return {
      success: false,
      error: "rate_limit",
      message:
        "You've submitted too many messages recently. Please wait a few minutes and try again.",
    };
  }

  // Generate reference number
  const referenceNumber = generateReferenceNumber("INQ");

  // Insert into database
  const { error: insertError } = await supabase.from("inquiries").insert({
    reference_number: referenceNumber,
    name: fullName,
    email: email || null,
    phone,
    subject: subject || null,
    message,
  });

  if (insertError) {
    console.error("[contact] inquiry insert failed:", insertError);
    Sentry.captureException(insertError, {
      
      tags: { action: "contact_submit" },
      // DO NOT include user PII (email, phone, name) — DPPA 2019 compliance
    });
    return {
      success: false,
      error: "database",
      message:
        "We couldn't save your message. Please try again or call us directly.",
    };
  }

  return { success: true, referenceNumber };
}

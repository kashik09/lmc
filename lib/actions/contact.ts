"use server";

import { contactSchema } from "@/lib/validators";
import { createClient } from "@/lib/supabase/server";
import { generateReferenceNumber } from "@/lib/utils/reference";

export type ContactResult =
  | { success: true; referenceNumber: string }
  | { success: false; error: "validation"; errors: Record<string, string[]> }
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
  const { email, fullName, phone, subject, message } = result.data;

  // Rate limit check: max 3 submissions per email in 10 minutes
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { count, error: countError } = await supabase
    .from("inquiries")
    .select("*", { count: "exact", head: true })
    .eq("email", email)
    .gte("created_at", tenMinutesAgo);

  if (countError) {
    console.error("Rate limit check failed:", countError);
    // Fail open for rate limit check errors - allow submission
  } else if (count !== null && count >= 3) {
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
    email,
    phone: phone || null,
    subject: subject || null,
    message,
  });

  if (insertError) {
    console.error("Failed to insert inquiry:", insertError);
    return {
      success: false,
      error: "database",
      message:
        "We couldn't save your message. Please try again or call us directly.",
    };
  }

  return { success: true, referenceNumber };
}

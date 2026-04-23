"use server";

import { contactSchema } from "@/lib/validators";

export type ContactResult =
  | { success: true }
  | { success: false; errors: Record<string, string[]> };

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
    return { success: false, errors };
  }

  // TODO: Insert into Supabase inquiries table in Phase 5
  console.log("Validated contact data:", result.data);

  return { success: true };
}

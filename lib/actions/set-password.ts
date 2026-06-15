"use server";

import { createClient } from "@/lib/supabase/server";
import {
  validatePasswordRules,
  checkBreachedPassword,
} from "@/lib/validators/password";

export type SetPasswordResult =
  | { success: true }
  | { success: false; error: "not_authenticated" }
  | { success: false; error: "validation"; rules: { rule: string; passed: boolean }[] }
  | { success: false; error: "breached"; message: string }
  | { success: false; error: "reused"; message: string }
  | { success: false; error: "mismatch"; message: string }
  | { success: false; error: "supabase"; message: string };

/**
 * Set password for authenticated user
 *
 * Validates against:
 * 1. Complexity rules (12 chars, upper/lower/number/symbol)
 * 2. HaveIBeenPwned breach database
 * 3. Last 5 password history
 */
export async function setPassword(
  password: string,
  confirmPassword: string
): Promise<SetPasswordResult> {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "not_authenticated" };
  }

  // Check passwords match
  if (password !== confirmPassword) {
    return { success: false, error: "mismatch", message: "Passwords do not match" };
  }

  // Validate complexity rules
  const validation = validatePasswordRules(password);
  if (!validation.valid) {
    return { success: false, error: "validation", rules: validation.rules };
  }

  // Check HaveIBeenPwned
  const isBreached = await checkBreachedPassword(password);
  if (isBreached) {
    return {
      success: false,
      error: "breached",
      message: "This password has appeared in a data breach. Please choose a different password.",
    };
  }

  // Check password history (last 5)
  // We need to hash the password the same way Supabase does to compare
  // Since we can't access Supabase's internal hashing, we'll use our own hash for history
  const passwordHash = await hashPassword(password);

  const { data: historyCheck } = await supabase.rpc("check_password_reuse", {
    p_user_id: user.id,
    p_password_hash: passwordHash,
  });

  if (historyCheck === true) {
    return {
      success: false,
      error: "reused",
      message: "This password was used recently. Please choose a different password.",
    };
  }

  // Update password in Supabase Auth
  const { error: updateError } = await supabase.auth.updateUser({
    password,
  });

  if (updateError) {
    console.error("Password update failed:", updateError);
    return {
      success: false,
      error: "supabase",
      message: updateError.message,
    };
  }

  // Add to password history
  await supabase.rpc("add_password_to_history", {
    p_user_id: user.id,
    p_password_hash: passwordHash,
  });

  return { success: true };
}

/**
 * Hash password for history comparison
 * Uses SHA-256 with a static salt (not for auth, just for history matching)
 */
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  // Add a static salt to prevent rainbow table attacks on history
  const data = encoder.encode(`lmc_history_salt_${password}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Send admin invite link to set up password
 */
export async function sendAdminInvite(
  email: string,
  role: "staff" | "admin"
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  // Check if current user is admin
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return { success: false, error: "Only admins can send invites" };
  }

  // Send invite email with magic link
  const { error } = await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/account/set-password`,
    data: {
      role,
      invited_by: user.id,
    },
  });

  if (error) {
    console.error("Invite failed:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

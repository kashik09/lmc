import { z } from "zod";

/**
 * Password Policy — matches slide requirements
 *
 * - At least 12 characters
 * - Upper + lower case, a number & a symbol
 * - Blocked if found in known-breach lists (HaveIBeenPwned)
 * - No reuse of the last 5 passwords
 */

// Password complexity regex components
const HAS_UPPERCASE = /[A-Z]/;
const HAS_LOWERCASE = /[a-z]/;
const HAS_NUMBER = /[0-9]/;
const HAS_SYMBOL = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/;

export const passwordSchema = z
  .string()
  .min(12, "Password must be at least 12 characters")
  .refine((val) => HAS_UPPERCASE.test(val), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((val) => HAS_LOWERCASE.test(val), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((val) => HAS_NUMBER.test(val), {
    message: "Password must contain at least one number",
  })
  .refine((val) => HAS_SYMBOL.test(val), {
    message: "Password must contain at least one symbol (!@#$%^&*...)",
  });

export const setPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/**
 * Validate password against all requirements
 * Returns array of failed rules for UI display
 */
export function validatePasswordRules(password: string): {
  valid: boolean;
  rules: { rule: string; passed: boolean }[];
} {
  const rules = [
    {
      rule: "At least 12 characters",
      passed: password.length >= 12,
    },
    {
      rule: "Contains uppercase letter",
      passed: HAS_UPPERCASE.test(password),
    },
    {
      rule: "Contains lowercase letter",
      passed: HAS_LOWERCASE.test(password),
    },
    {
      rule: "Contains a number",
      passed: HAS_NUMBER.test(password),
    },
    {
      rule: "Contains a symbol",
      passed: HAS_SYMBOL.test(password),
    },
  ];

  return {
    valid: rules.every((r) => r.passed),
    rules,
  };
}

/**
 * Check password against HaveIBeenPwned API
 * Uses k-anonymity model (only sends first 5 chars of SHA-1 hash)
 */
export async function checkBreachedPassword(password: string): Promise<boolean> {
  try {
    // Create SHA-1 hash of password
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-1", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();

    // Send only first 5 characters (k-anonymity)
    const prefix = hashHex.slice(0, 5);
    const suffix = hashHex.slice(5);

    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: { "Add-Padding": "true" }, // Adds fake entries to prevent timing attacks
    });

    if (!response.ok) {
      console.error("HaveIBeenPwned API error:", response.status);
      return false; // Fail open if API is down
    }

    const text = await response.text();
    const lines = text.split("\n");

    // Check if our suffix appears in the results
    for (const line of lines) {
      const [hashSuffix] = line.split(":");
      if (hashSuffix?.trim() === suffix) {
        return true; // Password has been breached
      }
    }

    return false; // Password not found in breaches
  } catch (error) {
    console.error("Breach check failed:", error);
    return false; // Fail open
  }
}

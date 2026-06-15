"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Check, X, Loader2, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { setPassword } from "@/lib/actions/set-password";
import { validatePasswordRules } from "@/lib/validators/password";

/**
 * Set Password Page
 *
 * Allows users who logged in via magic link to set a password
 * for future password-based logins.
 *
 * Validates:
 * - 12+ characters
 * - Upper + lower case
 * - Number + symbol
 * - Not in breach lists
 * - Not reused (last 5)
 */

export default function SetPasswordPage() {
  const router = useRouter();
  const [password, setPasswordValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validation = validatePasswordRules(password);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await setPassword(password, confirmPassword);

    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/reception");
      }, 2000);
      return;
    }

    // Handle errors
    switch (result.error) {
      case "not_authenticated":
        setError("You must be logged in to set a password.");
        break;
      case "mismatch":
        setError("Passwords do not match.");
        break;
      case "validation":
        setError("Password does not meet the requirements.");
        break;
      case "breached":
        setError(result.message);
        break;
      case "reused":
        setError(result.message);
        break;
      case "supabase":
        setError(result.message);
        break;
      default:
        setError("An unexpected error occurred.");
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-lmc-pageBg px-4">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-lmc-green/10">
            <Check className="h-8 w-8 text-lmc-green" />
          </div>
          <h1 className="mb-2 font-heading text-2xl font-bold text-lmc-textPrimary">
            Password Set Successfully
          </h1>
          <p className="text-lmc-textSecondary">
            You can now sign in with your email and password.
          </p>
          <p className="mt-4 text-sm text-lmc-textSecondary">
            Redirecting to inbox...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-lmc-pageBg px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-lmc-green/10">
            <Lock className="h-7 w-7 text-lmc-green" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-lmc-textPrimary">
            Set a Password
          </h1>
          <p className="mt-2 text-sm text-lmc-textSecondary">
            Create a password for faster sign-in next time
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-start gap-3 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Password field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-lmc-textPrimary"
            >
              New Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPasswordValue(e.target.value)}
                required
                className="block w-full rounded-lg border border-lmc-borderMedium bg-white px-4 py-3 pr-12 text-lmc-textPrimary focus:border-lmc-green focus:outline-none focus:ring-1 focus:ring-lmc-green"
                placeholder="••••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-lmc-textSecondary hover:text-lmc-textPrimary"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Password requirements */}
          <div className="rounded-lg border border-lmc-borderLight bg-white p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-lmc-textSecondary">
              Requirements
            </p>
            <div className="space-y-2">
              {validation.rules.map((rule, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 text-sm ${
                    rule.passed ? "text-lmc-green" : "text-lmc-textSecondary"
                  }`}
                >
                  {rule.passed ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                  <span>{rule.rule}</span>
                </div>
              ))}
              <div
                className={`flex items-center gap-2 text-sm ${
                  passwordsMatch ? "text-lmc-green" : "text-lmc-textSecondary"
                }`}
              >
                {passwordsMatch ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <X className="h-4 w-4" />
                )}
                <span>Passwords match</span>
              </div>
            </div>
          </div>

          {/* Confirm password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-lmc-textPrimary"
            >
              Confirm Password
            </label>
            <div className="relative mt-1">
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="block w-full rounded-lg border border-lmc-borderMedium bg-white px-4 py-3 pr-12 text-lmc-textPrimary focus:border-lmc-green focus:outline-none focus:ring-1 focus:ring-lmc-green"
                placeholder="••••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-lmc-textSecondary hover:text-lmc-textPrimary"
              >
                {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !validation.valid || !passwordsMatch}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-lmc-green px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-lmc-greenDark disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Setting password...
              </>
            ) : (
              "Set Password"
            )}
          </button>

          <p className="text-center text-xs text-lmc-textSecondary">
            Password must not have appeared in known data breaches
            and cannot reuse your last 5 passwords.
          </p>
        </form>
      </div>
    </div>
  );
}

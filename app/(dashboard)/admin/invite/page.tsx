"use client";

import { useState } from "react";
import { UserPlus, Loader2, Check, AlertTriangle, Mail } from "lucide-react";
import { sendAdminInvite } from "@/lib/actions/set-password";

/**
 * Admin Invite Page
 *
 * Allows admins to send one-time setup links to new staff members.
 * The invited user receives an email with a magic link that:
 * 1. Creates their account
 * 2. Redirects them to set-password page
 */

export default function AdminInvitePage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"staff" | "admin">("staff");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const result = await sendAdminInvite(email, role);

    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setEmail("");
    } else {
      setError(result.error || "Failed to send invite");
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-8">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-lmc-green/10">
          <UserPlus className="h-7 w-7 text-lmc-green" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-lmc-textPrimary">
          Invite Staff Member
        </h1>
        <p className="mt-2 text-lmc-textSecondary">
          Send a one-time setup link to add a new staff member or admin.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="flex items-start gap-3 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-start gap-3 rounded-lg bg-green-50 p-4 text-sm text-green-700">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <span>Invite sent successfully! They will receive an email with setup instructions.</span>
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-lmc-textPrimary"
          >
            Email Address
          </label>
          <div className="relative mt-1">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full rounded-lg border border-lmc-borderMedium bg-white px-4 py-3 pl-11 text-lmc-textPrimary focus:border-lmc-green focus:outline-none focus:ring-1 focus:ring-lmc-green"
              placeholder="staff@lmc.co.ug"
            />
            <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-lmc-textSecondary" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-lmc-textPrimary">
            Role
          </label>
          <div className="mt-2 flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="staff"
                checked={role === "staff"}
                onChange={() => setRole("staff")}
                className="h-4 w-4 border-lmc-borderMedium text-lmc-green focus:ring-lmc-green"
              />
              <span className="text-sm text-lmc-textPrimary">Staff</span>
              <span className="text-xs text-lmc-textSecondary">
                (Reception inbox, roster access)
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
                className="h-4 w-4 border-lmc-borderMedium text-lmc-green focus:ring-lmc-green"
              />
              <span className="text-sm text-lmc-textPrimary">Admin</span>
              <span className="text-xs text-lmc-textSecondary">
                (Full access + invite others)
              </span>
            </label>
          </div>
        </div>

        <div className="rounded-lg border border-lmc-borderLight bg-white p-4">
          <p className="text-sm text-lmc-textSecondary">
            <strong className="text-lmc-textPrimary">What happens:</strong>
          </p>
          <ol className="mt-2 list-inside list-decimal space-y-1 text-sm text-lmc-textSecondary">
            <li>User receives an email with a secure setup link</li>
            <li>Clicking the link creates their account and logs them in</li>
            <li>They are redirected to set a password</li>
            <li>Their profile is created with the selected role</li>
          </ol>
        </div>

        <button
          type="submit"
          disabled={loading || !email}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-lmc-green px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-lmc-greenDark disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending invite...
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              Send Invite
            </>
          )}
        </button>
      </form>
    </div>
  );
}

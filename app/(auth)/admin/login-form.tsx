"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Loader2, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isAllowedRedirect } from "@/lib/utils/redirect";

type AuthMode = "magic" | "password";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get("redirect");
  const authError = searchParams.get("error");

  const [mode, setMode] = useState<AuthMode>("magic");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    authError === "auth_failed" ? "Authentication failed. Please try again." : null
  );
  const [loading, setLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const redirectTo =
    rawRedirect && isAllowedRedirect(rawRedirect, typeof window !== "undefined" ? window.location.host : "")
      ? rawRedirect
      : "/reception";

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMagicLinkSent(true);
  }

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Log the login with IP security analysis
    try {
      const logRes = await fetch("/api/auth/log-login", { method: "POST" });
      const logData = await logRes.json();

      // Redirect with warning if suspicious
      if (logData.suspicious) {
        router.push(`${redirectTo}?security_warning=1`);
      } else {
        router.push(redirectTo);
      }
    } catch {
      // Don't block login if logging fails
      router.push(redirectTo);
    }

    router.refresh();
  }

  // Success state after magic link sent
  if (magicLinkSent) {
    return (
      <div className="w-full max-w-sm space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lmc-green/10">
          <CheckCircle className="h-8 w-8 text-lmc-green" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold text-lmc-textPrimary">
            Check your email
          </h1>
          <p className="mt-2 text-sm text-lmc-textSecondary">
            We sent a login link to <strong className="text-lmc-textPrimary">{email}</strong>
          </p>
        </div>
        <p className="text-xs text-lmc-textSecondary">
          Click the link in your email to sign in. The link expires in 1 hour.
        </p>
        <button
          onClick={() => {
            setMagicLinkSent(false);
            setEmail("");
          }}
          className="text-sm text-lmc-green hover:underline"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="text-center">
        <h1 className="font-heading text-2xl font-bold text-lmc-textPrimary">
          Staff Portal
        </h1>
        <p className="mt-2 text-sm text-lmc-textSecondary">
          Sign in to access the reception inbox
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex rounded-lg border border-lmc-borderLight bg-lmc-pageBg p-1">
        <button
          type="button"
          onClick={() => setMode("magic")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            mode === "magic"
              ? "bg-white text-lmc-textPrimary shadow-sm"
              : "text-lmc-textSecondary hover:text-lmc-textPrimary"
          }`}
        >
          <Mail className="h-4 w-4" />
          Magic Link
        </button>
        <button
          type="button"
          onClick={() => setMode("password")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            mode === "password"
              ? "bg-white text-lmc-textPrimary shadow-sm"
              : "text-lmc-textSecondary hover:text-lmc-textPrimary"
          }`}
        >
          <Lock className="h-4 w-4" />
          Password
        </button>
      </div>

      <form
        onSubmit={mode === "magic" ? handleMagicLink : handlePassword}
        className="space-y-4"
      >
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-lmc-textPrimary"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-lmc-borderMedium bg-white px-3 py-2.5 text-lmc-textPrimary placeholder:text-lmc-textSecondary focus:border-lmc-green focus:outline-none focus:ring-1 focus:ring-lmc-green"
            placeholder="you@lmc.co.ug"
          />
        </div>

        {mode === "password" && (
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-lmc-textPrimary"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-lmc-borderMedium bg-white px-3 py-2.5 text-lmc-textPrimary placeholder:text-lmc-textSecondary focus:border-lmc-green focus:outline-none focus:ring-1 focus:ring-lmc-green"
              placeholder="••••••••"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-lmc-green px-4 py-2.5 text-sm font-medium text-white hover:bg-lmc-greenDark disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {mode === "magic" ? "Sending link..." : "Signing in..."}
            </>
          ) : mode === "magic" ? (
            "Send magic link"
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      {mode === "magic" && (
        <p className="text-center text-xs text-lmc-textSecondary">
          We&apos;ll email you a secure link to sign in instantly — no password needed.
        </p>
      )}
    </div>
  );
}

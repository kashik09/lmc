"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const CONSENT_KEY = "lmc-cookie-consent";

export type ConsentValue = "accepted" | "rejected" | "custom";

export interface CookiePreferences {
  essential: boolean; // Always true
  analytics: boolean;
  functional: boolean;
}

function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CONSENT_KEY) as ConsentValue | null;
}

function getStoredPreferences(): CookiePreferences {
  if (typeof window === "undefined") {
    return { essential: true, analytics: false, functional: false };
  }
  const stored = localStorage.getItem(`${CONSENT_KEY}-preferences`);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Fall through to default
    }
  }
  return { essential: true, analytics: false, functional: false };
}

function setStoredConsent(value: ConsentValue, preferences: CookiePreferences) {
  localStorage.setItem(CONSENT_KEY, value);
  localStorage.setItem(`${CONSENT_KEY}-preferences`, JSON.stringify(preferences));
  // Dispatch event for analytics script to react
  window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: { value, preferences } }));
}

export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  const consent = getStoredConsent();
  if (consent === "accepted") return true;
  if (consent === "rejected") return false;
  if (consent === "custom") {
    const prefs = getStoredPreferences();
    return prefs.analytics;
  }
  return false;
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    functional: false,
  });

  useEffect(() => {
    // Initialize from localStorage on mount - standard hydration pattern
    const consent = getStoredConsent();
    if (!consent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowBanner(true);
    } else {
      setPreferences(getStoredPreferences());
    }

    // Listen for footer button click to open preferences modal
    const handleOpenPreferences = () => {
      setPreferences(getStoredPreferences());
      setShowModal(true);
    };
    window.addEventListener("open-cookie-preferences", handleOpenPreferences);
    return () => {
      window.removeEventListener("open-cookie-preferences", handleOpenPreferences);
    };
  }, []);

  const acceptAll = useCallback(() => {
    const prefs = { essential: true, analytics: true, functional: true };
    setStoredConsent("accepted", prefs);
    setPreferences(prefs);
    setShowBanner(false);
    setShowModal(false);
  }, []);

  const rejectNonEssential = useCallback(() => {
    const prefs = { essential: true, analytics: false, functional: false };
    setStoredConsent("rejected", prefs);
    setPreferences(prefs);
    setShowBanner(false);
    setShowModal(false);
  }, []);

  const savePreferences = useCallback(() => {
    setStoredConsent("custom", preferences);
    setShowBanner(false);
    setShowModal(false);
  }, [preferences]);

  const openPreferences = useCallback(() => {
    setPreferences(getStoredPreferences());
    setShowModal(true);
  }, []);

  if (!showBanner && !showModal) return null;

  return (
    <>
      {/* Banner */}
      {showBanner && !showModal && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card p-4 shadow-lg md:p-6">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 md:flex-row md:justify-between">
            <div className="flex-1 text-center md:text-left">
              <p className="text-sm text-card-foreground">
                We use essential cookies for site functionality and optional
                cookies for analytics. See our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                for details.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={acceptAll}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-dark"
              >
                Accept all
              </button>
              <button
                onClick={rejectNonEssential}
                className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground transition-colors hover:bg-muted"
              >
                Reject non-essential
              </button>
              <button
                onClick={openPreferences}
                className="text-sm text-muted-foreground underline hover:text-card-foreground"
              >
                Cookie Preferences
              </button>
            </div>
            <button
              onClick={rejectNonEssential}
              className="absolute right-2 top-2 p-1 text-muted-foreground hover:text-card-foreground md:static"
              aria-label="Close cookie banner"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold text-card-foreground">
                Cookie Preferences
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 text-muted-foreground hover:text-card-foreground"
                aria-label="Close preferences"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Essential Cookies */}
              <div className="flex items-center justify-between rounded-md border border-border bg-muted/50 p-3">
                <div>
                  <p className="font-medium text-card-foreground">
                    Essential Cookies
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Required for site functionality. Cannot be disabled.
                  </p>
                </div>
                <div className="flex h-6 w-11 items-center rounded-full bg-primary px-1">
                  <div className="h-4 w-4 translate-x-5 rounded-full bg-white" />
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-center justify-between rounded-md border border-border p-3">
                <div>
                  <p className="font-medium text-card-foreground">
                    Analytics Cookies
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Cloudflare Web Analytics (privacy-friendly).
                  </p>
                </div>
                <button
                  onClick={() =>
                    setPreferences((p) => ({ ...p, analytics: !p.analytics }))
                  }
                  className={`flex h-6 w-11 items-center rounded-full px-1 transition-colors ${
                    preferences.analytics ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  aria-label="Toggle analytics cookies"
                >
                  <div
                    className={`h-4 w-4 rounded-full bg-white transition-transform ${
                      preferences.analytics ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Functional Cookies */}
              <div className="flex items-center justify-between rounded-md border border-border p-3">
                <div>
                  <p className="font-medium text-card-foreground">
                    Functional Cookies
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Enhanced features (placeholder for future use).
                  </p>
                </div>
                <button
                  onClick={() =>
                    setPreferences((p) => ({ ...p, functional: !p.functional }))
                  }
                  className={`flex h-6 w-11 items-center rounded-full px-1 transition-colors ${
                    preferences.functional ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  aria-label="Toggle functional cookies"
                >
                  <div
                    className={`h-4 w-4 rounded-full bg-white transition-transform ${
                      preferences.functional ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={savePreferences}
                className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-dark"
              >
                Save preferences
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground transition-colors hover:bg-muted"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Separate component for footer link to open preferences
export function CookiePreferencesButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Standard hydration pattern for client-only rendering
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const openPreferences = () => {
    // Dispatch custom event to open the modal
    window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
  };

  if (!mounted) return null;

  return (
    <button
      onClick={openPreferences}
      className="text-sm text-muted-foreground hover:text-primary"
    >
      Cookie Preferences
    </button>
  );
}

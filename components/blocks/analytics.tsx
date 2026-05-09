"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Script from "next/script";

const CONSENT_KEY = "lmc-cookie-consent";

function getSnapshot(): boolean {
  const consent = localStorage.getItem(CONSENT_KEY);
  if (consent === "accepted") return true;
  if (consent === "rejected") return false;
  if (consent === "custom") {
    const prefsStr = localStorage.getItem(`${CONSENT_KEY}-preferences`);
    if (prefsStr) {
      try {
        const prefs = JSON.parse(prefsStr);
        return prefs.analytics === true;
      } catch {
        return false;
      }
    }
  }
  return false;
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("cookie-consent-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("cookie-consent-change", callback);
    window.removeEventListener("storage", callback);
  };
}

export function AnalyticsScript() {
  const shouldLoad = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const token = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // This is the standard pattern for client-only rendering to avoid hydration mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted || !token || !shouldLoad) return null;

  return (
    <Script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={`{"token": "${token}"}`}
      strategy="afterInteractive"
    />
  );
}

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Conservative sample rates for free tier (5K errors/10K spans per month).
  // Errors are sampled at 100%, performance traces at 10%.
  tracesSampleRate: 0.1,

  // Disable Session Replay — healthcare context, do not record patient input.
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,

  // Don't send PII fields automatically — we'll add specific context manually.
  sendDefaultPii: false,

  // Only run in production. In dev, Sentry is noisy and uses quota.
  enabled: process.env.NODE_ENV === "production",

  environment: process.env.NODE_ENV,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

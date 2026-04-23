# Error Monitoring Options

Comparison of error tracking solutions for the Lifeline Medical Centre site.

## Option 1: Sentry

**Website:** https://sentry.io

**Pros:**
- Industry standard, battle-tested
- Generous free tier (5K errors/month, 10K performance units)
- Excellent stack traces with source maps
- Session replay (paid)
- React/Next.js SDK with automatic instrumentation
- Issue grouping and assignment
- Slack/email alerts

**Cons:**
- Heavy SDK (~30KB gzipped)
- Can impact bundle size noticeably
- Complex setup for full features
- Privacy concerns (sends data to third party)

**Best for:** Teams that need full observability and don't mind SDK weight.

---

## Option 2: Axiom

**Website:** https://axiom.co

**Pros:**
- Vercel-native integration (one click)
- Lightweight SDK
- Combines logs + traces + errors
- Generous free tier (500GB ingest/month)
- Fast query interface
- Good for Next.js edge functions

**Cons:**
- Less mature than Sentry
- Fewer integrations (Slack works, others limited)
- Error grouping not as sophisticated
- Smaller community

**Best for:** Vercel-deployed sites wanting simple, low-overhead monitoring.

---

## Option 3: Better Stack (formerly Logtail)

**Website:** https://betterstack.com

**Pros:**
- Uptime monitoring + error tracking in one
- Clean dashboard
- Good Vercel integration
- Reasonable free tier
- Incident management built in

**Cons:**
- Less focus on error details vs uptime
- Smaller ecosystem
- Source maps support is basic

**Best for:** Sites prioritizing uptime alerts with basic error visibility.

---

## Option 4: Log-based only (Vercel Logs)

**Website:** N/A (built into Vercel dashboard)

**Pros:**
- Zero additional cost
- Zero additional SDK
- Zero additional complexity
- Logs available in Vercel dashboard
- Can export to external storage

**Cons:**
- No alerting (must check manually)
- Logs rotate/expire
- No error grouping or trends
- No stack traces with context
- No session context

**Best for:** Low-traffic sites where manual log checking is acceptable.

---

## Recommendation Matrix

| Criteria | Sentry | Axiom | Better Stack | Logs Only |
|----------|--------|-------|--------------|-----------|
| Setup effort | Medium | Low | Low | None |
| Bundle impact | High | Low | Low | None |
| Error detail | Excellent | Good | Basic | Raw |
| Alerting | Yes | Yes | Yes | No |
| Free tier | Good | Great | Good | Unlimited |
| Vercel native | No | Yes | Yes | Yes |

---

## Decision

**Pending.** Owner to select based on:

1. Is bundle size a concern? (If yes: Axiom or logs-only)
2. Need proactive alerts? (If yes: not logs-only)
3. Need detailed stack traces? (If yes: Sentry)
4. Want uptime monitoring too? (If yes: Better Stack)

Update this document with selection and rationale.

---

## Selected Option

- [ ] Sentry
- [ ] Axiom
- [ ] Better Stack
- [ ] Logs only

**Rationale:** _________________

**Date decided:** _________________

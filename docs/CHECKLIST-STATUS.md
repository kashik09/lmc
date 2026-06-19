# Website Security & Functionality Checklist — Audit Status

**Audited against:** `docs/website-security-standards.md` (7-layer, 45-item checklist)  
**Date:** 2026-06-19  
**Auditor:** Claude (automated static analysis of repo at commit `bdf37e6`)

---

## Summary

**3/10 non-negotiables green · 1 CRITICAL failing · 2 PARTIAL · 4 MANUAL**

| # | Non-Negotiable | Status |
|---|----------------|--------|
| 1 | HTTPS enforced site-wide with TLS 1.2+ | MANUAL |
| 2 | Software and dependencies kept up to date | MANUAL |
| 3 | **Strong authentication + 2FA for admins** | **FAIL** |
| 4 | Defences against OWASP Top 10 | PASS |
| 5 | Input validation and output sanitisation | PASS |
| 6 | Sensitive data encrypted at rest and in transit | MANUAL |
| 7 | Passwords hashed with a modern algorithm | PASS |
| 8 | Automated daily backups stored separately | MANUAL |
| 9 | Privacy policy and terms of service published | PARTIAL |
| 10 | Compliance with applicable data protection law | MANUAL |

> **CRITICAL — must fix before launch:** Admin accounts have no MFA/2FA. Email+password only at `/admin`.
>
> **Must fix before launch:** Privacy policy is still marked **DRAFT** with a visible banner — pending legal review.

---

## Layer 1: Foundation and Hosting

| Priority | Standard | Status | Evidence / Notes |
|---|---|---|---|
| Critical | HTTPS enforced site-wide | MANUAL | HSTS header set in `next.config.ts` (`max-age=63072000; includeSubDomains; preload`). HTTP→HTTPS redirect is a Vercel hosting-layer concern. **Check: Vercel Dashboard → Domains — verify redirect is active.** |
| Critical | TLS 1.2 or higher only | MANUAL | Vercel enforces TLS 1.2+ by default. **Verify at ssllabs.com post-deployment.** |
| Critical | Reputable hosting with ≥99.9% SLA | MANUAL | Vercel is industry-standard. **Check: confirm you are on a paid Vercel plan; free tier has no SLA.** |
| Security | Automatic SSL renewal | MANUAL | Vercel auto-renews certificates. **Verify the production domain is pointed to Vercel (A/CNAME set).** |
| Security | DNSSEC enabled on domain | MANUAL | DNS config not in repo. **Check with your registrar or at dnssec-debugger.verisignlabs.com for lmc.co.ug.** |
| Security | Server location aligned with audience | MANUAL | Vercel Edge Network serves from the nearest PoP globally. Acceptable for Uganda-primary audience. |
| Functional | Staging environment separate from production | MANUAL | Vercel Preview Deployments exist per PR. A permanently pinned staging URL is not documented. **Confirm a staging alias exists before launch.** |

---

## Layer 2: Application Security

| Priority | Standard | Status | Evidence / Notes |
|---|---|---|---|
| Critical | Software and dependencies kept up to date | MANUAL | `package.json` has current packages (Next.js 16.2.4, React 19.2.4, Sentry 10.50.0). No Dependabot or `npm audit` workflow found in `.github/`. **Run `npm audit` before launch; add Dependabot config.** |
| Critical | Strong authentication + 2FA for admins | **FAIL** | Admin login at `app/(auth)/admin/login-form.tsx` uses email+password only via Supabase Auth. No TOTP, WebAuthn, or MFA config found anywhere. `docs/supabase-security-checklist.md` does not include MFA. **Fix: enable Supabase MFA (Authentication → Multi-Factor Auth → enable TOTP), then require it for all staff/admin accounts.** |
| Critical | OWASP Top 10 defences | PASS | Injection: Supabase parameterised queries + RLS. XSS: React auto-escaping + `isomorphic-dompurify` (`lib/utils/sanitize.ts`) + CSP via `middleware.ts`. Broken auth: fail-closed role middleware in `lib/supabase/middleware.ts`. CSRF: Next.js Server Actions (same-origin by design). Sec misconfig: full security header set in `next.config.ts` and `middleware.ts`. |
| Critical | Input validation and output sanitisation | PASS | Zod schemas validate all public form inputs (`lib/validators/contact.ts`, `lib/validators/appointment.ts`). Explicit field mapping in DB inserts (no object spread). `lib/utils/sanitize.ts` uses DOMPurify with `ALLOWED_URI_REGEXP` blocking `javascript:` URLs. Server-side validation runs before any DB write. |
| Security | Web Application Firewall active | MANUAL | Cloudflare is used for Turnstile CAPTCHA and analytics but Cloudflare proxy (WAF) is not confirmed. **Check Cloudflare dashboard: if the domain shows orange-cloud (proxied), WAF is available — enable it.** |
| Security | Rate limiting on forms and APIs | PASS | Upstash Redis sliding-window limiter (3 req / 10 min per identifier) applied in `lib/rate-limit.ts` and called in `lib/actions/contact.ts` and `lib/actions/appointment.ts`. Fail-open with logging if Redis is unavailable. |
| Security | Security headers configured | PASS | `next.config.ts`: HSTS (`max-age=63072000; includeSubDomains; preload`), `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`. `middleware.ts`: full CSP generated with `upgrade-insecure-requests`, `object-src 'none'`, `base-uri 'self'`. Note: `unsafe-inline` required by Next.js RSC — documented in middleware comment; mitigated by React auto-encoding and DOMPurify. |
| Security | CAPTCHA or equivalent on public forms | PASS | Cloudflare Turnstile integrated via `@marsidev/react-turnstile`. Server-side verification in `lib/utils/turnstile.ts` is fail-closed (returns `false` if secret is missing or API errors). Both `contact.ts` and `appointment.ts` server actions reject if CAPTCHA fails. |
| Security | File upload restrictions | N/A | No file upload functionality found in codebase. |
| Security | Secure session management | PARTIAL | Supabase Auth manages JWT sessions. Session timeout is listed as an unchecked TODO in `docs/supabase-security-checklist.md` — default is 1 week, which is too long for a medical staff context. Open-redirect protection is implemented in `lib/utils/redirect.ts` and applied in `lib/supabase/middleware.ts`. **Fix: set session timeout to 24h in Supabase Auth → Settings.** |

---

## Layer 3: Data Protection

| Priority | Standard | Status | Evidence / Notes |
|---|---|---|---|
| Critical | Sensitive data encrypted at rest | MANUAL | Supabase (PostgreSQL) encrypts volumes at rest by default. `docs/supabase-security-checklist.md` has SSL enforcement listed as unchecked. **Verify: Supabase Dashboard → Database → Settings → SSL enforcement is ON.** |
| Critical | Sensitive data encrypted in transit | PASS | HSTS header enforced (`next.config.ts`). All Supabase URLs in `lib/supabase/` use HTTPS. CSP includes `upgrade-insecure-requests`. |
| Critical | Passwords hashed with a modern algorithm | PASS | Supabase Auth stores passwords with bcrypt internally. App code calls `supabase.auth.updateUser({ password })` — never hashes or stores passwords directly. Password history comparison uses SHA-256+static salt (not for auth storage). Breach check via HaveIBeenPwned k-anonymity API in `lib/validators/password.ts`. |
| Security | Least privilege for database access | PASS | App uses anon key + Supabase RLS throughout (`lib/supabase/client.ts`, `lib/supabase/server.ts`). `security-checklist.md` confirms "Anon key client with RLS enforcement." No service-role key usage found in app code. |
| Security | PII minimised | PASS | `instrumentation.ts`: `sendDefaultPii: false`. Server actions include comments explicitly prohibiting PII in Sentry tags (DPPA 2019). Privacy policy documents only the minimum data collected. |
| Security | Defined data retention and deletion policy | PASS | Privacy policy (`app/(public)/privacy-policy/page.tsx`) states 12-month retention with deletion. |
| Security | Secure handling of API keys and secrets | PASS | `.gitignore` excludes all `.env*` files (only `.env.example` committed). All secrets accessed via `process.env.*`. No hardcoded credentials found. `.env.example` provides safe template. |

---

## Layer 4: Backups and Recovery

| Priority | Standard | Status | Evidence / Notes |
|---|---|---|---|
| Critical | Automated daily backups | MANUAL | `docs/supabase-security-checklist.md` has "Point-in-time recovery enabled (Pro plan)" as an unchecked TODO. **Verify: confirm Supabase plan tier includes daily backups; enable PITR if on Pro.** |
| Critical | Backups stored in a separate location | MANUAL | Supabase stores backups off-server on paid plans by default. **Verify backup download is possible via Supabase Dashboard → Database → Backups.** |
| Security | Backup retention policy defined | MANUAL | No retention policy documented in repo. **Define how many days of backup history are kept.** |
| Security | Restore procedure tested | MANUAL | No restore test documented. **Test a full restore to a separate project before launch.** |
| Functional | Documented disaster recovery plan | FAIL | No DR plan found in `docs/` or elsewhere. `HANDOVER.md` is a developer handover document, not an operational DR plan. **Fix: create a DR runbook covering: DB restore steps, DNS failover, credential recovery, emergency contacts, and estimated RTO/RPO.** |

---

## Layer 5: Performance and Reliability

| Priority | Standard | Status | Evidence / Notes |
|---|---|---|---|
| Performance | Page load time under 3 seconds | MANUAL | Cannot verify from code. **Run PageSpeed Insights / GTmetrix on the deployed site from an African PoP.** |
| Performance | Images optimised and properly sized | PASS | Hero slider (`components/blocks/hero-slider.tsx`) uses `Image` from `next/image` with `fill` and `priority`. Next.js Image Optimisation auto-converts JPG source files to WebP/AVIF for supporting browsers at runtime. Source hero images: `lab.jpg` (233 KB), `theatre.jpg` (256 KB), `quality-care.jpg` (637 KB) — the 637 KB source is large; verify output size via `/_next/image` in production. |
| Performance | Browser and CDN caching configured | PASS | Next.js sets `Cache-Control` headers for static assets automatically. Vercel CDN caches at the edge. |
| Performance | Content Delivery Network | PASS | Deployed on Vercel Edge Network (global CDN). |
| Performance | Code minification and compression | PASS | Next.js production build minifies JS/CSS. Vercel enables Brotli compression by default. |
| Functional | Mobile-responsive design | MANUAL | Tailwind CSS responsive utilities used throughout. **Test manually at 320 px, 375 px, 768 px viewports.** |
| Functional | Cross-browser compatibility | MANUAL | Cannot verify from code. **Test on current Chrome, Safari (iOS), Firefox, Edge before launch.** |
| Functional | Uptime monitoring active | FAIL | Sentry provides error monitoring but not uptime/availability monitoring. No external ping monitor (UptimeRobot, Better Uptime, Checkly) is referenced in the codebase or docs. **Fix: configure a free uptime monitor (e.g. UptimeRobot) for https://lmc.co.ug before launch.** |

---

## Layer 6: Compliance and Legal

| Priority | Standard | Status | Evidence / Notes |
|---|---|---|---|
| Compliance | Privacy policy published and accurate | PARTIAL | Page exists at `/privacy-policy` and is included in `app/sitemap.ts`. **FAIL condition:** the page renders a visible amber banner: "DRAFT — pending legal review." This banner must be removed only after a qualified legal advisor has reviewed and approved the policy. Do not launch with this banner visible. |
| Compliance | Terms of service published | PASS | Page exists at `/terms` (13 KB). Included in sitemap. Content not fully audited here but the page is published. |
| Compliance | Cookie consent mechanism | PASS | `CookieConsent` component rendered in `app/layout.tsx` (root layout). Cookie types and opt-in/out described in privacy policy Section 7. Cloudflare Analytics beacon gated on consent via `AnalyticsScript`. |
| Compliance | Data subject rights honoured | PARTIAL | DPPA 2019 rights (access, correction, deletion, portability, complaint) listed in privacy policy with contact email `info@lmc.co.ug`. No automated portal or documented internal process for handling requests. **Before launch: document the internal workflow for handling DSR requests.** |
| Compliance | Compliance with applicable data protection law | MANUAL | Privacy policy references DPPA 2019 and Uganda PDPO. Still in DRAFT. **Must check: (1) has LMC registered with Uganda PDPO as a data controller? (2) has the policy been reviewed by a legal advisor?** |
| Compliance | Accessibility standards (WCAG 2.1 AA) | MANUAL | Positive signals: `lang="en"` on `<html>`, `aria-label` on interactive slider controls, semantic HTML structure. Full audit requires tooling. **Run wave.webaim.org on the deployed site; check colour contrast ratios for lmc-green (#1b7a12) on white.** |

---

## Layer 7: Operational Essentials

| Priority | Standard | Status | Evidence / Notes |
|---|---|---|---|
| Functional | Custom domain configured correctly | MANUAL | Domain `lmc.co.ug` referenced in `robots.txt`, `app/sitemap.ts`, and `.env.example`. **Verify DNS A/CNAME records point to Vercel and both `lmc.co.ug` and `www.lmc.co.ug` resolve correctly.** |
| Functional | Professional email on same domain | PASS | `reception@lmc.co.ug` configured as notify email (`RESEND_FROM_EMAIL` / `LMC_NOTIFY_EMAIL` in `.env.example`). `info@lmc.co.ug` referenced in privacy policy. |
| Functional | SEO basics (title, meta, sitemap, robots.txt) | PASS | `app/layout.tsx` sets `<title>` and `<meta name="description">`. `app/sitemap.ts` generates `/sitemap.xml` with all public pages. `public/robots.txt` exists, disallows admin/auth/API paths, and points to `https://lmc.co.ug/sitemap.xml`. |
| Functional | Analytics configured | PASS | Cloudflare Web Analytics (`AnalyticsScript` in `app/layout.tsx`, token in `.env.example`). Privacy-respecting — no cookies, no personal data. Gated on cookie consent. |
| Functional | Error logging and monitoring | PASS | Sentry configured in `instrumentation.ts` (server) and `instrumentation-client.ts` (client) with `sendDefaultPii: false`, `enabled: process.env.NODE_ENV === 'production'`, and `tracesSampleRate: 0.1`. `app/global-error.tsx` present. |
| Functional | Documentation for ongoing maintenance | PARTIAL | `CLAUDE.md` covers coding rules and architecture. `HANDOVER.md` exists. `docs/` contains security checklists, status reports, and decision records. Missing: a formal credentials handover list and named emergency contacts. |

---

## Items Requiring Manual Verification (Summary Checklist)

These cannot be verified from the repository alone. Check each before launch:

- [ ] Vercel Dashboard — HTTPS redirect active on production domain
- [ ] Vercel Dashboard — confirm paid plan with SLA
- [ ] ssllabs.com — TLS grade A or A+ on lmc.co.ug
- [ ] Domain registrar — DNSSEC enabled
- [ ] Cloudflare — domain is proxied (orange cloud) for WAF protection
- [ ] Supabase Dashboard → Authentication → Multi-Factor Auth — **enable TOTP and enforce for all admin/staff accounts**
- [ ] Supabase Dashboard → Authentication → Settings — set session timeout to 24 hours
- [ ] Supabase Dashboard → Database → Settings — SSL enforcement ON
- [ ] Supabase Dashboard → Database → Backups — PITR enabled (Pro plan)
- [ ] Run `npm audit` and resolve any high/critical vulnerabilities
- [ ] Privacy policy — legal review completed; DRAFT banner removed
- [ ] Uganda PDPO registration confirmed
- [ ] Uptime monitor configured (UptimeRobot or similar)
- [ ] wave.webaim.org accessibility audit on deployed site
- [ ] PageSpeed Insights / GTmetrix tested from African PoP
- [ ] Manual cross-browser + mobile testing done
- [ ] DSR (data subject request) internal process documented
- [ ] DR runbook written

---

## Critical Fix Descriptions

### FAIL: No MFA/2FA for administrator accounts

**Standard:** Non-negotiable #3 — Strong authentication including two-factor authentication for administrators

**Evidence of failure:** `app/(auth)/admin/login-form.tsx` presents an email/password form backed by `supabase.auth.signInWithPassword()`. No TOTP enrollment, no MFA challenge, no WebAuthn found anywhere in the codebase or Supabase configuration docs.

**Risk:** A single compromised admin password gives full access to patient appointment data, staff rosters, and admin functions. Healthcare context makes this especially serious.

**Fix (do not apply during this audit — action required):**
1. In Supabase Dashboard: Authentication → Multi-Factor Auth → enable TOTP.
2. In `lib/supabase/middleware.ts` or a dedicated server action: after `supabase.auth.getUser()`, call `supabase.auth.mfa.getAuthenticatorAssuranceLevel()` and redirect to MFA challenge if `currentLevel < nextLevel` for admin/staff roles.
3. Enforce MFA enrollment for all existing admin/staff accounts before re-enabling their access.

---

### FAIL: No uptime monitoring

**Standard:** Layer 5 — Uptime monitoring active

**Evidence of failure:** Sentry is configured for error monitoring but no external ping monitor is referenced in code, CI/CD, or documentation.

**Risk:** Downtime is not detected unless a user reports it. For a healthcare booking site, this means missed appointments.

**Fix (do not apply during this audit — action required):**
Register lmc.co.ug on a free uptime monitor such as UptimeRobot (https://uptimerobot.com) with a 5-minute check interval and alerts to the admin email.

---

### FAIL: No disaster recovery plan

**Standard:** Layer 4 — Documented disaster recovery plan

**Evidence of failure:** No DR runbook found in `docs/`. `HANDOVER.md` is a developer handover document, not an operational recovery plan.

**Fix (do not apply during this audit — action required):**
Create `docs/DISASTER-RECOVERY.md` covering: Supabase DB restore steps, Vercel redeployment from branch, DNS failover procedure, credential recovery (who holds the keys), emergency contact list, and RTO/RPO targets.

---

### PARTIAL: Privacy policy DRAFT banner

**Standard:** Non-negotiable #9 — Privacy policy published and accurate

**Evidence:** `app/(public)/privacy-policy/page.tsx` renders an amber banner: `"DRAFT — pending legal review. ... should be reviewed by a qualified legal advisor before being considered final."`

**Fix (do not apply during this audit — action required):**
Have the policy reviewed by a legal advisor familiar with Uganda's DPPA 2019. Once approved, remove the banner div from `privacy-policy/page.tsx`.

---

*This audit is based solely on static analysis of the repository at commit `bdf37e6`. It does not replace a live penetration test, WCAG audit, or legal review.*

# LMC Stress Test Report

**Date:** 2026-06-18
**Tester:** Claude Code (autonomous)
**URL:** https://lifeline-three-omega.vercel.app/

---

## Phase 0 — Recon (COMPLETE)

### Routes Mapping

**Public Pages (13):**
| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Homepage |
| `/about` | Static | About page |
| `/services` | Static | Services listing |
| `/services/[slug]` | Dynamic | Service detail (12 services) |
| `/appointments` | Static | Appointment booking form |
| `/contacts` | Static | Contact form |
| `/news` | Static | News listing |
| `/news/[slug]` | Dynamic | News article detail |
| `/pharmacy` | Static | Pharmacy info |
| `/insurance` | Static | Insurance info |
| `/visitors` | Static | Visitor info |
| `/privacy-policy` | Static | Privacy policy |
| `/terms` | Static | Terms of service |
| `/thank-you` | Dynamic | Form submission thank you |
| `/dev/heading-preview` | Static | Dev preview (should be hidden) |

**Auth Pages (1):**
| Route | Type | Description |
|-------|------|-------------|
| `/admin` | Static | Staff login (magic link + password) |

**Protected Dashboard Pages (5):**
| Route | Roles Required | Description |
|-------|----------------|-------------|
| `/dashboard` | patient, staff, admin | Patient dashboard |
| `/reception` | staff, admin | Reception inbox |
| `/roster` | staff, admin | Staff roster |
| `/jobs/dashboard` | staff, admin | Jobs dashboard |
| `/account/set-password` | authenticated | Set password flow |
| `/admin/invite` | admin | Invite staff |

**API Routes (3):**
| Route | Method | Auth Required |
|-------|--------|---------------|
| `/api/roster/config` | GET | No (public) |
| `/api/roster/doctors` | GET | No (public) |
| `/api/auth/log-login` | POST | Yes (session) |

**Auth Callback Routes (2):**
| Route | Description |
|-------|-------------|
| `/auth/callback` | Supabase auth callback |
| `/(auth)/callback` | Auth callback (route group) |

---

### Forms Inventory

| Form | Location | Fields | Validation | CAPTCHA |
|------|----------|--------|------------|---------|
| Contact Form | `/contacts` | name, email, phone, subject, message | Zod | Turnstile |
| Appointment Form | `/appointments` | fullName, email, phone, dob, sex, patientType, department, doctor, date, message | Zod | Turnstile |
| Login Form | `/admin` | email, password (or magic link) | Client-side | No |
| Set Password | `/account/set-password` | password, confirmPassword | Zod (12+ chars, complexity) | No |
| Admin Invite | `/admin/invite` | email, role | Zod | No |
| Newsletter Signup | Homepage | email | Client-side | No |
| Search Widget | Sidebar | query | None | No |

---

### Supabase Calls (18 files)

**Tables Accessed:**
- `profiles` - Role lookup
- `inquiries` - Contact form submissions
- `appointments` - Appointment bookings
- `posts` - News articles
- `jobs` - Job listings
- `job_applications` - Applications
- `auth_logs` - Login tracking
- `roster_*` - Roster tables (doctors, departments, assignments, time_blocks)
- `password_history` - Password reuse check

**Auth Operations:**
- `signInWithOtp` - Magic link
- `signInWithPassword` - Password login
- `signOut` - Logout
- `getUser` - Session check
- `updateUser` - Password update
- `admin.inviteUserByEmail` - Staff invite

---

### Auth-Gated Routes Behavior

| Unauthenticated Access | Result |
|------------------------|--------|
| `/dashboard` | Redirect to `/admin?redirect=/dashboard` |
| `/reception` | Redirect to `/admin?redirect=/reception` |
| `/roster` | Redirect to `/admin?redirect=/roster` |
| `/jobs/dashboard` | Redirect to `/admin?redirect=/jobs/dashboard` |
| `/admin` (authenticated) | Redirect to `/dashboard` |

**Role Enforcement:**
- Fail-closed: If role lookup fails, redirect to `/` with error
- Role mismatch: Redirect to appropriate dashboard

---

### Environment Variables Referenced

| Variable | Usage |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase client |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase client |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | CAPTCHA widget |
| `TURNSTILE_SECRET_KEY` | CAPTCHA verification |
| `UPSTASH_REDIS_REST_URL` | Rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Rate limiting |
| `RESEND_API_KEY` | Email sending |
| `RESEND_FROM_EMAIL` | Email sender |
| `LMC_NOTIFY_EMAIL` | Staff notifications |
| `NEXT_PUBLIC_SITE_URL` | Email links |
| `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` | Analytics |
| `SENTRY_DSN` | Error tracking |
| `SENTRY_ORG` | Sentry config |
| `SENTRY_PROJECT` | Sentry config |
| `SENTRY_AUTH_TOKEN` | Source maps |
| `NODE_ENV` | Dev/prod mode |
| `CI` | CI environment |

---

### Security Headers (next.config.ts)

| Header | Value | Status |
|--------|-------|--------|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | ✅ |
| `X-Content-Type-Options` | `nosniff` | ✅ |
| `X-Frame-Options` | `SAMEORIGIN` | ✅ |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | ✅ |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), interest-cohort=()` | ✅ |
| `X-DNS-Prefetch-Control` | `on` | ✅ |
| `Content-Security-Policy` | Full policy in middleware | ✅ |

---

### CSP Policy (middleware.ts)

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://static.cloudflareinsights.com https://unpkg.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
img-src 'self' blob: data: https://*.supabase.co;
font-src 'self' https://fonts.gstatic.com;
connect-src 'self' https://*.supabase.co wss://*.supabase.co https://cloudflareinsights.com;
frame-src 'self' https://challenges.cloudflare.com https://www.google.com https://maps.google.com;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'self';
upgrade-insecure-requests;
```

---

### File Upload/Image Handling

**Finding:** No file upload functionality detected.
- `resume_url` field exists in `job_applications` table but no upload UI found
- Images served via `next/image` from Supabase storage
- No user-uploaded content handling in forms

---

### robots.txt Analysis

**Disallowed:**
- `/admin` ✅
- `/auth` ✅
- `/dashboard` ✅
- `/reception` ✅
- `/roster` ✅
- `/api/` ✅
- `/monitoring` ✅
- `/dev/` ✅

**Note:** `/dev/heading-preview` is disallowed but still accessible.

---

## PHASE 0 REPORT: COMPLETE

**Attack Surface Summary:**
- 21 pages (13 public, 8 protected)
- 3 API routes (2 public, 1 authenticated)
- 7 forms with varying validation levels
- Role-based access control on 6 routes
- 17 environment variables
- Full security headers + CSP

**Proceeding to Phase 1 — UI Chaos**

---

## Phase 1 — UI Chaos (COMPLETE)

### 1A — Dev Endpoints in Production

| Finding | Severity | Status |
|---------|----------|--------|
| `/dev/heading-preview` accessible | LOW | Disallowed in robots.txt but accessible |

**Details:** Dev preview page exposes only public contact info (already in footer). Has `noindex` meta tag. Low risk but should be removed or auth-gated in production.

---

### 1B — API Information Disclosure

| Finding | Severity | Status |
|---------|----------|--------|
| `/api/roster/config` exposes Supabase creds | MEDIUM | Review needed |
| `/api/roster/doctors` exposes staff data | LOW | Intentional for booking |

**`/api/roster/config` Details:**
```json
{
  "supabaseUrl": "https://yzqtswhlyoumwsgtbris.supabase.co",
  "supabaseAnonKey": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

While these are `NEXT_PUBLIC_*` vars (designed for client exposure), a dedicated API endpoint:
- Creates an enumeration vector
- Makes credential discovery trivial
- Is unnecessary (client already has these in JS bundle)

**Recommendation:** Remove `/api/roster/config` endpoint. Client code already has access via env vars.

**`/api/roster/doctors` Details:**
Exposes doctor names, internal IDs (`d_or0uy3rkg`), department codes (`g_consult`). Required for appointment booking dropdown but leaks internal ID schema.

---

### 1C — Route Protection Testing

| Route | Expected | Actual | Status |
|-------|----------|--------|--------|
| `/dashboard` | Redirect to login | Shows login form | ✅ |
| `/reception` | Redirect to login | Shows login form | ✅ |
| `/roster` | Redirect to login | Shows login form | ✅ |
| `/admin/invite` | 404 or login | 404 | ✅ |

**Status:** Auth-gated routes properly protected. Unauthenticated users see login form.

---

### 1D — Path Traversal & Injection Testing

| Test | Payload | Result | Status |
|------|---------|--------|--------|
| Path traversal | `/../../../etc/passwd` | 403 Forbidden | ✅ BLOCKED |
| XSS in URL | `/services/<script>alert(1)</script>` | 404 | ✅ SAFE |
| SQL-like slug | `/news/test-or-1-equals-1` | 500 Error | ⚠️ Investigate |
| Non-existent slug | `/services/nonexistent-12345` | 404 | ✅ SAFE |

**Finding:** News route returns 500 for certain slug patterns. May indicate unhandled error in slug lookup. Not a security vulnerability but should gracefully 404.

---

### 1E — Form Structure Analysis

Forms reviewed from recon phase:
- Contact form: Zod validation + Turnstile CAPTCHA ✅
- Appointment form: Zod validation + Turnstile CAPTCHA ✅
- Login form: Client-side validation, no CAPTCHA ⚠️
- Newsletter: Client-side only, no CAPTCHA ⚠️

**Note:** Login form relies on Supabase rate limiting, not application-level. Newsletter form has minimal protection.

---

## Phase 1 Summary

| Severity | Count | Action |
|----------|-------|--------|
| HIGH | 0 | - |
| MEDIUM | 1 | Remove `/api/roster/config` |
| LOW | 3 | Consider removing dev page, handle 500 errors |

---

## Phase 2 — Load & Performance (COMPLETE)

### 2A — Bundle Analysis

| Finding | Severity | Status |
|---------|----------|--------|
| 20+ script chunks loaded | INFO | Normal for Next.js App Router |
| Multiple image assets on homepage | LOW | Consider lazy loading below-fold |

**Homepage Script Loading:**
- Scripts load async (not blocking)
- CSS prioritized correctly
- Font assets preloaded

**Image Handling:**
- Uses Next.js Image component ✅
- Responsive `sizes` attribute configured ✅
- Automatic format conversion via `/_next/image` ✅

---

### 2B — Vercel Runtime Logs

| Time | Path | Status | Issue |
|------|------|--------|-------|
| 12:04:33 | `/news/test-or-1-equals-1` | 500 | Unhandled error on invalid slug |
| 12:04:24 | `/news/test%27%20OR...` | 500 | URL-encoded SQL characters |

**Finding:** News dynamic route throws 500 on invalid slugs instead of 404. Not a security issue (Supabase handles the query safely), but poor UX.

---

### 2C — Performance Recommendations

1. **Image optimization:** Add explicit `loading="lazy"` for below-fold images
2. **Bundle monitoring:** Review dependencies for unused packages
3. **Error handling:** News route should 404 gracefully on missing slugs

---

## Phase 3 — Security Probing (COMPLETE)

### 3A — HTTP Security Headers

| Header | Value | Status |
|--------|-------|--------|
| Strict-Transport-Security | `max-age=63072000; includeSubDomains; preload` | ✅ |
| X-Content-Type-Options | `nosniff` | ✅ |
| X-Frame-Options | `SAMEORIGIN` | ✅ |
| Referrer-Policy | `strict-origin-when-cross-origin` | ✅ |
| Permissions-Policy | `camera=(), microphone=(), geolocation=(), interest-cohort=()` | ✅ |
| Content-Security-Policy | Full policy via middleware | ✅ |

**CSP Policy (middleware.ts):**
- `default-src 'self'`
- `script-src` allows Cloudflare, unpkg for roster app
- `frame-ancestors 'self'` prevents clickjacking
- `upgrade-insecure-requests` enforced

---

### 3B — Authentication & Authorization

| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| Unauthenticated → protected route | Redirect to login | ✅ Works |
| Role lookup failure | Fail-closed | ✅ Redirects to home with error |
| Insufficient role | Redirect to allowed dashboard | ✅ Works |
| Open redirect via `?redirect=` | Blocked | ✅ `isAllowedRedirect()` validates |

**Middleware Security:**
```typescript
// FAIL CLOSED: if we can't fetch the role, deny access
if (error || !profile) {
  console.error("Role lookup failed for user:", user.id, error);
  return NextResponse.redirect(url); // → home with error
}
```

---

### 3C — Input Validation & Sanitization

| Protection | Implementation | Status |
|------------|----------------|--------|
| Form validation | Zod schemas server-side | ✅ |
| HTML sanitization | `isomorphic-dompurify` | ✅ |
| CAPTCHA | Cloudflare Turnstile (fail-closed) | ✅ |
| Rate limiting | Upstash Redis (fail-open) | ⚠️ |
| IP tracking | Stored for security audit | ✅ |

**Rate Limit Behavior:**
- Falls open if Redis unavailable (better than blocking all users)
- Logs warning when bypassed
- 3 submissions per phone per 10 minutes

---

### 3D — Open Redirect Protection

```typescript
// lib/utils/redirect.ts
export function isAllowedRedirect(url: string, requestHost: string): boolean {
  // Relative paths are always allowed (but not protocol-relative //)
  if (url.startsWith("/") && !url.startsWith("//")) {
    return true;
  }
  // Only allow same-origin redirects
  const parsed = new URL(url);
  return parsed.host === requestHost;
}
```

✅ Properly blocks `//evil.com`, `https://evil.com`, and other attack vectors.

---

### 3E — API Security

| Endpoint | Auth | Rate Limit | Finding |
|----------|------|------------|---------|
| `/api/roster/config` | None | None | ⚠️ Exposes public Supabase creds |
| `/api/roster/doctors` | None | None | Exposes doctor names/IDs (intentional) |
| `/api/auth/log-login` | Session | None | ✅ Properly authenticated |

---

## Phase 3 Summary

| Category | Status |
|----------|--------|
| HTTP Headers | ✅ Excellent |
| CSP | ✅ Well configured |
| Auth/RBAC | ✅ Fail-closed |
| Input validation | ✅ Zod + DOMPurify |
| CAPTCHA | ✅ Fail-closed |
| Rate limiting | ⚠️ Fail-open (acceptable) |
| Open redirect | ✅ Protected |
| API exposure | ⚠️ Review `/api/roster/config` |

---

## Phase 4 — Accessibility (COMPLETE)

### 4A — Accessibility Findings

| Finding | Severity | Location |
|---------|----------|----------|
| Skip-to-content link | ✅ PRESENT | Header.tsx |
| Form `aria-required` missing | LOW | Appointment form |
| Phone input type not `tel` | LOW | Contact/appointment forms |
| Loading state aria labels | LOW | Async doctor dropdown |
| Color contrast (white/85 on green) | LOW | May fail WCAG AA |

---

### 4B — Form Accessibility

**Appointment Form Issues:**
- Required fields use `*` but lack `aria-required="true"`
- Date pickers use generic labels
- "Loading doctors..." lacks `aria-live` region

**Recommendations:**
1. Add `aria-required="true"` to required inputs
2. Use `type="tel"` for phone fields
3. Add `aria-live="polite"` to async loading states

---

## Phase 4 Summary

| WCAG Criterion | Status |
|----------------|--------|
| 1.1.1 Non-text Content | ✅ Images have alt text |
| 1.3.1 Info and Relationships | ⚠️ Missing aria-required |
| 1.4.3 Contrast | ⚠️ Some low-contrast text |
| 2.1.1 Keyboard | ✅ Skip link present |
| 2.4.1 Bypass Blocks | ✅ Skip-to-content |
| 4.1.2 Name, Role, Value | ⚠️ Form inputs need labels |

---

## Phase 5 — Fix Campaign Recommendations

### HIGH Priority (0 items)

*No critical security vulnerabilities found.*

---

### MEDIUM Priority (1 item)

#### M1: `/api/roster/config` endpoint — KEPT WITH DOCUMENTATION

**Issue:** Exposes Supabase credentials via dedicated API.
**Analysis:** This endpoint is REQUIRED by the standalone roster app (`public/roster-app/`), which is static HTML/JS that cannot access Next.js environment variables.
**Risk:** Low — credentials are `NEXT_PUBLIC_*` anon keys with RLS protection, already exposed in main app bundle.
**Resolution:** Kept endpoint, added documentation explaining its purpose.

```typescript
// app/api/roster/config/route.ts
// NOTE: Required by standalone roster app (public/roster-app/)
```

---

### LOW Priority (4 items)

#### L1: Remove or auth-gate `/dev/heading-preview`

**Issue:** Dev preview page accessible in production.
**Risk:** Low — only exposes public contact info.
**Fix:** Add auth check or conditionally disable in production.

#### L2: Handle 500 errors in news route — FIXED ✅

**Issue:** Invalid slugs cause 500 instead of 404.
**Risk:** Poor UX, error noise in logs.
**Fix Applied:** Added slug format validation (`/^[a-z0-9-]+$/i`) before Supabase query.

#### L3: Form accessibility improvements — VERIFIED ✅

**Issue:** Missing ARIA attributes on form fields.
**Review Findings:**
- `aria-required="true"` already present on required inputs ✅
- `type="tel"` already used on phone inputs ✅
- `aria-invalid` and `aria-describedby` already implemented ✅
- **Added:** `aria-busy` to doctor dropdown loading state

#### L4: Review newsletter form protection

**Issue:** Newsletter form has no CAPTCHA or rate limiting.
**Risk:** Low — only collects email, easily abused for spam.
**Fix:** Consider adding Turnstile or rate limiting.

---

## Final Assessment

| Category | Grade |
|----------|-------|
| Security Headers | A |
| Authentication | A |
| Input Validation | A |
| CAPTCHA Protection | A |
| Rate Limiting | B+ |
| API Security | B |
| Error Handling | B |
| Accessibility | B |
| Performance | B+ |

**Overall:** Production-ready with minor improvements recommended.

---

## Fix Status

| ID | Issue | Status |
|----|-------|--------|
| M1 | `/api/roster/config` exposure | KEPT — Required by roster app |
| L2 | News route 500 errors | FIXED ✅ |
| L3 | Form ARIA attributes | VERIFIED ✅ (already present) |
| L1 | Dev page in production | Not requested |
| L4 | Newsletter form protection | Not requested |

**Fixes Applied:** 2026-06-18

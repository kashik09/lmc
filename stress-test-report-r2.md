# LMC Stress Test Report — Round 2

**Date:** 2026-06-18
**Tester:** Claude Code (autonomous)
**URL:** https://lifeline-three-omega.vercel.app/
**Round 1 reference:** stress-test-report.md

---

## Executive Summary

- **New findings:** 8
- **CRIT:** 0 | **HIGH:** 2 | **MED:** 2 | **LOW:** 3 | **INFO:** 1
- **Fixed this round:** 0 (awaiting approval)
- **Carried forward (deferred):** 2 (L1, L4 from R1)

---

## Health Score

| Phase | After Round 1 | After Round 2 |
|-------|---------------|---------------|
| Grade | B+ | B |

**Score dropped** due to dependency vulnerabilities and roster app auth issues.

---

## Findings

### [HIGH-01] Roster App Has Fake Authentication

- **Phase:** C (Roster App Audit)
- **Description:** The roster app at `/roster-app/` has a login screen that accepts ANY email/password combination. There is no real authentication — it just stores the entered credentials in localStorage and grants access.
- **Evidence:**
  ```javascript
  // managers.jsx lines 22-33
  function submit(e) {
    // No password verification!
    setTimeout(function () {
      var nm = email.split("@")[0].replace(/[._-]+/g, " ")...
      props.onLogin({ name: nm || "Admin", email: email.trim() });
    }, 650);
  }

  // Line 74 in UI:
  "Demo workspace — any email & password will sign you in."
  ```
- **Impact:**
  - Anyone can access the roster admin UI
  - Exposes doctor names, departments, schedule structure
  - UI suggests write capability (though RLS should block)
  - Misleading "Staff sign in" prompt could be social engineering vector
- **Mitigation:** RLS policies (migration 00005) require `authenticated` + `staff/admin` role for writes, so database mutations fail. But READ access is fully public.
- **Fix:** Proposed — integrate with Next.js auth or add real Supabase auth
- **Commit:** Awaiting approval

---

### [HIGH-02] Dependency Vulnerabilities (15 total, 4 HIGH)

- **Phase:** E (Dependency Audit)
- **Description:** `npm audit` reports 15 vulnerabilities including 4 HIGH severity.
- **Evidence:**
  ```
  HIGH: fast-uri path traversal (GHSA-q3j6-qgpj-74h6)
  HIGH: undici TLS bypass (GHSA-vmh5-mc38-953g)
  HIGH: undici info disclosure (GHSA-pr7r-676h-xcf6)
  HIGH: ws memory exhaustion (GHSA-96hv-2xvq-fx4p)

  MODERATE: DOMPurify (8 CVEs), Next.js (13 CVEs), js-yaml DoS
  ```
- **Impact:** Potential for XSS bypass, DoS, information disclosure depending on how these libraries are used.
- **Fix:** Run `npm audit fix` — most are auto-fixable
- **Commit:** Awaiting approval

---

### [MED-01] Roster App Publicly Accessible at /roster-app/

- **Phase:** C (Roster App Audit)
- **Description:** The roster admin app is accessible to anyone without authentication at `/roster-app/`.
- **Evidence:**
  ```
  GET /roster-app/ → 200 OK
  No auth check, no redirect
  Not blocked by robots.txt or middleware
  ```
- **Impact:** Information disclosure (doctor names, schedule patterns), potential for UI confusion when writes fail.
- **Fix:** Either:
  1. Move roster-app behind Next.js auth (recommended)
  2. Add to robots.txt disallow list (minimal)
  3. Add auth check in middleware
- **Commit:** Awaiting approval

---

### [MED-02] Console.log Statements in Roster App Production Code

- **Phase:** C (Roster App Audit)
- **Description:** Production JS contains multiple `console.log` and `console.error` statements that leak internal state.
- **Evidence:**
  ```javascript
  // data.js line 238
  console.log("[LMC] Fetching from Supabase...");

  // data.js line 419
  console.log("[LMC] Loaded from Supabase:", {...});

  // app.jsx line 144
  console.log("[LMC] Data loaded:", result.source, result.doc);
  ```
- **Impact:** Information disclosure to anyone with browser dev tools open. Reveals Supabase connection status, data structure, error details.
- **Fix:** Strip console statements or wrap in `NODE_ENV !== 'production'` check
- **Commit:** Awaiting approval

---

### [LOW-01] Appointment Page Slow Response (3.3s avg)

- **Phase:** B (Load Testing)
- **Description:** The `/appointments` page averages 3329ms response time under load (50 concurrent).
- **Evidence:**
  ```
  Homepage: 1539ms avg
  Services: 526ms avg
  Appointments: 3329ms avg  ← 6x slower
  News: 454ms avg
  ```
- **Impact:** Poor UX for appointment booking, potential timeout on slow connections.
- **Cause:** Likely the Turnstile widget or complex form state hydration.
- **Fix:** Investigate server component vs client component split, consider lazy loading form
- **Commit:** Deferred — not critical

---

### [LOW-02] Development React Builds in Roster App

- **Phase:** C (Roster App Audit)
- **Description:** The roster app loads React development builds, not production.
- **Evidence:**
  ```html
  <script src="https://unpkg.com/react@18.3.1/umd/react.development.js">
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js">
  ```
- **Impact:** Larger bundle size, slower performance, extra warnings in console.
- **Fix:** Switch to `react.production.min.js` and `react-dom.production.min.js`
- **Commit:** Awaiting approval

---

### [LOW-03] Babel Standalone in Production

- **Phase:** C (Roster App Audit)
- **Description:** JSX files are transpiled client-side using Babel Standalone.
- **Evidence:**
  ```html
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js">
  <script type="text/babel" src="js/app.jsx">
  ```
- **Impact:**
  - Slower initial render (must parse and transpile JSX)
  - Extra 800KB+ download
  - Babel vulnerability (GHSA-4x5r-pxfx-6jf8) in production path
- **Fix:** Pre-transpile JSX files to plain JS during build
- **Commit:** Deferred — architectural change needed

---

### [INFO-01] Load Test Passed — 100% Success Rate

- **Phase:** B (Load Testing)
- **Description:** All endpoints handled 50 concurrent requests without failures.
- **Evidence:**
  ```
  Homepage: 50/50 success, avg 1539ms
  Services: 50/50 success, avg 526ms
  Appointments: 50/50 success, avg 3329ms
  News: 50/50 success, avg 454ms
  API /roster/doctors: 50/50 success, avg 820ms
  API /roster/config: 50/50 success, avg 574ms
  ```
- **Impact:** Positive — infrastructure is stable under moderate load.
- **Fix:** N/A

---

## Phase A — Form Abuse Results

### A1-A4 Form Testing

Forms require valid Turnstile CAPTCHA tokens which cannot be bypassed programmatically. Server-side validation via Zod prevents:
- Empty submissions → validation error
- XSS payloads → sanitized via isomorphic-dompurify
- SQL injection → parameterized via Supabase client
- Oversized messages → max 2000 chars enforced

**Rate limiting:** Upstash Redis limits 3 submissions per phone per 10 minutes.

**Status:** Forms are well-protected. No findings.

---

## Phase D — Admin Panel Flows

### D1 — Role Separation

| Test | Result |
|------|--------|
| Unauthenticated → /dashboard | Redirects to /admin ✅ |
| Unauthenticated → /reception | Redirects to /admin ✅ |
| Unauthenticated → /roster | Redirects to /admin ✅ |
| Role lookup failure | Fail-closed, redirect to / ✅ |

### D4 — Audit Logging

**Finding:** Auth login events are logged to `auth_logs` table with:
- User ID, email
- IP address
- User agent
- Timestamp
- VPN/suspicious flag

**Status:** Adequate for medical context.

---

## Regression Check

| Round 1 Item | Status |
|--------------|--------|
| L2 (news 500) | ✅ PASS — returns 404 on invalid slug |
| L3 (aria-busy) | ✅ PASS — attribute present on doctor dropdown |
| M1 (roster config docs) | ✅ PASS — documentation added |

---

## What's Still Open

### From Round 1 (Deferred)

| ID | Issue | Reason |
|----|-------|--------|
| L1 | `/dev/heading-preview` accessible | Low risk, noindex tag present |
| L4 | Newsletter form has no CAPTCHA | Low risk, email only |

### From Round 2 (Awaiting Approval)

| ID | Issue | Severity | Fix Ready |
|----|-------|----------|-----------|
| HIGH-01 | Roster app fake auth | HIGH | Need architectural decision |
| HIGH-02 | Dependency vulnerabilities | HIGH | `npm audit fix` |
| MED-01 | Roster app publicly accessible | MED | Add middleware auth |
| MED-02 | Console.log in production | MED | Strip statements |
| LOW-02 | React dev builds | LOW | Switch to production |

---

## Recommended Actions

### Immediate (HIGH)

1. **Run `npm audit fix`** — fixes 4 HIGH vulnerabilities
2. **Discuss roster app strategy** — options:
   - Remove roster app entirely (use Next.js admin instead)
   - Add real Supabase auth to roster app
   - Move roster-app to protected route

### Short-term (MED)

3. Strip `console.log` statements from roster app JS
4. Add `/roster-app/` to robots.txt disallow list

### Optional (LOW)

5. Switch roster app to production React builds
6. Investigate appointment page performance

---

**Reply with:**
- `FIX HIGH-02` — Run npm audit fix
- `FIX MED-02` — Strip console.log statements
- `FIX LOW-02` — Switch to production React
- `DISCUSS HIGH-01` — Get guidance on roster app auth strategy

# Lifeline Medical Centre — Codebase Status Report

Generated: 2026-04-24

---

## Routes

### Public Routes

| File Path | URL | Static/Dynamic | Client/Server |
|-----------|-----|----------------|---------------|
| `app/(public)/page.tsx` | `/` | Static | Server |
| `app/(public)/about/page.tsx` | `/about` | Static | Server |
| `app/(public)/appointments/page.tsx` | `/appointments` | Static | Server |
| `app/(public)/contacts/page.tsx` | `/contacts` | Static | Server |
| `app/(public)/services/page.tsx` | `/services` | Static | Server |
| `app/(public)/services/[slug]/page.tsx` | `/services/:slug` | SSG (x-ray, dental, laboratory) | Server |
| `app/(public)/news/page.tsx` | `/news` | Static | Server |
| `app/(public)/news/[slug]/page.tsx` | `/news/:slug` | Dynamic (ISR) | Server |
| `app/(public)/visitors/page.tsx` | `/visitors` | Static | Server |
| `app/(auth)/login/page.tsx` | `/login` | Static | Server |
| `app/(auth)/signup/page.tsx` | `/signup` | Static | Server |

### Protected Routes (via middleware)

| Route Pattern | Required Roles |
|---------------|----------------|
| `/dashboard` | patient, staff, admin |
| `/jobs/dashboard` | staff, admin |
| `/admin` | admin |

Middleware file: `lib/supabase/middleware.ts`

### Incomplete Routes (flagged)

| Route | Issue |
|-------|-------|
| `/news` | TODO: Wire to Supabase posts table. Returns empty array. |
| `/news/[slug]` | TODO: Wire to Supabase posts table. Always returns `notFound()`. |
| `/visitors` | 3 info cards link to `#` with TODO comments (FAQ, forms, insurance). |

---

## Forms & Data Flow

### 1. Appointment Form
- **Location:** `components/blocks/appointment-form.tsx`
- **Fields:** department, doctorSlug, fullName, patientType, dateOfBirth, sex, phone, email, appointmentDate, message
- **On Submit:** Calls Server Action `submitAppointment()` in `lib/actions/appointment.ts`
- **Validation:** Client-side (basic required checks) + Server-side (Zod via `appointmentSchema`)
- **Persists to Supabase:** **NO — NOT WIRED** (TODO comment in action file)

### 2. Contact Form
- **Location:** `components/blocks/contact-form.tsx`
- **Fields:** fullName, phone, email, subject, message
- **On Submit:** Calls Server Action `submitContact()` in `lib/actions/contact.ts`
- **Validation:** Client-side (basic required checks) + Server-side (Zod via `contactSchema`)
- **Persists to Supabase:** **NO — NOT WIRED** (TODO comment in action file)

### 3. Login Form
- **Location:** `app/(auth)/login/login-form.tsx`
- **Fields:** email, password
- **On Submit:** Calls `supabase.auth.signInWithPassword()` directly
- **Validation:** Client-only (HTML required attribute)
- **Persists to Supabase:** Yes — Auth handled by Supabase Auth

### 4. Signup Form
- **Location:** `app/(auth)/signup/signup-form.tsx`
- **Fields:** fullName, email, password
- **On Submit:** Calls `supabase.auth.signUp()` directly
- **Validation:** Client-only (HTML required, minLength=6 for password)
- **Persists to Supabase:** Yes — Auth handled by Supabase Auth (profile created via trigger)

### 5. Search Widget
- **Location:** `components/blocks/sidebar/search-widget.tsx`
- **Fields:** query (text)
- **On Submit:** Redirects to `/news?q=...` (URL param only)
- **Validation:** None
- **Persists to Supabase:** N/A (navigation only)

---

## Database

### Tables (from `supabase/migrations/00001_initial_schema.sql`)

| Table | Columns |
|-------|---------|
| `services` | id, title, slug, description, icon, image_url, sort_order, created_at |
| `posts` | id, title, slug, content, excerpt, category (blog/events/viruses), featured_image, published_at, created_at |
| `jobs` | id, title, slug, department, description, requirements, location, type, deadline, is_active, created_at |
| `profiles` | id (FK auth.users), full_name, phone, avatar_url, role (patient/staff/admin), created_at |
| `job_applications` | id, job_id (FK jobs), user_id (FK auth.users), resume_url, cover_letter, status, created_at |
| `inquiries` | id, name, email, phone, subject, message, created_at |

### RLS Policies

| Table | Policy | Description |
|-------|--------|-------------|
| services | `services_public_select` | Public can SELECT all |
| posts | `posts_public_select` | Public can SELECT where published_at <= now() |
| jobs | `jobs_public_select` | Public can SELECT where is_active = true |
| profiles | `profiles_select_own` | Authenticated can SELECT own profile |
| profiles | `profiles_update_own` | Authenticated can UPDATE own profile |
| profiles | `profiles_insert_own` | Authenticated can INSERT own profile |
| job_applications | `job_applications_select_own` | Authenticated can SELECT own applications |
| job_applications | `job_applications_insert_own` | Authenticated can INSERT own applications |
| inquiries | `inquiries_public_insert` | Public can INSERT (no SELECT) |

### Table Usage in App Code

| Table | Queried? | Location |
|-------|----------|----------|
| services | **NO** | — |
| posts | **NO** | — |
| jobs | **NO** | — |
| profiles | YES | `lib/supabase/middleware.ts:98` (role check) |
| job_applications | YES | `app/(dashboard)/jobs/dashboard/page.tsx:18` |
| inquiries | **NO** | — |

**Summary:** 4 of 6 tables exist but are not queried anywhere in app code.

---

## Auth

### Login Flow
- **Page:** `app/(auth)/login/page.tsx` → renders `LoginForm`
- **Form:** `app/(auth)/login/login-form.tsx` (Client Component)
- **Method:** `supabase.auth.signInWithPassword({ email, password })`
- **Redirect:** Uses `?redirect=` query param, defaults to `/dashboard`

### Signup Flow
- **Page:** `app/(auth)/signup/page.tsx` → renders `SignupForm`
- **Form:** `app/(auth)/signup/signup-form.tsx` (Client Component)
- **Method:** `supabase.auth.signUp()` with `data: { full_name }`
- **Profile Creation:** Automatic via database trigger `on_auth_user_created`
- **Default Role:** `patient`

### Role Checking
- **Location:** `lib/supabase/middleware.ts`
- **Mechanism:** Middleware reads `profiles.role` for authenticated users
- **Roles:** patient, staff, admin
- **Behavior:** Fail-closed (denies access if role lookup fails)

### Admin-Specific UI
- **Protected route:** `/admin` (admin role only)
- **Actual admin UI:** **DOES NOT EXIST** — no `app/(admin)` or similar directory

---

## Security Posture

### Security Headers (next.config.ts)

| Header | Value |
|--------|-------|
| Strict-Transport-Security | max-age=63072000; includeSubDomains; preload |
| X-Content-Type-Options | nosniff |
| X-Frame-Options | DENY |
| Referrer-Policy | strict-origin-when-cross-origin |
| Permissions-Policy | camera=(), microphone=(), geolocation=(), interest-cohort=() |
| X-DNS-Prefetch-Control | on |
| Content-Security-Policy | **NOT CONFIGURED** (TODO comment) |

### Form Field Validation Summary

| Form | Has Server-Side Zod? |
|------|----------------------|
| Appointment Form | YES (`appointmentSchema`) |
| Contact Form | YES (`contactSchema`) |
| Login Form | NO (Supabase handles auth) |
| Signup Form | NO (Supabase handles auth) |
| Search Widget | NO (URL nav only) |

### dangerouslySetInnerHTML Usage

| File | Line | Context |
|------|------|---------|
| `app/(public)/news/[slug]/page.tsx` | 83 | `<div dangerouslySetInnerHTML={{ __html: post.content }} />` |

**Risk:** Raw HTML injection if `post.content` contains unsanitized user input. Currently not wired to Supabase so no live risk. **Must sanitize before Phase 5 database wiring.**

### Hardcoded Secrets Check
- **API keys in code:** None found
- **Passwords in code:** None (only form field state variables)
- **Tokens in code:** None found

### .env Security
- **Gitignore entry:** `.env*` — YES, properly ignored
- **Committed .env files:** Only `.env.local.example` (template, no secrets)
- **Live secrets exposed:** No

---

## Dependencies

### npm audit
```
found 0 vulnerabilities
```

### npm outdated

| Package | Current | Latest | Gap |
|---------|---------|--------|-----|
| @supabase/supabase-js | 2.104.0 | 2.104.1 | patch |
| @types/node | 20.19.39 | 25.6.0 | **major** |
| eslint | 9.39.4 | 10.2.1 | **major** |
| lucide-react | 1.8.0 | 1.11.0 | minor |
| react | 19.2.4 | 19.2.5 | patch |
| react-dom | 19.2.4 | 19.2.5 | patch |
| typescript | 5.9.3 | 6.0.3 | **major** |

### Deprecated Packages
None found.

---

## Known Gaps (from code comments)

### TODO Comments

| File | Line | Comment |
|------|------|---------|
| `next.config.ts` | 28 | CSP in full hardening phase |
| `content/visitors.ts` | 23 | /faq in future phase |
| `content/visitors.ts` | 30 | link to downloadable forms |
| `content/visitors.ts` | 37 | insurance info page |
| `content/doctors.ts` | 3 | Replace placeholder data with real LMC doctor information |
| `lib/actions/appointment.ts` | 26 | Insert into Supabase appointments table in Phase 5 |
| `lib/actions/contact.ts` | 24 | Insert into Supabase inquiries table in Phase 5 |
| `app/(auth)/layout.tsx` | 1 | Phase 3 — Auth layout |
| `app/(dashboard)/layout.tsx` | 1 | Phase 3 — Dashboard layout |
| `app/(public)/news/page.tsx` | 10, 43 | Wire to Supabase posts table in Phase 5 |
| `app/(public)/news/[slug]/page.tsx` | 25 | Wire to Supabase posts table in Phase 5 |
| `components/blocks/footer.tsx` | 115 | Wire to Supabase posts table in Phase 5 |
| `components/blocks/footer.tsx` | 135 | Update URL when portfolio is ready |

### FIXME/XXX/HACK Comments
None found.

### Placeholder Content

| File | Content |
|------|---------|
| `content/doctors.ts` | 5 doctors with names like "[Placeholder] Dr. A — Dental" |

---

## Commit Summary

- **Total commits:** 55
- **Commits in last 24h:** 14

### Recent Commits (last 24h)
```
31765fa refactor(appointments): replace native date inputs with DatePickerField
2370043 feat(ui): date picker field wrapper
6faea48 feat(ui): custom calendar primitive
661aa31 chore(deps): add date-fns for date math
2e40cc6 fix(doctor-time-table): shrink row heights to content
30c885a chore(footer): update designer attribution
ef30761 fix(appointments): separate Sex from patient type (adult/child)
0b4cc5e fix(doctors): replace AI-generated names with obvious placeholders
2d3ea59 fix(security): role-based middleware with open redirect protection
9a990da feat(appointments): render doctor time table on appointments page
576cc01 feat(appointments): why-choose-us tiles
e7dfd78 feat(appointments): doctor time table component
f86a08c feat(appointments): doctor dropdown with department filtering
374794d feat(doctors): static doctor content with placeholder data
```

### Most-Touched Files
| Touches | File |
|---------|------|
| 6 | package-lock.json |
| 5 | package.json |
| 5 | components/blocks/appointment-form.tsx |
| 4 | components/blocks/navbar.tsx |
| 4 | components/blocks/footer.tsx |
| 3 | lib/validators/appointment.ts |
| 3 | content/appointments.ts |
| 3 | app/(public)/appointments/page.tsx |

---

*End of report.*

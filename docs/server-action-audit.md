# Server Action Security Audit

**Date:** 2026-04-27
**Auditor:** Claude Code agent
**Scope:** All `"use server"` functions in app/, lib/, components/

## Summary

**2 total actions audited. 0 findings. 0 critical, 0 medium, 0 low.**

Both server actions are well-implemented with proper security controls. One related finding (outside scope) identified in an API route.

## Inventory

| File | Function | Category | Notes |
|------|----------|----------|-------|
| `lib/actions/contact.ts` | `submitContact()` | Public | Contact form submission |
| `lib/actions/appointment.ts` | `submitAppointment()` | Public | Appointment booking |

## Detailed Analysis

### 1. `submitContact()` — lib/actions/contact.ts

| Check | Status | Details |
|-------|--------|---------|
| Input validation | ✅ Pass | Server-side Zod schema (`contactSchema.safeParse(formData)`) |
| Auth check | N/A | Intentionally public — contact form |
| Authz check | N/A | Intentionally public — contact form |
| Supabase client | ✅ Pass | Uses `NEXT_PUBLIC_SUPABASE_ANON_KEY` (RLS enforced) |
| Field mapping | ✅ Pass | Explicit mapping (lines 48-55), no spread operators |
| Return value | ✅ Pass | Only returns `referenceNumber`, no DB row data |
| Rate limiting | ✅ Pass | Upstash Redis, 3 requests per 10 minutes per phone |

**Schema fields accepted:** `fullName`, `phone`, `email`, `subject`, `message`
**DB fields written:** `reference_number`, `name`, `email`, `phone`, `subject`, `message`
**No privileged fields** (no `is_admin`, `role`, `status`, etc.) accepted from user input.

### 2. `submitAppointment()` — lib/actions/appointment.ts

| Check | Status | Details |
|-------|--------|---------|
| Input validation | ✅ Pass | Server-side Zod schema (`appointmentSchema.safeParse(formData)`) |
| Auth check | N/A | Intentionally public — appointment booking |
| Authz check | N/A | Intentionally public — appointment booking |
| Supabase client | ✅ Pass | Uses `NEXT_PUBLIC_SUPABASE_ANON_KEY` (RLS enforced) |
| Field mapping | ✅ Pass | Explicit mapping (lines 58-71), no spread operators |
| Return value | ✅ Pass | Only returns `referenceNumber`, no DB row data |
| Rate limiting | ✅ Pass | Upstash Redis, 3 requests per 10 minutes per phone |

**Schema fields accepted:** `department`, `doctorSlug`, `fullName`, `dateOfBirth`, `patientType`, `sex`, `phone`, `email`, `appointmentDate`, `message`
**DB fields written:** Explicit mapping to snake_case columns
**Notable:** `status` field is NOT accepted from user input — defaults to `'pending'` in DB schema (line 70 comment confirms this is intentional)

## Findings

**None.** Both server actions follow security best practices.

## Non-findings (worth noting)

### 1. Actions are unauthenticated — CORRECT

Both actions are intentionally public-facing. The contact form and appointment booking form are meant for anonymous visitors. This is not a finding.

### 2. `patientType` and `sex` enums — CORRECT

The appointment schema uses `z.enum()` for these fields, which constrains values to exactly `["adult", "child"]` and `["male", "female"]`. Attackers cannot inject arbitrary values.

### 3. Zod schema uses `.safeParse()` — CORRECT

Both actions use `safeParse()` which returns a result object instead of throwing. This is the correct pattern for server actions.

### 4. Error messages don't leak internals — CORRECT

On database errors, actions return generic messages like "We couldn't save your message" without exposing SQL errors or stack traces. Errors are logged server-side and sent to Sentry with action tags (no PII).

## Related Finding (Outside Scope)

### Auth Callback Route — Missing redirect validation

**Location:** `app/(auth)/callback/route.ts:7,13`
**Severity:** Low
**Type:** API Route (not a server action — outside audit scope)

```ts
const next = searchParams.get("next") ?? "/dashboard";
// ...
return NextResponse.redirect(`${origin}${next}`);
```

The `next` parameter is used without validation. While the `${origin}${next}` concatenation prevents classic open redirect (attacker-controlled `next` becomes a path, not a host), this differs from the middleware pattern which uses `isAllowedRedirect()` for the same purpose.

**Risk:** Low — not exploitable as open redirect, but inconsistent with middleware validation pattern.

**Recommendation:** Apply same `isAllowedRedirect()` check from middleware, or at minimum validate that `next` starts with `/` and doesn't start with `//`.

## Recommendations

### For current codebase

1. **Consider validating callback `next` param** — Low priority, but aligns with defense-in-depth.

### For future server actions

1. **Authenticated actions must call `supabase.auth.getUser()` early** — Before any DB operations.
2. **Admin actions must check `profile.role`** — After auth check, before privileged operations.
3. **Never spread user input** — Always use explicit field mapping.
4. **Always use anon key client** — Unless service role is explicitly required (and documented why).
5. **Return minimal data** — Don't return full DB rows to unauthenticated callers.
6. **Add rate limiting** — All public actions should be rate-limited.

## Conclusion

The existing server actions are secure. No immediate fixes required. The codebase demonstrates good security patterns that should be maintained as new actions are added.

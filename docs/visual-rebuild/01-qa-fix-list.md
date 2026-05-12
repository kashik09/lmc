# LMC Visual Rebuild — QA Fix List
Generated after Round 8 Ticket 8.2 (audit only, nothing fixed yet)

## Summary
- Pages audited: 14
- Total issues found: 18
- Critical (broken): 0
- Important (visible polish): 6
- Minor (nit / nice-to-have): 4
- Outstanding TODOs: 8 categories (40+ individual TODO comments)

---

## Critical
Issues that break the user experience or visual contract.

*None found — all pages render and function correctly.*

---

## Important
Visible polish issues that affect perceived quality but don't break anything.

- [ ] **[Appointments]** — Page uses old shadcn tokens (bg-muted, text-foreground, bg-primary, text-primary-foreground, border-border, bg-card) instead of LMC design tokens — File: `app/(public)/appointments/page.tsx`

- [ ] **[Contacts]** — Page uses old shadcn tokens (border-border, bg-muted, text-foreground, text-muted-foreground, text-primary) instead of LMC design tokens — File: `app/(public)/contacts/page.tsx`

- [ ] **[Thank You]** — Page uses old shadcn tokens (border-border, bg-card, text-foreground, text-muted-foreground, bg-muted, text-primary) instead of LMC design tokens — File: `app/(public)/thank-you/page.tsx`

- [ ] **[Privacy Policy]** — Imports PageHeader from wrong path (`@/components/blocks/page-header` instead of `@/components/layout/PageHeader`) and uses old tokens throughout — File: `app/(public)/privacy-policy/page.tsx`

- [ ] **[Appointments]** — Uses `max-w-7xl` instead of `max-w-container` for consistency with other rebuilt pages — File: `app/(public)/appointments/page.tsx` lines ~33, 55, 128

- [ ] **[Contacts]** — Uses `max-w-7xl` instead of `max-w-container` for consistency with other rebuilt pages — File: `app/(public)/contacts/page.tsx` line ~12

---

## Minor
Nits, future improvements, low priority.

- [ ] **[Footer]** — Hours inconsistency: Footer says "Mon–Sat 8am–6pm" but Visitors info strip says "24 hours, 7 days a week" — need client confirmation — File: `components/layout/Footer.tsx` line ~131

- [ ] **[Footer]** — latestNewsDummy is hardcoded placeholder data, should wire to Supabase — File: `components/layout/Footer.tsx` lines ~27-31

- [ ] **[Admin Login]** — Uses old shadcn tokens (bg-muted) in skeleton loader — low priority since admin area not part of public rebuild — File: `app/(auth)/admin/page.tsx`

- [ ] **[News Cards]** — Cards use hover:shadow-cardHover but no translate-y lift like service cards — could add for consistency, but not required — File: `app/(public)/news/page.tsx` line ~44

---

## Outstanding TODOs

### Services Content (content/services.ts)
- [ ] **content/services.ts:44** — TODO: Replace with real LMC description (Cardiology)
- [ ] **content/services.ts:53** — TODO: Replace with real LMC description (Neurology)
- [ ] **content/services.ts:62** — TODO: Replace with real LMC description (Orthopedic)
- [ ] **content/services.ts:71** — TODO: Replace with real LMC description (Pediatrics)
- [ ] **content/services.ts:80** — TODO: Replace with real LMC description (Diagnostic Imaging)
- [ ] **content/services.ts:89** — TODO: Replace with real LMC description (Microbiology Lab)
- [ ] **content/services.ts:98** — TODO: Replace with real LMC description (Gynaecology)
- [ ] **content/services.ts:284-347** — TODO: Replace serviceDetails with real LMC content for 7 departments

### Doctors Content (content/doctors.ts)
- [ ] **content/doctors.ts:3** — TODO: Replace placeholder data with real LMC doctor information
- [ ] **content/doctors.ts:21** — TODO: Replace with real LMC doctor schedules from client

### Visitors Content (content/visitors.ts)
- [ ] **content/visitors.ts:23** — TODO: /faq in future phase
- [ ] **content/visitors.ts:30** — TODO: link to downloadable forms
- [ ] **content/visitors.ts:37** — TODO: insurance info page

### Layout Components
- [ ] **components/layout/Topbar.tsx:24** — TODO: Verify this is the correct emergency number
- [ ] **components/layout/Footer.tsx:26,83** — TODO: wire up to Supabase latest news in a follow-up ticket
- [ ] **components/layout/Footer.tsx:55** — TODO: confirm About copy with client
- [ ] **components/layout/Footer.tsx:105** — TODO: confirm exact address with client
- [ ] **components/layout/Footer.tsx:110** — TODO: confirm primary phone with client
- [ ] **components/layout/Footer.tsx:120** — TODO: confirm email with client
- [ ] **components/layout/Footer.tsx:130** — TODO: confirm hours with client

### Page-Specific TODOs
- [ ] **app/(public)/pharmacy/page.tsx:21** — TODO 7.3: confirm pharmacy feature copy with client
- [ ] **app/(public)/visitors/page.tsx:42** — TODO 7.2: confirm visiting hours and policies with client

### Infrastructure
- [ ] **next.config.ts:29** — TODO: CSP in full hardening phase
- [ ] **app/(dashboard)/layout.tsx:1** — TODO: Phase 3 — Dashboard layout
- [ ] **app/(auth)/layout.tsx:1** — TODO: Phase 3 — Auth layout

---

## Pages Confirmed Clean
- `/` (home) — rebuilt, Reveal animations applied, no issues
- `/about` — rebuilt, Reveal animations applied, no issues
- `/services` — rebuilt, Reveal animations applied, no issues
- `/services/[slug]` — rebuilt with 2-col layout + ServicesSidebar, no issues
- `/news` — rebuilt, Reveal animations applied, no issues
- `/news/[slug]` — rebuilt with 2-col layout + widgets, no issues
- `/visitors` — rebuilt with 2-col layout + ServicesSidebar, no issues
- `/pharmacy` — rebuilt with 2-col layout + ServicesSidebar, no issues

---

## Notes

1. The 6 Important issues are all in pages that weren't part of Rounds 4-7 rebuild scope (appointments, contacts, thank-you, privacy-policy). These pages still use the old shadcn/ui token system.

2. All TODO comments related to client content confirmation should be batched and sent to the client for review.

3. The Footer latestNews Supabase wiring is a follow-up ticket — not blocking.

4. Admin area styling is low priority since it's not public-facing.

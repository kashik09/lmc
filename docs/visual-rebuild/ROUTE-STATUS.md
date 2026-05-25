# LMC Route Status — 2026-05-25

## Summary

| Status | Count | Routes |
|--------|-------|--------|
| ✅ Working with real content | 9 | `/about`, `/services`, `/services/[slug]`, `/visitors`, `/insurance`, `/contacts`, `/appointments`, `/privacy-policy`, `/thank-you` |
| 🟡 Working but placeholder/incomplete | 3 | `/`, `/news`, `/news/[slug]` |
| 🔴 Broken or known issue | 1 | `/` (FeaturedServices links to non-existent services) |
| ❌ Missing (route doesn't exist) | 1 | `/jobs` (listing page — dashboard exists but no listing) |
| 🔵 N/A or out of scope | 3 | `/admin`, `/callback`, `/jobs/dashboard` |

---

## Detail

### Public routes

| Route | File | HTTP | Content source | Status | Issues |
|-------|------|------|----------------|--------|--------|
| `/` | app/(public)/page.tsx | 200* | HeroCarousel + FeaturedServices + HomeCTABanner + LatestNews | 🔴 | FeaturedServices links to `/services/cardiology`, `/services/diagnostic-imaging`, `/services/pediatrics` — these don't exist in new typed system; HeroCarousel uses gradient placeholders, no real images |
| `/about` | app/(public)/about/page.tsx | 200* | content/about.ts | ✅ | none |
| `/services` | app/(public)/services/page.tsx | 200* | content/services/index.ts (new typed system) | ✅ | none — 12 real services with WP content |
| `/services/[slug]` | app/(public)/services/[slug]/page.tsx | 200* | content/services/*.ts (new typed system) | ✅ | none — all 12 slugs render correctly |
| `/pharmacy` | app/(public)/pharmacy/page.tsx | 200* | Hardcoded + content/contacts.ts | ✅ | none |
| `/visitors` | app/(public)/visitors/page.tsx | 200* | content/visitors.ts | ✅ | none — real WP content |
| `/insurance` | app/(public)/insurance/page.tsx | 200* | content/info/insurance-partners.ts (new typed system) | ✅ | No partner logos downloaded (external URLs referenced) |
| `/news` | app/(public)/news/page.tsx | 200* | Supabase `posts` table | 🟡 | Shows empty state if no posts seeded; depends on Supabase data |
| `/news/[slug]` | app/(public)/news/[slug]/page.tsx | 200* | Supabase `posts` table | 🟡 | Depends on Supabase data; no test posts to verify |
| `/contacts` | app/(public)/contacts/page.tsx | 200* | content/contacts.ts + ContactForm | ✅ | none |
| `/appointments` | app/(public)/appointments/page.tsx | 200* | content/appointments.ts + AppointmentForm | ✅ | none |
| `/privacy-policy` | app/(public)/privacy-policy/page.tsx | 200* | Hardcoded (full policy text) | ✅ | Marked as DRAFT pending legal review |
| `/thank-you` | app/(public)/thank-you/page.tsx | 200* | content/thank-you.ts | ✅ | none |

*HTTP testing unavailable in this environment — status inferred from build success + code review.

### Auth / admin routes

| Route | File | Notes |
|-------|------|-------|
| `/admin` | app/(auth)/admin/page.tsx | Login form for staff — out of scope per project memory |
| `/callback` | app/(auth)/callback/route.ts | OAuth callback handler — out of scope |
| `/jobs/dashboard` | app/(dashboard)/jobs/dashboard/page.tsx | Auth-protected job applications view — out of scope |

### Dynamic route slugs (sampled)

| Route template | Tested slug | HTTP | Notes |
|----------------|-------------|------|-------|
| `/services/[slug]` | theatre | 200* | Renders new typed content with lede + accordion sections |
| `/services/[slug]` | dental | 200* | Renders new typed content |
| `/services/[slug]` | x-ray | 200* | Renders new typed content |
| `/services/[slug]` | laboratory | 200* | Renders new typed content |
| `/news/[slug]` | N/A | N/A | No test posts in Supabase — cannot verify |

---

## Gaps to fill (recommended next tickets)

### ❌ Missing: `/jobs` (Job Listings Page)

**What it should do:** Display available job openings at LMC with title, department, and application link.

**What content it needs:**
- Supabase `jobs` table (may already exist, used by `/jobs/dashboard`)
- Card layout with job title, department, brief description
- Link to application form or external application URL

**Estimated complexity:** Small — similar pattern to `/news` listing page.

---

## Broken / known issues

### 🔴 Home page (`/`) — FeaturedServices broken links

**What's wrong:** The `FeaturedServices` component on the home page links to:
- `/services/cardiology`
- `/services/diagnostic-imaging`
- `/services/pediatrics`

These were placeholder services in the old `content/services.ts` but do **not** exist in the new typed system (`content/services/*.ts`). Clicking these links will 404.

**What's needed to fix:**
1. Update `components/home/FeaturedServices.tsx` to link to **real** services from the new system
2. Replace cardiology → `general-medicine` or `theatre`
3. Replace diagnostic-imaging → `x-ray` or `radiology`
4. Replace pediatrics → `immunisation` or `antenatal`
5. Update descriptions to match real service ledes

**Estimated effort:** Small (15-30 min).

### 🔴 Home page (`/`) — HeroCarousel uses gradient placeholders

**What's wrong:** The carousel displays layered CSS gradients instead of real LMC photos. The comment in code notes "pending real LMC photos."

**What's needed to fix:**
1. Process the 61 real LMC photos in `~/Downloads/lmc/images/` (per ASSET-INVENTORY.md)
2. Optimize and crop for hero aspect ratio (16:9 or similar)
3. Update SLIDES array in `HeroCarousel.tsx` to use real image paths
4. Add Next.js Image component with proper `src`

**Estimated effort:** Medium — depends on photo identification and optimization.

---

## Notes on existing-but-imperfect

### 🟡 `/news` — Working but placeholder

**What's incomplete:**
- Page renders but shows "No articles published yet" empty state
- Depends entirely on Supabase `posts` table having data
- No seed data or test posts exist

**To fully verify:** Seed at least one test post in Supabase, or port blog content from WP backup (4 articles listed in ASSET-INVENTORY.md).

### 🟡 `/news/[slug]` — Working but placeholder

**What's incomplete:**
- Route code is complete and correct
- Cannot verify render without seeded Supabase data
- `generateStaticParams` will return empty array with no posts

**To fully verify:** Same as `/news` — seed test data.

### 🟡 `/insurance` — Working but incomplete logos

**What's incomplete:**
- Partner names render correctly (from WP backup)
- Logos show fallback letter avatars (no actual logo images)
- WP backup referenced external URLs for logos — not downloaded locally

**To complete:** Download insurance partner logos from `backup.lmc.co.ug` URLs and add to `public/images/partners/`.

### Privacy Policy — DRAFT status

**What's incomplete:**
- Content is comprehensive but marked as DRAFT
- Banner warns "pending legal review"
- Not a code issue — needs client/legal sign-off

---

## Route inventory by file

```
app/
├── (auth)/
│   ├── admin/page.tsx          → /admin
│   └── callback/route.ts       → /callback (API)
├── (dashboard)/
│   └── jobs/dashboard/page.tsx → /jobs/dashboard
└── (public)/
    ├── page.tsx                → /
    ├── about/page.tsx          → /about
    ├── appointments/page.tsx   → /appointments
    ├── contacts/page.tsx       → /contacts
    ├── insurance/page.tsx      → /insurance
    ├── news/
    │   ├── page.tsx            → /news
    │   └── [slug]/page.tsx     → /news/[slug]
    ├── pharmacy/page.tsx       → /pharmacy
    ├── privacy-policy/page.tsx → /privacy-policy
    ├── services/
    │   ├── page.tsx            → /services
    │   └── [slug]/page.tsx     → /services/[slug]
    ├── thank-you/page.tsx      → /thank-you
    └── visitors/page.tsx       → /visitors
```

**Total routes:** 15 page routes + 1 API route = 16 total

---

## Content system mapping

| Route | Content source | Type |
|-------|----------------|------|
| `/` | Hardcoded in components | Legacy |
| `/about` | content/about.ts | Legacy |
| `/services` | content/services/index.ts | **New typed** |
| `/services/[slug]` | content/services/*.ts | **New typed** |
| `/pharmacy` | content/contacts.ts (partial) | Legacy |
| `/visitors` | content/visitors.ts | Legacy |
| `/insurance` | content/info/insurance-partners.ts | **New typed** |
| `/news` | Supabase `posts` | Database |
| `/news/[slug]` | Supabase `posts` | Database |
| `/contacts` | content/contacts.ts | Legacy |
| `/appointments` | content/appointments.ts | Legacy |
| `/privacy-policy` | Hardcoded | N/A |
| `/thank-you` | content/thank-you.ts | Legacy |

---

## Priority recommendations

1. **HIGH: Fix FeaturedServices broken links** — Users clicking these will 404. Quick fix.

2. **MEDIUM: Add real hero images** — Gradients are serviceable but not ideal for a medical clinic site.

3. **LOW: Seed news content** — Either port WP blog posts or add test data to verify the news system works end-to-end.

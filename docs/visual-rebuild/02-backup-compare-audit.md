# LMC Rebuild — Forensic Compare Against Backup Reference

Generated: 2026-05-12
Reference: `~/Downloads/lmc/backup/`
Rebuild: `app/(public)/` on main branch (commit f3ea5d7 + Round 8 polish)

## Summary

| Metric | Count |
|--------|-------|
| Reference pages audited | 15 |
| Rebuild pages audited | 11 |
| 🟢 Intentional divergences | 12 |
| 🟡 Worth confirming | 8 |
| 🔴 Accidental gaps | 5 |
| ⚫ Rebuild-only additions | 3 |

## Methodology

1. Mapped `~/Downloads/lmc/backup/` folder structure (15 HTML files from WordPress backup)
2. Cross-referenced with `app/(public)/` routes in rebuild
3. Read each reference HTML to extract content sections, navigation, forms, and widgets
4. Compared element-by-element against rebuild pages and content files
5. Categorized each divergence based on impact and intentionality

---

## Page-by-page

### / (Home)

**Reference file:** `Home - Lifeline Medical Centre.html`
**Rebuild file:** `app/(public)/page.tsx`

| Element | Reference | Rebuild | Status |
|---------|-----------|---------|--------|
| Hero | Full-width background with angled separators | Static hero with single image | 🟢 Intentional simplification |
| Top teaser boxes | 3 boxes (Open 24hrs, Request Appointment, Emergency) | Info strip in header/topbar | 🟢 Different layout approach |
| Welcome section | "Welcome to Lifeline" + intro paragraph + "Read More" CTA | Hero description handles this | 🟢 Consolidated into hero |
| Patient & Visitor Guide teaser | Teaser card with image | Not present as card | 🟡 Could add link to /visitors |
| Services section | 3 service cards (X-ray, Dental, Lab) | FeaturedServices component with 6 cards | 🟢 Expanded coverage |
| "Quality Healthcare" sidebar | Sidebar text block | Mission section on /about | 🟢 Moved to About page |
| News & Updates section | Section header only (empty in backup) | LatestNews component | 🟢 Functional in rebuild |
| Newsletter signup | Email form + "JOIN OUR HEALTH NEWSLETTER" | Not present | 🟡 Deferred — confirm if needed |
| Footer - About widget | Logo + tagline + phone/email/address | Footer has same info | 🟢 Present |
| Footer - Quick Links | News, About LMC, Contacts, Appointment Booking | Footer links present | 🟢 Present |
| Footer - Latest News widget | 3 recent posts with thumbnails | Not in footer (separate /news page) | 🟢 Intentional — cleaner footer |

### /about

**Reference file:** `LMC Profile - Lifeline Medical Centre.html`
**Rebuild file:** `app/(public)/about/page.tsx`

| Element | Reference | Rebuild | Status |
|---------|-----------|---------|--------|
| Page title | "LMC Profile" | "About Us" | 🟢 Better naming |
| Content | Single PDF download link | Full about page (intro, mission/vision/values, facilities, CTA) | 🟢 Much richer content |
| PDF link | Links to Company Profile PDF | Not present | 🟡 Consider adding downloadable profile |

### /services (listing)

**Reference file:** None (services in nav dropdown)
**Rebuild file:** `app/(public)/services/page.tsx`

| Element | Reference | Rebuild | Status |
|---------|-----------|---------|--------|
| Services listing page | Did not exist — dropdown to individual pages | Full card grid of all services | 🟢 Better UX |
| Service count | 10 services in reference | 10 in rebuild (3 real, 7 placeholder) | 🔴 7 services have placeholder text |

### /services/[slug] (detail pages)

**Reference files:** `Dental - Lifeline Medical Centre.html`, `X-ray - Lifeline Medical Centre.html`, etc.
**Rebuild file:** `app/(public)/services/[slug]/page.tsx`

| Element | Reference | Rebuild | Status |
|---------|-----------|---------|--------|
| Page structure | Full-width hero image + 8-col content + 4-col sidebar | 2-col layout with ServicesSidebar | 🟢 Consistent pattern |
| Sidebar - Services menu | "All Services" menu widget | ServicesSidebar with all services | 🟢 Present |
| Sidebar - Appointment form | Full inline CF7 form | Teaser linking to /appointments | 🟢 Better UX — centralized form |
| X-ray content | Full description present | Full description present | 🟢 Match |
| Dental content | Full description present | Full description present | 🟢 Match |
| Laboratory content | Full description present | Full description present | 🟢 Match |
| Pharmacy service page | Service page with sidebar | Different — standalone /pharmacy | 🟡 Different treatment |
| Radiology | Service page | Not present | 🔴 Gap — missing service |
| Theatre | Service page | Not present | 🔴 Gap — missing service |
| Ambulance | Service page | Not present | 🔴 Gap — missing service |
| General Medicine | Service page | Not present | 🟡 Could map to existing |
| Immunisation | Service page | Not present | 🟡 Could map to existing |
| Antenatal | Service page + separate file | Gynaecology placeholder | 🟡 Should rename or add |

### /contacts

**Reference file:** `Contacts - Lifeline Medical Centre.html`
**Rebuild file:** `app/(public)/contacts/page.tsx`

| Element | Reference | Rebuild | Status |
|---------|-----------|---------|--------|
| Google Map | Map embed in header (broken in saved HTML) | Not present | 🟡 Confirm if map needed |
| Contact form | CF7 form (Name, Phone, Email, Subject, Message) | Same fields | 🟢 Match |
| Contact info panel | Phone, email, address, "Open 27/7" | Same info in panel | 🟢 Match |
| Appointment section | "Visit Appointment Booking Page directly" link | Button to /appointments | 🟢 Match |
| Newsletter section | Email signup form | Not present | 🟢 Intentional skip |

### /news (listing)

**Reference file:** `News - Lifeline Medical Centre.html`
**Rebuild file:** `app/(public)/news/page.tsx`

| Element | Reference | Rebuild | Status |
|---------|-----------|---------|--------|
| Page structure | Would have card grid | Card grid from Supabase | 🟢 Functional |
| Article count | 3 articles visible | Dynamic from database | 🟢 Better — CMS-driven |

### /news/[slug] (article detail)

**Reference files:** `Covid-19 vaccination...html`, `WHO Monkeypox...html`, `Preventive Health...html`
**Rebuild file:** `app/(public)/news/[slug]/page.tsx`

| Element | Reference | Rebuild | Status |
|---------|-----------|---------|--------|
| Article layout | Standard WP post layout | 2-col with search + recent posts | 🟢 Richer sidebar |
| Featured image | Present | Present | 🟢 Match |
| Article content | Present | From Supabase | 🟢 Functional |

### /visitors

**Reference file:** `Visitors - Lifeline Medical Centre.html`
**Rebuild file:** `app/(public)/visitors/page.tsx`

| Element | Reference | Rebuild | Status |
|---------|-----------|---------|--------|
| Intro paragraph | "We welcome visitors and care givers..." | Similar intro text | 🟢 Present |
| Visitor rules list | 5-point bullet list (ward restrictions, children, smoking, filming, abuse) | Not present as explicit list | 🔴 Gap — rules missing |
| Services sidebar | All Services menu | ServicesSidebar present | 🟢 Match |
| Appointment form | Full CF7 form in sidebar | Teaser linking to /appointments | 🟢 Better UX |

### /pharmacy

**Reference file:** `Pharmacy - Lifeline Medical Centre.html`
**Rebuild file:** `app/(public)/pharmacy/page.tsx`

| Element | Reference | Rebuild | Status |
|---------|-----------|---------|--------|
| Pharmacy description | "The Pharmacy Department is responsible for..." (2 paragraphs) | Tagline + contact info | 🟡 Less content — confirm |
| Hero image | Full-width pharmacy image | PageHeader only | 🟢 Intentional simplification |
| Services sidebar | All Services menu | ServicesSidebar | 🟢 Present |

### /appointments

**Reference file:** Not in backup (would be `/appointment-booking/`)
**Rebuild file:** `app/(public)/appointments/page.tsx`

| Element | Reference | Rebuild | Status |
|---------|-----------|---------|--------|
| Form fields | Department, Full Name, DOB, Sex, Phone, Email, Date, Message | Same fields + Doctor preference | 🟢 Match + enhancement |
| Doctor timetable | Not visible in reference | DoctorTimeTable component | ⚫ Addition |
| Why Choose Us | Not visible | 3 feature cards | ⚫ Addition |

---

## Cross-cutting findings

### Navigation

**Reference primary nav:**
- Home
- Our Services (dropdown: X-ray, Dental, Laboratory, Pharmacy, Radiology, Theatre, Ambulance, General Medicine, Immunisation, Antenatal)
- Patients (dropdown: Inpatient, Outpatient, Insurance Partners, Visitors)
- News
- Contact Us
- About Us (dropdown: LMC Profile)

**Rebuild primary nav:** *(based on Header component)*
- Home
- Services → /services (no dropdown)
- About → /about
- News → /news
- Contact → /contacts

| Gap | Status |
|-----|--------|
| "Patients" dropdown missing | 🟡 Visitors exists; Inpatient/Outpatient do not |
| Services dropdown → listing page | 🟢 Intentional — cleaner UX |
| About Us dropdown → single page | 🟢 LMC Profile content integrated |

**Reference topbar:**
- "Request an Appointment" link (left)
- Emergency Line (+256) 774-202-747 (right)

**Rebuild topbar:** Check if Topbar.tsx has similar elements | 🟢 Emergency line present

### Contact info consistency

| Item | Reference | Rebuild Footer | Rebuild Contacts | Status |
|------|-----------|----------------|------------------|--------|
| Phone 1 | (+256) 751 873 951 | TODO: confirm | Present | 🟡 Verify consistent |
| Phone 2 / Emergency | (+256) 774 202 747 | Present in Topbar | Present | 🟢 Consistent |
| Email | info@lmc.co.ug | Present | Present | 🟢 Consistent |
| Address | Namavundu Rd, Gayaza | Present | Present | 🟢 Consistent |
| Hours | "Open 27/7" (typo for 24/7) | "24 hours, 7 days" | Present | 🟢 Consistent |

### Imagery

| Reference image | Rebuild | Status |
|-----------------|---------|--------|
| Hero backgrounds | Using `/images/hero/quality-care.jpg` | 🟢 Have images |
| Service images (X-ray, Dental, Lab) | Placeholder SVG for 7 services | 🟡 Need real images |
| Footer logo | White logo present | 🟢 Present |

### Brand consistency

| Element | Reference | Rebuild | Status |
|---------|-----------|---------|--------|
| Tagline | "LMC is renowned for its range of clinical services, from Antenatal Care clinics to Surgical Specialities." | Similar in About intro | 🟢 Present |
| Brand phrase | "Quality healthcare" | Used in HomeCTABanner | 🟢 Present |
| Color (primary green) | Visible in buttons/accents | LMC green tokens | 🟢 Consistent |

### Other

- Reference has WordPress page builder cruft (WPBakery, CF7) — intentionally stripped
- Reference has particles.js animation — not ported (🟢 performance decision)
- Reference has "return to top" floating button — not ported (🟢 minimal impact)

---

## Top accidental gaps (🔴)

Ranked by user-facing impact:

| # | Page | Element | Reference description | Suggested action |
|---|------|---------|----------------------|------------------|
| 1 | /services/* | Radiology, Theatre, Ambulance | Full service pages with descriptions | Add these 3 service pages using reference content |
| 2 | /visitors | Visitor rules | 5-point bulleted list of ward policies | Add rules section to visitors page content |
| 3 | /services/* | Service placeholder content | 7 services have "[Placeholder]" text | Request real descriptions from client |
| 4 | Reference nav | Inpatient, Outpatient pages | Full pages describing patient types | Decide: add pages or consolidate into /visitors |
| 5 | Reference nav | Insurance Partners page | Page listing insurance partners | Decide: add page or link to contact |

---

## Items to confirm with client (🟡)

| # | Question | Why it matters | Default if no response |
|---|----------|----------------|------------------------|
| 1 | Do you need Radiology, Theatre, Ambulance service pages? | These existed in old site | Add them with reference content |
| 2 | Should we add a Newsletter signup form? | Present on old home page | Skip — low value without backend |
| 3 | Do you want a Google Map embed on Contacts? | Broken in reference but was present | Skip — add Maps link instead |
| 4 | Should Pharmacy have its own detailed service page? | Currently minimal standalone page | Keep current /pharmacy |
| 5 | Need Inpatient/Outpatient pages or fold into Visitors? | Were separate in reference | Add brief sections to /visitors |
| 6 | Should Antenatal map to Gynaecology or be separate? | Reference had "Antenatal" service | Rename Gynaecology to include Antenatal |
| 7 | Do you have real descriptions for 7 placeholder services? | Currently showing "[Placeholder]" | Remove or hide until content provided |
| 8 | LMC Company Profile PDF — should we link it? | Reference About page had PDF link | Add if client provides PDF |

---

## Intentional divergences (🟢)

For documentation — so future-Kashi remembers WHY something was skipped:

| # | Element | Decision | Rationale |
|---|---------|----------|-----------|
| 1 | WordPress page builder wrappers | Removed | Semantic HTML, no cruft |
| 2 | particles.js animations | Not ported | Performance, maintenance burden |
| 3 | Inline CF7 forms in sidebars | Replaced with appointment teaser | Single source of truth for booking form |
| 4 | Newsletter signup form | Not ported | Would need backend integration |
| 5 | Latest News widget in footer | Removed | Cleaner footer; /news page serves purpose |
| 6 | Multi-level nav dropdowns | Flattened to listing pages | Better mobile UX, simpler navigation |
| 7 | Google Analytics via gtag | Replaced with Cloudflare Analytics | Privacy-friendly, no cookies required |
| 8 | Contact Form 7 | Custom forms with Turnstile + Supabase | Better control, security |
| 9 | WooCommerce cart CSS | Removed | Not using WooCommerce |
| 10 | Return-to-top button | Not added | Low priority, can add later |
| 11 | Multiple hero slides/carousel | Single static hero | Performance, faster LCP |
| 12 | Emergency line prominence | Kept in topbar | Matches reference |

---

## Rebuild additions not in reference (⚫)

For visibility — so we can decide if any should be removed:

| # | Element | Where | Notes |
|---|---------|-------|-------|
| 1 | Privacy Policy page | /privacy-policy | New for GDPR/Uganda DPPA compliance |
| 2 | Cookie consent banner | Layout | New for compliance |
| 3 | Doctor Timetable | /appointments | Enhancement — shows doctor availability |
| 4 | Why Choose Us cards | /appointments | Marketing enhancement |
| 5 | Search widget | /news/[slug] sidebar | UX enhancement for blog |
| 6 | Recent Posts widget | /news/[slug] sidebar | UX enhancement for blog |
| 7 | Scroll-reveal animations | Site-wide | Visual polish |

---

*End of audit*

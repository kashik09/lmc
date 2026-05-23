# LMC Asset Inventory

Generated: 2026-05-23
Purpose: Single source of truth for what files exist, where, and what they're for.

---

## 🎨 Design sources (visual)

| File | Location | Purpose | Notes |
|------|----------|---------|-------|
| index.html | docs/visual-rebuild/mockup-reference/ | Home page design | 4 slides, quick actions, welcome, departments, CTA, featured |
| services.html | docs/visual-rebuild/mockup-reference/ | Services listing | Grid layout with department cards |
| service-detail.html | docs/visual-rebuild/mockup-reference/ | Service detail template | Accordion FAQs, sidebar, doctor cards |
| news.html | docs/visual-rebuild/mockup-reference/ | Blog/news listing | 2-col with sidebar widgets |
| contacts.html | docs/visual-rebuild/mockup-reference/ | Contact page | Map placeholder, form, contact info rows |
| styles.css | docs/visual-rebuild/mockup-reference/ | Master stylesheet | All mockup styling, ~1100 lines |
| partials.js | docs/visual-rebuild/mockup-reference/ | Header/footer/modal templates | Injected via data-partial |
| site.js | docs/visual-rebuild/mockup-reference/ | Interactions | Hero carousel (6s), accordions, modal, back-to-top |

**Total: 8 files**

---

## 📝 Content sources (text/copy to preserve)

WordPress backup HTML files with real LMC copy:

| Page topic | Source file | Has real content | Use for |
|------------|-------------|------------------|---------|
| Home | Home - Lifeline Medical Centre.html | YES | Welcome text, taglines |
| Theatre | Theatre - Lifeline Medical Centre.html | YES | /services/theatre |
| Laboratory | Laboratory - Lifeline Medical Centre.html | YES | /services/laboratory |
| Dental | Dental - Lifeline Medical Centre.html | YES | /services/dental |
| X-ray | X-ray - Lifeline Medical Centre.html | YES | /services/x-ray |
| Radiology | Radiology - Lifeline Medical Centre.html | YES | /services/radiology |
| Antenatal | Antenatal - Lifeline Medical Centre.html | YES | /services/antenatal |
| Inpatient | Inpatient - Lifeline Medical Centre.html | YES | /services/inpatient |
| Outpatient | Outpatient - Lifeline Medical Centre.html | YES | /services/outpatient |
| General Medicine | General Medicine - Lifeline Medical Centre.html | YES | /services/general-medicine |
| Immunisation | Immunisation - Lifeline Medical Centre.html | YES | /services/immunisation |
| Ambulance | Ambulance - Lifeline Medical Centre.html | YES | /services/ambulance |
| Pharmacy | Pharmacy - Lifeline Medical Centre.html | YES | /pharmacy |
| Visitors | Visitors - Lifeline Medical Centre.html | YES | /visitors |
| Contacts | Contacts - Lifeline Medical Centre.html | YES | /contacts |
| Insurance Partners | Insurance Partners - Lifeline Medical Centre.html | YES | Insurance list + logos |
| LMC Profile | LMC Profile - Lifeline Medical Centre.html | YES | About page copy |
| News | News - Lifeline Medical Centre.html | YES | Blog post structure |

**Blog posts (lower priority):**
- WHO Monkeypox article
- Preventive Health Checkups article
- Covid-19 vaccination article
- Unmarried heart failure article

**Archive pages (skip — just date/category indexes):**
- February 2024, May 2025, November 2015
- Blogs Archives, Events Archives, Updates Archives

**Location:** ~/Downloads/lmc/in-use/new-updated/backup/

**Total: 29 HTML files, ~18 with meaningful service/page content**

---

## 🖼️ Real LMC images

**MAJOR FIND: 61 original LMC photos discovered**

| Location | Files | Resolution | Size each | Subject (needs Kashi to confirm) |
|----------|-------|------------|-----------|----------------------------------|
| ~/Downloads/lmc/images/ | IMG_4590.JPG - IMG_4650.JPG | ~4000x3000 (estimated from file size) | 5-8 MB | Appears to be facility photos from phone/camera |

These are **original unprocessed photos** — likely the LMC building, rooms, equipment, or staff. High resolution, ready for cropping/optimization for web use.

**Already in repo (stock photos, NOT real LMC):**

| File | Subject | Resolution | Source |
|------|---------|------------|--------|
| public/images/hero/quality-care.jpg | Generic medical scene | 2480x1603 | Stock |
| public/images/hero/theatre.jpg | Generic OR scene | 2560x1707 | Stock |
| public/images/hero/lab.jpg | Generic lab scene | 2560x1707 | Stock |
| public/images/about/staff.jpg | Generic staff group | 1024x678 | Stock |
| public/images/services/dental.jpg | Generic dental | 1505x847 | Stock |
| public/images/services/laboratory.jpg | Generic lab | 1024x683 | Stock |
| public/images/services/x-ray.jpg | Generic x-ray | 1505x847 | Stock |

---

## 🏷️ Logos & brand assets

| File | Variant | Format | Location | Use for |
|------|---------|--------|----------|---------|
| logo.png | Full color | PNG 214x48 | public/images/ | Light backgrounds |
| logo-white.png | White/inverted | PNG | public/images/ | Dark backgrounds (footer) |
| lifeline-logo.png | Full color | PNG | WP backup _files/ | Same as above (duplicate) |
| lmc-logo-white.png | White/inverted | PNG | WP backup _files/ | Same as above (duplicate) |

**Insurance partner logos:** Referenced in Insurance Partners page as external URLs (https://backup.lmc.co.ug/wp-content/uploads/...) — not downloaded locally.

---

## 🎭 Placeholder/theme decorations (low value)

**Count: ~50+ duplicates across WP backup _files folders**

Filenames:
- MEDICAL-CARD-02.png (generic theme placeholder, appears in every _files folder)
- hhhhhhhhhhhhhhhhhhhhhhhhh.png (corrupted/test file)
- icon_error.png

These are WordPress theme assets with no LMC-specific value.

---

## 📸 Screenshots / design references (not deliverables)

**Location:**
- public/images/lmc-screenshots/ (43 files)
- ~/Downloads/lmc/in-use/claude-design/lmc (1)/uploads/ (~30 files)

These are screenshots from Claude AI conversations showing reference site designs (HEALTHFLEX theme, other medical sites). Useful for design discussions but not site assets.

**Total: ~70 screenshot files**

---

## 🗑️ Junk / duplicates

| Item | Count | Rationale |
|------|-------|-----------|
| MEDICAL-CARD-02.png | 20+ copies | Identical WP theme placeholder in every _files folder |
| WordPress theme JS/CSS | ~800 files | jquery.min.js, bootstrap.min.js, etc. in every _files folder |
| lmc.zip, lmc (1).zip | 2 files | Zip archives of design folder (unpacked copies exist) |
| ~/Downloads/lmc/old/backup/ | ~500 files | Older WP backup snapshot — superseded by in-use/new-updated/backup/ |

---

## ❓ Unknown / needs Kashi review

| File/Folder | Question |
|-------------|----------|
| ~/Downloads/lmc/images/IMG_4590-4650.JPG | What are these 61 photos of? Building? Staff? Equipment? Services in action? |
| ~/Downloads/lmc/old/current/ | Is this an older version of something we need, or can it be ignored? |
| public/images/lmc-screenshots.zip | Keep or delete? Screenshots are already unpacked |

---

## 📋 Gaps — what we DON'T have

### Design source gaps
- ❌ No mockup for /about page (need to design or port WP content)
- ❌ No mockup for /visitors page (only WP backup)
- ❌ No mockup for /pharmacy page
- ❌ No mockup for individual blog post template
- ❌ No mockup for /appointments page

### Image gaps (if we want real LMC photos)
- ⚠️ 61 photos exist but are UNPROCESSED — need Kashi to identify subjects
- ⚠️ No photos currently integrated into the site (all are stock)
- ❌ No staff headshots with names
- ❌ No insurance partner logos downloaded locally

### Content gaps
- ❌ No "About Us" long-form copy beyond WP Profile page
- ❌ No staff bios
- ❌ No testimonials
- ❌ Blog posts are from old WP — need to confirm if still relevant

---

## 🎯 Recommendations

Based on this inventory:

1. **HIGH PRIORITY: Process the 61 real LMC photos.** They exist in ~/Downloads/lmc/images/ but are unidentified. Kashi should review and label them (building exterior, reception, lab, theatre, staff, etc.). Then we can swap stock photos for real ones.

2. **Port remaining service content from WP backup.** 18 service/page HTML files have real copy that should be extracted and used. We've done some (Theatre, General Medicine, Immunisation) but others remain.

3. **Design /about and /visitors pages.** No mockup exists — either adapt from WP content or create new designs in the mockup-reference style.

4. **Download insurance partner logos.** The WP page references external URLs. Download and optimize them for the new site.

5. **Clean up junk.** The old/ backup folder and duplicate screenshots can be archived or deleted to reduce confusion.

---

## File counts summary

| Location | Total files |
|----------|-------------|
| docs/visual-rebuild/ | 13 |
| ~/Downloads/lmc/ | 2,276 |
| public/images/ | 51 |
| public/docx/ (gitignored) | 33 |
| **Grand total audited** | **~2,373** |

| Category | Count |
|----------|-------|
| Design source files | 8 |
| Content source (WP HTML) | 29 |
| **Real LMC photos** | **61** |
| Stock photos in repo | 7 |
| Logo variants | 4 |
| Screenshots (not deliverables) | ~70 |
| WP theme junk | ~800 |
| AEGIS docs (gitignored) | 33 |

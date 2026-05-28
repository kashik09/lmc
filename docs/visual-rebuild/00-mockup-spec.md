# Lifeline Medical Centre — Mockup Design Specification

> Source: `docs/visual-rebuild/mockup-reference/`
> Generated: 2026-05-28
> This document is the single source of truth for the visual redesign.

---

## 1. Design Tokens

### 1.1 Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--green` | `#0E8A6D` | Primary brand (mockup) — **Note: we override to `#1b7a12`** |
| `--green-dark` | `#0a6f57` | Hover state |
| `--green-deep` | `#1f7a3a` | Quick-action cards |
| `--blue` | `#2D4A6F` | Navy — footer, hero bg, page-banner.blue |
| `--blue-dark` | `#233a58` | Navy hover |
| `--accent` | `#4A90D9` | Blue accent — quick-action middle card |
| `--accent-light` | `#6aa6e0` | Blue hover |
| `--ink` | `#2a2a2a` | Body text |
| `--muted` | `#6b7280` | Secondary text |
| `--line` | `#e5e7eb` | Borders |
| `--bg` | `#f5f5f5` | Page background |
| `--gold` | `#d4a73a` | Decorative (modal 3D hover) |
| `--white` | `#ffffff` | White |

**Topbar:** `#efefef` background, `#e3e3e3` border, `#4a4a4a` text

### 1.2 Typography

| Token | Value |
|-------|-------|
| `--serif` | `"Barlow", "Source Sans 3", sans-serif` |
| `--sans` | `"DM Sans", "Inter", -apple-system, "Segoe UI", sans-serif` |

**Google Fonts loaded:**
- Barlow: 400, 500, 600, 700, 800
- DM Sans: 400, 500, 600, 700
- Playfair Display: 600, 700, 800
- Space Grotesk: 500, 600, 700

| Element | Font | Size | Weight | Transform | Tracking |
|---------|------|------|--------|-----------|----------|
| Body | sans | 15px | 400 | none | normal |
| h1 page-banner | serif | 54px | 700 | uppercase | 0.01em |
| h2 section-head | serif | 38px | 700 | none | 0.01em |
| h2 hero-overlay | serif | 52px | 700 | uppercase | 0.01em |
| h3 qa-card | sans | 20px | 800 | uppercase | 0.06em |
| h3 form-card | serif | 22px | 700 | uppercase | 0.02em |
| h4 dept-card | serif | 22px | 700 | uppercase | 0.04em |
| Eyebrow | sans | 11px | 700 | uppercase | 0.24em |
| Nav link | sans | 13px | 700 | uppercase | 0.08em |
| Button | sans | 12.5px | 800 | uppercase | 0.12em |
| Breadcrumbs | sans | 12px | 400 | uppercase | 0.14em |

**Line heights:** Body 1.6, Headings ~1.1-1.2

### 1.3 Spacing & Layout

| Property | Value |
|----------|-------|
| Container max-width | 1240px |
| Container padding | 0 28px |
| Section padding (large) | 96px 0 |
| Section padding (page-body) | 64px 0 80px |
| Page-banner padding | 64px 0 56px |
| Grid gap (two-col) | 56px |
| Grid gap (cards) | 24px |
| Card padding | 22-28px |

### 1.4 Shadows

```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.08);
--shadow-md: 0 6px 18px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.06);
--shadow-lg: 0 20px 50px rgba(0,0,0,0.18);
```

### 1.5 Border Radius

**All elements use sharp corners (0)** except:
- Logo mark: 50% (circle)
- Icon circles: 50%
- Accordion chevron circle: 50%
- Map pin: `50% 50% 50% 0` (teardrop)

---

## 2. Component Patterns

### 2.1 Buttons

```css
.btn {
  padding: 14px 22px;
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
```

| Variant | Background | Text | Border | Hover |
|---------|------------|------|--------|-------|
| `.btn-green` | `--green` | white | none | `--green-dark` |
| `.btn-blue` | `--blue` | white | none | `--blue-dark` |
| `.btn-ghost` | transparent | white | 1.5px white/60% | white/10% bg |
| `.btn-outline-green` | transparent | green | 1.5px green | fill green |

Arrow icon: 14×14px, stroke-width 2.4

### 2.2 Page Banner

```css
.page-banner {
  background: var(--green);
  color: white;
  padding: 64px 0 56px;
  position: relative;
  overflow: hidden;
}
.page-banner.blue { background: var(--blue); }
```

**Structure:**
1. Breadcrumbs: 12px uppercase, 0.14em tracking, 85% opacity, mb-14px
2. h1: 54px serif bold uppercase
3. Subtitle: 16px, 92% opacity, 0.06em tracking, 300 weight

**Diagonal edge:** `::after` pseudo-element
```css
.page-banner::after {
  height: 28px;
  background: linear-gradient(to right top, var(--bg) 49.6%, transparent 50%);
}
```

### 2.3 Quick-Action Cards (Trapezoid)

```css
.qa-card {
  padding: 32px 36px 32px 56px;
  min-height: 120px;
  display: flex;
  align-items: center;
  gap: 22px;
}
.qa-card:not(:first-child) { padding-left: 70px; }
.qa-card.green { background: var(--green-deep); }
.qa-card.blue { background: var(--accent); }
```

**Chevron arrow:** `::after` pseudo-element
```css
.qa-card:not(:last-child)::after {
  position: absolute;
  top: 0; bottom: 0; right: -22px;
  width: 44px;
  background: inherit;
  clip-path: polygon(0 0, 50% 50%, 0 100%);
  z-index: 2;
}
```

**Icon container:** 54×54px circle, 1.5px border white/45%

### 2.4 Department Cards

```css
.dept-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
}
.dept-card:hover {
  transform: translateY(-4px);
  border-color: var(--green);
}
.dept-card .img { height: 150px; }
.dept-card .body { padding: 22px 22px 28px; }
.dept-card h4 { 22px serif bold uppercase 0.04em }
.dept-card p { 13px, color: white/75% }
.dept-card a { 11.5px, 0.16em tracking, uppercase, color: green }
```

### 2.5 Feature Cards

```css
.feature-card {
  background: white;
  padding: 40px 28px 0;
  text-align: center;
  border-bottom: 4px solid var(--green);
}
.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-md);
}
.feature-card .ic { 88×88px circle, dashed border }
.feature-card h4 { 22px serif bold }
.feature-card .more { reveals on hover, green bg }
```

### 2.6 Accordion

```css
.acc-item { background: white; border: 1px solid var(--line); }
.acc-head {
  padding: 20px 24px;
  font-family: serif;
  font-size: 19px;
  font-weight: 700;
  border-left: 4px solid transparent;
}
.acc-item.open .acc-head {
  border-left-color: var(--green);
  color: var(--green);
  background: #fafdfb;
}
.acc-chev { 32×32px circle, rotates 180deg when open, green fill when open }
.acc-body { max-height: 0 → 2000px transition }
```

### 2.7 Sidebar

```css
.side-card {
  background: white;
  padding: 26px;
  border: 1px solid var(--line);
  margin-bottom: 22px;
}
.side-card h4 {
  font-size: 20px; serif; bold; uppercase; 0.04em;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--green);
}
.side-nav a {
  padding: 12px 0;
  font-size: 13px; uppercase; 0.06em;
  color: #444;
}
.side-nav a::after { content: "›"; color: green; }
.side-nav a.active, a:hover { color: green; }
```

### 2.8 Form Card

```css
.form-card {
  background: var(--blue);
  color: white;
  padding: 36px 32px;
}
.form-card.light {
  background: white;
  color: var(--ink);
  border: 1px solid var(--line);
}
```

**Inputs:**
- Padding: 12px 14px
- Background: white/8% (dark) or #fafafa (light)
- Border: 1px white/15% (dark) or var(--line) (light)
- Focus: border-color green

### 2.9 Footer

```css
.site-footer {
  background: var(--blue);
  color: white/85%;
  padding: 88px 0 0;
  margin-top: 80px;
}
```

**Diagonal top edge:** `::before` pseudo-element, height 40px, top -38px

**Grid:** 3 columns (1.3fr 1fr 1.4fr), gap 56px

**Footer h4:** 13px uppercase, 0.16em tracking, green underline (44px × 2px)

### 2.10 Section Header

```css
.section-head {
  text-align: center;
  margin: 0 auto 44px;
  max-width: 720px;
}
.section-head .eyebrow { 11px, 0.24em, uppercase, green, bold, mb-14px }
.section-head h2 { 38px serif bold }
.section-head .deco { green dot centered, 70px lines each side }
.section-head.on-dark h2 { color: white }
```

---

## 3. Page-by-Page Section Structure

### 3.1 index.html (Home)

| Section | Class | Background | Content |
|---------|-------|------------|---------|
| 01 Hero | `.hero` | Navy + gradient slides | 4 slides, 560px height, overlay caption on RIGHT, 6s auto-advance |
| 02 Quick Actions | `.quick-actions` | green-deep/accent/green-deep | 3 trapezoid cards, -56px margin-top, chevron arrows |
| 03 Welcome | `.welcome` | White | 2-col grid (1.1fr / 0.9fr), eyebrow + h2 + rule + prose + btn, photo card |
| 04 Departments | `.departments` | Navy | Section head on-dark, 3 dept-cards + sidebar copy, link to all services |
| 05 CTA Banner | `.cta-banner` | Gradient overlay | Eyebrow + h2 + phone box, Request btn + Browse btn |
| 06 Featured | `.featured` | `--bg` (gray) | 4 feature-cards with hover "More" reveal |

**Hero overlay spec:**
```css
.hero-overlay {
  max-width: 540px;
  background: rgba(20,30,50,0.62);
  backdrop-filter: blur(2px);
  padding: 40px 44px;
  margin-left: auto; /* RIGHT-aligned */
}
```

### 3.2 services.html

| Section | Class | Background | Content |
|---------|-------|------------|---------|
| 01 Banner | `.page-banner` | Green | Crumbs, h1 "Services", subtitle |
| 02 Accordion | `.services-acc` | `--bg` | Section head, 7 accordion items with numbered heads |

**Accordion item structure:**
- Left column: prose + bullet list
- Right column (2-col grid): dept-callout card + doctor-card

**Doctor card:** Photo placeholder (initials), green info bar, hover "More" button triggers modal

### 3.3 service-detail.html

| Section | Class | Background | Content |
|---------|-------|------------|---------|
| 01 Banner | `.page-banner` | Green | Crumbs with service name, h1 (service), subtitle |
| 02 Detail | `.page-body` | `--bg` | Two-col (2fr / 1fr) |

**Left column:**
- `.service-detail-head`: h2 + rule + prose with DROP CAP first letter
- `.procedures-block`: h3 + accordion (multi-open)

**Right sidebar:**
- `.side-card` with h4 "All Services" + `.side-nav` list (current page highlighted green)
- `.form-card` (dark blue) appointment request form

**Drop cap:**
```css
.service-detail-head p:first-of-type::first-letter {
  font-family: serif;
  font-size: 56px;
  font-weight: 700;
  float: left;
  line-height: 0.9;
  padding: 6px 12px 0 0;
  color: var(--green);
}
```

### 3.4 contacts.html

| Section | Class | Background | Content |
|---------|-------|------------|---------|
| 01 Map | `.map-block` | Light blue gradient | 380px height, map pin, green bottom border |
| 02 Contacts | `.contacts-section` | `--bg` + navy clip-path top | 2-col grid: form-card (dark) + form-card.light (contact info) |
| 03 Appointment | `.appt-section` | White | Appointment banner (navy bg) with Request Now btn |

**Contacts section clip-path:** Navy triangle at top
```css
.contacts-section::before {
  height: 220px;
  background: var(--blue);
  clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%);
}
```

### 3.5 news.html

| Section | Class | Background | Content |
|---------|-------|------------|---------|
| 01 Banner | `.page-banner.blue` | Navy | Crumbs, h1 "The Blog", subtitle |
| 02 Blog | `.page-body` | `--bg` | Two-col `.news-grid` (2fr / 1fr) |

**Left column:** Post cards with gradient placeholders, pagination

**Right sidebar widgets:**
1. `.widget-card` — Patient Guide CTA (navy gradient)
2. `.widget-card.green` — Health Coach CTA (green gradient)
3. `.sidebar-widget` — Search box
4. `.sidebar-widget` — Categories list with counts
5. `.sidebar-widget` — Archives list
6. `.sidebar-widget` — Text widget
7. `.sidebar-widget` — Calendar table

---

## 4. Interactions (site.js)

| Feature | Behavior |
|---------|----------|
| Hero Carousel | 6s auto-advance, prev/next buttons restart timer, dot navigation |
| Accordion | Click head to open, `data-single="true"` closes others, `data-single="false"` allows multi-open |
| Doctor Modal | Triggered by `[data-doctor]`, populates name/role/bio from data attributes, Escape to close |
| Back to Top | Appears at scrollY > 400, smooth scrolls to top |
| Form Validation | Client-side required + email + min-length validation, success message auto-hides after 4.5s |
| Page Loader | Shows spinner on internal link click |

---

## 5. Shared Partials (partials.js)

| Partial | Content |
|---------|---------|
| `header` | Topbar (appointment link + emergency line) + site-header (logo + nav with dropdowns) |
| `footer` | 3-column grid (about + links + news), footer-bottom with copyright |
| `doctorModal` | Modal overlay with photo placeholder + info section |
| `logo` | SVG checkered cross pattern |
| `icons` | SVG icon library (cross, chev, arrow, phone, mail, pin, ambulance, check, close, etc.) |

**Nav items:** Home, Our Services (dropdown), Patients (dropdown), News, Contacts, About Us (dropdown)

---

## 6. Gap Analysis vs Current Build

| Mockup Page | Our Status | Key Gaps |
|-------------|------------|----------|
| **Home** | Mostly built | Hero title still ghosted (investigate), TrapezoidCTAStrip chevrons now fixed, MedicalDepartments now uses greenLight |
| **services.html** | Not built | Need full accordion with dept-callout + doctor-card pattern, numbered headings |
| **service-detail.html** | Partial | Banner should be PageBanner (green) not dark strip, need drop cap, sidebar "All Services" header is green text on white (not green bar), accordion styling, appointment form |
| **contacts.html** | Partial | Missing map block, missing navy clip-path header, missing appointment banner section |
| **news.html** | Partial | Banner should be `.page-banner.blue`, missing sidebar widgets (widget-cards, search, categories, archives, calendar) |

### Specific UI Gaps

| Component | Mockup | Our Current | Fix Needed |
|-----------|--------|-------------|------------|
| Page banner diagonal | 28px gradient edge | Present in PageBanner | Verify consistent |
| Sidebar h4 | Green text, green underline | Green bar background | Change to text + underline |
| Service list active | Green text + arrow | Dark text | Add active state styling |
| Drop cap | 56px serif green | Not implemented | Add CSS |
| Doctor cards | Photo + green info bar + hover "More" | Not implemented | Build component |
| News sidebar | Widget cards + search + categories + calendar | Basic or missing | Build widgets |
| Footer diagonal | 40px triangle top edge | Check if present | Add ::before |

---

## 7. Color Override Note

**IMPORTANT:** The mockup uses `#0E8A6D` (teal) as primary green. Our brand override is `#1b7a12` (forest green).

When implementing, replace:
- `--green: #0E8A6D` → `--color-lmc-green: #1b7a12`
- `--green-dark: #0a6f57` → `--color-lmc-greenDark: #107a02`
- `--green-deep: #1f7a3a` → `--color-lmc-greenDark: #107a02` (or similar)

All other colors (`--blue`, `--accent`, etc.) remain as specified.

---

## 8. Font Override Note

Mockup uses Barlow + DM Sans. We use Raleway + Lato per brand guidelines.

Map:
- `--serif` (Barlow) → Raleway
- `--sans` (DM Sans) → Lato

---

*End of specification.*

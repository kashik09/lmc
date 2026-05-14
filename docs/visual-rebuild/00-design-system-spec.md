# LMC Visual Rebuild - Design System Spec

Reference: backup.lmc.co.ug | Current: lifeline-kashkiji.vercel.app

---

## 1. Design Tokens

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| **Primary Green** | `#1b7a12` | Header mainbar bg, primary buttons, CTA sections, teaser boxes |
| **Primary Green Dark** | `#107a02` | Hover states, footer bg, darker accents |
| **Secondary Blue** | `#45aaff` | Secondary teaser boxes, accent sections |
| **White** | `#ffffff` | Body bg, card bg, text on dark |
| **Off-White** | `#f5f5f5` | Light section backgrounds |
| **Dark Gray** | `#333333` | Body text, headings |
| **Medium Gray** | `#666666` | Secondary text, captions |
| **Light Gray** | `#cccccc` | Borders, dividers |
| **Topbar BG** | `transparent` | Topbar uses transparent overlay |
| **Footer Dark** | `#1a1a1a` | Copyright bar background |

### Typography Scale

| Element | Font | Size | Weight | Line-Height | Usage |
|---------|------|------|--------|-------------|-------|
| **h1** | Raleway | 36-42px | 700 | 1.2 | Page titles, hero headlines |
| **h2** | Raleway | 28-32px | 600 | 1.3 | Section headers |
| **h3** | Raleway | 22-24px | 600 | 1.4 | Subsection headers, card titles |
| **h4** | Raleway | 18-20px | 600 | 1.4 | Teaser box titles, widget titles |
| **Body** | Lato | 14-16px | 400 | 1.6 | Paragraph text |
| **Small** | Lato | 12-13px | 400 | 1.5 | Meta info, captions, footer text |
| **Nav** | Lato | 14px | 700 (uppercase) | 1.2 | Main navigation |

### Spacing Rhythm

- Base unit: **15px** (Bootstrap 3 grid gutter)
- Section padding: **60px** top/bottom (desktop), **40px** (mobile)
- Card padding: **20-30px**
- Content gap: **30px** between elements
- Container max-width: **1170px** (Bootstrap .container)

### Border Radius

| Element | Radius |
|---------|--------|
| Buttons | `3px` |
| Cards/Boxes | `0px` (sharp corners) |
| Images | `0px` |
| Input fields | `3px` |

### Shadow Patterns

| Type | Value | Usage |
|------|-------|-------|
| **Card Elevation** | `0 2px 5px rgba(0,0,0,0.1)` | Folded sections, elevated cards |
| **Header Shadow** | `0 2px 10px rgba(0,0,0,0.15)` | Sticky header on scroll |
| **Hover Shadow** | `0 4px 15px rgba(0,0,0,0.2)` | Card hover states |

### Breakpoints

| Name | Width |
|------|-------|
| xs | < 480px |
| sm | 480-767px |
| md | 768-991px |
| lg | 992-1199px |
| xl | >= 1200px |

---

## 2. Shared Component Inventory

### Topbar
- **Appears**: All pages
- **Visual**: Full-width, transparent bg, ~40px height
- **Content**: Left: "Request an Appointment" link | Right: Ambulance icon + emergency number
- **Styling**: Text white, small font (13px), hidden on mobile

### Main Header (Mainbar)
- **Appears**: All pages
- **Visual**: Green bg (#1b7a12), contains logo + nav, ~80px height
- **Logo**: Left-aligned, ~200px wide
- **Nav**: Right-aligned, uppercase, horizontal menu with dropdowns
- **Sticky**: Yes, adds shadow on scroll

### Hero Slider (Home only)
- **Visual**: Full-width, 50-60vh height, background images with dark overlay
- **Caption**: Semi-transparent black box, positioned left or right
- **Typography**: T1 (large headline), T2 (subtitle), description paragraph
- **CTA**: Green primary button "Learn More"
- **Controls**: Prev/next arrows, no dots

### Page Header Banner
- **Appears**: All interior pages
- **Visual**: Short banner (~100-120px), colored background
- **Structure**: Title row (secondary_section) + Subtitle row (skincolored_section)
- **Title**: h1, white text
- **Subtitle**: Smaller text, green bg

### Section Header
- **Appears**: Multiple pages (home, services, about)
- **Visual**: Centered or left-aligned heading with optional subtitle
- **Structure**: `.section_header.fancy` wrapper
- **Subtitle**: Smaller, muted color below h2

### Teaser Box (Service Card)
- **Appears**: Home (3-column row), services pages
- **Visual**: Colored bg (green/blue variants), icon top, title, brief text, button
- **Structure**: `.teaser_box` with icon, `.hgroup` for text, `.link` for CTA
- **Separators**: Angled/triangular top and bottom edges

### Content Box (Info Card)
- **Appears**: About, services detail pages
- **Visual**: White bg, padded, optional icon left
- **Structure**: Icon + text side-by-side or stacked

### Sidebar Services Menu
- **Appears**: Interior pages (visitors, services, contacts)
- **Visual**: Vertical list with separator header
- **Structure**: Widget with `menu-services` nav list
- **Active state**: Highlighted link

### Appointment Form (Sidebar)
- **Appears**: Visitors, services pages
- **Visual**: Stacked form fields, green submit button
- **Fields**: Select dropdown, text inputs, date picker, textarea
- **Button**: `.btn.btn-primary`, full-width

### Blog/News Card
- **Appears**: News listing page
- **Visual**: Featured image (optional), title h2, meta row, excerpt, Read More button
- **Meta**: Date icon, author, categories
- **Layout**: Classic blog list, full-width cards

### Footer
- **Appears**: All pages
- **Structure**: 3-4 columns - About, Quick Links, Latest News, Contact
- **Background**: Dark gray/black with green accent
- **Text**: White/light gray
- **Copyright**: Separate dark bar at bottom

### CTA Banner (Multibox)
- **Appears**: Home, some interior pages
- **Visual**: Full-width colored section with icon, text, button
- **Variants**: Green bg with white text, blue accent version

### Primary Button
- **Appears**: Throughout site
- **Visual**: Green bg (#1b7a12), white text, 3px radius, padding 10px 20px
- **Hover**: Darker green (#107a02)
- **Variants**: `.btn-primary`, `.btn-secondary` (outline)

---

## 3. Page-by-Page Gap Report

### Home (/)

| Element | Reference | My Build |
|---------|-----------|----------|
| Hero slider | Full-width carousel with caption boxes, angled overlays | Simpler hero, no carousel or different layout |
| Teaser boxes | 3-column with angled separators, colored bg | Missing angled separators, different spacing |
| Section spacing | 60px padding, elevated/folded effect | May be tighter, no elevation |
| Emergency number | In topbar, right-aligned with ambulance icon | Check presence and styling |
| Featured services | Icon + title + "More" button in colored boxes | Compare icon sizes, button styles |
| Footer columns | 4-column: About, Links, News, Contact | May differ in column count or content |

### About (/about)

| Element | Reference | My Build |
|---------|-----------|----------|
| Page header | Two-row banner (title + subtitle) | May be single row or different style |
| Content layout | Left column text, right column sidebar | Check sidebar presence |
| Section headers | Fancy style with underline/accent | May lack accent styling |
| Team/staff section | Grid of staff cards with photos | Compare card styling |
| Sidebar menu | Services list with separator titles | Check separator style |

### Appointments (/appointments)

| Element | Reference | My Build |
|---------|-----------|----------|
| Form styling | Stacked fields, styled dropdowns | Check dropdown appearance |
| Field borders | Light gray, focused state accent | Compare focus states |
| Submit button | Full green, matches primary buttons | Check button styling |
| Page header | Standard two-row banner | Compare banner style |
| Sidebar content | May have info boxes or contact info | Check sidebar presence |

### Contacts (/contacts)

| Element | Reference | My Build |
|---------|-----------|----------|
| Map integration | Embedded Google Map | Check map presence/styling |
| Contact form | Similar to appointment form | Compare form styles |
| Info cards | Address, phone, email with icons | Check icon styling |
| Two-column layout | Map + form or info + form | Compare layout structure |
| Page header | Standard two-row style | Compare colors/spacing |

### News (/news)

| Element | Reference | My Build |
|---------|-----------|----------|
| Page header | "The Blog" title + "Medical Articles & News" subtitle | Compare title text |
| Post cards | Featured image, title h2, meta, excerpt | Check image aspect ratio |
| Meta styling | Calendar icon + date, author, categories | Compare icon usage |
| Read More button | Green primary button | Check button styling |
| Sidebar widgets | Search, Recent Posts, Recent Comments | Check widget styling |
| Sidebar multibox | CTA teaser in sidebar | May be missing |

### Pharmacy (/pharmacy)

| Element | Reference | My Build |
|---------|-----------|----------|
| Page layout | Content + sidebar structure | Compare layout |
| Content sections | Service description, features list | Check content completeness |
| Sidebar menu | All Services list | Check menu presence |
| Page header | Standard banner with title | Compare styling |

### Services (/services)

| Element | Reference | My Build |
|---------|-----------|----------|
| Services grid | Cards with icons and descriptions | Compare card layout |
| Page header | Services title + subtitle | Check styling |
| Individual service links | Link to detail pages | Verify routing |
| Section organization | Grouped by category or flat list | Compare organization |

### Services Detail (/services/[slug])

| Element | Reference | My Build |
|---------|-----------|----------|
| Two-column layout | Content left, sidebar right | Check layout |
| Content images | Full-width or inline images | Compare image handling |
| Sidebar form | Appointment request form | Check form presence |
| Related services | List in sidebar | Check presence |
| Page header | Service name as title | Compare styling |

### Visitors (/visitors)

| Element | Reference | My Build |
|---------|-----------|----------|
| Page title | "Visitors" in skincolored header | Compare header style |
| Content area | Visitor rules/guidelines list | Check content presence |
| Sidebar | All Services menu + Appointment form | Check sidebar components |
| List styling | Bulleted list with proper spacing | Compare list styles |

---

## 4. Priority Ranking

### High Impact / Low Effort (Do First)

1. **Topbar + Header styling** - Add emergency line with ambulance icon, ensure green mainbar matches #1b7a12, verify sticky header shadow

2. **Page header banners** - Implement two-row structure (title + subtitle), use secondary_section + skincolored_section pattern

3. **Primary button consistency** - Ensure all .btn-primary use #1b7a12 bg, #107a02 hover, 3px radius

4. **Section padding rhythm** - Standardize to 60px vertical padding on sections, 30px gaps

5. **Footer structure** - Match 3-4 column layout, dark bg with green accents, proper link styling

### Medium Impact / Medium Effort

6. **Teaser box styling** - Add angled separators, match icon sizes, colored backgrounds
7. **Sidebar components** - Services menu with separator headers, appointment form styling
8. **News/blog cards** - Meta row with icons, proper image handling, Read More buttons
9. **Hero slider** - Carousel with caption boxes (if implementing slider)

### Lower Priority

10. **Form field focus states** - Accent color on focus
11. **Shadow/elevation effects** - Subtle shadows on cards and header
12. **Animation effects** - Fade-in on scroll (wpb_animate classes)

---

## Notes

- Reference uses HealthFlex WordPress theme with WPBakery Page Builder
- Bootstrap 3 grid system (12 columns, 1170px container)
- Font loading: Google Fonts for Lato + Raleway
- Icon set: Font Awesome 4/5
- The angled separators use CSS triangles via ::before/::after pseudo-elements
- Sticky header triggers around 100px scroll offset

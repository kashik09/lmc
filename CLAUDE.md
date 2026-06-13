# Lifeline Medical Centre — Project Context

## Project Overview

Healthcare website for Lifeline Medical Centre (LMC), a medical facility in Gayaza, Uganda. Public-facing site with appointment booking, service information, contact forms, and staff roster management.

**Live domain:** [TBD - FILL IN]
**Staging:** [TBD - FILL IN]

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.2.4 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Monitoring | Sentry |
| Rate Limiting | Upstash Redis |
| CAPTCHA | Cloudflare Turnstile |
| Hosting | Vercel |
| Package Manager | npm |

## Design Tokens

All colors defined in `styles/globals.css` with Tailwind v4 `@theme inline` block.

### Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `lmc-green` | #1b7a12 | Primary brand, CTAs, headers |
| `lmc-greenDark` | #107a02 | Hover states |
| `lmc-blue` | #304770 | Footer, navy backgrounds |
| `lmc-blueAccent` | #45aaff | Accent highlights |

### Surfaces

| Token | Hex | Usage |
|-------|-----|-------|
| `lmc-pageBg` | #f5f5f5 | Page background |
| `lmc-sectionBg` | #ffffff | Section cards |
| `lmc-footerBg` | #304770 | Footer |

### Text

| Token | Hex | Usage |
|-------|-----|-------|
| `lmc-textPrimary` | #2a2a2a | Body text |
| `lmc-textSecondary` | #6b7280 | Muted text |
| `lmc-textOnDark` | #ffffff | Text on dark backgrounds |

### Typography

- **Headings:** Raleway (`--font-heading`)
- **Body:** Lato (`--font-sans`)

## Repo Structure

```
app/
├── (public)/         # Public pages (home, services, appointments, etc.)
├── (auth)/           # Authentication pages
├── (dashboard)/      # Admin dashboard
├── api/              # API routes
├── roster/           # Staff roster management
└── layout.tsx        # Root layout

components/
├── blocks/           # Page sections (hero, teaser boxes, etc.)
├── layout/           # Layout components (header, footer, nav)
├── ui/               # Reusable UI primitives
└── forms/            # Form components

lib/
├── supabase/         # Supabase client/server/middleware
├── validators/       # Zod schemas
├── actions/          # Server actions
└── utils/            # Utilities

content/              # Centralized page content
styles/               # Global CSS and tokens
types/                # TypeScript definitions
public/               # Static assets
supabase/             # Supabase migrations/config
```

## Coding Rules

1. **No hardcoded colors** — Use theme tokens only (`bg-lmc-green`, not `bg-[#1b7a12]`)
2. **Content separation** — All copy lives in `/content/*.ts` files
3. **Component patterns** — Use existing component patterns from `/components`
4. **Server-first** — Default to Server Components; use `'use client'` only when needed
5. **Validation** — All form inputs validated with Zod schemas in `/lib/validators`
6. **Sanitization** — User input sanitized via `/lib/utils/sanitize.ts`

## Git Rules

1. **Atomic commits** — One concern per commit
2. **No AI attribution** — No `Co-Authored-By` or tool signatures
3. **Max 6 files per commit** — Split larger changes
4. **Max 250 lines changed** — Except lockfiles
5. **Conventional format** — `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`
6. **No force push to main**

## Testing Rules

[NO TEST FRAMEWORK CONFIGURED]

When tests are added:
- Unit tests for utilities and validators
- Component tests for interactive components
- E2E tests for critical user flows (appointment booking, contact form)

## Security Rules

1. **Never commit .env files** — Already in .gitignore
2. **Rate limiting** — All public API routes use Upstash rate limiting
3. **CAPTCHA** — Contact and appointment forms use Turnstile
4. **Input sanitization** — DOMPurify via isomorphic-dompurify
5. **Supabase RLS** — Database access controlled via Row Level Security
6. **No secrets in code** — Use environment variables

## Current Status

- [x] Public pages (home, services, about, contact, appointments)
- [x] Appointment booking form
- [x] Contact form with validation
- [x] Staff roster display
- [ ] Dashboard authentication
- [ ] Admin roster management
- [ ] [ADD MORE STATUS ITEMS]

## Known Issues

- [ADD KNOWN ISSUES AS DISCOVERED]

## Agent Instructions

### When Working on This Codebase

1. **Read before writing** — Always read existing files before modifying
2. **Follow existing patterns** — Check similar components/pages for conventions
3. **Use content files** — Don't hardcode text in components
4. **Check globals.css** — Design tokens are already defined; don't duplicate
5. **Run lint before commit** — `npm run lint`
6. **No build required for routine changes** — Build runs in CI

### Security-Sensitive Areas (Do Not Modify Without Explicit Request)

- `lib/supabase/` — Auth and database clients
- `lib/rate-limit.ts` — Rate limiting configuration
- `lib/utils/turnstile.ts` — CAPTCHA verification
- `middleware.ts` — Request middleware
- `supabase/` — Database migrations
- `.env*` files — Never read or modify

### Quick Commands

```bash
npm run dev       # Start dev server
npm run lint      # Run ESLint
npm run build     # Production build
```

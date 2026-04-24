# Lifeline Medical Centre — Deployment Readiness Report

Generated: 2026-04-24

---

## Build Health

### npm run build

**Status:** SUCCESS (with 1 warning)

```
> lifeline@0.1.0 build
> next build

▲ Next.js 16.2.4 (Turbopack)
- Environments: .env.local, .env

⚠ The "middleware" file convention is deprecated. Please use "proxy" instead. Learn more: https://nextjs.org/docs/messages/middleware-to-proxy
  Creating an optimized production build ...
✓ Compiled successfully in 6.9s
  Running TypeScript ...
  Finished TypeScript in 3.9s ...
  Collecting page data using 7 workers ...
  Generating static pages using 7 workers (0/17) ...
  Generating static pages using 7 workers (4/17)
  Generating static pages using 7 workers (8/17)
  Generating static pages using 7 workers (12/17)
✓ Generating static pages using 7 workers (17/17) in 487ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ○ /appointments
├ ƒ /callback
├ ○ /contacts
├ ƒ /jobs/dashboard
├ ○ /login
├ ○ /news
├ ● /news/[slug]
├ ○ /services
├ ● /services/[slug]
│ ├ /services/x-ray
│ ├ /services/dental
│ └ /services/laboratory
├ ○ /signup
└ ○ /visitors


ƒ Proxy (Middleware)

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

### Build Warnings

| Warning | Impact |
|---------|--------|
| Middleware convention deprecated | Must migrate `middleware.ts` to new "proxy" convention eventually. Not blocking. |

### Slow Chunks
None detected. All pages generated in under 500ms.

---

### npm run lint

**Status:** FAILED (5 errors, 4 warnings)

```
components/blocks/doctor-time-table.tsx
  1:10  warning  'doctors' is defined but never used  @typescript-eslint/no-unused-vars

components/blocks/navbar.tsx
  31:5  error  Calling setState synchronously within an effect can trigger cascading renders
        react-hooks/set-state-in-effect

components/ui/custom-calendar.tsx
  149:5   warning  React Hook useCallback has a missing dependency: 'handleDateSelect'
          react-hooks/exhaustive-deps
  235:13  warning  The attribute aria-selected is not supported by the role button
          jsx-a11y/role-supports-aria-props

lib/supabase/middleware.ts
  14:7  warning  'ALLOWED_REDIRECT_HOSTS' is assigned a value but never used
        @typescript-eslint/no-unused-vars

types/database.ts
  239:12  error  The `{}` ("empty object") type  @typescript-eslint/no-empty-object-type
  240:16  error  The `{}` ("empty object") type  @typescript-eslint/no-empty-object-type
  241:12  error  The `{}` ("empty object") type  @typescript-eslint/no-empty-object-type
  242:21  error  The `{}` ("empty object") type  @typescript-eslint/no-empty-object-type

✖ 9 problems (5 errors, 4 warnings)
```

### Lint Summary

| Severity | Count | Files Affected |
|----------|-------|----------------|
| Errors | 5 | `navbar.tsx`, `types/database.ts` |
| Warnings | 4 | `doctor-time-table.tsx`, `custom-calendar.tsx`, `middleware.ts` |

---

### TypeScript Strict Mode

**File:** `tsconfig.json`

```json
{
  "compilerOptions": {
    "strict": true,
    ...
  }
}
```

**Status:** YES — strict mode is enabled.

---

## Environment Variables

### process.env References in Code

| Variable | Files |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `lib/supabase/server.ts`, `lib/supabase/middleware.ts`, `lib/supabase/client.ts` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `lib/supabase/server.ts`, `lib/supabase/middleware.ts`, `lib/supabase/client.ts` |

### .env.local.example Contents

```
# Supabase Configuration
# Get these from your Supabase project: Settings > API

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Service role key for admin operations (server-side only)
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### Coverage Check

| Variable | Documented in Example? |
|----------|------------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | YES |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | YES |

### Undocumented Variables
None. All env vars used in code are documented in the example file.

---

## Next.js Deployment Config

### next.config.ts Analysis

```typescript
import type { NextConfig } from "next";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // TODO: CSP in full hardening phase
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
```

### Configuration Summary

| Setting | Status |
|---------|--------|
| Production security headers | YES (6 headers configured) |
| Content-Security-Policy | NO (TODO comment) |
| `experimental:` flags | NONE |
| `images.domains` | NOT CONFIGURED |
| `images.remotePatterns` | NOT CONFIGURED |

### Image Domains Warning
If Supabase Storage or external CDNs are used for images in production, `images.remotePatterns` must be configured. Currently not set.

---

## Supabase Project Link

### supabase/config.toml
**Status:** DOES NOT EXIST

### Project Targeting Method
The app uses environment variables to target the Supabase project:
- `NEXT_PUBLIC_SUPABASE_URL` — project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anonymous API key

There is no local Supabase CLI configuration (`supabase/config.toml`). The `supabase/` directory contains only:
```
supabase/
├── migrations/
│   └── 00001_initial_schema.sql
└── .temp/
```

### Implication
Developers must:
1. Create a Supabase project manually
2. Run migrations via Supabase Dashboard or CLI with project linking
3. Copy API credentials to `.env.local`

---

## Deployment Hooks

### vercel.json
**Status:** DOES NOT EXIST

No Vercel-specific configuration. Deployment will use default Next.js settings.

### GitHub Actions (.github/workflows/)
**Status:** NO WORKFLOWS FOUND

No CI/CD pipelines configured.

### Pre-Deploy Checks
**Status:** NOT CONFIGURED

No automated lint/typecheck gates before deployment.

| Check | Automated? |
|-------|------------|
| Lint on PR | NO |
| TypeScript check on PR | NO |
| Build verification | NO |
| Test suite | NO (no tests exist) |

---

## Known "Only Works on Localhost" Issues

### localhost References
```
grep -r "localhost" **/*.{ts,tsx,js,json}
```
**Result:** No matches found.

### Hardcoded Ports (3000, 3001, 5432, 54321, 8080)
```
grep -rE ":3000|:3001|:5432|:54321|:8080" **/*.{ts,tsx,js,json}
```
**Result:** No matches found.

### 127.0.0.1 References
```
grep -r "127\.0\.0\.1" **/*.{ts,tsx,js,json}
```
**Result:** No matches found.

### Summary
No hardcoded localhost references found. Application should work in production without localhost-specific issues.

---

## Deployment Readiness Summary

| Category | Status | Blocking? |
|----------|--------|-----------|
| Build | PASS (1 warning) | NO |
| Lint | FAIL (5 errors) | YES |
| TypeScript strict | ENABLED | — |
| Env vars documented | YES | — |
| Security headers | PARTIAL (no CSP) | NO |
| Image domains | NOT SET | MAYBE |
| Supabase config.toml | MISSING | NO |
| vercel.json | MISSING | NO |
| CI/CD | NOT CONFIGURED | NO |
| Localhost hardcoding | NONE | — |

### Blocking Issues for Production Deploy
1. **Lint errors must be fixed** — 5 errors in `navbar.tsx` and `types/database.ts`

### Non-Blocking Concerns
1. Middleware deprecation warning (migration needed eventually)
2. No CI/CD pipeline (manual deploys only)
3. No test suite
4. CSP header not configured
5. No `images.remotePatterns` if using external images

---

*End of report.*

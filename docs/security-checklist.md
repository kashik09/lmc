# Security Checklist

Last updated: 2026-04-29

## Already Shipped

### Tier 1 — Input Validation & Server Actions
- [x] Zod schema validation on all server actions
- [x] Explicit field mapping (no spread operators)
- [x] Anon key client with RLS enforcement
- [x] Minimal return data (reference numbers only)
- [x] Rate limiting via Upstash Redis (3 requests/10 min per phone)

### Tier 2 — Authentication & Authorization
- [x] Middleware route protection with role-based access
- [x] Fail-closed auth checks (deny on role lookup failure)
- [x] Open redirect protection on auth callback route
- [x] Open redirect protection on login form
- [x] Public signup surface removed
- [x] Login route renamed to /admin (undiscoverable)

### Tier 3 — Content Security & Monitoring
- [x] Content Security Policy (CSP) via middleware
- [x] Security headers (HSTS, X-Frame-Options, etc.)
- [x] HTML sanitization with isomorphic-dompurify
- [x] Cloudflare Turnstile captcha on contact + appointment forms
- [x] Sentry error monitoring with PII filtering
- [x] Cloudflare Web Analytics beacon

## Deployment Checklist

### Vercel Dashboard
- [ ] Vercel Toolbar disabled (Settings → General → Vercel Toolbar → Off for Preview AND Production)

### Supabase Dashboard
See `docs/supabase-security-checklist.md` for detailed Supabase settings.

### Cloudflare Dashboard
- [ ] Turnstile site key configured for production domain
- [ ] Web Analytics site configured for production domain

## To Do (Future Phases)

### Tier 4 — Advanced Hardening
- [ ] Nonce-based CSP (requires Next.js framework support)
- [ ] Subresource Integrity (SRI) for external scripts
- [ ] Security.txt file
- [ ] CORS policy review

### Tier 5 — Compliance
- [ ] DPPA 2019 privacy policy page
- [ ] Cookie consent banner (if needed)
- [ ] Data retention policy documentation

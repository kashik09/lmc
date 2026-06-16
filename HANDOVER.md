# Lifeline Medical Centre — Handover Guide

This document is for the client or operator taking over management of the Lifeline Medical Centre website.

---

## What Was Built

### Phase 1: Public Website
- **Homepage** with hero, services overview, quick actions
- **Services pages** with detailed service information
- **About page** with facility info and team
- **Contact page** with validated contact form
- **Appointments page** with booking form
- **Staff roster** display

### Phase 2: Forms & Communication
- **Contact form** with email notifications
- **Appointment booking form** with email confirmations
- **Branded email templates** via Resend
- **CAPTCHA protection** (Cloudflare Turnstile)
- **Rate limiting** to prevent spam

### Phase 3: Security & Compliance
- **Input sanitization** on all forms
- **Supabase Row Level Security** on database
- **Rate limiting** on API routes
- **Bot protection** with Turnstile

### Pending (Not Complete)
- Dashboard authentication (admin login exists but session handling incomplete)
- Admin roster management interface
- Blog/news section

---

## Environment Variables You Need

Set these in your Vercel dashboard (Settings → Environment Variables):

| Variable | Purpose | Where to Get It |
|----------|---------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Supabase key | Supabase dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Private Supabase key (server only) | Supabase dashboard → Settings → API |
| `RESEND_API_KEY` | Email delivery | resend.com dashboard |
| `UPSTASH_REDIS_REST_URL` | Rate limiting | Upstash console |
| `UPSTASH_REDIS_REST_TOKEN` | Rate limiting | Upstash console |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | CAPTCHA (public) | Cloudflare dashboard → Turnstile |
| `TURNSTILE_SECRET_KEY` | CAPTCHA (server) | Cloudflare dashboard → Turnstile |

**Important:** Never share the `SUPABASE_SERVICE_ROLE_KEY` or `TURNSTILE_SECRET_KEY` publicly.

---

## Hosting & Services

| Service | Purpose | Dashboard URL |
|---------|---------|---------------|
| Vercel | Hosting & deployment | vercel.com/dashboard |
| Supabase | Database & auth | supabase.com/dashboard |
| Resend | Email delivery | resend.com |
| Upstash | Rate limiting | upstash.com |
| Cloudflare | DNS, Turnstile | cloudflare.com |

---

## How to Do Common Tasks

### Update Contact Information

1. Edit `content/contacts.ts`
2. Find the phone numbers, email, and address
3. Update the values
4. Commit and push (Vercel auto-deploys)

### Update Services Information

1. Edit `content/services.ts` (main services list)
2. Or edit files in `content/services/` for individual service pages
3. Commit and push

### Update Staff Roster

Currently, staff roster is managed via Supabase database:

1. Go to Supabase dashboard
2. Navigate to Table Editor → `staff` or `roster` table
3. Add/edit/remove staff members
4. Changes reflect on site immediately

### View Form Submissions

**Appointments:**
1. Go to Supabase dashboard
2. Table Editor → `appointments`

**Contact Inquiries:**
1. Go to Supabase dashboard
2. Table Editor → `inquiries`

### Check Email Delivery

1. Go to resend.com dashboard
2. View sent emails and delivery status

---

## Pre-Launch Checklist

- [ ] All environment variables set in Vercel
- [ ] Domain configured and DNS pointing to Vercel
- [ ] SSL certificate active (automatic with Vercel)
- [ ] Test contact form submission
- [ ] Test appointment booking
- [ ] Verify emails are being received
- [ ] Review all page content for accuracy
- [ ] Check mobile responsiveness
- [ ] Verify Turnstile CAPTCHA is working

---

## If Something Breaks

### Forms not submitting
1. Check Vercel logs (Vercel dashboard → Deployments → Logs)
2. Check Turnstile is configured correctly
3. Verify Supabase is accessible

### Emails not sending
1. Check Resend dashboard for errors
2. Verify `RESEND_API_KEY` is set correctly
3. Check sender email is verified in Resend

### Database errors
1. Check Supabase dashboard for service status
2. Verify environment variables are correct
3. Check Supabase logs

### Site not loading
1. Check Vercel dashboard for deployment status
2. Check domain DNS configuration
3. Contact developer if issue persists

---

## Support Contact

For technical issues:
- **Developer:** [FILL IN YOUR CONTACT]
- **Email:** [FILL IN]

---

## Database Schema Overview

| Table | Purpose |
|-------|---------|
| `appointments` | Appointment bookings |
| `inquiries` | Contact form submissions |
| `staff` / `roster` | Staff member information |
| `auth.users` | Admin user accounts |

---

## Security Notes

1. **Never share** the service role key or Turnstile secret
2. **Admin routes** are partially protected — full auth is pending
3. **All user input** is sanitized before storage
4. **Rate limiting** is active on all public API routes
5. **Database access** is controlled via Row Level Security

---

## File Locations Reference

| What | Where |
|------|-------|
| Page content | `content/*.ts` |
| Components | `components/` |
| API routes | `app/api/` |
| Database clients | `lib/supabase/` |
| Form validation | `lib/validators/` |
| Email templates | `lib/email/` |
| Database migrations | `supabase/migrations/` |

---

## Related Project

**Lamogi Imaging Centre** (`tonny/lamogi/`) is a related project for a diagnostic imaging facility. Same client, separate website.

---

*Last updated: 2026-06-16*

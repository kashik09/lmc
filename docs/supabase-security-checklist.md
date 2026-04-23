# Supabase Security Checklist

Manual dashboard settings to verify before production deployment.

## Authentication Settings

### Providers > Email

- [ ] **Confirm email** is ENABLED
  - Path: Authentication → Providers → Email
  - Prevents account creation with unverified emails
  - Users must click verification link before login works

### Rate Limits

- [ ] Review and harden rate limits
  - Path: Authentication → Rate Limits
  - **Current defaults (check and document):**
    - Rate limit for sending emails: ___/hour
    - Rate limit for token refresh: ___/hour
    - Rate limit for anonymous sign-ins: ___/hour
  - **Recommended:**
    - Email rate limit: 3/hour (prevents enumeration)
    - Token refresh: 30/hour (normal usage)
    - Reduce if seeing abuse in logs

### Password Security

- [ ] **Leaked password protection** is ENABLED
  - Path: Authentication → Password Security
  - Checks passwords against known breach databases
  - Prevents users from using compromised passwords

### Session Settings

- [ ] **Session timeout** set to 24 hours
  - Path: Authentication → Settings
  - Default is often 1 week (too long for medical context)
  - 24h balances security with UX for staff users

## API Settings

### Service Role Key

- [ ] **service_role key has NOT been exposed**
  - Path: Settings → API
  - Run this command to check git history:
    ```bash
    git log -p --all -S 'service_role' -- '*.ts' '*.tsx' '*.js' '*.env*'
    ```
  - If found: rotate key immediately in dashboard
  - Never use service_role key in client-side code

### Anon Key Usage

- [ ] **anon key is only used for public operations**
  - Verify RLS policies protect all tables
  - anon key should never bypass row-level security

## Row Level Security (RLS)

- [ ] **RLS is ENABLED on all tables**
  - Path: Database → Tables → [each table] → RLS
  - Tables without RLS are fully public to anon key
  - Critical tables to check:
    - [ ] appointments
    - [ ] inquiries
    - [ ] posts (if admin-only editing)
    - [ ] users/profiles

## Database

### Connection Security

- [ ] **SSL enforcement** is enabled
  - Path: Database → Settings
  - All connections should require SSL

### Backups

- [ ] **Point-in-time recovery** enabled (Pro plan)
  - Or manual backup schedule documented

## Post-Setup Verification

Run these queries in SQL Editor to verify RLS:

```sql
-- List tables without RLS
SELECT schemaname, tablename
FROM pg_tables
WHERE schemaname = 'public'
AND tablename NOT IN (
  SELECT tablename FROM pg_policies WHERE schemaname = 'public'
);

-- List tables with RLS disabled
SELECT relname
FROM pg_class
WHERE relnamespace = 'public'::regnamespace
AND relrowsecurity = false
AND relkind = 'r';
```

## Checklist Complete

- [ ] All items above verified
- [ ] Date completed: ___________
- [ ] Verified by: ___________

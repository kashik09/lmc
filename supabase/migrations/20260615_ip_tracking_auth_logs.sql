-- IP Tracking & Admin Auth Logs
-- Security feature: track IPs on submissions and admin logins

-- 1. Add IP tracking to inquiries
ALTER TABLE public.inquiries
ADD COLUMN IF NOT EXISTS ip_address TEXT,
ADD COLUMN IF NOT EXISTS user_agent TEXT;

-- 2. Add IP tracking to appointments
ALTER TABLE public.appointments
ADD COLUMN IF NOT EXISTS ip_address TEXT,
ADD COLUMN IF NOT EXISTS user_agent TEXT;

-- 3. Create auth_logs table for admin login tracking
CREATE TABLE IF NOT EXISTS public.auth_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  ip_address TEXT NOT NULL,
  user_agent TEXT,
  is_vpn BOOLEAN DEFAULT false,
  is_proxy BOOLEAN DEFAULT false,
  is_datacenter BOOLEAN DEFAULT false,
  country TEXT,
  city TEXT,
  isp TEXT,
  login_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  suspicious BOOLEAN DEFAULT false,
  suspicious_reason TEXT
);

-- Index for quick lookups
CREATE INDEX IF NOT EXISTS idx_auth_logs_user_id ON public.auth_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_logs_ip ON public.auth_logs(ip_address);
CREATE INDEX IF NOT EXISTS idx_auth_logs_login_at ON public.auth_logs(login_at DESC);

-- RLS: only admins can view auth logs
ALTER TABLE public.auth_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "auth_logs_admin_select" ON public.auth_logs
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Staff can insert their own login logs
CREATE POLICY "auth_logs_insert" ON public.auth_logs
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- 4. View to check unique IPs per user (last 30 days)
CREATE OR REPLACE VIEW public.user_ip_summary AS
SELECT
  user_id,
  email,
  COUNT(DISTINCT ip_address) as unique_ips,
  array_agg(DISTINCT ip_address) as ip_list,
  bool_or(is_vpn) as has_vpn_login,
  bool_or(suspicious) as has_suspicious_login,
  MAX(login_at) as last_login
FROM public.auth_logs
WHERE login_at > now() - interval '30 days'
GROUP BY user_id, email;

-- Grant access to the view
GRANT SELECT ON public.user_ip_summary TO authenticated;

COMMENT ON TABLE public.auth_logs IS 'Tracks admin/staff login attempts with IP and security metadata';
COMMENT ON VIEW public.user_ip_summary IS 'Summary of unique IPs per user for security monitoring';

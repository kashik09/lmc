-- Password History Table
-- Stores hashed passwords to prevent reuse of last 5

CREATE TABLE IF NOT EXISTS public.password_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for quick lookups by user
CREATE INDEX IF NOT EXISTS idx_password_history_user_id
ON public.password_history(user_id, created_at DESC);

-- RLS: Users can only see their own password history (for validation)
ALTER TABLE public.password_history ENABLE ROW LEVEL SECURITY;

-- Staff can insert their own password history
DROP POLICY IF EXISTS "password_history_insert" ON public.password_history;
CREATE POLICY "password_history_insert" ON public.password_history
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Staff can read their own history (for reuse check)
DROP POLICY IF EXISTS "password_history_select" ON public.password_history;
CREATE POLICY "password_history_select" ON public.password_history
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Function to check if password was used in last 5
CREATE OR REPLACE FUNCTION check_password_reuse(
  p_user_id UUID,
  p_password_hash TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  found_match BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM public.password_history
    WHERE user_id = p_user_id
      AND password_hash = p_password_hash
    ORDER BY created_at DESC
    LIMIT 5
  ) INTO found_match;

  RETURN found_match;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to add password to history (keeps only last 5)
CREATE OR REPLACE FUNCTION add_password_to_history(
  p_user_id UUID,
  p_password_hash TEXT
) RETURNS VOID AS $$
BEGIN
  -- Insert new password
  INSERT INTO public.password_history (user_id, password_hash)
  VALUES (p_user_id, p_password_hash);

  -- Delete old entries beyond the last 5
  DELETE FROM public.password_history
  WHERE id IN (
    SELECT id FROM public.password_history
    WHERE user_id = p_user_id
    ORDER BY created_at DESC
    OFFSET 5
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON TABLE public.password_history IS 'Stores password hashes to prevent reuse of last 5 passwords';

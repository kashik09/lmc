-- ============================================
-- LIFELINE MEDICAL CENTRE — INQUIRIES ADMIN ACCESS
-- Migration: 00006_inquiries_admin_access.sql
-- Adds status tracking and admin RLS policies
-- ============================================

-- Add status column for inbox management
ALTER TABLE public.inquiries
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new'
  CHECK (status IN ('new', 'read', 'archived'));

-- Add is_read flag for quick filtering
ALTER TABLE public.inquiries
ADD COLUMN IF NOT EXISTS is_read BOOLEAN NOT NULL DEFAULT false;

-- Add updated_at for tracking changes
ALTER TABLE public.inquiries
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- Index for status filtering
CREATE INDEX IF NOT EXISTS inquiries_status_idx ON public.inquiries (status);
CREATE INDEX IF NOT EXISTS inquiries_is_read_idx ON public.inquiries (is_read);

-- Staff/admin can SELECT inquiries
CREATE POLICY "inquiries_staff_admin_select"
ON public.inquiries FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
      AND profiles.role IN ('staff', 'admin')
  )
);

-- Staff/admin can UPDATE inquiries (mark read, archive)
CREATE POLICY "inquiries_staff_admin_update"
ON public.inquiries FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
      AND profiles.role IN ('staff', 'admin')
  )
);

-- Only admin can DELETE inquiries
CREATE POLICY "inquiries_admin_delete"
ON public.inquiries FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
  )
);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_inquiries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER inquiries_updated_at
BEFORE UPDATE ON public.inquiries
FOR EACH ROW EXECUTE FUNCTION public.update_inquiries_updated_at();

-- ============================================
-- LIFELINE MEDICAL CENTRE — INITIAL SCHEMA
-- Migration: 00001_initial_schema.sql
-- RLS enabled on ALL tables from day one.
-- ============================================

-- ===========================================
-- EXTENSIONS
-- ===========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================
-- SERVICES TABLE
-- ===========================================
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Public can read all services
CREATE POLICY "services_public_select"
  ON services FOR SELECT
  TO public
  USING (true);

-- No public INSERT/UPDATE/DELETE — managed via Supabase dashboard

-- ===========================================
-- POSTS TABLE (blog, events, viruses)
-- ===========================================
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  category TEXT NOT NULL CHECK (category IN ('blog', 'events', 'viruses')),
  featured_image TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts only
CREATE POLICY "posts_public_select"
  ON posts FOR SELECT
  TO public
  USING (published_at IS NOT NULL AND published_at <= now());

-- No public INSERT/UPDATE/DELETE — managed via Supabase dashboard

-- ===========================================
-- JOBS TABLE
-- ===========================================
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  department TEXT,
  description TEXT,
  requirements TEXT,
  location TEXT DEFAULT 'Gayaza',
  type TEXT DEFAULT 'full-time',
  deadline DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Public can read active jobs only
CREATE POLICY "jobs_public_select"
  ON jobs FOR SELECT
  TO public
  USING (is_active = true);

-- No public INSERT/UPDATE/DELETE — managed via Supabase dashboard

-- ===========================================
-- PROFILES TABLE (extends auth.users)
-- ===========================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can only read their own profile
CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Users can only update their own profile
CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Users can insert their own profile (on signup)
CREATE POLICY "profiles_insert_own"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

-- ===========================================
-- JOB APPLICATIONS TABLE
-- ===========================================
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resume_url TEXT,
  cover_letter TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'rejected', 'accepted')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(job_id, user_id)
);

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read only their own applications
CREATE POLICY "job_applications_select_own"
  ON job_applications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Authenticated users can insert only their own applications
CREATE POLICY "job_applications_insert_own"
  ON job_applications FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- No public UPDATE/DELETE — status managed via Supabase dashboard

-- ===========================================
-- INQUIRIES TABLE (contact form)
-- ===========================================
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an inquiry (public INSERT)
CREATE POLICY "inquiries_public_insert"
  ON inquiries FOR INSERT
  TO public
  WITH CHECK (true);

-- No public SELECT/UPDATE/DELETE — viewed via Supabase dashboard only

-- ===========================================
-- INDEXES FOR COMMON QUERIES
-- ===========================================
CREATE INDEX idx_services_sort_order ON services(sort_order);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX idx_jobs_is_active ON jobs(is_active);
CREATE INDEX idx_jobs_deadline ON jobs(deadline);
CREATE INDEX idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);

-- ===========================================
-- TRIGGER: Auto-create profile on user signup
-- ===========================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

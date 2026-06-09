-- ============================================
-- LIFELINE MEDICAL CENTRE — ROSTER TABLES
-- Migration: 00004_roster_tables.sql
-- Staff scheduling system with Supabase backend
-- ============================================

-- ===========================================
-- ROSTER DEPARTMENTS
-- ===========================================
CREATE TABLE roster_departments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT,
  color_bg TEXT NOT NULL DEFAULT '#e5efe6',
  color_fg TEXT NOT NULL DEFAULT '#2e7d45',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE roster_departments ENABLE ROW LEVEL SECURITY;

-- Public can read departments
CREATE POLICY "roster_departments_public_select"
  ON roster_departments FOR SELECT
  TO public
  USING (true);

-- Authenticated staff/admin can manage
CREATE POLICY "roster_departments_auth_all"
  ON roster_departments FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ===========================================
-- ROSTER DOCTORS
-- ===========================================
CREATE TABLE roster_doctors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT DEFAULT 'Doctor',
  department_id TEXT REFERENCES roster_departments(id) ON DELETE SET NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE roster_doctors ENABLE ROW LEVEL SECURITY;

-- Public can read doctors
CREATE POLICY "roster_doctors_public_select"
  ON roster_doctors FOR SELECT
  TO public
  USING (true);

-- Authenticated can manage
CREATE POLICY "roster_doctors_auth_all"
  ON roster_doctors FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ===========================================
-- ROSTER TIME BLOCKS
-- ===========================================
CREATE TABLE roster_time_blocks (
  id TEXT PRIMARY KEY,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE roster_time_blocks ENABLE ROW LEVEL SECURITY;

-- Public can read time blocks
CREATE POLICY "roster_time_blocks_public_select"
  ON roster_time_blocks FOR SELECT
  TO public
  USING (true);

-- Authenticated can manage
CREATE POLICY "roster_time_blocks_auth_all"
  ON roster_time_blocks FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ===========================================
-- ROSTER ASSIGNMENTS (schedule)
-- ===========================================
CREATE TABLE roster_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  time_block_id TEXT NOT NULL REFERENCES roster_time_blocks(id) ON DELETE CASCADE,
  day TEXT NOT NULL CHECK (day IN ('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun')),
  doctor_id TEXT NOT NULL REFERENCES roster_doctors(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(time_block_id, day, doctor_id)
);

ALTER TABLE roster_assignments ENABLE ROW LEVEL SECURITY;

-- Public can read assignments
CREATE POLICY "roster_assignments_public_select"
  ON roster_assignments FOR SELECT
  TO public
  USING (true);

-- Authenticated can manage
CREATE POLICY "roster_assignments_auth_all"
  ON roster_assignments FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ===========================================
-- INDEXES
-- ===========================================
CREATE INDEX idx_roster_doctors_dept ON roster_doctors(department_id);
CREATE INDEX idx_roster_doctors_active ON roster_doctors(active);
CREATE INDEX idx_roster_assignments_block_day ON roster_assignments(time_block_id, day);
CREATE INDEX idx_roster_assignments_doctor ON roster_assignments(doctor_id);

-- ===========================================
-- SEED DATA
-- ===========================================
INSERT INTO roster_departments (id, name, short_name, color_bg, color_fg, sort_order) VALUES
  ('g_consult', 'General Consultation', 'General', '#e5efe6', '#2e7d45', 1),
  ('dental', 'Dental', 'Dental', '#dcefe4', '#1c7a55', 2),
  ('xray', 'X-Ray', 'X-Ray', '#dcebf8', '#1f5fa8', 3),
  ('lab', 'Laboratory', 'Laboratory', '#e8e1f5', '#6b3fb8', 4),
  ('cardio', 'Cardiology', 'Cardiology', '#fbe2e9', '#c0395b', 5),
  ('micro', 'Microbiology Lab', 'Microbiology Lab', '#e6ede0', '#5a7a32', 6),
  ('neuro', 'Neurology', 'Neurology', '#f3e4f1', '#9b3f8e', 7),
  ('peds', 'Pediatrics', 'Pediatrics', '#fdecd6', '#c77a21', 8),
  ('imaging', 'Diagnostic Imaging', 'Diagnostic Imaging', '#dff0f1', '#1f7a86', 9),
  ('gyn', 'Gynaecology & Birth', 'Gynaecology & Birth', '#fce3ef', '#b23b7e', 10),
  ('ortho', 'Orthopedic', 'Orthopedic', '#e7eaf3', '#45568c', 11);

INSERT INTO roster_doctors (id, name, title, department_id, active) VALUES
  ('d_a', 'Dr. A', 'Doctor', 'dental', true),
  ('d_b', 'Dr. B', 'Doctor', 'xray', true),
  ('d_c', 'Dr. C', 'Doctor', 'lab', true),
  ('d_d', 'Dr. D', 'Doctor', 'g_consult', true),
  ('d_e', 'Dr. E', 'Doctor', 'g_consult', true),
  ('d_card', 'Cardiology Lead', 'Lead', 'cardio', true),
  ('d_micro', 'Microbiology Lab Lead', 'Lead', 'micro', true),
  ('d_neuro', 'Neurology Lead', 'Lead', 'neuro', true),
  ('d_ped', 'Pediatrics Lead', 'Lead', 'peds', true),
  ('d_diag', 'Diagnostic Imaging Lead', 'Lead', 'imaging', true),
  ('d_ortho', 'Orthopedic Lead', 'Lead', 'ortho', true),
  ('d_gyn', 'Gynaecology Lead', 'Lead', 'gyn', true);

INSERT INTO roster_time_blocks (id, start_time, end_time, sort_order) VALUES
  ('b1', '08:00', '11:00', 1),
  ('b2', '11:00', '14:00', 2),
  ('b3', '14:00', '17:00', 3);

-- Seed schedule assignments
INSERT INTO roster_assignments (time_block_id, day, doctor_id) VALUES
  -- Block 1
  ('b1', 'Mon', 'd_a'), ('b1', 'Mon', 'd_b'), ('b1', 'Mon', 'd_c'), ('b1', 'Mon', 'd_card'), ('b1', 'Mon', 'd_micro'),
  ('b1', 'Tue', 'd_a'), ('b1', 'Tue', 'd_b'), ('b1', 'Tue', 'd_c'), ('b1', 'Tue', 'd_neuro'), ('b1', 'Tue', 'd_ped'),
  ('b1', 'Wed', 'd_a'), ('b1', 'Wed', 'd_c'), ('b1', 'Wed', 'd_e'), ('b1', 'Wed', 'd_diag'), ('b1', 'Wed', 'd_gyn'),
  ('b1', 'Thu', 'd_b'), ('b1', 'Thu', 'd_c'), ('b1', 'Thu', 'd_e'), ('b1', 'Thu', 'd_ortho'), ('b1', 'Thu', 'd_micro'),
  ('b1', 'Fri', 'd_a'), ('b1', 'Fri', 'd_b'), ('b1', 'Fri', 'd_c'), ('b1', 'Fri', 'd_card'), ('b1', 'Fri', 'd_ped'),
  ('b1', 'Sat', 'd_b'), ('b1', 'Sat', 'd_d'), ('b1', 'Sat', 'd_c'), ('b1', 'Sat', 'd_diag'), ('b1', 'Sat', 'd_card'), ('b1', 'Sat', 'd_ped'),
  ('b1', 'Sun', 'd_e'),
  -- Block 2
  ('b2', 'Mon', 'd_a'), ('b2', 'Mon', 'd_c'), ('b2', 'Mon', 'd_e'), ('b2', 'Mon', 'd_ortho'),
  ('b2', 'Tue', 'd_b'), ('b2', 'Tue', 'd_d'), ('b2', 'Tue', 'd_ped'),
  ('b2', 'Wed', 'd_a'), ('b2', 'Wed', 'd_b'), ('b2', 'Wed', 'd_c'), ('b2', 'Wed', 'd_card'), ('b2', 'Wed', 'd_gyn'),
  ('b2', 'Thu', 'd_a'), ('b2', 'Thu', 'd_b'), ('b2', 'Thu', 'd_c'), ('b2', 'Thu', 'd_d'), ('b2', 'Thu', 'd_neuro'),
  ('b2', 'Fri', 'd_a'), ('b2', 'Fri', 'd_d'), ('b2', 'Fri', 'd_e'), ('b2', 'Fri', 'd_gyn'),
  ('b2', 'Sat', 'd_d'), ('b2', 'Sat', 'd_e'),
  -- Block 3
  ('b3', 'Mon', 'd_c'), ('b3', 'Mon', 'd_d'),
  ('b3', 'Tue', 'd_c'), ('b3', 'Tue', 'd_d'), ('b3', 'Tue', 'd_micro'),
  ('b3', 'Wed', 'd_d'),
  ('b3', 'Thu', 'd_c'),
  ('b3', 'Fri', 'd_c'), ('b3', 'Fri', 'd_d');

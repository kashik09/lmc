-- ============================================================
-- Migration: Fix roster RLS - Remove public write access
--
-- SECURITY FIX: The roster_* tables had policies allowing ANY
-- anonymous user to INSERT, UPDATE, and DELETE records.
-- This migration removes those dangerous policies and replaces
-- them with role-restricted policies for staff/admin only.
--
-- Baseline before fix:
--   roster_departments: 11 rows
--   roster_doctors: 1 row
--   roster_time_blocks: 3 rows
--   roster_assignments: 1 row
-- ============================================================

-- roster_departments: DROP dangerous public policies
DROP POLICY IF EXISTS roster_departments_public_write ON roster_departments;
DROP POLICY IF EXISTS roster_departments_public_update ON roster_departments;
DROP POLICY IF EXISTS roster_departments_public_delete ON roster_departments;
DROP POLICY IF EXISTS roster_departments_auth_all ON roster_departments;

-- roster_departments: ADD role-restricted write policies
CREATE POLICY roster_departments_staff_admin_all ON roster_departments
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('staff', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('staff', 'admin')
    )
  );

-- roster_doctors: DROP dangerous public policies
DROP POLICY IF EXISTS roster_doctors_public_write ON roster_doctors;
DROP POLICY IF EXISTS roster_doctors_public_update ON roster_doctors;
DROP POLICY IF EXISTS roster_doctors_public_delete ON roster_doctors;
DROP POLICY IF EXISTS roster_doctors_auth_all ON roster_doctors;

-- roster_doctors: ADD role-restricted write policies
CREATE POLICY roster_doctors_staff_admin_all ON roster_doctors
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('staff', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('staff', 'admin')
    )
  );

-- roster_time_blocks: DROP dangerous public policies
DROP POLICY IF EXISTS roster_time_blocks_public_write ON roster_time_blocks;
DROP POLICY IF EXISTS roster_time_blocks_public_update ON roster_time_blocks;
DROP POLICY IF EXISTS roster_time_blocks_public_delete ON roster_time_blocks;
DROP POLICY IF EXISTS roster_time_blocks_auth_all ON roster_time_blocks;

-- roster_time_blocks: ADD role-restricted write policies
CREATE POLICY roster_time_blocks_staff_admin_all ON roster_time_blocks
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('staff', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('staff', 'admin')
    )
  );

-- roster_assignments: DROP dangerous public policies
DROP POLICY IF EXISTS roster_assignments_public_write ON roster_assignments;
DROP POLICY IF EXISTS roster_assignments_public_update ON roster_assignments;
DROP POLICY IF EXISTS roster_assignments_public_delete ON roster_assignments;
DROP POLICY IF EXISTS roster_assignments_auth_all ON roster_assignments;

-- roster_assignments: ADD role-restricted write policies
CREATE POLICY roster_assignments_staff_admin_all ON roster_assignments
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('staff', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('staff', 'admin')
    )
  );

-- ============================================
-- LIFELINE MEDICAL CENTRE — INQUIRIES REFERENCE NUMBER
-- Migration: 00003_inquiries_reference_number.sql
-- Run AFTER 00002_appointments_table.sql has been applied
-- ============================================

-- Add reference_number column to inquiries table
-- Using a temporary default that will be overwritten by application code
alter table public.inquiries
add column if not exists reference_number text unique;

-- Backfill existing rows with generated reference numbers
-- Format: LMC-INQ-XXXXXX (using substring of uuid for uniqueness)
update public.inquiries
set reference_number = 'LMC-INQ-' || upper(substring(md5(id::text) from 1 for 6))
where reference_number is null;

-- Now make the column NOT NULL after backfill
alter table public.inquiries
alter column reference_number set not null;

-- Add index for reference_number lookups
create index if not exists inquiries_reference_number_idx on public.inquiries (reference_number);

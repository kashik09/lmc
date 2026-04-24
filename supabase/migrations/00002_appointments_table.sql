-- ============================================
-- LIFELINE MEDICAL CENTRE — APPOINTMENTS TABLE
-- Migration: 00002_appointments_table.sql
-- Run AFTER 00001_initial_schema.sql
-- ============================================

-- Appointments table
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  reference_number text unique not null,
  department text not null,
  doctor_slug text,
  full_name text not null,
  patient_type text not null check (patient_type in ('adult', 'child')),
  date_of_birth date not null,
  sex text not null check (sex in ('male', 'female')),
  phone text not null,
  email text not null,
  appointment_date date not null,
  message text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index if not exists appointments_email_idx on public.appointments (email);
create index if not exists appointments_appointment_date_idx on public.appointments (appointment_date);
create index if not exists appointments_status_idx on public.appointments (status);
create index if not exists appointments_created_at_idx on public.appointments (created_at desc);

-- Enable RLS
alter table public.appointments enable row level security;

-- Policies
-- Public can INSERT (anyone can book an appointment)
create policy "appointments_public_insert"
on public.appointments for insert
to anon, authenticated
with check (true);

-- Only staff/admin can SELECT (patients don't see other patients' data)
create policy "appointments_staff_admin_select"
on public.appointments for select
to authenticated
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and profiles.role in ('staff', 'admin')
  )
);

-- Only staff/admin can UPDATE (for status changes)
create policy "appointments_staff_admin_update"
on public.appointments for update
to authenticated
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and profiles.role in ('staff', 'admin')
  )
);

-- Trigger to update updated_at
create or replace function public.update_appointments_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger appointments_updated_at
before update on public.appointments
for each row execute function public.update_appointments_updated_at();

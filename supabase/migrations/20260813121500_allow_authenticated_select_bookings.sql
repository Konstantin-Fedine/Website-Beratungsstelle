-- Temporary RLS policy to allow authenticated users to SELECT and UPDATE bookings
-- Run this in Supabase SQL Editor (local: http://127.0.0.1:54323 or your project Studio)

BEGIN;

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow authenticated role to select bookings
DROP POLICY IF EXISTS "Authenticated can select bookings" ON public.bookings;
CREATE POLICY "Authenticated can select bookings"
  ON public.bookings
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated role to update bookings (e.g., change status)
DROP POLICY IF EXISTS "Authenticated can update bookings" ON public.bookings;
CREATE POLICY "Authenticated can update bookings"
  ON public.bookings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

COMMIT;

-- NOTE: For production, restrict these policies to a specific admin role or
-- to users in an admin table. This migration intentionally permits all
-- authenticated users to read/update bookings for testing convenience.

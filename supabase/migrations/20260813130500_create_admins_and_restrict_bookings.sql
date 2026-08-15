-- Create admins table and restrict bookings SELECT/UPDATE to admins
-- Run this in Supabase SQL Editor (local: http://127.0.0.1:54323 or your project Studio)

BEGIN;

-- create admins table to list allowed admin user_ids
CREATE TABLE IF NOT EXISTS public.admins (
  user_id uuid PRIMARY KEY,
  email text
);

COMMENT ON TABLE public.admins IS 'Insert admin rows with the Auth user id; use Supabase Studio -> Authentication -> Users to copy the id for your admin account.';

-- Ensure RLS is enabled on bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Public insert policy: allow anonymous or authenticated clients to create bookings
DROP POLICY IF EXISTS "Public can insert bookings" ON public.bookings;
CREATE POLICY "Public can insert bookings"
  ON public.bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Restrict SELECT to admins only
DROP POLICY IF EXISTS "Authenticated can select bookings" ON public.bookings;
CREATE POLICY "Admins can select bookings"
  ON public.bookings
  FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.admins WHERE public.admins.user_id = auth.uid()));

-- Restrict UPDATE to admins only
DROP POLICY IF EXISTS "Authenticated can update bookings" ON public.bookings;
CREATE POLICY "Admins can update bookings"
  ON public.bookings
  FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.admins WHERE public.admins.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE public.admins.user_id = auth.uid()));

COMMIT;

-- After running this, add an admin row for your mother's user id:
-- INSERT INTO public.admins (user_id, email) VALUES ('<MOTHER_USER_UUID>', 'mother@example.com');

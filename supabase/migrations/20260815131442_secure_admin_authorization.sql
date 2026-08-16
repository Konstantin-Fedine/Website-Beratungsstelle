-- Secure admin authorization
-- Phase 1: Admin-Rolle über Supabase Auth + admins-Tabelle absichern


-- ============================================================
-- 1. Admin-Tabelle mit RLS schützen
-- ============================================================

ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- 2. Zentrale Funktion: Ist der aktuelle Benutzer Admin?
-- ============================================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admins
    WHERE user_id = auth.uid()
  );
$$;


-- ============================================================
-- 3. Nur eingeloggte Benutzer dürfen is_admin() aufrufen
-- ============================================================

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;


-- ============================================================
-- 4. Alte temporäre Booking-Policies entfernen
-- ============================================================

DROP POLICY IF EXISTS "Authenticated can select bookings"
  ON public.bookings;

DROP POLICY IF EXISTS "Authenticated can update bookings"
  ON public.bookings;

DROP POLICY IF EXISTS "Admins can select bookings"
  ON public.bookings;

DROP POLICY IF EXISTS "Admins can update bookings"
  ON public.bookings;


-- ============================================================
-- 5. Nur Admins dürfen Buchungen lesen
-- ============================================================

CREATE POLICY "Admins can select bookings"
  ON public.bookings
  FOR SELECT
  TO authenticated
  USING (public.is_admin());


-- ============================================================
-- 6. Nur Admins dürfen Buchungen ändern
-- ============================================================

CREATE POLICY "Admins can update bookings"
  ON public.bookings
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
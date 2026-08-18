-- Sync migration: align repository schema/policies with current working admin setup.
-- Safe to re-run: uses IF EXISTS / IF NOT EXISTS / CREATE OR REPLACE patterns.

BEGIN;

-- ============================================================
-- 1) SCHEMA ALIGNMENT
-- ============================================================

-- admins: ensure table exists and has created_at
CREATE TABLE IF NOT EXISTS public.admins (
  user_id uuid PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'admins'
      AND column_name = 'created_at'
  ) THEN
    ALTER TABLE public.admins
      ADD COLUMN created_at timestamptz NOT NULL DEFAULT now();
  END IF;
END $$;

-- blocked_days: migrate old date-only shape to start_date/end_date range shape
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'blocked_days'
      AND column_name = 'date'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'blocked_days'
      AND column_name = 'start_date'
  ) THEN
    ALTER TABLE public.blocked_days ADD COLUMN start_date date;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'blocked_days'
      AND column_name = 'date'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'blocked_days'
      AND column_name = 'end_date'
  ) THEN
    ALTER TABLE public.blocked_days ADD COLUMN end_date date;
  END IF;
END $$;

UPDATE public.blocked_days
SET
  start_date = COALESCE(start_date, date),
  end_date = COALESCE(end_date, date)
WHERE EXISTS (
  SELECT 1
  FROM information_schema.columns
  WHERE table_schema = 'public'
    AND table_name = 'blocked_days'
    AND column_name = 'date'
);

ALTER TABLE public.blocked_days
  ALTER COLUMN start_date SET NOT NULL;

ALTER TABLE public.blocked_days
  ALTER COLUMN end_date SET NOT NULL;

ALTER TABLE public.blocked_days
  DROP CONSTRAINT IF EXISTS blocked_days_date_key;

ALTER TABLE public.blocked_days
  DROP CONSTRAINT IF EXISTS blocked_days_date_check;

ALTER TABLE public.blocked_days
  ADD CONSTRAINT blocked_days_date_check CHECK (start_date <= end_date);

ALTER TABLE public.blocked_days
  DROP COLUMN IF EXISTS date;

-- settings: ensure current admin fields exist
ALTER TABLE public.settings
  ADD COLUMN IF NOT EXISTS organization_name text NOT NULL DEFAULT 'Aufwind Beratung';

ALTER TABLE public.settings
  ADD COLUMN IF NOT EXISTS contact_email text;

ALTER TABLE public.settings
  ADD COLUMN IF NOT EXISTS timezone text NOT NULL DEFAULT 'Europe/Berlin';

ALTER TABLE public.settings
  ADD COLUMN IF NOT EXISTS notify_provider_new_booking boolean NOT NULL DEFAULT true;

ALTER TABLE public.settings
  ADD COLUMN IF NOT EXISTS notify_provider_cancellation boolean NOT NULL DEFAULT true;

ALTER TABLE public.settings
  ADD COLUMN IF NOT EXISTS notify_provider_reschedule boolean NOT NULL DEFAULT true;

ALTER TABLE public.settings
  ADD COLUMN IF NOT EXISTS notify_customer_confirmation boolean NOT NULL DEFAULT true;

ALTER TABLE public.settings
  ADD COLUMN IF NOT EXISTS notify_customer_cancellation boolean NOT NULL DEFAULT true;

ALTER TABLE public.settings
  ADD COLUMN IF NOT EXISTS notify_customer_reschedule boolean NOT NULL DEFAULT true;

ALTER TABLE public.settings
  ADD COLUMN IF NOT EXISTS notify_customer_reminder boolean NOT NULL DEFAULT true;

ALTER TABLE public.settings
  ADD COLUMN IF NOT EXISTS reminder_hours integer NOT NULL DEFAULT 24;

-- enforce no negative reminder
ALTER TABLE public.settings
  DROP CONSTRAINT IF EXISTS settings_reminder_hours_check;

ALTER TABLE public.settings
  ADD CONSTRAINT settings_reminder_hours_check CHECK (reminder_hours > 0);

-- keep schema aligned with product decision: no global booking buffers
ALTER TABLE public.settings
  DROP COLUMN IF EXISTS booking_buffer_before;

ALTER TABLE public.settings
  DROP COLUMN IF EXISTS booking_buffer_after;

ALTER TABLE public.settings
  DROP COLUMN IF EXISTS cancellation_notice_hours;


-- ============================================================
-- 2) ADMIN FUNCTION
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

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;


-- ============================================================
-- 3) RLS ENABLE
-- ============================================================

ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_times ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- 4) POLICIES - CLEANUP
-- ============================================================

DROP POLICY IF EXISTS "Admins can view own admin record" ON public.admins;

DROP POLICY IF EXISTS "Public can view active availability" ON public.availability;
DROP POLICY IF EXISTS "Admins can view availability" ON public.availability;
DROP POLICY IF EXISTS "Admins can insert availability" ON public.availability;
DROP POLICY IF EXISTS "Admins can update availability" ON public.availability;
DROP POLICY IF EXISTS "Admins can delete availability" ON public.availability;

DROP POLICY IF EXISTS "Public can view blocked days" ON public.blocked_days;
DROP POLICY IF EXISTS "Admins can view blocked days" ON public.blocked_days;
DROP POLICY IF EXISTS "Admins can insert blocked days" ON public.blocked_days;
DROP POLICY IF EXISTS "Admins can update blocked days" ON public.blocked_days;
DROP POLICY IF EXISTS "Admins can delete blocked days" ON public.blocked_days;

DROP POLICY IF EXISTS "Public can view blocked times" ON public.blocked_times;
DROP POLICY IF EXISTS "Admins can view blocked times" ON public.blocked_times;
DROP POLICY IF EXISTS "Admins can insert blocked times" ON public.blocked_times;
DROP POLICY IF EXISTS "Admins can update blocked times" ON public.blocked_times;
DROP POLICY IF EXISTS "Admins can delete blocked times" ON public.blocked_times;

DROP POLICY IF EXISTS "Public can insert bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can select bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can update bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can delete bookings" ON public.bookings;

DROP POLICY IF EXISTS "Public can view active services" ON public.services;
DROP POLICY IF EXISTS "Admins can view services" ON public.services;
DROP POLICY IF EXISTS "Admins can insert services" ON public.services;
DROP POLICY IF EXISTS "Admins can update services" ON public.services;
DROP POLICY IF EXISTS "Admins can delete services" ON public.services;

DROP POLICY IF EXISTS "Public can view booking settings" ON public.settings;
DROP POLICY IF EXISTS "Admins can view settings" ON public.settings;
DROP POLICY IF EXISTS "Admins can insert settings" ON public.settings;
DROP POLICY IF EXISTS "Admins can update settings" ON public.settings;


-- ============================================================
-- 5) POLICIES - FINAL SET
-- ============================================================

-- admins
CREATE POLICY "Admins can view own admin record"
  ON public.admins
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- availability
CREATE POLICY "Public can view active availability"
  ON public.availability
  FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Admins can view availability"
  ON public.availability
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can insert availability"
  ON public.availability
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update availability"
  ON public.availability
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete availability"
  ON public.availability
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- blocked_days
CREATE POLICY "Public can view blocked days"
  ON public.blocked_days
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can view blocked days"
  ON public.blocked_days
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can insert blocked days"
  ON public.blocked_days
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update blocked days"
  ON public.blocked_days
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete blocked days"
  ON public.blocked_days
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- blocked_times
CREATE POLICY "Public can view blocked times"
  ON public.blocked_times
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can view blocked times"
  ON public.blocked_times
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can insert blocked times"
  ON public.blocked_times
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update blocked times"
  ON public.blocked_times
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete blocked times"
  ON public.blocked_times
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- bookings
CREATE POLICY "Public can insert bookings"
  ON public.bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can select bookings"
  ON public.bookings
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can update bookings"
  ON public.bookings
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete bookings"
  ON public.bookings
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- services
CREATE POLICY "Public can view active services"
  ON public.services
  FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Admins can view services"
  ON public.services
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can insert services"
  ON public.services
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update services"
  ON public.services
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete services"
  ON public.services
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- settings
CREATE POLICY "Public can view booking settings"
  ON public.settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can view settings"
  ON public.settings
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can insert settings"
  ON public.settings
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update settings"
  ON public.settings
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());


-- ============================================================
-- 6) VIEW FOR PUBLIC SLOT CALCULATION
-- ============================================================

CREATE OR REPLACE VIEW public.booking_blocks AS
SELECT
  b.booking_date,
  b.booking_time,
  s.duration
FROM public.bookings b
JOIN public.services s ON s.id = b.service_id
WHERE b.status IN ('pending', 'confirmed');

GRANT SELECT ON public.booking_blocks TO anon, authenticated;

COMMIT;

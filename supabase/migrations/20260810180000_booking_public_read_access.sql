-- Phase C: Öffentlicher Lesezugriff für die Terminbuchung
-- Kundendaten in "bookings" bleiben geschützt (keine SELECT-Policy auf bookings).

-- Aktive Arbeitszeiten lesen
CREATE POLICY "Public can view active availability"
  ON public.availability
  FOR SELECT
  TO anon, authenticated
  USING (active = true);

-- Gesperrte Tage lesen (Urlaub etc.)
CREATE POLICY "Public can view blocked days"
  ON public.blocked_days
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Gesperrte Zeiten lesen (Ausnahmen)
CREATE POLICY "Public can view blocked times"
  ON public.blocked_times
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Buchungsregeln lesen (Intervalle, Vorlaufzeit …)
CREATE POLICY "Public can view booking settings"
  ON public.settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- View: nur belegte Slots, keine Kundendaten
CREATE OR REPLACE VIEW public.booking_blocks AS
SELECT
  b.booking_date,
  b.booking_time,
  s.duration
FROM public.bookings b
INNER JOIN public.services s ON s.id = b.service_id
WHERE b.status IN ('pending', 'confirmed');

GRANT SELECT ON public.booking_blocks TO anon, authenticated;

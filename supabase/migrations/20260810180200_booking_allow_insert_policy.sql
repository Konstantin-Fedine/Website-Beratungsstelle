-- Phase F: Erlaube öffentliche Buchungseinträge in die Tabelle bookings

-- Sicherstellen, dass Row Level Security aktiviert ist
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Alte (fehlerhafte) Policy entfernen, falls vorhanden
DROP POLICY IF EXISTS "Public can insert bookings" ON public.bookings;

-- Eindeutige INSERT-Policy für `anon` und `authenticated`
CREATE POLICY "Public can insert bookings"
  ON public.bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Stelle sicher, dass die booking_blocks-View lesbar ist (öffentliche Ansicht)
GRANT SELECT ON public.booking_blocks TO anon, authenticated;

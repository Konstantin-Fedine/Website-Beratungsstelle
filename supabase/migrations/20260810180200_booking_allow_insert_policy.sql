-- Phase F: Erlaube öffentliche Buchungseinträge in die Tabelle bookings

CREATE POLICY "Public can insert bookings"
  ON public.bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Beispieldaten für lokale Entwicklung (nur wenn Tabellen leer sind)

INSERT INTO public.settings (
  booking_interval,
  booking_buffer_before,
  booking_buffer_after,
  booking_advance_days,
  minimum_notice_hours
)
SELECT 60, 0, 0, 180, 24
WHERE NOT EXISTS (SELECT 1 FROM public.settings);

-- Mo–Fr Arbeitszeiten (weekday: 1=Mo … 7=So)
INSERT INTO public.availability (weekday, start_time, end_time)
SELECT 1, '09:00', '17:00' WHERE NOT EXISTS (SELECT 1 FROM public.availability WHERE weekday = 1);
INSERT INTO public.availability (weekday, start_time, end_time)
SELECT 2, '09:00', '17:00' WHERE NOT EXISTS (SELECT 1 FROM public.availability WHERE weekday = 2);
INSERT INTO public.availability (weekday, start_time, end_time)
SELECT 3, '09:00', '17:00' WHERE NOT EXISTS (SELECT 1 FROM public.availability WHERE weekday = 3);
INSERT INTO public.availability (weekday, start_time, end_time)
SELECT 4, '09:00', '12:00' WHERE NOT EXISTS (SELECT 1 FROM public.availability WHERE weekday = 4 AND start_time = '09:00');
INSERT INTO public.availability (weekday, start_time, end_time)
SELECT 4, '14:00', '17:00' WHERE NOT EXISTS (SELECT 1 FROM public.availability WHERE weekday = 4 AND start_time = '14:00');
INSERT INTO public.availability (weekday, start_time, end_time)
SELECT 5, '09:00', '15:00' WHERE NOT EXISTS (SELECT 1 FROM public.availability WHERE weekday = 5);

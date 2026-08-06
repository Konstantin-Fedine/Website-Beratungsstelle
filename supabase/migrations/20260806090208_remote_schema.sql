-- Migration unit 1: schema_changes
-- Transaction mode: transactional
-- Boundary reason: default

DROP EXTENSION pg_net;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT DELETE, INSERT, SELECT, UPDATE ON TABLES TO anon;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT, USAGE ON SEQUENCES TO anon;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON ROUTINES TO anon;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT DELETE, INSERT, SELECT, UPDATE ON TABLES TO authenticated;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT, USAGE ON SEQUENCES TO authenticated;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON ROUTINES TO authenticated;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT DELETE, INSERT, SELECT, UPDATE ON TABLES TO service_role;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT, USAGE ON SEQUENCES TO service_role;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON ROUTINES TO service_role;

CREATE TABLE public.availability (
  id         uuid                     DEFAULT gen_random_uuid() NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  weekday    smallint                 NOT NULL,
  start_time time without time zone   NOT NULL,
  end_time   time without time zone   NOT NULL,
  active     boolean                  DEFAULT true NOT NULL
);

ALTER TABLE public.availability
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.availability
  ADD CONSTRAINT availability_check CHECK (start_time < end_time);

ALTER TABLE public.availability
  ADD CONSTRAINT availability_pkey PRIMARY KEY (id);

ALTER TABLE public.availability
  ADD CONSTRAINT availability_time_check CHECK (start_time < end_time);

ALTER TABLE public.availability
  ADD CONSTRAINT availability_weekday_check CHECK (weekday >= 1 AND weekday <= 7);

GRANT ALL ON public.availability TO anon;

GRANT ALL ON public.availability TO authenticated;

GRANT ALL ON public.availability TO service_role;

CREATE TABLE public.blocked_days (
  id         uuid                     DEFAULT gen_random_uuid() NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  date       date                     NOT NULL,
  reason     text
);

ALTER TABLE public.blocked_days
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.blocked_days
  ADD CONSTRAINT blocked_days_date_key UNIQUE (date);

ALTER TABLE public.blocked_days
  ADD CONSTRAINT blocked_days_pkey PRIMARY KEY (id);

GRANT ALL ON public.blocked_days TO anon;

GRANT ALL ON public.blocked_days TO authenticated;

GRANT ALL ON public.blocked_days TO service_role;

CREATE TABLE public.blocked_times (
  id         uuid                     DEFAULT gen_random_uuid() NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  date       date                     NOT NULL,
  start_time time without time zone   NOT NULL,
  end_time   time without time zone   NOT NULL,
  reason     text
);

ALTER TABLE public.blocked_times
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.blocked_times
  ADD CONSTRAINT blocked_times_check CHECK (start_time < end_time);

ALTER TABLE public.blocked_times
  ADD CONSTRAINT blocked_times_pkey PRIMARY KEY (id);

ALTER TABLE public.blocked_times
  ADD CONSTRAINT blocked_times_time_check CHECK (start_time < end_time);

GRANT ALL ON public.blocked_times TO anon;

GRANT ALL ON public.blocked_times TO authenticated;

GRANT ALL ON public.blocked_times TO service_role;

CREATE TABLE public.bookings (
  id             uuid                     DEFAULT gen_random_uuid() NOT NULL,
  created_at     timestamp with time zone DEFAULT now() NOT NULL,
  service_id     uuid                     NOT NULL,
  customer_name  text                     NOT NULL,
  customer_email text                     NOT NULL,
  customer_phone text,
  booking_date   date                     NOT NULL,
  booking_time   time without time zone   NOT NULL,
  notes          text,
  status         text                     DEFAULT 'pending'::text NOT NULL
);

ALTER TABLE public.bookings
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);

ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_status_check CHECK (status = ANY (ARRAY['pending'::text, 'confirmed'::text, 'cancelled'::text, 'completed'::text, 'no_show'::text]));

GRANT ALL ON public.bookings TO anon;

GRANT ALL ON public.bookings TO authenticated;

GRANT ALL ON public.bookings TO service_role;

CREATE TABLE public.services (
  id          uuid                     DEFAULT gen_random_uuid() NOT NULL,
  created_at  timestamp with time zone DEFAULT now() NOT NULL,
  title       text                     NOT NULL,
  description text,
  price       numeric(10,2)            NOT NULL,
  duration    integer                  NOT NULL,
  active      boolean                  DEFAULT true NOT NULL,
  sort_order  integer                  DEFAULT 1 NOT NULL
);

ALTER TABLE public.services
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.services
  ADD CONSTRAINT services_duration_check CHECK (duration > 0);

ALTER TABLE public.services
  ADD CONSTRAINT services_pkey PRIMARY KEY (id);

ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE RESTRICT;

ALTER TABLE public.services
  ADD CONSTRAINT services_price_check CHECK (price >= 0::numeric);

GRANT ALL ON public.services TO anon;

GRANT ALL ON public.services TO authenticated;

GRANT ALL ON public.services TO service_role;

CREATE POLICY "Public can view active services" ON public.services
  FOR SELECT
  USING ((active = true));

CREATE TABLE public.settings (
  id                        uuid                     DEFAULT gen_random_uuid() NOT NULL,
  booking_interval          integer                  DEFAULT 60 NOT NULL,
  booking_buffer_before     integer                  DEFAULT 0 NOT NULL,
  booking_buffer_after      integer                  DEFAULT 0 NOT NULL,
  booking_advance_days      integer                  DEFAULT 180 NOT NULL,
  minimum_notice_hours      integer                  DEFAULT 24 NOT NULL,
  cancellation_notice_hours integer                  DEFAULT 24 NOT NULL,
  created_at                timestamp with time zone DEFAULT now() NOT NULL,
  updated_at                timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.settings
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.settings
  ADD CONSTRAINT settings_booking_advance_days_check CHECK (booking_advance_days > 0);

ALTER TABLE public.settings
  ADD CONSTRAINT settings_booking_buffer_after_check CHECK (booking_buffer_after >= 0);

ALTER TABLE public.settings
  ADD CONSTRAINT settings_booking_buffer_before_check CHECK (booking_buffer_before >= 0);

ALTER TABLE public.settings
  ADD CONSTRAINT settings_booking_interval_check CHECK (booking_interval > 0);

ALTER TABLE public.settings
  ADD CONSTRAINT settings_cancellation_notice_hours_check CHECK (cancellation_notice_hours >= 0);

ALTER TABLE public.settings
  ADD CONSTRAINT settings_minimum_notice_hours_check CHECK (minimum_notice_hours >= 0);

ALTER TABLE public.settings
  ADD CONSTRAINT settings_pkey PRIMARY KEY (id);

GRANT ALL ON public.settings TO anon;

GRANT ALL ON public.settings TO authenticated;

GRANT ALL ON public.settings TO service_role;

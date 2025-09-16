/*
  # Initial Database Schema for Interschool Travel CRM

  1. New Tables
    - `schools` - Educational institutions with contact details
    - `trips` - Travel packages and destinations  
    - `suppliers` - Service providers and vendors
    - `excursions` - Activities and experiences for trips
    - `bookings` - School trip reservations and status
    - `booking_excursions` - Link bookings to specific excursions
    - `activities` - Activity log for tracking interactions

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access all data
    - Create indexes for foreign keys for better performance

  3. Custom Types
    - booking_status enum for tracking booking progress
    - provider_status enum for excursion provider communication
    - activity_type enum for categorizing activities
*/

-- Create custom types
CREATE TYPE public.booking_status AS ENUM ('enquiry', 'quoted', 'quote_follow_up', 'quote_lost', 'confirmed', 'paid', 'completed', 'cancelled');
CREATE TYPE public.provider_status AS ENUM ('not_contacted', 'contacted', 'booked', 'paid');
CREATE TYPE public.activity_type AS ENUM ('note', 'email', 'call', 'meeting', 'quote_sent', 'payment_received');

-- Create tables
CREATE TABLE IF NOT EXISTS public.schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  postcode text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  website text,
  contact_person text,
  notes text,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  destination text NOT NULL,
  description text,
  duration_days integer NOT NULL,
  base_price numeric NOT NULL,
  max_participants integer NOT NULL,
  departure_date date NOT NULL,
  return_date date NOT NULL,
  itinerary text,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_person text,
  email text NOT NULL,
  phone text NOT NULL,
  address text,
  city text,
  postcode text,
  website text,
  specialties text,
  notes text,
  category text,
  focus text,
  approx_price text,
  notes_for_groups text,
  travel_time text,
  transport_mode text,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.excursions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES public.trips(id) ON DELETE CASCADE NOT NULL,
  supplier_id uuid REFERENCES public.suppliers(id) ON DELETE SET NULL,
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  duration_hours numeric,
  max_participants integer,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid REFERENCES public.schools(id) ON DELETE CASCADE NOT NULL,
  trip_id uuid REFERENCES public.trips(id) ON DELETE CASCADE NOT NULL,
  status public.booking_status DEFAULT 'enquiry' NOT NULL,
  participant_count integer NOT NULL,
  total_price numeric NOT NULL,
  special_requirements text,
  contact_email text NOT NULL,
  contact_phone text NOT NULL,
  notes text,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.booking_excursions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
  excursion_id uuid REFERENCES public.excursions(id) ON DELETE CASCADE NOT NULL,
  participant_count integer NOT NULL,
  total_price numeric NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  provider_status public.provider_status DEFAULT 'not_contacted' NOT NULL,
  provider_notes text,
  provider_contact_date timestamp with time zone,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
  type public.activity_type NOT NULL,
  description text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.excursions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_excursions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for authenticated users
CREATE POLICY "Allow all for authenticated users" ON public.schools FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON public.trips FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON public.suppliers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON public.excursions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON public.bookings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON public.booking_excursions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON public.activities FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes for foreign keys for better performance
CREATE INDEX IF NOT EXISTS idx_excursions_trip_id ON public.excursions (trip_id);
CREATE INDEX IF NOT EXISTS idx_excursions_supplier_id ON public.excursions (supplier_id);
CREATE INDEX IF NOT EXISTS idx_bookings_school_id ON public.bookings (school_id);
CREATE INDEX IF NOT EXISTS idx_bookings_trip_id ON public.bookings (trip_id);
CREATE INDEX IF NOT EXISTS idx_booking_excursions_booking_id ON public.booking_excursions (booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_excursions_excursion_id ON public.booking_excursions (excursion_id);
CREATE INDEX IF NOT EXISTS idx_activities_booking_id ON public.activities (booking_id);
CREATE INDEX IF NOT EXISTS idx_activities_user_id ON public.activities (user_id);
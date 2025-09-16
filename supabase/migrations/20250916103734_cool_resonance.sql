/*
  # Initial Database Schema for Interschool Travel CRM

  1. New Tables
    - `schools` - Educational institutions that book trips
    - `trips` - Available travel packages and destinations
    - `bookings` - Trip reservations made by schools
    - `suppliers` - External service providers for excursions
    - `excursions` - Additional activities available for trips
    - `booking_excursions` - Junction table linking bookings to excursions
    - `activities` - Activity log for tracking interactions

  2. Security
    - Enable RLS on all tables
    - Add policies for public access (suitable for demo/development)

  3. Features
    - UUID primary keys
    - Automatic timestamps
    - Proper foreign key relationships
    - Status enums for bookings and excursions
*/

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
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
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create trips table
CREATE TABLE IF NOT EXISTS trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  destination text NOT NULL,
  description text,
  duration_days integer NOT NULL DEFAULT 1,
  base_price numeric(10,2) NOT NULL DEFAULT 0,
  max_participants integer NOT NULL DEFAULT 50,
  departure_date date NOT NULL,
  return_date date NOT NULL,
  itinerary text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
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
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  trip_id uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'enquiry' CHECK (status IN ('enquiry', 'quoted', 'quote_follow_up', 'quote_lost', 'confirmed', 'paid', 'completed', 'cancelled')),
  participant_count integer NOT NULL DEFAULT 1,
  total_price numeric(10,2) NOT NULL DEFAULT 0,
  special_requirements text,
  contact_email text NOT NULL,
  contact_phone text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create excursions table
CREATE TABLE IF NOT EXISTS excursions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  supplier_id uuid REFERENCES suppliers(id) ON DELETE SET NULL,
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL DEFAULT 0,
  duration_hours numeric(4,2),
  max_participants integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create booking_excursions junction table
CREATE TABLE IF NOT EXISTS booking_excursions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  excursion_id uuid NOT NULL REFERENCES excursions(id) ON DELETE CASCADE,
  participant_count integer NOT NULL DEFAULT 1,
  total_price numeric(10,2) NOT NULL DEFAULT 0,
  provider_status text NOT NULL DEFAULT 'not_contacted' CHECK (provider_status IN ('not_contacted', 'contacted', 'booked', 'paid')),
  provider_notes text,
  provider_contact_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(booking_id, excursion_id)
);

-- Create activities table for activity logging
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('note', 'email', 'call', 'meeting', 'quote_sent', 'payment_received')),
  description text NOT NULL,
  user_id text NOT NULL DEFAULT 'system',
  created_at timestamptz DEFAULT now()
);

-- Create word_search_results table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS word_search_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL,
  email text NOT NULL,
  completion_time integer NOT NULL,
  words_found integer NOT NULL DEFAULT 0,
  total_words integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_school_id ON bookings(school_id);
CREATE INDEX IF NOT EXISTS idx_bookings_trip_id ON bookings(trip_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_excursions_trip_id ON excursions(trip_id);
CREATE INDEX IF NOT EXISTS idx_excursions_supplier_id ON excursions(supplier_id);
CREATE INDEX IF NOT EXISTS idx_booking_excursions_booking_id ON booking_excursions(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_excursions_excursion_id ON booking_excursions(excursion_id);
CREATE INDEX IF NOT EXISTS idx_activities_booking_id ON activities(booking_id);
CREATE INDEX IF NOT EXISTS idx_activities_created_at ON activities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_trips_departure_date ON trips(departure_date);
CREATE INDEX IF NOT EXISTS idx_word_search_results_completion_time ON word_search_results(completion_time);
CREATE INDEX IF NOT EXISTS idx_word_search_results_created_at ON word_search_results(created_at DESC);

-- Enable Row Level Security on all tables
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE excursions ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_excursions ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE word_search_results ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (suitable for demo/development)
-- Schools policies
CREATE POLICY "Anyone can view schools" ON schools FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can insert schools" ON schools FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anyone can update schools" ON schools FOR UPDATE TO anon USING (true);
CREATE POLICY "Anyone can delete schools" ON schools FOR DELETE TO anon USING (true);

-- Trips policies
CREATE POLICY "Anyone can view trips" ON trips FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can insert trips" ON trips FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anyone can update trips" ON trips FOR UPDATE TO anon USING (true);
CREATE POLICY "Anyone can delete trips" ON trips FOR DELETE TO anon USING (true);

-- Suppliers policies
CREATE POLICY "Anyone can view suppliers" ON suppliers FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can insert suppliers" ON suppliers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anyone can update suppliers" ON suppliers FOR UPDATE TO anon USING (true);
CREATE POLICY "Anyone can delete suppliers" ON suppliers FOR DELETE TO anon USING (true);

-- Bookings policies
CREATE POLICY "Anyone can view bookings" ON bookings FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can insert bookings" ON bookings FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anyone can update bookings" ON bookings FOR UPDATE TO anon USING (true);
CREATE POLICY "Anyone can delete bookings" ON bookings FOR DELETE TO anon USING (true);

-- Excursions policies
CREATE POLICY "Anyone can view excursions" ON excursions FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can insert excursions" ON excursions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anyone can update excursions" ON excursions FOR UPDATE TO anon USING (true);
CREATE POLICY "Anyone can delete excursions" ON excursions FOR DELETE TO anon USING (true);

-- Booking excursions policies
CREATE POLICY "Anyone can view booking_excursions" ON booking_excursions FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can insert booking_excursions" ON booking_excursions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anyone can update booking_excursions" ON booking_excursions FOR UPDATE TO anon USING (true);
CREATE POLICY "Anyone can delete booking_excursions" ON booking_excursions FOR DELETE TO anon USING (true);

-- Activities policies
CREATE POLICY "Anyone can view activities" ON activities FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can insert activities" ON activities FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anyone can update activities" ON activities FOR UPDATE TO anon USING (true);
CREATE POLICY "Anyone can delete activities" ON activities FOR DELETE TO anon USING (true);

-- Word search results policies
CREATE POLICY "Anyone can view word search results" ON word_search_results FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can submit word search results" ON word_search_results FOR INSERT TO anon WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_trips_updated_at BEFORE UPDATE ON trips FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_suppliers_updated_at BEFORE UPDATE ON suppliers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_excursions_updated_at BEFORE UPDATE ON excursions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_booking_excursions_updated_at BEFORE UPDATE ON booking_excursions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
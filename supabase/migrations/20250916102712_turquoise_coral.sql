/*
  # Initial Database Schema for Interschool Travel CRM

  1. New Tables
    - `schools` - Educational institutions
    - `trips` - Travel packages and destinations
    - `bookings` - School bookings for trips
    - `suppliers` - Service providers (hotels, transport, etc.)
    - `excursions` - Additional activities and experiences
    - `booking_excursions` - Junction table for booking-excursion relationships
    - `activities` - Activity log for tracking actions
    - `word_search_results` - Game results storage

  2. Security
    - Enable RLS on all tables
    - Add policies for public access (anon users can read/write)

  3. Features
    - UUID primary keys
    - Timestamps for audit trail
    - Foreign key relationships
    - Indexes for performance
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Schools table
CREATE TABLE IF NOT EXISTS schools (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  address text,
  contact_person text,
  email text,
  phone text,
  student_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Trips table
CREATE TABLE IF NOT EXISTS trips (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  destination text NOT NULL,
  departure_date date NOT NULL,
  return_date date NOT NULL,
  price_per_student numeric(10,2) NOT NULL DEFAULT 0,
  max_students integer DEFAULT 50,
  description text,
  itinerary text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  type text NOT NULL,
  contact_person text,
  email text,
  phone text,
  address text,
  website text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Excursions table
CREATE TABLE IF NOT EXISTS excursions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  supplier_id uuid REFERENCES suppliers(id) ON DELETE SET NULL,
  price_per_person numeric(10,2) NOT NULL DEFAULT 0,
  duration text,
  location text,
  min_participants integer DEFAULT 1,
  max_participants integer DEFAULT 50,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id uuid REFERENCES schools(id) ON DELETE CASCADE,
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE,
  student_count integer NOT NULL DEFAULT 0,
  teacher_count integer DEFAULT 0,
  total_price numeric(10,2) DEFAULT 0,
  status text DEFAULT 'pending',
  booking_date date DEFAULT CURRENT_DATE,
  special_requirements text,
  emergency_contact text,
  emergency_phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Booking excursions junction table
CREATE TABLE IF NOT EXISTS booking_excursions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  excursion_id uuid REFERENCES excursions(id) ON DELETE CASCADE,
  participant_count integer NOT NULL DEFAULT 0,
  total_price numeric(10,2) DEFAULT 0,
  provider_status text DEFAULT 'not_contacted',
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Activities table for logging
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  type text NOT NULL,
  description text NOT NULL,
  entity_type text,
  entity_id uuid,
  created_at timestamptz DEFAULT now()
);

-- Word search results table (existing)
CREATE TABLE IF NOT EXISTS word_search_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL,
  email text NOT NULL,
  completion_time integer NOT NULL,
  words_found integer DEFAULT 0,
  total_words integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_school_id ON bookings(school_id);
CREATE INDEX IF NOT EXISTS idx_bookings_trip_id ON bookings(trip_id);
CREATE INDEX IF NOT EXISTS idx_booking_excursions_booking_id ON booking_excursions(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_excursions_excursion_id ON booking_excursions(excursion_id);
CREATE INDEX IF NOT EXISTS idx_excursions_supplier_id ON excursions(supplier_id);
CREATE INDEX IF NOT EXISTS idx_activities_created_at ON activities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_word_search_results_completion_time ON word_search_results(completion_time);
CREATE INDEX IF NOT EXISTS idx_word_search_results_created_at ON word_search_results(created_at DESC);

-- Enable Row Level Security
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE excursions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_excursions ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE word_search_results ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (anon users can read and write)
CREATE POLICY "Anyone can view schools" ON schools FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can insert schools" ON schools FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anyone can update schools" ON schools FOR UPDATE TO anon USING (true);
CREATE POLICY "Anyone can delete schools" ON schools FOR DELETE TO anon USING (true);

CREATE POLICY "Anyone can view trips" ON trips FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can insert trips" ON trips FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anyone can update trips" ON trips FOR UPDATE TO anon USING (true);
CREATE POLICY "Anyone can delete trips" ON trips FOR DELETE TO anon USING (true);

CREATE POLICY "Anyone can view suppliers" ON suppliers FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can insert suppliers" ON suppliers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anyone can update suppliers" ON suppliers FOR UPDATE TO anon USING (true);
CREATE POLICY "Anyone can delete suppliers" ON suppliers FOR DELETE TO anon USING (true);

CREATE POLICY "Anyone can view excursions" ON excursions FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can insert excursions" ON excursions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anyone can update excursions" ON excursions FOR UPDATE TO anon USING (true);
CREATE POLICY "Anyone can delete excursions" ON excursions FOR DELETE TO anon USING (true);

CREATE POLICY "Anyone can view bookings" ON bookings FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can insert bookings" ON bookings FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anyone can update bookings" ON bookings FOR UPDATE TO anon USING (true);
CREATE POLICY "Anyone can delete bookings" ON bookings FOR DELETE TO anon USING (true);

CREATE POLICY "Anyone can view booking_excursions" ON booking_excursions FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can insert booking_excursions" ON booking_excursions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anyone can update booking_excursions" ON booking_excursions FOR UPDATE TO anon USING (true);
CREATE POLICY "Anyone can delete booking_excursions" ON booking_excursions FOR DELETE TO anon USING (true);

CREATE POLICY "Anyone can view activities" ON activities FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can insert activities" ON activities FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anyone can update activities" ON activities FOR UPDATE TO anon USING (true);
CREATE POLICY "Anyone can delete activities" ON activities FOR DELETE TO anon USING (true);

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

-- Add updated_at triggers
CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_trips_updated_at BEFORE UPDATE ON trips FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_suppliers_updated_at BEFORE UPDATE ON suppliers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_excursions_updated_at BEFORE UPDATE ON excursions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
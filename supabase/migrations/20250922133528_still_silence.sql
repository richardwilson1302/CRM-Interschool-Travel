/*
  # Add missing columns to bookings table

  1. New Columns
    - `contact_name` (text, nullable) - Name of the teacher/group leader
    - `free_pax` (integer, nullable, default 0) - Number of free participants

  2. Changes
    - Add contact_name column to store teacher/group leader name
    - Add free_pax column to track free participants for pricing calculations
    - Both columns are nullable for backward compatibility
*/

-- Add contact_name column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'contact_name'
  ) THEN
    ALTER TABLE public.bookings ADD COLUMN contact_name text;
  END IF;
END $$;

-- Add free_pax column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'free_pax'
  ) THEN
    ALTER TABLE public.bookings ADD COLUMN free_pax integer DEFAULT 0;
  END IF;
END $$;
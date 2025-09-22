/*
  # Add contact_name column to bookings table

  1. Changes
    - Add `contact_name` column to `bookings` table
    - Column is optional (nullable) to maintain compatibility with existing records

  2. Notes
    - This resolves the "Could not find the 'contact_name' column" error
    - Existing bookings will have NULL contact_name values initially
*/

-- Add contact_name column to bookings table
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS contact_name TEXT;
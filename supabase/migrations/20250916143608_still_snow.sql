/*
  # Create quotations table

  1. New Tables
    - `quotations`
      - `id` (uuid, primary key)
      - `school_name` (text, required)
      - `party_leader` (text, optional)
      - `destination` (text, required)
      - `accommodation` (text, optional)
      - `board` (text, optional)
      - `date_out_uk` (date, optional)
      - `date_back_uk` (date, optional)
      - `number_of_days` (integer, default 0)
      - `number_of_nights` (integer, default 0)
      - `pax` (integer, default 0)
      - `free_places` (integer, default 0)
      - `exchange_rate` (numeric, default 1.18)
      - `markup_amount` (numeric, default 0)
      - `total_cost` (numeric, default 0)
      - `net_total` (numeric, default 0)
      - `profit` (numeric, default 0)
      - `price_per_person` (numeric, default 0)
      - `profit_per_head` (numeric, default 0)
      - `ist_staff_qty` (integer, default 0)
      - `cost_items` (jsonb, default empty array)
      - `status` (text, default 'draft')
      - `valid_until` (date, optional)
      - `user_id` (uuid, foreign key to auth.users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `quotations` table
    - Add policy for users to manage their own quotations

  3. Triggers
    - Add trigger to automatically update `updated_at` timestamp
*/

-- Create the quotations table
CREATE TABLE IF NOT EXISTS quotations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_name text NOT NULL,
  party_leader text,
  destination text NOT NULL,
  accommodation text,
  board text,
  date_out_uk date,
  date_back_uk date,
  number_of_days integer DEFAULT 0,
  number_of_nights integer DEFAULT 0,
  pax integer DEFAULT 0,
  free_places integer DEFAULT 0,
  exchange_rate numeric DEFAULT 1.18,
  markup_amount numeric DEFAULT 0,
  total_cost numeric DEFAULT 0,
  net_total numeric DEFAULT 0,
  profit numeric DEFAULT 0,
  price_per_person numeric DEFAULT 0,
  profit_per_head numeric DEFAULT 0,
  ist_staff_qty integer DEFAULT 0,
  cost_items jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'draft',
  valid_until date,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;

-- Create policy for users to manage their own quotations
CREATE POLICY "Users can manage their own quotations"
  ON quotations
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quotations_user_id ON quotations(user_id);
CREATE INDEX IF NOT EXISTS idx_quotations_created_at ON quotations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotations_status ON quotations(status);

-- Create trigger function for updating updated_at timestamp
CREATE OR REPLACE FUNCTION update_quotations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_quotations_updated_at
  BEFORE UPDATE ON quotations
  FOR EACH ROW
  EXECUTE FUNCTION update_quotations_updated_at();
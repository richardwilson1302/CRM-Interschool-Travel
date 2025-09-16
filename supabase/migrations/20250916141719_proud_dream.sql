/*
  # Create quotations table

  1. New Tables
    - `quotations`
      - `id` (uuid, primary key)
      - `school_name` (text)
      - `party_leader` (text)
      - `destination` (text)
      - `accommodation` (text)
      - `board` (text)
      - `date_out_uk` (date)
      - `date_back_uk` (date)
      - `number_of_days` (integer)
      - `number_of_nights` (integer)
      - `pax` (integer)
      - `free_places` (integer)
      - `exchange_rate` (numeric)
      - `markup_amount` (numeric)
      - `total_cost` (numeric)
      - `net_total` (numeric)
      - `profit` (numeric)
      - `price_per_person` (numeric)
      - `profit_per_head` (numeric)
      - `ist_staff_qty` (integer)
      - `cost_items` (jsonb)
      - `status` (text)
      - `valid_until` (date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `user_id` (uuid)

  2. Security
    - Enable RLS on `quotations` table
    - Add policy for authenticated users to manage their quotations
*/

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

ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own quotations"
  ON quotations
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_quotations_user_id ON quotations(user_id);
CREATE INDEX idx_quotations_status ON quotations(status);
CREATE INDEX idx_quotations_created_at ON quotations(created_at DESC);

CREATE OR REPLACE FUNCTION update_quotations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_quotations_updated_at
  BEFORE UPDATE ON quotations
  FOR EACH ROW
  EXECUTE FUNCTION update_quotations_updated_at();
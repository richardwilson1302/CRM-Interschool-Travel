export interface Database {
  public: {
    Tables: {
      schools: {
        Row: {
          id: string;
          name: string;
          address: string;
          city: string;
          postcode: string;
          phone: string;
          email: string;
          website?: string;
          contact_person?: string;
          notes?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['schools']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['schools']['Insert']>;
      };
      trips: {
        Row: {
          id: string;
          title: string;
          destination: string;
          description?: string;
          duration_days: number;
          base_price: number;
          max_participants: number;
          departure_date: string;
          return_date: string;
          itinerary?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['trips']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['trips']['Insert']>;
      };
      bookings: {
        Row: {
          id: string;
          school_id: string;
          trip_id: string;
          status: 'enquiry' | 'quoted' | 'quote_follow_up' | 'quote_lost' | 'confirmed' | 'paid' | 'completed' | 'cancelled';
          participant_count: number;
          free_pax?: number;
          total_price: number;
          special_requirements?: string;
          contact_email: string;
          contact_phone: string;
          notes?: string;
          contact_name?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['bookings']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['bookings']['Insert']>;
      };
      suppliers: {
        Row: {
          id: string;
          name: string;
          contact_person?: string;
          email: string;
          phone: string;
          address?: string;
          city?: string;
          postcode?: string;
          website?: string;
          specialties?: string;
          notes?: string;
          category?: string;
          focus?: string;
          approx_price?: string;
          notes_for_groups?: string;
          travel_time?: string;
          transport_mode?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['suppliers']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['suppliers']['Insert']>;
      };
      excursions: {
        Row: {
          id: string;
          trip_id: string;
          supplier_id?: string;
          name: string;
          description?: string;
          price: number;
          duration_hours?: number;
          max_participants?: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['excursions']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['excursions']['Insert']>;
      };
      booking_excursions: {
        Row: {
          id: string;
          booking_id: string;
          excursion_id: string;
          participant_count: number;
          total_price: number;
          created_at: string;
          provider_status: 'not_contacted' | 'contacted' | 'booked' | 'paid';
          provider_notes?: string;
          provider_contact_date?: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['booking_excursions']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['booking_excursions']['Insert']>;
      };
      excursions: {
        Row: {
          id: string;
          trip_id: string;
          supplier_id?: string;
          name: string;
          description?: string;
          price: number;
          duration_hours?: number;
          max_participants?: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['excursions']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['excursions']['Insert']>;
      };
      booking_excursions: {
        Row: {
          id: string;
          booking_id: string;
          excursion_id: string;
          participant_count: number;
          total_price: number;
          created_at: string;
          provider_status: 'not_contacted' | 'contacted' | 'booked' | 'paid';
          provider_notes?: string;
          provider_contact_date?: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['booking_excursions']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['booking_excursions']['Insert']>;
      };
      activities: {
        Row: {
          id: string;
          booking_id: string;
          type: 'note' | 'email' | 'call' | 'meeting' | 'quote_sent' | 'payment_received';
          description: string;
          user_id: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['activities']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['activities']['Insert']>;
      };
      quotations: {
        Row: {
          id: string;
          school_name: string;
          party_leader?: string;
          destination: string;
          accommodation?: string;
          board?: string;
          date_out_uk?: string;
          date_back_uk?: string;
          number_of_days: number;
          number_of_nights: number;
          pax: number;
          free_places: number;
          exchange_rate: number;
          markup_amount: number;
          total_cost: number;
          net_total: number;
          profit: number;
          price_per_person: number;
          profit_per_head: number;
          ist_staff_qty: number;
          cost_items: any;
          status: string;
          valid_until?: string;
          user_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['quotations']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['quotations']['Insert']>;
      };
    };
  };
}
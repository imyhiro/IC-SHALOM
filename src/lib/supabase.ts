import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Form submissions will be simulated.');
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Types for our database
export interface PrayerPetition {
  id?: string;
  name: string | null;
  petition: string;
  anonymous: boolean;
  created_at?: string;
  status?: 'pending' | 'prayed';
}

// Function to submit a prayer petition
export async function submitPrayerPetition(petition: Omit<PrayerPetition, 'id' | 'created_at' | 'status'>) {
  if (!supabase) {
    // Simulate success when Supabase is not configured
    console.log('Simulated petition submission:', petition);
    return { success: true, simulated: true };
  }

  const { data, error } = await supabase
    .from('prayer_petitions')
    .insert([{
      name: petition.anonymous ? null : petition.name,
      petition: petition.petition,
      anonymous: petition.anonymous,
      status: 'pending'
    }])
    .select();

  if (error) {
    console.error('Error submitting petition:', error);
    return { success: false, error };
  }

  return { success: true, data };
}

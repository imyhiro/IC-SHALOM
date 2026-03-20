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

// Function to get and increment visitor count
export async function getVisitorCount(): Promise<number> {
  if (!supabase) {
    // Return a simulated count when Supabase is not configured
    return 1247;
  }

  try {
    // Increment the counter
    const { data, error } = await supabase
      .rpc('increment_visitor_count');

    if (error) {
      console.error('Error getting visitor count:', error);
      // Return cached count or default
      const cached = localStorage.getItem('visitor_count');
      return cached ? parseInt(cached) : 1000;
    }

    // Cache the count
    if (data) {
      localStorage.setItem('visitor_count', data.toString());
    }

    return data || 1000;
  } catch (err) {
    console.error('Error:', err);
    return 1000;
  }
}

// Function to just get the count without incrementing
export async function getVisitorCountOnly(): Promise<number> {
  if (!supabase) {
    return 1247;
  }

  try {
    const { data, error } = await supabase
      .from('visitor_counter')
      .select('count')
      .eq('id', 1)
      .single();

    if (error) {
      const cached = localStorage.getItem('visitor_count');
      return cached ? parseInt(cached) : 1000;
    }

    return data?.count || 1000;
  } catch (err) {
    return 1000;
  }
}

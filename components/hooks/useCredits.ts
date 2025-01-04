import { useEffect, useState } from 'react';
import { SupabaseClient, User } from '@supabase/supabase-js';

export function useCredits(supabase: SupabaseClient, user: User | null) {
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const fetchCredits = async () => {
    if (!user) {
      setCredits(0);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_credits')
        .select('credits')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      
      // Safely handle the credits value
      setCredits(data?.credits ?? 0);
    } catch (error) {
      console.error('Error fetching credits:', error);
      // Set credits to 0 if there's an error
      setCredits(0);
    } finally {
      setLoading(false);
    }
  };

  const updateCredits = async (newCredits: number) => {
    if (!user) throw new Error('No user found');

    try {
      const { error } = await supabase
        .from('user_credits')
        .upsert({
          user_id: user.id,
          credits: newCredits,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      setCredits(newCredits);
      return newCredits;
    } catch (error) {
      console.error('Error updating credits:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchCredits();
  }, [user]); // Re-fetch when user changes

  return { credits, loading, updateCredits };
} 
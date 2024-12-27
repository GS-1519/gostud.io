import { useEffect, useState } from 'react';
import { SupabaseClient, User } from '@supabase/supabase-js';

export interface ExtendedUser extends User {
  credits?: number;
}

export function useUserInfo(supabase: SupabaseClient) {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(user as ExtendedUser);
      } catch (error) {
        console.error('Error getting user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user as ExtendedUser || null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return { user, loading };
}

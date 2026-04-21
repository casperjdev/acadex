import type { Database } from '~/types/supabase';

export const useMarketplace = () => {
  const client = useSupabaseClient<Database>();

  const getListings = async (filters?: { subject?: string; category?: Database['public']['Tables']['listings']['Row']['category'] }) => {
    let query = client
      .from('listings')
      .select('*')
      .eq('status', 'available')
      .order('created_at', { ascending: false });

    if (filters?.subject) {
      query = query.eq('subject', filters.subject);
    }

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  };

  const getListingById = async (id: string) => {
    const { data, error } = await client
      .from('listings')
      .select('*, seller:profiles(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  };

  return {
    getListings,
    getListingById,
  };
};

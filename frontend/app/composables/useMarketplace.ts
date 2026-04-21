export const useMarketplace = () => {
  const supabase = useSupabaseClient()

  const fetchListings = async (filters?: { subject?: string; category?: string }) => {
    let query = supabase
      .from('listings')
      .select('*')
      .eq('status', 'available')

    if (filters?.subject) {
      query = query.ilike('subject', `%${filters.subject}%`)
    }
    if (filters?.category) {
      query = query.eq('category', filters.category)
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    return { data, error }
  }

  const getListingDetails = async (id: string) => {
    return await supabase
      .from('listings')
      .select('*, profiles(full_name, trust_score)')
      .eq('id', id)
      .single()
  }

  return {
    fetchListings,
    getListingDetails
  }
}

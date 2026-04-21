export const useChat = () => {
  const supabase = useSupabaseClient()

  const fetchMessages = async (listingId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('listing_id', listingId)
      .order('created_at', { ascending: true })
    
    return { data, error }
  }

  const sendMessage = async (message: { listing_id: string; receiver_id: string; content: string }) => {
    const user = useSupabaseUser()
    if (!user.value) throw new Error('Must be logged in')

    const { error } = await supabase.from('messages').insert({
      listing_id: message.listing_id,
      sender_id: user.value.id,
      receiver_id: message.receiver_id,
      content: message.content
    })

    return { error }
  }

  const subscribeToMessages = (listingId: string, onMessage: (payload: any) => void) => {
    return supabase
      .channel(`listing-${listingId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `listing_id=eq.${listingId}` },
        onMessage
      )
      .subscribe()
  }

  return {
    fetchMessages,
    sendMessage,
    subscribeToMessages
  }
}

import type { Database } from '~/types/supabase';

type Message = Database['public']['Tables']['messages']['Row'];

export const useChat = (listingId: string) => {
  const client = useSupabaseClient<Database>();
  const user = useSupabaseUser();
  const messages = ref<Message[]>([]);

  const fetchMessages = async () => {
    const { data, error } = await client
      .from('messages')
      .select('*')
      .eq('listing_id', listingId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    messages.value = data || [];
  };

  const sendMessage = async (receiverId: string, content: string) => {
    if (!user.value) throw new Error('Must be logged in to send messages');

    const { error } = await client
      .from('messages')
      .insert({
        listing_id: listingId,
        sender_id: user.value.id,
        receiver_id: receiverId,
        content,
      });

    if (error) throw error;
  };

  const subscribeToMessages = () => {
    const channel = client.channel(`listing-${listingId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `listing_id=eq.${listingId}`,
        },
        (payload) => {
          messages.value.push(payload.new as Message);
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  };

  return {
    messages,
    fetchMessages,
    sendMessage,
    subscribeToMessages,
  };
};

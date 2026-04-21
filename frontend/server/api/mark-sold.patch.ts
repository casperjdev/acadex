import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import type { Database } from '~/types/supabase';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const { id } = await readBody(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Listing ID is required',
    });
  }

  const { data, error } = await client
    .from('listings')
    .update({ status: 'sold' })
    .eq('id', id)
    .eq('seller_id', user.id)
    .select()
    .single();

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return data;
});

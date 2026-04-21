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

  const body = await readBody(event);

  // Simple validation
  const { title, price, category, condition } = body;
  if (!title || price === undefined || !category || !condition) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    });
  }

  const { data, error } = await client
    .from('listings')
    .insert({
      ...body,
      seller_id: user.id,
      status: 'available',
    })
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

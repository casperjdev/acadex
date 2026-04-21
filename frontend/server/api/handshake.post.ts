import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const { listingId, status } = await readBody(event)
  const client = await serverSupabaseClient(event)

  // Verify ownership
  const { data: listing } = await client
    .from('listings')
    .select('seller_id')
    .eq('id', listingId)
    .single()

  if (!listing || listing.seller_id !== user.id) {
    throw createError({ statusCode: 403, message: 'Not listing owner' })
  }

  const { data, error } = await client
    .from('listings')
    .update({ status })
    .eq('id', listingId)
    .select()
    .single()

  if (error) throw createError({ statusCode: 500, message: error.message })

  return data
})
